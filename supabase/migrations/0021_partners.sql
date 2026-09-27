-- ============================================================================
-- 0021_partners.sql
-- ლენდინგის Partners სექცია და /partners გვერდი — აქამდე web-ის partners.data.ts-ში
-- ხელით ჩაწერილი სია და public/-ში შენახული ფოტოები, ახლა superadmin-ის მიერ
-- admin პანელიდან (features/admin/partners) იმართება.
--
-- ქარდზე სასტუმროს ფოტოა (არა ლოგო) + სახელი + Google-ის შეფასება. შეფასება
-- hotels.google_rating-ის (0020) იგივე კონვენციით ხელით შეყვანილია.
--
-- ცალკე ცხრილია და არა hotels-ზე flag — პარტნიორი შეიძლება სისტემაში სასტუმროდ
-- არც იყოს დარეგისტრირებული, ლენდინგის ფოტო კი hotel_hero_image-ისგან განსხვავებული იყოს.
-- ============================================================================

create table public.partners (
  id                   uuid primary key default gen_random_uuid(),
  name                 text not null,
  image_url            text,
  google_rating        numeric(2, 1) check (google_rating between 1 and 5),
  google_review_count  integer check (google_review_count >= 0),
  featured             boolean not null default false,
  is_active            boolean not null default true,
  sort_order           int not null default 0,
  created_at           timestamptz not null default now()
);

comment on column public.partners.featured is 'ლენდინგის Partners სექციაში ჩანს; /partners გვერდზე ყველა აქტიური ჩანს';

alter table public.partners enable row level security;

create policy "partners: anyone reads active, superadmin reads all"
on public.partners for select
using (is_active or public.is_superadmin());

create policy "partners: superadmin manages"
on public.partners for all
using (public.is_superadmin())
with check (public.is_superadmin());

-- ------------------------------------------------------------ storage --
-- ცალკე bucket — hotel-assets-ის policy-ები {hotel_id}/... საქაღალდეზეა აგებული,
-- საიტის (არა-სასტუმროს) ფაილები კი მხოლოდ superadmin-ს ეკუთვნის. სტრუქტურა:
--   partners/{partner_id}.webp

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do nothing;

create policy "site-assets: anyone can read"
on storage.objects for select
using (bucket_id = 'site-assets');

create policy "site-assets: superadmin uploads"
on storage.objects for insert
with check (bucket_id = 'site-assets' and public.is_superadmin());

create policy "site-assets: superadmin updates"
on storage.objects for update
using (bucket_id = 'site-assets' and public.is_superadmin())
with check (bucket_id = 'site-assets' and public.is_superadmin());

create policy "site-assets: superadmin deletes"
on storage.objects for delete
using (bucket_id = 'site-assets' and public.is_superadmin());

-- ------------------------------------------------------------ seed --
-- partners.data.ts-ის არსებული სია. ფოტო და შეფასება ჯერ არ აქვთ, ამიტომ
-- გამორთულად იქმნება — admin-ში ფოტოს ატვირთვის შემდეგ ირთვება, რომ საჯარო
-- გვერდზე ცარიელი ქარდები არ გამოჩნდეს.

insert into public.partners (name, featured, is_active, sort_order) values
  ('Sevsamora',       true,  false, 0),
  ('Radisson RED',    true,  false, 1),
  ('Paragraph',       true,  false, 2),
  ('Castello Mare',   false, false, 3),
  ('Dreamland Oasis', false, false, 4),
  ('Georgia Gold',    false, false, 5),
  ('KASS',            false, false, 6),
  ('Orbi Hotels',     false, false, 7);
