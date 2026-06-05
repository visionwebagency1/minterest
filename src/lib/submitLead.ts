/**
 * Backend-agnostic lead submission.
 *
 * Point VITE_FORM_ENDPOINT at any JSON-accepting endpoint (Formspree, Web3Forms,
 * a serverless function, your own API). Until that env var is set, submissions are
 * simulated so the UI flow works end-to-end in development.
 */

export type LeadPayload = Record<string, unknown>

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

export async function submitLead(formType: string, data: LeadPayload): Promise<void> {
  const payload = {
    formType,
    ...data,
    _page: typeof window !== 'undefined' ? window.location.href : undefined,
    _submittedAt: new Date().toISOString(),
  }

  // No backend wired yet — simulate a network round-trip so loading/success states flow.
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[lead] no VITE_FORM_ENDPOINT set — would submit:', payload)
    }
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Versturen mislukt (${res.status}). Probeer het opnieuw of mail ons direct.`)
  }
}
