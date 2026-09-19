import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { BrowserFrame, TemplatePreview } from '@/components/abonnement/TemplatePreview'
import { WEBSITE_TEMPLATES, type WebsiteTemplate } from '@/data/websiteTemplates'
import { PLAN_BY_SLUG, type WebsitePlanSlug } from '@/data/websitePlans'

/**
 * The template gallery: a portfolio, not a list. Filter by plan, a bigger look
 * per template in a lightbox, and from every card straight into the order flow.
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
    <div className="flex flex-wrap gap-1.5">
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
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-near-black/80 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Voorbeeld van template ${template.name}`}
    >
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <BrowserFrame domain={`${template.slug}.nl`}>
          <TemplatePreview
            layout={template.layout}
            palette={template.palette}
            className="block aspect-[4/3] w-full"
            title={`Voorbeeld van template ${template.name}`}
          />
        </BrowserFrame>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-display text-2xl font-semibold text-cream">{template.name}</h3>
            <p className="mt-1.5 max-w-md font-sans text-sm text-cream/60">{template.description}</p>
          </div>
          <div className="flex gap-3">
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
            Kies de look die bij je <Accent>bedrijf</Accent> past.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-near-black/60">
            Elk template is compleet: teksten, kleuren, foto's en je eigen logo worden erin gezet.
            Je ziet je site voordat hij live gaat.
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
                  aria-label={`Bekijk voorbeeld van template ${t.name}`}
                >
                  <BrowserFrame domain={`${t.slug}.nl`}>
                    <TemplatePreview
                      layout={t.layout}
                      palette={t.palette}
                      className="block aspect-[4/3] w-full"
                    />
                  </BrowserFrame>
                </button>

                <div className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                    <PlanBadges plans={t.plans} />
                  </div>
                  <p className="mt-2 font-sans text-sm text-near-black/50">{t.sector}</p>
                  <p className="mt-2 flex-1 font-sans text-base leading-relaxed text-near-black/65">
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
                      Bekijk voorbeeld
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-12 max-w-2xl font-sans text-sm leading-relaxed text-near-black/50">
            Staat jouw stijl er niet bij? Bij Pro ontwerpen we je site helemaal op maat, zonder
            template.
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
