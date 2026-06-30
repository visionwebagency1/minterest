import { Logo } from '@/components/Logo'
import { computeTotals, formatEUR, type CalcLine } from '@/lib/money'

/**
 * Branded quote / invoice document. Pure presentational and free of any data
 * layer, so it is shared by the admin print view and the public online quote
 * page. Styled for A4 with the Minterest teal/mint palette.
 */

export type DocLine = {
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export type DocParty = {
  company_name?: string | null
  contact_name?: string | null
  email?: string | null
  address?: string | null
  kvk?: string | null
  vat?: string | null
  phone?: string | null
  iban?: string | null
  website?: string | null
}

export type QuoteDocumentProps = {
  kind: 'Offerte' | 'Factuur'
  number: string
  issueDate: string | null
  validUntil?: string | null
  dueDate?: string | null
  notes?: string | null
  footer?: string | null
  company: DocParty
  customer: DocParty | null
}

const dateFmt = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
const fmtDate = (v: string | null | undefined) => (v ? dateFmt.format(new Date(v)) : '-')

export function QuoteDocument({
  kind,
  number,
  issueDate,
  validUntil,
  dueDate,
  notes,
  footer,
  company,
  customer,
  lines,
}: QuoteDocumentProps & { lines: DocLine[] }) {
  const totals = computeTotals(lines as CalcLine[])

  return (
    <div className="doc-sheet mx-auto w-full max-w-[820px] bg-white font-sans text-near-black">
      {/* header band */}
      <div
        className="flex items-start justify-between px-10 py-8 text-cream"
        style={{ background: 'linear-gradient(120deg, #013F40 0%, #008081 55%, #42C28C 100%)' }}
      >
        <div>
          <Logo className="h-7 w-auto" wordmark="#F4F4F4" />
          <p className="mt-3 font-sans text-sm text-cream/80">{company.company_name || 'Minterest'}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold tracking-tight">{kind}</p>
          <p className="mt-1 font-sans text-sm text-cream/80">{number}</p>
        </div>
      </div>

      <div className="px-10 py-8">
        {/* parties + dates */}
        <div className="flex flex-wrap justify-between gap-8">
          <div className="min-w-[180px]">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">Aan</p>
            {customer ? (
              <div className="mt-1.5 font-sans text-sm leading-relaxed text-near-black/80">
                {customer.company_name && <p className="font-semibold text-near-black">{customer.company_name}</p>}
                {customer.contact_name && <p>{customer.contact_name}</p>}
                {customer.address && <p className="whitespace-pre-wrap">{customer.address}</p>}
                {customer.email && <p>{customer.email}</p>}
              </div>
            ) : (
              <p className="mt-1.5 font-sans text-sm text-near-black/40">Geen klant gekoppeld</p>
            )}
          </div>
          <div className="text-right">
            <Meta label={kind === 'Offerte' ? 'Offertedatum' : 'Factuurdatum'} value={fmtDate(issueDate)} />
            {kind === 'Offerte' && <Meta label="Geldig tot" value={fmtDate(validUntil)} />}
            {kind === 'Factuur' && <Meta label="Vervaldatum" value={fmtDate(dueDate)} />}
          </div>
        </div>

        {notes && (
          <p className="mt-7 whitespace-pre-wrap font-sans text-sm leading-relaxed text-near-black/70">{notes}</p>
        )}

        {/* line items */}
        <table className="mt-7 w-full border-collapse text-left font-sans text-sm">
          <thead>
            <tr className="border-b-2 border-emerald-deep/15 text-near-black/50">
              <th className="py-2.5 pr-3 font-semibold">Omschrijving</th>
              <th className="py-2.5 px-3 text-right font-semibold">Aantal</th>
              <th className="py-2.5 px-3 text-right font-semibold">Prijs</th>
              <th className="py-2.5 px-3 text-right font-semibold">Btw</th>
              <th className="py-2.5 pl-3 text-right font-semibold">Totaal</th>
            </tr>
          </thead>
          <tbody>
            {lines.length === 0 && (
              <tr>
                <td colSpan={5} className="py-5 text-center text-near-black/40">
                  Nog geen regels
                </td>
              </tr>
            )}
            {lines.map((l, i) => (
              <tr key={i} className="border-b border-emerald-deep/8 align-top">
                <td className="py-3 pr-3 text-near-black/85">{l.description || '-'}</td>
                <td className="py-3 px-3 text-right tabular-nums text-near-black/70">{l.quantity}</td>
                <td className="py-3 px-3 text-right tabular-nums text-near-black/70">{formatEUR(l.unit_price)}</td>
                <td className="py-3 px-3 text-right tabular-nums text-near-black/70">{l.vat_rate}%</td>
                <td className="py-3 pl-3 text-right tabular-nums font-medium text-near-black">
                  {formatEUR((Number(l.quantity) || 0) * (Number(l.unit_price) || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* totals */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs font-sans text-sm">
            <Row label="Subtotaal" value={formatEUR(totals.subtotal)} />
            {totals.vatRows.map((r) => (
              <Row key={r.rate} label={`Btw ${r.rate}%`} value={formatEUR(r.vat)} muted />
            ))}
            <div className="mt-2 flex items-center justify-between border-t-2 border-emerald-deep/15 pt-2.5">
              <span className="font-display text-base font-semibold">Totaal</span>
              <span className="font-display text-base font-semibold text-emerald-deep">{formatEUR(totals.total)}</span>
            </div>
          </div>
        </div>

        {footer && (
          <p className="mt-8 border-t border-emerald-deep/8 pt-5 font-sans text-xs leading-relaxed text-near-black/55">
            {footer}
          </p>
        )}

        {/* company footer */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-emerald-deep/8 pt-5 font-sans text-xs text-near-black/50">
          {company.company_name && <span>{company.company_name}</span>}
          {company.address && <span>{company.address}</span>}
          {company.email && <span>{company.email}</span>}
          {company.phone && <span>{company.phone}</span>}
          {company.kvk && <span>KvK {company.kvk}</span>}
          {company.vat && <span>BTW {company.vat}</span>}
          {company.iban && <span>IBAN {company.iban}</span>}
          {company.website && <span>{company.website}</span>}
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-near-black/40">{label}</p>
      <p className="font-sans text-sm text-near-black/80">{value}</p>
    </div>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={muted ? 'text-near-black/50' : 'text-near-black/70'}>{label}</span>
      <span className="tabular-nums text-near-black/80">{value}</span>
    </div>
  )
}
