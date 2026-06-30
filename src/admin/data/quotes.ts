import { getSupabase } from '@/lib/supabase'
import { computeTotals } from '@/lib/money'

/**
 * Data access for quotes (offertes) and their line items. Admin-only via RLS.
 * Totals are computed in the app and stored as a snapshot on the quote, so
 * lists and the public link stay fast and consistent.
 */

export type QuoteStatus = 'concept' | 'verstuurd' | 'bekeken' | 'geaccepteerd' | 'afgewezen'

export type QuoteLine = {
  id: string
  quote_id: string
  position: number
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export type Quote = {
  id: string
  created_at: string
  number: string
  customer_id: string | null
  status: QuoteStatus
  issue_date: string
  valid_until: string | null
  notes: string | null
  subtotal: number
  vat_amount: number
  total: number
  public_token: string
  responded_at: string | null
}

/** A line as edited in the form (no id needed until saved). */
export type LineDraft = {
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export type QuoteDraft = {
  customer_id: string | null
  issue_date: string
  valid_until: string | null
  notes: string | null
  lines: LineDraft[]
}

export const QUOTE_STATUSES: { value: QuoteStatus; label: string; tone: string }[] = [
  { value: 'concept', label: 'Concept', tone: 'slate' },
  { value: 'verstuurd', label: 'Verstuurd', tone: 'emerald' },
  { value: 'bekeken', label: 'Bekeken', tone: 'amber' },
  { value: 'geaccepteerd', label: 'Geaccepteerd', tone: 'green' },
  { value: 'afgewezen', label: 'Afgewezen', tone: 'red' },
]

export function quoteStatusMeta(status: QuoteStatus) {
  return QUOTE_STATUSES.find((s) => s.value === status) ?? QUOTE_STATUSES[0]
}

/** Statuses that count as "open" (not yet decided) for dashboard counters. */
export const OPEN_QUOTE_STATUSES: QuoteStatus[] = ['concept', 'verstuurd', 'bekeken']

export async function fetchQuotes(): Promise<Quote[]> {
  const { data, error } = await getSupabase()
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Quote[]
}

export async function fetchQuote(id: string): Promise<{ quote: Quote; lines: QuoteLine[] } | null> {
  const supabase = getSupabase()
  const { data: quote, error } = await supabase.from('quotes').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  if (!quote) return null
  const { data: lines, error: lineErr } = await supabase
    .from('quote_lines')
    .select('*')
    .eq('quote_id', id)
    .order('position', { ascending: true })
  if (lineErr) throw lineErr
  return { quote: quote as Quote, lines: (lines ?? []) as QuoteLine[] }
}

export async function fetchQuotesForCustomer(customerId: string): Promise<Quote[]> {
  const { data, error } = await getSupabase()
    .from('quotes')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Quote[]
}

/** Inserts the lines for a quote (after clearing any existing ones). */
async function writeLines(quoteId: string, lines: LineDraft[]): Promise<void> {
  const supabase = getSupabase()
  const { error: delErr } = await supabase.from('quote_lines').delete().eq('quote_id', quoteId)
  if (delErr) throw delErr
  if (lines.length === 0) return
  const rows = lines.map((l, i) => ({
    quote_id: quoteId,
    position: i,
    description: l.description,
    quantity: l.quantity,
    unit_price: l.unit_price,
    vat_rate: l.vat_rate,
  }))
  const { error } = await supabase.from('quote_lines').insert(rows)
  if (error) throw error
}

export async function createQuote(draft: QuoteDraft): Promise<Quote> {
  const totals = computeTotals(draft.lines)
  const { data, error } = await getSupabase()
    .from('quotes')
    .insert({
      customer_id: draft.customer_id,
      issue_date: draft.issue_date,
      valid_until: draft.valid_until,
      notes: draft.notes,
      subtotal: totals.subtotal,
      vat_amount: totals.vatAmount,
      total: totals.total,
    })
    .select('*')
    .single()
  if (error) throw error
  const quote = data as Quote
  await writeLines(quote.id, draft.lines)
  return quote
}

export async function updateQuote(id: string, draft: QuoteDraft): Promise<void> {
  const totals = computeTotals(draft.lines)
  const { error } = await getSupabase()
    .from('quotes')
    .update({
      customer_id: draft.customer_id,
      issue_date: draft.issue_date,
      valid_until: draft.valid_until,
      notes: draft.notes,
      subtotal: totals.subtotal,
      vat_amount: totals.vatAmount,
      total: totals.total,
    })
    .eq('id', id)
  if (error) throw error
  await writeLines(id, draft.lines)
}

export async function setQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  const { error } = await getSupabase().from('quotes').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteQuote(id: string): Promise<void> {
  const { error } = await getSupabase().from('quotes').delete().eq('id', id)
  if (error) throw error
}

export async function countOpenQuotes(): Promise<number> {
  const { count, error } = await getSupabase()
    .from('quotes')
    .select('id', { count: 'exact', head: true })
    .in('status', OPEN_QUOTE_STATUSES)
  if (error) throw error
  return count ?? 0
}

/** The public, non-guessable URL for a quote's online view. */
export function publicQuoteUrl(token: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/offerte/${token}`
}
