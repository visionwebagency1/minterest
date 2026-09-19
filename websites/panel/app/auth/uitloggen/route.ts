import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

/** Uitloggen en terug naar de loginpagina. */
export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/login', request.url), { status: 303 })
}
