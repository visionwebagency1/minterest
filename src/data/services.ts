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
 *   1. Design & Branding     2. Web Development   3. Video & Fotografie
 *   4. Social Media Beheer   5. SEO & SEA         6. Extra diensten
 */

export type Sub = { name: string; desc: string }

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
}

export const MAIN_SERVICES: MainService[] = [
  {
    slug: 'design-branding',
    label: 'Design & Branding',
    short: 'Design & Branding',
    kicker: 'Merk & identiteit',
    tagline:
      'Een merk dat blijft hangen, van logo en packaging tot een compleet designsysteem dat overal consistent werkt.',
    intro:
      'Een sterk *merk* is herkenbaar in een oogopslag en consistent over elk kanaal. Wij bouwen een visuele taal met *karakter* die met je *meegroeit*.',
    cardDesc:
      'Een onderscheidende visuele identiteit die vertrouwen wekt en overal even sterk staat.',
    subs: [
      { name: 'Visuele identiteit', desc: 'Logo, kleur en typografie die je merk in één oogopslag herkenbaar maken. We bouwen een visuele basis die op elk kanaal even sterk staat.' },
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
      'Snelle, converterende websites, webshops en software, gebouwd om te verkopen en mee te groeien.',
    intro:
      'Je website is je hardst werkende *verkoper*. Wij bouwen digitale producten die laden in een *oogwenk* en meegroeien met je *ambitie*.',
    cardDesc:
      'Razendsnelle websites, webshops en maatwerk software die er strak uitzien en verkopen.',
    subs: [
      { name: 'Websites', desc: 'Snelle, converterende websites die er strak uitzien en verkopen. Gebouwd op een moderne stack en makkelijk uit te breiden.' },
      { name: 'Webshops', desc: 'Shopify en WooCommerce, volledig op maat rond hoe jouw klanten kopen. Van productpagina tot een checkout die echt converteert.' },
      { name: 'Applicaties', desc: 'Web-apps en portals die je proces slimmer en sneller maken. Op maat gebouwd rond jouw workflow en je gebruikers.' },
      { name: 'Software', desc: 'Maatwerk software die met je bedrijf meegroeit. Stabiel, schaalbaar en gebouwd om jaren mee te gaan.' },
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
      'Beeld dat aandacht pakt. Van scroll-stoppende short video en AI-content tot strakke fotografie.',
    intro:
      'Beeld is het snelste pad naar *aandacht*. Wij maken *scroll-stoppende* video en fotografie die past bij je merk.',
    cardDesc:
      'Short video, AI-video en fotografie die kijkers vasthouden en je merk professioneel neerzetten.',
    subs: [
      { name: 'Short video content', desc: 'Scroll-stoppende video die kijkers vasthoudt en aanzet tot actie. Van concept en draaiboek tot montage, klaar voor elk platform.' },
      { name: 'AI Video content', desc: 'Schaalbare videocontent met AI, snel en eindeloos variabel. Ideaal om veel varianten te testen zonder grote productie.' },
      { name: 'Fotoshoots', desc: "Bedrijfs- en websitefoto's die je merk professioneel neerzetten. Een consistente beeldbank waarmee je overal sterk voor de dag komt." },
    ],
    accent: 'from-emerald via-mint to-lime-accent',
    Render: VideoRender,
  },
  {
    slug: 'social-media',
    label: 'Social Media Beheer',
    short: 'Social Media',
    kicker: 'Bereik & advertising',
    tagline:
      'Je social media van A tot Z, van influencer-campagnes tot Meta- en TikTok-advertenties die renderen.',
    intro:
      'Mensen *vertrouwen* mensen en reageren op het juiste *moment*. Wij zetten *bereik* om in groei.',
    cardDesc:
      'Influencer-marketing en advertenties op Meta en TikTok die echt bereik omzetten in resultaat.',
    subs: [
      { name: 'Influencer Marketing', desc: 'De juiste creators aan je merk koppelen, op echt bereik. Van selectie en briefing tot meten wat het oplevert.' },
      { name: 'Meta Ads', desc: 'Advertenties op Facebook en Instagram die renderen. Scherp ingericht en continu geoptimaliseerd op resultaat.' },
      { name: 'TikTok Ads', desc: 'Opvallen op TikTok met ads die aanslaan bij je doelgroep. Native content die voelt als TikTok, niet als reclame.' },
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
      'Bovenaan in Google, organisch én betaald. Vindbaarheid die klanten naar je toe brengt.',
    intro:
      'Wie bovenaan staat, *wint*. Wij maken je vindbaar voor de mensen die *nu* zoeken naar wat jij biedt.',
    cardDesc:
      'Structureel bovenaan in Google, met SEO die blijft staan en Google Ads die direct leveren.',
    subs: [
      { name: 'SEO', desc: 'Structureel bovenaan in Google met techniek, content en autoriteit. Vindbaarheid die blijft staan en klanten blijft opleveren.' },
      { name: 'Google Ads', desc: 'Direct zichtbaar bovenaan voor wie nu zoekt naar wat jij biedt. Strak gestuurd op kosten per klant en rendement.' },
    ],
    accent: 'from-emerald-deep to-emerald',
    Render: SeoRender,
  },
  {
    slug: 'extra',
    label: 'Extra diensten',
    short: 'Extra diensten',
    kicker: 'Alles eromheen',
    tagline:
      'Alles eromheen geregeld, van AI-agents en administratie tot sourcing en detachering.',
    intro:
      'Groei vraagt meer dan marketing. Wij regelen de *randvoorwaarden* zodat jij kunt blijven *ondernemen*.',
    cardDesc:
      'De randvoorwaarden voor groei: AI-agents, administratie, sourcing en detachering.',
    subs: [
      { name: 'AI Agents', desc: 'Slimme assistenten die werk uit handen nemen, dag en nacht. Van klantvragen tot terugkerende taken, volledig geautomatiseerd.' },
      { name: 'Administratie', desc: 'Je administratie geregeld, zodat jij kunt ondernemen. Overzicht en rust, zonder dat je er naar hoeft om te kijken.' },
      { name: 'Sourcing', desc: 'De juiste producten en leveranciers, scherp ingekocht. Wij regelen de keten zodat jij marge en kwaliteit houdt.' },
      { name: 'Detachering', desc: 'Het juiste talent op de juiste plek, precies wanneer je het nodig hebt. Flexibel opschalen zonder gedoe.' },
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
