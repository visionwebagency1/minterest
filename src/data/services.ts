import type { ComponentType } from 'react'
import {
  BrowserRender,
  BrandingRender,
  VideoRender,
  AiVideoRender,
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
      { name: 'Visuele identiteit', desc: 'Logo, kleur en typografie die je merk in één oogopslag herkenbaar maken.' },
      { name: 'Packaging', desc: 'Verpakkingen die opvallen in het schap en je merk voelbaar maken.' },
      { name: 'Social Media Visual System', desc: 'Een vast visueel ritme voor je socials, consistent en direct herkenbaar.' },
      { name: 'Complete Branding', desc: 'Van strategie tot designsysteem, een merk dat overal even sterk staat.' },
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
      { name: 'Websites', desc: 'Snelle, converterende websites die er strak uitzien en verkopen.' },
      { name: 'Webshops', desc: 'Shopify en WooCommerce, volledig op maat rond hoe jouw klanten kopen.' },
      { name: 'Applicaties', desc: 'Web-apps en portals die je proces slimmer en sneller maken.' },
      { name: 'Software', desc: 'Maatwerk software die met je bedrijf meegroeit.' },
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
      { name: 'Short video content', desc: 'Scroll-stoppende video die kijkers vasthoudt en aanzet tot actie.' },
      { name: 'AI Video content', desc: 'Schaalbare videocontent met AI, snel en eindeloos variabel.' },
      { name: 'Fotoshoots', desc: "Bedrijfs- en websitefoto's die je merk professioneel neerzetten." },
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
      { name: 'Influencer Marketing', desc: 'De juiste creators aan je merk koppelen, op echt bereik.' },
      { name: 'Meta Ads', desc: 'Advertenties op Facebook en Instagram die renderen.' },
      { name: 'TikTok Ads', desc: 'Opvallen op TikTok met ads die aanslaan bij je doelgroep.' },
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
      { name: 'SEO', desc: 'Structureel bovenaan in Google met techniek, content en autoriteit.' },
      { name: 'Google Ads', desc: 'Direct zichtbaar bovenaan voor wie nu zoekt naar wat jij biedt.' },
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
      { name: 'AI Agents', desc: 'Slimme assistenten die werk uit handen nemen, dag en nacht.' },
      { name: 'Administratie', desc: 'Je administratie geregeld, zodat jij kunt ondernemen.' },
      { name: 'Sourcing', desc: 'De juiste producten en leveranciers, scherp ingekocht.' },
      { name: 'Detachering', desc: 'Het juiste talent op de juiste plek, precies wanneer je het nodig hebt.' },
    ],
    accent: 'from-emerald to-lime-bright',
    Render: AiVideoRender,
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
