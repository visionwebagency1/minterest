import { SERVICE_BY_SLUG } from '@/data/services'
import { SUB_BY_KEY } from '@/data/subServices'

/**
 * Single source of truth for per-route SEO meta (title, description, canonical).
 * Consumed by <RouteSeo> for both the client and the build-time prerender, so a
 * crawler gets a unique, indexable head on every URL. Dynamic routes derive
 * their meta from the local services / sub-services data.
 *
 * Basic-but-unique in this phase. Richer structured data (JSON-LD), og:image and
 * keyword-optimised copy land in the SEO-hygiene / content phases.
 */

export const SITE_URL = 'https://minterest.nl'
export const SITE_NAME = 'Minterest'

export type RouteMeta = {
  title: string
  description: string
  canonical: string
  noindex?: boolean
}

const SEP = ' | '

/** Collapse whitespace and clip to a sensible meta-description length. */
function clip(input: string, max = 160): string {
  const s = input.replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

const withBrand = (title: string) => (title.includes(SITE_NAME) ? title : `${title}${SEP}${SITE_NAME}`)

// Curated, keyword-optimised titles + descriptions per page. Titles ~50-60 chars,
// descriptions ~150-160. The primary keyword leads the title where it fits.
const STATIC: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Marketingbureau voor merk, website en groei | Minterest',
    description:
      'Minterest is een creatief marketingbureau voor merk, website, video en social media. Wij maken jouw bedrijf professioneel zichtbaar en helpen je groeien.',
  },
  '/diensten': {
    title: 'Diensten: branding, web, video en social | Minterest',
    description:
      'De diensten van Minterest: design en branding, web development, video en fotografie, social media, SEO en SEA en meer. Alles om jouw merk te laten groeien.',
  },
  '/work': {
    title: 'Ons werk: portfolio van Minterest',
    description:
      'Bekijk het werk van Minterest: merken, websites en campagnes die we voor onze klanten bouwden. Ontdek wat we voor jouw bedrijf kunnen betekenen.',
  },
  '/about': {
    title: 'Over Minterest | Creatief marketingbureau',
    description:
      'Maak kennis met Minterest, het creatieve marketingbureau achter merk, web en groei. Ontdek wie we zijn, hoe we werken en waar we voor staan.',
  },
  '/contact': {
    title: 'Contact | Minterest marketingbureau',
    description:
      'Neem contact op met Minterest. Vertel ons over je project en ontdek hoe we jouw merk professioneel zichtbaar maken en laten groeien.',
  },
  '/start': {
    title: 'Start jouw project bij Minterest',
    description:
      'Klaar om te groeien? Start jouw project bij Minterest. Vertel ons waar je staat en wij helpen je met merk, website en marketing die werkt.',
  },
  '/website-audit': {
    title: 'Gratis website-audit aanvragen | Minterest',
    description:
      'Vraag een gratis website-audit aan bij Minterest. Ontdek waar je website beter kan presteren en meer bezoekers omzet in aanvragen en klanten.',
  },
  '/algemene-voorwaarden': {
    title: 'Algemene voorwaarden | Minterest',
    description:
      'De algemene voorwaarden van Minterest, van toepassing op onze offertes, overeenkomsten en werkzaamheden.',
  },
}

