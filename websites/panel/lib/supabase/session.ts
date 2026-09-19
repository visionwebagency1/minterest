import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../env'

/** Routes die zonder login bereikbaar zijn. */
const PUBLIC_PATHS = ['/login', '/auth', '/api/health']

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/**
 * Ververst de Supabase-sessie op elk verzoek en houdt niet-ingelogde bezoekers
 * buiten het panel. Wie wat mag zien (admin of klant) wordt daarna per pagina
 * bepaald op basis van profiles.role, en daaronder nog eens door RLS.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Zonder Supabase-configuratie draait de app wel, maar is alles publiek geblokkeerd
  // behalve de setup-melding op de loginpagina.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return response

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // Belangrijk: getUser() valideert het token bij Supabase, getSession() niet.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (!user && !isPublic(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('volgende', pathname)
    return NextResponse.redirect(url)
  }

  return response
}
