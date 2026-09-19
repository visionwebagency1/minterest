import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import {
  PLAN_COMPARISON,
  PLAN_TERMS,
  WEBSITE_PLANS,
  type CompareRow,
  type WebsitePlan,
  type WebsitePlanSlug,
} from '@/data/websitePlans'

/**
 * The three plans, laid out as a climb: Start sits lowest, Pro highest, so the
 * section reads as levels you move up through instead of a row of equal boxes.
 * Groei is the recommended one and carries the dark fill.
 */

/** Vertical offset per plan on desktop. This is the climb. */
const LIFT: Record<WebsitePlanSlug, string> = {
  start: 'lg:mt-16',
  groei: 'lg:mt-8',
  pro: 'lg:mt-0',
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className}`}
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
  )
}

function PlanCard({ plan, onChoose }: { plan: WebsitePlan; onChoose: (p: WebsitePlan) => void }) {
  const dark = Boolean(plan.popular)

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-9 ${LIFT[plan.slug]} ${
        dark
          ? 'border-emerald bg-emerald-deep text-cream shadow-[0_30px_80px_rgba(1,63,64,0.3)]'
          : 'border-emerald-deep/10 bg-white text-near-black shadow-[0_18px_50px_rgba(1,63,64,0.08)]'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-8 rounded-full bg-lime-bright px-3 py-1 font-sans text-xs font-semibold text-emerald-deep">
          Aanbevolen
        </span>
      )}

      <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
      <p className={`mt-2 font-sans text-sm ${dark ? 'text-cream/70' : 'text-near-black/55'}`}>
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        {plan.from && (
          <span className={`font-sans text-sm ${dark ? 'text-cream/60' : 'text-near-black/50'}`}>
            vanaf
          </span>
        )}
        <span className="font-display text-4xl font-semibold">&euro; {plan.price}</span>
        <span className={`font-sans text-sm ${dark ? 'text-cream/60' : 'text-near-black/50'}`}>
          p/m
        </span>
      </div>
      <p className={`mt-1 font-sans text-xs ${dark ? 'text-cream/45' : 'text-near-black/40'}`}>
        Excl. btw. Geen opstartkosten.
      </p>

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-sans text-sm">
            <Check className={`mt-0.5 ${dark ? 'text-lime-bright' : 'text-emerald'}`} />
            <span className={dark ? 'text-cream/85' : 'text-near-black/70'}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChoose(plan)}
        className={`mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] ${
          dark
            ? 'bg-gradient-to-r from-mint to-lime-accent text-emerald-deep'
            : 'bg-emerald-deep text-cream'
        }`}
      >
        {plan.cta}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  )
}

/** A comparison cell: a check, a dash, or a short piece of text. */
function Cell({ value }: { value: CompareRow['start'] }) {
  if (value === true) {
    return (
      <span className="inline-flex" aria-label="Inbegrepen">
        <Check className="text-emerald" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="font-sans text-near-black/25" aria-label="Niet inbegrepen">
        &ndash;
      </span>
    )
  }
  return <span className="font-sans text-sm text-near-black/70">{value}</span>
}

export function AbonnementPlans({ onChoose }: { onChoose: (plan: WebsitePlan) => void }) {
  return (
    <section id="plannen" className="relative scroll-mt-24 bg-[#EAF4EC] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            De plannen
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.03] tracking-tight">
            Kies het niveau dat bij je <Accent>past</Accent>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-near-black/60">
            Elk plan is maandelijks opzegbaar en zonder opstartkosten. Je kunt altijd upgraden, je
            website blijft gewoon staan.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
          {WEBSITE_PLANS.map((plan, i) => (
            <Reveal key={plan.slug} delay={0.08 * i}>
              <PlanCard plan={plan} onChoose={onChoose} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {PLAN_TERMS.map((t) => (
              <li key={t} className="flex items-center gap-2 font-sans text-sm text-near-black/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Full comparison. Scrolls sideways on a phone instead of shrinking. */}
        <Reveal delay={0.05}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_18px_50px_rgba(1,63,64,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">Vergelijking van de plannen Start, Groei en Pro</caption>
                <thead>
                  <tr className="border-b border-emerald-deep/10">
                    <th scope="col" className="px-6 py-5 font-sans text-xs uppercase tracking-[0.18em] text-near-black/45">
                      Wat je krijgt
                    </th>
                    {WEBSITE_PLANS.map((p) => (
                      <th
                        key={p.slug}
                        scope="col"
                        className={`px-6 py-5 font-display text-base font-semibold ${
                          p.popular ? 'text-emerald' : 'text-near-black'
                        }`}
                      >
                        {p.name}
                        <span className="ml-2 font-sans text-xs font-medium text-near-black/45">
                          {p.from ? 'vanaf ' : ''}&euro; {p.price} p/m
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLAN_COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-emerald-deep/5 last:border-0">
                      <th scope="row" className="px-6 py-4 font-sans text-sm font-medium text-near-black/75">
                        {row.label}
                      </th>
                      <td className="px-6 py-4"><Cell value={row.start} /></td>
                      <td className="bg-emerald/[0.04] px-6 py-4"><Cell value={row.groei} /></td>
                      <td className="px-6 py-4"><Cell value={row.pro} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
