import { SITE_URL } from '@/lib/routeMeta'

/**
 * Build a sitemap.xml from a list of concrete paths. Kept pure and importable so
 * the sitemap generator and the parity test both use the exact same logic and
 * the same route source (getAllPaths), so sitemap and prerender cannot drift.
 */
export function buildSitemap(paths: string[], lastmod: string, baseUrl: string = SITE_URL): string {
  const urls = paths
    .map((p) => {
      const loc = `${baseUrl}${p === '/' ? '' : p}`
      const priority = p === '/' ? '1.0' : '0.8'
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
