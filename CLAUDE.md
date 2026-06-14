# CLAUDE.md — Minterest

Dit bestand is blijvende context voor dit project. Lees het bij elke sessie.

## Wat dit is
**Minterest** — een award-niveau marketing-agency website (ambitie: Awwwards Site of the Day). Tagline: **"Where interest becomes your growth"**. Primaire doel: premium uitstraling + portfolio/showcase. De opdrachtgever is geen Three.js-expert: jij schrijft alle 3D-code, hij stuurt op resultaat.

## Brand identity
De volledige brand identity staat in `assets/MINTEREST_-_CONCEPT_5.pdf`. Bekijk die voor de exacte M-vorm, het kleurverloop en de visuele toon, en gebruik die als leidraad.

Het logo is een abstracte **M uit drie voorwaarts-leunende vormen** (drie "bergen" die oplopen naar rechtsboven) — uitdrukking van groei en momentum. Het kleurverloop gaat van **teal (#008081) naar licht groen (#90EE90)** = "groei over tijd".

## Centraal concept — "de opwaartse klim"
Eén idee door de hele site: je beweegt **omhoog en vooruit**. Alle motion leunt naar rechtsboven, alles bouwt op.
- **Gradient als tijdlijn:** achtergrond schuift over de site van diep smaragd (begin) naar licht mint (einde).
- **M als terugkerend motief:** de drie M-vormen breken op, hervormen, leiden het oog naar rechtsboven. Keren terug in hero, transitions en footer.
- **Diensten als treden:** de vier takken worden als oplopende niveaus getoond, niet als platte grid.

## Design-systeem
Kleuren — **echte brand-palette uit de identity-PDF: teal-klim** (primary teal naar
accent-groen). GEEN neutraal grijs; donkere tinten zijn teal-getint. De token-namen
blijven stabiel (emerald/mint/lime) zodat de hele site vanuit `tailwind.config.js`
+ `globals.css` herthemed wordt, maar de waarden zijn nu teal->groen:
```
--emerald-deep:  #013F40   (diep teal — schaduw/dark sections)
--emerald:       #008081   (PRIMARY teal)
--mint:          #42C28C   (teal->groen brug, levendig accent)
--lime-accent:   #90EE90   (ACCENT groen)
--lime-bright:   #B6F5B6   (lichtste groen)
--cream:         #F4F4F4   (brand light)
--near-black:    #0A1512   (teal-getint zwart — de "mooie" dark)
--ink:           #071311   (diepste teal-zwart)
```
Brand-gradient (logo + hero + scroll-timeline): **#008081 -> #90EE90** (teal naar
licht groen). Dark gradients lopen teal -> #1C1C1C-achtig diep. Alle hardcoded
kleuren in componenten volgen deze palette (geen losse emerald/lime hexes meer).
Typografie — **GEEN Inter/Roboto/Arial/system fonts**. Laad via Fontshare CDN:
- Display/headings: **Clash Display**
- Body: **Satoshi**

Sfeer: donkere basis, subtiele grain/noise overlay over de hele site (~1.5% opacity), spaarzaam glasmorfisme, scherpe hoeken voor bold momenten.

## Tech-stack (gebruik exact deze)
- Vite + React 18 + TypeScript
- Tailwind CSS v3
- React Router
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `maath`
- Motion/scroll: `motion`, `lenis` (smooth scroll), `gsap` (+ ScrollTrigger)
- Utils: `clsx`
- Dev-only: `leva` (live tweaken van 3D-waarden)

## Sitestructuur (hybride)
```
/                       Homepage (volledige scroll-experience)
/work                   Showcase / portfolio
/diensten               Diensten-overzicht (alle 6 hoofddiensten)
/diensten/:slug         6 aparte hoofddienst-landingspagina's
/about                  Over Minterest
/contact                Contact + website-audit tool (de conversie-hook)
/start                  Start jouw project (lead-funnel)
/website-audit          Gratis website-audit tool
```

## Dienstenstructuur (DEFINITIEF — ronde 2)
Er zijn **6 hoofddiensten**, elk met sub-diensten. De flow: eerst een
**diensten-overzichtspagina** (`/diensten`), daarvandaan klik je door naar 6
aparte **hoofddienst-landingspagina's** (`/diensten/:slug`). De sub-diensten
staan als **secties BINNEN** die hoofddienst-pagina, niet als losse pagina's.
**GEEN dropdown in het navigatiemenu** — het menu verwijst naar het
diensten-overzicht; losse hoofddiensten bereik je via het overzicht, de
homepage-cards en de klikbare hero-pills.

