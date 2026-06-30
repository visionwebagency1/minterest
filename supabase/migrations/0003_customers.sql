-- ============================================================================
-- Minterest admin panel - migration 0003: customers (klanten)
-- ----------------------------------------------------------------------------
-- The customer book. A customer can be created on its own or straight from a
-- request (lead), and is linked to leads, quotes (offertes) and invoices
-- (facturen) so the admin can see the full history on one page.
--
-- Everything here is admin-only: no public access at all. Run after 0002.
-- ============================================================================

create table if not exists public.customers (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  company_name  text,            -- bedrijfsnaam
  contact_name  text,            -- contactpersoon
  email         text,
  phone         text,
  address       text,            -- adres (mag meerdere regels zijn)
  kvk           text,            -- KvK-nummer (optioneel)
  vat           text,            -- BTW-nummer (optioneel)
  notes         text
);

comment on table public.customers is 'Klanten van Minterest, gekoppeld aan aanvragen, offertes en facturen.';

create index if not exists customers_created_at_idx on public.customers (created_at desc);

-- ── Link existing leads to a customer ────────────────────────────────────────
-- leads.customer_id was created in 0002; wire up the foreign key now. When a
-- customer is deleted the lead stays but loses the link.
alter table public.leads
  drop constraint if exists leads_customer_id_fkey;
alter table public.leads
  add constraint leads_customer_id_fkey
  foreign key (customer_id) references public.customers (id) on delete set null;

create index if not exists leads_customer_id_idx on public.leads (customer_id);

-- ── Row Level Security: admin-only ───────────────────────────────────────────
alter table public.customers enable row level security;

drop policy if exists "Admins manage customers" on public.customers;
create policy "Admins manage customers"
  on public.customers
  for all
  using (public.is_admin())
  with check (public.is_admin());

grant select, insert, update, delete on public.customers to authenticated;
