import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '@/sections/Footer'
import { AbonnementHero } from '@/sections/abonnement/AbonnementHero'
import { AbonnementSteps } from '@/sections/abonnement/AbonnementSteps'
import { AbonnementPlans } from '@/sections/abonnement/AbonnementPlans'
import { AbonnementGallery } from '@/sections/abonnement/AbonnementGallery'
import { AbonnementWhy } from '@/sections/abonnement/AbonnementWhy'
import { AbonnementFaq } from '@/sections/abonnement/AbonnementFaq'
import { AbonnementContact } from '@/sections/abonnement/AbonnementContact'
import { AbonnementCta } from '@/sections/abonnement/AbonnementCta'
import { AbonnementAlt } from '@/components/abonnement/AbonnementAlt'
import { WEBSITE_SUBSCRIPTION, type WebsitePlan, type WebsitePlanSlug } from '@/data/websitePlans'
import type { WebsiteTemplate } from '@/data/websiteTemplates'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * /website-abonnement — the sales page for the website subscription.
 *
 * Deliberately NOT part of /diensten/web-development: that service is custom
 * work, quoted per project. This is a finished website on a monthly plan. Two
 * different promises, two different prices, two different paths, so they get
 * their own page, their own name and their own route.
 */
export function WebsiteAbonnement() {
  const navigate = useNavigate()
  /** Pre-selects the plan in the contact form when someone asks about Pro. */
  const [contactPlan, setContactPlan] = useState<WebsitePlanSlug | ''>('')

  const scrollTo = (id: string) => lenisScrollTo(`#${id}`, { offset: -70 })

  /** Start and Groei go into the order flow. Pro is custom, so it goes to contact. */
  const handlePlan = (plan: WebsitePlan) => {
    if (plan.slug === 'pro') {
      setContactPlan('pro')
      scrollTo('contact')
      return
    }
    navigate(`${WEBSITE_SUBSCRIPTION.path}/bestellen?plan=${plan.slug}`)
  }

  const handleTemplate = (template: WebsiteTemplate) => {
    // Pick a plan the template is actually available on.
    const plan = template.plans.includes('start') ? 'start' : template.plans[0]
    navigate(`${WEBSITE_SUBSCRIPTION.path}/bestellen?plan=${plan}&template=${template.slug}`)
  }

  return (
    <>
      <AbonnementHero />
      <AbonnementSteps />
      <AbonnementPlans onChoose={handlePlan} />
      <AbonnementGallery onChoose={handleTemplate} />
      <AbonnementWhy />
      <AbonnementFaq />
      {/* The bridge back to custom work, for whoever needs more than a template. */}
      <div className="bg-cream pt-4">
        <AbonnementAlt variant="naar-maatwerk" />
      </div>
      <AbonnementContact initialPlan={contactPlan} />
      <AbonnementCta onStart={() => scrollTo('plannen')} />
      <Footer />
    </>
  )
}
