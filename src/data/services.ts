import type { ComponentType } from 'react'
import {
  BrowserRender,
  BrandingRender,
  VideoRender,
  SourcingRender,
  SeoRender,
  NetworkRender,
} from '@/sections/serviceRenders'

/**
 * SINGLE SOURCE OF TRUTH for the 6 main services + their sub-services.
 *
 * Everything reads from here: the clickable hero pills, the homepage service
 * cards (desktop) and carousel (mobile), the /diensten overview page, the 6
 * /diensten/:slug landing pages, and the footer. Change a service once, it
 * updates everywhere.
 *
 * Structure (ronde 2, definitief):
 *   1. Branding voor groei   2. Web Development   3. Video & Fotografie
 *   4. Social Media Groei    5. SEO & SEA         6. Extra groeidiensten
 */

export type Sub = { name: string; desc: string }

/** A single "Zo werken we" step on the landing page (icon comes from the template). */
export type ServiceStep = { title: string; desc: string }

export type MainService = {
  /** URL slug → /diensten/:slug */
  slug: string
  /** Display label (cards, overview, footer). */
  label: string
  /** Short label for the hero pills / mobile (kept inside the screen width). */
  short: string
  /** Section eyebrow on the landing page. */
  kicker: string
  /** One-line hero tagline. */
  tagline: string
  /** Solution one-liner; *word* marks an italic accent word. */
  intro: string
  /** Card / carousel description (compact, scannable). */
  cardDesc: string
  /** Sub-services, shown as 2x2 pills on the card and as sections on the page. */
  subs: Sub[]
  /** Tailwind gradient stops for this service's own accent (within the green palette). */
  accent: string
  /** Animated mini-UI render (homepage card + landing scene). SVGs untouched. */
  Render: ComponentType
  /** Landing-page "Start jouw ...traject" CTA label (hero + closing CTA). */
  heroCta?: string
  /** "Wat we doen" section heading. */
  whatTitle?: string
  /** "In actie" section heading. */
  actionTitle?: string
  /** "In actie" supporting paragraph. */
  actionText?: string
  /** "Zo werken we" steps (4). Falls back to the generic template steps. */
  steps?: ServiceStep[]
  /** Closing-CTA heading. */
  ctaTitle?: string
  /** Closing-CTA paragraph. */
  ctaText?: string
}

