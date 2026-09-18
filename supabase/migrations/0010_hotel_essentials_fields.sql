-- ============================================================================
-- 0010_hotel_essentials_fields.sql
-- Guest app-ის "Essentials" ტაბისთვის — Wi-Fi, Check-in/Check-out, Airport,
-- Parking ველები პირდაპირ hotels ცხრილზე (თითო სასტუმროზე ზუსტად ერთი მნიშვნელობა,
-- არა სია — ამიტომ ცალკე ცხრილის ნაცვლად უბრალო სვეტებია).
--
-- Check-in/Check-out დრო+აღწერა და Parking აღწერა თავისუფალი ტექსტია, რომელსაც
-- სტუმარი მრავალენოვან guest UI-ში კითხულობს — ამიტომ დანარჩენი ცხრილების კონვენციით
-- (title_ka/en/ru და ა.შ.) _ka/_en/_ru სვეტებადაა გაყოფილი, localize() helper-ისთვის.
-- Wi-Fi ქსელი/პაროლი და Maps ბმული კი ენისგან დამოუკიდებელი პირდაპირი მნიშვნელობებია.
--
-- ყველა სვეტი nullable-ია — guest UI შესაბამის ბლოკს არ აჩვენებს, თუ ცარიელია.
-- ============================================================================

alter table public.hotels
  add column if not exists wifi_network     text,
  add column if not exists wifi_password    text,
  add column if not exists checkin_time_ka  text,
  add column if not exists checkin_time_en  text,
  add column if not exists checkin_time_ru  text,
  add column if not exists checkin_note_ka  text,
  add column if not exists checkin_note_en  text,
  add column if not exists checkin_note_ru  text,
  add column if not exists checkout_time_ka text,
  add column if not exists checkout_time_en text,
  add column if not exists checkout_time_ru text,
  add column if not exists checkout_note_ka text,
  add column if not exists checkout_note_en text,
  add column if not exists checkout_note_ru text,
  add column if not exists airport_maps_url text,
  add column if not exists parking_info_ka  text,
  add column if not exists parking_info_en  text,
  add column if not exists parking_info_ru  text;

comment on column public.hotels.wifi_network is 'Wi-Fi ქსელის სახელი — Essentials გვერდზე, კოპირების ღილაკით';
comment on column public.hotels.wifi_password is 'Wi-Fi პაროლი — Essentials გვერდზე, კოპირების ღილაკით';
comment on column public.hotels.checkin_time_ka is 'მაგ. "15:00-დან" — Essentials-ის Check-in მწკრივის დროის ბეჯი (მრავალენოვანი)';
comment on column public.hotels.checkin_note_ka is 'Check-in-ის დეტალური აღწერა (გახსნადი ბლოკი, მრავალენოვანი)';
comment on column public.hotels.checkout_time_ka is 'მაგ. "11:00-მდე" — Essentials-ის Check-out მწკრივის დროის ბეჯი (მრავალენოვანი)';
comment on column public.hotels.checkout_note_ka is 'Check-out-ის დეტალური აღწერა (გახსნადი ბლოკი, მრავალენოვანი)';
comment on column public.hotels.airport_maps_url is 'აეროპორტის Google Maps ბმული — Essentials-ის Airport ღილაკი';
comment on column public.hotels.parking_info_ka is 'პარკინგის აღწერა (მდებარეობა, ტარიფი) — Essentials-ის Parking ბარათი (მრავალენოვანი)';
