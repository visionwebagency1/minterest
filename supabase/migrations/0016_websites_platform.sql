-- ============================================================================
-- Minterest - migration 0016: abonnementsplatform "websites per maand"
-- ----------------------------------------------------------------------------
-- Het complete datamodel uit hoofdstuk 3 van 23_websites_abonnement_masterplan.md.
-- Drie bestaande tabellen worden hergebruikt in plaats van gedupliceerd, zodat
-- er maar een klantenboek, een inbox en een factuurreeks is:
--   * public.customers  -> krijgt auth-koppeling + mollie_customer_id
--   * public.leads      -> krijgt gekozen plan / template / gewenst domein
--   * public.invoices   -> krijgt subscription + mollie_payment + periode
--
-- Nieuw, allemaal met het voorvoegsel web_ zodat ze in deze gedeelde database
-- nooit botsen met de tabellen van het bureau (public.site_content bestond al
-- als CMS van de hoofdsite): web_plans, web_templates, web_subscriptions,
-- web_sites, web_site_content, web_domains, web_change_requests.
--
-- RLS staat overal aan. Drie soorten toegang:
--   anon           - alleen de publieke galerij (actieve plannen, beschikbare
--                    templates) en het aanmelden van een lead.
--   klant          - alleen de eigen rijen, via public.current_customer_id().
--   admin          - alles, via public.is_admin().
-- De renderer leest nooit rechtstreeks uit deze tabellen maar via
-- public.get_site_by_domain(host), zodat interne velden (Vercel- en
-- Sanity-referenties, notities) nooit publiek worden.
--
-- Run na 0015.
-- ============================================================================

-- ── Klant-koppeling: welke customer hoort bij de ingelogde gebruiker? ────────
alter table public.customers
  add column if not exists auth_user_id      uuid references auth.users (id) on delete set null,
  add column if not exists mollie_customer_id text;

create unique index if not exists customers_auth_user_id_key
  on public.customers (auth_user_id) where auth_user_id is not null;
create index if not exists customers_mollie_customer_id_idx
  on public.customers (mollie_customer_id);

comment on column public.customers.auth_user_id is
  'Auth-gebruiker van de klantomgeving. Leeg voor klanten zonder login.';

create or replace function public.current_customer_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select c.id from public.customers c where c.auth_user_id = auth.uid() limit 1;
$$;

-- Een ingelogde klant mag zijn eigen klantrij lezen (naam, adres, contact).
drop policy if exists "Klant leest eigen klantgegevens" on public.customers;
create policy "Klant leest eigen klantgegevens"
  on public.customers for select
  to authenticated
  using (auth_user_id = auth.uid());

-- ── plans ────────────────────────────────────────────────────────────────────
create table if not exists public.web_plans (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  slug           text not null unique check (slug in ('start', 'groei', 'pro')),
  name           text not null,
  tagline        text,
  price_monthly  numeric(10,2) not null,
  price_from     boolean not null default false,   -- true = "vanaf" (Pro)
  currency       text not null default 'EUR',
  features       text[] not null default '{}',
  max_pages      int,                              -- null = onbeperkt
  editor_enabled boolean not null default false,   -- eigen Sanity-editor
  included_change_requests int not null default 0, -- per maand inbegrepen
  mollie_price_ref text,
  sort_order     int not null default 0,
  active         boolean not null default true
);

comment on table public.web_plans is 'De abonnementen Start / Groei / Pro.';

alter table public.web_plans enable row level security;

drop policy if exists "Iedereen leest actieve plannen" on public.web_plans;
create policy "Iedereen leest actieve plannen"
  on public.web_plans for select to anon, authenticated using (active);

drop policy if exists "Admins beheren plannen" on public.web_plans;
create policy "Admins beheren plannen"
  on public.web_plans for all using (public.is_admin()) with check (public.is_admin());

grant select on public.web_plans to anon;
grant select, insert, update, delete on public.web_plans to authenticated;

