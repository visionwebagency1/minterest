import type { ComponentType } from 'react'
// Eager imports of the public page components (NOT React.lazy: renderToString
// cannot resolve a lazy Suspense boundary synchronously).
import { Home } from '@/sections/Home'
import { Services } from '@/pages/Services'
import { ServiceRoute } from '@/pages/ServicePage'
import { SubServiceRoute } from '@/pages/SubServicePage'
import { Work } from '@/pages/Work'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Start } from '@/pages/Start'
import { Audit } from '@/pages/Audit'
import { Terms } from '@/pages/Terms'
import { MAIN_SERVICES } from '@/data/services'
import { SUB_SERVICES } from '@/data/subServices'
import staticRoutes from './staticRoutes.json'

/**
 * The route manifest: the single source of truth for what gets prerendered, and
 * (via getAllPaths) for the sitemap, so the two cannot drift.
 *
 * Excluded on purpose: /admin (private), /offerte/:token and /factuur/:token
 * (private token pages, noindex), and the legacy redirect routes. The dynamic
 * /work/:slug case pages depend on runtime data from Supabase, so they are not
 * prerendered here; the SPA fallback keeps serving them.
 */

export interface PrerenderRoute {
  /** React Router pattern. Contains ':' for a dynamic template. */
  path: string
  Component: ComponentType<unknown>
  /** For a dynamic template: the concrete paths to expand at build time. */
  getPaths?: () => string[]
}

const COMPONENT_BY_PATH: Record<string, ComponentType<unknown>> = {
  '/': Home,
  '/diensten': Services,
  '/work': Work,
  '/about': About,
  '/contact': Contact,
  '/start': Start,
  '/website-audit': Audit,
  '/algemene-voorwaarden': Terms,
}

const staticPrerenderRoutes: PrerenderRoute[] = (staticRoutes as Array<{ path: string }>).map((r) => ({
  path: r.path,
  Component: COMPONENT_BY_PATH[r.path],
}))

export const prerenderRoutes: PrerenderRoute[] = [
  ...staticPrerenderRoutes,
  {
    path: '/diensten/:slug',
    Component: ServiceRoute,
    getPaths: () => MAIN_SERVICES.map((s) => `/diensten/${s.slug}`),
  },
  {
    path: '/diensten/:slug/:subslug',
    Component: SubServiceRoute,
    getPaths: () => SUB_SERVICES.map((s) => `/diensten/${s.serviceSlug}/${s.slug}`),
  },
]

/** Every concrete public path this build prerenders. Also feeds the sitemap. */
export function getAllPaths(): string[] {
  const out: string[] = []
  for (const route of prerenderRoutes) {
    if (route.getPaths) out.push(...route.getPaths())
    else out.push(route.path)
  }
  return Array.from(new Set(out))
}
