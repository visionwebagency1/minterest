import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { SERVICE_OPTIONS } from '@/components/serviceIcons'
import { useLeadForm } from '@/lib/useLeadForm'

/** Contact page: dark hero + light body with an interest selector and a form. */
export function Contact() {
  const { isSubmitting, isSuccess, error, submit } = useLeadForm('contact')
  const [interest, setInterest] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    submit({
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company'),
      message: fd.get('message'),
      interest,
    })
  }

  const toggle = (key: string) =>
    setInterest((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]))

  const field =
    'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

  return (
    <>
      <PageHero
        kicker="Contact"
        title={
          <>
            Even <Accent>kennismaken?</Accent>
          </>
        }
        tagline="Bel, app of mail. Een kort gesprek is vaak genoeg om te zien waar de groei zit. We reageren snel."
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:px-16">
          {/* left: details */}
          <div>
            <Reveal>
              <h2 className="text-balance font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight">
                Liever direct contact?
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                We zitten in Amsterdam en werken door heel Nederland. Kies wat jou het beste uitkomt.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
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
              onSubmit={handleSubmit}
              className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(1,63,64,0.1)] md:p-10"
            >
              {isSuccess ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <span className="font-accent text-3xl italic text-emerald">Dank je!</span>
                  <p className="mt-4 max-w-xs font-sans text-sm text-near-black/60">
                    We hebben je bericht ontvangen en nemen snel contact op.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="font-sans text-sm font-semibold text-near-black">Waar ben je in geïnteresseerd?</label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((s) => {
                        const active = interest.includes(s.key)
                        return (
                          <button
                            type="button"
                            key={s.key}
                            onClick={() => toggle(s.key)}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                              active
                                ? 'border-emerald bg-emerald/10 text-emerald-deep'
                                : 'border-emerald-deep/15 text-near-black/60 hover:border-emerald/40'
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald' : 'bg-emerald-deep/25'}`} />
                            {s.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input name="name" className={field} placeholder="Naam" required />
                    <input name="email" className={field} type="email" placeholder="E-mail" required />
                  </div>
                  <input name="company" className={field} placeholder="Bedrijf of website" />
                  <textarea name="message" className={`${field} min-h-[8rem] resize-none`} placeholder="Je bericht" required />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <BorderBeam rx={12} />
                    <span className="relative z-10">{isSubmitting ? 'Versturen…' : 'Verstuur bericht'}</span>
                    {!isSubmitting && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>}
                    <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </button>
                  {error && (
                    <p role="alert" className="font-sans text-sm text-red-600">{error}</p>
                  )}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  )
}
