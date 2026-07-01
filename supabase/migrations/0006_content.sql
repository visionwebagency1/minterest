-- ============================================================================
-- Minterest admin panel - migration 0006: website content (CMS)
-- ----------------------------------------------------------------------------
-- Makes the public site's texts and photos editable from the admin panel, with
-- a draft -> published flow. Nothing here changes the live site yet; the public
-- pages keep using their built-in defaults until a value is published.
--
-- Model: one row per editable item, keyed by (page, key). Each row carries a
-- `published` value (what the live site shows) and a `draft` value (an unsaved
-- edit). Images live in Supabase Storage; the row stores the public URL.
--
-- The registry of which keys exist, their labels and their default text lives in
-- the app code (src/content), so this table only stores overrides.
--
-- Run after 0005.
-- ============================================================================

create table if not exists public.site_content (
  id            uuid primary key default gen_random_uuid(),
  page          text not null,
  key           text not null,
  draft         text,
  published     text,
  published_at  timestamptz,
  updated_at    timestamptz not null default now(),
  unique (page, key)
);

comment on table public.site_content is 'Bewerkbare teksten/foto-URLs van de publieke site, met draft + published.';

create index if not exists site_content_page_idx on public.site_content (page);

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Admins manage everything (drafts + published). The public site never touches
-- this table directly; it reads published values through the function below.
alter table public.site_content enable row level security;

drop policy if exists "Admins manage content" on public.site_content;
create policy "Admins manage content"
  on public.site_content for all
  using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.site_content to authenticated;

-- ── Public read: published values only, as a flat { key: value } map ─────────
create or replace function public.get_published_content(p_page text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    jsonb_object_agg(key, published) filter (where published is not null),
    '{}'::jsonb
  )
  from public.site_content
  where page = p_page;
$$;

grant execute on function public.get_published_content(text) to anon, authenticated;

-- ── Publish: move every draft on a page to published (admin only) ────────────
-- SECURITY DEFINER bypasses RLS, so we check is_admin() inside and only grant to
-- authenticated. It also lets us assign published = draft in one statement
-- (PostgREST cannot do column-to-column updates from the client).
create or replace function public.publish_content(p_page text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Niet toegestaan';
  end if;
  update public.site_content
  set published = draft, draft = null, published_at = now(), updated_at = now()
  where page = p_page and draft is not null;
end;
$$;

grant execute on function public.publish_content(text) to authenticated;

-- ── Storage bucket for site photos (public read, admin write) ────────────────
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read site-images" on storage.objects;
create policy "Public read site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "Admins upload site-images" on storage.objects;
create policy "Admins upload site-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins update site-images" on storage.objects;
create policy "Admins update site-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins delete site-images" on storage.objects;
create policy "Admins delete site-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images' and public.is_admin());
