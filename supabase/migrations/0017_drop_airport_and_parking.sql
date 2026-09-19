-- ============================================================================
-- 0017_drop_airport_and_parking.sql
-- Essentials-ის Airport (0010) და Parking (0010) ბლოკები მთლიანად ამოღებულია
-- guest UI-დან — Airport ზედმეტი აღმოჩნდა, Parking კი უკვე "services" ცხრილში
-- (services list, Essentials-ის "სერვისები" სექცია) ივსება, ცალკე ბარათი აღარ სჭირდება.
--
-- სვეტები რეალურად ამოღებულია (drop), არა უბრალოდ დამალული UI-დან — იხ. მსგავსი
-- პრეცედენტი 0011-ში (hotel_rules.content_ka/en/ru).
-- ============================================================================

alter table public.hotels
  drop column if exists airport_maps_url,
  drop column if exists parking_info_ka,
  drop column if exists parking_info_en,
  drop column if exists parking_info_ru;
