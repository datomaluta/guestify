-- ============================================================================
-- 0012_menu_item_details.sql
-- Menu item detail sheet (guest app) — Ingredients და Allergens.
--
-- Ingredients თავისუფალი ტექსტია, მრავალენოვანი, დანარჩენი ცხრილის კონვენციით
-- (_ka/_en/_ru), localize()-ისთვის.
--
-- Allergens კი ფიქსირებული საკვანძო სიტყვების მასივია (არა თავისუფალი ტექსტი) —
-- გვერდზე თითო ალერგენს აქვს ხატულა+წარწერა, წარწერა კი სტატიკური UI თარგმანია
-- (core/i18n/translations.ts), არა ბაზის კონტენტი. ამიტომ საკმარისია text[] სვეტი.
-- ============================================================================

alter table public.menu_items
  add column if not exists ingredients_ka text,
  add column if not exists ingredients_en text,
  add column if not exists ingredients_ru text,
  add column if not exists allergens      text[] not null default '{}';

comment on column public.menu_items.ingredients_ka is 'კერძის შემადგენლობა (მრავალენოვანი) — დეტალების sheet-ში';
comment on column public.menu_items.allergens is 'ფიქსირებული ალერგენის საკვანძო სიტყვების მასივი (იხ. ALLERGENS core/models/menu.model.ts-ში)';