-- ── templates ────────────────────────────────────────────────────────────────
create table if not exists public.web_templates (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  slug          text not null unique,
  name          text not null,
  description   text,
  preview_image text,          -- grote preview in de galerij
  thumbnail     text,
  demo_url      text,
  -- Voor welke plannen is dit template beschikbaar (plan-slugs).
  plan_slugs    text[] not null default '{start,groei}',
  -- JSON-schema van de invulbare velden (teksten, kleuren, logo, foto's).
  config_schema jsonb not null default '{}'::jsonb,
  max_pages     int not null default 5,
  status        text not null default 'concept'
                  check (status in ('concept', 'beschikbaar', 'gearchiveerd')),
  sort_order    int not null default 0
);

comment on table public.web_templates is 'De template-galerij voor Start- en Groei-sites.';

alter table public.web_templates enable row level security;

drop policy if exists "Iedereen leest beschikbare templates" on public.web_templates;
create policy "Iedereen leest beschikbare templates"
  on public.web_templates for select to anon, authenticated
  using (status = 'beschikbaar');

drop policy if exists "Admins beheren templates" on public.web_templates;
create policy "Admins beheren templates"
  on public.web_templates for all using (public.is_admin()) with check (public.is_admin());

grant select on public.web_templates to anon;
grant select, insert, update, delete on public.web_templates to authenticated;

-- ── subscriptions ────────────────────────────────────────────────────────────
create table if not exists public.web_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  plan_id     uuid references public.web_plans (id) on delete restrict,
  status      text not null default 'concept'
                check (status in ('concept', 'wacht_op_betaling', 'actief',
                                  'betaling_mislukt', 'gepauzeerd',
                                  'opgezegd', 'beeindigd')),
  amount      numeric(10,2) not null default 0,
  billing_interval text not null default '1 month',
  mollie_customer_id     text,
  mollie_subscription_id text unique,
  mollie_mandate_id      text,
  started_at        timestamptz,
  next_payment_date date,
  current_period_end date,
  cancel_at_period_end boolean not null default false,
  canceled_at   timestamptz,
  ended_at      timestamptz,
  failed_payments int not null default 0,
  notes         text
);

comment on table public.web_subscriptions is 'Maandabonnement per klant, gespiegeld aan Mollie.';

create index if not exists web_subscriptions_customer_id_idx on public.web_subscriptions (customer_id);
create index if not exists web_subscriptions_status_idx on public.web_subscriptions (status);

alter table public.web_subscriptions enable row level security;

drop policy if exists "Klant leest eigen abonnement" on public.web_subscriptions;
create policy "Klant leest eigen abonnement"
  on public.web_subscriptions for select to authenticated
  using (customer_id = public.current_customer_id());

drop policy if exists "Admins beheren abonnementen" on public.web_subscriptions;
create policy "Admins beheren abonnementen"
  on public.web_subscriptions for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.web_subscriptions to authenticated;

-- ── sites ────────────────────────────────────────────────────────────────────
create table if not exists public.web_sites (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  customer_id     uuid not null references public.customers (id) on delete cascade,
  subscription_id uuid references public.web_subscriptions (id) on delete set null,
  template_id     uuid references public.web_templates (id) on delete set null,
  tier            text not null default 'start' check (tier in ('start', 'groei', 'pro')),
  name            text not null default '',
  primary_domain  text,   -- de hostnaam waarop de renderer deze site herkent
  status          text not null default 'concept'
                    check (status in ('concept', 'wacht_op_domein', 'live',
                                      'gepauzeerd', 'gearchiveerd')),
  content_source  text not null default 'supabase'
                    check (content_source in ('supabase', 'sanity', 'custom')),
  sanity_project_ref text,
  sanity_dataset     text,
  vercel_project_ref text,   -- alleen Pro: eigen Vercel-project
  published_at    timestamptz,
  notes           text
);

comment on table public.web_sites is 'De website van een klant: welk template, welke bron, welk domein.';

create unique index if not exists web_sites_primary_domain_key
  on public.web_sites (lower(primary_domain)) where primary_domain is not null;
create index if not exists web_sites_customer_id_idx on public.web_sites (customer_id);
create index if not exists web_sites_status_idx on public.web_sites (status);

alter table public.web_sites enable row level security;

