-- ============================================================================
-- Minterest admin panel - migration 0004: company settings + quotes (offertes)
-- ----------------------------------------------------------------------------
-- Adds:
--   * company_settings  - one row with Minterest's own details for documents.
--   * quotes            - offertes with status, numbering, dates, totals.
--   * quote_lines       - the line items (omschrijving, aantal, prijs, btw).
--
-- Quotes are admin-only through RLS. The ONLY public access is the online quote
-- link, and that goes exclusively through two SECURITY DEFINER functions keyed
-- on a non-guessable token, so anon can never read the tables directly.
--
-- Run after 0003.
-- ============================================================================

-- ── Company settings (single row) ────────────────────────────────────────────
create table if not exists public.company_settings (
  id                  int primary key default 1 check (id = 1),
  company_name        text not null default 'Minterest',
  address             text,
  kvk                 text,
  vat                 text,
  email               text default 'info@minterest.nl',
  phone               text,
  iban                text,
  website             text default 'minterest.nl',
  default_vat_rate    numeric(5,2) not null default 21,
  quote_validity_days int not null default 30,
  quote_footer        text,
  updated_at          timestamptz not null default now()
);

-- Seed the single row so the admin always has settings to edit.
insert into public.company_settings (id) values (1) on conflict (id) do nothing;

alter table public.company_settings enable row level security;

drop policy if exists "Admins manage settings" on public.company_settings;
create policy "Admins manage settings"
  on public.company_settings for all
  using (public.is_admin()) with check (public.is_admin());

grant select, insert, update on public.company_settings to authenticated;

-- ── Quote numbering ──────────────────────────────────────────────────────────
create sequence if not exists public.quote_number_seq;

-- ── Quotes ───────────────────────────────────────────────────────────────────
create table if not exists public.quotes (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  number        text not null unique
                  default ('OFF-' || to_char(now(), 'YYYY') || '-' ||
                           lpad(nextval('public.quote_number_seq')::text, 4, '0')),
  customer_id   uuid references public.customers (id) on delete set null,
  status        text not null default 'concept'
                  check (status in ('concept', 'verstuurd', 'bekeken', 'geaccepteerd', 'afgewezen')),
  issue_date    date not null default current_date,
  valid_until   date,
  notes         text,
  -- Snapshot of the totals (cents-exact numeric) so lists and the public view
  -- do not have to recompute. Kept in sync by the app whenever lines change.
  subtotal      numeric(12,2) not null default 0,
  vat_amount    numeric(12,2) not null default 0,
  total         numeric(12,2) not null default 0,
  -- Non-guessable token for the public online quote link. Exists from creation,
  -- only shared with the customer once the quote is sent.
  public_token  text not null unique default gen_random_uuid()::text,
  responded_at  timestamptz
);

comment on table public.quotes is 'Offertes met regels, btw en een online goedkeur-link.';

create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_customer_id_idx on public.quotes (customer_id);
create index if not exists quotes_status_idx on public.quotes (status);

-- ── Quote lines ──────────────────────────────────────────────────────────────
create table if not exists public.quote_lines (
  id          uuid primary key default gen_random_uuid(),
  quote_id    uuid not null references public.quotes (id) on delete cascade,
  position    int not null default 0,
  description text not null default '',
  quantity    numeric(12,2) not null default 1,
  unit_price  numeric(12,2) not null default 0,
  vat_rate    numeric(5,2) not null default 21
);

create index if not exists quote_lines_quote_id_idx on public.quote_lines (quote_id, position);

-- ── Row Level Security: admin-only on the tables ─────────────────────────────
alter table public.quotes enable row level security;
alter table public.quote_lines enable row level security;

drop policy if exists "Admins manage quotes" on public.quotes;
create policy "Admins manage quotes"
  on public.quotes for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage quote lines" on public.quote_lines;
create policy "Admins manage quote lines"
  on public.quote_lines for all
  using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on public.quotes to authenticated;
grant select, insert, update, delete on public.quote_lines to authenticated;

-- ── Public access via token-keyed functions only ─────────────────────────────
-- Returns the full quote for the online link, or null when the token is unknown.
-- Opening a "verstuurd" quote marks it "bekeken" (so the admin sees it landed).
create or replace function public.get_public_quote(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  q public.quotes;
begin
  select * into q from public.quotes where public_token = p_token;
  if not found then
    return null;
  end if;

  if q.status = 'verstuurd' then
    update public.quotes set status = 'bekeken' where id = q.id;
    q.status := 'bekeken';
  end if;

  return jsonb_build_object(
    'number', q.number,
    'status', q.status,
    'issue_date', q.issue_date,
    'valid_until', q.valid_until,
    'notes', q.notes,
    'subtotal', q.subtotal,
    'vat_amount', q.vat_amount,
    'total', q.total,
    'customer', (
      select jsonb_build_object(
        'company_name', c.company_name,
        'contact_name', c.contact_name,
        'email', c.email,
        'address', c.address
      ) from public.customers c where c.id = q.customer_id
    ),
    'company', (
      select jsonb_build_object(
        'company_name', s.company_name, 'address', s.address, 'kvk', s.kvk,
        'vat', s.vat, 'email', s.email, 'phone', s.phone, 'iban', s.iban,
        'website', s.website, 'quote_footer', s.quote_footer
      ) from public.company_settings s where s.id = 1
    ),
    'lines', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'description', l.description, 'quantity', l.quantity,
        'unit_price', l.unit_price, 'vat_rate', l.vat_rate
      ) order by l.position), '[]'::jsonb)
      from public.quote_lines l where l.quote_id = q.id
    )
  );
end;
$$;

-- The customer accepts or rejects from the online link. Only valid while the
-- quote is out for response; the admin sees the new status immediately.
create or replace function public.respond_to_quote(p_token text, p_decision text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  q public.quotes;
  new_status text;
begin
  select * into q from public.quotes where public_token = p_token;
  if not found then
    raise exception 'Offerte niet gevonden';
  end if;

  if q.status not in ('verstuurd', 'bekeken') then
    return q.status; -- already decided (or not sent) - no change
  end if;

  if p_decision = 'accept' then
    new_status := 'geaccepteerd';
  elsif p_decision = 'reject' then
    new_status := 'afgewezen';
  else
    raise exception 'Ongeldige keuze';
  end if;

  update public.quotes set status = new_status, responded_at = now() where id = q.id;
  return new_status;
end;
$$;

grant execute on function public.get_public_quote(text) to anon, authenticated;
grant execute on function public.respond_to_quote(text, text) to anon, authenticated;
