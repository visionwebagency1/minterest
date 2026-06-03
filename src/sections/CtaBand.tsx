import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Closing climax: full-bleed, dark, strong typography. Doubles as the free
 * website-audit hook (URL field) that drives to contact.
 */
export function CtaBand() {
  const [url, setUrl] = useState('')

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-28 text-cream md:py-40"
      style={{
        backgroundImage:
          'radial-gradient(60% 60% at 50% 0%, rgba(31,166,122,0.28), transparent 60%), radial-gradient(50% 50% at 85% 100%, rgba(79,216,155,0.18), transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-mint">
            Gratis website-audit
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.98] tracking-tight">
            Hoe scoort <Accent>jouw site?</Accent>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/60 md:text-lg">
            Plak je link en je krijgt binnen 24 uur een eerlijke analyse met
            concrete groeikansen. Gratis en zonder verplichtingen.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `mailto:hello@minterest.nl?subject=Website-audit&body=${encodeURIComponent(url)}`
            }}
            className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="jouwwebsite.nl"
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-sans text-base text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-mint/60"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
            >
              Audit aanvragen
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </button>
          </form>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 font-sans text-xs uppercase tracking-[0.2em] text-cream/40">
            Binnen 24 uur · gratis · geen verplichtingen
          </p>
        </Reveal>
      </div>
    </section>
  )
}
