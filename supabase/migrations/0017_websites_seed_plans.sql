-- ============================================================================
-- Minterest - migration 0017: seed van de drie plannen
-- ----------------------------------------------------------------------------
-- Start, Groei en Pro zoals ze op de landingspagina komen te staan. Prijzen en
-- teksten zijn idempotent bij te werken: opnieuw draaien overschrijft de rij op
-- slug, maar raakt mollie_price_ref niet (die vult fase 3 in).
--
-- Run na 0016.
-- ============================================================================

insert into public.web_plans
  (slug, name, tagline, price_monthly, price_from, features, max_pages,
   editor_enabled, included_change_requests, sort_order, active)
values
  ('start', 'Start', 'Professioneel online, alles geregeld.', 30.00, false,
   array[
     'Template-website uit de galerij',
     'Tot 5 paginas',
     'Eigen domein, hosting en SSL',
     'Maandelijks 1 kleine tekstwijziging, wij voeren die uit',
     'Maandelijks opzegbaar'
   ], 5, false, 1, 1, true),

  ('groei', 'Groei', 'Zelf je teksten en fotos aanpassen.', 45.00, false,
   array[
     'Alles van Start',
     'Eigen tekst-editor: pas zelf teksten en fotos aan',
     'Meer paginas',
     'Eigen domein, hosting en SSL',
     'Maandelijks opzegbaar'
   ], 10, true, 1, 2, true),

  ('pro', 'Pro', 'Maatwerk ontwerp en webshop.', 60.00, true,
   array[
     'Maatwerk ontwerp, geen template',
     'Webshop mogelijk',
     'Onbeperkt aantal paginas',
     'Eigen tekst-editor',
     'Prioriteit support'
   ], null, true, 0, 3, true)

on conflict (slug) do update set
  name                     = excluded.name,
  tagline                  = excluded.tagline,
  price_monthly            = excluded.price_monthly,
  price_from               = excluded.price_from,
  features                 = excluded.features,
  max_pages                = excluded.max_pages,
  editor_enabled           = excluded.editor_enabled,
  included_change_requests = excluded.included_change_requests,
  sort_order               = excluded.sort_order,
  active                   = excluded.active;
