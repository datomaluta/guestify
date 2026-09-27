-- ============================================================================
-- 0020_hotel_google_rating.sql
-- Home გვერდის Google რევიუს ბანერზე სასტუმროს რეალური შეფასება — "4.6 ★★★★½ (1 243)".
-- ჯერჯერობით admin-ის მიერ ხელით შეყვანილი (Places API ფასიანია). მომავალში
-- Edge Function-მა შეიძლება იგივე ველები ავტომატურად შეავსოს — UI არ შეიცვლება.
--
-- ორივე nullable — თუ google_rating ცარიელია, ბანერი დეკორატიულ 5 ვარსკვლავს აჩვენებს.
-- ============================================================================

alter table public.hotels
  add column if not exists google_rating       numeric(2, 1) check (google_rating between 1 and 5),
  add column if not exists google_review_count integer       check (google_review_count >= 0);

comment on column public.hotels.google_rating is 'Google-ის საშუალო შეფასება (1.0–5.0) — ხელით შეყვანილი, Home-ის რევიუს ბანერი';
comment on column public.hotels.google_review_count is 'Google-ის რევიუების რაოდენობა — ხელით შეყვანილი, Home-ის რევიუს ბანერი';
