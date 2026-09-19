import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

import { requireSupabaseEnv } from '../env'

/**
 * Supabase-client voor server components, server actions en route handlers.
 *
 * Draait met de anon-sleutel en de sessie van de ingelogde gebruiker, zodat Row
 * Level Security bepaalt wat iemand ziet. Een admin ziet alles, een klant alleen
 * de eigen rijen. De service_role-sleutel komt hier bewust niet voor.
 */
export async function createClient() {
  const { url, anonKey } = requireSupabaseEnv()
  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Aanroep vanuit een server component: de proxy ververst de sessie al.
        }
      },
    },
  })
}
