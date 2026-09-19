import { NextResponse, type NextRequest } from 'next/server'

import { normalizeHost } from './lib/host'

/**
 * De kern van de multi-tenant opzet: elk verzoek draagt zijn eigen domein mee.
 *
 * De proxy leest de host-header, maakt hem schoon (geen poort, geen www,
 * kleine letters) en geeft hem als x-site-host door aan de app. Fase 1 zoekt met
 * die waarde de bijbehorende site op en rendert het template. Zo is een nieuwe
 * klant een rij in de database plus een domeinkoppeling: nul deploys.
 */
export function proxy(request: NextRequest) {
  const host = normalizeHost(request.headers.get('host'))

  const headers = new Headers(request.headers)
  headers.set('x-site-host', host)

  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Alleen Next-interne assets overslaan. robots.txt en sitemap.xml zijn in
  // fase 1 juist per klant-site verschillend en moeten de host dus wel kennen.
  matcher: ['/((?!_next/static|_next/image).*)'],
}
