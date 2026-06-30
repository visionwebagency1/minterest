import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useScrollSetup } from '@/lib/useLenis'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Header } from '@/components/Header'
import { RouteTransition } from '@/components/RouteTransition'
import { Home } from '@/sections/Home'
import { Services } from '@/pages/Services'
import { ServiceRoute } from '@/pages/ServicePage'
import { SubServiceRoute } from '@/pages/SubServicePage'
import { Work } from '@/pages/Work'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Start } from '@/pages/Start'
import { Audit } from '@/pages/Audit'
import { Terms } from '@/pages/Terms'
import { NotFound } from '@/pages/NotFound'

// The admin panel is fully separated: lazy-loaded so the public site never
// bundles Supabase or the admin code, and rendered without the marketing chrome.
const AdminApp = lazy(() => import('@/admin/AdminApp'))

// The public online quote view (/offerte/:token): standalone, no marketing
// chrome. Lazy-loaded; talks to Supabase only via token-keyed REST calls.
const PublicQuote = lazy(() => import('@/pages/PublicQuote').then((m) => ({ default: m.PublicQuote })))
const PublicInvoice = lazy(() => import('@/pages/PublicInvoice').then((m) => ({ default: m.PublicInvoice })))

/** The public marketing website: smooth scroll, grain, header and page transitions. */
function PublicSite() {
  // Lenis smooth scroll + ScrollTrigger refresh on font/asset load (public only).
  useScrollSetup()

  return (
    <>
      {/* No preloader: the site loads straight into the hero. */}
      <GrainOverlay />
      <Header />

      <RouteTransition>
        {(location) => (
          <Routes location={location}>
            <Route path="/" element={<Home />} />

            {/* Services: overview hub + the 6 main-service landing pages. */}
            <Route path="/diensten" element={<Services />} />
            <Route path="/diensten/:slug" element={<ServiceRoute />} />
            <Route path="/diensten/:slug/:subslug" element={<SubServiceRoute />} />

            {/* Redirects from the old per-service routes to the new structure. */}
            <Route path="/websites" element={<Navigate to="/diensten/web-development" replace />} />
            <Route path="/branding" element={<Navigate to="/diensten/design-branding" replace />} />
            <Route path="/video" element={<Navigate to="/diensten/video-fotografie" replace />} />
            <Route path="/ai-video" element={<Navigate to="/diensten/video-fotografie" replace />} />
            <Route path="/seo" element={<Navigate to="/diensten/seo-sea" replace />} />
            <Route path="/influencer" element={<Navigate to="/diensten/social-media" replace />} />

            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/start" element={<Start />} />
            <Route path="/website-audit" element={<Audit />} />
            <Route path="/algemene-voorwaarden" element={<Terms />} />
            {/* Dedicated 404 for anything unmatched. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </RouteTransition>
    </>
  )
}

/** Picks the admin panel or the public site based on the path. */
function AppRoot() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    )
  }
  if (pathname.startsWith('/offerte/') || pathname.startsWith('/factuur/')) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/offerte/:token" element={<PublicQuote />} />
          <Route path="/factuur/:token" element={<PublicInvoice />} />
        </Routes>
      </Suspense>
    )
  }
  return <PublicSite />
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  )
}
