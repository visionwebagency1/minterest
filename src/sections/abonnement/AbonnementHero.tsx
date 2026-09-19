import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Accent } from '@/components/Accent'
import { HERO_BG, HeroMWatermark } from '@/components/PageHero'
import { BrowserFrame, TemplateShot, demoDomain } from '@/components/abonnement/TemplatePreview'
import { WEBSITE_TEMPLATES } from '@/data/websiteTemplates'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * Hero of the website subscription page: the promise on the left, what you
 * actually get on the right. The stack of browser windows cycles through the gallery, so within a
 * few seconds a visitor has seen that these are finished, different websites.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const CYCLE_MS = 4200

const TRUST = ['Geen opstartkosten', 'Maandelijks opzegbaar', 'Live binnen 10 werkdagen']

/** Scroll to a section on this page, clearing the fixed header. */
export function scrollToSection(id: string) {
  lenisScrollTo(`#${id}`, { offset: -70 })
}

function TemplateStack() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  /** Stop cycling once someone picks a template themselves. */
  const [paused, setPaused] = useState(false)
  const template = WEBSITE_TEMPLATES[index]

  useEffect(() => {
    if (reduce || paused) return
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % WEBSITE_TEMPLATES.length),
      CYCLE_MS,
    )
    return () => window.clearInterval(id)
  }, [reduce, paused])

  return (
    <div className="relative">
      {/* Two quiet frames behind the front one: a gallery, not a single site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 -top-9 hidden h-full w-full rotate-[4deg] scale-[0.94] opacity-40 sm:block"
      >
        <BrowserFrame domain="">
          <TemplateShot template={WEBSITE_TEMPLATES[(index + 1) % WEBSITE_TEMPLATES.length]} />
        </BrowserFrame>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-7 hidden h-full w-full -rotate-[5deg] scale-[0.9] opacity-25 sm:block"
      >
        <BrowserFrame domain="">
          <TemplateShot template={WEBSITE_TEMPLATES[(index + 2) % WEBSITE_TEMPLATES.length]} />
        </BrowserFrame>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="relative"
      >
        <BrowserFrame domain={demoDomain(template)} className="ring-1 ring-mint/15">
          <div className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="sync">
              <motion.div
                key={template.slug}
                initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <TemplateShot template={template} className="h-full" eager={index === 0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </BrowserFrame>
      </motion.div>

      {/* Name of what you are looking at, plus manual control. */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-sans text-sm text-cream/60">
          <span className="font-semibold text-cream">{template.name}</span>
          <span className="mx-2 text-cream/25">·</span>
          {template.sector}
        </p>
        <div className="flex items-center gap-1.5">
          {WEBSITE_TEMPLATES.map((t, i) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => {
                setIndex(i)
                setPaused(true)
              }}
              aria-label={`Bekijk template ${t.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-lime-accent' : 'w-1.5 bg-cream/25 hover:bg-cream/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AbonnementHero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  })

  return (
    <section
      className="relative overflow-hidden bg-near-black pb-20 pt-36 text-cream md:pb-28 md:pt-44"
      style={{ backgroundImage: HERO_BG }}
    >
      <HeroMWatermark />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.span
              {...rise(0)}
              className="block font-sans text-xs uppercase tracking-[0.28em] text-mint/80"
            >
              Website Abonnement
            </motion.span>

            <motion.h1
              {...rise(0.08)}
              className="mt-7 max-w-2xl text-balance font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight"
            >
              Een professionele website vanaf{' '}
              <span className="whitespace-nowrap">
                <Accent>€ 30</Accent>
              </span>{' '}
              per maand.
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-cream/65"
            >
              Ontwerp, eigen domein, hosting, SSL en onderhoud: wij regelen alles. Jij kiest een
              template, wij zetten hem live.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('plannen')}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 sm:w-auto font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Bekijk de plannen</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('templates')}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-4 sm:w-auto font-sans text-base font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-mint/40"
              >
                <span className="h-1.5 w-1.5 bg-lime-accent" />
                Bekijk templates
              </button>
            </motion.div>

            <motion.ul {...rise(0.32)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 font-sans text-sm text-cream/60">
                  <svg
                    className="h-4 w-4 shrink-0 text-lime-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5 10 17 19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <TemplateStack />
        </div>
      </div>
    </section>
  )
}