// Per-service SEO overrides (primary keyword led). Keyed by service slug.
const SERVICE_META: Record<string, { title: string; description: string; keyword: string }> = {
  'design-branding': {
    keyword: 'branding bureau',
    title: 'Branding bureau voor een sterke huisstijl | Minterest',
    description:
      'Branding bureau Minterest bouwt merken die blijven hangen: logo, huisstijl, packaging en complete branding. Professioneel, herkenbaar en klaar om te groeien.',
  },
  'web-development': {
    keyword: 'webdesign bureau',
    title: 'Webdesign bureau | Website laten maken | Minterest',
    description:
      'Website laten maken bij webdesign bureau Minterest. Websites en webshops die vertrouwen wekken, duidelijk converteren en meegroeien met je bedrijf.',
  },
  'video-fotografie': {
    keyword: 'video en fotografie',
    title: 'Video en fotografie voor je merk | Minterest',
    description:
      'Professionele video en fotografie die je merk sterk neerzetten: short video, AI video en fotoshoots voor je website, social media en campagnes.',
  },
  'social-media': {
    keyword: 'social media bureau',
    title: 'Social media bureau voor bereik en groei | Minterest',
    description:
      'Social media bureau Minterest: beheer, influencer marketing en advertenties op Meta en TikTok. Wij vergroten je bereik en zetten aandacht om in klanten.',
  },
  'seo-sea': {
    keyword: 'SEO bureau',
    title: 'SEO en SEA bureau voor meer bezoekers | Minterest',
    description:
      'SEO bureau Minterest zorgt dat je beter gevonden wordt in Google met SEO en Google Ads. Meer relevante bezoekers die je omzet in aanvragen en klanten.',
  },
  extra: {
    keyword: 'extra diensten',
    title: 'Extra diensten: AI, administratie en meer | Minterest',
    description:
      'AI agents, administratie, sourcing en detachering. Slimme extra diensten die je bedrijf ontzorgen en helpen sneller en efficienter te werken.',
  },
}

// Keyword-form of each parent service, used in sub-service titles.
const PARENT_KEYWORD: Record<string, string> = {
  'design-branding': 'Branding bureau',
  'web-development': 'Webdesign bureau',
  'video-fotografie': 'Video en fotografie',
  'social-media': 'Social media bureau',
  'seo-sea': 'SEO bureau',
  extra: 'Extra diensten',
}

/** Paths that must never be indexed (private / token-based). */
const NOINDEX_PREFIXES = ['/admin', '/offerte/', '/factuur/']

function normalize(pathname: string): string {
  if (!pathname) return '/'
  const p = pathname.split('?')[0].split('#')[0]
  if (p === '/') return '/'
  return p.replace(/\/+$/, '') || '/'
}

export function metaForPath(pathname: string): RouteMeta {
  const path = normalize(pathname)
  const canonical = `${SITE_URL}${path === '/' ? '' : path}` || SITE_URL

  if (NOINDEX_PREFIXES.some((pre) => path === pre.replace(/\/$/, '') || path.startsWith(pre))) {
    return { title: withBrand(SITE_NAME), description: clip(STATIC['/'].description), canonical, noindex: true }
  }

  const stat = STATIC[path]
  if (stat) return { title: withBrand(stat.title), description: clip(stat.description), canonical }

  const seg = path.split('/').filter(Boolean)

  // /diensten/:slug/:subslug
  if (seg[0] === 'diensten' && seg.length === 3) {
    const sub = SUB_BY_KEY[`${seg[1]}/${seg[2]}`]
    if (sub) {
      const parentKw = PARENT_KEYWORD[sub.serviceSlug] ?? SERVICE_BY_SLUG[sub.serviceSlug]?.label ?? 'Diensten'
      return {
        title: withBrand(`${sub.name}${SEP}${parentKw}`),
        description: clip(sub.tagline),
        canonical,
      }
    }
  }

  // /diensten/:slug
  if (seg[0] === 'diensten' && seg.length === 2) {
    const meta = SERVICE_META[seg[1]]
    if (meta) return { title: withBrand(meta.title), description: clip(meta.description), canonical }
    const svc = SERVICE_BY_SLUG[seg[1]]
    if (svc) return { title: withBrand(svc.label), description: clip(svc.cardDesc || svc.tagline), canonical }
  }

  // /work/:slug (project title is loaded client-side; keep unique but generic here)
  if (seg[0] === 'work' && seg.length === 2) {
    const name = seg[1].replace(/-/g, ' ')
    return {
      title: withBrand(`${name}${SEP}Werk`),
      description: clip('Een case uit het portfolio van Minterest.'),
      canonical,
    }
  }

  // Unknown route (e.g. 404): brand default, do not index.
  return { title: withBrand(SITE_NAME), description: clip(STATIC['/'].description), canonical, noindex: true }
}
