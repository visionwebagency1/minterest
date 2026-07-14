#!/usr/bin/env node
// scripts/generate-sitemap.mjs — writes public/sitemap.xml from the SAME route
// source as the prerender manifest (src/prerender/routes.tsx), so the sitemap and
// the prerendered pages cannot drift. Runs BEFORE `vite build` so the file is
// copied into dist as a real static file.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer, loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// Inject the VITE_* vars that public modules read at import. The Vite SSR module
// runner does not expose custom VITE_* to import.meta.env, so a module that reads
// them during SSR would otherwise see undefined. Placeholder fallbacks keep the
// load side-effect-free (renderToString runs no effects, so no network happens).
function defineEnv() {
  const fileEnv = loadEnv('production', ROOT, 'VITE_')
  const pick = (k, fb) => fileEnv[k] || process.env[k] || fb
  return {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(pick('VITE_SUPABASE_URL', 'https://placeholder.supabase.co')),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(pick('VITE_SUPABASE_ANON_KEY', 'placeholder')),
    'import.meta.env.VITE_PUBLIC_BASE_URL': JSON.stringify(pick('VITE_PUBLIC_BASE_URL', 'https://minterest.nl')),
    'import.meta.env.VITE_FORM_ENDPOINT': JSON.stringify(pick('VITE_FORM_ENDPOINT', '')),
  }
}

async function main() {
  const vite = await createServer({
    mode: 'production',
    define: defineEnv(),
    ssr: { noExternal: ['react-helmet-async'] },
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
    logLevel: 'warn',
  })

  try {
    const { getAllPaths } = await vite.ssrLoadModule('/src/prerender/routes.tsx')
    const { buildSitemap } = await vite.ssrLoadModule('/src/prerender/sitemap.ts')

    const paths = getAllPaths()
    const lastmod = new Date().toISOString()
    const xml = buildSitemap(paths, lastmod)

    const outDir = path.join(ROOT, 'public')
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
    console.log(`✔ sitemap: ${paths.length} urls -> public/sitemap.xml`)
  } finally {
    await vite.close()
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('✖ sitemap generation failed:', err)
    process.exit(1)
  })
