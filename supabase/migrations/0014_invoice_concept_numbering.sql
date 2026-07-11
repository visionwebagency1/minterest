-- ============================================================================
-- Minterest admin panel - migration 0014: concept-nummering voor facturen
-- ----------------------------------------------------------------------------
-- Concept-facturen krijgen GEEN echt factuurnummer meer, maar heten
-- "Concept 001", "Concept 002", ... Het echte nummer (M-FAC-2026-001) wordt pas
-- toegekend zodra de factuur de conceptstatus verlaat (verstuurd/betaald/
-- vervallen). Zo blijft de echte factuurreeks netjes doorlopend, wat wettelijk
-- verplicht is. Het nummer is ook handmatig aan te passen in het adminpaneel.
--
-- Verder:
--   * de 2 facturen van Dutch Recycling Metals worden Concept 001 / Concept 002;
--   * de WRBC-factuur wordt de eerste echte factuur M-FAC-2026-001.
--
-- Run after 0013.
-- ============================================================================

-- Aparte teller voor concept-facturen.
create sequence if not exists public.invoice_concept_seq;

-- De vaste default vervalt; een trigger bepaalt het nummer (concept vs echt).
alter table public.invoices alter column number drop default;

-- ── Nummer-toewijzing via trigger ─────────────────────────────────────────────
create or replace function public.invoices_assign_number()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    if new.number is null or btrim(new.number) = '' then
      if new.status = 'concept' then
        new.number := 'Concept ' || lpad(nextval('public.invoice_concept_seq')::text, 3, '0');
      else
        new.number := 'M-FAC-' || to_char(coalesce(new.issue_date, current_date), 'YYYY') || '-' ||
                      lpad(nextval('public.invoice_number_seq')::text, 3, '0');
      end if;
    end if;

  elsif TG_OP = 'UPDATE' then
    -- Verlaat de factuur de conceptstatus en staat er nog een concept-placeholder
    -- (of niets), dan krijgt hij nu het eerstvolgende echte factuurnummer.
    -- Een handmatig ingevuld nummer blijft altijd staan.
    if old.status = 'concept' and new.status <> 'concept'
       and (new.number is null or new.number like 'Concept %') then
      new.number := 'M-FAC-' || to_char(coalesce(new.issue_date, current_date), 'YYYY') || '-' ||
                    lpad(nextval('public.invoice_number_seq')::text, 3, '0');
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists invoices_assign_number_trg on public.invoices;
create trigger invoices_assign_number_trg
  before insert or update on public.invoices
  for each row execute function public.invoices_assign_number();

-- ── Data: DRM naar Concept, WRBC naar de eerste echte factuur ─────────────────
do $$
declare
  drm uuid;
  rec record;
  n int := 0;
  wrbc_count int;
  wrbc_inv uuid;
begin
  -- Dutch Recycling Metals: alle facturen -> Concept 001, 002, ...
  select id into drm
    from public.customers
   where regexp_replace(coalesce(kvk, ''), '\D', '', 'g') = '74987070'
   limit 1;

  if drm is not null then
    for rec in select id from public.invoices where customer_id = drm order by created_at, id loop
      n := n + 1;
      update public.invoices
         set status = 'concept',
             number = 'Concept ' || lpad(n::text, 3, '0')
       where id = rec.id;
    end loop;
  end if;

  -- WRBC: de eerste echte factuur (M-FAC-YYYY-001).
  select count(*) into wrbc_count
    from public.invoices inv
    join public.customers c on c.id = inv.customer_id
   where c.company_name ilike '%wrbc%' or c.contact_name ilike '%wrbc%';

  if wrbc_count = 1 then
    select inv.id into wrbc_inv
      from public.invoices inv
      join public.customers c on c.id = inv.customer_id
     where c.company_name ilike '%wrbc%' or c.contact_name ilike '%wrbc%'
     limit 1;
    update public.invoices
       set number = 'M-FAC-' || to_char(coalesce(issue_date, current_date), 'YYYY') || '-001'
     where id = wrbc_inv;
    raise notice 'WRBC-factuur hernummerd naar de eerste echte factuur (M-FAC-...-001).';
  elsif wrbc_count = 0 then
    raise notice 'Geen WRBC-factuur gevonden op naam. WRBC-hernummering overgeslagen; pas het nummer handmatig aan in het adminpaneel.';
  else
    raise notice 'Meerdere mogelijke WRBC-facturen gevonden (%). Niets gewijzigd; kies handmatig de juiste.', wrbc_count;
  end if;

  -- Tellers op het hoogste bestaande nummer zetten, zodat de volgende auto-nummer
  -- nooit botst met een reeds gebruikt nummer (belangrijk voor de echte reeks).
  perform setval(
    'public.invoice_concept_seq',
    greatest((select coalesce(max((substring(number from '(\d+)$'))::int), 0)
                from public.invoices where number like 'Concept %'), 1),
    (select count(*) from public.invoices where number like 'Concept %') > 0
  );
  perform setval(
    'public.invoice_number_seq',
    greatest((select coalesce(max((substring(number from '(\d+)$'))::int), 0)
                from public.invoices where number like 'M-FAC-%'), 1),
    (select count(*) from public.invoices where number like 'M-FAC-%') > 0
  );
end;
$$;
