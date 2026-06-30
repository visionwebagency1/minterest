import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatEUR } from '@/lib/money'
import { fetchQuotes, quoteStatusMeta, type Quote, type QuoteStatus } from '../data/quotes'
import { customerName, fetchCustomers, type Customer } from '../data/customers'
import { formatDate } from '../lib/format'
import { PrimaryButton } from '../components/form'
import { Card, EmptyState, ErrorNote, PageHeading, Spinner, StatusPill } from '../components/ui'

/** Offertes overview: every quote with its number, customer, total and status. */
type Filter = 'alle' | QuoteStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'concept', label: 'Concept' },
  { value: 'verstuurd', label: 'Verstuurd' },
  { value: 'geaccepteerd', label: 'Geaccepteerd' },
  { value: 'afgewezen', label: 'Afgewezen' },
]

export function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[] | null>(null)
  const [customers, setCustomers] = useState<Record<string, Customer>>({})
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('alle')

  useEffect(() => {
    let active = true
    Promise.all([fetchQuotes(), fetchCustomers()])
      .then(([qs, cs]) => {
        if (!active) return
        setQuotes(qs)
        setCustomers(Object.fromEntries(cs.map((c) => [c.id, c])))
      })
      .catch((e) => active && setError(e?.message ?? 'Kon de offertes niet laden.'))
    return () => {
      active = false
    }
  }, [])

  const shown = useMemo(
    () => (quotes ?? []).filter((q) => filter === 'alle' || q.status === filter),
    [quotes, filter],
  )

  const nameFor = (q: Quote) => (q.customer_id && customers[q.customer_id] ? customerName(customers[q.customer_id]) : 'Geen klant')

  return (
    <>
      <PageHeading
        kicker="Offertes"
        title="Offertes"
        actions={
          <Link to="/admin/offertes/nieuw">
            <PrimaryButton type="button">
              <span className="text-base leading-none">+</span> Nieuwe offerte
            </PrimaryButton>
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value
          const n = f.value === 'alle' ? quotes?.length ?? 0 : (quotes ?? []).filter((q) => q.status === f.value).length
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
              {quotes && <span className="ml-1.5 text-near-black/35">{n}</span>}
            </button>
          )
        })}
      </div>

      {error && <ErrorNote message={error} />}
      {!quotes && !error && <Spinner />}

      {quotes && shown.length === 0 && (
        <EmptyState
          title={quotes.length === 0 ? 'Nog geen offertes' : 'Geen offertes in dit filter'}
          hint={quotes.length === 0 ? 'Maak je eerste offerte met de knop rechtsboven.' : undefined}
        />
      )}

      {shown.length > 0 && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {shown.map((q) => {
            const meta = quoteStatusMeta(q.status)
            return (
              <Link
                key={q.id}
                to={`/admin/offertes/${q.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-sm font-semibold text-near-black">{q.number}</p>
                    <StatusPill label={meta.label} tone={meta.tone} />
                  </div>
                  <p className="mt-0.5 truncate font-sans text-sm text-near-black/55">{nameFor(q)}</p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="font-sans text-sm font-semibold tabular-nums text-near-black">{formatEUR(q.total)}</p>
                  <p className="font-sans text-xs text-near-black/40">{formatDate(q.issue_date)}</p>
                </div>
              </Link>
            )
          })}
        </Card>
      )}
    </>
  )
}
