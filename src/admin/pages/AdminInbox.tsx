import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchLeads,
  leadSourceLabel,
  leadStatusMeta,
  type Lead,
  type LeadStatus,
} from '../data/leads'
import { timeAgo } from '../lib/format'
import { Card, EmptyState, ErrorNote, PageHeading, Spinner, StatusPill } from '../components/ui'

/** Inbox: every request from the public site, newest first, filterable by status. */
type Filter = 'alle' | LeadStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'nieuw', label: 'Nieuw' },
  { value: 'in_behandeling', label: 'In behandeling' },
  { value: 'afgehandeld', label: 'Afgehandeld' },
]

export function AdminInbox() {
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('alle')

  useEffect(() => {
    let active = true
    fetchLeads()
      .then((rows) => active && setLeads(rows))
      .catch((e) => active && setError(e?.message ?? 'Kon de aanvragen niet laden.'))
    return () => {
      active = false
    }
  }, [])

  const shown = useMemo(
    () => (leads ?? []).filter((l) => filter === 'alle' || l.status === filter),
    [leads, filter],
  )

  return (
    <>
      <PageHeading kicker="Aanvragen" title="Inbox" />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value
          const n =
            f.value === 'alle'
              ? leads?.length ?? 0
              : (leads ?? []).filter((l) => l.status === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
                active
                  ? 'border-emerald bg-emerald/10 text-emerald-deep'
                  : 'border-emerald-deep/12 text-near-black/60 hover:border-emerald/40'
              }`}
            >
              {f.label}
              {leads && <span className="ml-1.5 text-near-black/35">{n}</span>}
            </button>
          )
        })}
      </div>

      {error && <ErrorNote message={error} />}
      {!leads && !error && <Spinner />}

      {leads && !error && shown.length === 0 && (
        <EmptyState
          title="Nog geen aanvragen hier"
          hint="Binnengekomen aanvragen vanuit het contactformulier, de projectaanvraag en de website-audit verschijnen hier."
        />
      )}

      {leads && shown.length > 0 && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {shown.map((lead) => {
            const meta = leadStatusMeta(lead.status)
            return (
              <Link
                key={lead.id}
                to={`/admin/inbox/${lead.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-semibold ${
                    lead.status === 'nieuw'
                      ? 'bg-emerald/12 text-emerald-deep'
                      : 'bg-near-black/5 text-near-black/50'
                  }`}
                  aria-hidden
                >
                  {(lead.name || lead.email || '?').trim().charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-sans text-sm font-semibold text-near-black">
                      {lead.name || lead.email || 'Onbekend'}
                    </p>
                    {lead.status === 'nieuw' && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-label="nieuw" />
                    )}
                  </div>
                  <p className="truncate font-sans text-sm text-near-black/55">
                    {lead.message || lead.company || lead.website_url || leadSourceLabel(lead.source)}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <span className="font-sans text-xs text-near-black/45">{leadSourceLabel(lead.source)}</span>
                  <p className="font-sans text-xs text-near-black/40">{timeAgo(lead.created_at)}</p>
                </div>
                <div className="shrink-0">
                  <StatusPill label={meta.label} tone={meta.tone} />
                </div>
              </Link>
            )
          })}
        </Card>
      )}
    </>
  )
}
