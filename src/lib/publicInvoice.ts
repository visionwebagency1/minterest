/**
 * Public (anon) read-only access to a single invoice via its non-guessable
 * token. Uses a SECURITY DEFINER RPC and plain `fetch` only, so the public
 * bundle never imports the Supabase client (see CLAUDE.md).
 */
import type { DocLine, DocParty } from '@/components/QuoteDocument'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/env'

export type PublicInvoice = {
  number: string
  status: string
  issue_date: string | null
  due_date: string | null
  notes: string | null
  subtotal: number
  vat_amount: number
  total: number
  customer: DocParty | null
  company: DocParty & { invoice_footer?: string | null }
  lines: DocLine[]
}

export async function getPublicInvoice(token: string): Promise<PublicInvoice | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Niet beschikbaar.')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_invoice`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_token: token }),
  })
  if (!res.ok) throw new Error('Kon de factuur niet laden.')
  return (await res.json()) as PublicInvoice | null
}
