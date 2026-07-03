-- ============================================================================
-- Minterest admin panel - migration 0008: project before/after images
-- ----------------------------------------------------------------------------
-- Two optional image columns per project. When BOTH are set, the case page
-- (/work/:slug) shows a draggable before/after comparison slider high on the
-- page. Managed in the admin under "Projecten" (Voor / na).
--
-- Run after 0007.
-- ============================================================================

alter table public.projects add column if not exists before_image text;
alter table public.projects add column if not exists after_image  text;

comment on column public.projects.before_image is 'Optioneel: linkerbeeld van de voor/na-slider op de case-pagina.';
comment on column public.projects.after_image  is 'Optioneel: rechterbeeld van de voor/na-slider op de case-pagina.';

-- ── Seed the two projects that have a real before/after in the content set ────
update public.projects set
  before_image = 'https://lwvhdzirobwcwlqsmcub.supabase.co/storage/v1/object/public/site-images/projects/wrbc/before.jpg',
  after_image  = 'https://lwvhdzirobwcwlqsmcub.supabase.co/storage/v1/object/public/site-images/projects/wrbc/after.jpg'
where slug = 'wrbc';

update public.projects set
  before_image = 'https://lwvhdzirobwcwlqsmcub.supabase.co/storage/v1/object/public/site-images/projects/ab-secure/before.jpg',
  after_image  = 'https://lwvhdzirobwcwlqsmcub.supabase.co/storage/v1/object/public/site-images/projects/ab-secure/after.jpg'
where slug = 'ab-secure';
