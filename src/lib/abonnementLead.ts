/**
 * Resolving the database ids for a website-subscription lead.
 *
 * The page itself works from static data (so it prerenders and Google sees the
 * prices), but a lead should point at the real `web_plans` / `web_templates`
 * rows so the panel can work with it. We look those ids up by slug at submit
 * time, with the anon key: RLS allows reading active plans and available
 * templates, nothing else.
 *
 * It is deliberately best effort. If the lookup fails, the lead is still saved;
 * the chosen plan and template are also kept in `raw`, so nothing is lost.
 */

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

type SlugMap = Record<string, string>

let plansCache: SlugMap | null = null
let templatesCache: SlugMap | null = null

async function fetchSlugMap(table: 'web_plans' | 'web_templates'): Promise<SlugMap> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return {}
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id,slug`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return {}
    const rows = (await res.json()) as Array<{ id: string; slug: string }>
    return Object.fromEntries(rows.map((r) => [r.slug, r.id]))
  } catch {
    return {}
  }
}

export interface ResolvedIds {
  planId: string | null
  templateId: string | null
}

/** Look up the plan and template ids for the chosen slugs. Never throws. */
export async function resolveIds(
  planSlug?: string | null,
  templateSlug?: string | null,
): Promise<ResolvedIds> {
  const empty: SlugMap = {}
  const [plans, templates] = await Promise.all<SlugMap>([
    planSlug ? (plansCache ?? fetchSlugMap('web_plans')) : empty,
    templateSlug ? (templatesCache ?? fetchSlugMap('web_templates')) : empty,
  ])
  if (planSlug) plansCache = plans
  if (templateSlug) templatesCache = templates

  return {
    planId: (planSlug ? plans[planSlug] : null) ?? null,
    templateId: (templateSlug ? templates[templateSlug] : null) ?? null,
  }
}

/** The source value every website-subscription lead is stored under. */
export const ABONNEMENT_LEAD_SOURCE = 'website-abonnement'
