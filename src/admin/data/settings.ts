import { getSupabase } from '@/lib/supabase'

/** The single company_settings row: Minterest's own details for documents. */
export type CompanySettings = {
  company_name: string
  address: string | null
  kvk: string | null
  vat: string | null
  email: string | null
  phone: string | null
  iban: string | null
  website: string | null
  default_vat_rate: number
  quote_validity_days: number
  quote_footer: string | null
  invoice_due_days: number
  invoice_footer: string | null
}

export async function fetchSettings(): Promise<CompanySettings> {
  const { data, error } = await getSupabase()
    .from('company_settings')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) throw error
  return data as CompanySettings
}

export async function updateSettings(input: CompanySettings): Promise<void> {
  const { error } = await getSupabase().from('company_settings').update(input).eq('id', 1)
  if (error) throw error
}
