/**
 * Omgevingsvariabelen van het panel. Een plek, leesbare fouten, geen secrets in code.
 * Zie .env.example; zet dezelfde waarden in de Vercel-projectinstellingen.
 */

function clean(value: string | undefined): string | undefined {
  const s = value?.trim()
  if (!s) return undefined
  return s.replace(/^["']|["']$/g, '') || undefined
}

export const SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL)
export const SUPABASE_ANON_KEY = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

/** Duidelijke fout zodra een sleutel ontbreekt, in plaats van een crash in een query. */
export function requireSupabaseEnv(): { url: string; anonKey: string } {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase is niet geconfigureerd. Zet NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY (zie .env.example).',
    )
  }
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY }
}
