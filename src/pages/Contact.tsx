import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'

/**
 * Contact page (light): the free website-audit as the main hook, contact
 * details, and a short form. Presentational for now.
 */
export function Contact() {
  const [sent, setSent] = useState(false)

  const field =
    'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

  return (
    <PageShell>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        {/* left: pitch */}
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 bg-emerald/50" />
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 text-balance font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.0] tracking-tight">
              Klaar om te <Accent>klimmen?</Accent>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
              Vertel ons over je project. Je krijgt van ons een gratis
              website-audit met concrete groeikansen, binnen twee werkdagen.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-4">
              <a href="https://wa.me/31657691672" className="group flex items-center gap-3 font-sans text-lg text-near-black transition-colors hover:text-emerald">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald/10 text-emerald">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm4.4 12.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5L9.3 8.1c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.8-.9 1.7-.6 2.9.5 1.9 1.8 3.4 3.7 4.4 1.7.9 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1Z" /></svg>
                </span>
                WhatsApp
              </a>
              <a href="mailto:hello@minterest.nl" className="font-sans text-lg text-near-black transition-colors hover:text-emerald">
                hello@minterest.nl
              </a>
              <span className="font-sans text-sm text-near-black/50">Amsterdam · Ma t/m vr, 09:00 tot 18:00</span>
            </div>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(15,92,77,0.1)] md:p-10"
          >
            {sent ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
                <span className="font-accent text-3xl italic text-emerald">Dank je!</span>
                <p className="mt-4 max-w-xs font-sans text-sm text-near-black/60">
                  We hebben je bericht ontvangen en nemen snel contact op.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input className={field} placeholder="Naam" required />
                  <input className={field} type="email" placeholder="E-mail" required />
                </div>
                <input className={field} placeholder="Bedrijf of website" />
                <textarea className={`${field} min-h-[8rem] resize-none`} placeholder="Waar wil je heen klimmen?" required />
                <button
                  type="submit"
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02]"
                >
                  Verstuur en ontvang je audit
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </PageShell>
  )
}
