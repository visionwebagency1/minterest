import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QuoteDocument } from '@/components/QuoteDocument'
import {
  deleteInvoice,
  fetchInvoice,
  INVOICE_STATUSES,
  invoiceStatusMeta,
  publicInvoiceUrl,
  setInvoiceStatus,
  type Invoice,
  type InvoiceLine,
  type InvoiceStatus,
} from '../data/invoices'
import { fetchCustomer, customerName, type Customer } from '../data/customers'
import { fetchSettings, type CompanySettings } from '../data/settings'
import { GhostButton, PrimaryButton } from '../components/form'
import { Card, ErrorNote, Spinner, StatusPill } from '../components/ui'
import { SendDocument } from '../components/SendDocument'
import { formatEUR } from '@/lib/money'

/** Manage a single invoice: preview, PDF, online link, status, delete. */
export function AdminInvoiceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [lines, setLines] = useState<InvoiceLine[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [settings, setSettings] = useState<CompanySettings | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    Promise.all([fetchInvoice(id), fetchSettings()])
      .then(async ([res, s]) => {
        if (!active) return
        if (!res) {
          setError('Factuur niet gevonden.')
          setLoading(false)
          return
        }
        setInvoice(res.invoice)
        setLines(res.lines)
        setSettings(s)
        if (res.invoice.customer_id) {
          const c = await fetchCustomer(res.invoice.customer_id)
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

  const changeStatus = async (status: InvoiceStatus) => {
    if (!invoice || status === invoice.status) return
    setBusy(true)
    try {
      await setInvoiceStatus(invoice.id, status)
      setInvoice({ ...invoice, status })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Status bijwerken mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const copyLink = async () => {
    if (!invoice) return
    try {
      await navigator.clipboard.writeText(publicInvoiceUrl(invoice.public_token))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked; the link is shown in full below */
    }
  }

  const handleDelete = async () => {
    if (!invoice) return
    if (!window.confirm(`Factuur ${invoice.number} verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return
    setBusy(true)
    try {
      await deleteInvoice(invoice.id)
      navigate('/admin/facturen', { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verwijderen mislukt.')
      setBusy(false)
    }
  }

  if (loading) return <Spinner />
  if (error && !invoice) return <ErrorNote message={error} />
  if (!invoice || !settings) return null

  const meta = invoiceStatusMeta(invoice.status)
  const link = publicInvoiceUrl(invoice.public_token)

  return (
    <>
      <Link
        to="/admin/facturen"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug naar facturen
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-3xl">{invoice.number}</h1>
          <StatusPill label={meta.label} tone={meta.tone} />
          {invoice.quote_id && (
            <Link to={`/admin/offertes/${invoice.quote_id}`} className="font-sans text-sm font-medium text-emerald-deep hover:underline">
              uit offerte
            </Link>
          )}
        </div>
        <Link to={`/admin/facturen/${invoice.id}/bewerken`}>
          <GhostButton type="button">Bewerken</GhostButton>
        </Link>
      </div>

      {error && (
        <div className="mt-5">
          <ErrorNote message={error} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto bg-[#eef2f1] p-4 md:p-6">
            <QuoteDocument
              kind="Factuur"
              number={invoice.number}
              issueDate={invoice.issue_date}
              dueDate={invoice.due_date}
              notes={invoice.notes}
              footer={settings.invoice_footer}
              company={settings}
              customer={customer}
              lines={lines}
              subtotal={invoice.subtotal}
              vatAmount={invoice.vat_amount}
              total={invoice.total}
              listTotal={invoice.list_total}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Versturen</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link to={`/admin/facturen/${invoice.id}/print`} className="block [&>button]:w-full">
                <PrimaryButton type="button">PDF downloaden</PrimaryButton>
              </Link>
              <SendDocument
                kind="factuur"
                number={invoice.number}
                link={link}
                amount={formatEUR(invoice.total)}
                defaultTo={customer?.email}
                greetingName={customer ? customerName(customer) : null}
                onSent={() => {
                  if (invoice.status === 'concept') changeStatus('verstuurd')
                }}
              />
            </div>

            <div className="mt-4 border-t border-emerald-deep/8 pt-4">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Online weergave</p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-near-black/50">
                Deel deze link met de klant om de factuur online te bekijken.
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
            </div>
          </Card>

          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Status</p>
            <div className="mt-3 flex flex-col gap-2">
              {INVOICE_STATUSES.map((s) => {
                const active = invoice.status === s.value
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

          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="self-start font-sans text-sm font-medium text-red-500/80 transition-colors hover:text-red-600 disabled:opacity-50"
          >
            Factuur verwijderen
          </button>
        </div>
      </div>
    </>
  )
}
