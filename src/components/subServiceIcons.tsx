/**
 * Clean line icons per sub-service, keyed by the sub-service slug
 * (see slugifySub in data/services). Used on the service landing pages so each
 * sub-service gets a fitting mark instead of a number. Consistent 24x24 grid,
 * 1.6 stroke, designed to sit centered with padding inside their tile.
 */
import type { ReactNode } from 'react'

function Ico({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export const SUB_ICON_BY_SLUG: Record<string, () => JSX.Element> = {
  // ── Design & Branding ──
  // Visuele identiteit — a paint palette (logo, kleur, typografie)
  'visuele-identiteit': () => (
    <Ico>
      <path d="M12 3a9 9 0 1 0 0 18 1.7 1.7 0 0 0 1.7-1.7c0-.45-.2-.85-.45-1.15-.27-.32-.45-.7-.45-1.15a1.7 1.7 0 0 1 1.7-1.7H16a5 5 0 0 0 5-5c0-3.87-4.03-7-9-7Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.8" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="7.3" r="1" fill="currentColor" stroke="none" />
    </Ico>
  ),
  // Packaging — a taped parcel box
  packaging: () => (
    <Ico>
      <rect x="3.5" y="7" width="17" height="13.5" rx="1.5" />
      <path d="M3.5 11.5h17M12 7v13.5" />
      <path d="M8.5 7 10 3.8h4L15.5 7" />
    </Ico>
  ),
  // Social Media Visual System — a 2x2 template grid
  'social-media-visual-system': () => (
    <Ico>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill="currentColor" stroke="none" opacity="0.9" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Ico>
  ),
  // Complete Branding — layered system stack
  'complete-branding': () => (
    <Ico>
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
    </Ico>
  ),

  // ── Web Development ──
  // Websites — browser window
  websites: () => (
    <Ico>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.5h18" />
      <circle cx="6" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </Ico>
  ),
  // Webshops — shopping bag
  webshops: () => (
    <Ico>
      <path d="M5.5 7.5h13l-1 12.5h-11l-1-12.5Z" />
      <path d="M9 7.5V6a3 3 0 0 1 6 0v1.5" />
    </Ico>
  ),
  // Applicaties — phone app
  applicaties: () => (
    <Ico>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </Ico>
  ),
  // Software — code brackets
  software: () => (
    <Ico>
      <path d="M8.5 7 4 12l4.5 5M15.5 7 20 12l-4.5 5" />
      <path d="M13.5 5.5 10.5 18.5" />
    </Ico>
  ),

  // ── Video & Fotografie ──
  // Short video content — vertical reel with play
  'short-video-content': () => (
    <Ico>
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
    </Ico>
  ),
  // AI video content — play frame with a spark
  'ai-video-content': () => (
    <Ico>
      <rect x="3" y="6.5" width="14" height="12" rx="2.5" />
      <path d="M9 10.5v4l3.5-2-3.5-2Z" fill="currentColor" stroke="none" />
      <path d="M18.5 3.2l.55 1.45L20.5 5.2l-1.45.55L18.5 7.2l-.55-1.45L16.5 5.2l1.45-.55L18.5 3.2Z" fill="currentColor" stroke="none" />
    </Ico>
  ),
  // Fotoshoots — camera
  fotoshoots: () => (
    <Ico>
      <path d="M4 8h3l1.5-2.2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Ico>
  ),

  // ── Social Media Beheer ──
  // Influencer marketing — a person with a star
  'influencer-marketing': () => (
    <Ico>
      <circle cx="9.5" cy="8" r="3" />
      <path d="M4 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M18 3.5l.75 1.75L20.5 6l-1.75.75L18 8.5l-.75-1.75L15.5 6l1.75-.75L18 3.5Z" fill="currentColor" stroke="none" />
    </Ico>
  ),
  // Meta Ads — boosted megaphone
  'meta-ads': () => (
    <Ico>
      <path d="M4 10v3a1 1 0 0 0 1 1h2l4 3.5V6.5L7 10H5a1 1 0 0 0-1 1Z" />
      <path d="M15 9a4 4 0 0 1 0 6" />
      <path d="M18 6.5a7 7 0 0 1 0 11" />
    </Ico>
  ),
  // TikTok Ads — music note
  'tiktok-ads': () => (
    <Ico>
      <path d="M9.5 9a3.75 3.75 0 1 0 3.75 3.75V4c.7 2.1 2.3 3.4 4.25 3.6" />
    </Ico>
  ),

  // ── SEO & SEA ──
  // SEO — magnifier with a rising trend
  seo: () => (
    <Ico>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.1-4.1" />
      <path d="M7.8 11.6l1.7-2 1.6 1.3 2.3-2.7" />
    </Ico>
  ),
  // Google Ads — click cursor
  'google-ads': () => (
    <Ico>
      <path d="M5.5 4.2 18 9.3l-5 1.9-1.9 5L5.5 4.2Z" />
      <path d="M13.8 13.8 18 18" />
    </Ico>
  ),

  // ── Extra diensten ──
  // AI agents — friendly bot
  'ai-agents': () => (
    <Ico>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4" />
      <circle cx="12" cy="3.5" r="1" fill="currentColor" stroke="none" />
      <path d="M9 13h.01M15 13h.01" />
      <path d="M9.5 16.5h5" />
    </Ico>
  ),
  // Administratie — document with lines
  administratie: () => (
    <Ico>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </Ico>
  ),
  // Sourcing — magnifier over a parcel
  sourcing: () => (
    <Ico>
      <path d="M3 8 11 4l8 4v7l-8 4-8-4V8Z" />
      <path d="M3 8l8 4 8-4M11 12v7" />
      <circle cx="17.5" cy="16.5" r="2.6" fill="#EAF4EC" />
      <path d="M19.5 18.5 21.5 20.5" />
    </Ico>
  ),
  // Detachering — placing the right person
  detachering: () => (
    <Ico>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M4 19.5a5.5 5.5 0 0 1 10.4-2.5" />
      <path d="M15 18.5l1.7 1.7 3.3-3.4" />
    </Ico>
  ),
}
