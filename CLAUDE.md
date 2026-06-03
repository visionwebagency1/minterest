# CLAUDE.md — Minterest

Dit bestand is blijvende context voor dit project. Lees het bij elke sessie.

## Wat dit is
**Minterest** — een award-niveau marketing-agency website (ambitie: Awwwards Site of the Day). Tagline: **"Where interest becomes your growth"**. Primaire doel: premium uitstraling + portfolio/showcase. De opdrachtgever is geen Three.js-expert: jij schrijft alle 3D-code, hij stuurt op resultaat.

## Brand identity
De volledige brand identity staat in `assets/MINTEREST_-_CONCEPT_5.pdf`. Bekijk die voor de exacte M-vorm, het kleurverloop en de visuele toon, en gebruik die als leidraad.

Het logo is een abstracte **M uit drie voorwaarts-leunende vormen** (drie "bergen" die oplopen naar rechtsboven) — uitdrukking van groei en momentum. Het kleurverloop gaat van diep smaragd naar fris mint = "groei over tijd".

## Centraal concept — "de opwaartse klim"
Eén idee door de hele site: je beweegt **omhoog en vooruit**. Alle motion leunt naar rechtsboven, alles bouwt op.
- **Gradient als tijdlijn:** achtergrond schuift over de site van diep smaragd (begin) naar licht mint (einde).
- **M als terugkerend motief:** de drie M-vormen breken op, hervormen, leiden het oog naar rechtsboven. Keren terug in hero, transitions en footer.
- **Diensten als treden:** de vier takken worden als oplopende niveaus getoond, niet als platte grid.

## Design-systeem
Kleuren — **GEEN neutraal grijs**, alleen getinte donkergroenen voor schaduw/diepte:
```
--emerald-deep:  #0F5C4D
--emerald:       #1FA67A
--mint:          #4FD89B
--lime-accent:   #7FE3A8
--cream:         #F4F1EA
--near-black:    #0A1512   (groen-getint zwart)
```
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
/            Homepage (volledige scroll-experience)
/work        Showcase / portfolio
/websites    Websites & applicaties
/branding    Design & branding
/video       Short video content
/influencer  Influencer marketing
/about       Over Minterest + de 4 takken + administratie/sourcing
/contact     Contact + website-audit tool (de conversie-hook)
```
De vier diensten van Minterest: **Websites & applicaties, Design & branding, Short video content, Influencer marketing**. Op de achtergrond ook: administratie (partners) en sourcing/inkoop.

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

## Fasering
- **Fase 0:** fundament (Vite/React/TS/Tailwind/fonts/Lenis/router/grain/folderstructuur).
- **Fase 1:** WebGL-hero in 3 stappen — (1.1) gradient-mesh, (1.2) 3D glas-M's, (1.3) particle-sluier. Plus hero-tekst (Motion staggered reveal), Bloom postprocessing, fallback.
- **Fase 2:** homepage-secties (intro, vier takken als treden, showcase, proces, cijfers, CTA/audit, footer).
- **Fase 3:** page-transitions (M-mask) + dienst-pagina's op gedeeld template.
- **Fase 4:** audit-tool + contact.
- **Fase 5:** polish & performance (preloader, micro-interacties, mobiel, Lighthouse).

Huidige status: begin bij Fase 0 + 1.
