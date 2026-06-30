-- ============================================================================
-- Minterest admin panel - migration 0005: invoices (facturen)
-- ----------------------------------------------------------------------------
-- Invoices with their own number series, dates, totals and status
-- (concept / verstuurd / betaald / vervallen). An accepted quote can be turned
-- into an invoice in one click (the app copies customer + lines).
--
-- Admin-only through RLS. The only public access is a read-only online view via
-- a token-keyed SECURITY DEFINER function (no approve/reject, unlike quotes).
--
-- Run after 0004.
-- ============================================================================

-- ── Extra company settings for invoices ──────────────────────────────────────
alter table public.company_settings
  add column if not exists invoice_due_days int not null default 14;
alter table public.company_settings
  add column if not exists invoice_footer text;

-- ── Invoice numbering (own series) ───────────────────────────────────────────
create sequence if not exists public.invoice_number_seq;

-- ── Invoices ─────────────────────────────────────────────────────────────────
create table if not exists public.invoices (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  number        text not null unique
                  default ('FAC-' || to_char(now(), 'YYYY') || '-' ||
                           lpad(nextval('public.invoice_number_seq')::text, 4, '0')),
  customer_id   uuid references public.customers (id) on delete set null,
  quote_id      uuid references public.quotes (id) on delete set null,
  status        text not null default 'concept'
                  check (status in ('concept', 'verstuurd', 'betaald', 'vervallen')),
  issue_date    date not null default current_date,
  due_date      date,
  notes         text,
  subtotal      numeric(12,2) not null default 0,
  vat_amount    numeric(12,2) not null default 0,
  total         numeric(12,2) not null default 0,
  public_token  text not null unique default gen_random_uuid()::text,
  paid_at       timestamptz
);

comment on table public.invoices is 'Facturen met eigen nummerreeks en btw-overzicht.';

create index if not exists invoices_created_at_idx on public.invoices (created_at desc);
create index if not exists invoices_customer_id_idx on public.invoices (customer_id);
create index if not exists invoices_quote_id_idx on public.invoices (quote_id);
create index if not exists invoices_status_idx on public.invoices (status);

-- ── Invoice lines ────────────────────────────────────────────────────────────
create table if not exists public.invoice_lines (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references public.invoices (id) on delete cascade,
  position    int not null default 0,
  description text not null default '',
  quantity    numeric(12,2) not null default 1,
  unit_price  numeric(12,2) not null default 0,
  vat_rate    numeric(5,2) not null default 21
);

create index if not exists invoice_lines_invoice_id_idx on public.invoice_lines (invoice_id, position);

-- ── Row Level Security: admin-only on the tables ─────────────────────────────
alter table public.invoices enable row level security;
alter table public.invoice_lines enable row level security;

drop policy if exists "Admins manage invoices" on public.invoices;
create policy "Admins manage invoices"
  on public.invoices for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage invoice lines" on public.invoice_lines;
create policy "Admins manage invoice lines"
  on public.invoice_lines for all
  using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.invoices to authenticated;
grant select, insert, update, delete on public.invoice_lines to authenticated;

-- ── Public read-only online view via token ───────────────────────────────────
create or replace function public.get_public_invoice(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  inv public.invoices;
begin
  select * into inv from public.invoices where public_token = p_token;
  if not found then
    return null;
  end if;

  return jsonb_build_object(
    'number', inv.number,
    'status', inv.status,
    'issue_date', inv.issue_date,
    'due_date', inv.due_date,
    'notes', inv.notes,
    'subtotal', inv.subtotal,
    'vat_amount', inv.vat_amount,
    'total', inv.total,
    'customer', (
      select jsonb_build_object(
        'company_name', c.company_name, 'contact_name', c.contact_name,
        'email', c.email, 'address', c.address
      ) from public.customers c where c.id = inv.customer_id
    ),
    'company', (
      select jsonb_build_object(
        'company_name', s.company_name, 'address', s.address, 'kvk', s.kvk,
        'vat', s.vat, 'email', s.email, 'phone', s.phone, 'iban', s.iban,
        'website', s.website, 'invoice_footer', s.invoice_footer
      ) from public.company_settings s where s.id = 1
    ),
    'lines', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'description', l.description, 'quantity', l.quantity,
        'unit_price', l.unit_price, 'vat_rate', l.vat_rate
      ) order by l.position), '[]'::jsonb)
      from public.invoice_lines l where l.invoice_id = inv.id
    )
  );
end;
$$;

grant execute on function public.get_public_invoice(text) to anon, authenticated;
