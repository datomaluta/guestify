-- ============================================================================
-- 0005_hotel_package.sql
-- სასტუმროს პაკეტი (სააბონენტო tier) — standard/premium. ამის მიხედვით განისაზღვრება
-- სტუმრის აპში რომელი ფუნქციები ჩანს (მაგ. AI კონსიერჟი, რესტორნის მენიუ).
-- ============================================================================

alter table public.hotels
  add column package text not null default 'standard' check (package in ('standard', 'premium'));