drop policy if exists "Klant leest eigen sites" on public.web_sites;
create policy "Klant leest eigen sites"
  on public.web_sites for select to authenticated
  using (customer_id = public.current_customer_id());

drop policy if exists "Admins beheren sites" on public.web_sites;
create policy "Admins beheren sites"
  on public.web_sites for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.web_sites to authenticated;

-- ── site_content (Start: JSON in Supabase) ───────────────────────────────────
create table if not exists public.web_site_content (
  id         uuid primary key default gen_random_uuid(),
  site_id    uuid not null references public.web_sites (id) on delete cascade,
  locale     text not null default 'nl',
  data       jsonb not null default '{}'::jsonb,
  version    int not null default 1,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  unique (site_id, locale)
);

comment on table public.web_site_content is
  'Content per site voor Start-sites: teksten, kleuren, logo, fotos, paginas.';

alter table public.web_site_content enable row level security;

-- Start-klanten bewerken bewust NIETS zelf: alleen lezen. Wijzigen loopt via
-- web_change_requests. Dat is de regel die de marge beschermt.
drop policy if exists "Klant leest eigen content" on public.web_site_content;
create policy "Klant leest eigen content"
  on public.web_site_content for select to authenticated
  using (exists (
    select 1 from public.web_sites s
     where s.id = web_site_content.site_id
       and s.customer_id = public.current_customer_id()
  ));

drop policy if exists "Admins beheren content" on public.web_site_content;
create policy "Admins beheren content"
  on public.web_site_content for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.web_site_content to authenticated;

-- ── domains ──────────────────────────────────────────────────────────────────
create table if not exists public.web_domains (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  site_id       uuid not null references public.web_sites (id) on delete cascade,
  name          text not null,
  is_primary    boolean not null default true,
  -- Spiegel van de Vercel Domains API.
  vercel_status text not null default 'niet_gekoppeld'
                  check (vercel_status in ('niet_gekoppeld', 'toegevoegd',
                                           'geverifieerd', 'fout')),
  dns_verified  boolean not null default false,
  ssl_status    text not null default 'onbekend'
                  check (ssl_status in ('onbekend', 'wachtend', 'actief', 'fout')),
  -- De DNS-records die de klant moet zetten (A / CNAME), zoals Vercel ze geeft.
  dns_instructions jsonb not null default '[]'::jsonb,
  last_checked_at  timestamptz,
  error_message    text
);

comment on table public.web_domains is 'Domein per site met Vercel-, DNS- en SSL-status.';

create unique index if not exists web_domains_name_key on public.web_domains (lower(name));
create index if not exists web_domains_site_id_idx on public.web_domains (site_id);

alter table public.web_domains enable row level security;

drop policy if exists "Klant leest eigen domeinen" on public.web_domains;
create policy "Klant leest eigen domeinen"
  on public.web_domains for select to authenticated
  using (exists (
    select 1 from public.web_sites s
     where s.id = web_domains.site_id
       and s.customer_id = public.current_customer_id()
  ));

drop policy if exists "Admins beheren domeinen" on public.web_domains;
create policy "Admins beheren domeinen"
  on public.web_domains for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.web_domains to authenticated;

-- ── change_requests (wijzigingsaanvragen van Start-klanten) ──────────────────
create table if not exists public.web_change_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  site_id     uuid not null references public.web_sites (id) on delete cascade,
  customer_id uuid not null references public.customers (id) on delete cascade,
  description text not null,
  status      text not null default 'nieuw'
                check (status in ('nieuw', 'in_behandeling', 'afgerond', 'afgewezen')),
  -- Maand waarin de aanvraag telt, als eerste dag van die maand.
  period      date not null default date_trunc('month', now())::date,
  included    boolean not null default true,   -- binnen de maandelijkse bundel?
  extra_cost  numeric(10,2),
  handled_at  timestamptz,
  handled_by  uuid references auth.users (id) on delete set null,
  admin_notes text
);

comment on table public.web_change_requests is
  'Wijzigingsaanvragen van Start-klanten: een per maand inbegrepen.';

