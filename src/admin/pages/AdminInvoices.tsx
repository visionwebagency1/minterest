import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatEUR } from '@/lib/money'
import { fetchInvoices, invoiceStatusMeta, isOverdue, type Invoice, type InvoiceStatus } from '../data/invoices'
import { customerName, fetchCustomers, type Customer } from '../data/customers'
import { formatDate } from '../lib/format'
import { PrimaryButton } from '../components/form'
import { Card, EmptyState, ErrorNote, PageHeading, Spinner, StatusPill } from '../components/ui'

/** Facturen overview: number, customer, total, status, with an outstanding sum. */
type Filter = 'alle' | InvoiceStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'concept', label: 'Concept' },
  { value: 'verstuurd', label: 'Verstuurd' },
  { value: 'betaald', label: 'Betaald' },
  { value: 'vervallen', label: 'Vervallen' },
]

export function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null)
  const [customers, setCustomers] = useState<Record<string, Customer>>({})
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('alle')

  useEffect(() => {
    let active = true
    Promise.all([fetchInvoices(), fetchCustomers()])
      .then(([inv, cs]) => {
        if (!active) return
        setInvoices(inv)
        setCustomers(Object.fromEntries(cs.map((c) => [c.id, c])))
      })
      .catch((e) => active && setError(e?.message ?? 'Kon de facturen niet laden.'))
    return () => {
      active = false
    }
  }, [])

  const shown = useMemo(
    () => (invoices ?? []).filter((q) => filter === 'alle' || q.status === filter),
    [invoices, filter],
  )

  const outstanding = useMemo(
    () => (invoices ?? []).filter((i) => i.status !== 'betaald').reduce((sum, i) => sum + Number(i.total), 0),
    [invoices],
  )

  const nameFor = (inv: Invoice) =>
    inv.customer_id && customers[inv.customer_id] ? customerName(customers[inv.customer_id]) : 'Geen klant'

  return (
    <>
      <PageHeading
        kicker="Facturen"
        title="Facturen"
        actions={
          <Link to="/admin/facturen/nieuw">
            <PrimaryButton type="button">
              <span className="text-base leading-none">+</span> Nieuwe factuur
            </PrimaryButton>
          </Link>
        }
      />

      {invoices && invoices.length > 0 && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-emerald-deep/10 bg-white px-4 py-2.5">
          <span className="font-sans text-sm text-near-black/55">Openstaand</span>
          <span className="font-display text-lg font-semibold text-near-black tabular-nums">{formatEUR(outstanding)}</span>
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value
          const n = f.value === 'alle' ? invoices?.length ?? 0 : (invoices ?? []).filter((q) => q.status === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
                active ? 'border-emerald bg-emerald/10 text-emerald-deep' : 'border-emerald-deep/12 text-near-black/60 hover:border-emerald/40'
              }`}
            >
              {f.label}
              {invoices && <span className="ml-1.5 text-near-black/35">{n}</span>}
            </button>
          )
        })}
      </div>

      {error && <ErrorNote message={error} />}
      {!invoices && !error && <Spinner />}

      {invoices && shown.length === 0 && (
        <EmptyState
          title={invoices.length === 0 ? 'Nog geen facturen' : 'Geen facturen in dit filter'}
          hint={invoices.length === 0 ? 'Maak een factuur, of zet een geaccepteerde offerte met een klik om.' : undefined}
        />
      )}

      {shown.length > 0 && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {shown.map((inv) => {
            const meta = invoiceStatusMeta(inv.status)
            const overdue = isOverdue(inv)
            return (
              <Link
                key={inv.id}
                to={`/admin/facturen/${inv.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-sm font-semibold text-near-black">{inv.number}</p>
                    <StatusPill label={overdue && inv.status !== 'betaald' ? 'Vervallen' : meta.label} tone={overdue && inv.status !== 'betaald' ? 'red' : meta.tone} />
                  </div>
                  <p className="mt-0.5 truncate font-sans text-sm text-near-black/55">{nameFor(inv)}</p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="font-sans text-sm font-semibold tabular-nums text-near-black">{formatEUR(inv.total)}</p>
                  <p className="font-sans text-xs text-near-black/40">Vervalt {formatDate(inv.due_date)}</p>
                </div>
              </Link>
            )
          })}
        </Card>
      )}
    </>
  )
}
