-- ============================================================================
-- Minterest admin panel - migration 0010: klant-KvK/BTW op de online documenten
-- ----------------------------------------------------------------------------
-- De publieke offerte- en factuur-links haalden alleen naam, contactpersoon,
-- e-mail en adres van de klant op. Hierdoor stond het KvK-nummer van de klant
-- niet in het "Aan"-blok van de online weergave. We breiden beide token-keyed
-- functies uit met de KvK (en BTW) van de klant. Verder niets gewijzigd.
--
-- Idempotent (create or replace). Run after 0009.
-- ============================================================================

-- ── Offerte ──────────────────────────────────────────────────────────────────
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
        'address', c.address,
        'kvk', c.kvk,
        'vat', c.vat
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

-- ── Factuur ──────────────────────────────────────────────────────────────────
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
        'email', c.email, 'address', c.address, 'kvk', c.kvk, 'vat', c.vat
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
