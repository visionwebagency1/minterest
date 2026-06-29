-- ============================================================================
-- Minterest admin panel - migration 0001: foundation
-- ----------------------------------------------------------------------------
-- Creates the `profiles` table for the admin team members who may log in.
-- Every row in auth.users that has a profile counts as an admin. Because the
-- admin panel is invite-only (no public sign-up), simply being a Supabase Auth
-- user with a profile is enough to be an admin.
--
-- Row Level Security is enabled from the start. The anon key shipped to the
-- browser can only do what these policies allow.
--
-- Run this once against your Supabase project, either via the Supabase CLI
-- (`supabase db push`) or by pasting it into the SQL editor (Dashboard > SQL).
-- ============================================================================

-- ── profiles ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'admin',
  created_at  timestamptz not null default now()
);

comment on table public.profiles is 'Admin team members allowed into the Minterest admin panel.';

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- A logged-in user can read their own profile (used to confirm admin access).
drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  using (auth.uid() = id);

-- A logged-in user can update their own profile (e.g. their display name).
drop policy if exists "Owners can update their profile" on public.profiles;
create policy "Owners can update their profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Note: there is intentionally NO insert/delete policy from the client.
-- Profiles are created by the trigger below (which runs as the database owner),
-- so the browser can never insert or remove admin rows.

-- ── Helper: is the current request an admin? ─────────────────────────────────
-- Reusable in later migrations (RLS policies for content, leads, quotes, ...).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p where p.id = auth.uid()
  );
$$;

-- ── Auto-create a profile when a new auth user is added ──────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