export const MAIN_SERVICES: MainService[] = [
  {
    slug: 'design-branding',
    label: 'Branding voor groei',
    short: 'Branding voor groei',
    kicker: 'Merk & identiteit',
    tagline:
      'Een sterk merk begint niet bij een logo, maar bij vertrouwen. Wij ontwikkelen een visuele identiteit die jouw bedrijf professioneel neerzet, herkenbaar maakt en klaarzet voor de volgende stap.',
    intro:
      'Een sterk merk herken je in een *oogopslag*. Wij bouwen een visuele identiteit die *vertrouwen* wekt, consistent is op elk kanaal en *meegroeit* met je bedrijf.',
    cardDesc:
      'Branding die vertrouwen opbouwt, herkenning vergroot en jouw bedrijf klaarzet voor groei.',
    whatTitle: 'Alles voor een merk dat vertrouwen opbouwt.',
    heroCta: 'Start jouw brandingtraject',
    subs: [
      { name: 'Visuele identiteit', desc: 'Logo, kleur en typografie die jouw merk direct herkenbaar maken. We bouwen een visuele basis die professioneel oogt, vertrouwen wekt en op elk kanaal consistent blijft.' },
      { name: 'Packaging', desc: 'Verpakkingen die opvallen in het schap en je merk voelbaar maken. Van eerste concept tot drukklaar ontwerp, klaar voor productie.' },
      { name: 'Social Media Visual System', desc: 'Een vast visueel ritme voor je socials, consistent en direct herkenbaar. Templates en richtlijnen waarmee elke post vanzelf klopt.' },
      { name: 'Complete Branding', desc: 'Van strategie tot een compleet designsysteem, een merk dat overal even sterk staat. Inclusief merkrichtlijnen zodat iedereen het consistent toepast.' },
    ],
    accent: 'from-emerald to-lime-accent',
    Render: BrandingRender,
  },
  {
    slug: 'web-development',
    label: 'Web Development',
    short: 'Web Development',
    kicker: 'Web & commerce',
    tagline:
      'Een website of webshop die niet alleen mooi oogt, maar vertrouwen wekt, duidelijk communiceert en bezoekers omzet in aanvragen of klanten.',
    intro:
      'Je website is vaak het eerste moment waarop iemand beslist of jouw bedrijf professioneel en betrouwbaar voelt. Daarom bouwen wij geen losse *pagina\'s*, maar een digitale oplossing die past bij je aanbod, doelgroep en doelen. Snel, duidelijk en ingericht om *resultaat* op te leveren.',
    cardDesc:
      'Websites en webshops die professioneel ogen, duidelijk converteren en jouw groei ondersteunen.',
    whatTitle: 'Alles voor een website die werkt.',
    actionTitle: 'Zo ziet een converterende website eruit.',
    actionText:
      'Websites, webshops en software gebouwd om vertrouwen te wekken, duidelijk te verkopen en mee te groeien met je bedrijf.',
    heroCta: 'Start jouw webtraject',
    ctaTitle: 'Klaar voor een website die aanvragen oplevert?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een website of webshop die professioneel oogt en gericht is op resultaat.',
    subs: [
      { name: 'Websites', desc: 'Snelle, professionele websites die duidelijk uitleggen wat je doet en bezoekers richting actie sturen.' },
      { name: 'Webshops', desc: 'Webshops die vertrouwen wekken, overzicht creeren en het aankoopproces soepel maken.' },
      { name: 'Applicaties', desc: 'Digitale oplossingen op maat voor processen, klanten of interne systemen.' },
      { name: 'Software', desc: 'Maatwerk software die je bedrijf slimmer, sneller en schaalbaarder laat werken.' },
    ],
    steps: [
      { title: 'Kennismaken', desc: 'We begrijpen je bedrijf, doelgroep en doelen.' },
      { title: 'Plan', desc: 'We bepalen welke oplossing het beste past bij jouw situatie.' },
      { title: 'Uitvoeren', desc: 'We bouwen een snelle, duidelijke en professionele website of webshop.' },
      { title: 'Optimaliseren', desc: 'We kijken mee hoe je website beter kan presteren en verder kan groeien.' },
    ],
    accent: 'from-emerald-deep to-mint',
    Render: BrowserRender,
  },
  {
    slug: 'video-fotografie',
    label: 'Video & Fotografie',
    short: 'Video & Foto',
    kicker: 'Bewegend beeld & fotografie',
    tagline:
      'Beeld dat aandacht pakt, vertrouwen opbouwt en jouw merk professioneel zichtbaar maakt.',
    intro:
      'Beeld is vaak het snelste pad naar *aandacht*. Daarom maken wij geen losse video\'s of foto\'s, maar *content* die past bij je merk, doelgroep en kanalen. Van short video tot AI-video en fotoshoots: alles wordt gemaakt om je uitstraling te versterken en je *zichtbaarheid* te vergroten.',
    cardDesc:
      'Video en fotografie die jouw merk professioneel neerzetten en aandacht omzetten in vertrouwen.',
    whatTitle: 'Alles voor content die blijft hangen.',
    actionTitle: 'Zo ziet sterke visuele content eruit.',
    actionText:
      'Video en fotografie die jouw merk herkenbaar maken, professioneel neerzetten en geschikt zijn voor elk kanaal.',
    heroCta: 'Start jouw contenttraject',
    ctaTitle: 'Klaar voor content die aandacht trekt?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met video en fotografie die jouw merk sterker zichtbaar maken.',
    subs: [
      { name: 'Short video content', desc: "Korte video's voor social media die snel aandacht pakken en je verhaal duidelijk overbrengen." },
      { name: 'AI Video content', desc: "Slimme AI-video's waarmee je snel varianten, concepten of creatieve content kunt maken." },
      { name: 'Fotoshoots', desc: 'Professionele fotografie voor je website, social media, advertenties en merkuitingen.' },
    ],
    steps: [
      { title: 'Kennismaken', desc: 'We begrijpen je merk, doelgroep en gewenste uitstraling.' },
      { title: 'Plan', desc: 'We bepalen welke beelden nodig zijn voor je website, social media of campagne.' },
      { title: 'Uitvoeren', desc: "We maken video's en foto's die passen bij je merk en doelen." },
      { title: 'Groeien', desc: 'We zorgen dat je content klaar is om ingezet te worden voor zichtbaarheid, vertrouwen en resultaat.' },
    ],
    accent: 'from-emerald via-mint to-lime-accent',
    Render: VideoRender,
  },
  {
    slug: 'social-media',
    label: 'Social Media Groei',
    short: 'Social Media Groei',
    kicker: 'Bereik & advertising',
    tagline:
      'Social media die niet alleen zichtbaar is, maar vertrouwen opbouwt, bereik activeert en nieuwe aanvragen creeert.',
    intro:
      'Mensen kopen van merken die ze *herkennen* en *vertrouwen*. Daarom zetten wij social media niet in als losse posts, maar als kanaal om zichtbaar te blijven, vertrouwen op te bouwen en *bereik* om te zetten in resultaat.',
    cardDesc:
      'Content, influencers en advertenties die bereik omzetten in zichtbaarheid, vertrouwen en groei.',
    whatTitle: 'Alles voor social media die resultaat oplevert.',
    actionTitle: 'Zo ziet Social Media Groei eruit.',
    actionText:
      'Van influencer-campagnes tot Meta- en TikTok-advertenties: we zetten bereik om in zichtbaarheid, vertrouwen en resultaat.',
    heroCta: 'Start jouw groeitraject',
    ctaTitle: 'Klaar om social media om te zetten in resultaat?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met social media die zichtbaarheid vergroot en nieuwe aanvragen creeert.',
    subs: [
      { name: 'Influencer Marketing', desc: 'Samenwerkingen met de juiste gezichten om je merk onder de aandacht te brengen bij de juiste doelgroep.' },
      { name: 'Meta Ads', desc: 'Advertenties op Facebook en Instagram die gericht zijn op bereik, aanvragen en conversie.' },
      { name: 'TikTok Ads', desc: 'Campagnes op TikTok waarmee je snel aandacht pakt en nieuwe doelgroepen bereikt.' },
    ],
    steps: [
      { title: 'Kennismaken', desc: 'We begrijpen je merk, doelgroep en doelen.' },
      { title: 'Plan', desc: 'We bepalen welke kanalen, content of advertenties het beste passen.' },
      { title: 'Uitvoeren', desc: 'We zetten campagnes, samenwerkingen en content professioneel neer.' },
      { title: 'Optimaliseren', desc: 'We meten, verbeteren en sturen bij op resultaat.' },
    ],
    accent: 'from-mint to-lime-accent',
    Render: NetworkRender,
  },
  {
    slug: 'seo-sea',
    label: 'SEO & SEA',
    short: 'SEO & SEA',
    kicker: 'Vindbaarheid & groei',
    tagline:
      'Vindbaar worden op het moment dat jouw klant zoekt, met SEO en Google Ads die gericht zijn op aanvragen en resultaat.',
    intro:
      'Wie bovenaan staat, krijgt de *aandacht*. Wij maken je vindbaar voor mensen die actief zoeken naar wat jij aanbiedt. Met SEO bouwen we aan duurzame *vindbaarheid*. Met SEA zorgen we voor directe zichtbaarheid via Google Ads. Samen zorgen ze voor meer relevant verkeer, betere aanvragen en een sterkere online positie.',
    cardDesc:
      'Beter gevonden worden, slimmer adverteren en meer gerichte aanvragen binnenhalen.',
    whatTitle: 'Alles voor betere vindbaarheid.',
    actionTitle: 'Zo ziet SEO & SEA eruit.',
    actionText:
      'Bovenaan zichtbaar zijn in Google, gericht verkeer aantrekken en bezoekers omzetten in aanvragen.',
    heroCta: 'Start jouw groeitraject',
    ctaTitle: 'Klaar om beter gevonden te worden?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je zichtbaar worden voor mensen die zoeken naar wat jij aanbiedt.',
    subs: [
      { name: 'SEO', desc: 'Structureel beter gevonden worden in Google met techniek, content en optimalisatie.' },
      { name: 'Google Ads', desc: 'Direct zichtbaar worden voor klanten die nu zoeken naar jouw dienst of product.' },
    ],
    steps: [
      { title: 'Kennismaken', desc: 'We begrijpen je aanbod, doelgroep en zoekmarkt.' },
      { title: 'Plan', desc: "We bepalen welke zoekwoorden, pagina's en campagnes het meeste kunnen opleveren." },
      { title: 'Uitvoeren', desc: 'We optimaliseren je vindbaarheid en richten campagnes professioneel in.' },
      { title: 'Optimaliseren', desc: 'We meten, verbeteren en sturen bij op resultaat.' },
    ],
    accent: 'from-emerald-deep to-emerald',
    Render: SeoRender,
  },
  {
    slug: 'extra',
    label: 'Extra groeidiensten',
    short: 'Extra groeidiensten',
    kicker: 'Alles eromheen',
    tagline:
      'Groei vraagt meer dan marketing. Daarom helpen we ondernemers ook met de praktische kant achter hun bedrijf: automatisering, administratie, sourcing en detachering.',
    intro:
      'Niet elke uitdaging los je op met een website of campagne. Soms heeft je bedrijf juist betere *systemen*, meer overzicht, de juiste mensen of betere leveranciers nodig. Met onze extra groeidiensten helpen we je *slimmer* werken, tijd besparen en sterker organiseren.',
    cardDesc:
      'Aanvullende diensten die jouw bedrijf helpen slimmer, sterker en schaalbaarder te groeien.',
    whatTitle: 'Alles binnen extra groeidiensten.',
    actionTitle: 'Zo ziet slimme ondersteuning eruit.',
    actionText:
      'Van AI-agents tot administratie, sourcing en detachering: extra oplossingen die jouw bedrijf overzichtelijker, sneller en schaalbaarder maken.',
    heroCta: 'Start jouw groeitraject',
    ctaTitle: 'Klaar om slimmer te ondernemen?',
    ctaText:
      'Vertel ons waar je nu tegenaan loopt. Wij kijken mee welke extra ondersteuning jouw bedrijf verder helpt.',
    subs: [
      { name: 'AI Agents', desc: 'Slimme assistenten die terugkerende taken automatiseren, klantvragen opvangen en tijd besparen.' },
      { name: 'Administratie', desc: 'Ondersteuning om je administratie overzichtelijker, professioneler en beter georganiseerd te krijgen.' },
      { name: 'Sourcing', desc: 'Hulp bij het vinden van producten, leveranciers of oplossingen die passen bij je bedrijf.' },
      { name: 'Detachering', desc: 'Ondersteuning bij het vinden van de juiste mensen of capaciteit wanneer je bedrijf daarom vraagt.' },
    ],
    steps: [
      { title: 'Kennismaken', desc: 'We bekijken waar je bedrijf nu vastloopt.' },
      { title: 'Plan', desc: 'We bepalen welke ondersteuning het beste past bij je situatie.' },
      { title: 'Uitvoeren', desc: 'We zetten de juiste oplossing of samenwerking in gang.' },
      { title: 'Verbeteren', desc: 'We kijken mee hoe je slimmer, sneller en schaalbaarder kunt werken.' },
    ],
    accent: 'from-emerald to-lime-bright',
    Render: SourcingRender,
  },
]

/** Lookup by slug for the landing pages. */
export const SERVICE_BY_SLUG: Record<string, MainService> = Object.fromEntries(
  MAIN_SERVICES.map((s) => [s.slug, s]),
)

/**
 * The clickable hero pills + the homepage cards/carousel target a service by
 * index. Clicking a pill scrolls to #diensten and broadcasts which one to focus.
 */
export const SERVICE_FOCUS_EVENT = 'minterest:focus-service'

export function focusService(index: number) {
  window.dispatchEvent(
    new CustomEvent(SERVICE_FOCUS_EVENT, { detail: index }),
  )
}

/**
 * Stable slug for a sub-service, derived from its name. Used to build the
 * /diensten/:slug/:subslug routes (the dedicated sub-service pages come in the
 * next round; these links already point at the right URLs).
 */
export function slugifySub(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'en')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function subPath(serviceSlug: string, subName: string): string {
  return `/diensten/${serviceSlug}/${slugifySub(subName)}`
}
