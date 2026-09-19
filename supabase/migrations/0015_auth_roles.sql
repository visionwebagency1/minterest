-- ============================================================================
-- Minterest - migration 0015: rollen in auth (admin vs klant)
-- ----------------------------------------------------------------------------
-- Het abonnementsplatform (websites per maand) geeft ook KLANTEN een login.
-- Tot nu toe gold: elke auth-gebruiker met een rij in `profiles` is admin, en
-- de trigger `handle_new_user` maakte die rij voor IEDERE nieuwe auth-gebruiker.
-- Zodra klanten een account krijgen zou dat betekenen dat elke klant admin is
-- en alle leads, offertes en facturen kan lezen. Die deur gaat hier dicht.
--
-- Na deze migratie:
--   * `profiles.role` is 'admin' of 'klant' en is de enige bron van waarheid.
--   * Nieuwe auth-gebruikers worden standaard 'klant'.
--   * Een admin ontstaat alleen doordat iemand met service_role-rechten
--     `raw_app_meta_data.role = 'admin'` zet (Supabase dashboard of API), of
--     doordat een bestaande admin `select public.grant_admin('mail@...')` draait.
--     app_metadata is niet door de browser te zetten, dus een klant kan zich
--     nooit zelf tot admin promoveren.
--   * Alle bestaande profielen blijven admin (dat is het huidige team).
--
-- Run na 0014.
-- ============================================================================

-- ── Bestaande profielen zijn het admin-team ──────────────────────────────────
update public.profiles set role = 'admin' where role is null or role <> 'klant';

alter table public.profiles
  drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'klant'));

alter table public.profiles alter column role set default 'klant';

comment on column public.profiles.role is
  'admin = toegang tot het Minterest-admin; klant = alleen de eigen klantomgeving.';

-- ── is_admin(): nu expliciet op rol ──────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
     where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- ── Nieuwe auth-gebruiker: klant, tenzij server-side anders gezet ────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := nullif(new.raw_app_meta_data ->> 'role', '');
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    case when requested_role = 'admin' then 'admin' else 'klant' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ── Een bestaande admin kan een teamlid promoveren ───────────────────────────
create or replace function public.grant_admin(user_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Alleen een admin mag admin-rechten uitdelen.';
  end if;
  update public.profiles set role = 'admin' where lower(email) = lower(user_email);
  if not found then
    raise exception 'Geen profiel gevonden voor %', user_email;
  end if;
end;
$$;

revoke all on function public.grant_admin(text) from public, anon;
grant execute on function public.grant_admin(text) to authenticated;
