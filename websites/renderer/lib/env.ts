/**
 * Omgevingsvariabelen van de renderer. Alles wordt hier gelezen, zodat er nergens
 * anders in de app een process.env-verwijzing staat en een ontbrekende sleutel
 * meteen een leesbare fout geeft in plaats van een crash diep in een query.
 *
 * Geen secrets in code: deze waarden komen uit .env.local (lokaal) of uit de
 * Vercel-projectinstellingen (productie). Zie .env.example.
 */

function clean(value: string | undefined): string | undefined {
  const s = value?.trim()
  if (!s) return undefined
  return s.replace(/^["']|["']$/g, '') || undefined
}

export const SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL)
export const SUPABASE_ANON_KEY = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

/** Alleen server-side. Nooit in een client component importeren. */
export const SUPABASE_SERVICE_ROLE_KEY = clean(process.env.SUPABASE_SERVICE_ROLE_KEY)

/**
 * Domein waarop de renderer zelf draait (bijv. sites.minterest.nl). Een verzoek
 * op dit domein hoort bij geen enkele klant en krijgt de statuspagina.
 */
export const RENDERER_HOST = clean(process.env.RENDERER_HOST) ?? 'localhost'

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
