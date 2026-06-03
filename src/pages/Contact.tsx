import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'

/**
 * Contact page. The form is presentational for now (no backend) — the
 * website-audit tool plugs in here in Fase 4.
 */
export function Contact() {
  const [sent, setSent] = useState(false)

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-sans text-sm text-cream placeholder:text-white/35 outline-none transition-colors focus:border-mint/50'

  return (
    <PageShell>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        {/* Left: pitch */}
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 bg-mint/50" />
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream md:text-6xl">
              Klaar om te <Accent>klimmen</Accent>?
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-white/60 md:text-lg">
              Vertel ons over je project. Je krijgt van ons een gratis
              website-audit met concrete groeikansen, binnen twee werkdagen.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href="mailto:hello@minterest.nl"
                className="font-sans text-lg text-cream transition-colors hover:text-mint"
              >
                hello@minterest.nl
              </a>
              <span className="font-sans text-sm text-white/45">
                Ma t/m vr · 09:00 tot 18:00
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            {sent ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
                <span className="font-accent text-3xl italic text-mint">Dank je!</span>
                <p className="mt-4 max-w-xs font-sans text-sm text-white/60">
                  We hebben je bericht ontvangen en nemen snel contact op.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input className={field} placeholder="Naam" required />
                  <input className={field} type="email" placeholder="E-mail" required />
                </div>
                <input className={field} placeholder="Bedrijf / website" />
                <textarea
                  className={`${field} min-h-[8rem] resize-none`}
                  placeholder="Waar wil je heen klimmen?"
                  required
                />
                <button
                  type="submit"
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-sm font-medium text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] md:text-base"
                >
                  Verstuur &amp; ontvang je audit
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </PageShell>
  )
}
