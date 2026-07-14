import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { metaForPath, SITE_NAME, SITE_URL } from './routeMeta'
import { structuredDataForPath } from './structuredData'

const OG_IMAGE = `${SITE_URL}/og-default.png`

/** Serialize JSON-LD safely for inline injection (no premature tag close). */
const ld = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')

/**
 * Renders the per-route head tags via react-helmet-async. Mounted once inside the
 * router so it updates on client navigation, and rendered by the build-time
 * prerender so every static HTML file has its own title, description, canonical
 * and social tags. Meta comes from the shared routeMeta source of truth.
 */
export function RouteSeo() {
  const { pathname } = useLocation()
  const m = metaForPath(pathname)
  const graph = structuredDataForPath(pathname)

  return (
    <Helmet>
      <html lang="nl" />
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <link rel="canonical" href={m.canonical} />
      <meta
        name="robots"
        content={m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      <meta property="og:url" content={m.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {graph.length > 0 && (
        <script type="application/ld+json">
          {ld({ '@context': 'https://schema.org', '@graph': graph })}
        </script>
      )}
    </Helmet>
  )
}