create index if not exists web_change_requests_site_id_idx on public.web_change_requests (site_id);
create index if not exists web_change_requests_status_idx on public.web_change_requests (status);
create index if not exists web_change_requests_period_idx on public.web_change_requests (period);

alter table public.web_change_requests enable row level security;

drop policy if exists "Klant leest eigen aanvragen" on public.web_change_requests;
create policy "Klant leest eigen aanvragen"
  on public.web_change_requests for select to authenticated
  using (customer_id = public.current_customer_id());

drop policy if exists "Klant dient aanvraag in" on public.web_change_requests;
create policy "Klant dient aanvraag in"
  on public.web_change_requests for insert to authenticated
  with check (
    customer_id = public.current_customer_id()
    and status = 'nieuw'
    and exists (
      select 1 from public.web_sites s
       where s.id = web_change_requests.site_id
         and s.customer_id = public.current_customer_id()
    )
  );

drop policy if exists "Admins beheren aanvragen" on public.web_change_requests;
create policy "Admins beheren aanvragen"
  on public.web_change_requests for all using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.web_change_requests to authenticated;

-- ── leads: aanvragen vanaf /websites ─────────────────────────────────────────
-- De bestaande inbox wordt hergebruikt (source = 'websites'). Zo zit er maar
-- een inbox in het admin. Alleen de plan/template-keuze komt erbij.
alter table public.leads
  add column if not exists plan_id        uuid references public.web_plans (id) on delete set null,
  add column if not exists template_id    uuid references public.web_templates (id) on delete set null,
  add column if not exists desired_domain text,
  add column if not exists phone          text;

create index if not exists leads_source_idx on public.leads (source);

-- ── invoices: incasso-facturen uit Mollie ────────────────────────────────────
alter table public.invoices
  add column if not exists subscription_id   uuid references public.web_subscriptions (id) on delete set null,
  add column if not exists mollie_payment_id text,
  add column if not exists period_start      date,
  add column if not exists period_end        date;

create index if not exists invoices_subscription_id_idx on public.invoices (subscription_id);
create unique index if not exists invoices_mollie_payment_id_key
  on public.invoices (mollie_payment_id) where mollie_payment_id is not null;

-- De klantomgeving toont de factuurhistorie: eigen facturen lezen mag.
drop policy if exists "Klant leest eigen facturen" on public.invoices;
create policy "Klant leest eigen facturen"
  on public.invoices for select to authenticated
  using (customer_id = public.current_customer_id());

drop policy if exists "Klant leest eigen factuurregels" on public.invoice_lines;
create policy "Klant leest eigen factuurregels"
  on public.invoice_lines for select to authenticated
  using (exists (
    select 1 from public.invoices i
     where i.id = invoice_lines.invoice_id
       and i.customer_id = public.current_customer_id()
  ));

-- ── De renderer: een site opzoeken op host-domein ────────────────────────────
-- SECURITY DEFINER, net als get_public_quote/get_public_invoice. Geeft alleen
-- live sites terug en alleen de velden die nodig zijn om te renderen. Interne
-- velden (vercel_project_ref, notes, klantgegevens) blijven buiten beeld.
create or replace function public.get_site_by_domain(host text)
returns table (
  site_id        uuid,
  tier           text,
  template_slug  text,
  content_source text,
  sanity_project_ref text,
  sanity_dataset     text,
  primary_domain text,
  content        jsonb
)
language sql
stable
security definer
set search_path = public
as $$
  select s.id,
         s.tier,
         t.slug,
         s.content_source,
         s.sanity_project_ref,
         s.sanity_dataset,
         s.primary_domain,
         coalesce(sc.data, '{}'::jsonb)
    from public.web_sites s
    left join public.web_templates t on t.id = s.template_id
    left join public.web_site_content sc on sc.site_id = s.id and sc.locale = 'nl'
   where s.status = 'live'
     and (
       lower(s.primary_domain) = lower(host)
       or exists (
         select 1 from public.web_domains d
          where d.site_id = s.id and lower(d.name) = lower(host)
       )
     )
   limit 1;
$$;

revoke all on function public.get_site_by_domain(text) from public;
grant execute on function public.get_site_by_domain(text) to anon, authenticated;
