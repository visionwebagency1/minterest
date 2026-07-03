import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { SERVICE_OPTIONS } from '@/components/serviceIcons'
import { useLeadForm } from '@/lib/useLeadForm'
import { SiteContentProvider, useContent } from '@/content/SiteContent'

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

export function Start() {
  return (
    <SiteContentProvider page="start">
      <StartInner />
    </SiteContentProvider>
  )
}

function StartInner() {
  const c = useContent()
  const [picked, setPicked] = useState<string[]>([])
  const { isSubmitting, isSuccess, error, submit } = useLeadForm('start')
  const WHY = Array.from({ length: 3 }, (_, i) => ({ title: c(`why.${i}.title`), desc: c(`why.${i}.desc`) }))

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
      message: fd.get('message'),
    })
  }

  return (
    <>
      <PageHero
        kicker={c('hero.kicker')}
        title={
          <>
            {c('hero.titlePre')}<Accent>{c('hero.titleAccent')}</Accent>{c('hero.titlePost')}
          </>
        }
        tagline={c('hero.tagline')}
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(1,63,64,0.1)] md:p-12"
            >
              {isSuccess ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="font-accent text-4xl italic text-emerald">{c('form.successTitle')}</span>
                  <p className="mt-4 max-w-sm font-sans text-base text-near-black/60">
                    {c('form.successText')}
                  </p>
                </div>
              ) : (
                <>
                  {/* service picker */}
                  <label className="font-display text-lg font-semibold">{c('form.pickLabel')}</label>
                  <p className="mt-1 font-sans text-sm text-near-black/50">{c('form.pickHint')}</p>
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
                              ? 'border-emerald bg-emerald/10 shadow-[0_0_0_1px_rgba(0,128,129,0.4)]'
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
                    <textarea name="message" className={`${field} min-h-[7rem] resize-none`} placeholder="Vertel kort over je project" required />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                    >
                      <BorderBeam rx={12} />
                      <span className="relative z-10">{isSubmitting ? 'Versturen…' : c('form.submit')}</span>
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
        <section className="bg-[#EAF4EC] py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal delay={0.05}>
              <h2 className="text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight">
                {c('trust.headingPre')}<Accent>{c('trust.headingAccent')}</Accent>{c('trust.headingPost')}
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
          style={{ backgroundImage: 'radial-gradient(60% 60% at 25% 0%, rgba(66,194,140,0.25), transparent 60%), linear-gradient(160deg, #013F40 0%, #071311 100%)' }}
        >
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <Reveal>
              <blockquote className="text-balance font-display text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.15] text-cream">
                {c('review.quote')}
              </blockquote>
            </Reveal>
            <div className="mt-8 font-sans text-sm text-cream/60">
              <span className="font-semibold text-cream">{c('review.name')}</span> · {c('review.company')}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
