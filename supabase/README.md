# Minterest admin panel - Supabase setup

The admin panel (`/admin`) runs on Supabase (Postgres database, Auth, Storage).
The public marketing website does not use Supabase and keeps working without it.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project (free tier is fine to start).
2. Pick a strong database password and a region close to the Netherlands (e.g. Frankfurt).

## 2. Run the database migration

This creates the `profiles` table (the admin team) with Row Level Security on.

Easiest way (no tooling):

1. Open your project, go to **SQL Editor**.
2. Paste the contents of [`migrations/0001_init.sql`](migrations/0001_init.sql) and run it.

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
