-- ============================================================================
-- Minterest admin panel - migration 0011: handtekening bij goedkeuren offerte
-- ----------------------------------------------------------------------------
-- Bij het online goedkeuren zet de klant een handtekening. Die slaan we op de
-- offerte op, samen met de getypte naam, en geven we terug in het admin panel
-- (en op de PDF). Afwijzen blijft ongewijzigd.
--
--   * quotes.signature   - de handtekening als PNG data-URL (base64).
--   * quotes.signed_name - de naam die de klant erbij typt.
--   * sign_and_accept_quote(token, signature, name) - nieuwe SECURITY DEFINER
--     functie die de offerte accepteert MET handtekening. respond_to_quote
--     (afwijzen / accepteren zonder handtekening) blijft bestaan.
--   * get_public_quote geeft nu ook signature, signed_name en responded_at mee.
--
-- Idempotent. Run after 0010.
-- ============================================================================

alter table public.quotes add column if not exists signature   text;
alter table public.quotes add column if not exists signed_name  text;

comment on column public.quotes.signature is 'Handtekening van de klant als PNG data-URL, gezet bij online goedkeuren.';
comment on column public.quotes.signed_name is 'Naam die de klant bij de handtekening typte.';

-- ── Publieke offerte-payload: handtekening + datum meegeven ───────────────────
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
    'signature', q.signature,
    'signed_name', q.signed_name,
    'responded_at', q.responded_at,
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

-- ── Accepteren met handtekening ───────────────────────────────────────────────
-- Alleen geldig zolang de offerte openstaat (verstuurd/bekeken). Slaat de
-- handtekening + naam op en zet de status op geaccepteerd.
create or replace function public.sign_and_accept_quote(
  p_token     text,
  p_signature text,
  p_signed_name text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  q public.quotes;
begin
  select * into q from public.quotes where public_token = p_token;
  if not found then
    raise exception 'Offerte niet gevonden';
  end if;

  if q.status not in ('verstuurd', 'bekeken') then
    return q.status; -- al beslist (of niet verstuurd) - geen wijziging
  end if;

  if coalesce(p_signature, '') = '' then
    raise exception 'Handtekening ontbreekt';
  end if;

  update public.quotes
     set status       = 'geaccepteerd',
         responded_at = now(),
         signature    = p_signature,
         signed_name  = nullif(btrim(coalesce(p_signed_name, '')), '')
   where id = q.id;

  return 'geaccepteerd';
end;
$$;

grant execute on function public.sign_and_accept_quote(text, text, text) to anon, authenticated;
