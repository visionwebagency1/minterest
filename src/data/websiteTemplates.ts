/**
 * The template gallery for the website subscription.
 *
 * Each entry mirrors a template that really exists in the renderer
 * (websites/renderer/templates) and is filled with its own demo content: an
 * existing business in that sector, with its own texts, prices and photography.
 * The previews are screenshots of those actual pages, not mockups.
 *
 * Keep this list in step with websites/renderer/templates/index.ts. That file is
 * the source of truth for what a template is; this one is what the sales page
 * shows about it.
 */

import type { WebsitePlanSlug } from './websitePlans'

export interface WebsiteTemplate {
  slug: string
  name: string
  /** Who this design is for, in one line. */
  description: string
  /** Branche label, used as the gallery filter chip. */
  sector: string
  /** What is different about this layout, for the detail view. */
  layoutNote: string
  /** The demo business shown in the preview. */
  demo: { name: string; city: string }
  /** Card preview: the top of the real page, 4:3. */
  preview: string
  /** The whole page, shown in the lightbox. */
  full: string
  /** Which plans this template is available on. */
  plans: WebsitePlanSlug[]
}

export const WEBSITE_TEMPLATES: WebsiteTemplate[] = [
  {
    slug: 'atelier',
    name: 'Atelier',
    sector: 'Kapsalon en beauty',
    description: 'Rustig en verzorgd, met een grote foto voorop en je behandelingen als prijslijst.',
    layoutNote:
      'Beeldvullende hero, een overlappende foto bij het verhaal en de behandelingen als kaart met prijzen, zoals je ze in de salon ophangt.',
    demo: { name: 'Studio Atelier', city: 'Haarlem' },
    preview: '/templates/atelier.jpg',
    full: '/templates/atelier-volledig.jpg',
    plans: ['start', 'groei'],
  },
  {
    slug: 'kade',
    name: 'Kade',
    sector: 'Installatie en techniek',
    description: 'Stevig en zakelijk, met je telefoonnummer altijd in beeld.',
    layoutNote:
      'Gedeelde hero met de belofte links en het werk rechts, harde cijfers in een balk eronder en diensten in een strak raster. Scherpe hoeken, geen franje.',
    demo: { name: 'Kade Installatietechniek', city: 'Zaandam' },
    preview: '/templates/kade.jpg',
    full: '/templates/kade-volledig.jpg',
    plans: ['start', 'groei'],
  },
  {
    slug: 'bloem',
    name: 'Bloem',
    sector: 'Horeca',
    description: 'Warm en uitnodigend, met openingstijden en kaart direct in beeld.',
    layoutNote:
      'Hero over het hele scherm, openingstijden in een balk er direct onder en de kaart als echte menukaart met prijzen.',
    demo: { name: 'Bistro Bloem', city: 'Utrecht' },
    preview: '/templates/bloem.jpg',
    full: '/templates/bloem-volledig.jpg',
    plans: ['start', 'groei'],
  },
  {
    slug: 'praktijk',
    name: 'Praktijk',
    sector: 'Zorg en praktijk',
    description: 'Licht en geruststellend, met wachttijd en vergoeding meteen zichtbaar.',
    layoutNote:
      'Gedeelde hero met de foto in een zachte lijst, een vertrouwensbalk eronder en behandelingen in rustige kaarten. Alles rond en licht.',
    demo: { name: 'Praktijk Verhoeven', city: 'Amersfoort' },
    preview: '/templates/praktijk.jpg',
    full: '/templates/praktijk-volledig.jpg',
    plans: ['start', 'groei'],
  },
  {
    slug: 'vakman',
    name: 'Vakman',
    sector: 'Hovenier en klus',
    description: 'Fotografie voorop, met een galerij van je werk en je werkgebied erbij.',
    layoutNote:
      'Beeldvullende hero, diensten als lijst met iconen, een galerij van opgeleverd werk en je cijfers op een donkere band.',
    demo: { name: 'Vakman Hoveniers', city: 'Apeldoorn' },
    preview: '/templates/vakman.jpg',
    full: '/templates/vakman-volledig.jpg',
    plans: ['start', 'groei'],
  },
  {
    slug: 'noord',
    name: 'Noord',
    sector: 'Zakelijke dienstverlening',
    description: 'De rustigste van de zes, voor advies, administratie en makelaardij.',
    layoutNote:
      'Kop op wit met een brede foto eronder, zoals een jaarverslag opent. Diensten als genummerde lijst, niets in een kader.',
    demo: { name: 'Noord Advies', city: 'Groningen' },
    preview: '/templates/noord.jpg',
    full: '/templates/noord-volledig.jpg',
    plans: ['groei'],
  },
]

export const TEMPLATE_BY_SLUG: Record<string, WebsiteTemplate> = Object.fromEntries(
  WEBSITE_TEMPLATES.map((t) => [t.slug, t]),
)

/** The templates a given plan can choose from. Pro is always custom work. */
export function templatesForPlan(plan: WebsitePlanSlug): WebsiteTemplate[] {
  return WEBSITE_TEMPLATES.filter((t) => t.plans.includes(plan))
}

/** The sectors, for the gallery filter. */
export const TEMPLATE_SECTORS = Array.from(new Set(WEBSITE_TEMPLATES.map((t) => t.sector)))
