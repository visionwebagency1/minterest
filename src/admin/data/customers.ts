import { getSupabase } from '@/lib/supabase'
import type { Lead } from './leads'

/**
 * Data access for customers (klanten). All admin-only via RLS. A customer can be
 * created standalone or from a lead, and links back to leads / quotes / invoices.
 */

export type Customer = {
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
}

/** Fields that can be set when creating or editing a customer. */
export type CustomerInput = Omit<Customer, 'id' | 'created_at'>

/** Best display name for a customer in lists and headings. */
export function customerName(c: Pick<Customer, 'company_name' | 'contact_name' | 'email'>): string {
  return c.company_name || c.contact_name || c.email || 'Naamloze klant'
}

export async function fetchCustomers(): Promise<Customer[]> {
  const { data, error } = await getSupabase()
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Customer[]
}

export async function fetchCustomer(id: string): Promise<Customer | null> {
  const { data, error } = await getSupabase()
    .from('customers')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return (data as Customer) ?? null
}

export async function createCustomer(input: CustomerInput): Promise<Customer> {
  const { data, error } = await getSupabase()
    .from('customers')
    .insert(input)
    .select('*')
    .single()
  if (error) throw error
  return data as Customer
}

export async function updateCustomer(id: string, input: CustomerInput): Promise<void> {
  const { error } = await getSupabase().from('customers').update(input).eq('id', id)
  if (error) throw error
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await getSupabase().from('customers').delete().eq('id', id)
  if (error) throw error
}

export async function countCustomers(): Promise<number> {
  const { count, error } = await getSupabase()
    .from('customers')
    .select('id', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}

/** Requests linked to this customer, newest first (history on the customer page). */
export async function fetchLeadsForCustomer(customerId: string): Promise<Lead[]> {
  const { data, error } = await getSupabase()
    .from('leads')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Lead[]
}

/** Attach (or detach) a lead to a customer. */
export async function linkLeadToCustomer(leadId: string, customerId: string | null): Promise<void> {
  const { error } = await getSupabase()
    .from('leads')
    .update({ customer_id: customerId })
    .eq('id', leadId)
  if (error) throw error
}
