import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Analytics 4. Only active when VITE_GA_MEASUREMENT_ID is set (in Vercel),
 * so the site works fine without it. Loads gtag.js once and sends a page_view on
 * every client-side route change (auto page_view is off to avoid double counting
 * in this SPA). Renders nothing. Mounted only on the public marketing site.
 */

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim()

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function Analytics() {
  const { pathname, search } = useLocation()
  const started = useRef(false)

  // Load gtag.js once.
  useEffect(() => {
    if (!GA_ID || started.current || typeof window === 'undefined') return
    started.current = true

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    // We send page_view manually on route change, so disable the automatic one.
    window.gtag('config', GA_ID, { send_page_view: false })
  }, [])

  // Send a page_view on every route change (including the first).
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, search])

  return null
}
