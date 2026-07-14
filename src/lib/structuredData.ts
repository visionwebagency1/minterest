import { SERVICE_BY_SLUG } from '@/data/services'
import { SUB_BY_KEY } from '@/data/subServices'
import { SITE_URL, SITE_NAME } from './routeMeta'

/**
 * JSON-LD structured data per route, rendered server-side by <RouteSeo>. Kept in
 * one place next to routeMeta so the schema stays consistent across the site.
 *
 * Home: Organization + WebSite. Service pages: Service. Inner pages:
 * BreadcrumbList. Uses Minterest's real business details.
 */

const ORG_ID = `${SITE_URL}/#organization`
const LOGO = `${SITE_URL}/favicon.svg`

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO,
  image: `${SITE_URL}/og-default.png`,
  email: 'info@minterest.nl',
  description:
    'Creatief marketingbureau voor merk, website, video en social media. Wij maken jouw bedrijf professioneel zichtbaar en helpen je groeien.',
  vatID: 'NL003932189B46',
  identifier: { '@type': 'PropertyValue', name: 'KvK', value: '83955526' },
  areaServed: { '@type': 'Country', name: 'Nederland' },
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'nl-NL',
  publisher: { '@id': ORG_ID },
}

// LocalBusiness (ProfessionalService subtype) for local SEO. Serves the whole of
// the Netherlands. Add a street address here once available to strengthen local
// rich results, alongside a Google Business Profile.
const localBusiness = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og-default.png`,
  email: 'info@minterest.nl',
  description:
    'Creatief marketingbureau in Nederland voor merk, website, video en social media.',
  areaServed: { '@type': 'Country', name: 'Nederland' },
  priceRange: '€€',
  vatID: 'NL003932189B46',
  identifier: { '@type': 'PropertyValue', name: 'KvK', value: '83955526' },
  parentOrganization: { '@id': ORG_ID },
}

type Crumb = { name: string; path: string }

function breadcrumb(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '' : c.path}`,
    })),
  }
}

function service(name: string, description: string, path: string) {
  return {
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Nederland' },
  }
}

function normalize(pathname: string): string {
  if (!pathname) return '/'
  const p = pathname.split('?')[0].split('#')[0]
  if (p === '/') return '/'
  return p.replace(/\/+$/, '') || '/'
}

const STATIC_NAMES: Record<string, string> = {
  '/diensten': 'Diensten',
  '/work': 'Ons werk',
  '/about': 'Over ons',
  '/contact': 'Contact',
  '/start': 'Start jouw project',
  '/website-audit': 'Website-audit',
  '/algemene-voorwaarden': 'Algemene voorwaarden',
}

/** The @graph node array for a path (empty for private/no-index routes). */
export function structuredDataForPath(pathname: string): object[] {
  const path = normalize(pathname)

  if (path === '/admin' || path.startsWith('/offerte/') || path.startsWith('/factuur/')) return []

  if (path === '/') return [website, organization, localBusiness]

  const seg = path.split('/').filter(Boolean)

  // /diensten/:slug/:subslug
  if (seg[0] === 'diensten' && seg.length === 3) {
    const sub = SUB_BY_KEY[`${seg[1]}/${seg[2]}`]
    if (sub) {
      const parent = SERVICE_BY_SLUG[sub.serviceSlug]
      return [
        service(sub.name, sub.tagline, path),
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Diensten', path: '/diensten' },
          { name: parent?.label ?? 'Dienst', path: `/diensten/${sub.serviceSlug}` },
          { name: sub.name, path },
        ]),
      ]
    }
  }

  // /diensten/:slug
  if (seg[0] === 'diensten' && seg.length === 2) {
    const svc = SERVICE_BY_SLUG[seg[1]]
    if (svc) {
      return [
        service(svc.label, svc.cardDesc || svc.tagline, path),
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Diensten', path: '/diensten' },
          { name: svc.label, path },
        ]),
      ]
    }
  }

  // Other public inner pages: a simple breadcrumb.
  const name = STATIC_NAMES[path]
  if (name) {
    return [breadcrumb([{ name: 'Home', path: '/' }, { name, path }])]
  }

  return []
}
