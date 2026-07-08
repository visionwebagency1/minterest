import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import { computeTotals, formatEUR, lineNet, type CalcLine } from '@/lib/money'

/**
 * Branded quote / invoice document. Pure presentational and free of any data
 * layer, so it is shared by the admin print view and the public online quote
 * page. Styled for A4 with the Minterest teal/mint palette.
 *
 * The header band is deliberately left as-is. Everything below it is built up as
 * hero blocks (the core deliverables, each with its own icon), a calm checklist
 * of the remaining included items, and a strak price panel with the investment.
 *
 * Two totals modes:
 *   - priced   : the lines carry a price per line (a normal quote/invoice). The
 *                totals come from the lines, and each item shows its own price.
 *   - bundled  : the lines have no price (one bundled investment). Detected when
 *                the lines sum to 0; the totals then come from the stored
 *                snapshot (subtotal / vatAmount / total), the items show no
 *                price, and an optional listTotal is shown struck through.
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
  /** Stored snapshot totals — used when the lines carry no price (bundled). */
  subtotal?: number | null
  vatAmount?: number | null
  total?: number | null
  /** Optional "totale waarde" shown struck through above the investment. */
  listTotal?: number | null
}

const dateFmt = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
const fmtDate = (v: string | null | undefined) => (v ? dateFmt.format(new Date(v)) : '-')

