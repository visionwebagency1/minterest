/**
 * The three website subscription plans, as shown on /websites.
 *
 * Mirrors the `web_plans` rows seeded by supabase/migrations/0017. The copy lives
 * here (not fetched) so the page prerenders into static HTML and a crawler sees
 * the prices. The database stays the source of truth for billing; this file is
 * the source of truth for the sales page. Keep them in sync when prices change.
 */

/**
 * Naam, route en positionering van het product. Bewust op een plek: het
 * abonnement moet duidelijk iets anders zijn dan Web Development (maatwerk),
 * dus als de naam verandert, verandert hij overal in een keer mee.
 */
export const WEBSITE_SUBSCRIPTION = {
  /** Productnaam in lopende tekst en koppen. */
  name: 'Website Abonnement',
  /** Label in het navigatiemenu en in keuzelijsten. */
  navLabel: 'Website abonnement',
  path: '/website-abonnement',
  /** Laagste maandprijs, gebruikt in labels en cross-links. */
  priceFrom: 30,
  /** Het verschil met maatwerk, in een zin. */
  difference:
    'Een kant-en-klare website op abonnement, geen maatwerkproject. Vaste lage maandprijs, geen investering vooraf.',
} as const

export type WebsitePlanSlug = 'start' | 'groei' | 'pro'

export interface WebsitePlan {
  slug: WebsitePlanSlug
  name: string
  /** Monthly price in euros, excluding VAT. */
  price: number
  /** True when the price is a starting point ("vanaf"). */
  from?: boolean
  tagline: string
  features: string[]
  /** Highlighted as the recommended plan. */
  popular?: boolean
  /** Label of the plan's own button. */
  cta: string
}

export const WEBSITE_PLANS: WebsitePlan[] = [
  {
    slug: 'start',
    name: 'Start',
    price: 30,
    tagline: 'Professioneel online, alles geregeld.',
    features: [
      'Template-website naar keuze',
      "Tot 5 pagina's",
      'Eigen domein, hosting en SSL',
      '1 kleine tekstwijziging per maand, wij voeren die uit',
    ],
    cta: 'Kies Start',
  },
  {
    slug: 'groei',
    name: 'Groei',
    price: 45,
    tagline: "Zelf je teksten en foto's aanpassen.",
    features: [
      'Alles van Start',
      "Eigen editor: pas zelf teksten en foto's aan",
      "Meer pagina's",
      'Eigen domein, hosting en SSL',
    ],
    popular: true,
    cta: 'Kies Groei',
  },
  {
    slug: 'pro',
    name: 'Pro',
    price: 60,
    from: true,
    tagline: 'Maatwerk ontwerp en webshop.',
    features: [
      'Maatwerk ontwerp, geen template',
      'Webshop mogelijk',
      "Onbeperkt aantal pagina's",
      'Eigen editor en prioriteit support',
    ],
    cta: 'Vraag Pro aan',
  },
]

export const PLAN_BY_SLUG: Record<WebsitePlanSlug, WebsitePlan> = Object.fromEntries(
  WEBSITE_PLANS.map((p) => [p.slug, p]),
) as Record<WebsitePlanSlug, WebsitePlan>

/** One row of the plan comparison. A boolean renders as a check or a dash. */
export interface CompareRow {
  label: string
  start: boolean | string
  groei: boolean | string
  pro: boolean | string
}

export const PLAN_COMPARISON: CompareRow[] = [
  { label: 'Template uit de galerij', start: true, groei: true, pro: 'Maatwerk ontwerp' },
  { label: "Aantal pagina's", start: '5', groei: '10', pro: 'Onbeperkt' },
  { label: 'Eigen domein, hosting en SSL', start: true, groei: true, pro: true },
  { label: 'Vindbaar in Google (SEO-basis)', start: true, groei: true, pro: true },
  { label: "Zelf teksten en foto's aanpassen", start: false, groei: true, pro: true },
  { label: 'Tekstwijziging door ons', start: '1 per maand', groei: 'Op aanvraag', pro: 'Op aanvraag' },
  { label: 'Webshop', start: false, groei: false, pro: true },
  { label: 'Prioriteit support', start: false, groei: false, pro: true },
  { label: 'Maandelijks opzegbaar', start: true, groei: true, pro: true },
]

/** Shown under the plans: the conditions that take away the objections. */
export const PLAN_TERMS = [
  'Geen opstartkosten',
  'Maandelijks opzegbaar',
  'Prijzen exclusief btw',
]
