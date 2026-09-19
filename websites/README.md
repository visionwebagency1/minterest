# Minterest Websites - abonnementsplatform

Websites per maand onder Minterest. Bron van waarheid: `../23_websites_abonnement_masterplan.md`.
Dit is de stand na **fase 0 (fundament)**.

## Wat hier staat

```
websites/
  shared/     @minterest/websites-shared - brand-tokens, Tailwind-preset, datamodel-types
  renderer/   Next.js, poort 3100 - de multi-tenant renderer (elke klant-site, een app)
  panel/      Next.js, poort 3200 - admin + klantomgeving
```

De landingspagina (`/websites`) komt niet hier maar in de bestaande minterest.nl-site,
op het hoofddomein, voor SEO en vertrouwen. Dat is fase 2.

De drie delen delen dezelfde Supabase, dezelfde auth en hetzelfde design system.
`shared/brand.json` is de enige bron voor de palette en de fonts; de Tailwind-preset
en de TypeScript-tokens lezen daar allebei uit.

## Installeren en draaien

```bash
cd websites
npm install                 # installeert alle drie de workspaces in een keer
npm run dev:renderer        # http://localhost:3100
npm run dev:panel           # http://localhost:3200
npm run build               # productiebuild van beide apps
npm run lint                # tsc --noEmit over beide apps
```

Kopieer in elke app `.env.example` naar `.env.local` en vul de Supabase-waarden in
(Supabase > Settings > API). Geen secrets in code, geen `.env.local` in git.

## Database

De tabellen staan in de bestaande Supabase van het Minterest-admin, als migraties
`0015` t/m `0017` in `../supabase/migrations/`. Draai ze in volgorde in de SQL-editor
(of met `supabase db push`):

| Migratie | Wat het doet |
|---|---|
| `0015_auth_roles.sql` | Scheidt admins en klanten in `profiles.role` |
| `0016_websites_platform.sql` | Het complete datamodel plus RLS |
| `0017_websites_seed_plans.sql` | Seed van Start, Groei en Pro |

### Waarom 0015 er moet zijn

Tot nu toe gold: elke auth-gebruiker met een rij in `profiles` is admin, en de
trigger maakte die rij voor iedere nieuwe gebruiker. Zodra klanten een login
krijgen, zou elke klant dus admin zijn en alle leads, offertes en facturen kunnen
lezen. Na 0015 is een nieuwe auth-gebruiker standaard `klant`. Een admin ontstaat
alleen op twee manieren:

1. Bij het aanmaken van de gebruiker `raw_app_meta_data.role = "admin"` zetten
   (Supabase-dashboard of Admin API). `app_metadata` is niet vanuit de browser te
   zetten, dus een klant kan zich nooit zelf promoveren.
2. Een bestaande admin draait `select public.grant_admin('collega@minterest.nl');`

Alle bestaande profielen zijn door de migratie expliciet op `admin` gezet, dus het
huidige team behoudt zijn toegang.

### Het datamodel

| Tabel | Rol |
|---|---|
| `web_plans` | Start, Groei, Pro: prijs, features, max paginas, inbegrepen wijzigingen |
| `web_templates` | De galerij: preview, voor welke plannen, config-schema |
| `customers` | Bestaand klantenboek, uitgebreid met `auth_user_id` en `mollie_customer_id` |
| `web_subscriptions` | Abonnement per klant, gespiegeld aan Mollie (mandaat, status, volgende incasso) |
| `web_sites` | De website: template, tier, domein, status, content-bron, Sanity- en Vercel-referentie |
| `web_site_content` | JSON-content per site voor Start |
| `web_domains` | Domein per site met Vercel-, DNS- en SSL-status plus de DNS-instructies |
| `leads` | Bestaande inbox, uitgebreid met gekozen plan, template en gewenst domein |
| `web_change_requests` | Wijzigingsaanvragen van Start-klanten, met maandteller |
| `invoices` | Bestaande facturen, uitgebreid met abonnement, Mollie-betaling en periode |

Drie bestaande tabellen worden hergebruikt in plaats van gedupliceerd (`customers`,
`leads`, `invoices`), zodat er een klantenboek, een inbox en een factuurreeks blijft.

Alle nieuwe tabellen hebben het voorvoegsel `web_`. Deze database is gedeeld met
het offerte- en factuuradmin, waar `site_content` al bestaat als CMS van de
hoofdsite. Het voorvoegsel maakt in een oogopslag duidelijk wat bij het
abonnementsplatform hoort en sluit naamsbotsingen uit.

### Toegang

RLS staat op elke tabel aan, met drie niveaus:

- **anon**: alleen actieve plannen en beschikbare templates lezen, en een lead
  insturen. Verder niets.
- **klant**: alleen de eigen rijen, via `public.current_customer_id()`. Een
  Start-klant mag zijn content wel lezen maar niet wijzigen: dat is de regel die de
  marge beschermt, en hij staat dus in de database, niet alleen in de interface.
- **admin**: alles, via `public.is_admin()`.

De renderer leest nooit rechtstreeks uit de tabellen, maar via
`public.get_site_by_domain(host)`. Die functie geeft alleen live sites terug en
alleen renderbare velden, dus interne referenties en klantgegevens komen er nooit uit.

## Klaar in fase 0

- Drie workspaces met gedeelde basis, beide apps builden en typechecken schoon.
- Renderer: proxy leest het host-domein en geeft het als `x-site-host` door.
- Panel: login op hetzelfde Supabase-account, sessie via cookies, admin en
  klantomgeving gescheiden op rol, uitloggen werkt.
- Datamodel compleet met RLS, de drie plannen geseed.
- Healthchecks op `/api/health` in beide apps.

## Volgende fases

1. Renderer plus de eerste drie templates, SSR met eigen meta, sitemap en robots per site.
2. Landingspagina `/websites` met plannen, galerij en bestelflow, leads naar Supabase.
3. Mollie Subscriptions met webhooks en facturen.
4. Panel: de echte schermen voor admin en klant.
5. Sanity-editor voor Groei.
6. Domeinautomatisering via de Vercel Domains API.
7. Pro-workflow vanuit Claude Code.
