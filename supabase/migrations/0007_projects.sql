-- ============================================================================
-- Minterest admin panel - migration 0007: projects (portfolio / cases)
-- ----------------------------------------------------------------------------
-- Real portfolio projects, each with its own case page (/work/:slug). Managed
-- in the admin under "Projecten": create, edit, reorder, feature on the home
-- page, and publish. Photos use the existing site-images Storage bucket.
--
-- Public access: anon may read ONLY published projects (RLS). The public site
-- reads them through the REST endpoint with the anon key (no Supabase client in
-- the public bundle). Admins manage everything.
--
-- Run after 0006.
-- ============================================================================

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  slug         text not null unique,
  title        text not null,
  category     text,
  client       text,
  year         text,
  cover_image  text,
  summary      text,               -- short line, shown on the grid + case intro
  intro        text,               -- opening paragraph on the case page
  challenge    text,
  approach     text,
  result       text,
  gallery      text[] not null default '{}',
  quote        text,
  quote_author text,
  featured     boolean not null default false,   -- show on the homepage grid
  sort_order   int not null default 0,
  status       text not null default 'concept'
                 check (status in ('concept', 'gepubliceerd')),
  updated_at   timestamptz not null default now()
);

comment on table public.projects is 'Portfolio-projecten met eigen case-pagina (/work/:slug).';

create index if not exists projects_status_sort_idx on public.projects (status, sort_order);
create index if not exists projects_featured_idx on public.projects (featured) where featured;

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.projects enable row level security;

-- Public: read published projects only.
drop policy if exists "Anyone reads published projects" on public.projects;
create policy "Anyone reads published projects"
  on public.projects for select
  to anon, authenticated
  using (status = 'gepubliceerd');

-- Admins: full control (this OR-combines with the read policy above).
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects for all
  using (public.is_admin()) with check (public.is_admin());

grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;

-- ── Seed 4 starter projects ──────────────────────────────────────────────────
-- Published placeholders so the portfolio is never empty; edit them into real
-- cases in the admin. (These mirror the previous hard-coded examples.)
insert into public.projects (slug, title, category, summary, featured, sort_order, status) values
  ('luna-light',  'Luna Light',  'Webshop · Shopify',        'Korte samenvatting van dit project. Pas aan in de admin.', true, 1, 'gepubliceerd'),
  ('ascend-labs', 'Ascend Labs', 'SaaS · Development',       'Korte samenvatting van dit project. Pas aan in de admin.', true, 2, 'gepubliceerd'),
  ('dyota',       'DYOTA',       'Branding · Landingpage',   'Korte samenvatting van dit project. Pas aan in de admin.', true, 3, 'gepubliceerd'),
  ('bloom-en-co', 'Bloom & Co',  'Website · Merk',           'Korte samenvatting van dit project. Pas aan in de admin.', true, 4, 'gepubliceerd')
on conflict (slug) do nothing;
