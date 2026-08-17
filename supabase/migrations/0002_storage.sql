-- ============================================================================
-- 0002_storage.sql
-- Storage bucket + RLS ლოგო/მენიუს/გზამკვლევის ფოტოებისთვის
--
-- ერთი bucket — 'hotel-assets' — საქაღალდის სტრუქტურით:
--   {hotel_id}/logo.{ext}
--   {hotel_id}/menu/{menu_item_id}.{ext}
--   {hotel_id}/guide/{place_id}.{ext}
--
-- bucket public-ია (სტუმარი კითხულობს ლოგინის გარეშე, პირდაპირი CDN URL-ით),
-- ატვირთვა/წაშლა კი მხოლოდ საკუთარი hotel_id-ის საქაღალდეშია დაშვებული.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hotel-assets',
  'hotel-assets',
  true,
  5242880, -- 5 MB ზედა ზღვარი; menu ფოტოები app-ში resize/compress ხდება ატვირთვამდე (~480px)
  array['image/png', 'image/jpeg', 'image/webp']
);

-- საქაღალდის პირველი სეგმენტიდან hotel_id-ის უსაფრთხო ამოღება
-- (თუ path არასწორი ფორმატისაა, null-ს აბრუნებს policy-ს რომ არ დაანგრიოს)
create function public.path_hotel_id(object_name text)
returns uuid
language plpgsql
immutable
as $$
begin
  return split_part(object_name, '/', 1)::uuid;
exception when others then
  return null;
end;
$$;

-- ---------------------------------------------------------- storage.objects --

create policy "hotel-assets: anyone can read"
on storage.objects for select
using (bucket_id = 'hotel-assets');

create policy "hotel-assets: hotel_admin uploads to own folder, superadmin — anywhere"
on storage.objects for insert
with check (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.path_hotel_id(name) = public.current_hotel_id()
  )
);

create policy "hotel-assets: hotel_admin updates own folder, superadmin — anywhere"
on storage.objects for update
using (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.path_hotel_id(name) = public.current_hotel_id()
  )
)
with check (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.path_hotel_id(name) = public.current_hotel_id()
  )
);

create policy "hotel-assets: hotel_admin deletes own folder, superadmin — anywhere"
on storage.objects for delete
using (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.path_hotel_id(name) = public.current_hotel_id()
  )
);
