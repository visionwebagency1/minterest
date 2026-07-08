import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QuoteDocument } from '@/components/QuoteDocument'
import {
  deleteQuote,
  fetchQuote,
  publicQuoteUrl,
  QUOTE_STATUSES,
  quoteStatusMeta,
  setQuoteStatus,
  type Quote,
  type QuoteLine,
  type QuoteStatus,
} from '../data/quotes'
import { fetchCustomer, type Customer } from '../data/customers'
import { fetchSettings, type CompanySettings } from '../data/settings'
import { createInvoiceFromQuote, fetchInvoiceForQuote, type Invoice } from '../data/invoices'
import { GhostButton, PrimaryButton } from '../components/form'
import { Card, ErrorNote, Spinner, StatusPill } from '../components/ui'

/** Manage a single quote: preview, send (online link), PDF, status, delete. */
export function AdminQuoteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [lines, setLines] = useState<QuoteLine[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [settings, setSettings] = useState<CompanySettings | null>(null)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    Promise.all([fetchQuote(id), fetchSettings(), fetchInvoiceForQuote(id)])
      .then(async ([res, s, inv]) => {
        if (!active) return
        if (!res) {
          setError('Offerte niet gevonden.')
          setLoading(false)
          return
        }
        setQuote(res.quote)
        setLines(res.lines)
        setSettings(s)
        setInvoice(inv)
        if (res.quote.customer_id) {
          const c = await fetchCustomer(res.quote.customer_id)
          if (active) setCustomer(c)
        }
        setLoading(false)
      })
      .catch((e) => {
        if (active) {
          setError(e?.message ?? 'Laden mislukt.')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [id])

  const changeStatus = async (status: QuoteStatus) => {
    if (!quote || status === quote.status) return
    setBusy(true)
    try {
      await setQuoteStatus(quote.id, status)
      setQuote({ ...quote, status })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Status bijwerken mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const send = async () => {
    if (!quote) return
    if (quote.status === 'concept') await changeStatus('verstuurd')
  }

  const copyLink = async () => {
    if (!quote) return
    try {
      await navigator.clipboard.writeText(publicQuoteUrl(quote.public_token))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked; the link is shown in full below */
    }
  }

  const makeInvoice = async () => {
    if (!quote || !settings) return
    setBusy(true)
    try {
      const inv = await createInvoiceFromQuote(quote.id, settings.invoice_due_days || 14)
      navigate(`/admin/facturen/${inv.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Factuur maken mislukt.')
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!quote) return
    if (!window.confirm(`Offerte ${quote.number} verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return
    setBusy(true)
    try {
      await deleteQuote(quote.id)
      navigate('/admin/offertes', { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verwijderen mislukt.')
      setBusy(false)
    }
  }

  if (loading) return <Spinner />
  if (error && !quote) return <ErrorNote message={error} />
  if (!quote || !settings) return null

  const meta = quoteStatusMeta(quote.status)
  const link = publicQuoteUrl(quote.public_token)

  return (
    <>
      <Link
        to="/admin/offertes"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug naar offertes
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-3xl">{quote.number}</h1>
          <StatusPill label={meta.label} tone={meta.tone} />
        </div>
        <Link to={`/admin/offertes/${quote.id}/bewerken`}>
          <GhostButton type="button">Bewerken</GhostButton>
        </Link>
      </div>

      {error && (
        <div className="mt-5">
          <ErrorNote message={error} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* document preview */}
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto bg-[#eef2f1] p-4 md:p-6">
            <QuoteDocument
              kind="Offerte"
              number={quote.number}
              issueDate={quote.issue_date}
              validUntil={quote.valid_until}
              notes={quote.notes}
              footer={settings.quote_footer}
              company={settings}
              customer={customer}
              lines={lines}
              subtotal={quote.subtotal}
              vatAmount={quote.vat_amount}
              total={quote.total}
              listTotal={quote.list_total}
            />
          </div>
        </Card>

        {/* actions */}
        <div className="flex flex-col gap-6">
          {/* delivery */}
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Versturen</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link to={`/admin/offertes/${quote.id}/print`} className="block [&>button]:w-full">
                <PrimaryButton type="button">PDF downloaden</PrimaryButton>
              </Link>

              {quote.status === 'concept' ? (
                <GhostButton type="button" onClick={send} disabled={busy}>
                  Markeer als verstuurd
                </GhostButton>
              ) : null}

              <button
                type="button"
                disabled
                title="Automatisch e-mailen via Resend volgt later"
                className="cursor-not-allowed rounded-xl border border-emerald-deep/12 px-5 py-2.5 font-sans text-sm font-semibold text-near-black/40"
              >
                E-mailen <span className="text-[11px] uppercase tracking-wide">binnenkort</span>
              </button>
            </div>

            {/* online link */}
            <div className="mt-4 border-t border-emerald-deep/8 pt-4">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Online offerte-link</p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-near-black/50">
                Deel deze link met de klant. Hij kan de offerte bekijken en goedkeuren of afwijzen.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                  className="min-w-0 flex-1 rounded-lg border border-emerald-deep/12 bg-[#f7faf9] px-2.5 py-2 font-sans text-xs text-near-black/70 outline-none"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="shrink-0 rounded-lg border border-emerald-deep/15 px-3 py-2 font-sans text-xs font-semibold text-emerald-deep transition-colors hover:border-emerald/50"
                >
                  {copied ? 'Gekopieerd' : 'Kopieer'}
                </button>
              </div>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-sans text-xs font-medium text-emerald-deep hover:underline"
              >
                Open de klantweergave →
              </a>
            </div>
          </Card>

          {/* status */}
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Status</p>
            <div className="mt-3 flex flex-col gap-2">
              {QUOTE_STATUSES.map((s) => {
                const active = quote.status === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    disabled={busy}
                    onClick={() => changeStatus(s.value)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 font-sans text-sm font-medium transition-colors disabled:opacity-60 ${
                      active ? 'border-emerald bg-emerald/10 text-emerald-deep' : 'border-emerald-deep/12 text-near-black/60 hover:border-emerald/40'
                    }`}
                  >
                    {s.label}
                    {active && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5 10 17 19 7" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* invoice */}
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Factuur</p>
            {invoice ? (
              <Link
                to={`/admin/facturen/${invoice.id}`}
                className="mt-3 block rounded-xl border border-emerald/30 bg-emerald/[0.06] px-4 py-2.5 font-sans text-sm font-medium text-emerald-deep transition-colors hover:border-emerald/50"
              >
                Bekijk factuur {invoice.number}
              </Link>
            ) : (
              <button
                type="button"
                onClick={makeInvoice}
                disabled={busy || quote.status !== 'geaccepteerd'}
                title={quote.status !== 'geaccepteerd' ? 'Beschikbaar zodra de offerte geaccepteerd is' : undefined}
                className="mt-3 w-full rounded-xl border border-emerald-deep/15 px-4 py-2.5 text-left font-sans text-sm font-medium text-near-black/75 transition-colors hover:border-emerald/40 hover:text-near-black disabled:cursor-not-allowed disabled:border-emerald-deep/12 disabled:text-near-black/40 disabled:hover:border-emerald-deep/12"
              >
                Maak factuur van deze offerte
              </button>
            )}
            {quote.status !== 'geaccepteerd' && !invoice && (
              <p className="mt-2 font-sans text-xs text-near-black/45">Kan zodra de offerte geaccepteerd is.</p>
            )}
          </Card>

          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="self-start font-sans text-sm font-medium text-red-500/80 transition-colors hover:text-red-600 disabled:opacity-50"
          >
            Offerte verwijderen
          </button>
        </div>
      </div>
    </>
  )
}
