import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/sections/Footer'
import { BrowserFrame, TemplatePreview } from '@/components/abonnement/TemplatePreview'
import { HERO_BG } from '@/components/PageHero'
import {
  PLAN_BY_SLUG,
  WEBSITE_PLANS,
  WEBSITE_SUBSCRIPTION,
  type WebsitePlanSlug,
} from '@/data/websitePlans'
import { TEMPLATE_BY_SLUG, templatesForPlan } from '@/data/websiteTemplates'
import { ABONNEMENT_LEAD_SOURCE, resolveIds } from '@/lib/abonnementLead'
import { useLeadForm } from '@/lib/useLeadForm'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * The order flow: confirm the plan, pick a template, fill in your details, then
 * the summary and payment.
 *
 * The lead is saved the moment the details are submitted (step three), before
 * payment. Someone who drops out at the payment screen is still a lead in the
 * inbox, with the plan and template they had chosen.
 *
 * Pro is not sold through this flow: that is custom work and goes through the
 * contact block on the sales page.
 */

const STEPS = ['Je plan', 'Je template', 'Je gegevens', 'Samenvatting']

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

type DomainChoice = 'eigen' | 'nieuw'

interface Details {
  name: string
  email: string
  phone: string
  company: string
  domainChoice: DomainChoice
  domain: string
  message: string
}

const EMPTY: Details = {
  name: '',
  email: '',
  phone: '',
  company: '',
  domainChoice: 'eigen',
  domain: '',
  message: '',
}

