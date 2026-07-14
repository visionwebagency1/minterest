import type { ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { RouteSeo } from '@/lib/RouteSeo'

/**
 * renderRoute() renders one route to HTML with react-helmet-async in SSR mode,
 * and injectIntoTemplate() bakes the result into the built index.html shell.
 * The header is included so the crawlable nav links land in the static HTML.
 */

export interface RenderInput {
  path: string
  Component: ComponentType<unknown>
  routePattern?: string
}

export interface RenderOutput {
  bodyHtml: string
  headHtml: string
}

export async function renderRoute(input: RenderInput): Promise<RenderOutput> {
  const routePattern = input.routePattern ?? input.path
  const helmetContext: { helmet?: HelmetServerState } = {}

  // Force THIS HelmetProvider into SSR mode so head tags land in helmetContext
  // instead of mutating a (non-existent) document.head. Restore afterwards.
  const HelmetAny = HelmetProvider as unknown as { canUseDOM: boolean }
  const prevCanUseDOM = HelmetAny.canUseDOM
  HelmetAny.canUseDOM = false

  // react-router's <Link> uses useLayoutEffect, which warns on the server; across
  // dozens of routes that floods the log. Filter just this one known message.
  const prevConsoleError = console.error
  console.error = (...args: unknown[]) => {
    const first = typeof args[0] === 'string' ? args[0] : ''
    if (first.includes('useLayoutEffect does nothing on the server')) return
    prevConsoleError(...(args as []))
  }

  try {
    const Component = input.Component
    const bodyHtml = renderToString(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[input.path]}>
          <RouteSeo />
          <Header />
          <Routes>
            <Route path={routePattern} element={<Component />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    )

    const h = helmetContext.helmet
    const headHtml = h
      ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join('\n')
      : ''
    return { bodyHtml, headHtml }
  } finally {
    HelmetAny.canUseDOM = prevCanUseDOM
    console.error = prevConsoleError
  }
}

// Default head tags baked into the shell. Strip them before injecting the
// per-route ones, so the final HTML never has duplicate title/description/og.
const DEFAULT_HEAD_PATTERNS: RegExp[] = [
  /<title>[^<]*<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
]

/** Pure function: inject rendered head/body into the built index.html template. */
export function injectIntoTemplate(template: string, parts: { headHtml: string; bodyHtml: string }): string {
  let html = template
  // Only strip the shell defaults when we actually have a replacement title, so
  // a route that failed to produce head tags never ends up title-less. Helmet
  // emits `<title data-rh="true">`, so match a title tag with or without attrs.
  if (parts.headHtml && /<title[\s>]/i.test(parts.headHtml)) {
    for (const re of DEFAULT_HEAD_PATTERNS) html = html.replace(re, '')
  }
  html = html.replace('</head>', `${parts.headHtml}\n</head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${parts.bodyHtml}</div>`)
  return html
}
