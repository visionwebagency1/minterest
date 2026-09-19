/**
 * Types van het abonnementsplatform, een op een met de Supabase-migraties
 * 0015 t/m 0017. Handgeschreven in plaats van gegenereerd, zodat renderer en
 * panel dezelfde vorm delen zonder extra tooling.
 */

export type PlanSlug = 'start' | 'groei' | 'pro'

export type SiteStatus = 'concept' | 'wacht_op_domein' | 'live' | 'gepauzeerd' | 'gearchiveerd'

export type ContentSource = 'supabase' | 'sanity' | 'custom'

export type SubscriptionStatus =
  | 'concept'
  | 'wacht_op_betaling'
  | 'actief'
  | 'betaling_mislukt'
  | 'gepauzeerd'
  | 'opgezegd'
  | 'beeindigd'

export type TemplateStatus = 'concept' | 'beschikbaar' | 'gearchiveerd'

export type ChangeRequestStatus = 'nieuw' | 'in_behandeling' | 'afgerond' | 'afgewezen'

export type VercelDomainStatus = 'niet_gekoppeld' | 'toegevoegd' | 'geverifieerd' | 'fout'

export type SslStatus = 'onbekend' | 'wachtend' | 'actief' | 'fout'

export interface Plan {
  id: string
  created_at: string
  slug: PlanSlug
  name: string
  tagline: string | null
  price_monthly: number
  price_from: boolean
  currency: string
  features: string[]
  max_pages: number | null
  editor_enabled: boolean
  included_change_requests: number
  mollie_price_ref: string | null
  sort_order: number
  active: boolean
}

export interface Template {
  id: string
  created_at: string
  slug: string
  name: string
  description: string | null
  preview_image: string | null
  thumbnail: string | null
  demo_url: string | null
  plan_slugs: PlanSlug[]
  config_schema: Record<string, unknown>
  max_pages: number
  status: TemplateStatus
  sort_order: number
}

export interface Customer {
  id: string
  created_at: string
  company_name: string | null
  contact_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  kvk: string | null
  vat: string | null
  notes: string | null
  auth_user_id: string | null
  mollie_customer_id: string | null
}

export interface Subscription {
  id: string
  created_at: string
  customer_id: string
  plan_id: string | null
  status: SubscriptionStatus
  amount: number
  billing_interval: string
  mollie_customer_id: string | null
  mollie_subscription_id: string | null
  mollie_mandate_id: string | null
  started_at: string | null
  next_payment_date: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  canceled_at: string | null
  ended_at: string | null
  failed_payments: number
  notes: string | null
}

export interface Site {
  id: string
  created_at: string
  customer_id: string
  subscription_id: string | null
  template_id: string | null
  tier: PlanSlug
  name: string
  primary_domain: string | null
  status: SiteStatus
  content_source: ContentSource
  sanity_project_ref: string | null
  sanity_dataset: string | null
  vercel_project_ref: string | null
  published_at: string | null
  notes: string | null
}

export interface SiteContent {
  id: string
  site_id: string
  locale: string
  data: Record<string, unknown>
  version: number
  updated_at: string
  updated_by: string | null
}

export interface Domain {
  id: string
  created_at: string
  site_id: string
  name: string
  is_primary: boolean
  vercel_status: VercelDomainStatus
  dns_verified: boolean
  ssl_status: SslStatus
  dns_instructions: DnsRecord[]
  last_checked_at: string | null
  error_message: string | null
}

export interface DnsRecord {
  type: 'A' | 'CNAME' | 'TXT'
  name: string
  value: string
  ttl?: number
}

export interface ChangeRequest {
  id: string
  created_at: string
  site_id: string
  customer_id: string
  description: string
  status: ChangeRequestStatus
  period: string
  included: boolean
  extra_cost: number | null
  handled_at: string | null
  handled_by: string | null
  admin_notes: string | null
}

/** Wat public.get_site_by_domain(host) teruggeeft: alleen renderbare velden. */
export interface SiteByDomain {
  site_id: string
  tier: PlanSlug
  template_slug: string | null
  content_source: ContentSource
  sanity_project_ref: string | null
  sanity_dataset: string | null
  primary_domain: string | null
  content: Record<string, unknown>
}

/** Rol uit public.profiles: bepaalt of iemand in het admin of in de klantomgeving hoort. */
export type ProfileRole = 'admin' | 'klant'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: ProfileRole
  created_at: string
}