/** How many of the leading items get their own hero block. */
const HERO_MAX = 4

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
  subtotal,
  vatAmount,
  total,
  listTotal,
}: QuoteDocumentProps & { lines: DocLine[] }) {
  const lineTotals = computeTotals(lines as CalcLine[])
  const bundled = lineTotals.subtotal === 0

  const netSubtotal = bundled ? Number(subtotal ?? 0) : lineTotals.subtotal
  const netVat = bundled ? Number(vatAmount ?? 0) : lineTotals.vatAmount
  const netTotal = bundled ? Number(total ?? 0) : lineTotals.total
  const vatRows =
    bundled
      ? netSubtotal > 0
        ? [{ rate: Number(lines[0]?.vat_rate ?? 21), base: netSubtotal, vat: netVat }]
        : []
      : lineTotals.vatRows

  const anchor = listTotal != null && Number(listTotal) > netSubtotal ? Number(listTotal) : null
  const showPrices = !bundled

  const heroCount = Math.min(HERO_MAX, lines.length)
  const heroItems = lines.slice(0, heroCount)
  const restItems = lines.slice(heroCount)

  const bigLabel = kind === 'Offerte' ? 'Investering' : 'Factuurbedrag'

  return (
    <div className="doc-sheet mx-auto w-full max-w-[820px] bg-white font-sans text-near-black">
      {/* header band — left untouched */}
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

      <div className="px-10 py-9">
        {/* parties + dates */}
        <div className="doc-block flex flex-wrap justify-between gap-8">
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
          <p className="doc-block mt-7 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-near-black/70">
            {notes}
          </p>
        )}

        {/* included items */}
        {lines.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-emerald-deep/15 py-8 text-center font-sans text-sm text-near-black/40">
            Nog geen regels
          </p>
        ) : (
          <div className="mt-9">
            <SectionLabel>Wat is inbegrepen</SectionLabel>

            {/* hero blocks — the core deliverables */}
            {heroItems.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {heroItems.map((l, i) => (
                  <div
                    key={i}
                    className="doc-block flex items-start gap-4 rounded-2xl border border-emerald-deep/10 bg-gradient-to-br from-emerald/[0.05] to-mint/[0.03] p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald to-mint text-white shadow-sm shadow-emerald/25">
                      <Icon name={iconFor(l.description)} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[15px] font-semibold leading-snug text-near-black">
                        {itemTitle(l.description)}
                      </p>
                      {itemDetail(l.description) && (
                        <p className="mt-1 font-sans text-[13px] leading-snug text-near-black/55">
                          {itemDetail(l.description)}
                        </p>
                      )}
                      {showPrices && (
                        <p className="mt-2 font-sans text-sm font-semibold tabular-nums text-emerald-deep">
                          {formatEUR(lineNet(l as CalcLine))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* remaining items — calm checklist */}
            {restItems.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                {restItems.map((l, i) => (
                  <li key={i} className="doc-block flex items-start gap-3 border-b border-emerald-deep/[0.07] py-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint/15 text-emerald-deep">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="flex-1 font-sans text-sm leading-snug text-near-black/80">
                      {l.description || '-'}
                    </span>
                    {showPrices && (
                      <span className="shrink-0 font-sans text-sm tabular-nums font-medium text-near-black/70">
                        {formatEUR(lineNet(l as CalcLine))}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* price panel */}
        {lines.length > 0 && (
          <div className="doc-block mt-9 overflow-hidden rounded-2xl border border-emerald-deep/12 bg-[#f6faf9]">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between md:p-8">
              {/* investment */}
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-emerald-deep/70">
                  {bigLabel}
                </p>
                {anchor != null && (
                  <p className="mt-2 font-sans text-sm text-near-black/45">
                    Totale waarde{' '}
                    <span className="tabular-nums line-through decoration-near-black/40">{formatEUR(anchor)}</span>
                  </p>
                )}
                <p className="mt-1 font-display text-4xl font-semibold leading-none tracking-tight text-emerald-deep">
                  {formatEUR(netSubtotal)}
                </p>
                <p className="mt-1.5 font-sans text-xs text-near-black/45">excl. btw</p>
              </div>

              {/* btw breakdown */}
              <div className="w-full sm:w-auto sm:min-w-[220px]">
                <div className="flex items-center justify-between py-1 font-sans text-sm">
                  <span className="text-near-black/55">Subtotaal</span>
                  <span className="tabular-nums text-near-black/75">{formatEUR(netSubtotal)}</span>
                </div>
                {vatRows.map((r) => (
                  <div key={r.rate} className="flex items-center justify-between py-1 font-sans text-sm">
                    <span className="text-near-black/55">Btw {r.rate}%</span>
                    <span className="tabular-nums text-near-black/75">{formatEUR(r.vat)}</span>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between border-t-2 border-emerald-deep/15 pt-2.5">
                  <span className="font-display text-base font-semibold text-near-black">Totaal incl. btw</span>
                  <span className="font-display text-lg font-semibold tabular-nums text-emerald-deep">
                    {formatEUR(netTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {footer && (
          <p className="doc-block mt-8 border-t border-emerald-deep/8 pt-5 font-sans text-xs leading-relaxed text-near-black/55">
            {footer}
          </p>
        )}

        {/* Legal terms notice — always on quotes */}
        {kind === 'Offerte' && (
          <p className="doc-block mt-6 border-t border-emerald-deep/8 pt-5 font-sans text-[11px] leading-relaxed text-near-black/50">
            Op al onze offertes, overeenkomsten en werkzaamheden zijn de algemene voorwaarden van Minterest van
            toepassing. Deze zijn als bijlage meegestuurd en/of te raadplegen via{' '}
            <a
              href="/algemene-voorwaarden"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-emerald-deep/30 underline-offset-2 hover:text-emerald-deep"
            >
              minterest.nl/algemene-voorwaarden
            </a>
            . Door akkoord te gaan met deze offerte verklaart opdrachtgever kennis te hebben genomen van en akkoord te
            gaan met deze algemene voorwaarden.
          </p>
        )}

        {/* company footer */}
        <div className="doc-block mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-emerald-deep/8 pt-5 font-sans text-xs text-near-black/50">
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-gradient-to-r from-emerald to-mint" />
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-emerald-deep/70">
        {children}
      </span>
    </div>
  )
}

/**
 * A description can read "Title (detail)". We show the title bold and the
 * parenthetical as a calm sub-line in the hero blocks.
 */
function itemTitle(desc: string): string {
  const m = desc.match(/^(.*?)\s*\((.*)\)\s*$/)
  return (m ? m[1] : desc).trim() || desc
}
function itemDetail(desc: string): string | null {
  const m = desc.match(/^(.*?)\s*\((.*)\)\s*$/)
  return m ? m[2].trim() : null
}

// ── Icons ────────────────────────────────────────────────────────────────────
type IconName =
  | 'globe'
  | 'shield'
  | 'layers'
  | 'receipt'
  | 'file'
  | 'inbox'
  | 'form'
  | 'search'
  | 'languages'
  | 'code'
  | 'spark'

/** Pick an icon from keywords in the line description (with a safe fallback). */
function iconFor(desc: string): IconName {
  const d = desc.toLowerCase()
  if (/(meertalig|talen|\btaal\b|nederlands|duits|engels|spaans)/.test(d)) return 'languages'
  if (/(admin|portaal|beveilig|inlog|login|dashboard)/.test(d)) return 'shield'
  if (/(cms|content)/.test(d)) return 'layers'
  if (/(factu|betaal)/.test(d)) return 'receipt'
  if (/(offerte)/.test(d)) return 'file'
  if (/(inbox|aanvraaginbox|aanvragen|statusbeheer)/.test(d)) return 'inbox'
  if (/(formulier|form)/.test(d)) return 'form'
  if (/(seo|hosting|domein|vindbaar|sea|google)/.test(d)) return 'search'
  if (/(applicatie|software|app|code)/.test(d)) return 'code'
  if (/(website|webshop|web|site)/.test(d)) return 'globe'
  return 'spark'
}

const ICON_PATHS: Record<IconName, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 13h5M9.5 16.5h5" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13l2.5-8h11L20 13v6H4z" />
      <path d="M4 13h5l1 2h4l1-2h5" />
    </>
  ),
  form: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </>
  ),
  languages: (
    <>
      <path d="M4 5h9M8 3v2c0 4-2 7-5 8" />
      <path d="M6 10c1.5 2.5 4 4.5 6 5" />
      <path d="M12 21l4-9 4 9M13.5 17h5" />
    </>
  ),
  code: (
    <>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
    </>
  ),
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATHS[name]}
    </svg>
  )
}
