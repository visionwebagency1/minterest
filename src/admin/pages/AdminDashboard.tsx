import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLeads, leadSourceLabel, leadStatusMeta, type Lead } from '../data/leads'
import { countCustomers } from '../data/customers'
import { countOpenQuotes } from '../data/quotes'
import { countOpenInvoices } from '../data/invoices'
import { timeAgo } from '../lib/format'
import { useAdminAuth } from '../AdminAuth'
import { useAdminCounts } from '../AdminLayout'
import { Card, PageHeading, Spinner, StatusPill } from '../components/ui'

/** Dashboard: a quick read on what needs attention, starting with new requests. */
export function AdminDashboard() {
  const { profile, user } = useAdminAuth()
  const { newLeads } = useAdminCounts()
  const [leads, setLeads] = useState<Lead[] | null>(null)
  const [customerCount, setCustomerCount] = useState<number | null>(null)
  const [openQuotes, setOpenQuotes] = useState<number | null>(null)
  const [openInvoices, setOpenInvoices] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    fetchLeads()
      .then((rows) => active && setLeads(rows))
      .catch(() => active && setLeads([]))
    countCustomers()
      .then((n) => active && setCustomerCount(n))
      .catch(() => active && setCustomerCount(0))
    countOpenQuotes()
      .then((n) => active && setOpenQuotes(n))
      .catch(() => active && setOpenQuotes(0))
    countOpenInvoices()
      .then((n) => active && setOpenInvoices(n))
      .catch(() => active && setOpenInvoices(0))
    return () => {
      active = false
    }
  }, [])

  const name = (profile?.full_name || user?.email || 'admin').split(' ')[0]
  const recent = (leads ?? []).slice(0, 6)

  return (
    <>
      <PageHeading kicker="Dashboard" title={`Hallo ${name}`} />

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          to="/admin/inbox"
          label="Nieuwe aanvragen"
          value={newLeads}
          accent
        />
        <Stat to="/admin/klanten" label="Klanten" value={customerCount ?? '-'} />
        <Stat to="/admin/offertes" label="Openstaande offertes" value={openQuotes ?? '-'} />
        <Stat to="/admin/facturen" label="Openstaande facturen" value={openInvoices ?? '-'} />
      </div>

      {/* recent requests */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-near-black">Recente aanvragen</h2>
          <Link to="/admin/inbox" className="font-sans text-sm font-medium text-emerald-deep hover:underline">
            Naar inbox
          </Link>
        </div>

        {!leads && <Spinner />}

        {leads && recent.length === 0 && (
          <Card className="px-6 py-12 text-center">
            <p className="font-sans text-sm text-near-black/55">
              Nog geen aanvragen binnen. Zodra iemand het contactformulier of de projectaanvraag invult, verschijnt
              het hier.
            </p>
          </Card>
        )}

        {leads && recent.length > 0 && (
          <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
            {recent.map((lead) => {
              const meta = leadStatusMeta(lead.status)
              return (
                <Link
                  key={lead.id}
                  to={`/admin/inbox/${lead.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-emerald-deep/[0.03]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm font-semibold text-near-black">
                      {lead.name || lead.email || 'Onbekend'}
                    </p>
                    <p className="truncate font-sans text-xs text-near-black/50">
                      {leadSourceLabel(lead.source)} · {timeAgo(lead.created_at)}
                    </p>
                  </div>
                  <StatusPill label={meta.label} tone={meta.tone} />
                </Link>
              )
            })}
          </Card>
        )}
      </div>
    </>
  )
}

function Stat({
  label,
  value,
  to,
  accent,
  upcoming,
}: {
  label: string
  value: number | string
  to?: string
  accent?: boolean
  upcoming?: boolean
}) {
  const inner = (
    <Card
      className={`h-full p-5 transition-colors ${to ? 'hover:border-emerald/40' : ''} ${
        accent ? 'bg-gradient-to-br from-white to-emerald/[0.06]' : ''
      }`}
    >
      <p className="font-sans text-sm text-near-black/55">{label}</p>
      <p
        className={`mt-2 font-display text-3xl font-semibold ${
          upcoming ? 'text-near-black/25' : accent && value ? 'text-emerald-deep' : 'text-near-black'
        }`}
      >
        {value}
      </p>
      {upcoming && <p className="mt-1 font-sans text-xs text-near-black/35">binnenkort</p>}
    </Card>
  )
  return to ? <Link to={to}>{inner}</Link> : inner
}
