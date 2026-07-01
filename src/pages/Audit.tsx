import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { useLeadForm } from '@/lib/useLeadForm'
import { SiteContentProvider, useContent } from '@/content/SiteContent'

const STEP_NUMS = ['01', '02', '03']

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-5 py-4 font-sans text-base text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

export function Audit() {
  return (
    <SiteContentProvider page="website-audit">
      <AuditInner />
    </SiteContentProvider>
  )
}

function AuditInner() {
  const c = useContent()
  const [url, setUrl] = useState('')
  const { isSubmitting, isSuccess, error, submit } = useLeadForm('audit')
  const CHECKS = Array.from({ length: 6 }, (_, i) => ({ title: c(`check.${i}.title`), desc: c(`check.${i}.desc`) }))
  const STEPS = STEP_NUMS.map((no, i) => ({ no, title: c(`step.${i}.title`), desc: c(`step.${i}.desc`) }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    submit({ url, email: fd.get('email') })
  }

  return (
    <>
      <PageHero
        kicker={c('hero.kicker')}
        title={
          <>
            {c('hero.titlePre')}<Accent>{c('hero.titleAccent')}</Accent>
          </>
        }
        tagline={c('hero.tagline')}
      />

      <div className="bg-cream text-near-black">
        {/* the hook */}
        <section className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(1,63,64,0.1)] md:p-10"
            >
              {isSuccess ? (
                <div className="flex min-h-[14rem] flex-col items-center justify-center text-center">
                  <span className="font-accent text-3xl italic text-emerald">{c('form.successTitle')}</span>
                  <p className="mt-4 max-w-sm font-sans text-base text-near-black/60">
                    {c('form.successText')}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <label className="font-display text-lg font-semibold">{c('form.label')}</label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="jouwwebsite.nl"
                    className={field}
                    required
                  />
                  <input name="email" type="email" placeholder="E-mail voor je rapport" className={field} required />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <BorderBeam rx={12} />
                    <span className="relative z-10">{isSubmitting ? 'Versturen…' : c('form.submit')}</span>
                    {!isSubmitting && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>}
                    <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </button>
                  {error && (
                    <p role="alert" className="text-center font-sans text-sm text-red-600">{error}</p>
                  )}
                  <p className="text-center font-sans text-xs uppercase tracking-[0.2em] text-near-black/40">
                    {c('form.fineprint')}
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </section>

        {/* what you get */}
        <section className="bg-[#EAF4EC] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">{c('get.eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.04]">
                {c('get.headingPre')}<Accent>{c('get.headingAccent')}</Accent>{c('get.headingPost')}
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKS.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={(i % 3) * 0.06}
                  className="rounded-2xl border border-emerald-deep/10 bg-white p-7 shadow-[0_18px_50px_rgba(1,63,64,0.08)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17 19 7" /></svg>
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/60">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{c('how.heading')}</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map((st, i) => (
              <Reveal key={st.no} delay={i * 0.08}>
                <span className="font-accent text-3xl italic text-emerald">{st.no}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{st.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{st.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* final CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal>
            <div
              className="flex flex-col items-center gap-7 rounded-3xl p-10 text-center text-cream md:p-16"
              style={{ backgroundImage: 'radial-gradient(70% 90% at 50% 0%, rgba(66,194,140,0.32), transparent 60%), linear-gradient(160deg, #013F40 0%, #0A3A38 100%)' }}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                {c('finalCta.headingPre')}<Accent>{c('finalCta.headingAccent')}</Accent>
              </h2>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-emerald-deep px-8 py-4 font-sans text-base font-semibold text-cream shadow-lg shadow-emerald/40 transition-transform duration-300 hover:scale-[1.03]"
              >
                <BorderBeam rx={12} />
                <span className="relative z-10">{c('finalCta.button')}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </a>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  )
}
