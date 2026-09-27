-- ============================================================================
-- 0019_hotel_google_review_url.sql
-- Guest app-ის Home გვერდზე "შეგვაფასე Google-ზე" ბანერი — სასტუმროს Google-ის
-- რევიუს დასაწერი ბმული. იგივე კონვენცია რაც pharmacy_maps_url (0016): ენისგან
-- დამოუკიდებელი სრული ბმული, admin-ის მიერ ჩასმული. ორივე ფორმატი მუშაობს:
--   https://g.page/r/<ID>/review  (Business Profile → "Ask for reviews")
--   https://search.google.com/local/writereview?placeid=<PLACE_ID>
--
-- nullable — guest UI ბანერს საერთოდ არ აჩვენებს, თუ ცარიელია. ყველა პაკეტზე ხელმისაწვდომია.
-- ============================================================================

alter table public.hotels
  add column if not exists google_review_url text;

comment on column public.hotels.google_review_url is 'Google-ის რევიუს დასაწერი ბმული — Home გვერდის "შეგვაფასე Google-ზე" ბანერი';
