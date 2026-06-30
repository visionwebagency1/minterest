/**
 * Money + VAT calculations, shared by the admin panel and the public quote view.
 * Pure functions only (no Supabase import) so it is safe in the public bundle.
 *
 * Amounts are plain euros as numbers. We round to cents at every step so the
 * totals shown to a customer always add up exactly.
 */

export type CalcLine = { quantity: number; unit_price: number; vat_rate: number }

export const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100

/** Net amount of a single line (quantity x unit price), rounded to cents. */
export function lineNet(line: CalcLine): number {
  return round2((Number(line.quantity) || 0) * (Number(line.unit_price) || 0))
}

export type VatRow = { rate: number; base: number; vat: number }
export type Totals = { subtotal: number; vatAmount: number; total: number; vatRows: VatRow[] }

/** Subtotal, VAT (grouped per rate) and grand total for a set of lines. */
export function computeTotals(lines: CalcLine[]): Totals {
  const groups = new Map<number, number>() // rate -> net base
  let subtotal = 0

  for (const line of lines) {
    const net = lineNet(line)
    subtotal += net
    const rate = Number(line.vat_rate) || 0
    groups.set(rate, round2((groups.get(rate) ?? 0) + net))
  }

  const vatRows: VatRow[] = [...groups.entries()]
    .filter(([, base]) => base !== 0)
    .map(([rate, base]) => ({ rate, base, vat: round2((base * rate) / 100) }))
    .sort((a, b) => b.rate - a.rate)

  const vatAmount = round2(vatRows.reduce((sum, r) => sum + r.vat, 0))
  subtotal = round2(subtotal)
  return { subtotal, vatAmount, total: round2(subtotal + vatAmount), vatRows }
}

const eur = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

export function formatEUR(n: number | null | undefined): string {
  return eur.format(Number(n) || 0)
}
