import { Footer } from '@/sections/Footer'
import { AbonnementHero } from '@/sections/abonnement/AbonnementHero'
import { AbonnementPlans } from '@/sections/abonnement/AbonnementPlans'
import type { WebsitePlan } from '@/data/websitePlans'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * /website-abonnement — the sales page for the website subscription.
 *
 * Deliberately NOT part of /diensten/web-development: that service is custom
 * work, quoted per project. This is a finished website on a monthly plan. Two
 * different promises, two different prices, two different paths, so they get
 * their own page, their own name and their own route.
 *
 * Built in order: hero and plans first, then how-it-works, the template gallery,
 * why Minterest, FAQ, contact and the closing call to action, and finally the
 * order flow. Sections land here as they are finished.
 */
export function WebsiteAbonnement() {
  /**
   * Choosing a plan starts the order flow. Step two of that flow is the template
   * choice, so for Start and Groei we move straight to the gallery. Pro is custom
   * work and goes to the contact block with the plan pre-filled.
   */
  const handleChoose = (plan: WebsitePlan) => {
    const id = plan.slug === 'pro' ? 'contact' : 'templates'
    if (document.getElementById(id)) lenisScrollTo(`#${id}`, { offset: -70 })
  }

  return (
    <>
      <AbonnementHero />
      <AbonnementPlans onChoose={handleChoose} />
      <Footer />
    </>
  )
}
