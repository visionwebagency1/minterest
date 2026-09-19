import { NextResponse } from 'next/server'

import { isSupabaseConfigured } from '@/lib/env'
import { normalizeHost } from '@/lib/host'

export const dynamic = 'force-dynamic'

/** Healthcheck: draait de app en is de omgeving compleet? Geen geheimen in het antwoord. */
export async function GET(request: Request) {
  return NextResponse.json({
    ok: true,
    app: 'websites-renderer',
    host: normalizeHost(new URL(request.url).host),
    supabase: isSupabaseConfigured ? 'geconfigureerd' : 'ontbreekt',
  })
}
