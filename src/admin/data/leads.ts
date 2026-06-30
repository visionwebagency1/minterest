import { getSupabase } from '@/lib/supabase'

/**
 * Data access for the inbox (leads / aanvragen). Thin wrappers around Supabase
 * so the admin pages stay focused on presentation. Every call runs under the
 * logged-in admin session, so RLS allows reading and updating.
 */

export type LeadStatus = 'nieuw' | 'gelezen' | 'in_behandeling' | 'afgehandeld'

export type Lead = {
  id: string
  created_at: string
  source: string
  status: LeadStatus
  name: string | null
  email: string | null
  company: string | null
  website_url: string | null
  interest: string[]
  budget: string | null
  timeline: string | null
  message: string | null
  page: string | null
  customer_id: string | null
  raw: Record<string, unknown> | null
}

/** Workflow statuses in order, with a human label and a colour token. */
export const LEAD_STATUSES: { value: LeadStatus; label: string; tone: string }[] = [
  { value: 'nieuw', label: 'Nieuw', tone: 'emerald' },
  { value: 'gelezen', label: 'Gelezen', tone: 'slate' },
  { value: 'in_behandeling', label: 'In behandeling', tone: 'amber' },
  { value: 'afgehandeld', label: 'Afgehandeld', tone: 'green' },
]

/** Friendly label for where a request came from. */
export const LEAD_SOURCE_LABELS: Record<string, string> = {
  contact: 'Contactformulier',
  start: 'Start jouw project',
  audit: 'Website-audit',
}

export function leadSourceLabel(source: string): string {
  return LEAD_SOURCE_LABELS[source] ?? source
}

export function leadStatusMeta(status: LeadStatus) {
  return LEAD_STATUSES.find((s) => s.value === status) ?? LEAD_STATUSES[0]
}

/** Service-slug → readable label (kept local so the admin bundle stays lean). */
export const INTEREST_LABELS: Record<string, string> = {
  'design-branding': 'Branding voor groei',
  'web-development': 'Web Development',
  'video-fotografie': 'Video & Fotografie',
  'social-media': 'Social Media Groei',
  'seo-sea': 'SEO & SEA',
  extra: 'Extra groeidiensten',
}

export function interestLabel(slug: string): string {
  return INTEREST_LABELS[slug] ?? slug
}

export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await getSupabase()
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Lead[]
}

export async function fetchLead(id: string): Promise<Lead | null> {
  const { data, error } = await getSupabase()
    .from('leads')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return (data as Lead) ?? null
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const { error } = await getSupabase().from('leads').update({ status }).eq('id', id)
  if (error) throw error
}

/** Number of requests still marked "nieuw" — drives the sidebar/dashboard badge. */
export async function countNewLeads(): Promise<number> {
  const { count, error } = await getSupabase()
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'nieuw')
  if (error) throw error
  return count ?? 0
}
