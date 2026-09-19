import type { NextRequest } from 'next/server'

import { updateSession } from './lib/supabase/session'

/**
 * Draait voor elk verzoek: ververst de Supabase-sessie en stuurt iedereen zonder
 * login naar /login. (In Next 16 heet dit bestand proxy in plaats van middleware.)
 */
export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
