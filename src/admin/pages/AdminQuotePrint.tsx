import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuoteDocument } from '@/components/QuoteDocument'
import { fetchQuote, type Quote, type QuoteLine } from '../data/quotes'
import { fetchCustomer, type Customer } from '../data/customers'
import { fetchSettings, type CompanySettings } from '../data/settings'
import { ErrorNote, Spinner } from '../components/ui'

/**
 * Full-screen printable quote. Rendered outside the sidebar shell so the print
 * output (browser "Bewaar als PDF") contains only the branded document. The
 * toolbar carries the print-hide class so it never appears in the PDF.
 */
export function AdminQuotePrint() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [lines, setLines] = useState<QuoteLine[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [settings, setSettings] = useState<CompanySettings | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let active = true
    Promise.all([fetchQuote(id), fetchSettings()])
      .then(async ([res, s]) => {
        if (!active) return
        if (!res) {
          setError('Offerte niet gevonden.')
          return
        }
        setQuote(res.quote)
        setLines(res.lines)
        setSettings(s)
        if (res.quote.customer_id) {
          const c = await fetchCustomer(res.quote.customer_id)
          if (active) setCustomer(c)
        }
      })
      .catch((e) => active && setError(e?.message ?? 'Laden mislukt.'))
    return () => {
      active = false
    }
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen bg-[#eef2f1] p-6">
        <ErrorNote message={error} />
      </div>
    )
  }
  if (!quote || !settings) {
    return (
      <div className="min-h-screen bg-[#eef2f1]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eef2f1]">
      {/* toolbar (never printed) */}
      <div className="print-hide sticky top-0 z-10 flex items-center justify-between border-b border-emerald-deep/10 bg-white/90 px-5 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => navigate(`/admin/offertes/${quote.id}`)}
          className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/60 transition-colors hover:text-emerald-deep"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Terug
        </button>
        <p className="font-sans text-sm text-near-black/50">
          Kies bij bestemming <span className="font-semibold text-near-black/70">"Bewaar als PDF"</span>
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-md shadow-emerald/20 transition-transform hover:scale-[1.02]"
        >
          PDF downloaden
        </button>
      </div>

      <div className="p-4 md:p-8">
        <div className="shadow-[0_18px_50px_rgba(1,63,64,0.12)]">
          <QuoteDocument
            kind="Offerte"
            number={quote.number}
            issueDate={quote.issue_date}
            validUntil={quote.valid_until}
            notes={quote.notes}
            footer={settings.quote_footer}
            company={settings}
            customer={customer}
            lines={lines}
          />
        </div>
      </div>
    </div>
  )
}
