-- ============================================================================
-- Minterest admin panel - migration 0002: leads (inbox / aanvragen)
-- ----------------------------------------------------------------------------
-- Stores requests coming in from the public website: the contact form, the
-- "Start jouw project" funnel and the website-audit tool. The public site
-- writes here through the PostgREST endpoint with the anon key; Row Level
-- Security makes sure the browser can ONLY insert a fresh "nieuw" request and
-- never read, change or remove anything. Reading and managing is admin-only.
--
-- Run after 0001_init.sql (it relies on public.is_admin()).
-- ============================================================================

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  -- Where the request came from: contact | start | audit.
  source       text not null default 'contact',
  -- Workflow status, shown and changed in the admin inbox.
  status       text not null default 'nieuw'
                 check (status in ('nieuw', 'gelezen', 'in_behandeling', 'afgehandeld')),
  name         text,
  email        text,
  company      text,
  website_url  text,
  -- Which services the visitor ticked (service slugs), if any.
  interest     text[] not null default '{}',
  budget       text,
  timeline     text,
  message      text,
  -- The page the request was sent from, plus the full raw payload as a backup.
  page         text,
  raw          jsonb,
  -- Linked customer once a request is converted (the FK is added in 0003).
  customer_id  uuid
);

comment on table public.leads is 'Aanvragen vanuit de publieke site (contact, start, website-audit).';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.leads enable row level security;

-- The public website (anon key) may submit a request, but only as a brand new
-- "nieuw" lead. It can never read back or change existing rows.
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (status = 'nieuw');

-- Admins (logged-in team members) can read, update and delete everything.
drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads"
  on public.leads for select
  using (public.is_admin());

drop policy if exists "Admins can update leads" on public.leads;
create policy "Admins can update leads"
  on public.leads for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete leads" on public.leads;
create policy "Admins can delete leads"
  on public.leads for delete
  using (public.is_admin());

-- Make the role privileges explicit (Supabase grants these by default, but we
-- spell them out so the security model is readable). RLS still gates every row.
grant insert on public.leads to anon;
grant select, insert, update, delete on public.leads to authenticated;
