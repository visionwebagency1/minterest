import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { computeTotals, formatEUR } from '@/lib/money'
import {
  createQuote,
  fetchQuote,
  updateQuote,
  type LineDraft,
  type QuoteDraft,
} from '../data/quotes'
import { customerName, fetchCustomers, type Customer } from '../data/customers'
import { fetchSettings } from '../data/settings'
import { SERVICE_CATALOG } from '../data/serviceCatalog'
import { GhostButton, PrimaryButton, TextAreaField } from '../components/form'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'

/** Create or edit a quote: pick a customer, add lines, see totals update live. */
const todayISO = () => new Date().toISOString().slice(0, 10)
const addDays = (iso: string, days: number) => {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const emptyLine = (vat: number): LineDraft => ({ description: '', quantity: 1, unit_price: 0, vat_rate: vat })

export function AdminQuoteForm({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const preCustomer = (location.state as { customerId?: string | null } | null)?.customerId ?? null

  const [customers, setCustomers] = useState<Customer[]>([])
  const [defaultVat, setDefaultVat] = useState(21)
  const [customerId, setCustomerId] = useState<string | null>(preCustomer)
  const [issueDate, setIssueDate] = useState(todayISO())
  const [validUntil, setValidUntil] = useState('')
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<LineDraft[]>([])
  const [catalogOpen, setCatalogOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load customers + settings, and (in edit mode) the existing quote.
  useEffect(() => {
    let active = true
    Promise.all([fetchCustomers(), fetchSettings(), mode === 'edit' && id ? fetchQuote(id) : null])
      .then(([cs, settings, existing]) => {
        if (!active) return
        setCustomers(cs)
        setDefaultVat(Number(settings.default_vat_rate) || 21)
        if (mode === 'create') {
          setValidUntil(addDays(todayISO(), settings.quote_validity_days || 30))
          setLines([emptyLine(Number(settings.default_vat_rate) || 21)])
        } else if (existing) {
          const { quote, lines: existingLines } = existing
          setCustomerId(quote.customer_id)
          setIssueDate(quote.issue_date)
          setValidUntil(quote.valid_until ?? '')
          setNotes(quote.notes ?? '')
          setLines(
            existingLines.map((l) => ({
              description: l.description,
              quantity: Number(l.quantity),
              unit_price: Number(l.unit_price),
              vat_rate: Number(l.vat_rate),
            })),
          )
        } else {
          setError('Offerte niet gevonden.')
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
  }, [id, mode])

  const totals = useMemo(() => computeTotals(lines), [lines])

  const setLine = (i: number, patch: Partial<LineDraft>) =>
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)))
  const removeLine = (i: number) => setLines((ls) => ls.filter((_, idx) => idx !== i))
  const addLine = () => setLines((ls) => [...ls, emptyLine(defaultVat)])
  const addCatalog = (name: string, price: number) => {
    setLines((ls) => [...ls, { description: name, quantity: 1, unit_price: price, vat_rate: defaultVat }])
    setCatalogOpen(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cleaned = lines
      .map((l) => ({ ...l, description: l.description.trim() }))
      .filter((l) => l.description !== '' || l.unit_price !== 0)
    if (cleaned.length === 0) {
      setError('Voeg minstens een regel met omschrijving toe.')
      return
    }
    setError(null)
    setSaving(true)
    const draft: QuoteDraft = {
      customer_id: customerId,
      issue_date: issueDate,
      valid_until: validUntil || null,
      notes: notes.trim() || null,
      lines: cleaned,
    }
    try {
      if (mode === 'create') {
        const created = await createQuote(draft)
        navigate(`/admin/offertes/${created.id}`, { replace: true })
      } else if (id) {
        await updateQuote(id, draft)
        navigate(`/admin/offertes/${id}`, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.')
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  const backTo = mode === 'edit' && id ? `/admin/offertes/${id}` : '/admin/offertes'
  const numberCls =
    'w-full rounded-lg border border-emerald-deep/15 bg-white px-2.5 py-2 text-right font-sans text-sm tabular-nums text-near-black outline-none focus:border-emerald'

  return (
    <>
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug
      </Link>
      <PageHeading kicker="Offertes" title={mode === 'create' ? 'Nieuwe offerte' : 'Offerte bewerken'} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* meta */}
        <Card className="p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-semibold text-near-black">Klant</span>
              <select
                value={customerId ?? ''}
                onChange={(e) => setCustomerId(e.target.value || null)}
                className="w-full appearance-none rounded-xl border border-emerald-deep/15 bg-white px-3.5 py-2.5 font-sans text-sm text-near-black outline-none focus:border-emerald"
              >
                <option value="">Geen klant gekoppeld</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {customerName(c)}
                  </option>
                ))}
              </select>
              <Link to="/admin/klanten/nieuw" className="font-sans text-xs font-medium text-emerald-deep hover:underline">
                + Nieuwe klant aanmaken
              </Link>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-sm font-semibold text-near-black">Offertedatum</span>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full rounded-xl border border-emerald-deep/15 bg-white px-3 py-2.5 font-sans text-sm text-near-black outline-none focus:border-emerald"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-sans text-sm font-semibold text-near-black">Geldig tot</span>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full rounded-xl border border-emerald-deep/15 bg-white px-3 py-2.5 font-sans text-sm text-near-black outline-none focus:border-emerald"
                />
              </label>
            </div>
          </div>
        </Card>

        {/* lines */}
        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-near-black">Regels</h2>
            <div className="relative">
              <GhostButton type="button" onClick={() => setCatalogOpen((o) => !o)}>
                + Dienst toevoegen
              </GhostButton>
              {catalogOpen && (
                <div className="absolute right-0 z-20 mt-2 max-h-80 w-72 overflow-auto rounded-xl border border-emerald-deep/12 bg-white p-2 shadow-[0_18px_50px_rgba(1,63,64,0.14)]">
                  {SERVICE_CATALOG.map((group) => (
                    <div key={group.group} className="mb-1">
                      <p className="px-2 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">
                        {group.group}
                      </p>
                      {group.items.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => addCatalog(item.name, item.price)}
                          className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left font-sans text-sm text-near-black/80 transition-colors hover:bg-emerald/8"
                        >
                          <span>{item.name}</span>
                          <span className="shrink-0 tabular-nums text-near-black/45">
                            {item.price ? `vanaf ${formatEUR(item.price)}` : 'op maat'}
                          </span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* header row (desktop) */}
          <div className="hidden grid-cols-[1fr_80px_120px_90px_110px_36px] gap-2 px-1 pb-2 font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40 sm:grid">
            <span>Omschrijving</span>
            <span className="text-right">Aantal</span>
            <span className="text-right">Prijs</span>
            <span className="text-right">Btw %</span>
            <span className="text-right">Totaal</span>
            <span />
          </div>

          <div className="flex flex-col gap-3 sm:gap-2">
            {lines.map((line, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 rounded-xl border border-emerald-deep/8 p-3 sm:grid-cols-[1fr_80px_120px_90px_110px_36px] sm:items-center sm:rounded-none sm:border-0 sm:p-0"
              >
                <input
                  value={line.description}
                  onChange={(e) => setLine(i, { description: e.target.value })}
                  placeholder="Omschrijving"
                  className="w-full rounded-lg border border-emerald-deep/15 bg-white px-3 py-2 font-sans text-sm text-near-black outline-none focus:border-emerald"
                />
                <input
                  type="number"
                  step="0.01"
                  value={line.quantity}
                  onChange={(e) => setLine(i, { quantity: Number(e.target.value) })}
                  className={numberCls}
                  aria-label="Aantal"
                />
                <input
                  type="number"
                  step="0.01"
                  value={line.unit_price}
                  onChange={(e) => setLine(i, { unit_price: Number(e.target.value) })}
                  className={numberCls}
                  aria-label="Prijs"
                />
                <input
                  type="number"
                  step="1"
                  value={line.vat_rate}
                  onChange={(e) => setLine(i, { vat_rate: Number(e.target.value) })}
                  className={numberCls}
                  aria-label="Btw percentage"
                />
                <span className="px-1 text-right font-sans text-sm tabular-nums font-medium text-near-black">
                  {formatEUR((Number(line.quantity) || 0) * (Number(line.unit_price) || 0))}
                </span>
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="grid h-9 w-9 place-items-center justify-self-end rounded-lg text-near-black/35 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Regel verwijderen"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 7h12M9 7V5h6v2M10 11v6M14 11v6M7 7l1 13h8l1-13" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addLine}
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-emerald-deep transition-colors hover:text-emerald"
          >
            <span className="text-base leading-none">+</span> Lege regel
          </button>

          {/* totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs font-sans text-sm">
              <div className="flex justify-between py-1 text-near-black/70">
                <span>Subtotaal</span>
                <span className="tabular-nums">{formatEUR(totals.subtotal)}</span>
              </div>
              {totals.vatRows.map((r) => (
                <div key={r.rate} className="flex justify-between py-1 text-near-black/50">
                  <span>Btw {r.rate}%</span>
                  <span className="tabular-nums">{formatEUR(r.vat)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t-2 border-emerald-deep/15 pt-2.5">
                <span className="font-display text-base font-semibold">Totaal</span>
                <span className="font-display text-base font-semibold text-emerald-deep tabular-nums">
                  {formatEUR(totals.total)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* notes */}
        <Card className="p-6">
          <TextAreaField
            label="Notitie op de offerte"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optionele inleiding of toelichting die op de offerte komt te staan."
          />
        </Card>

        {error && <ErrorNote message={error} />}

        <div className="flex items-center gap-3">
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? 'Opslaan…' : mode === 'create' ? 'Offerte aanmaken' : 'Wijzigingen opslaan'}
          </PrimaryButton>
          <Link to={backTo}>
            <GhostButton type="button">Annuleren</GhostButton>
          </Link>
        </div>
      </form>
    </>
  )
}
