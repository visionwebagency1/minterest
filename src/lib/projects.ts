import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

/**
 * Shared Project type + public (anon) read access to PUBLISHED projects. Reads
 * go through the PostgREST endpoint with plain fetch, so the public bundle never
 * imports the Supabase client. RLS guarantees only published projects come back.
 */

export type ProjectStatus = 'concept' | 'gepubliceerd'

export type Project = {
  id: string
  created_at: string
  slug: string
  title: string
  category: string | null
  client: string | null
  year: string | null
  cover_image: string | null
  before_image: string | null
  after_image: string | null
  summary: string | null
  intro: string | null
  challenge: string | null
  approach: string | null
  result: string | null
  gallery: string[]
  quote: string | null
  quote_author: string | null
  featured: boolean
  sort_order: number
  status: ProjectStatus
  updated_at: string
}

async function restGet(query: string): Promise<Project[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return []
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/projects?${query}`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    })
    if (!res.ok) return []
    return (await res.json()) as Project[]
  } catch {
    return []
  }
}

/** All published projects, ordered. */
export const getPublishedProjects = () => restGet('status=eq.gepubliceerd&order=sort_order.asc')

/** Featured published projects for the homepage grid. */
export const getFeaturedProjects = (limit = 4) =>
  restGet(`status=eq.gepubliceerd&featured=eq.true&order=sort_order.asc&limit=${limit}`)

/** One published project by slug (case page), or null. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const rows = await restGet(`slug=eq.${encodeURIComponent(slug)}&status=eq.gepubliceerd&limit=1`)
  return rows[0] ?? null
}
