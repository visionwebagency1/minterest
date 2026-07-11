/**
 * Vercel serverless function: sends the two confirmation emails for a lead.
 *
 * Called (best-effort) right after a form is saved to the admin inbox, and after
 * a customer approves a quote online. It sends:
 *   1. an internal notification to Minterest (info@minterest.nl) with all details;
 *   2. a branded confirmation to the person who submitted, if we have their email.
 *
 * The Resend API key lives ONLY here (server-side env var RESEND_API_KEY); it is
 * never shipped in the public bundle. This file sits outside `src`, so the app's
 * TypeScript build ignores it and Vercel builds it as a Node function.
 *
 * Env:
 *   RESEND_API_KEY   (required)  - your Resend API key
 *   MAIL_FROM        (optional)  - default 'Minterest <info@minterest.nl>'
 *   MAIL_TO_INTERNAL (optional)  - default 'info@minterest.nl'
 */

type Payload = Record<string, unknown>

const BRAND = {
  teal: '#008081',
  tealDeep: '#013F40',
  mint: '#42C28C',
  ink: '#0A1512',
  cream: '#F4F4F4',
}

const FORM_LABELS: Record<string, string> = {
  contact: 'Contactaanvraag',
  start: 'Projectaanvraag',
  audit: 'Website-audit',
  'offerte-akkoord': 'Offerte geaccepteerd',
}

const CUSTOMER_INTRO: Record<string, string> = {
  contact:
    'Bedankt voor je bericht. We hebben je aanvraag goed ontvangen en nemen meestal binnen 1 werkdag contact met je op.',
  start:
    'Bedankt voor je projectaanvraag. We nemen snel contact met je op om je plan te bespreken en samen de volgende stap te zetten.',
  audit:
    'Bedankt voor je aanvraag voor een gratis website-audit. We bekijken je website zorgvuldig en sturen je onze bevindingen toe.',
  'offerte-akkoord':
    'Bedankt voor je akkoord. We hebben je goedkeuring ontvangen en gaan voor je aan de slag. Je ontvangt binnenkort de vervolgstappen.',
}

const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() !== '' ? v.trim() : null

const asList = (v: unknown): string[] => (Array.isArray(v) ? v.map(String).filter(Boolean) : [])

/** Normalize the many form shapes onto one set of fields. */
function normalize(data: Payload) {
  const interest = asList(data.interest).length ? asList(data.interest) : asList(data.services)
  return {
    name: asText(data.name),
    email: asText(data.email),
    company: asText(data.company),
    website: asText(data.url) ?? asText((data as Payload).website_url) ?? asText((data as Payload).website),
    interest,
    budget: asText(data.budget),
    timeline: asText(data.timeline),
    message: asText(data.message),
    quoteNumber: asText((data as Payload).quoteNumber),
    amount: asText((data as Payload).amount),
    page: asText((data as Payload).page) ?? asText((data as Payload)._page),
  }
}

type Row = { label: string; value: string }

function rowsHtml(rows: Row[]): string {
  return rows
    .map(
      (r) => `
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:150px;color:${BRAND.ink};opacity:.5;font-size:13px;">${esc(
          r.label,
        )}</td>
        <td style="padding:8px 0;vertical-align:top;color:${BRAND.ink};font-size:14px;line-height:1.5;white-space:pre-wrap;">${esc(
          r.value,
        )}</td>
      </tr>`,
    )
    .join('')
}

