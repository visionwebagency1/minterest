import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { customerName, fetchCustomers, type Customer } from '../data/customers'
import { formatDate } from '../lib/format'
import { PrimaryButton } from '../components/form'
import { Card, EmptyState, ErrorNote, PageHeading, Spinner } from '../components/ui'

/** Klanten: the customer book, searchable, with a button to add a new customer. */
export function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true
    fetchCustomers()
      .then((rows) => active && setCustomers(rows))
      .catch((e) => active && setError(e?.message ?? 'Kon de klanten niet laden.'))
    return () => {
      active = false
    }
  }, [])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return customers ?? []
    return (customers ?? []).filter((c) =>
      [c.company_name, c.contact_name, c.email, c.phone]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q)),
    )
  }, [customers, query])

  return (
    <>
      <PageHeading
        kicker="Klanten"
        title="Klanten"
        actions={
          <Link to="/admin/klanten/nieuw">
            <PrimaryButton type="button">
              <span className="text-base leading-none">+</span> Nieuwe klant
            </PrimaryButton>
          </Link>
        }
      />

      {customers && customers.length > 0 && (
        <div className="mb-5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op naam, e-mail of telefoon"
            className="w-full max-w-sm rounded-xl border border-emerald-deep/15 bg-white px-4 py-2.5 font-sans text-sm text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-emerald"
          />
        </div>
      )}

      {error && <ErrorNote message={error} />}
      {!customers && !error && <Spinner />}

      {customers && customers.length === 0 && (
        <EmptyState
          title="Nog geen klanten"
          hint="Maak een klant aan met de knop rechtsboven, of zet een aanvraag in de inbox om in een klant."
        />
      )}

      {customers && customers.length > 0 && shown.length === 0 && (
        <EmptyState title="Geen resultaten" hint="Geen klant gevonden voor deze zoekopdracht." />
      )}

      {shown.length > 0 && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {shown.map((c) => (
            <Link
              key={c.id}
              to={`/admin/klanten/${c.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald/12 font-display text-sm font-semibold text-emerald-deep" aria-hidden>
                {customerName(c).charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-sm font-semibold text-near-black">{customerName(c)}</p>
                <p className="truncate font-sans text-sm text-near-black/55">
                  {c.contact_name && c.company_name ? `${c.contact_name} · ` : ''}
                  {c.email || c.phone || 'Geen contactgegevens'}
                </p>
              </div>
              <span className="hidden shrink-0 font-sans text-xs text-near-black/40 sm:block">
                Sinds {formatDate(c.created_at)}
              </span>
            </Link>
          ))}
        </Card>
      )}
    </>
  )
}
