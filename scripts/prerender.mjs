#!/usr/bin/env node
// scripts/prerender.mjs — run AFTER `vite build` (dist/index.html is the shell
// template). Renders every route in the manifest to dist/<route>/index.html with
// real content + per-route head baked in. Never fails the whole build for one
// route (the SPA fallback still serves it).
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer, loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const TEMPLATE_PATH = path.join(DIST, 'index.html')

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

function writeRoute(html, routePath) {
  const rel = routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\//, ''), 'index.html')
  const outPath = path.join(DIST, rel)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
}

async function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('✖ dist/index.html not found — run `vite build` first.')
    process.exit(1)
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8')

  // Middleware-mode server, production mode, only to SSR-load our TS modules.
  const vite = await createServer({
    mode: 'production',
    define: defineEnv(),
    // Let Vite transform this CJS dep for the SSR runner so its named exports
    // (HelmetProvider, Helmet) resolve during ssrLoadModule.
    ssr: { noExternal: ['react-helmet-async'] },
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
    logLevel: 'warn',
  })

  try {
    const { prerenderRoutes } = await vite.ssrLoadModule('/src/prerender/routes.tsx')
    const { renderRoute, injectIntoTemplate } = await vite.ssrLoadModule('/src/prerender/render.tsx')

    let written = 0
    const skipped = []
    for (const route of prerenderRoutes) {
      const concretePaths = route.getPaths ? route.getPaths() : [route.path]
      for (const routePath of concretePaths) {
        try {
          const { bodyHtml, headHtml } = await renderRoute({
            path: routePath,
            Component: route.Component,
            routePattern: route.path,
          })
          if (!bodyHtml || bodyHtml.length < 200) throw new Error('empty or too-short body')
          writeRoute(injectIntoTemplate(template, { headHtml, bodyHtml }), routePath)
          written++
        } catch (err) {
          skipped.push(routePath)
          console.warn(`⚠ prerender skipped ${routePath}: ${err.message}`)
        }
      }
    }
    console.log(`✔ prerendered ${written} routes${skipped.length ? ` (skipped ${skipped.length})` : ''}`)
  } finally {
    await vite.close()
  }
}

main()
  .then(() => process.exit(0)) // force a clean exit; esbuild handles can otherwise hang the build
  .catch((err) => {
    console.error('✖ prerender failed:', err)
    process.exit(1)
  })
