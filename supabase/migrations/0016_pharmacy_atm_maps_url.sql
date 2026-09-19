-- ============================================================================
-- 0016_pharmacy_atm_maps_url.sql
-- Guest app-ის "Essentials" ტაბზე ორი ახალი Google Maps ბმული — უახლოესი აფთიაქი
-- და უახლოესი ბანკომატი. იგივე კონვენცია რაც airport_maps_url (0010): ენისგან
-- დამოუკიდებელი პირდაპირი ბმული, admin-ის მიერ ხელით მოძებნილი/ჩასმული.
--
-- ორივე სვეტი nullable-ია — guest UI შესაბამის ღილაკს საერთოდ არ აჩვენებს, თუ ცარიელია.
-- ============================================================================

alter table public.hotels
  add column if not exists pharmacy_maps_url text,
  add column if not exists atm_maps_url      text;

comment on column public.hotels.pharmacy_maps_url is 'უახლოესი აფთიაქის Google Maps ბმული — Essentials-ის Pharmacy ღილაკი';
comment on column public.hotels.atm_maps_url is 'უახლოესი ბანკომატის Google Maps ბმული — Essentials-ის ATM ღილაკი';
