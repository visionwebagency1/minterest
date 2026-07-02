import type { ComponentType } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { HERO_BG, HeroMWatermark } from '@/components/PageHero'
import { SERVICE_ICON_BY_SLUG } from '@/components/serviceIcons'
import { SUB_ICON_BY_SLUG } from '@/components/subServiceIcons'
import { Footer } from '@/sections/Footer'
import { SUB_RENDER_BY_KEY } from '@/sections/subServiceRenders'
import { SUB_BY_KEY, parentService, subsForService, type SubService } from '@/data/subServices'
import { subPath } from '@/data/services'
import { SiteContentProvider, useContent } from '@/content/SiteContent'
import { NotFound } from './NotFound'

/**
 * Shared, rich template for every sub-service landing page
 * (/diensten/:slug/:subslug). Modular blocks with one story line: hero ->
 * what it is -> service in action -> what you get -> why us -> approach ->
 * case -> faq -> sibling navigation -> CTA. No numbering anywhere.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function SubServiceRoute() {
  const { slug = '', subslug = '' } = useParams()
  const sub = SUB_BY_KEY[`${slug}/${subslug}`]
  if (!sub) return <NotFound />
  return (
    <SiteContentProvider page={`sub-${sub.serviceSlug}-${sub.slug}`}>
      <SubServicePage sub={sub} />
    </SiteContentProvider>
  )
}

function SubServicePage({ sub: base }: { sub: SubService }) {
  const c = useContent()
  // Override only the editable prose (tagline + story); the rest stays as-is.
  const sub: SubService = { ...base, tagline: c('tagline'), story: base.story.map((_, i) => c(`story.${i}`)) }
  const caseImage = c('caseImage')
  const parent = parentService(sub)
  const accent = parent?.accent ?? 'from-emerald to-mint'
  const Render = SUB_RENDER_BY_KEY[`${sub.serviceSlug}/${sub.slug}`] ?? parent?.Render
  const siblings = subsForService(sub.serviceSlug).filter((s) => s.slug !== sub.slug)

  return (
    <>
      <SubHero sub={sub} parentLabel={parent?.label ?? 'Diensten'} parentCta={sub.ctaButton ?? parent?.heroCta} />

      <div className="bg-cream text-near-black">
        {/* Wat het is — het verhaal */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                    Wat het is
                  </span>
                </div>
                <h2 className="mt-6 text-balance font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.06] tracking-tight">
                  {sub.whatTitle ?? (
                    <>
                      {sub.name}, <Accent>goed gedaan</Accent>.
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="space-y-5">
                {sub.story.map((p, i) => (
                  <p
                    key={i}
                    className={`font-sans leading-relaxed text-near-black/70 ${
                      i === 0 ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Dienst in actie */}
        <section className="bg-[#EAF4EC] py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  In actie
                </span>
              </div>
              <h2 className="mt-6 max-w-md text-balance font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.06] tracking-tight">
                {sub.actionTitle ?? (
                  <>
                    Zo ziet <Accent>{sub.name.toLowerCase()}</Accent> eruit.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                {sub.actionText ?? sub.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <SceneTile Render={Render} image={c('actionImage')} />
            </Reveal>
          </div>
        </section>

        {/* Wat je krijgt */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  Wat je krijgt
                </span>
              </div>
              <h2 className="mt-6 max-w-2xl text-balance font-display text-[clamp(1.8rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
                Concrete <Accent>deliverables</Accent>, geen vage beloftes.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {sub.deliverables.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05}>
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-emerald-deep/10 bg-white p-6 shadow-[0_16px_44px_rgba(1,63,64,0.06)]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald to-mint text-near-black">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold leading-tight">{d.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/60">{d.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Voor wie + waarom Minterest */}
        <section className="bg-[#EAF4EC] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                    Voor wie
                  </span>
                </div>
                <p className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.25] tracking-tight text-near-black">
                  {sub.audience}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  Waarom Minterest
                </span>
                <div className="mt-6 space-y-3">
                  {sub.why.map((w) => (
                    <div key={w.title} className="rounded-2xl border border-emerald-deep/10 bg-white p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald to-mint" />
                        <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                      </div>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/60">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Hoe we het aanpakken */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  Hoe we het aanpakken
                </span>
              </div>
              <h2 className="mt-6 max-w-2xl text-balance font-display text-[clamp(1.8rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
                {sub.approachTitle ?? (
                  <>
                    Een heldere <Accent>aanpak</Accent>, van start tot resultaat.
                  </>
                )}
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sub.approach.map((st, i) => {
                const Icon = APPROACH_ICONS[i % APPROACH_ICONS.length]
                return (
                  <Reveal key={st.title} delay={i * 0.06}>
                    <div className="relative h-full rounded-2xl border border-emerald-deep/10 bg-white p-6">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald/10 p-3 text-emerald ring-1 ring-emerald/15 [&>svg]:h-full [&>svg]:w-full">
                        <Icon />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold">{st.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case */}
        <section className="bg-[#EAF4EC] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  Case
                </span>
              </div>
            </Reveal>
            <div className="mt-8 grid items-stretch gap-8 md:grid-cols-2 md:gap-12">
              <Reveal>
                <div
                  className={`relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-8 shadow-[0_30px_70px_rgba(1,63,64,0.2)]`}
                >
                  <svg viewBox="6.5 6.5 56 31" className="pointer-events-none absolute -right-6 -top-8 h-3/4 opacity-[0.14]" aria-hidden="true">
                    <path d="M 61.09 25.2 C 59.24 27.59 54 34.36 52.44 36.37 C 52.19 36.7 51.8 36.89 51.38 36.89 L 45.6 36.89 C 44.48 36.89 43.84 35.6 44.53 34.71 C 47.48 30.9 53.39 23.27 55.43 20.63 C 55.8 20.14 55.8 19.46 55.43 18.98 L 54.05 17.2 C 53.52 16.5 52.46 16.5 51.92 17.2 C 48.07 22.18 40.31 32.2 37.09 36.37 C 36.83 36.7 36.44 36.89 36.02 36.89 L 28.31 36.89 C 27.19 36.89 26.55 35.59 27.25 34.71 L 34.14 25.8 C 34.52 25.31 34.52 24.63 34.14 24.14 L 32.06 21.45 C 31.52 20.75 30.46 20.75 29.93 21.45 L 18.38 36.36 C 18.12 36.7 17.73 36.89 17.31 36.89 L 9.6 36.89 C 8.48 36.89 7.85 35.59 8.54 34.7 L 25.43 12.89 C 25.97 12.19 27.02 12.19 27.56 12.89 C 29.64 15.57 32.72 19.55 34.79 22.21 C 35.32 22.91 36.38 22.91 36.92 22.21 L 47.43 8.64 C 47.97 7.94 49.02 7.94 49.56 8.64 C 53.11 13.22 57.65 19.08 61.1 23.54 C 61.48 24.02 61.48 24.71 61.1 25.2 Z" fill="#06140F" />
                  </svg>
                  {caseImage && (
                    <>
                      <img src={caseImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  )}
                  <span className={`relative z-10 font-sans text-xs uppercase tracking-[0.28em] ${caseImage ? 'text-cream/80' : 'text-near-black/60'}`}>{sub.case.sector}</span>
                  <span className={`relative z-10 mt-2 font-display text-3xl font-semibold md:text-4xl ${caseImage ? 'text-cream' : 'text-near-black'}`}>{sub.case.name}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="flex h-full flex-col justify-center">
                  <p className="font-sans text-lg leading-relaxed text-near-black/75">{sub.case.summary}</p>
                  <div className="mt-6 rounded-2xl border border-emerald/20 bg-white p-5">
                    <span className="font-sans text-xs uppercase tracking-[0.24em] text-emerald">Resultaat</span>
                    <p className="mt-2 font-sans leading-relaxed text-near-black/70">{sub.case.outcome}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Veelgestelde vragen</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {sub.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-emerald-deep/10 bg-white p-6">
                    <h3 className="font-display text-lg font-semibold leading-snug">{f.q}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-near-black/60">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sibling navigatie */}
        <section className="bg-[#EAF4EC] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                    Meer binnen {parent?.label ?? 'diensten'}
                  </span>
                  <h2 className="mt-3 text-balance font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-[1.08] tracking-tight">
                    Ontdek de andere diensten.
                  </h2>
                </div>
                <Link
                  to={`/diensten/${sub.serviceSlug}`}
                  className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-emerald-deep transition-colors duration-300 hover:text-emerald"
                >
                  Terug naar {parent?.label ?? 'hoofddienst'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s, i) => {
                const Icon = SUB_ICON_BY_SLUG[s.slug]
                return (
                  <Reveal key={s.slug} delay={i * 0.05}>
                    <Link
                      to={subPath(s.serviceSlug, s.name)}
                      className="group flex h-full items-center gap-4 rounded-2xl border border-emerald-deep/10 bg-white p-5 transition-all duration-300 hover:border-emerald/40 hover:shadow-[0_18px_44px_rgba(1,63,64,0.1)]"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald/10 p-3 text-emerald ring-1 ring-emerald/15 [&>svg]:h-full [&>svg]:w-full">
                        {Icon ? <Icon /> : null}
                      </span>
                      <span className="font-display text-lg font-semibold leading-tight">{s.name}</span>
                      <span className="ml-auto text-emerald opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true">&rarr;</span>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
          <Reveal>
            <div
              className="relative flex flex-col items-center gap-7 overflow-hidden rounded-3xl p-10 text-center text-cream md:p-16"
              style={{
                backgroundImage:
                  'radial-gradient(70% 90% at 50% 0%, rgba(66,194,140,0.32), transparent 60%), linear-gradient(160deg, #008081 0%, #013F40 55%, #06140F 100%)',
              }}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                {sub.ctaTitle ?? `Klaar voor ${sub.name.toLowerCase()}?`}
              </h2>
              <p className="max-w-md font-sans text-cream/70">
                {sub.ctaText ?? 'Vertel ons over je merk en je doel. We denken vrijblijvend met je mee.'}
              </p>
              <Link
                to="/start"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-mint to-lime-accent px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">{sub.ctaButton ?? parent?.heroCta ?? 'Start jouw project'}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function SubHero({ sub, parentLabel, parentCta }: { sub: SubService; parentLabel: string; parentCta?: string }) {
  const ParentIcon = SERVICE_ICON_BY_SLUG[sub.serviceSlug]
  return (
    <section
      className="relative overflow-hidden bg-near-black pt-36 pb-20 text-cream md:pt-48 md:pb-28"
      style={{ backgroundImage: HERO_BG }}
    >
      <HeroMWatermark />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-2 font-sans text-sm text-cream/55"
          aria-label="Kruimelpad"
        >
          <Link to="/diensten" className="transition-colors hover:text-cream">Diensten</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/diensten/${sub.serviceSlug}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-cream">
            {ParentIcon ? <span className="[&>svg]:h-4 [&>svg]:w-4 text-mint"><ParentIcon /></span> : null}
            {parentLabel}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cream/80">{sub.name}</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[1.0] tracking-tight text-cream"
        >
          {sub.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-cream/65"
        >
          {sub.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/start"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald to-mint px-4 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03] sm:flex-1 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="relative z-10">{parentCta ?? 'Start jouw project'}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <Link
            to={`/diensten/${sub.serviceSlug}`}
            className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-sans text-sm font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-mint/40 sm:flex-1 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="h-1.5 w-1.5 bg-lime-accent" />
            {parentLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Scene tile ───────────────────────── */

function SceneTile({ Render, image }: { Render?: ComponentType; image?: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_120px_rgba(1,63,64,0.25)] ring-1 ring-mint/10 lg:aspect-[4/3.4]">
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(155deg, #013F40 0%, #082321 52%, #05110F 100%)' }} />
      {image ? (
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <motion.div
            className="pointer-events-none absolute left-[18%] top-[8%] h-[64%] w-[64%] rounded-full bg-mint/20 blur-[90px]"
            animate={{ opacity: [0.32, 0.6, 0.32], scale: [0.9, 1.06, 0.9] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 grid place-items-center [&>*]:h-full [&>*]:w-full">
            {Render ? <Render /> : null}
          </div>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
    </div>
  )
}

/* ───────────────────────── Approach icons (geen nummers) ───────────────────────── */

function ApIco({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {d.split('|').map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  )
}

const APPROACH_ICONS = [
  () => <ApIco d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z|M12 8.5v3.5l2.5 2" />,
  () => <ApIco d="M6 3h8l4 4v14H6V3Z|M14 3v4h4M9 12h6M9 16h4" />,
  () => <ApIco d="M9 7 4 12l5 5M15 7l5 5-5 5" />,
  () => <ApIco d="M4 18 10 12l3.5 3.5L20 9|M15 9h5v5" />,
]