De 6 hoofddiensten (slug) en hun sub-diensten:
1. **Design & Branding** (`design-branding`) — Visuele identiteit (incl. logo), Packaging, Social Media Visual System, Complete Branding
2. **Web Development** (`web-development`) — Websites, Webshops, Applicaties, Software
3. **Video & Fotografie** (`video-fotografie`) — Short video content, AI Video content, Fotoshoots (bedrijfs- of websitefoto's)
4. **Social Media Beheer** (`social-media`) — Influencer Marketing, Meta Ads, TikTok Ads
5. **SEO & SEA** (`seo-sea`) — SEO, Google Ads
6. **Extra diensten** (`extra`) — AI Agents, Administratie, Sourcing, Detachering

De bron-of-truth voor deze structuur staat in `src/data/services.ts`; hero-pills,
homepage-cards/carousel, overzichtspagina, landingspagina's en footer lezen daar
allemaal uit.

## Vaste keuzes ronde 2 (permanent)
- **GEEN loading screen / preloader meer.** De site laadt direct in de hero.
- De term **"Digitaal Groeibureau"** wordt nergens meer gebruikt.
- **Hero-stats** zijn exact, in deze volgorde: `150+ Projecten`, `300M+ Weergaven`, `4.9 ster`.
- De zwevende **hero-pills zijn klikbaar**: ze scrollen naar de diensten-sectie en
  zetten de juiste dienst actief (desktop: juiste card; mobiel: carousel-index).
- **Geen woord-voor-woord scroll-reveal tekstsectie** tussen hero en diensten.
- **Smooth scroll:** Lenis is officieel gekoppeld aan GSAP ScrollTrigger (één RAF
  via `gsap.ticker`, `lenis.on('scroll', ScrollTrigger.update)`, geen dubbele
  loops, `ScrollTrigger.refresh()` na load + font-load). Zie `src/lib/useLenis.ts`.
- **Diensten-sectie:** desktop houdt de stapelende scroll-cards met SVG-animaties
  (niet aanraken); sub-diensten als 2x2 grid van pills. Mobiel is een compacte
  **horizontale carousel** (swipe + arrow-knop + dots), geen lange scroll-cards.
- **Landingspagina's** delen één template, overwegend **licht en premium** (niet
  donker), met per hoofddienst een eigen accent binnen het groene palet.
- **Geen em-dashes** in de hele codebase/content.

## Folderstructuur
```
src/components   herbruikbare UI
src/sections     paginasecties
src/three        alle 3D/WebGL-logica
src/styles       global CSS, tokens
src/lib          utils, hooks (o.a. lenis setup)
```

## Werkregels (belangrijk)
- **Incrementeel bouwen.** Eerst werkend, dan polijsten. Niet alles tegelijk.
- **Per fase stoppen** en kort uitleggen wat je deed + hoe ik het bekijk. Niet vooruit bouwen naar volgende fases zonder dat ik het vraag.
- **Performance:** lazy-load de WebGL-hero (React.lazy + Suspense). Cap `dpr={[1, 2]}`. Houd `MeshTransmissionMaterial` samples/resolution laag (zwaar materiaal). Op zwakke devices/mobiel: fallback naar alleen gradient-mesh + statische M, geen transmission, geen particles.
- 3D-logica hoort in `src/three`. Schrijf leesbare, nette componenten.
- Bij twijfel over een visuele keuze: leun op de brand identity-PDF en het concept hierboven.

## Onthouden voor latere ronde (nu NIET bouwen, wel ruimte voor laten)
Groeiplan-funnel met knop, marquee klikbaar maken, "bekijk ons portfolio"-knop bij
iedere kaart, WRBC-koppeling (kopje naar WRBC voor financieel advies/leads, vice
versa), en het invullen van alle inner-page content uit de klant-feedback.

## Fasering
- **Fase 0:** fundament (Vite/React/TS/Tailwind/fonts/router/grain/folderstructuur).
- **Fase 1:** WebGL-hero (gradient-mesh, 3D glas-M, particles, bloom, fallback).
- **Fase 2:** homepage-secties (hero, diensten, showcase, proces, cijfers, CTA/audit, footer).
- **Fase 3:** page-transitions (M-mask) + diensten-overzicht en 6 landingspagina's op gedeeld template.
- **Fase 4:** audit-tool + contact.
- **Fase 5:** polish & performance (micro-interacties, mobiel, Lighthouse).

Huidige status: ronde 2 doorgevoerd (nieuwe dienstenstructuur, geen preloader,
smooth scroll via Lenis+ScrollTrigger, klikbare hero-pills, mobiele diensten-carousel).
