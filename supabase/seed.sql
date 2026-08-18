-- ============================================================================
-- seed.sql — დემო სასტუმრო: Aura Hotel Tbilisi (slug: aurahotel)
-- გაუშვით Supabase SQL Editor-იდან migration-ების შემდეგ.
-- უსაფრთხოდ ხელახლა გასაშვებია — ჯერ შლის ძველ დემო-მონაცემებს.
-- ============================================================================

delete from public.hotels where slug = 'aurahotel';

with new_hotel as (
  insert into public.hotels (slug, name, primary_color, secondary_color, default_language, address, phone, email, whatsapp, is_active)
  values (
    'aurahotel',
    'Aura Hotel Tbilisi',
    '#96772F',
    '#7A2638',
    'ka',
    'ი. ჭავჭავაძის გამზირი 12, თბილისი',
    '+995 32 200 00 00',
    'info@aurahotel.ge',
    '+995 555 00 00 00',
    true
  )
  returning id
)
insert into public.services (hotel_id, icon, title_ka, title_en, title_ru, description_ka, description_en, description_ru, sort_order)
select id, v.icon, v.title_ka, v.title_en, v.title_ru, v.description_ka, v.description_en, v.description_ru, v.sort_order
from new_hotel, (values
  ('cup', 'საუზმე 07:00–11:00', 'Breakfast 07:00–11:00', 'Завтрак 07:00–11:00',
   'მე-2 სართული, რესტორანი Terrazza', '2nd floor, Terrazza restaurant', '2 этаж, ресторан Terrazza', 1),
  ('droplet', 'Spa და საუნა', 'Spa & Sauna', 'Спа и сауна',
   'ღიაა 09:00–22:00, წინასწარი ჩაწერით', 'Open 09:00–22:00, by appointment', 'Открыто 09:00–22:00, по записи', 2),
  ('clock', 'Room Service 24/7', 'Room Service 24/7', 'Room Service 24/7',
   'დარეკეთ რეცეფციაზე ან შეუკვეთეთ აპლიკაციიდან', 'Call reception or order from the app', 'Позвоните на ресепшн или закажите через приложение', 3),
  ('wifi', 'უფასო Wi-Fi', 'Free Wi-Fi', 'Бесплатный Wi-Fi',
   'ქსელი: AuraGuest, პაროლი: hotel2026', 'Network: AuraGuest, password: hotel2026', 'Сеть: AuraGuest, пароль: hotel2026', 4)
) as v(icon, title_ka, title_en, title_ru, description_ka, description_en, description_ru, sort_order);

-- მენიუს კატეგორიები + კერძები
with h as (select id from public.hotels where slug = 'aurahotel'),
cats as (
  insert into public.menu_categories (hotel_id, name_ka, name_en, name_ru, sort_order)
  select h.id, v.name_ka, v.name_en, v.name_ru, v.sort_order
  from h, (values
    ('საწყისები', 'Starters', 'Закуски', 1),
    ('მთავარი კერძები', 'Mains', 'Основные блюда', 2),
    ('დესერტები', 'Desserts', 'Десерты', 3)
  ) as v(name_ka, name_en, name_ru, sort_order)
  returning id, name_ka
)
insert into public.menu_items (hotel_id, category_id, name_ka, name_en, name_ru, description_ka, description_en, description_ru, price, sort_order)
select h.id, cats.id, v.name_ka, v.name_en, v.name_ru, v.description_ka, v.description_en, v.description_ru, v.price, v.sort_order
from h, cats,
(values
  ('საწყისები', 'ბადრიჯნის ნიგვზით', 'Eggplant with Walnut Paste', 'Баклажаны с ореховой пастой',
   'ცხარე ნიგვზის პასტა, ბროწეული', 'Spicy walnut paste, pomegranate', 'Острая ореховая паста, гранат', 12, 1),
  ('საწყისები', 'ფხალი ასორტი', 'Pkhali Assortment', 'Ассорти пхали',
   'სპანახის, ჭარხლის, ლობიოს ფხალი', 'Spinach, beet & bean pkhali', 'Пхали из шпината, свёклы и фасоли', 10, 2),
  ('მთავარი კერძები', 'ხინკალი (5 ცალი)', 'Khinkali (5 pcs)', 'Хинкали (5 шт)',
   'ხორცის, ცხარე ბულიონით', 'Meat-filled, spiced broth', 'С мясом, острый бульон', 18, 1),
  ('მთავარი კერძები', 'მწვადი', 'Mtsvadi (Grilled Skewers)', 'Мцвади (шашлык)',
   'ცეცხლზე შემწვარი ღორის ხორცი', 'Charcoal-grilled pork', 'Свинина на углях', 32, 2),
  ('მთავარი კერძები', 'ლობიანი', 'Lobiani (Bean Bread)', 'Лобиани',
   'ცხელი პური ლობიოს გულით', 'Warm bread with bean filling', 'Тёплый хлеб с фасолевой начинкой', 14, 3),
  ('დესერტები', 'ჩურჩხელა', 'Churchkhela', 'Чурчхела',
   'თხილი ყურძნის წვენში', 'Nuts in grape must', 'Орехи в виноградном соке', 8, 1),
  ('დესერტები', 'ნაპოლეონი', 'Napoleon Cake', 'Наполеон',
   'ფენოვანი ნამცხვარი კრემით', 'Layered cake with cream', 'Слоёный торт с кремом', 11, 2)
) as v(cat_name, name_ka, name_en, name_ru, description_ka, description_en, description_ru, price, sort_order)
where cats.name_ka = v.cat_name;

