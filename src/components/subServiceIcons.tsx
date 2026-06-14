/**
 * Clean line icons per sub-service, keyed by the sub-service slug
 * (see slugifySub in data/services). Used on the service landing pages so each
 * sub-service gets a fitting mark instead of a number.
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
  // Design & Branding
  'visuele-identiteit': () => (
    <Ico>
      <circle cx="8.5" cy="8.5" r="4.5" />
      <circle cx="15.5" cy="15.5" r="4.5" />
    </Ico>
  ),
  packaging: () => (
    <Ico>
      <path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </Ico>
  ),
  'social-media-visual-system': () => (
    <Ico>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Ico>
  ),
  'complete-branding': () => (
    <Ico>
      <path d="M12 3 21 8 12 13 3 8 12 3Z" />
      <path d="M3 13l9 5 9-5M3 16.5l9 5 9-5" />
    </Ico>
  ),

  // Web Development
  websites: () => (
    <Ico>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <circle cx="6" cy="6" r="0.5" fill="currentColor" />
    </Ico>
  ),
  webshops: () => (
    <Ico>
      <path d="M4 5h2l1.6 10.4a1.5 1.5 0 0 0 1.5 1.3h7.2a1.5 1.5 0 0 0 1.5-1.2L20 8H6.5" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </Ico>
  ),
  applicaties: () => (
    <Ico>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </Ico>
  ),
  software: () => (
    <Ico>
      <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
    </Ico>
  ),

  // Video & Fotografie
  'short-video-content': () => (
    <Ico>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
    </Ico>
  ),
  'ai-video-content': () => (
    <Ico>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M9.5 10v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
      <path d="M17.6 2.4l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6L15 4.6l1.6-.6.6-1.6Z" fill="currentColor" stroke="none" />
    </Ico>
  ),
  fotoshoots: () => (
    <Ico>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Ico>
  ),

  // Social Media Beheer
  'influencer-marketing': () => (
    <Ico>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 8.5a3 3 0 0 1 0 5M18.5 19a5.5 5.5 0 0 0-3-4.9" />
    </Ico>
  ),
  'meta-ads': () => (
    <Ico>
      <path d="M4 9v6h3l5 4V5L7 9H4Z" />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
    </Ico>
  ),
  'tiktok-ads': () => (
    <Ico>
      <path d="M9 9a4 4 0 1 0 4 4V4c.6 2 2 3.4 4 3.6" />
    </Ico>
  ),

  // SEO & SEA
  seo: () => (
    <Ico>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.1-4.1" />
      <path d="M7.8 11.4l1.7-1.9 1.6 1.3 2.2-2.6" />
    </Ico>
  ),
  'google-ads': () => (
    <Ico>
      <path d="M7 3v8l2.5-2 1.8 4 2-1-1.8-3.9H14L7 3Z" />
      <path d="M14 14l3 3M18 13l3 3" />
    </Ico>
  ),

  // Extra diensten
  'ai-agents': () => (
    <Ico>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M8.5 13h.01M15.5 13h.01M9 17h6" />
    </Ico>
  ),
  administratie: () => (
    <Ico>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </Ico>
  ),
  sourcing: () => (
    <Ico>
      <path d="M3 8 11 4l8 4v8l-8 4-8-4V8Z" />
      <circle cx="17.5" cy="16.5" r="2.5" />
      <path d="M19.4 18.4 21.5 20.5" />
    </Ico>
  ),
  detachering: () => (
    <Ico>
      <circle cx="10" cy="8" r="3.2" />
      <path d="M4 19a6 6 0 0 1 11-3.3" />
      <path d="M15.5 18.5l1.6 1.6 3-3.2" />
    </Ico>
  ),
}
