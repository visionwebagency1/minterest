import { describe, it, expect } from 'vitest'
import { renderRoute, injectIntoTemplate } from './render'
import { Home } from '@/sections/Home'
import { ServiceRoute } from '@/pages/ServicePage'

const titleOf = (headHtml: string) => headHtml.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? ''

describe('renderRoute', () => {
  it('renders a non-empty body with a title for the homepage', async () => {
    const { bodyHtml, headHtml } = await renderRoute({ path: '/', Component: Home })
    expect(bodyHtml.length).toBeGreaterThan(500)
    expect(titleOf(headHtml)).toMatch(/Minterest/)
  })

  it('two different routes produce different, meaningful titles', async () => {
    const home = await renderRoute({ path: '/', Component: Home })
    const svc = await renderRoute({
      path: '/diensten/web-development',
      Component: ServiceRoute,
      routePattern: '/diensten/:slug',
    })
    expect(svc.bodyHtml.length).toBeGreaterThan(500)
    expect(titleOf(home.headHtml)).not.toBe(titleOf(svc.headHtml))
    expect(titleOf(svc.headHtml)).toMatch(/Webdesign bureau/i)
  })

  it('injectIntoTemplate bakes body + head and drops the default title', () => {
    const template =
      '<!doctype html><html><head><title>Default</title></head><body><div id="root"></div></body></html>'
    const out = injectIntoTemplate(template, {
      headHtml: '<title>Nieuw</title>',
      bodyHtml: '<main>Echte inhoud</main>',
    })
    expect(out).toContain('<div id="root"><main>Echte inhoud</main></div>')
    expect(out).toContain('<title>Nieuw</title>')
    expect(out).not.toContain('<title>Default</title>')
  })
})
