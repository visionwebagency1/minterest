import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './env'

/**
 * Supabase-client van de renderer: alleen lezen, geen sessie, geen cookies.
 *
 * De renderer kent geen ingelogde gebruikers. Hij draait met de anon-sleutel en
 * haalt een site op via public.get_site_by_domain(host), een SECURITY DEFINER
 * functie die alleen live sites en alleen renderbare velden teruggeeft. Daardoor
 * heeft de renderer geen service_role-sleutel nodig en kan een lek in deze app
 * nooit klantgegevens, facturen of interne referenties prijsgeven.
 */
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is niet geconfigureerd. Zet NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY (zie .env.example).',
    )
  }
  if (!client) {
    client = createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  }
  return client
}
