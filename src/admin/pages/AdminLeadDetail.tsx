import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  fetchLead,
  interestLabel,
  leadSourceLabel,
  LEAD_STATUSES,
  updateLeadStatus,
  type Lead,
  type LeadStatus,
} from '../data/leads'
import { formatDateTime } from '../lib/format'
import { useAdminCounts } from '../AdminLayout'
import { Card, ErrorNote, Spinner } from '../components/ui'

/** Detail view of a single request: all data, who/what came in, and how. */
export function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { refresh } = useAdminCounts()
  const [lead, setLead] = useState<Lead | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    fetchLead(id)
      .then((row) => {
        if (!active) return
        setLead(row)
        // Reading a new request marks it as "gelezen" and updates the badge.
        if (row && row.status === 'nieuw') {
          updateLeadStatus(row.id, 'gelezen')
            .then(() => {
              if (active) setLead({ ...row, status: 'gelezen' })
              refresh()
            })
            .catch(() => {})
        }
      })
      .catch((e) => active && setError(e?.message ?? 'Kon de aanvraag niet laden.'))
    return () => {
      active = false
    }
  }, [id, refresh])

  const changeStatus = async (status: LeadStatus) => {
    if (!lead || status === lead.status) return
    setSaving(true)
    try {
      await updateLeadStatus(lead.id, status)
      setLead({ ...lead, status })
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Status bijwerken mislukt.')
    } finally {
      setSaving(false)
    }
  }

  if (error) return <ErrorNote message={error} />
  if (!lead) return <Spinner />

  return (
    <>
      <Link
        to="/admin/inbox"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug naar inbox
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* main */}
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-3xl">
            {lead.name || lead.email || 'Onbekende aanvraag'}
          </h1>
          <p className="mt-1.5 font-sans text-sm text-near-black/50">
            Via {leadSourceLabel(lead.source)} · {formatDateTime(lead.created_at)}
          </p>

          <Card className="mt-6 p-6">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <Field label="Naam" value={lead.name} />
              <Field label="E-mail" value={lead.email} href={lead.email ? `mailto:${lead.email}` : undefined} />
              <Field label="Bedrijf / website" value={lead.company} />
              <Field
                label="Website"
                value={lead.website_url}
                href={lead.website_url ? withProtocol(lead.website_url) : undefined}
              />
              <Field label="Budget" value={lead.budget} />
              <Field label="Tijdlijn" value={lead.timeline} />
            </dl>

            {lead.interest.length > 0 && (
              <div className="mt-6 border-t border-emerald-deep/8 pt-5">
                <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">
                  Interesse
                </dt>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lead.interest.map((slug) => (
                    <span
                      key={slug}
                      className="rounded-full bg-emerald/10 px-3 py-1 font-sans text-sm font-medium text-emerald-deep"
                    >
                      {interestLabel(slug)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {lead.message && (
              <div className="mt-6 border-t border-emerald-deep/8 pt-5">
                <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">
                  Bericht
                </dt>
                <p className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-near-black/75">
                  {lead.message}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* side: status + actions */}
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Status</p>
            <div className="mt-3 flex flex-col gap-2">
              {LEAD_STATUSES.map((s) => {
                const active = lead.status === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    disabled={saving}
                    onClick={() => changeStatus(s.value)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 font-sans text-sm font-medium transition-colors disabled:opacity-60 ${
                      active
                        ? 'border-emerald bg-emerald/10 text-emerald-deep'
                        : 'border-emerald-deep/12 text-near-black/60 hover:border-emerald/40'
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

          <Card className="p-5">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">
              Vervolgstappen
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {lead.customer_id ? (
                <Link
                  to={`/admin/klanten/${lead.customer_id}`}
                  className="rounded-xl border border-emerald/30 bg-emerald/[0.06] px-4 py-2.5 text-left font-sans text-sm font-medium text-emerald-deep transition-colors hover:border-emerald/50"
                >
                  Bekijk gekoppelde klant
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    navigate('/admin/klanten/nieuw', {
                      state: {
                        fromLeadId: lead.id,
                        initial: {
                          company_name: lead.company ?? '',
                          contact_name: lead.name ?? '',
                          email: lead.email ?? '',
                          notes: lead.message ?? '',
                        },
                      },
                    })
                  }
                  className="rounded-xl border border-emerald-deep/15 px-4 py-2.5 text-left font-sans text-sm font-medium text-near-black/75 transition-colors hover:border-emerald/40 hover:text-near-black"
                >
                  Maak klant van deze aanvraag
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  navigate('/admin/offertes/nieuw', { state: { customerId: lead.customer_id } })
                }
                className="rounded-xl border border-emerald-deep/15 px-4 py-2.5 text-left font-sans text-sm font-medium text-near-black/75 transition-colors hover:border-emerald/40 hover:text-near-black"
              >
                Start een offerte
              </button>
            </div>
          </Card>

          <button
            type="button"
            onClick={() => navigate('/admin/inbox')}
            className="font-sans text-sm font-medium text-near-black/45 transition-colors hover:text-near-black"
          >
            Sluiten
          </button>
        </div>
      </div>
    </>
  )
}

function Field({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <div>
      <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">{label}</dt>
      <dd className="mt-1 font-sans text-sm text-near-black/80">
        {value ? (
          href ? (
            <a href={href} className="text-emerald-deep underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
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

function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}
