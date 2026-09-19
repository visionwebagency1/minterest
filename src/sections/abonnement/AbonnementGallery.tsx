import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import {
  BrowserFrame,
  TemplateFullShot,
  TemplateShot,
  demoDomain,
} from '@/components/abonnement/TemplatePreview'
import { WEBSITE_TEMPLATES, type WebsiteTemplate } from '@/data/websiteTemplates'
import { PLAN_BY_SLUG, type WebsitePlanSlug } from '@/data/websitePlans'

/**
 * The template gallery. Every card is a screenshot of a page that really
 * exists, filled with the demo business for that sector, and the detail view
 * scrolls through the whole page so nothing is hidden above the fold.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Filter = 'alle' | WebsitePlanSlug

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'alle', label: 'Alle templates' },
  { key: 'start', label: 'Beschikbaar in Start' },
  { key: 'groei', label: 'Beschikbaar in Groei' },
]

function PlanBadges({ plans }: { plans: WebsitePlanSlug[] }) {
  return (
    <div className="flex shrink-0 flex-wrap gap-1.5">
      {plans.map((p) => (
        <span
          key={p}
          className="rounded-full border border-emerald/20 bg-emerald/5 px-2.5 py-0.5 font-sans text-[11px] font-semibold text-emerald-deep"
        >
          {PLAN_BY_SLUG[p].name}
        </span>
      ))}
    </div>
  )
}

function Lightbox({
  template,
  onClose,
  onChoose,
}: {
  template: WebsiteTemplate
  onClose: () => void
  onChoose: (t: WebsiteTemplate) => void
}) {
  // Escape closes, and the page behind should not scroll along.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-near-black/85 p-4 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Voorbeeldwebsite ${template.name}`}
    >
      <motion.div
        className="mx-auto w-full max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.22em] text-mint">
              {template.sector}
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-cream">{template.name}</h3>
            <p className="mt-1.5 max-w-lg font-sans text-sm text-cream/60">{template.layoutNote}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-5 py-3 font-sans text-sm font-medium text-cream/80 transition-colors hover:border-mint/40"
            >
              Sluiten
            </button>
            <button
              type="button"
              onClick={() => onChoose(template)}
              className="rounded-xl bg-gradient-to-r from-mint to-lime-accent px-6 py-3 font-sans text-sm font-semibold text-emerald-deep transition-transform hover:scale-[1.02]"
            >
              Kies dit template
            </button>
          </div>
        </div>

        {/* The whole page, scrollable inside its own window. */}
        <BrowserFrame domain={demoDomain(template)}>
          <div className="max-h-[72vh] overflow-y-auto overscroll-contain" data-lenis-prevent>
            <TemplateFullShot template={template} />
          </div>
        </BrowserFrame>

        <p className="mt-4 text-center font-sans text-xs text-cream/40">
          Voorbeeld met de gegevens van {template.demo.name} uit {template.demo.city}. Jouw teksten,
          foto&apos;s en kleuren komen hiervoor in de plaats.
        </p>
      </motion.div>
    </motion.div>
  )
}

export function AbonnementGallery({ onChoose }: { onChoose: (t: WebsiteTemplate) => void }) {
  const [filter, setFilter] = useState<Filter>('alle')
  const [preview, setPreview] = useState<WebsiteTemplate | null>(null)

  const templates =
    filter === 'alle' ? WEBSITE_TEMPLATES : WEBSITE_TEMPLATES.filter((t) => t.plans.includes(filter))

  return (
    <section id="templates" className="scroll-mt-24 bg-[#EAF4EC] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            De galerij
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.03] tracking-tight">
            Zes ontwerpen, elk voor een ander <Accent>vak</Accent>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-near-black/60">
            Geen zes kleurvarianten van dezelfde pagina. Een kapsalon heeft een prijslijst nodig, een
            installateur zijn telefoonnummer en een restaurant zijn openingstijden. Dat zie je terug
            in de opbouw. Klik op een template om de hele pagina te bekijken.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-300 ${
                  filter === f.key
                    ? 'bg-emerald-deep text-cream'
                    : 'border border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <Reveal key={t.slug} delay={0.05 * (i % 3)}>
              <article className="group flex h-full flex-col">
                <button
                  type="button"
                  onClick={() => setPreview(t)}
                  className="block overflow-hidden rounded-2xl text-left transition-transform duration-500 group-hover:-translate-y-1.5"
                  aria-label={`Bekijk de hele voorbeeldwebsite ${t.name}`}
                >
                  <BrowserFrame domain={demoDomain(t)}>
                    <TemplateShot template={t} />
                  </BrowserFrame>
                </button>

                <div className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                      <p className="mt-1 font-sans text-sm text-near-black/50">{t.sector}</p>
                    </div>
                    <PlanBadges plans={t.plans} />
                  </div>
                  <p className="mt-3 flex-1 font-sans text-base leading-relaxed text-near-black/65">
                    {t.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onChoose(t)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-5 py-2.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.02]"
                    >
                      Kies dit template
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreview(t)}
                      className="font-sans text-sm font-semibold text-emerald underline-offset-4 hover:underline"
                    >
                      Bekijk hele pagina
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-12 max-w-2xl font-sans text-sm leading-relaxed text-near-black/50">
            De voorbeelden zijn ingevuld met een verzonnen bedrijf per branche, zodat je ziet hoe een
            afgemaakte site eruitziet. Jouw teksten, foto&apos;s, kleuren en logo komen daarvoor in de
            plaats. Staat jouw stijl er niet bij, dan ontwerpen we bij Pro helemaal op maat.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {preview && (
          <Lightbox
            template={preview}
            onClose={() => setPreview(null)}
            onChoose={(t) => {
              setPreview(null)
              onChoose(t)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