-- ადგილობრივი გზამკვლევი
with h as (select id from public.hotels where slug = 'aurahotel')
insert into public.local_guide_places (hotel_id, category, name_ka, name_en, name_ru, description_ka, description_en, description_ru, google_maps_url, sort_order)
select h.id, v.category, v.name_ka, v.name_en, v.name_ru, v.description_ka, v.description_en, v.description_ru, v.maps_url, v.sort_order
from h, (values
  ('attraction', 'ძველი თბილისი', 'Old Tbilisi', 'Старый Тбилиси',
   '15 წუთი ფეხით — ბალნეოლოგიური უბანი და ვიწრო ქუჩები', '15-minute walk — sulfur bath district and narrow lanes', '15 минут пешком — район серных бань и узкие улочки',
   'https://maps.google.com/?q=Old+Tbilisi', 1),
  ('attraction', 'ნარიყალას ციხე', 'Narikala Fortress', 'Крепость Нарикала',
   'პანორამული ხედი ქალაქზე, საბაგირო 5 წუთის სავალზეა', 'Panoramic city view, cable car 5 minutes away', 'Панорамный вид на город, канатная дорога в 5 минутах',
   'https://maps.google.com/?q=Narikala+Fortress', 2),
  ('shop', 'დეზერტირთა ბაზარი', 'Dezerter Bazaar', 'Дезертирский рынок',
   'ადგილობრივი ხილი, სანელებლები და სუვენირები', 'Local fruit, spices and souvenirs', 'Местные фрукты, специи и сувениры',
   'https://maps.google.com/?q=Dezerter+Bazaar+Tbilisi', 3)
) as v(category, name_ka, name_en, name_ru, description_ka, description_en, description_ru, maps_url, sort_order);

-- წესები
with h as (select id from public.hotels where slug = 'aurahotel')
insert into public.hotel_rules (hotel_id, title_ka, title_en, title_ru, content_ka, content_en, content_ru, sort_order)
select h.id, v.title_ka, v.title_en, v.title_ru, v.content_ka, v.content_en, v.content_ru, v.sort_order
from h, (values
  ('Check-in / Check-out', 'Check-in / Check-out', 'Заезд / Выезд',
   'Check-in: 14:00-დან. Check-out: 12:00-მდე', 'Check-in from 14:00. Check-out until 12:00', 'Заезд с 14:00. Выезд до 12:00', 1),
  ('შინაური ცხოველები', 'Pets', 'Домашние животные',
   'დასაშვებია წინასწარი შეთანხმებით', 'Allowed with prior arrangement', 'Разрешены по предварительному согласованию', 2),
  ('მოწევა', 'Smoking', 'Курение',
   'ნომრებში აკრძალულია, გამოყოფილი ზონაა ტერასაზე', 'Not allowed in rooms, a designated area is on the terrace', 'В номерах запрещено, есть зона на террасе', 3)
) as v(title_ka, title_en, title_ru, content_ka, content_en, content_ru, sort_order);

-- საკონტაქტო ხაზები
with h as (select id from public.hotels where slug = 'aurahotel')
insert into public.hotel_contacts (hotel_id, label_ka, label_en, label_ru, phone, sort_order)
select h.id, v.label_ka, v.label_en, v.label_ru, v.phone, v.sort_order
from h, (values
  ('რეცეფცია', 'Reception', 'Ресепшн', '+995 32 200 00 00', 1),
  ('Room Service', 'Room Service', 'Room Service', '+995 32 200 00 01', 2),
  ('ტაქსი', 'Taxi', 'Такси', '+995 555 11 22 33', 3)
) as v(label_ka, label_en, label_ru, phone, sort_order);
