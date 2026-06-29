import { createClient } from '@supabase/supabase-js'

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

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True when both env vars are present. Lets the UI show a friendly setup hint. */
export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  // Thrown only when admin code actually loads this module, never on the public site.
  throw new Error(
    'Supabase is niet geconfigureerd. Zet VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY in je .env (zie .env.example) en in de Vercel-omgeving.',
  )
}

export const supabase = createClient(url as string, anonKey as string, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})
