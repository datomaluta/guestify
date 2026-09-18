-- ============================================================================
-- 0011_drop_hotel_rules_content.sql
-- hotel_rules.content_ka/en/ru აღარ გამოიყენება — Essentials-ის "House rules"
-- სექცია წესებს chip-ებად აჩვენებს (icon + სათაური მხოლოდ), აღწერის გარეშე.
-- ველები ამოღებულია admin rules-editor-იდანაც, ამიტომ ბაზიდანაც ვშლით.
-- ============================================================================

alter table public.hotel_rules
  drop column if exists content_ka,
  drop column if exists content_en,
  drop column if exists content_ru;
