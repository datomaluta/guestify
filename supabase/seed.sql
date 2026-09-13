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
  ('local_cafe', 'საუზმე 07:00–11:00', 'Breakfast 07:00–11:00', 'Завтрак 07:00–11:00',
   'მე-2 სართული, რესტორანი Terrazza', '2nd floor, Terrazza restaurant', '2 этаж, ресторан Terrazza', 1),
  ('spa', 'Spa და საუნა', 'Spa & Sauna', 'Спа и сауна',
   'ღიაა 09:00–22:00, წინასწარი ჩაწერით', 'Open 09:00–22:00, by appointment', 'Открыто 09:00–22:00, по записи', 2),
  ('schedule', 'Room Service 24/7', 'Room Service 24/7', 'Room Service 24/7',
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

-- AI კონსიერჟის თემები (Phase 1-ის core/services/ai-topics.local-data.ts-ის იგივე კონტენტი,
-- ახლა ბაზაში, admin-რედაქტირებადი — იხ. features/admin/content/ai-topics-editor)
with h as (select id from public.hotels where slug = 'aurahotel')
insert into public.ai_topics (
  hotel_id, icon, title_ka, title_en, title_ru,
  keywords_ka, keywords_en, keywords_ru,
  answer_ka, answer_en, answer_ru, sort_order
)
select
  h.id, v.icon, v.title_ka, v.title_en, v.title_ru,
  v.keywords_ka, v.keywords_en, v.keywords_ru,
  v.answer_ka, v.answer_en, v.answer_ru, v.sort_order
from h, (values
  ('wifi', 'Wi-Fi წვდომა', 'Wi-Fi access', 'Доступ к Wi-Fi',
   array['ვაიფაი','ვაი-ფაი','ინტერნეტი','პაროლი','ქსელი','ვაიფაის','ვაიფაიზე'],
   array['wifi','wi-fi','internet','password','network','connection'],
   array['вайфай','wifi','интернет','пароль','сеть','вай-фай'],
   'უფასო Wi-Fi ყველგან ხელმისაწვდომია. ქსელის სახელია AuraGuest, პაროლი — hotel2026.',
   'Free Wi-Fi is available throughout the hotel. Network name is AuraGuest, password is hotel2026.',
   'Бесплатный Wi-Fi доступен на всей территории отеля. Название сети — AuraGuest, пароль — hotel2026.',
   1),
  ('login', 'Check-in ინფო', 'Check-in info', 'Информация о заезде',
   array['check-in','ჩექინი','ჩექ-ინი','შემოსვლა','დარეგისტრირება','მოსვლა'],
   array['check-in','checkin','arrival','arrive'],
   array['заезд','регистрация','check-in','чекин'],
   'Check-in შესაძლებელია 14:00 საათიდან. თუ უფრო ადრე ჩამოხვალთ, ბარგს სიამოვნებით შევინახავთ რეცეფციაზე, სანამ ოთახი მზად იქნება.',
   'Check-in starts at 14:00. If you arrive earlier, we are happy to store your luggage at reception until your room is ready.',
   'Заезд возможен с 14:00. Если вы приедете раньше, мы с удовольствием сохраним ваш багаж на ресепшене, пока номер не будет готов.',
   2),
  ('logout', 'Check-out', 'Check-out', 'Выезд',
   array['check-out','ჩექაუთი','ჩექ-აუთი','გასვლა','დატოვება'],
   array['check-out','checkout','leave','late checkout'],
   array['выезд','чекаут','check-out'],
   'Check-out არის 12:00 საათამდე. გვიანი check-out-ის სურვილის შემთხვევაში, გთხოვთ წინასწარ დაუკავშირდეთ რეცეფციას — ხელმისაწვდომობის მიხედვით შევეცდებით დაგეხმაროთ.',
   'Check-out is until 12:00. If you would like a late check-out, please let reception know in advance and we will try to accommodate you depending on availability.',
   'Выезд — до 12:00. Если хотите поздний выезд, сообщите об этом на ресепшен заранее — мы постараемся помочь, в зависимости от загруженности.',
   3),
  ('explore', 'ადგილობრივი რჩევები', 'Local tips', 'Советы о городе',
   array['რას ვინახულო','ღირსშესანიშნაობები','ძველი თბილისი','ნარიყალა','ექსკურსია','რა ვნახო','ტურისტული'],
   array['things to do','sightseeing','attractions','explore','old tbilisi','narikala'],
   array['что посмотреть','экскурсии','достопримечательности','старый тбилиси','нарикала'],
   'ძველი თბილისი 15 წუთის სავალზეა და აუცილებლად ღირს მოსანახულებლად. ნარიყალას ციხე საბაგირო გზით 5 წუთშია მისაწვდომი, ხოლო დეზერტირის ბაზარი ავთენტური ადგილობრივი ატმოსფეროსთვისაა საუკეთესო. მეტი შემოთავაზებისთვის ნახეთ "აღმოაჩინე" ჩანართი.',
   'Old Tbilisi is a 15-minute walk away and well worth exploring. Narikala Fortress is just a 5-minute cable car ride, and Dezerter Bazaar is great for an authentic local atmosphere. Check the Explore tab for more recommendations.',
   'Старый Тбилиси находится в 15 минутах ходьбы и обязательно стоит посещения. Крепость Нарикала — всего в 5 минутах на канатной дороге, а Дезертирский базар отлично подойдёт для знакомства с местной атмосферой. Больше идей — во вкладке "Рядом".',
   4),
  ('local_parking', 'პარკინგი', 'Parking', 'Парковка',
   array['პარკინგი','მანქანა','ავტომობილი','გარაჟი','დგომა'],
   array['parking','car','garage','vehicle'],
   array['парковка','машина','гараж','автомобиль'],
   'სასტუმროს ეზოში შეზღუდული რაოდენობის ადგილია, პირველი მოსული — პირველი მომსახურდება პრინციპით. თუ ეზოში ადგილი არ აღმოჩნდა, ი. ჭავჭავაძის გამზირზე ფასიანი საზოგადოებრივი პარკინგია ხელმისაწვდომი.',
   'We have a limited number of on-site parking spots, available on a first-come, first-served basis. If the yard is full, paid public parking is available along I. Chavchavadze Ave.',
   'У нас ограниченное количество парковочных мест во дворе — в порядке живой очереди. Если мест во дворе нет, на проспекте И. Чавчавадзе есть платная городская парковка.',
   5),
  ('rule', 'წესები', 'House rules', 'Правила отеля',
   array['წესები','რეგულაცია'],
   array['house rules','rules','policy','policies'],
   array['правила','политика отеля'],
   'ზოგადი წესები მარტივია — პატივი სცეთ სხვა სტუმრებს და საკუთრებას. კონკრეტულად გაინტერესებთ ცხოველები, მოწევა, სიჩუმის საათები თუ სტუმრები? მკითხეთ პირდაპირ და ზუსტ პასუხს გაგცემთ.',
   'The general house rules are simple — please be respectful of other guests and the property. Curious about pets, smoking, quiet hours, or visitors specifically? Ask me directly and I will give you the exact answer.',
   'Общие правила простые — уважайте других гостей и имущество отеля. Интересует что-то конкретное — животные, курение, тихие часы или гости? Спросите напрямую, и я отвечу точно.',
   6),
  ('directions_car', 'ტრანსპორტი', 'Transport', 'Транспорт',
   array['ტაქსი','აეროპორტი','ტრანსფერი','გადაადგილება','მეტრო','ავტობუსი'],
   array['taxi','airport','transfer','transport','getting around','bus','metro'],
   array['такси','аэропорт','трансфер','транспорт','метро','автобус'],
   'აეროპორტამდე ტაქსით დაახლოებით 20 წუთია. სიამოვნებით დაგირეკავთ ჩვენს პარტნიორ ტაქსის მძღოლს — უბრალოდ დაგვიკავშირდით ნომერზე +995 555 11 22 33.',
   'The airport is about a 20-minute taxi ride away. We are happy to call our partner taxi driver for you — just reach out at +995 555 11 22 33.',
   'До аэропорта на такси — около 20 минут. Мы с радостью вызовем для вас нашего партнёрского таксиста — просто свяжитесь по номеру +995 555 11 22 33.',
   7),
  ('key', 'თვით-შესვლა', 'Self check-in', 'Самостоятельный заезд',
   array['კოდი','საკეტი','სახლში შესვლა','დამოუკიდებლად','გასაღები'],
   array['self check-in','door code','lockbox','key code','entry code'],
   array['код от двери','самостоятельный заезд','кодовый замок','код доступа'],
   'რეცეფცია 24 საათის განმავლობაში მუშაობს, ასე რომ სპეციალური კოდი არ გჭირდებათ — უბრალოდ მობრძანდით და ვინმე ყოველთვის შეგხვდებათ. თუ გვიან საათს ჩამოდიხართ, გთხოვთ წინასწარ გვამცნოთ.',
   'Reception is staffed 24 hours a day, so you will not need a special door code — someone will always be there to greet you. If you are arriving late at night, just let us know in advance.',
   'Ресепшен работает круглосуточно, поэтому специальный код от двери вам не понадобится — кто-то всегда будет вас встречать. Если приезжаете поздно ночью, просто предупредите нас заранее.',
   8),
  ('schedule', 'ადრეული/გვიანი დრო', 'Early/late times', 'Раннее/позднее время',
   array['ადრეული check-in','ადრე ჩამოვალ','გვიანი check-out','დაგვიანება','გახანგრძლივება'],
   array['early check-in','late check-out','earlier arrival','extend stay'],
   array['ранний заезд','поздний выезд','пораньше','продлить'],
   'ორივე შესაძლებელია ხელმისაწვდომობის მიხედვით — გთხოვთ წინასწარ გვწეროთ ან დაგვირეკოთ, რომ დაგეგმვაში დაგეხმაროთ. თუ ოთახი ჯერ მზად არ არის, ბარგს უსასყიდლოდ შევინახავთ.',
   'Both are possible depending on availability — please message or call us in advance so we can plan ahead. If your room is not ready yet, we will store your luggage free of charge.',
   'Оба варианта возможны, в зависимости от загруженности — напишите или позвоните нам заранее, чтобы мы могли всё спланировать. Если номер ещё не готов, бесплатно сохраним ваш багаж.',
   9),
  ('luggage', 'ბარგის შენახვა', 'Luggage storage', 'Хранение багажа',
   array['ბარგი','ჩემოდანი','შენახვა','დატოვება ბარგის'],
   array['luggage','bags','storage','suitcase'],
   array['багаж','чемодан','хранение вещей'],
   'რასაკვირველია — ბარგის შენახვა შესაძლებელია რეცეფციაზე უსასყიდლოდ, როგორც check-in-მდე, ისე check-out-ის შემდეგ.',
   'Of course — we offer free luggage storage at reception, both before check-in and after check-out.',
   'Конечно — мы бесплатно храним багаж на ресепшене, как до заезда, так и после выезда.',
   10),
  ('near_me', 'მისამართი', 'Directions', 'Как добраться',
   array['მისამართი','როგორ მოვიდე','სად მდებარეობს','რომელ ქუჩაზე','გზა'],
   array['directions','address','how to find','location','where is the hotel'],
   array['адрес','как добраться','где находится','маршрут'],
   'ჩვენ ვმდებარეობთ ი. ჭავჭავაძის გამზირი 12-ზე, თბილისში. შესასვლელი მთავარ ქუჩიდან ჩანს — თუ ვერ იპოვით, დაგვირეკეთ და გამოგეგებებით.',
   'We are located at I. Chavchavadze Avenue 12, Tbilisi. The entrance is visible from the main street — if you cannot find it, just call us and we will come out to meet you.',
   'Мы находимся по адресу проспект И. Чавчавадзе 12, Тбилиси. Вход виден с главной улицы — если не найдёте, позвоните нам, и мы вас встретим.',
   11),
  ('pets', 'ცხოველები', 'Pets', 'Животные',
   array['ცხოველები','ძაღლი','კატა','შინაური ცხოველი'],
   array['pets','dog','cat','animal'],
   array['животные','собака','кошка','питомец'],
   'შინაური ცხოველები დასაშვებია წინასწარი შეთანხმებით — გთხოვთ ჯავშნის დროს ან მანამდე გვაცნობოთ, რომ ყველაფერი მოვამზადოთ.',
   'Pets are welcome with prior arrangement — please let us know at the time of booking or beforehand so we can prepare accordingly.',
   'Мы принимаем животных по предварительной договорённости — сообщите нам при бронировании или заранее, чтобы мы всё подготовили.',
   12),
  ('smoke_free', 'მოწევა', 'Smoking', 'Курение',
   array['მოწევა','სიგარეტი','მწეველი'],
   array['smoking','cigarette','smoke'],
   array['курение','сигареты','курить'],
   'ოთახებში მოწევა აკრძალულია. სპეციალურად გამოყოფილი მოსაწევი ზონა ტერასაზეა მოწყობილი.',
   'Smoking is not allowed in the rooms. There is a designated smoking area on the terrace.',
   'Курение в номерах запрещено. Для курения отведена специальная зона на террасе.',
   13),
  ('bedtime', 'სიჩუმის საათები', 'Quiet hours', 'Тихие часы',
   array['სიჩუმე','ხმაური','ღამის საათები','დუმილი'],
   array['quiet hours','noise','silence','night time'],
   array['тихие часы','шум','тишина'],
   'სიჩუმის საათებია 23:00-დან 08:00-მდე — ამ დროს გთხოვთ სხვა სტუმრების პატივისცემით იყოთ საუბრისა თუ მუსიკის ხმაზე ყურადღებით.',
   'Quiet hours are from 23:00 to 08:00 — during this time please be mindful of noise from conversations or music out of respect for other guests.',
   'Тихие часы — с 23:00 до 08:00. В это время, пожалуйста, будьте внимательны к уровню шума из уважения к другим гостям.',
   14),
  ('group', 'სტუმრები', 'Visitors', 'Гости',
   array['სტუმარი','სტუმრების მოყვანა','დამატებითი ადამიანი','ვინმეს მოვიყვან'],
   array['visitors','guests policy','extra guest','bring someone'],
   array['гости','посетители','привести кого-то'],
   'დღის განმავლობაში სტუმრების მიღება პრობლემა არ არის — უბრალოდ გვაცნობეთ რეცეფციაზე. ღამის გათევა დაშვებულია მხოლოდ ოფიციალურად რეგისტრირებული სტუმრებისთვის.',
   'Having visitors during the day is not a problem — just let reception know. Overnight stays are only permitted for officially registered guests.',
   'Принимать гостей в течение дня — не проблема, просто сообщите на ресепшене. Ночевать могут только официально зарегистрированные гости.',
   15),
  ('payments', 'დეპოზიტი', 'Deposit', 'Депозит',
   array['დეპოზიტი','ზიანი','გირაო','დაზიანება'],
   array['deposit','damage','security deposit'],
   array['депозит','залог','ущерб'],
   'ოთახზე შესაძლოა მოთხოვნილ იქნეს მცირე დეპოზიტი check-in-ისას, რომელიც სრულად დაგიბრუნდებათ check-out-ისას, თუ ზიანი არ იქნება მიყენებული.',
   'A small security deposit may be requested at check-in and is fully refunded at check-out, provided no damage has occurred.',
   'При заезде может потребоваться небольшой депозит, который полностью возвращается при выезде, если не было нанесено ущерба.',
   16),
  ('local_atm', 'ბანკომატი/ვალუტა', 'ATM & currency', 'Банкомат и обмен валют',
   array['ბანკომატი','ვალუტის გადაცვლა','ნაღდი ფული','ვალუტა'],
   array['atm','currency exchange','cash','money exchange'],
   array['банкомат','обмен валюты','наличные'],
   'უახლოესი ბანკომატი 3 წუთის სავალზეა, გამზირზევე. ვალუტის გადაცვლის პუნქტიც იქვე ახლოს მდებარეობს.',
   'The nearest ATM is a 3-minute walk away, right on the avenue. A currency exchange office is also located nearby.',
   'Ближайший банкомат — в 3 минутах ходьбы, прямо на проспекте. Обменный пункт валюты тоже расположен неподалёку.',
   17),
  ('local_pharmacy', 'მაღაზია/აფთიაქი', 'Shops & pharmacy', 'Магазины и аптека',
   array['სუპერმარკეტი','მაღაზია','აფთიაქი','წამალი'],
   array['supermarket','grocery store','pharmacy','medicine'],
   array['супермаркет','магазин','аптека','лекарства'],
   'სუპერმარკეტი და 24-საათიანი აფთიაქი ორივე 5 წუთის სავალზეა სასტუმროდან.',
   'Both a supermarket and a 24-hour pharmacy are within a 5-minute walk from the hotel.',
   'Супермаркет и круглосуточная аптека находятся в 5 минутах ходьбы от отеля.',
   18),
  ('receipt_long', 'ტურისტული გადასახადი', 'Tourist tax', 'Туристический налог',
   array['ტურისტული გადასახადი','საკურორტო გადასახადი','დამატებითი გადასახადი'],
   array['tourist tax','city tax','extra fee'],
   array['туристический налог','городской сбор','доп плата'],
   'ჩვენთან დამატებითი ტურისტული გადასახადი არ ირიცხება — ყველა გადასახადი უკვე შედის ოთახის ფასში, დამალული ხარჯები არ გვაქვს.',
   'We do not charge a separate tourist tax — all fees are already included in your room price, no hidden costs.',
   'Мы не взимаем отдельный туристический налог — все сборы уже включены в стоимость номера, скрытых платежей нет.',
   19),
  ('sim_card', 'SIM ბარათი', 'SIM card', 'SIM-карта',
   array['სიმ ბარათი','ინტერნეტი გარეთ','მობილური ინტერნეტი','ნომერი'],
   array['sim card','mobile data','local number'],
   array['сим карта','мобильный интернет','местный номер'],
   'ადგილობრივი SIM ბარათის შეძენა შესაძლებელია უახლოეს მაღაზიაში (Magti, Beeline ან Geocell) — რეცეფცია სიამოვნებით მიგითითებთ ზუსტ ადგილას.',
   'You can buy a local SIM card at a nearby shop (Magti, Beeline, or Geocell) — reception will be happy to point you to the exact location.',
   'Местную SIM-карту можно приобрести в ближайшем магазине (Magti, Beeline или Geocell) — ресепшен с радостью подскажет точное место.',
   20)
) as v(
  icon, title_ka, title_en, title_ru,
  keywords_ka, keywords_en, keywords_ru,
  answer_ka, answer_en, answer_ru, sort_order
);
