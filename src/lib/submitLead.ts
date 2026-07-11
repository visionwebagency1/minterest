/**
 * Lead submission for the public site.
 *
 * Requests are saved straight into Supabase (the `leads` table) through the
 * PostgREST endpoint, using only `fetch` and the anon key. We deliberately do
 * NOT import `@supabase/supabase-js` here, so the public marketing bundle stays
 * free of the Supabase client (see src/lib/supabase.ts and CLAUDE.md). Row Level
 * Security only lets the anon key insert a fresh "nieuw" lead, nothing else.
 *
 * Fallbacks: if Supabase is not configured we use VITE_FORM_ENDPOINT (any
 * JSON-accepting endpoint), and if neither is set the submit is simulated so the
 * UI flow keeps working in development.
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

export type LeadPayload = Record<string, unknown>

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const toArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(String) : []

const text = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() !== '' ? value.trim() : null

/** Maps a form payload onto a row of the `leads` table. */
function toLeadRow(formType: string, data: LeadPayload) {
  return {
    source: formType,
    name: text(data.name),
    email: text(data.email),
    company: text(data.company),
    website_url: text(data.url),
    interest: toArray(data.interest).length ? toArray(data.interest) : toArray(data.services),
    budget: text(data.budget),
    timeline: text(data.timeline),
    message: text(data.message),
    page: typeof window !== 'undefined' ? window.location.href : null,
    raw: data,
  }
}

async function saveToSupabase(formType: string, data: LeadPayload): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY as string,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(toLeadRow(formType, data)),
  })

  if (!res.ok) {
    throw new Error('Versturen mislukt. Probeer het opnieuw of mail ons direct.')
  }
}

async function postToEndpoint(formType: string, data: LeadPayload): Promise<void> {
  const res = await fetch(ENDPOINT as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      formType,
      ...data,
      _page: typeof window !== 'undefined' ? window.location.href : undefined,
      _submittedAt: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    throw new Error(`Versturen mislukt (${res.status}). Probeer het opnieuw of mail ons direct.`)
  }
}

/**
 * Fire the confirmation emails (customer + Minterest) via the serverless
 * function. Best-effort: the lead is already saved, so a mail hiccup or a local
 * dev run without the /api function must never fail the submit.
 */
export async function sendLeadEmails(formType: string, data: LeadPayload): Promise<void> {
  try {
    await fetch('/api/lead-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType,
        data: { ...data, page: typeof window !== 'undefined' ? window.location.href : null },
      }),
    })
  } catch {
    /* email is a nice-to-have on top of the saved lead; ignore failures */
  }
}

export async function submitLead(formType: string, data: LeadPayload): Promise<void> {
  // Primary path: store the request in the database (admin inbox reads it there).
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    await saveToSupabase(formType, data)
    await sendLeadEmails(formType, data)
    return
  }

  // Backend-agnostic fallback for setups without Supabase.
  if (ENDPOINT) {
    await postToEndpoint(formType, data)
    await sendLeadEmails(formType, data)
    return
  }

  // Nothing wired yet — simulate a round-trip so loading/success states flow.
  await new Promise((resolve) => setTimeout(resolve, 700))
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[lead] no backend configured — would submit:', { formType, ...data })
  }
}
