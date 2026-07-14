import { describe, it, expect } from 'vitest'
import { prerenderRoutes, getAllPaths } from './routes'
import { buildSitemap } from './sitemap'
import { MAIN_SERVICES } from '@/data/services'
import { SUB_SERVICES } from '@/data/subServices'

describe('prerender manifest', () => {
  it('every route maps to a component', () => {
    for (const r of prerenderRoutes) expect(r.Component, r.path).toBeTruthy()
  })

  it('getAllPaths covers home, static, all services and sub-services, with no duplicates', () => {
    const paths = getAllPaths()
    expect(paths).toContain('/')
    expect(paths).toContain('/diensten')
    for (const s of MAIN_SERVICES) expect(paths).toContain(`/diensten/${s.slug}`)
    for (const s of SUB_SERVICES) expect(paths).toContain(`/diensten/${s.serviceSlug}/${s.slug}`)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('sitemap has exactly one <loc> per prerendered path (parity)', () => {
    const paths = getAllPaths()
    const xml = buildSitemap(paths, '2026-01-01T00:00:00.000Z')
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    expect(locs.length).toBe(paths.length)
    for (const p of paths) {
      expect(locs).toContain(`https://minterest.nl${p === '/' ? '' : p}`)
    }
  })
})
