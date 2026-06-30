import { getSupabase } from '@/lib/supabase'
import { computeTotals } from '@/lib/money'
import { fetchQuote } from './quotes'

/**
 * Data access for invoices (facturen) and their lines. Mirrors quotes.ts: totals
 * are computed in the app and stored as a snapshot. Admin-only via RLS.
 */

export type InvoiceStatus = 'concept' | 'verstuurd' | 'betaald' | 'vervallen'

export type InvoiceLine = {
  id: string
  invoice_id: string
  position: number
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export type Invoice = {
  id: string
  created_at: string
  number: string
  customer_id: string | null
  quote_id: string | null
  status: InvoiceStatus
  issue_date: string
  due_date: string | null
  notes: string | null
  subtotal: number
  vat_amount: number
  total: number
  public_token: string
  paid_at: string | null
}

export type LineDraft = {
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export type InvoiceDraft = {
  customer_id: string | null
  quote_id?: string | null
  issue_date: string
  due_date: string | null
  notes: string | null
  lines: LineDraft[]
}

export const INVOICE_STATUSES: { value: InvoiceStatus; label: string; tone: string }[] = [
  { value: 'concept', label: 'Concept', tone: 'slate' },
  { value: 'verstuurd', label: 'Verstuurd', tone: 'emerald' },
  { value: 'betaald', label: 'Betaald', tone: 'green' },
  { value: 'vervallen', label: 'Vervallen', tone: 'red' },
]

export function invoiceStatusMeta(status: InvoiceStatus) {
  return INVOICE_STATUSES.find((s) => s.value === status) ?? INVOICE_STATUSES[0]
}

/** Statuses that count as outstanding (not yet paid) for the dashboard. */
export const OPEN_INVOICE_STATUSES: InvoiceStatus[] = ['concept', 'verstuurd', 'vervallen']

/** True when an unpaid invoice is past its due date (display hint only). */
export function isOverdue(inv: Pick<Invoice, 'status' | 'due_date'>): boolean {
  if (inv.status === 'betaald' || !inv.due_date) return false
  return new Date(inv.due_date) < new Date(new Date().toISOString().slice(0, 10))
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await getSupabase()
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Invoice[]
}

export async function fetchInvoice(id: string): Promise<{ invoice: Invoice; lines: InvoiceLine[] } | null> {
  const supabase = getSupabase()
  const { data: invoice, error } = await supabase.from('invoices').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  if (!invoice) return null
  const { data: lines, error: lineErr } = await supabase
    .from('invoice_lines')
    .select('*')
    .eq('invoice_id', id)
    .order('position', { ascending: true })
  if (lineErr) throw lineErr
  return { invoice: invoice as Invoice, lines: (lines ?? []) as InvoiceLine[] }
}

export async function fetchInvoicesForCustomer(customerId: string): Promise<Invoice[]> {
  const { data, error } = await getSupabase()
    .from('invoices')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Invoice[]
}

/** The invoice made from a given quote, if one exists (avoids duplicates). */
export async function fetchInvoiceForQuote(quoteId: string): Promise<Invoice | null> {
  const { data, error } = await getSupabase()
    .from('invoices')
    .select('*')
    .eq('quote_id', quoteId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return (data as Invoice) ?? null
}

async function writeLines(invoiceId: string, lines: LineDraft[]): Promise<void> {
  const supabase = getSupabase()
  const { error: delErr } = await supabase.from('invoice_lines').delete().eq('invoice_id', invoiceId)
  if (delErr) throw delErr
  if (lines.length === 0) return
  const rows = lines.map((l, i) => ({
    invoice_id: invoiceId,
    position: i,
    description: l.description,
    quantity: l.quantity,
    unit_price: l.unit_price,
    vat_rate: l.vat_rate,
  }))
  const { error } = await supabase.from('invoice_lines').insert(rows)
  if (error) throw error
}

export async function createInvoice(draft: InvoiceDraft): Promise<Invoice> {
  const totals = computeTotals(draft.lines)
  const { data, error } = await getSupabase()
    .from('invoices')
    .insert({
      customer_id: draft.customer_id,
      quote_id: draft.quote_id ?? null,
      issue_date: draft.issue_date,
      due_date: draft.due_date,
      notes: draft.notes,
      subtotal: totals.subtotal,
      vat_amount: totals.vatAmount,
      total: totals.total,
    })
    .select('*')
    .single()
  if (error) throw error
  const invoice = data as Invoice
  await writeLines(invoice.id, draft.lines)
  return invoice
}

export async function updateInvoice(id: string, draft: InvoiceDraft): Promise<void> {
  const totals = computeTotals(draft.lines)
  const { error } = await getSupabase()
    .from('invoices')
    .update({
      customer_id: draft.customer_id,
      issue_date: draft.issue_date,
      due_date: draft.due_date,
      notes: draft.notes,
      subtotal: totals.subtotal,
      vat_amount: totals.vatAmount,
      total: totals.total,
    })
    .eq('id', id)
  if (error) throw error
  await writeLines(id, draft.lines)
}

export async function setInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
  const patch: Record<string, unknown> = { status }
  patch.paid_at = status === 'betaald' ? new Date().toISOString() : null
  const { error } = await getSupabase().from('invoices').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await getSupabase().from('invoices').delete().eq('id', id)
  if (error) throw error
}

/** Turn an accepted quote into a draft invoice, copying customer + lines. */
export async function createInvoiceFromQuote(quoteId: string, dueDays: number): Promise<Invoice> {
  const existing = await fetchInvoiceForQuote(quoteId)
  if (existing) return existing
  const res = await fetchQuote(quoteId)
  if (!res) throw new Error('Offerte niet gevonden.')
  const today = new Date().toISOString().slice(0, 10)
  const due = new Date(today)
  due.setDate(due.getDate() + dueDays)
  return createInvoice({
    customer_id: res.quote.customer_id,
    quote_id: quoteId,
    issue_date: today,
    due_date: due.toISOString().slice(0, 10),
    notes: res.quote.notes,
    lines: res.lines.map((l) => ({
      description: l.description,
      quantity: Number(l.quantity),
      unit_price: Number(l.unit_price),
      vat_rate: Number(l.vat_rate),
    })),
  })
}

export async function countOpenInvoices(): Promise<number> {
  const { count, error } = await getSupabase()
    .from('invoices')
    .select('id', { count: 'exact', head: true })
    .in('status', OPEN_INVOICE_STATUSES)
  if (error) throw error
  return count ?? 0
}

export function publicInvoiceUrl(token: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/factuur/${token}`
}
