import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { useLenis } from '@/lib/useLenis'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Preloader } from '@/components/Preloader'
import { Header } from '@/components/Header'
import { RouteWipe, ScrollToTop } from '@/components/RouteTransition'
import { Home } from '@/sections/Home'
import { ServicePage } from '@/pages/ServicePage'
import { Work } from '@/pages/Work'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Start } from '@/pages/Start'
import { Audit } from '@/pages/Audit'
import { NotFound } from '@/pages/NotFound'

export default function App() {
  // App-wide smooth scroll.
  useLenis()

  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <GrainOverlay />
      <Header />
      <ScrollToTop />
      <RouteWipe />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/websites" element={<ServicePage slug="websites" />} />
        <Route path="/branding" element={<ServicePage slug="branding" />} />
        <Route path="/video" element={<ServicePage slug="video" />} />
        <Route path="/ai-video" element={<ServicePage slug="aivideo" />} />
        <Route path="/seo" element={<ServicePage slug="seo" />} />
        <Route path="/influencer" element={<ServicePage slug="influencer" />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/start" element={<Start />} />
        <Route path="/website-audit" element={<Audit />} />
        {/* Dedicated 404 for anything unmatched. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