function StepBar({ step }: { step: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {STEPS.map((label, i) => {
        const done = i < step
        const active = i === step
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex items-center gap-2 font-sans text-sm ${
                active ? 'text-cream' : done ? 'text-mint' : 'text-cream/40'
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full border text-[11px] font-semibold ${
                  active
                    ? 'border-mint bg-mint text-emerald-deep'
                    : done
                      ? 'border-mint/50 text-mint'
                      : 'border-white/20 text-cream/40'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="hidden h-px w-6 bg-white/15 sm:block" />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export function AbonnementBestellen() {
  const [params, setParams] = useSearchParams()

  const planParam = params.get('plan')
  const initialPlan: WebsitePlanSlug =
    planParam === 'groei' || planParam === 'start' ? planParam : 'start'

  const [plan, setPlan] = useState<WebsitePlanSlug>(initialPlan)
  const [template, setTemplate] = useState<string | null>(params.get('template'))
  const [details, setDetails] = useState<Details>(EMPTY)
  const [step, setStep] = useState(params.get('template') ? 2 : 0)
  const [paying, setPaying] = useState(false)

  const { isSubmitting, error, submit, isSuccess } = useLeadForm(ABONNEMENT_LEAD_SOURCE)

  // Een nieuwe stap begint bovenaan, anders kijk je halverwege een formulier
  // dat er niet meer is.
  useEffect(() => {
    lenisScrollTo(0, { duration: 0.6 })
  }, [step])

  const available = useMemo(() => templatesForPlan(plan), [plan])
  const chosenTemplate = template ? TEMPLATE_BY_SLUG[template] : null
  const planData = PLAN_BY_SLUG[plan]

  /** Keep the url in step with the choices, so the page can be shared or reloaded. */
  const sync = (next: { plan?: WebsitePlanSlug; template?: string | null }) => {
    const p = new URLSearchParams(params)
    if (next.plan) p.set('plan', next.plan)
    if (next.template === null) p.delete('template')
    else if (next.template) p.set('template', next.template)
    setParams(p, { replace: true })
  }

  const choosePlan = (slug: WebsitePlanSlug) => {
    setPlan(slug)
    // A template that the new plan does not offer cannot stay selected.
    if (template && !TEMPLATE_BY_SLUG[template]?.plans.includes(slug)) {
      setTemplate(null)
      sync({ plan: slug, template: null })
    } else {
      sync({ plan: slug })
    }
  }

  const chooseTemplate = (slug: string) => {
    setTemplate(slug)
    sync({ template: slug })
  }

  /** Step three: save the lead before anyone reaches the payment screen. */
  const submitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { planId, templateId } = await resolveIds(plan, template)
    await submit({
      name: details.name,
      email: details.email,
      phone: details.phone,
      company: details.company,
      message: details.message,
      desiredDomain: details.domain,
      domainChoice: details.domainChoice,
      plan,
      template,
      planId,
      templateId,
      interest: ['website-abonnement'],
    })
    setStep(3)
  }

  return (
    <>
      <section
        className="relative overflow-hidden bg-near-black pb-14 pt-32 text-cream md:pb-16 md:pt-40"
        style={{ backgroundImage: HERO_BG }}
      >
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <Link
            to={WEBSITE_SUBSCRIPTION.path}
            className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80 transition-colors hover:text-mint"
          >
            &larr; {WEBSITE_SUBSCRIPTION.name}
          </Link>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            Start je website
          </h1>
          <div className="mt-8">
            <StepBar step={step} />
          </div>
        </div>
      </section>

      <div className="bg-cream py-16 text-near-black md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          {/* ── Step 1: the plan ─────────────────────────────────────────── */}
          {step === 0 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Klopt dit plan?</h2>
              <p className="mt-2 font-sans text-base text-near-black/60">
                Je kunt hier nog wisselen. Upgraden kan later ook altijd.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {WEBSITE_PLANS.filter((p) => p.slug !== 'pro').map((p) => {
                  const active = p.slug === plan
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => choosePlan(p.slug)}
                      aria-pressed={active}
                      className={`rounded-2xl border p-6 text-left transition-colors ${
                        active
                          ? 'border-emerald bg-white shadow-[0_18px_50px_rgba(1,63,64,0.1)]'
                          : 'border-emerald-deep/10 bg-white/60 hover:border-emerald/40'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl font-semibold">{p.name}</span>
                        <span className="font-display text-lg font-semibold">
                          &euro; {p.price}
                          <span className="ml-1 font-sans text-xs font-medium text-near-black/50">
                            p/m
                          </span>
                        </span>
                      </div>
                      <p className="mt-2 font-sans text-sm text-near-black/60">{p.tagline}</p>
                    </button>
                  )
                })}
              </div>

              <p className="mt-6 font-sans text-sm text-near-black/50">
                Zoek je maatwerk of een webshop? Dat is Pro.{' '}
                <Link to={`${WEBSITE_SUBSCRIPTION.path}#contact`} className="font-semibold text-emerald underline-offset-4 hover:underline">
                  Vraag Pro aan
                </Link>
                .
              </p>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-7 py-3.5 font-sans text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
              >
                Verder naar je template
                <span aria-hidden="true">&rarr;</span>
              </button>
            </Reveal>
          )}

          {/* ── Step 2: the template ─────────────────────────────────────── */}
          {step === 1 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Kies je template</h2>
              <p className="mt-2 font-sans text-base text-near-black/60">
                Beschikbaar in {planData.name}. Teksten, kleuren en foto's worden hierin gezet.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {available.map((t) => {
                  const active = t.slug === template
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => chooseTemplate(t.slug)}
                      aria-pressed={active}
                      className={`rounded-2xl p-2 text-left transition-all ${
                        active ? 'bg-emerald/10 ring-2 ring-emerald' : 'hover:bg-white'
                      }`}
                    >
                      <BrowserFrame domain={`${t.slug}.nl`}>
                        <TemplatePreview
                          layout={t.layout}
                          palette={t.palette}
                          className="block aspect-[4/3] w-full"
                        />
                      </BrowserFrame>
                      <span className="mt-3 block px-1 font-display text-lg font-semibold">
                        {t.name}
                      </span>
                      <span className="block px-1 font-sans text-sm text-near-black/55">
                        {t.sector}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="rounded-xl border border-emerald-deep/15 px-6 py-3.5 font-sans text-sm font-semibold text-near-black/70 transition-colors hover:border-emerald/50"
                >
                  Terug
                </button>
                <button
                  type="button"
                  disabled={!template}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-7 py-3.5 font-sans text-sm font-semibold text-cream transition-transform hover:scale-[1.02] disabled:opacity-40"
                >
                  Verder naar je gegevens
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </Reveal>
          )}

          {/* ── Step 3: the details (this is where the lead is saved) ─────── */}
          {step === 2 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Je gegevens</h2>
              <p className="mt-2 font-sans text-base text-near-black/60">
                Hierna zie je de samenvatting. Je zit nog nergens aan vast.
              </p>

              <form onSubmit={submitDetails} className="mt-8 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">Naam</span>
                    <input
                      required
                      autoComplete="name"
                      className={field}
                      value={details.name}
                      onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">
                      Bedrijfsnaam
                    </span>
                    <input
                      required
                      autoComplete="organization"
                      className={field}
                      value={details.company}
                      onChange={(e) => setDetails({ ...details, company: e.target.value })}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">E-mail</span>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      className={field}
                      value={details.email}
                      onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">
                      Telefoon
                    </span>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      className={field}
                      value={details.phone}
                      onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    />
                  </label>
                </div>

                <fieldset className="grid gap-2">
                  <legend className="font-sans text-sm font-medium text-near-black/70">
                    Je domein
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { key: 'eigen', label: 'Ik heb al een domein' },
                        { key: 'nieuw', label: 'Regel er een voor mij' },
                      ] as { key: DomainChoice; label: string }[]
                    ).map((o) => (
                      <button
                        key={o.key}
                        type="button"
                        onClick={() => setDetails({ ...details, domainChoice: o.key })}
                        aria-pressed={details.domainChoice === o.key}
                        className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-colors ${
                          details.domainChoice === o.key
                            ? 'bg-emerald-deep text-cream'
                            : 'border border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <input
                    className={`${field} mt-1`}
                    placeholder={
                      details.domainChoice === 'eigen'
                        ? 'jouwbedrijf.nl'
                        : 'Welke naam zou je willen?'
                    }
                    value={details.domain}
                    onChange={(e) => setDetails({ ...details, domain: e.target.value })}
                  />
                </fieldset>

                <label className="grid gap-1.5">
                  <span className="font-sans text-sm font-medium text-near-black/70">
                    Iets wat we moeten weten? (optioneel)
                  </span>
                  <textarea
                    rows={3}
                    className={field}
                    value={details.message}
                    onChange={(e) => setDetails({ ...details, message: e.target.value })}
                  />
                </label>

                {error && (
                  <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-emerald-deep/15 px-6 py-3.5 font-sans text-sm font-semibold text-near-black/70 transition-colors hover:border-emerald/50"
                  >
                    Terug
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-7 py-3.5 font-sans text-sm font-semibold text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {isSubmitting ? 'Bezig...' : 'Naar de samenvatting'}
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </form>
            </Reveal>
          )}

          {/* ── Step 4: summary and payment ──────────────────────────────── */}
          {step === 3 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Je samenvatting</h2>
              <p className="mt-2 font-sans text-base text-near-black/60">
                {isSuccess
                  ? 'We hebben je aanvraag ontvangen. Rond je af met de eerste betaling, dan gaan wij bouwen.'
                  : 'Controleer je keuzes en rond af.'}
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <dl className="rounded-2xl border border-emerald-deep/10 bg-white p-7">
                  <div className="flex justify-between gap-4 border-b border-emerald-deep/5 py-3">
                    <dt className="font-sans text-sm text-near-black/55">Plan</dt>
                    <dd className="font-sans text-sm font-semibold">{planData.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-emerald-deep/5 py-3">
                    <dt className="font-sans text-sm text-near-black/55">Template</dt>
                    <dd className="font-sans text-sm font-semibold">
                      {chosenTemplate?.name ?? 'Nog niet gekozen'}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-emerald-deep/5 py-3">
                    <dt className="font-sans text-sm text-near-black/55">Domein</dt>
                    <dd className="font-sans text-sm font-semibold">
                      {details.domain || (details.domainChoice === 'nieuw' ? 'Wij regelen er een' : 'Nog niet bekend')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-emerald-deep/5 py-3">
                    <dt className="font-sans text-sm text-near-black/55">Op naam van</dt>
                    <dd className="font-sans text-sm font-semibold">
                      {details.company || details.name}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-4">
                    <dt className="font-sans text-sm text-near-black/55">Per maand</dt>
                    <dd className="font-display text-2xl font-semibold">
                      &euro; {planData.price}
                      <span className="ml-1 font-sans text-xs font-medium text-near-black/50">
                        excl. btw
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-col gap-4">
                  {chosenTemplate && (
                    <BrowserFrame domain={details.domain || `${chosenTemplate.slug}.nl`}>
                      <TemplatePreview
                        layout={chosenTemplate.layout}
                        palette={chosenTemplate.palette}
                        className="block aspect-[4/3] w-full"
                      />
                    </BrowserFrame>
                  )}

                  {paying ? (
                    <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-6">
                      <p className="font-display text-lg font-semibold text-emerald-deep">
                        Bijna klaar
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/65">
                        De automatische incasso staat nog niet aan. We nemen contact met je op om de
                        eerste betaling en de machtiging te regelen, daarna gaan we direct bouwen.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      /**
                       * TODO fase 3 (Mollie): hier een Mollie-customer aanmaken,
                       * een eerste iDEAL-betaling starten die het SEPA-mandaat
                       * vestigt, en daarna de subscription op het gekozen plan.
                       * De klant gaat dan naar de checkout-url van Mollie in
                       * plaats van naar dit bevestigingsblok.
                       */
                      onClick={() => setPaying(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-base font-semibold text-near-black transition-transform hover:scale-[1.02]"
                    >
                      Naar betalen
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="font-sans text-sm font-semibold text-emerald underline-offset-4 hover:underline"
                  >
                    Iets aanpassen
                  </button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
