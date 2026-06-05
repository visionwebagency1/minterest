import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { SERVICE_OPTIONS } from '@/components/serviceIcons'
import { useLeadForm } from '@/lib/useLeadForm'

const BUDGETS = ['Nog niet zeker', 'Tot € 1.000', '€ 1.000 tot € 5.000', '€ 5.000 tot € 15.000', '€ 15.000+']
const TIMELINES = ['Zo snel mogelijk', 'Binnen 1 maand', '1 tot 3 maanden', 'Later dit jaar']

const WHY = [
  { title: 'Eén team, geen overdrachten', desc: 'Strategie, design, build en groei aan dezelfde tafel.' },
  { title: 'Heldere prijzen', desc: 'Vooraf weten waar je aan toe bent. Geen verrassingen.' },
  { title: 'Snel van start', desc: 'Binnen een week na de kennismaking liggen de eerste plannen er.' },
]

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

export function Start() {
  const [picked, setPicked] = useState<string[]>([])
  const { isSubmitting, isSuccess, error, submit } = useLeadForm('start')

  const toggle = (key: string) =>
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    submit({
      services: picked,
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company'),
      budget: fd.get('budget'),
      timeline: fd.get('timeline'),
      message: fd.get('message'),
    })
  }

  return (
    <>
      <PageHero
        kicker="Start jouw project"
        title={
          <>
            Laten we iets <Accent>moois</Accent> bouwen.
          </>
        }
        tagline="Vertel ons waar je staat en waar je heen wil. Binnen twee werkdagen plannen we een vrijblijvend gesprek met een eerste plan."
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(15,92,77,0.1)] md:p-12"
            >
              {isSuccess ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="font-accent text-4xl italic text-emerald">Top, bedankt!</span>
                  <p className="mt-4 max-w-sm font-sans text-base text-near-black/60">
                    We hebben je aanvraag binnen. Je hoort binnen twee werkdagen van ons met een eerste plan.
                  </p>
                </div>
              ) : (
                <>
                  {/* service picker */}
                  <label className="font-display text-lg font-semibold">Waar kunnen we mee helpen?</label>
                  <p className="mt-1 font-sans text-sm text-near-black/50">Kies één of meer diensten.</p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((s) => {
                      const { Icon } = s
                      const active = picked.includes(s.key)
                      return (
                        <button
                          type="button"
                          key={s.key}
                          onClick={() => toggle(s.key)}
                          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                            active
                              ? 'border-emerald bg-emerald/10 shadow-[0_0_0_1px_rgba(31,166,122,0.4)]'
                              : 'border-emerald-deep/12 bg-white hover:border-emerald/40'
                          }`}
                        >
                          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${active ? 'bg-emerald text-cream' : 'bg-emerald/10 text-emerald'}`}>
                            <Icon />
                          </span>
                          <span className="font-sans text-sm font-semibold text-near-black">{s.label}</span>
                          <span className={`ml-auto grid h-5 w-5 place-items-center rounded-full border transition-colors ${active ? 'border-emerald bg-emerald text-cream' : 'border-emerald-deep/20 text-transparent'}`}>
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17 19 7" /></svg>
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* details */}
                  <div className="mt-8 flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input name="name" className={field} placeholder="Naam" required />
                      <input name="email" className={field} type="email" placeholder="E-mail" required />
                    </div>
                    <input name="company" className={field} placeholder="Bedrijf of website" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <select name="budget" className={`${field} appearance-none`} defaultValue="">
                        <option value="" disabled>Budget</option>
                        {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                      <select name="timeline" className={`${field} appearance-none`} defaultValue="">
                        <option value="" disabled>Tijdlijn</option>
                        {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <textarea name="message" className={`${field} min-h-[7rem] resize-none`} placeholder="Vertel kort over je project" required />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                    >
                      <BorderBeam rx={12} />
                      <span className="relative z-10">{isSubmitting ? 'Versturen…' : 'Verstuur aanvraag'}</span>
                      {!isSubmitting && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>}
                      <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    </button>
                    {error && (
                      <p role="alert" className="font-sans text-sm text-red-600">{error}</p>
                    )}
                  </div>
                </>
              )}
            </form>
          </Reveal>
        </div>

        {/* trust */}
        <section className="bg-[#EEF1E7] py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal delay={0.05}>
              <h2 className="text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight">
                Waarom met ons <Accent>starten</Accent>.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
              {WHY.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.08}>
                  <span className="font-accent text-3xl italic text-emerald">{`0${i + 1}`}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
                  <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{w.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* review */}
        <section
          className="relative overflow-hidden py-24 text-cream md:py-28"
          style={{ backgroundImage: 'radial-gradient(60% 60% at 25% 0%, rgba(79,216,155,0.25), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #08120F 100%)' }}
        >
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <Reveal>
              <blockquote className="text-balance font-display text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.15] text-cream">
                Van eerste mail tot live in vier weken. Strak geregeld en het resultaat overtrof de verwachting.
              </blockquote>
            </Reveal>
            <div className="mt-8 font-sans text-sm text-cream/60">
              <span className="font-semibold text-cream">Mark Jansen</span> · Ascend Labs
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
