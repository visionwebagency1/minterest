import type { WebsiteTemplate } from '@/data/websiteTemplates'

/**
 * How a template is shown on the sales page.
 *
 * The images are screenshots of the real template pages in the renderer, each
 * filled with the demo business for that sector. No mockups and no wireframes:
 * what you see in the gallery is what a customer gets, which is the only honest
 * way to sell a website you have not built yet.
 */

/** Browser chrome, so a template reads as a website instead of a picture. */
export function BrowserFrame({
  children,
  domain = 'jouwbedrijf.nl',
  className = '',
}: {
  children: React.ReactNode
  domain?: string
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0D1A18] shadow-[0_30px_80px_rgba(1,25,24,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {domain && (
          <span className="ml-2 truncate rounded-full bg-white/10 px-3 py-1 font-sans text-[10px] text-cream/50">
            {domain}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/** The top of a template page, in 4:3. */
export function TemplateShot({
  template,
  className = '',
  eager = false,
}: {
  template: WebsiteTemplate
  className?: string
  /** True only for the one image that is visible on first paint. */
  eager?: boolean
}) {
  return (
    <img
      src={template.preview}
      alt={`Voorbeeldwebsite ${template.name}, gemaakt voor ${template.sector.toLowerCase()}`}
      width={1100}
      height={825}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`block aspect-[4/3] w-full object-cover object-top ${className}`}
    />
  )
}

/** The whole page, for the detail view. */
export function TemplateFullShot({ template }: { template: WebsiteTemplate }) {
  return (
    <img
      src={template.full}
      alt={`De volledige voorbeeldwebsite ${template.name}`}
      width={1000}
      loading="lazy"
      decoding="async"
      className="block w-full"
    />
  )
}

/** The demo domain shown in the browser bar of a template. */
export function demoDomain(template: WebsiteTemplate): string {
  return `${template.demo.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.nl`
}
