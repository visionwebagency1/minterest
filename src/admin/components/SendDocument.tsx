import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'

/**
 * "E-mailen" control for a quote or invoice. Opens an inline form where the admin
 * can send the document (as a branded e-mail with a button to the online view) to
 * one or more addresses. Calls the /api/send-document serverless function with
 * the admin's Supabase access token so only a logged-in admin can send.
 */

type Props = {
  kind: 'offerte' | 'factuur'
  number: string
  link: string
  amount?: string
  defaultTo?: string | null
  greetingName?: string | null
  /** Called after at least one e-mail went out (e.g. to bump the status). */
  onSent?: () => void
}

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-3 py-2.5 font-sans text-sm text-near-black outline-none focus:border-emerald'

export function SendDocument({ kind, number, link, amount, defaultTo, greetingName, onSent }: Props) {
  const [open, setOpen] = useState(false)
  const [to, setTo] = useState(defaultTo ?? '')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string[] | null>(null)

  const send = async () => {
    setSending(true)
    setError(null)
    try {
      const { data } = await getSupabase().auth.getSession()
      const token = data.session?.access_token
      if (!token) throw new Error('Je sessie is verlopen. Log opnieuw in.')

      const res = await fetch('/api/send-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind, number, link, amount, greetingName, to, message: message.trim() || null }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) {
        throw new Error(json?.error || 'Versturen mislukt. Controleer de adressen en probeer opnieuw.')
      }
      setSentTo(json.sent as string[])
      onSent?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Versturen mislukt.')
    } finally {
      setSending(false)
    }
  }

  if (sentTo) {
    return (
      <div className="rounded-xl border border-emerald/30 bg-emerald/[0.06] px-4 py-3 font-sans text-sm text-emerald-deep">
        Verzonden naar {sentTo.join(', ')}.
        <button
          type="button"
          onClick={() => {
            setSentTo(null)
            setOpen(false)
            setMessage('')
          }}
          className="ml-2 font-semibold underline underline-offset-2"
        >
          Opnieuw versturen
        </button>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-deep/15 px-5 py-2.5 font-sans text-sm font-semibold text-emerald-deep transition-colors hover:border-emerald/50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16v12H4z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
        E-mailen
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-emerald-deep/12 bg-[#f7faf9] p-4">
      <label className="block">
        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/45">Aan</span>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="klant@bedrijf.nl, tweede@bedrijf.nl"
          className={`mt-1.5 ${field}`}
        />
        <span className="mt-1 block font-sans text-xs text-near-black/45">Meerdere adressen scheiden met een komma.</span>
      </label>
      <label className="mt-3 block">
        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/45">Bericht (optioneel)</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Persoonlijk bericht boven de knop. Leeg laten voor de standaardtekst."
          className={`mt-1.5 min-h-[5rem] resize-none ${field}`}
        />
      </label>

      {error && <p className="mt-2 font-sans text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={send}
          disabled={sending || to.trim() === ''}
          className="rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-sm shadow-emerald/20 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {sending ? 'Versturen…' : 'Verstuur'}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setError(null)
          }}
          disabled={sending}
          className="rounded-xl border border-emerald-deep/15 px-4 py-2.5 font-sans text-sm font-semibold text-near-black/60 transition-colors hover:border-emerald/40 disabled:opacity-60"
        >
          Annuleren
        </button>
      </div>
    </div>
  )
}