function shell({ heading, intro, rows, footerNote }: { heading: string; intro: string; rows: Row[]; footerNote?: string }): string {
  return `<!doctype html>
<html><body style="margin:0;background:#eef2f1;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
    <div style="background:linear-gradient(120deg,${BRAND.tealDeep} 0%,${BRAND.teal} 55%,${BRAND.mint} 100%);border-radius:16px 16px 0 0;padding:26px 28px;">
      <div style="color:${BRAND.cream};font-size:20px;font-weight:700;letter-spacing:.2px;">Minterest</div>
      <div style="color:rgba(244,244,244,.85);font-size:13px;margin-top:2px;">Where interest becomes your growth</div>
    </div>
    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:28px;">
      <h1 style="margin:0 0 10px;color:${BRAND.ink};font-size:20px;">${esc(heading)}</h1>
      <p style="margin:0 0 18px;color:${BRAND.ink};opacity:.75;font-size:14px;line-height:1.6;">${esc(intro)}</p>
      ${rows.length ? `<table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(1,63,64,.1);margin-top:6px;">${rowsHtml(rows)}</table>` : ''}
      ${
        footerNote
          ? `<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid rgba(1,63,64,.1);color:${BRAND.ink};opacity:.55;font-size:12px;line-height:1.6;">${footerNote}</p>`
          : ''
      }
      <div style="margin-top:22px;padding-top:16px;border-top:1px solid rgba(1,63,64,.08);color:${BRAND.ink};opacity:.5;font-size:12px;">
        Minterest &nbsp;·&nbsp; info@minterest.nl &nbsp;·&nbsp; minterest.nl &nbsp;·&nbsp; KvK 83955526
      </div>
    </div>
  </div>
</body></html>`
}

/** Full detail rows for the internal notification. */
function internalRows(f: ReturnType<typeof normalize>): Row[] {
  const rows: Row[] = []
  if (f.name) rows.push({ label: 'Naam', value: f.name })
  if (f.email) rows.push({ label: 'E-mail', value: f.email })
  if (f.company) rows.push({ label: 'Bedrijf', value: f.company })
  if (f.website) rows.push({ label: 'Website', value: f.website })
  if (f.interest.length) rows.push({ label: 'Interesse', value: f.interest.join(', ') })
  if (f.budget) rows.push({ label: 'Budget', value: f.budget })
  if (f.timeline) rows.push({ label: 'Tijdlijn', value: f.timeline })
  if (f.quoteNumber) rows.push({ label: 'Offerte', value: f.quoteNumber })
  if (f.amount) rows.push({ label: 'Bedrag', value: f.amount })
  if (f.message) rows.push({ label: 'Bericht', value: f.message })
  if (f.page) rows.push({ label: 'Pagina', value: f.page })
  return rows
}

/** A friendly recap of what the customer sent. */
function customerRows(f: ReturnType<typeof normalize>): Row[] {
  const rows: Row[] = []
  if (f.company) rows.push({ label: 'Bedrijf', value: f.company })
  if (f.website) rows.push({ label: 'Website', value: f.website })
  if (f.interest.length) rows.push({ label: 'Interesse', value: f.interest.join(', ') })
  if (f.quoteNumber) rows.push({ label: 'Offerte', value: f.quoteNumber })
  if (f.message) rows.push({ label: 'Je bericht', value: f.message })
  return rows
}

async function sendEmail(opts: {
  apiKey: string
  from: string
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${opts.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 300)}` }
  }
  return { ok: true }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // No key configured: don't error the user flow, just report it wasn't sent.
    res.status(200).json({ ok: false, error: 'RESEND_API_KEY not set' })
    return
  }

  const from = process.env.MAIL_FROM || 'Minterest <info@minterest.nl>'
  const internalTo = process.env.MAIL_TO_INTERNAL || 'info@minterest.nl'

  let body: Payload = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  } catch {
    body = {}
  }

  const formType = asText(body.formType) || 'contact'
  const data = (body.data && typeof body.data === 'object' ? body.data : body) as Payload
  const f = normalize(data)
  const label = FORM_LABELS[formType] || 'Aanvraag'

  // 1) Internal notification to Minterest (reply goes straight to the customer).
  const who = f.name || f.email || 'onbekend'
  const internal = await sendEmail({
    apiKey,
    from,
    to: internalTo,
    subject: `Nieuwe ${label.toLowerCase()} — ${who}`,
    replyTo: f.email || undefined,
    html: shell({
      heading: `Nieuwe ${label.toLowerCase()}`,
      intro:
        formType === 'offerte-akkoord'
          ? 'Een klant heeft zojuist een offerte online goedgekeurd en ondertekend.'
          : 'Er is een nieuwe aanvraag binnengekomen via de website.',
      rows: internalRows(f),
      footerNote: 'Je kunt direct op deze e-mail antwoorden om de klant te bereiken.',
    }),
  })

  // 2) Confirmation to the customer (only when we have a valid-looking email).
  let customer: { ok: boolean; error?: string } = { ok: false, error: 'no customer email' }
  if (f.email && /.+@.+\..+/.test(f.email)) {
    const heading =
      formType === 'offerte-akkoord' ? 'Je akkoord is ontvangen' : 'We hebben je aanvraag ontvangen'
    customer = await sendEmail({
      apiKey,
      from,
      to: f.email,
      subject:
        formType === 'offerte-akkoord'
          ? `Bevestiging van je akkoord${f.quoteNumber ? ` — ${f.quoteNumber}` : ''}`
          : `Bevestiging: ${label} ontvangen`,
      replyTo: internalTo,
      html: shell({
        heading,
        intro: CUSTOMER_INTRO[formType] || CUSTOMER_INTRO.contact,
        rows: customerRows(f),
        footerNote:
          'Heb je in de tussentijd een vraag? Antwoord gerust op deze e-mail of mail ons op info@minterest.nl. We helpen je graag verder.',
      }),
    })
  }

  res.status(200).json({ ok: internal.ok, internal, customer })
}
