/**
 * Public (anon) access to a single quote via its non-guessable token. Talks to
 * Supabase only through two SECURITY DEFINER RPCs and plain `fetch`, so the
 * public bundle never imports the Supabase client (see CLAUDE.md).
 */
import type { DocLine, DocParty } from '@/components/QuoteDocument'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/env'

export type PublicQuote = {
  number: string
  status: string
  issue_date: string | null
  valid_until: string | null
  notes: string | null
  subtotal: number
  vat_amount: number
  total: number
  list_total: number | null
  signature: string | null
  signed_name: string | null
  responded_at: string | null
  customer: DocParty | null
  company: DocParty & { quote_footer?: string | null }
  lines: DocLine[]
}

function headers() {
  return {
    apikey: SUPABASE_ANON_KEY as string,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function getPublicQuote(token: string): Promise<PublicQuote | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Niet beschikbaar.')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_quote`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ p_token: token }),
  })
  if (!res.ok) throw new Error('Kon de offerte niet laden.')
  return (await res.json()) as PublicQuote | null
}

/** Returns the new status ("geaccepteerd" | "afgewezen" | unchanged). */
export async function respondToQuote(token: string, decision: 'accept' | 'reject'): Promise<string> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Niet beschikbaar.')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/respond_to_quote`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ p_token: token, p_decision: decision }),
  })
  if (!res.ok) throw new Error('Kon je keuze niet verwerken. Probeer het opnieuw.')
  return (await res.json()) as string
}

/**
 * Approve a quote WITH a signature. Stores the signature (PNG data URL) and the
 * typed name, and sets the status to "geaccepteerd". Returns the new status.
 */
export async function signAndAcceptQuote(
  token: string,
  signature: string,
  signedName: string,
): Promise<string> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Niet beschikbaar.')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/sign_and_accept_quote`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ p_token: token, p_signature: signature, p_signed_name: signedName }),
  })
  if (!res.ok) throw new Error('Kon je goedkeuring niet verwerken. Probeer het opnieuw.')
  return (await res.json()) as string
}
