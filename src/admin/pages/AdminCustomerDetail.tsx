import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  customerName,
  deleteCustomer,
  fetchCustomer,
  fetchLeadsForCustomer,
  type Customer,
} from '../data/customers'
import { leadSourceLabel, leadStatusMeta, type Lead } from '../data/leads'
import { fetchQuotesForCustomer, quoteStatusMeta, type Quote } from '../data/quotes'
import { fetchInvoicesForCustomer, invoiceStatusMeta, type Invoice } from '../data/invoices'
import { formatEUR } from '@/lib/money'
import { formatDate, timeAgo } from '../lib/format'
import { GhostButton, PrimaryButton } from '../components/form'
import { Card, ErrorNote, Spinner, StatusPill } from '../components/ui'

/** Customer detail: contact data, plus history of requests, quotes and invoices. */
export function AdminCustomerDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    Promise.all([
      fetchCustomer(id),
      fetchLeadsForCustomer(id),
      fetchQuotesForCustomer(id),
      fetchInvoicesForCustomer(id),
    ])
      .then(([c, ls, qs, invs]) => {
        if (!active) return
        if (!c) setError('Klant niet gevonden.')
        setCustomer(c)
        setLeads(ls)
        setQuotes(qs)
        setInvoices(invs)
        setLoading(false)
      })
      .catch((e) => {
        if (active) {
          setError(e?.message ?? 'Kon de klant niet laden.')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [id])

  const handleDelete = async () => {
    if (!customer) return
    if (!window.confirm(`Klant "${customerName(customer)}" verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
      return
    }
    setDeleting(true)
    try {
      await deleteCustomer(customer.id)
      navigate('/admin/klanten', { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verwijderen mislukt.')
      setDeleting(false)
    }
  }

  if (loading) return <Spinner />
  if (error && !customer) return <ErrorNote message={error} />
  if (!customer) return null

  return (
    <>
      <Link
        to="/admin/klanten"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug naar klanten
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-3xl">
            {customerName(customer)}
          </h1>
          <p className="mt-1.5 font-sans text-sm text-near-black/50">Klant sinds {formatDate(customer.created_at)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to={`/admin/klanten/${customer.id}/bewerken`}>
            <GhostButton type="button">Bewerken</GhostButton>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-5">
          <ErrorNote message={error} />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* left: history */}
        <div className="flex flex-col gap-6">
          <Section title="Aanvragen" count={leads.length}>
            {leads.length === 0 ? (
              <p className="px-5 py-6 font-sans text-sm text-near-black/50">
                Nog geen aanvragen gekoppeld aan deze klant.
              </p>
            ) : (
              <div className="divide-y divide-emerald-deep/8">
                {leads.map((lead) => {
                  const meta = leadStatusMeta(lead.status)
                  return (
                    <Link
                      key={lead.id}
                      to={`/admin/inbox/${lead.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-emerald-deep/[0.03]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-sm font-semibold text-near-black">
                          {leadSourceLabel(lead.source)}
                        </p>
                        <p className="truncate font-sans text-xs text-near-black/50">
                          {lead.message || timeAgo(lead.created_at)}
                        </p>
                      </div>
                      <StatusPill label={meta.label} tone={meta.tone} />
                    </Link>
                  )
                })}
              </div>
            )}
          </Section>

          <Section
            title="Offertes"
            count={quotes.length}
            action={
              <Link to="/admin/offertes/nieuw" state={{ customerId: customer.id }}>
                <PrimaryButton type="button">+ Nieuwe offerte</PrimaryButton>
              </Link>
            }
          >
            {quotes.length === 0 ? (
              <p className="px-5 py-6 font-sans text-sm text-near-black/50">Nog geen offertes voor deze klant.</p>
            ) : (
              <div className="divide-y divide-emerald-deep/8">
                {quotes.map((q) => {
                  const meta = quoteStatusMeta(q.status)
                  return (
                    <Link
                      key={q.id}
                      to={`/admin/offertes/${q.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-emerald-deep/[0.03]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-sm font-semibold text-near-black">{q.number}</p>
                        <p className="font-sans text-xs text-near-black/50">{formatDate(q.issue_date)}</p>
                      </div>
                      <span className="font-sans text-sm font-semibold tabular-nums text-near-black">{formatEUR(q.total)}</span>
                      <StatusPill label={meta.label} tone={meta.tone} />
                    </Link>
                  )
                })}
              </div>
            )}
          </Section>
          <Section
            title="Facturen"
            count={invoices.length}
            action={
              <Link to="/admin/facturen/nieuw" state={{ customerId: customer.id }}>
                <PrimaryButton type="button">+ Nieuwe factuur</PrimaryButton>
              </Link>
            }
          >
            {invoices.length === 0 ? (
              <p className="px-5 py-6 font-sans text-sm text-near-black/50">Nog geen facturen voor deze klant.</p>
            ) : (
              <div className="divide-y divide-emerald-deep/8">
                {invoices.map((inv) => {
                  const meta = invoiceStatusMeta(inv.status)
                  return (
                    <Link
                      key={inv.id}
                      to={`/admin/facturen/${inv.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-emerald-deep/[0.03]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-sm font-semibold text-near-black">{inv.number}</p>
                        <p className="font-sans text-xs text-near-black/50">{formatDate(inv.issue_date)}</p>
                      </div>
                      <span className="font-sans text-sm font-semibold tabular-nums text-near-black">{formatEUR(inv.total)}</span>
                      <StatusPill label={meta.label} tone={meta.tone} />
                    </Link>
                  )
                })}
              </div>
            )}
          </Section>
        </div>

        {/* right: details */}
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Gegevens</p>
            <dl className="mt-3 flex flex-col gap-3">
              <Detail label="Bedrijfsnaam" value={customer.company_name} />
              <Detail label="Contactpersoon" value={customer.contact_name} />
              <Detail label="E-mail" value={customer.email} href={customer.email ? `mailto:${customer.email}` : undefined} />
              <Detail label="Telefoon" value={customer.phone} href={customer.phone ? `tel:${customer.phone}` : undefined} />
              <Detail label="Adres" value={customer.address} multiline />
              <Detail label="KvK" value={customer.kvk} />
              <Detail label="BTW" value={customer.vat} />
            </dl>
          </Card>

          {customer.notes && (
            <Card className="p-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Notities</p>
              <p className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-near-black/75">
                {customer.notes}
              </p>
            </Card>
          )}

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="self-start font-sans text-sm font-medium text-red-500/80 transition-colors hover:text-red-600 disabled:opacity-50"
          >
            {deleting ? 'Verwijderen…' : 'Klant verwijderen'}
          </button>
        </div>
      </div>
    </>
  )
}

function Section({
  title,
  count,
  upcoming,
  note,
  action,
  children,
}: {
  title: string
  count?: number
  upcoming?: boolean
  note?: string
  action?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-emerald-deep/8 px-5 py-3">
        <h2 className="font-display text-base font-semibold text-near-black">
          {title}
          {typeof count === 'number' && <span className="ml-2 text-near-black/35">{count}</span>}
        </h2>
        {action}
        {upcoming && (
          <span className="rounded-full bg-emerald-deep/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-near-black/35">
            binnenkort
          </span>
        )}
      </div>
      {upcoming ? <p className="px-5 py-6 font-sans text-sm text-near-black/45">{note}</p> : children}
    </Card>
  )
}

function Detail({
  label,
  value,
  href,
  multiline,
}: {
  label: string
  value: string | null
  href?: string
  multiline?: boolean
}) {
  return (
    <div>
      <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">{label}</dt>
      <dd className={`mt-0.5 font-sans text-sm text-near-black/80 ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value ? (
          href ? (
            <a href={href} className="text-emerald-deep underline-offset-2 hover:underline">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          <span className="text-near-black/30">-</span>
        )}
      </dd>
    </div>
  )
}
