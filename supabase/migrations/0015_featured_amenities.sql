-- ============================================================================
-- 0015: featured_amenities — "გამორჩეული სერვისი" საკვანძო სექცია Essentials-ზე.
-- Services-ისგან განსხვავებით ფოტო-ორიენტირებულია (აუზი, სპა, ღვინის მარანი) —
-- სტუმარს ატყობინებს, როგორია ეს ადგილი, ჩვეულებრივი icon+text row-ის მაგივრად.
-- ბარათზე მხოლოდ სახელი + 2-სტრიქონიანი აღწერა ჩანს, დაწკაპუნებაზე კი
-- menu-item-sheet-ის მსგავსი bottom sheet იხსნება სრული ფოტო/აღწერა/სამუშაო
-- საათებით (იხ. web/src/app/shared/amenity-detail-sheet).
--
-- image_url განზრახ nullable-ია (არა NOT NULL) — ატვირთვას row-ის id სჭირდება
-- (path: {hotel_id}/amenities/{id}.webp), ამიტომ row ჯერ იქმნება, მერე ფოტო
-- ერთვის (იხ. guide-editor-ის იგივე შაბლონი). "ფოტო სავალდებულოა" კი
-- სტუმრის query-ზეა დაწესებული (HotelService.getFeaturedAmenities) — image_url
-- არარსებობის შემთხვევაში ეს ჩანაწერი უბრალოდ არ გამოჩნდება სტუმრისთვის.
--
-- ყოველი ნაბიჯი იდემპოტენტურია (if exists/if not exists) — თუ წინა მცდელობა
-- (current_hotel_id()-ის შეცდომის გამო) ნახევარში გაჩერდა, ხელახლა გაშვება უსაფრთხოა.
-- ============================================================================

create table if not exists public.featured_amenities (
  id                uuid primary key default gen_random_uuid(),
  hotel_id          uuid not null references public.hotels (id) on delete cascade,
  image_url         text,
  title_ka          text not null,
  title_en          text,
  title_ru          text,
  description_ka    text not null,
  description_en    text,
  description_ru    text,
  hours_ka          text,
  hours_en          text,
  hours_ru          text,
  sort_order        int not null default 0,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now()
);

alter table public.featured_amenities add column if not exists hours_ka text;
alter table public.featured_amenities add column if not exists hours_en text;
alter table public.featured_amenities add column if not exists hours_ru text;

create index if not exists featured_amenities_hotel_id_idx on public.featured_amenities (hotel_id);

alter table public.featured_amenities enable row level security;

-- იგივე ორი policy, რაც დანარჩენ hotel-content ცხრილებს აქვთ (services/hotel_rules/ai_topics/...),
-- 0014_multi_hotel_admins.sql-ის შემდეგი ფორმით — წევრობის შემოწმება is_hotel_admin_of()-ით
-- (current_hotel_id() იქ მოიხსნა, რომ ერთ admin-ს რამდენიმე hotel_id-ზეც ემუშავა).
drop policy if exists "featured_amenities: public reads active hotel content" on public.featured_amenities;
create policy "featured_amenities: public reads active hotel content"
on public.featured_amenities for select
using (
  exists (
    select 1 from public.hotels h
    where h.id = featured_amenities.hotel_id and h.is_active
  )
  or public.is_hotel_admin_of(hotel_id)
  or public.is_superadmin()
);

drop policy if exists "featured_amenities: hotel_admin manages own, superadmin manages all" on public.featured_amenities;
create policy "featured_amenities: hotel_admin manages own, superadmin manages all"
on public.featured_amenities for all
using (public.is_hotel_admin_of(hotel_id) or public.is_superadmin())
with check (public.is_hotel_admin_of(hotel_id) or public.is_superadmin());
