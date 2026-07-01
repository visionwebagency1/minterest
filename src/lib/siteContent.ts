import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

/**
 * Public read access to published site content. Talks to Supabase only through
 * the get_published_content RPC with plain fetch, so the public bundle never
 * imports the Supabase client.
 *
 * Returns a flat { key: value } map of PUBLISHED values for the page. The
 * SiteContentProvider merges this over the registry defaults, so the site shows
 * its current text immediately and only swaps to a published override once it
 * loads (identical at seed time). If Supabase is unreachable or unconfigured,
 * the map is empty and the defaults are used.
 */
export async function getPublishedContent(page: string): Promise<Record<string, string>> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return {}
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_published_content`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_page: page }),
    })
    if (!res.ok) return {}
    const data = await res.json()
    return data && typeof data === 'object' ? (data as Record<string, string>) : {}
  } catch {
    return {}
  }
}
