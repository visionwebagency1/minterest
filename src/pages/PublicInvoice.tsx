import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuoteDocument } from '@/components/QuoteDocument'
import { getPublicInvoice, type PublicInvoice as PublicInvoiceData } from '@/lib/publicInvoice'

/**
 * Public online invoice page (/factuur/:token). Read-only branded view, no login
 * and no marketing chrome. Data comes in through a token-keyed RPC only.
 */
type Phase = 'loading' | 'ready' | 'notfound' | 'error'

export function PublicInvoice() {
  const { token } = useParams<{ token: string }>()
  const [phase, setPhase] = useState<Phase>('loading')
  const [invoice, setInvoice] = useState<PublicInvoiceData | null>(null)

  useEffect(() => {
    if (!token) return
    let active = true
    getPublicInvoice(token)
      .then((inv) => {
        if (!active) return
        if (!inv) setPhase('notfound')
        else {
          setInvoice(inv)
          setPhase('ready')
        }
      })
      .catch(() => active && setPhase('error'))
    return () => {
      active = false
    }
  }, [token])

  if (phase === 'loading') {
    return (
      <Centered>
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald" aria-label="Laden" />
      </Centered>
    )
  }

  if (phase === 'notfound' || !invoice) {
    return (
      <Centered>
        <div className="text-center">
          <p className="font-display text-xl font-semibold text-near-black">Factuur niet gevonden</p>
          <p className="mt-2 font-sans text-sm text-near-black/55">
            Deze link is mogelijk verlopen of onjuist. Neem contact op met Minterest.
          </p>
        </div>
      </Centered>
    )
  }

  if (phase === 'error') {
    return (
      <Centered>
        <p className="font-sans text-sm text-near-black/60">Er ging iets mis bij het laden. Probeer het later opnieuw.</p>
      </Centered>
    )
  }

  const paid = invoice.status === 'betaald'

  return (
    <div className="min-h-screen bg-[#eef2f1] py-6 md:py-12">
      <div className="mx-auto max-w-[860px] px-3 md:px-6">
        {paid && (
          <div className="mb-5 rounded-2xl border border-emerald/30 bg-emerald/[0.07] p-4 text-center font-sans text-sm font-semibold text-emerald-deep shadow-[0_12px_40px_rgba(1,63,64,0.06)]">
            Deze factuur is voldaan. Bedankt!
          </div>
        )}
        <div className="shadow-[0_18px_50px_rgba(1,63,64,0.12)]">
          <QuoteDocument
            kind="Factuur"
            number={invoice.number}
            issueDate={invoice.issue_date}
            dueDate={invoice.due_date}
            notes={invoice.notes}
            footer={invoice.company.invoice_footer}
            company={invoice.company}
            customer={invoice.customer}
            lines={invoice.lines}
            subtotal={invoice.subtotal}
            vatAmount={invoice.vat_amount}
            total={invoice.total}
            listTotal={invoice.list_total}
          />
        </div>
      </div>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid min-h-screen place-items-center bg-[#eef2f1] px-6">{children}</div>
}
