import { Footer } from '@/sections/Footer'
import { WebsitesHero } from '@/sections/websites/WebsitesHero'
import { WebsitesPlans } from '@/sections/websites/WebsitesPlans'
import type { WebsitePlan } from '@/data/websitePlans'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * /websites — the sales page for the website subscription (Minterest Websites).
 *
 * Built in order: hero and plans first, then how-it-works, the template gallery,
 * why Minterest, FAQ, contact and the closing call to action, and finally the
 * order flow. Sections land here as they are finished.
 */
export function Websites() {
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
      <WebsitesHero />
      <WebsitesPlans onChoose={handleChoose} />
      <Footer />
    </>
  )
}
