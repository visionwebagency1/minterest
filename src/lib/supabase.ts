import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Shared Supabase client for the admin panel.
 *
 * IMPORTANT: this module is only imported from the (lazy-loaded) /admin code, so
 * the public marketing site never bundles or runs it. The public website keeps
 * working even when these env vars are not set.
 *
 * The anon key is safe to ship to the browser: it only grants what Row Level
 * Security allows. The service_role key must NEVER end up in client code.
 *
 * Set these in `.env` (local) and in the Vercel project settings (production):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */

import { SUPABASE_URL as url, SUPABASE_ANON_KEY as anonKey, isSupabaseConfigured } from './env'

/** True when both env vars are present and valid. Lets the admin show a setup hint instead of crashing. */
export { isSupabaseConfigured }

let client: SupabaseClient | null = null

/**
 * Returns the singleton Supabase client. Importing this module never throws; the
 * error is only raised if admin code asks for the client while it is not yet
 * configured (so we can show a friendly message at the admin boundary).
 */
export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is niet geconfigureerd. Zet VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY in je .env (zie .env.example) en in de Vercel-omgeving.',
    )
  }
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  }
  return client
}
