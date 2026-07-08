-- ============================================================================
-- Minterest admin panel - migration 0009: company details + Dutch Recycling
-- Metals offerte & factuur
-- ----------------------------------------------------------------------------
-- Three things, all on the existing structure (no new system):
--   1. Fill Minterest's own KvK + BTW in company_settings (one central place).
--   2. Add a nullable quotes.list_total: the "totale waarde" shown struck through
--      above the real investment on a quote. Purely presentational; the real
--      totals stay in subtotal / vat_amount / total. get_public_quote returns it.
--   3. Seed a concept offerte (+ its concept factuur) for the existing customer
--      Dutch Recycling Metals B.V. (KvK 74987070). Lines have no per-line price;
--      the customer sees one bundled investment with the btw breakdown.
--
-- Idempotent: safe to run more than once. Run after 0008.
-- ============================================================================

-- ── 1. Minterest's own details (central, read everywhere) ────────────────────
update public.company_settings
   set kvk = '83955526',
       vat = 'NL003932189B46',
       updated_at = now()
 where id = 1;

-- ── 2. Anchor value on quotes (doorgestreepte "totale waarde") ───────────────
alter table public.quotes
  add column if not exists list_total numeric(12,2);

comment on column public.quotes.list_total is
  'Optionele "totale waarde" die doorgestreept boven de investering wordt getoond. Alleen weergave; de echte bedragen staan in subtotal/vat_amount/total.';

-- Extend the public quote payload with list_total (header + system unchanged).
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
    'list_total', q.list_total,
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

grant execute on function public.get_public_quote(text) to anon, authenticated;

-- ── 3. Offerte + factuur voor Dutch Recycling Metals B.V. ────────────────────
do $$
declare
  v_customer_id uuid;
  v_quote_id    uuid;
  v_validity    int;
  v_due_days    int;
  -- Bedragen: investering 1.899 excl., 21% btw = 398,79, totaal 2.297,79.
  -- Totale waarde (doorgestreept) = 3.400.
  v_subtotal numeric(12,2) := 1899.00;
  v_vat      numeric(12,2) := 398.79;
  v_total    numeric(12,2) := 2297.79;
  v_list     numeric(12,2) := 3400.00;
  v_notes text :=
    'Hieronder het complete voorstel voor jullie nieuwe website en portaal. '
    'Alle genoemde onderdelen zijn inbegrepen in de investering.';
  -- Inbegrepen onderdelen (geen prijs per regel). De eerste vier zijn de
  -- hero-blokken bovenaan de offerte; de rest verschijnt als nette lijst.
  v_lines text[] := array[
    'Custom website, volledig op maat gebouwd (full web development)',
    'Eigen beveiligd admin portaal',
    'Custom CMS',
    'Facturatiemodule',
    'Offerteportaal',
    'Aanvraaginbox met statusbeheer per aanvraag',
    'Meertalige website in vier talen (Nederlands, Duits, Engels, Spaans)',
    'Aanvraag- en offerteformulier gekoppeld aan de inbox',
    'SEO-basis, hosting en domeinkoppeling'
  ];
  i int;
begin
  -- Bestaande klant ophalen (geen dubbele aanmaken).
  select id into v_customer_id
    from public.customers
   where regexp_replace(coalesce(kvk, ''), '\D', '', 'g') = '74987070'
   limit 1;

  if v_customer_id is null then
    raise exception 'Klant met KvK 74987070 (Dutch Recycling Metals B.V.) niet gevonden. Maak eerst de klant aan.';
  end if;

  select coalesce(quote_validity_days, 30), coalesce(invoice_due_days, 14)
    into v_validity, v_due_days
    from public.company_settings where id = 1;

  -- Al aangemaakt? Dan niets doen (idempotent).
  select id into v_quote_id
    from public.quotes
   where customer_id = v_customer_id
     and list_total = v_list
     and total = v_total
   order by created_at asc
   limit 1;

  if v_quote_id is null then
    insert into public.quotes (customer_id, status, issue_date, valid_until, notes,
                               subtotal, vat_amount, total, list_total)
    values (v_customer_id, 'concept', current_date,
            current_date + (v_validity || ' days')::interval, v_notes,
            v_subtotal, v_vat, v_total, v_list)
    returning id into v_quote_id;

    for i in 1 .. array_length(v_lines, 1) loop
      insert into public.quote_lines (quote_id, position, description, quantity, unit_price, vat_rate)
      values (v_quote_id, i - 1, v_lines[i], 1, 0, 21);
    end loop;
  end if;

  -- Bijbehorende concept-factuur, gekoppeld aan de offerte (idempotent).
  if not exists (select 1 from public.invoices where quote_id = v_quote_id) then
    insert into public.invoices (customer_id, quote_id, status, issue_date, due_date, notes,
                                 subtotal, vat_amount, total)
    values (v_customer_id, v_quote_id, 'concept', current_date,
            current_date + (v_due_days || ' days')::interval, v_notes,
            v_subtotal, v_vat, v_total)
    returning id into v_quote_id; -- hergebruik variabele voor de factuur-id

    for i in 1 .. array_length(v_lines, 1) loop
      insert into public.invoice_lines (invoice_id, position, description, quantity, unit_price, vat_rate)
      values (v_quote_id, i - 1, v_lines[i], 1, 0, 21);
    end loop;
  end if;
end;
$$;
