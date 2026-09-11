-- ============================================================================
-- 0007_hotel_address_i18n.sql
-- სასტუმროს მისამართი მრავალენოვანი ხდება (სხვა კონტენტის მსგავსად: _ka/_en/_ru) —
-- Home-ის ჰეროზე სტუმარს თავისი ენით უნდა დაენახოს მისამართი.
-- ============================================================================

alter table public.hotels rename column address to address_ka;

alter table public.hotels
  add column address_en text,
  add column address_ru text;
