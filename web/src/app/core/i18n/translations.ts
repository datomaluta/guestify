import { AppLanguage } from '../models';

/**
 * აპლიკაციის სტატიკური UI ტექსტები (ღილაკები, სათაურები, სტატუსები).
 * სასტუმროს რეალური კონტენტი (სერვისები, მენიუ, გზამკვლევი) კი პირდაპირ
 * ბაზიდან მოდის localize() ფუნქციით — იხ. core/models/localized.ts
 */
export const TRANSLATIONS: Record<string, Record<AppLanguage, string>> = {
  app_loading: { ka: 'იტვირთება…', en: 'Loading…', ru: 'Загрузка…' },
  app_error_hotel_not_found_title: {
    ka: 'სასტუმრო ვერ მოიძებნა',
    en: 'Hotel not found',
    ru: 'Отель не найден',
  },
  app_error_hotel_not_found_desc: {
    ka: 'შეამოწმეთ QR კოდი ან ბმული და სცადეთ ხელახლა',
    en: 'Please check the QR code or link and try again',
    ru: 'Проверьте QR-код или ссылку и попробуйте снова',
  },

  greet_title: { ka: 'მოგესალმებით', en: 'Welcome', ru: 'Добро пожаловать' },
  home_welcome_to: {
    ka: 'მოგესალმებით',
    en: 'Welcome to',
    ru: 'Добро пожаловать в',
  },

  home_intent_title: {
    ka: 'რისი გაკეთება გსურთ?',
    en: 'What would you like to do?',
    ru: 'Что вы хотите сделать?',
  },
  home_intent_arrived: {
    ka: 'ახლახანს ჩამოვედი',
    en: 'I just arrived',
    ru: 'Я только что прибыл',
  },
  home_intent_need: {
    ka: 'რაღაც მჭირდება...',
    en: 'I need something',
    ru: 'Мне что-то нужно',
  },
  home_intent_explore: {
    ka: 'მინდა აღმოვაჩინო',
    en: 'I want to explore',
    ru: 'Хочу осмотреться',
  },

  home_qa_title: {
    ka: 'სწრაფი წვდომა',
    en: 'Quick access',
    ru: 'Быстрый доступ',
  },
  home_qa_wifi: { ka: 'Wi-Fi', en: 'Wi-Fi', ru: 'Wi-Fi' },
  home_qa_checkout: { ka: 'Check-out', en: 'Check-out', ru: 'Выезд' },
  home_qa_parking: { ka: 'პარკინგი', en: 'Parking', ru: 'Парковка' },
  home_qa_contact_host: {
    ka: 'ჰოსტი',
    en: 'Host',
    ru: 'Хозяин',
  },

  home_favorites_title: {
    ka: 'ადგილობრივი რჩევები',
    en: 'Local Favorites',
    ru: 'Местные фавориты',
  },
  home_favorites_subtitle: {
    ka: 'შერჩეული რეკომენდაციები თქვენთვის',
    en: 'Handpicked recommendations for you',
    ru: 'Рекомендации, подобранные для вас',
  },
  home_fav_open_maps: {
    ka: 'რუკაზე ნახვა',
    en: 'Open in Maps',
    ru: 'Открыть карту',
  },
  home_min_walk_suffix: {
    ka: 'წუთი',
    en: 'min',
    ru: 'мин',
  },
  home_fav_see_all: {
    ka: 'ყველას ნახვა',
    en: 'See all',
    ru: 'Смотреть все',
  },
  guide_cat_cafe: { ka: 'კაფე', en: 'Café', ru: 'Кафе' },
  guide_cat_restaurant: { ka: 'რესტორანი', en: 'Restaurant', ru: 'Ресторан' },
  guide_cat_experience: {
    ka: 'გამოცდილება',
    en: 'Experience',
    ru: 'Впечатление',
  },
  guide_cat_attraction: {
    ka: 'ღირსშესანიშნაობა',
    en: 'Attraction',
    ru: 'Достопримечательность',
  },
  guide_cat_shop: { ka: 'მაღაზია', en: 'Shop', ru: 'Магазин' },
  guide_cat_other: { ka: 'ადგილი', en: 'Place', ru: 'Место' },

  greet_sub: {
    ka: 'აირჩიეთ სექცია დასაწყებად',
    en: 'Choose a section to get started',
    ru: 'Выберите раздел, чтобы начать',
  },

  nav_services: {
    ka: 'სასტუმროს სერვისები',
    en: 'Hotel Services',
    ru: 'Услуги отеля',
  },
  nav_services_desc: {
    ka: 'საუზმე, Spa და მეტი',
    en: 'Breakfast, spa & more',
    ru: 'Завтрак, спа и другое',
  },
  nav_menu: {
    ka: 'რესტორნის მენიუ',
    en: 'Restaurant Menu',
    ru: 'Меню ресторана',
  },
  nav_menu_desc: {
    ka: 'კერძები და ფასები',
    en: 'Dishes & prices',
    ru: 'Блюда и цены',
  },
  nav_guide: {
    ka: 'თქვენი გზამკვლევი',
    en: 'Local Guide',
    ru: 'Локальный гид',
  },
  nav_guide_desc: {
    ka: 'რას ვნახავთ ახლომახლო',
    en: "What's nearby",
    ru: 'Что рядом',
  },
  nav_rules: {
    ka: 'წესები და კონტაქტი',
    en: 'Rules & Contact',
    ru: 'Правила и контакты',
  },
  bottomnav_home: { ka: 'მთავარი', en: 'Home', ru: 'Главная' },
  bottomnav_explore: { ka: 'აღმოაჩინე', en: 'Explore', ru: 'Рядом' },
  bottomnav_essentials: { ka: 'საჭიროებები', en: 'Essentials', ru: 'Полезное' },
  bottomnav_ai: { ka: 'AI', en: 'AI', ru: 'AI' },
  bottomnav_restaurant: { ka: 'მენიუ', en: 'Menu', ru: 'Меню' },

  nav_rules_desc: {
    ka: 'Check-in, წესები, კონტაქტი',
    en: 'Check-in, rules & contacts',
    ru: 'Заезд, правила, контакты',
  },

  back: { ka: 'უკან', en: 'Back', ru: 'Назад' },

  menu_title: {
    ka: 'რესტორნის მენიუ',
    en: 'Restaurant Menu',
    ru: 'Меню ресторана',
  },
  // --- Menu item detail sheet (guest tab) ---
  menu_item_ingredients: {
    ka: 'შემადგენლობა',
    en: 'Ingredients',
    ru: 'Состав',
  },
  menu_item_allergens: { ka: 'ალერგენები', en: 'Allergens', ru: 'Аллергены' },
  allergen_gluten: { ka: 'გლუტენი', en: 'Gluten', ru: 'Глютен' },
  allergen_dairy: { ka: 'რძის პროდუქტი', en: 'Dairy', ru: 'Молочные продукты' },
  allergen_nuts: { ka: 'თხილეული', en: 'Nuts', ru: 'Орехи' },
  allergen_peanuts: { ka: 'არაქისი', en: 'Peanuts', ru: 'Арахис' },
  allergen_egg: { ka: 'კვერცხი', en: 'Egg', ru: 'Яйцо' },
  allergen_soy: { ka: 'სოია', en: 'Soy', ru: 'Соя' },
  allergen_fish: { ka: 'თევზი', en: 'Fish', ru: 'Рыба' },
  allergen_shellfish: {
    ka: 'ზღვის პროდუქტები',
    en: 'Shellfish',
    ru: 'Морепродукты',
  },
  allergen_molluscs: { ka: 'მოლუსკები', en: 'Molluscs', ru: 'Моллюски' },
  allergen_celery: { ka: 'ნიახური', en: 'Celery', ru: 'Сельдерей' },
  allergen_mustard: { ka: 'მდოგვი', en: 'Mustard', ru: 'Горчица' },
  allergen_sesame: { ka: 'სუსამი', en: 'Sesame', ru: 'Кунжут' },
  allergen_sulfites: { ka: 'სულფიტები', en: 'Sulfites', ru: 'Сульфиты' },
  allergen_lupin: { ka: 'ლუპინი', en: 'Lupin', ru: 'Люпин' },
  allergen_spicy: { ka: 'ცხარე', en: 'Spicy', ru: 'Острое' },

  guide_title: {
    ka: 'ადგილობრივი გზამკვლევი',
    en: 'Local Guide',
    ru: 'Локальный гид',
  },
  guide_more_soon: {
    ka: 'მალე დაემატება სხვა ლოკაციებიც',
    en: 'More locations coming soon',
    ru: 'Скоро появятся другие места',
  },
  // --- AI Concierge (guest tab) ---
  ai_greeting_text: {
    ka: 'გამარჯობა! მვ ვარ თქვენი AI ასისტენტი. როგორ შემიძლია დაგეხმაროთ?',
    en: 'Hi there! I’m your AI assistant. How can I help make your stay amazing?',
    ru: 'Привет! Я ваш AI-ассистент. Как я могу сделать ваше пребывание ещё лучше?',
  },
  ai_header_title: { ka: 'ჰკითხე AI-ს', en: 'Ask AI', ru: 'Спросите AI' },
  ai_input_placeholder: {
    ka: 'რა გაინტერესებთ?',
    en: 'What would you like to know?',
    ru: 'Что вы хотели бы узнать?',
  },
  ai_helper_text: {
    ka: 'დაუყოვნებელი პასუხები, 24/7, თქვენი დარჩენის განმავლობაში.',
    en: 'Instant answers, 24/7 during your stay.',
    ru: 'Мгновенные ответы, 24/7 на протяжении всего проживания.',
  },
  ai_hedge_prefix: {
    ka: 'ალბათ ამას გულისხმობთ:',
    en: 'Perhaps you mean:',
    ru: 'Возможно, вы имеете в виду:',
  },
  ai_fallback_text: {
    ka: 'ზუსტად ვერ მივხვდი, რას გულისხმობთ 🙂 სცადეთ სხვანაირად ჩამოაყალიბოთ, ან დარეკეთ რეცეფციაში.',
    en: 'I couldn’t quite understand that 🙂 Try rephrasing your question, or call reception.',
    ru: 'Я не совсем понял, что вы имеете в виду 🙂 Попробуйте переформулировать вопрос или позвоните на ресепшен.',
  },
  ai_faq_heading: {
    ka: 'ხშირად კითხულობენ',
    en: 'People often ask',
    ru: 'Часто спрашивают',
  },
  ai_contact_host_cta: {
    ka: 'დარეკეთ მიმღებში',
    en: 'Call reception',
    ru: 'Позвонить на ресепшен',
  },
  // ai_topic_*_label key-ები აღარ არსებობს — თემების სათაურები (title_ka/en/ru) ახლა
  // Supabase `ai_topics` ცხრილიდან მოდის (localize()-ით), არა აქედან. იხ. ai-topics-editor.

  empty_state: {
    ka: 'ინფორმაცია მალე დაემატება',
    en: 'Information coming soon',
    ru: 'Информация появится позже',
  },

  // --- Essentials (guest tab) ---
  essentials_wifi_title: { ka: 'Wi-Fi', en: 'Wi-Fi', ru: 'Wi-Fi' },
  essentials_wifi_subtitle: {
    ka: 'საჭიროებები',
    en: 'Essentials',
    ru: 'Полезное',
  },
  essentials_wifi_network_label: { ka: 'ქსელი', en: 'Network', ru: 'Сеть' },
  essentials_wifi_password_label: {
    ka: 'პაროლი',
    en: 'Password',
    ru: 'Пароль',
  },
  essentials_copy_button: { ka: 'კოპირება', en: 'Copy', ru: 'Копировать' },
  essentials_copied_button: {
    ka: 'დაკოპირდა',
    en: 'Copied',
    ru: 'Скопировано',
  },
  essentials_checkin_title: { ka: 'Check-in', en: 'Check-in', ru: 'Заезд' },
  essentials_checkout_title: { ka: 'Check-out', en: 'Check-out', ru: 'Выезд' },
  essentials_call_title: { ka: 'დარეკვა', en: 'Call', ru: 'Позвонить' },
  essentials_whatsapp_title: { ka: 'WhatsApp', en: 'WhatsApp', ru: 'WhatsApp' },
  essentials_whatsapp_subtitle: {
    ka: 'მიწერეთ მასპინძელს',
    en: 'Write host',
    ru: 'Написать хозяину',
  },
  essentials_rules_title: {
    ka: 'წესები',
    en: 'House rules',
    ru: 'Правила дома',
  },
  essentials_services_title: { ka: 'სერვისები', en: 'Services', ru: 'Услуги' },
  essentials_featured_amenities_title: {
    ka: 'გამორჩეული სერვისები',
    en: 'Featured Amenities',
    ru: 'Особые удобства',
  },
  featured_amenity_hours_label: {
    ka: 'სამუშაო საათები',
    en: 'Working hours',
    ru: 'Часы работы',
  },
  featured_amenity_view_details: {
    ka: 'დეტალურად ნახვა',
    en: 'View details',
    ru: 'Подробнее',
  },
  essentials_pharmacy_title: { ka: 'აფთიაქი', en: 'Pharmacy', ru: 'Аптека' },
  essentials_atm_title: { ka: 'ATM', en: 'ATM', ru: 'ATM' },
  essentials_emergency_general: {
    ka: 'ზოგადი საგანგებო დახმარება',
    en: 'General emergency',
    ru: 'Общая экстренная служба',
  },

  admin_login_title: {
    ka: 'ადმინისტრატორის შესვლა',
    en: 'Admin sign in',
    ru: 'Вход администратора',
  },
  admin_email_label: { ka: 'ელფოსტა', en: 'Email', ru: 'Эл. почта' },
  admin_password_label: { ka: 'პაროლი', en: 'Password', ru: 'Пароль' },
  admin_login_button: { ka: 'შესვლა', en: 'Sign in', ru: 'Войти' },
  admin_login_error: {
    ka: 'შესვლა ვერ მოხერხდა — გადაამოწმეთ მონაცემები',
    en: "Couldn't sign in — check your details",
    ru: 'Не удалось войти — проверьте данные',
  },

  // --- საჯარო ლენდინგ გვერდი (root `/`) ---
  landing_nav_demo: {
    ka: 'დემო',
    en: 'Demo',
    ru: 'Демо',
  },
  landing_nav_faq: {
    ka: 'ხშირი კითხვები',
    en: 'FAQ',
    ru: 'Частые вопросы',
  },
  landing_h1: {
    ka: 'ყველაფერი, რაც სტუმარს სჭირდება — ერთ მარტივ QR კოდში',
    en: 'Everything your guests need, in one simple QR',
    ru: 'Всё, что нужно вашим гостям — в одном простом QR-коде',
  },
  landing_sub: {
    ka: 'შექმენით ლამაზი ციფრული სტუმრის გზამკვლევი — Wi-Fi, ჩექინის დეტალები, სახლის წესები, ადგილობრივი რეკომენდაციები, დახმარების მოთხოვნები და AI დახმარება — ყველაფერი მყისიერად ხელმისაწვდომია სტუმრის ტელეფონიდან.',
    en: "Create a beautiful digital guest guide with Wi-Fi, check-in details, house rules, local recommendations, support requests, and AI help — all instantly available from your guest's phone.",
    ru: 'Создайте красивый цифровой гид для гостя — Wi-Fi, детали заезда, правила проживания, местные рекомендации, запросы на помощь и AI-помощник — всё мгновенно доступно с телефона гостя.',
  },
  landing_view_demo: {
    ka: 'დემოს ნახვა',
    en: 'View demo',
    ru: 'Посмотреть демо',
  },
  landing_cta: {
    ka: 'მოითხოვეთ დემო',
    en: 'Request a demo',
    ru: 'Запросить демо',
  },
  landing_trust: {
    ka: 'შექმნილია Airbnb-ჰოსტებისთვის, B&B-ებისთვის, საკურორტო ბინებისთვის, სასტუმროებისთვის და საკუთრების მმართველებისთვის.',
    en: 'Built for Airbnb hosts, B&Bs, vacation rentals, boutique stays, and property managers.',
    ru: 'Создано для хостов Airbnb, гостевых домов, апартаментов, бутик-отелей и управляющих недвижимостью.',
  },
  landing_check1: {
    ka: 'აპლიკაციის ჩამოტვირთვის გარეშე',
    en: 'No app download',
    ru: 'Без установки приложения',
  },
  landing_check2: {
    ka: 'არეული PDF-ების გარეშე',
    en: 'No messy PDFs',
    ru: 'Без запутанных PDF',
  },
  landing_check3: {
    ka: 'ნაკლები განმეორებადი შეტყობინება',
    en: 'Fewer repetitive messages',
    ru: 'Меньше повторяющихся сообщений',
  },
  landing_problem_eyebrow: {
    ka: 'პრობლემა',
    en: 'The problem',
    ru: 'Проблема',
  },
  landing_problem_title: {
    ka: 'სტუმრები ერთსა და იმავე კითხვებს ისევ და ისევ სვამენ',
    en: 'Guests ask the same questions again and again',
    ru: 'Гости снова и снова задают одни и те же вопросы',
  },
  landing_problem_q1: {
    ka: '„რა არის Wi-Fi პაროლი?“',
    en: '"What\'s the Wi-Fi password?"',
    ru: '«Какой пароль Wi-Fi?»',
  },
  landing_problem_q2: {
    ka: '„რომელ საათზეა check-out?“',
    en: '"What time is check-out?"',
    ru: '«Во сколько выезд?»',
  },
  landing_problem_q3: {
    ka: '„სად დავტოვოთ მანქანა?“',
    en: '"Where should we park?"',
    ru: '«Где нам припарковаться?»',
  },
  landing_problem_q4: {
    ka: '„როგორ დავუკავშირდეთ მასპინძელს?“',
    en: '"How do we contact the host?"',
    ru: '«Как связаться с хозяином?»',
  },
  landing_problem_body: {
    ka: 'სტუმრისთვის ეს დამაბნეველია. მასპინძლისთვის კი — ზედმეტი მიმოწერა. checkit ამცირებს ამ ხახუნს.',
    en: 'For guests, this can feel confusing. For hosts, it creates unnecessary back-and-forth. checkit helps reduce that friction.',
    ru: 'Для гостя это может сбивать с толку. Для хозяина — лишняя переписка. checkit снижает это трение.',
  },
  landing_why_title: {
    ka: 'რატომ checkit',
    en: 'Why checkit',
    ru: 'Почему checkit',
  },
  landing_why_body: {
    ka: 'ბეჭდური ბუკლეტი მალე მოძველდება, იკარგება ოთახიდან და ერთ ენაზეა დაბეჭდილი. Guestify-ით სტუმარი ყველაფერს ოთახიდანვე კითხულობს — თქვენ კი კონტენტს ცვლით წამებში, ხელახლა დაბეჭდვის გარეშე.',
    en: "A printed booklet goes stale, disappears from the room, and speaks one language. With Guestify your guest reads everything from where they're sitting — and you update the content in seconds, with nothing to reprint.",
    ru: 'Бумажный буклет быстро устаревает, теряется из номера и существует только на одном языке. С Guestify гость читает всё, не вставая с места, а вы меняете контент за секунды — без допечатки.',
  },

  landing_feat1_title: {
    ka: 'QR ყოველ ოთახში',
    en: 'A QR in every room',
    ru: 'QR в каждом номере',
  },
  landing_feat1_desc: {
    ka: 'სტუმარი კამერით ასკანერებს კოდს და პირდაპირ თქვენს გვერდზეა — ინსტალაციის გარეშე.',
    en: 'Guests scan with their camera and land straight on your page — nothing to install.',
    ru: 'Гость сканирует камерой и сразу попадает на вашу страницу — без установки.',
  },
  landing_feat2_title: {
    ka: 'კონტენტი რეალურ დროში',
    en: 'Content in real time',
    ru: 'Контент в реальном времени',
  },
  landing_feat2_desc: {
    ka: 'სერვისები, მენიუ, წესები და კონტაქტები — თქვენივე ადმინ პანელიდან იცვლება.',
    en: 'Services, menu, house rules and contacts — edited from your own admin panel.',
    ru: 'Услуги, меню, правила и контакты — редактируются в вашей админ-панели.',
  },
  landing_feat3_title: {
    ka: 'მრავალენოვანი ნაგულისხმევად',
    en: 'Multilingual by default',
    ru: 'Многоязычность по умолчанию',
  },
  landing_feat3_desc: {
    ka: 'სტუმარი თავად ირჩევს ენას, რომელზეც კითხულობს.',
    en: 'Guests choose the language they read in.',
    ru: 'Гость сам выбирает язык.',
  },
  landing_feat4_title: {
    ka: 'ადგილობრივი გზამკვლევი',
    en: 'Local guide',
    ru: 'Гид по окрестностям',
  },
  landing_feat4_desc: {
    ka: 'საუკეთესო რესტორნები და ღირსშესანიშნაობები სასტუმროს ირგვლივ — Google Maps ბმულით, ერთ შეხებაზე.',
    en: 'The best restaurants and sights around your property — with a one-tap Google Maps link.',
    ru: 'Лучшие рестораны и достопримечательности рядом с отелем — со ссылкой на Google Maps в один клик.',
  },

  landing_how_title: {
    ka: 'როგორ მუშაობს',
    en: 'How it works',
    ru: 'Как это работает',
  },
  landing_how_heading: {
    ka: 'შექმენით სტუმრის გზამკვლევი წუთებში',
    en: 'Create your guest guide in minutes',
    ru: 'Создайте гид для гостей за минуты',
  },
  landing_how_subtitle: {
    ka: 'დაამატეთ ინფორმაცია ერთხელ — სტუმარი QR-ს სკანერავს და მყისვე პოულობს ყველაფერს, რაც სჭირდება.',
    en: 'Add your info once. Guests scan the QR and find everything they need instantly.',
    ru: 'Добавьте информацию один раз. Гости сканируют QR и мгновенно находят всё, что нужно.',
  },
  landing_how1_title: {
    ka: 'ვამატებთ თქვენს შესახებ ინფორმაციას',
    en: 'We add your information',
    ru: 'Добавляем информацию о вас',
  },
  landing_how1_desc: {
    ka: 'სახლის წესები, რეკომენდაციები, კონტაქტები და ინსტრუქციები — ერთხელ, ადმინ პანელიდან.',
    en: 'House rules, recommendations, contacts and instructions — once, from the admin panel.',
    ru: 'Правила дома, рекомендации, контакты и инструкции — один раз, из админ-панели.',
  },
  landing_how2_title: {
    ka: 'გააზიარეთ ერთი QR-ით',
    en: 'Share it with one QR code',
    ru: 'Делитесь одним QR-кодом',
  },
  landing_how2_desc: {
    ka: 'დადეთ ოთახში, მისასალმებელ ბარათზე ან შეტყობინებაში.',
    en: 'Place it in the room, on a welcome card or in a message.',
    ru: 'Разместите в номере, на приветственной карточке или в сообщении.',
  },
  landing_how3_title: {
    ka: 'სტუმარი ხედავს მყისვე',
    en: 'Guests see it instantly',
    ru: 'Гости видят мгновенно',
  },
  landing_how3_desc: {
    ka: 'ხსნის ტელეფონიდან, აპლიკაციის ინსტალაციის გარეშე.',
    en: 'Opens on their phone — no app to install.',
    ru: 'Открывается на телефоне — без установки приложения.',
  },
  landing_how_highlight: {
    ka: 'აპლიკაციის ინსტალაცია არ სჭირდება. რთული სეთაფი არ არის. PDF-ები და ნაბეჭდი ბუკლეტები — აღარ.',
    en: 'No app to download. No complicated setup. No PDFs or printed binders.',
    ru: 'Не нужно скачивать приложение. Никакой сложной настройки. Никаких PDF и папок.',
  },

  landing_demo_heading: {
    ka: 'ნახეთ, რას იხილავენ თქვენი სტუმრები',
    en: 'See what your guests will experience',
    ru: 'Посмотрите, что увидят ваши гости',
  },
  landing_demo_body: {
    ka: 'checkit თქვენი სასტუმროს ინფორმაციას გარდაქმნის მარტივ, მობილურზე მორგებულ გზამკვლევად, რომელსაც სტუმარი QR კოდით მყისვე ხსნის.',
    en: 'checkit turns your property information into a simple, mobile-friendly guide your guests open instantly from a QR code.',
    ru: 'checkit превращает информацию о вашем объекте в простой, удобный для мобильных устройств гид, который гости мгновенно открывают по QR-коду.',
  },
  landing_demo_pill_wifi: {
    ka: 'Wi-Fi',
    en: 'Wi-Fi',
    ru: 'Wi-Fi',
  },
  landing_demo_pill_checkin: {
    ka: 'ჩექინი',
    en: 'Check-in',
    ru: 'Заезд',
  },
  landing_demo_pill_rules: {
    ka: 'წესები',
    en: 'Rules',
    ru: 'Правила',
  },
  landing_demo_pill_tips: {
    ka: 'რჩევები',
    en: 'Tips',
    ru: 'Советы',
  },
  landing_demo_pill_emergency: {
    ka: 'გადაუდებელი დახმარება',
    en: 'Emergency',
    ru: 'Экстренная помощь',
  },
  landing_demo_pill_ai: {
    ka: 'AI დახმარება',
    en: 'AI assistant',
    ru: 'AI-помощник',
  },
  landing_demo_features_cta: {
    ka: 'იხილეთ ფუნქციები',
    en: 'See the features',
    ru: 'Смотреть функции',
  },

  landing_testi_title: {
    ka: 'რას ამბობენ სასტუმროები',
    en: 'What hotels say',
    ru: 'Что говорят отели',
  },
  landing_testi1_quote: {
    ka: 'ადრე ყოველ ფასის ცვლილებაზე მთელი ბუკლეტის თავიდან დაბეჭდვა გვიწევდა. ახლა ამას ორ წუთში ვაკეთებთ, ტელეფონიდან.',
    en: 'We used to reprint the whole booklet for every price change. Now it takes two minutes, from a phone.',
    ru: 'Раньше при каждом изменении цены приходилось перепечатывать весь буклет. Теперь это занимает две минуты, с телефона.',
  },
  landing_testi1_who: {
    ka: '[სასტუმროს სახელი], [თანამდებობა]',
    en: '[Hotel name], [role]',
    ru: '[Название отеля], [должность]',
  },
  landing_testi2_quote: {
    ka: 'სტუმრები, რომლებიც ქართულს არ ფლობენ, ბევრად თავისუფლად გრძნობენ თავს — ყველაფერი საკუთარ ენაზე აქვთ, ერთი შეხებით.',
    en: "Guests who don't speak Georgian feel far more at ease — everything is in their own language, one tap away.",
    ru: 'Гости, не говорящие по-грузински, чувствуют себя намного увереннее — всё на их языке, в один клик.',
  },
  landing_testi2_who: {
    ka: '[სასტუმროს სახელი], [თანამდებობა]',
    en: '[Hotel name], [role]',
    ru: '[Название отеля], [должность]',
  },
  landing_testi3_quote: {
    ka: 'ბეჭდვაზე დანახარჯი პრაქტიკულად გავაქრეთ და რეცეფციაზე კითხვების რაოდენობაც შემცირდა.',
    en: "We've all but eliminated print costs, and front-desk questions have dropped noticeably.",
    ru: 'Расходы на печать практически исчезли, а вопросов на ресепшене стало заметно меньше.',
  },
  landing_testi3_who: {
    ka: '[სასტუმროს სახელი], [თანამდებობა]',
    en: '[Hotel name], [role]',
    ru: '[Название отеля], [должность]',
  },
  landing_testi4_quote: {
    ka: 'ახალ თანამშრომელსაც კი წუთებში ვასწავლით სისტემაში ცვლილებების შეტანას — ტექნიკური განათლება არ სჭირდება.',
    en: 'Even a new staff member learns to update the system in minutes — no technical background needed.',
    ru: 'Даже новый сотрудник осваивает обновление системы за минуты — без технических навыков.',
  },
  landing_testi4_who: {
    ka: '[სასტუმროს სახელი], [თანამდებობა]',
    en: '[Hotel name], [role]',
    ru: '[Название отеля], [должность]',
  },
  landing_testi5_quote: {
    ka: 'სტუმრები აღნიშნავენ, რომ ინფორმაციის ასე მარტივად პოვნა სასიამოვნო გამოცდილებაა — ეს ჩვენს შეფასებებშიც ჩანს.',
    en: 'Guests mention how easy it is to find information — it shows up in our reviews too.',
    ru: 'Гости отмечают, насколько легко находить информацию — это заметно и в наших отзывах.',
  },
  landing_testi5_who: {
    ka: '[სასტუმროს სახელი], [თანამდებობა]',
    en: '[Hotel name], [role]',
    ru: '[Название отеля], [должность]',
  },
  landing_testi_note: {
    ka: '* სანიმუშო ტექსტია — რეალურ სასტუმროებთან პილოტის შემდეგ ნამდვილი ციტატებით ჩანაცვლდება.',
    en: '* Sample copy — to be replaced with real quotes once we have pilot hotels.',
    ru: '* Пример текста — будет заменён реальными отзывами после пилота с отелями.',
  },

  landing_partners_eyebrow: {
    ka: 'სად გამოვიყენოთ',
    en: 'Built for',
    ru: 'Подходит для',
  },

  landing_cta2_title: {
    ka: 'მზად ხართ ბუკლეტს გამოეთხოვოთ?',
    en: 'Ready to retire the paper booklet?',
    ru: 'Готовы отказаться от бумажного буклета?',
  },

  landing_footer_tag: {
    ka: 'Guestify — ციფრული სტუმართა გზამკვლევი სასტუმროებისთვის.',
    en: 'Guestify — a digital guest guide for hotels.',
    ru: 'Guestify — цифровой гид для гостей отелей.',
  },
  landing_footer_made: {
    ka: 'შექმნილია საქართველოში',
    en: 'Made in Georgia',
    ru: 'Сделано в Грузии',
  },
};
