-- ============================================================================
-- Minterest admin panel - migration 0012: factuur-list_total + branding/social
-- offerte & factuur voor Dutch Recycling Metals B.V.
-- ----------------------------------------------------------------------------
--   1. invoices.list_total (nullable): doorgestreepte "reguliere prijs" op de
--      factuur, net als op de offerte. get_public_invoice geeft hem mee.
--   2. Tweede concept-offerte (+ gekoppelde concept-factuur) voor de bestaande
--      klant (KvK 74987070): branding, video/fotoshoot en social media.
--      Eenmalige onderdelen met prijs, maandelijkse samenwerking op aanvraag.
--      Reguliere prijs 2.999 doorgestreept, investering 2.198 excl. btw.
--
-- Sectiekoppen staan als regels met "## " ervoor; de offerte-weergave rendert
-- die als sectielabel en niet als onderdeel.
--
-- Idempotent. Run after 0011.
-- ============================================================================

alter table public.invoices add column if not exists list_total numeric(12,2);

comment on column public.invoices.list_total is
  'Optionele "reguliere prijs" die doorgestreept boven het factuurbedrag wordt getoond. Alleen weergave.';

-- ── Publieke factuur-payload: list_total + klant-KvK/BTW meegeven ─────────────
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
    'list_total', inv.list_total,
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

-- ── Offerte + factuur: branding, video/fotoshoot en social media ─────────────
do $$
declare
  v_customer_id uuid;
  v_quote_id    uuid;
  v_invoice_id  uuid;
  v_validity    int;
  v_due_days    int;
  -- Eenmalig: 1.249 + 699 + 250 = 2.198 excl. btw. 21% btw = 461,58.
  v_subtotal numeric(12,2) := 2198.00;
  v_vat      numeric(12,2) := 461.58;
  v_total    numeric(12,2) := 2659.58;
  v_list     numeric(12,2) := 2999.00;
  v_notes text :=
    'Voorstel voor jullie merk, beeld en social media. De eenmalige onderdelen '
    'hieronder vormen de investering. De maandelijkse samenwerking is op aanvraag '
    'en valt buiten dit bedrag.';
  v_branding text := 'Branding en huisstijl (Belettering vrachtwagens · Briefpapier en emailhandtekening · 2 visitekaartje-ontwerpen · Pennen en bedrijfskleding · Labels en stickers voor containers)';
  v_video    text := 'Video- en fotoshoot (Professionele opnames op beide locaties · De oven en knipschaar in beeld · Team en werkzaamheden · Direct bruikbaar voor de nieuwe website en social media)';
  v_opbouw   text := 'Social media opbouw (LinkedIn, Instagram/Facebook en TikTok volledig vanaf nul opzetten · Profielen, uitstraling en een eerste contentplan · Klaar om mee te starten)';
  v_beheer   text := 'Social media beheer (Planning, plaatsing en beheer van LinkedIn, Instagram/Facebook en TikTok volledig uit handen · Content over het proces, de machines en het bedrijf · Reageren en community-onderhoud · Afhankelijk van het aantal video''s en foto''s per maand)';
  v_content  text := 'Social media content (Vaste stroom aan foto- en videocontent over jullie werk en machines · Afgestemd op de kanalen en de doelgroep · Omvang en frequentie in overleg)';
begin
  select id into v_customer_id
    from public.customers
   where regexp_replace(coalesce(kvk, ''), '\D', '', 'g') = '74987070'
   limit 1;

  if v_customer_id is null then
    raise exception 'Klant met KvK 74987070 niet gevonden. Maak eerst de klant aan.';
  end if;

  select coalesce(quote_validity_days, 30), coalesce(invoice_due_days, 14)
    into v_validity, v_due_days
    from public.company_settings where id = 1;

  -- Al aangemaakt? (idempotent op deze specifieke offerte)
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

    insert into public.quote_lines (quote_id, position, description, quantity, unit_price, vat_rate) values
      (v_quote_id, 0, '## Eenmalig', 1, 0, 21),
      (v_quote_id, 1, v_branding, 1, 1249, 21),
      (v_quote_id, 2, v_video,    1, 699,  21),
      (v_quote_id, 3, v_opbouw,   1, 250,  21),
      (v_quote_id, 4, '## Maandelijkse samenwerking', 1, 0, 21),
      (v_quote_id, 5, v_beheer,   1, 0, 21),
      (v_quote_id, 6, v_content,  1, 0, 21);
  end if;

  -- Bijbehorende concept-factuur: alleen de eenmalige onderdelen.
  if not exists (select 1 from public.invoices where quote_id = v_quote_id) then
    insert into public.invoices (customer_id, quote_id, status, issue_date, due_date, notes,
                                 subtotal, vat_amount, total, list_total)
    values (v_customer_id, v_quote_id, 'concept', current_date,
            current_date + (v_due_days || ' days')::interval, v_notes,
            v_subtotal, v_vat, v_total, v_list)
    returning id into v_invoice_id;

    insert into public.invoice_lines (invoice_id, position, description, quantity, unit_price, vat_rate) values
      (v_invoice_id, 0, '## Eenmalig', 1, 0, 21),
      (v_invoice_id, 1, v_branding, 1, 1249, 21),
      (v_invoice_id, 2, v_video,    1, 699,  21),
      (v_invoice_id, 3, v_opbouw,   1, 250,  21);
  end if;
end;
$$;
