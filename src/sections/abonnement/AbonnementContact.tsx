import { useEffect, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { useLeadForm } from '@/lib/useLeadForm'
import { ABONNEMENT_LEAD_SOURCE, resolveIds } from '@/lib/abonnementLead'
import { WEBSITE_PLANS, type WebsitePlanSlug } from '@/data/websitePlans'

/**
 * Direct contact. Every submit lands as a lead with the chosen plan, next to
 * WhatsApp, phone and email for the visitor who would rather just ask.
 */

const PHONE = '+31657691672'
const PHONE_LABEL = '+31 6 57 69 16 72'
const WHATSAPP = 'https://wa.me/31657691672'
const EMAIL = 'info@minterest.nl'

const field =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black placeholder:text-near-black/35 outline-none transition-colors focus:border-emerald'

export function AbonnementContact({ initialPlan }: { initialPlan?: WebsitePlanSlug | '' }) {
  const { isSubmitting, isSuccess, error, submit } = useLeadForm(ABONNEMENT_LEAD_SOURCE)
  const [plan, setPlan] = useState<WebsitePlanSlug | ''>(initialPlan ?? '')

  // "Vraag Pro aan" scrolt hierheen en zet het plan alvast goed. Dat gebeurt na
  // de eerste render, dus de keuze moet meebewegen met de prop.
  useEffect(() => {
    if (initialPlan) setPlan(initialPlan)
  }, [initialPlan])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const planSlug = (fd.get('plan') as string) || null
    const { planId } = await resolveIds(planSlug)

    await submit({
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      company: fd.get('company'),
      message: fd.get('message'),
      plan: planSlug,
      planId,
      interest: ['website-abonnement'],
    })
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-cream py-28 text-near-black md:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        <div>
          <Reveal>
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
              Direct contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
              Even <Accent>overleggen</Accent> eerst?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
              Niet zeker welk plan past, of twijfel je tussen een abonnement en maatwerk? Stel je
              vraag, we denken vrijblijvend mee.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3">
              <a
                href={WHATSAPP}
                className="inline-flex w-fit items-center gap-3 rounded-xl bg-emerald-deep px-5 py-3 font-sans text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm4.4 12.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5L9.3 8.1c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.8-.9 1.7-.6 2.9.5 1.9 1.8 3.4 3.7 4.4 1.7.9 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1Z" />
                </svg>
                WhatsApp ons
              </a>
              <a
                href={`tel:${PHONE}`}
                className="font-sans text-lg text-near-black transition-colors hover:text-emerald"
              >
                {PHONE_LABEL}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="font-sans text-lg text-near-black transition-colors hover:text-emerald"
              >
                {EMAIL}
              </a>
              <span className="mt-1 font-sans text-sm text-near-black/50">
                Op werkdagen reageren we binnen een dag.
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_24px_60px_rgba(1,63,64,0.1)] md:p-10"
          >
            {isSuccess ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <span className="font-accent text-3xl italic text-emerald">Bericht ontvangen</span>
                <p className="mt-4 max-w-xs font-sans text-sm text-near-black/60">
                  We nemen snel contact met je op, meestal dezelfde werkdag nog.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">Naam</span>
                    <input name="name" required autoComplete="name" className={field} placeholder="Je naam" />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">Bedrijf</span>
                    <input name="company" autoComplete="organization" className={field} placeholder="Je bedrijfsnaam" />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">E-mail</span>
                    <input name="email" type="email" required autoComplete="email" className={field} placeholder="jij@bedrijf.nl" />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="font-sans text-sm font-medium text-near-black/70">Telefoon</span>
                    <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="06 12 34 56 78" />
                  </label>
                </div>

                <label className="grid gap-1.5">
                  <span className="font-sans text-sm font-medium text-near-black/70">
                    Welk plan heeft je interesse?
                  </span>
                  <select
                    name="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as WebsitePlanSlug | '')}
                    className={field}
                  >
                    <option value="">Weet ik nog niet</option>
                    {WEBSITE_PLANS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} ({p.from ? 'vanaf ' : ''}&euro; {p.price} p/m)
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1.5">
                  <span className="font-sans text-sm font-medium text-near-black/70">Bericht</span>
                  <textarea name="message" rows={4} className={field} placeholder="Waar kunnen we je mee helpen?" />
                </label>

                {error && (
                  <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-6 py-3.5 font-sans text-sm font-semibold text-near-black transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
                >
                  {isSubmitting ? 'Versturen...' : 'Verstuur je vraag'}
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
