/** Shared clean line icons for the services (menu + forms). */

export function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <circle cx="6" cy="6" r="0.6" fill="currentColor" />
    </svg>
  )
}
export function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16.5 14 6.5a2.1 2.1 0 0 1 3 3L7 19.5l-4 1 1-4Z" />
      <path d="M12.5 8 16 11.5" />
    </svg>
  )
}
export function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="2.2" />
      <circle cx="5.5" cy="17" r="2.2" />
      <circle cx="18.5" cy="17" r="2.2" />
      <path d="M10.5 7.8 7 15M13.5 7.8 17 15M7.7 17h8.6" />
    </svg>
  )
}

export function AiVideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M9.5 10v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
      <path d="M17.6 2.4l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6L15 4.6l1.6-.6.6-1.6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function SeoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.1-4.1" />
      <path d="M7.8 11.4l1.7-1.9 1.6 1.3 2.2-2.6" />
    </svg>
  )
}

export const SERVICE_OPTIONS = [
  { key: 'websites', label: 'Website & webshops', Icon: WebIcon },
  { key: 'branding', label: 'Design & branding', Icon: BrandIcon },
  { key: 'video', label: 'Short video', Icon: VideoIcon },
  { key: 'aivideo', label: 'AI video', Icon: AiVideoIcon },
  { key: 'seo', label: 'SEO', Icon: SeoIcon },
  { key: 'influencer', label: 'Influencer marketing', Icon: NetworkIcon },
]
