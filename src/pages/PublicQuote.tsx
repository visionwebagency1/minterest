import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuoteDocument } from '@/components/QuoteDocument'
import { getPublicQuote, respondToQuote, type PublicQuote as PublicQuoteData } from '@/lib/publicQuote'

/**
 * Public online quote page (/offerte/:token). The customer views the branded
 * quote and approves or rejects it. No login, no marketing chrome. Data comes
 * in through token-keyed RPCs only.
 */
type Phase = 'loading' | 'ready' | 'notfound' | 'error'

const DECIDED = ['geaccepteerd', 'afgewezen']

export function PublicQuote() {
  const { token } = useParams<{ token: string }>()
  const [phase, setPhase] = useState<Phase>('loading')
  const [quote, setQuote] = useState<PublicQuoteData | null>(null)
  const [working, setWorking] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let active = true
    getPublicQuote(token)
      .then((q) => {
        if (!active) return
        if (!q) setPhase('notfound')
        else {
          setQuote(q)
          setPhase('ready')
        }
      })
      .catch(() => active && setPhase('error'))
    return () => {
      active = false
    }
  }, [token])

  const respond = async (decision: 'accept' | 'reject') => {
    if (!token || !quote) return
    setWorking(true)
    setActionError(null)
    try {
      const status = await respondToQuote(token, decision)
      setQuote({ ...quote, status })
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Er ging iets mis.')
    } finally {
      setWorking(false)
    }
  }

  if (phase === 'loading') {
    return (
      <Centered>
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald" aria-label="Laden" />
      </Centered>
    )
  }

  if (phase === 'notfound' || !quote) {
    return (
      <Centered>
        <div className="text-center">
          <p className="font-display text-xl font-semibold text-near-black">Offerte niet gevonden</p>
          <p className="mt-2 font-sans text-sm text-near-black/55">
            Deze link is mogelijk verlopen of onjuist. Neem contact op met Minterest.
          </p>
        </div>
      </Centered>
    )
  }

  if (phase === 'error') {
    return (
      <Centered>
        <p className="font-sans text-sm text-near-black/60">Er ging iets mis bij het laden. Probeer het later opnieuw.</p>
      </Centered>
    )
  }

  const decided = DECIDED.includes(quote.status)

  return (
    <div className="min-h-screen bg-[#eef2f1] py-6 md:py-12">
      <div className="mx-auto max-w-[860px] px-3 md:px-6">
        {/* decision bar */}
        {!decided ? (
          <div className="mb-5 flex flex-col items-center gap-4 rounded-2xl border border-emerald-deep/10 bg-white p-5 text-center shadow-[0_12px_40px_rgba(1,63,64,0.06)] sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-base font-semibold text-near-black">Wat wil je met deze offerte?</p>
              <p className="font-sans text-sm text-near-black/55">Je keuze wordt direct doorgegeven aan Minterest.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => respond('reject')}
                disabled={working}
                className="rounded-xl border border-emerald-deep/15 px-5 py-2.5 font-sans text-sm font-semibold text-near-black/70 transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-60"
              >
                Afwijzen
              </button>
              <button
                type="button"
                onClick={() => respond('accept')}
                disabled={working}
                className="rounded-xl bg-gradient-to-r from-emerald to-mint px-6 py-2.5 font-sans text-sm font-semibold text-near-black shadow-md shadow-emerald/25 transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {working ? 'Bezig…' : 'Goedkeuren'}
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`mb-5 rounded-2xl border p-5 text-center font-sans text-sm font-semibold shadow-[0_12px_40px_rgba(1,63,64,0.06)] ${
              quote.status === 'geaccepteerd'
                ? 'border-emerald/30 bg-emerald/[0.07] text-emerald-deep'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {quote.status === 'geaccepteerd'
              ? 'Bedankt! Je hebt deze offerte goedgekeurd. We nemen snel contact met je op.'
              : 'Je hebt deze offerte afgewezen. Vragen? Neem gerust contact met ons op.'}
          </div>
        )}

        {actionError && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center font-sans text-sm text-red-700">
            {actionError}
          </div>
        )}

        <div className="shadow-[0_18px_50px_rgba(1,63,64,0.12)]">
          <QuoteDocument
            kind="Offerte"
            number={quote.number}
            issueDate={quote.issue_date}
            validUntil={quote.valid_until}
            notes={quote.notes}
            footer={quote.company.quote_footer}
            company={quote.company}
            customer={quote.customer}
            lines={quote.lines}
            subtotal={quote.subtotal}
            vatAmount={quote.vat_amount}
            total={quote.total}
            listTotal={quote.list_total}
          />
        </div>
      </div>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-[#eef2f1] px-6">{children}</div>
}
