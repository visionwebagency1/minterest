# Minterest admin panel - Supabase setup

The admin panel (`/admin`) runs on Supabase (Postgres database, Auth, Storage).
The public marketing website does not use Supabase and keeps working without it.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project (free tier is fine to start).
2. Pick a strong database password and a region close to the Netherlands (e.g. Frankfurt).

## 2. Run the database migrations

Run the migration files in order. Together they create the admin team table and
the inbox of incoming requests, all with Row Level Security on.

Easiest way (no tooling):

1. Open your project, go to **SQL Editor**.
2. Paste and run each file in order:
   - [`migrations/0001_init.sql`](migrations/0001_init.sql) - profiles (admin team) + helpers.
   - [`migrations/0002_leads.sql`](migrations/0002_leads.sql) - the `leads` inbox (contact, start, audit).
   - [`migrations/0003_customers.sql`](migrations/0003_customers.sql) - `customers` (klanten) + link to leads.
   - [`migrations/0004_quotes.sql`](migrations/0004_quotes.sql) - `company_settings`, `quotes` + `quote_lines`, and the public quote functions.
   - [`migrations/0005_invoices.sql`](migrations/0005_invoices.sql) - `invoices` + `invoice_lines` and the public invoice function.

Or, with the Supabase CLI:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Set the environment variables

In Supabase: **Settings > API**. Copy the **Project URL** and the **anon public** key.

Local development, in a `.env` file at the project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...   (the anon public key)
```

Production (Vercel): **Project > Settings > Environment Variables**, add the same
two variables, then redeploy.

Never add the `service_role` key to the frontend or to these variables. It bypasses
Row Level Security and must stay server-side only.

## 4. Create the first admin account

The admin panel is invite-only: there is no public sign-up. Create the account
directly in Supabase:

1. Go to **Authentication > Users > Add user**.
2. Enter your email and a password, and tick **Auto Confirm User** so you can log
   in right away.
3. A matching row in `public.profiles` is created automatically (a database
   trigger does this), which marks the user as an admin.

You can now log in at `/admin/login` with that email and password.
Repeat for any extra team members.

## What is in the database now

- **`public.profiles`** - one row per admin user, linked to `auth.users`. RLS is
  on: a user can only read and update their own profile, and the browser can
  never insert or delete admin rows.
- **`public.is_admin()`** - a helper function used by RLS policies in later
  migrations (content, inbox, quotes) to check whether the current request is a
  logged-in admin.
- **`handle_new_user()` + `on_auth_user_created`** - the trigger that creates a
  profile for every new auth user.
- **`public.leads`** - the inbox: every request from the public site (contact
  form, "Start jouw project" funnel, website-audit). RLS lets the anon key only
  INSERT a fresh `nieuw` request; reading, status changes and deleting are
  admin-only. Managed in the admin panel under **Inbox**.
- **`public.customers`** - klanten, admin-only. Linked to leads, quotes and
  (later) invoices. Managed under **Klanten**.
- **`public.company_settings`** - one row with Minterest's own details (address,
  KvK, BTW, IBAN, default btw, geldigheidsduur). Shown on documents. Edit them
  in the admin panel under **Instellingen**.
- **`public.quotes` + `public.quote_lines`** - offertes with status, automatic
  numbering, dates and totals, admin-only. The only public access is the online
  quote link: two SECURITY DEFINER functions, `get_public_quote(token)` and
  `respond_to_quote(token, decision)`, keyed on a non-guessable token. The
  customer can view and approve/reject; nothing else is exposed to anon.
- **`public.invoices` + `public.invoice_lines`** - facturen with their own number
  series (`FAC-YYYY-####`), status (concept / verstuurd / betaald / vervallen),
  due date and totals, admin-only. An accepted quote converts to an invoice in
  one click. The online invoice view is read-only via `get_public_invoice(token)`.

## Sending quotes by e-mail (later)

Automatic e-mailing (via Resend or similar) is intentionally not wired yet. For
now a quote reaches the customer in two ways: download the branded PDF (the
browser's "Bewaar als PDF" from the print view) or share the online quote link.
