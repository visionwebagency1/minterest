-- ============================================================================
-- Minterest admin panel - migration 0013: nieuwe nummering M-OFF / M-FAC
-- ----------------------------------------------------------------------------
-- Offertes en facturen krijgen het formaat:
--     M-OFF-2026-001   (offerte)
--     M-FAC-2026-001   (factuur)
-- Bestaande documenten worden hernummerd vanaf de eerste (op volgorde van
-- aanmaakdatum), en nieuwe documenten volgen automatisch hetzelfde formaat.
--
-- Nummering loopt door via de bestaande sequences (globaal, zoals voorheen),
-- alleen met de "M-" prefix en 3 cijfers. Idempotent bij herhaald draaien zolang
-- er geen documenten tussendoor zijn bijgekomen. Run after 0012.
-- ============================================================================

-- ── Nieuwe standaard-nummering voor toekomstige documenten ────────────────────
alter table public.quotes
  alter column number set default
    ('M-OFF-' || to_char(now(), 'YYYY') || '-' ||
     lpad(nextval('public.quote_number_seq')::text, 3, '0'));

alter table public.invoices
  alter column number set default
    ('M-FAC-' || to_char(now(), 'YYYY') || '-' ||
     lpad(nextval('public.invoice_number_seq')::text, 3, '0'));

-- ── Bestaande offertes hernummeren (op volgorde, vanaf de eerste) ─────────────
with ordered as (
  select id,
         to_char(created_at, 'YYYY') as yr,
         row_number() over (order by created_at, id) as rn
  from public.quotes
)
update public.quotes q
   set number = 'M-OFF-' || o.yr || '-' || lpad(o.rn::text, 3, '0')
  from ordered o
 where q.id = o.id;

-- ── Bestaande facturen hernummeren (op volgorde, vanaf de eerste) ─────────────
with ordered as (
  select id,
         to_char(created_at, 'YYYY') as yr,
         row_number() over (order by created_at, id) as rn
  from public.invoices
)
update public.invoices i
   set number = 'M-FAC-' || o.yr || '-' || lpad(o.rn::text, 3, '0')
  from ordered o
 where i.id = o.id;

-- ── Sequences bijzetten zodat de volgende auto-nummer verder telt ─────────────
select setval(
  'public.quote_number_seq',
  greatest((select count(*) from public.quotes), 1),
  (select count(*) from public.quotes) > 0
);
select setval(
  'public.invoice_number_seq',
  greatest((select count(*) from public.invoices), 1),
  (select count(*) from public.invoices) > 0
);
