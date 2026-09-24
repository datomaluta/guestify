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

  landing_features_eyebrow: {
    ka: 'ფუნქციები',
    en: 'Features',
    ru: 'Функции',
  },
  landing_features_heading_main: {
    ka: 'ყველაფერი, რაც სტუმარს სჭირდება',
    en: 'Everything your guests need',
    ru: 'Всё, что нужно вашим гостям',
  },
  landing_features_heading_accent: {
    ka: 'ერთ QR კოდში',
    en: 'in one QR code',
    ru: 'в одном QR-коде',
  },
  landing_features_subtitle: {
    ka: 'სუფთა, თანამედროვე გამოცდილება სტუმრისთვის — და მოწესრიგებული სისტემა თქვენთვის.',
    en: 'A clean, modern experience for guests — and a tidier system for you.',
    ru: 'Чистый, современный опыт для гостей — и более упорядоченная система для вас.',
  },
  landing_features1_title: {
    ka: 'Wi-Fi დეტალები',
    en: 'Wi-Fi details',
    ru: 'Данные Wi-Fi',
  },
  landing_features1_desc: {
    ka: 'სტუმარი მყისვე ხედავს Wi-Fi-ის მონაცემებს — მასპინძლისთვის მიწერის გარეშე.',
    en: 'Guests see the Wi-Fi details instantly — no need to message the host.',
    ru: 'Гости мгновенно видят данные Wi-Fi — без сообщений хозяину.',
  },
  landing_features2_title: {
    ka: 'ჩექინი და ჩექაუთი',
    en: 'Check-in & check-out',
    ru: 'Заезд и выезд',
  },
  landing_features2_desc: {
    ka: 'ჩამოსვლის ინსტრუქციები, დროები და ყველა მნიშვნელოვანი დეტალი — ნათლად.',
    en: 'Arrival instructions, times and every important detail — laid out clearly.',
    ru: 'Инструкции по заезду, время и все важные детали — понятно и чётко.',
  },
  landing_features3_title: {
    ka: 'სახლის წესები',
    en: 'House rules',
    ru: 'Правила дома',
  },
  landing_features3_desc: {
    ka: 'წესები ადვილად საპოვნელია, გასაგები და ხელმისაწვდომია რამდენიმე ენაზე.',
    en: 'Rules are easy to find, easy to understand and available in multiple languages.',
    ru: 'Правила легко найти, легко понять — доступны на нескольких языках.',
  },
  landing_features4_title: {
    ka: 'ადგილობრივი რეკომენდაციები',
    en: 'Local recommendations',
    ru: 'Местные рекомендации',
  },
  landing_features4_desc: {
    ka: 'საუკეთესო რესტორნები, კაფეები და ღირსშესანიშნაობები — სასტუმროს ირგვლივ.',
    en: 'The best restaurants, cafés and sights — right around the property.',
    ru: 'Лучшие рестораны, кафе и достопримечательности — рядом с отелем.',
  },
  landing_features5_title: {
    ka: 'კონტაქტი მასპინძელთან',
    en: 'Host contact',
    ru: 'Связь с хозяином',
  },
  landing_features5_desc: {
    ka: 'სტუმარს შეუძლია მარტივად დარეკოს ან მისწეროს, როცა დახმარება სჭირდება.',
    en: 'Guests can call or message the host easily whenever they need help.',
    ru: 'Гости могут легко позвонить или написать хозяину, когда нужна помощь.',
  },
  landing_features6_title: {
    ka: 'გადაუდებელი დახმარება',
    en: 'Emergency & essentials',
    ru: 'Экстренная помощь',
  },
  landing_features6_desc: {
    ka: 'სასწრაფო ნომრები, უახლოესი აფთიაქი და ბანკომატი — ერთ ადგილას.',
    en: 'Emergency numbers, the nearest pharmacy and ATM — all in one place.',
    ru: 'Экстренные номера, ближайшая аптека и банкомат — в одном месте.',
  },
  landing_features7_title: {
    ka: 'AI დამხმარე',
    en: 'AI guest assistant',
    ru: 'AI-помощник',
  },
  landing_features7_desc: {
    ka: 'სტუმარი ნებისმიერ კითხვას სვამს AI-ს — Wi-Fi-დან ტრანსპორტამდე.',
    en: 'Guests can ask the AI anything — from Wi-Fi to local transport.',
    ru: 'Гости могут спросить AI о чём угодно — от Wi-Fi до транспорта.',
  },
  landing_features8_title: {
    ka: 'მრავალენოვანი ნაგულისხმევად',
    en: 'Multilingual by default',
    ru: 'Многоязычность по умолчанию',
  },
  landing_features8_desc: {
    ka: 'სტუმარი თავად ირჩევს ენას, რომელზეც კითხულობს.',
    en: 'Guests choose the language they read in.',
    ru: 'Гость сам выбирает язык.',
  },
  landing_features9_title: {
    ka: 'განახლება რეალურ დროში',
    en: 'Real-time updates',
    ru: 'Обновления в реальном времени',
  },
  landing_features9_desc: {
    ka: 'შეცვალეთ ინფორმაცია ადმინ პანელიდან — სტუმრებს ეგრევე ემატებათ.',
    en: 'Update anything from the admin panel — guests see it instantly.',
    ru: 'Изменяйте информацию в админ-панели — гости видят это мгновенно.',
  },
  landing_features10_title: {
    ka: 'აპლიკაციის გარეშე',
    en: 'No app to download',
    ru: 'Без приложения',
  },
  landing_features10_desc: {
    ka: 'სტუმარი QR-ს სკანერავს და ბრაუზერში ხსნის — ანგარიშის ან ჩამოტვირთვის გარეშე.',
    en: 'Guests scan the QR and open it in their browser — no account, no download.',
    ru: 'Гости сканируют QR и открывают в браузере — без аккаунта и загрузок.',
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

  landing_ai_eyebrow: {
    ka: 'AI დამხმარე',
    en: 'AI guest assistant',
    ru: 'AI-помощник',
  },
  landing_ai_heading: {
    ka: 'AI, რომელიც განმეორებით კითხვებს თქვენ მაგივრად პასუხობს',
    en: 'AI that answers the repetitive questions for you',
    ru: 'AI, который отвечает на повторяющиеся вопросы за вас',
  },
  landing_ai_body: {
    ka: 'სტუმარს შეუძლია ჰკითხოს Wi-Fi-ის, ჩექაუთის, პარკინგის, ტრანსპორტის, ადგილობრივი რეკომენდაციების, წესების და სხვა შესახებ. ასისტენტი თქვენი გზამკვლევის მონაცემებზე დაყრდნობით პასუხობს ცხადად.',
    en: 'Guests can ask about Wi-Fi, check-out, parking, transport, local recommendations, house rules and more. The assistant uses your property guide to give clear answers.',
    ru: 'Гости могут спросить про Wi-Fi, выезд, парковку, транспорт, местные рекомендации, правила и многое другое. Ассистент отвечает на основе данных вашего гида.',
  },
  landing_ai_lang_ka: {
    ka: 'ქართული',
    en: 'Georgian',
    ru: 'Грузинский',
  },
  landing_ai_lang_en: {
    ka: 'ინგლისური',
    en: 'English',
    ru: 'Английский',
  },
  landing_ai_lang_ru: {
    ka: 'რუსული',
    en: 'Russian',
    ru: 'Русский',
  },
  landing_ai_footnote_pre: {
    ka: 'ასისტენტი იყენებს',
    en: 'The assistant uses',
    ru: 'Ассистент использует',
  },
  landing_ai_footnote_bold: {
    ka: 'მხოლოდ თქვენი ობიექტის ინფორმაციას',
    en: "only your property's information",
    ru: 'только информацию о вашем объекте',
  },
  landing_ai_footnote_post: {
    ka: 'სტუმრებს ცხადი პასუხები აქვთ, მასპინძელთან დაკავშირების გარეშეც.',
    en: 'helping guests get clear answers without always needing to contact the host.',
    ru: 'помогая гостям получать чёткие ответы, не всегда обращаясь к хозяину.',
  },
  landing_ai_chat_name_suffix: {
    ka: ' ასისტენტი',
    en: ' Assistant',
    ru: ' Ассистент',
  },
  landing_ai_chat_status: {
    ka: 'ონლაინ · 3 ენა',
    en: 'Online · 3 languages',
    ru: 'Онлайн · 3 языка',
  },
  landing_ai_chat_question: {
    ka: 'სად შემიძლია პარკინგის გაკეთება?',
    en: 'Where can I park near the property?',
    ru: 'Где я могу припарковаться рядом с домом?',
  },
  landing_ai_chat_answer: {
    ka: 'პარკინგი შეგიძლიათ შენობის უკან, ან გამოიყენოთ ფასიანი ავტოსადგომი მოპირდაპირე მხარეს.',
    en: 'You can park behind the building, or use the paid lot just across the street.',
    ru: 'Вы можете припарковаться за зданием или воспользоваться платной парковкой напротив.',
  },
  landing_ai_chat_placeholder: {
    ka: 'დაწერეთ შეტყობინება...',
    en: 'Write a message...',
    ru: 'Напишите сообщение...',
  },

  landing_who_eyebrow: {
    ka: 'ვისთვისაა',
    en: "Who it's for",
    ru: 'Для кого',
  },
  landing_who_heading: {
    ka: 'შექმნილია თანამედროვე ჰოსტებისთვის',
    en: 'Built for modern hospitality hosts',
    ru: 'Создано для современных хостов',
  },
  landing_who1_title: {
    ka: 'Airbnb მასპინძლები',
    en: 'Airbnb hosts',
    ru: 'Хозяева Airbnb',
  },
  landing_who1_desc: {
    ka: 'ცხადი პასუხები ყოველი სტუმრობისთვის — მაშინაც, როცა ხაზგარეშე ხართ.',
    en: "Clear answers for every stay, even when you're offline.",
    ru: 'Чёткие ответы для каждого проживания — даже когда вы офлайн.',
  },
  landing_who2_title: {
    ka: 'საოჯახო სასტუმროს მფლობელები',
    en: 'Guesthouse owners',
    ru: 'Владельцы гостевых домов',
  },
  landing_who2_desc: {
    ka: 'ციფრული გზამკვლევი — უფრო პროფესიონალური მისალმებისთვის.',
    en: 'A digital guide for a more professional welcome.',
    ru: 'Цифровой гид для более профессионального приёма.',
  },
  landing_who3_title: {
    ka: 'საკურორტო ქირავნობის მასპინძლები',
    en: 'Vacation rental hosts',
    ru: 'Хозяева аренды для отдыха',
  },
  landing_who3_desc: {
    ka: 'Wi-Fi, წესები, ჩექინი და ადგილობრივი რჩევები — ერთ QR კოდში.',
    en: 'Wi-Fi, rules, check-in and local tips in one QR code.',
    ru: 'Wi-Fi, правила, заезд и местные советы — в одном QR-коде.',
  },
  landing_who4_title: {
    ka: 'ქონების მენეჯერები',
    en: 'Property managers',
    ru: 'Управляющие недвижимостью',
  },
  landing_who4_desc: {
    ka: 'მოწესრიგებული ინფორმაცია და ნაკლები განმეორებითი შეტყობინება სტუმრებისგან.',
    en: 'Organized info and fewer repetitive guest messages.',
    ru: 'Организованная информация и меньше повторяющихся сообщений от гостей.',
  },
  landing_who5_title: {
    ka: 'ბუტიკ სასტუმროები და აპარტამენტები',
    en: 'Boutique hotels & serviced apartments',
    ru: 'Бутик-отели и апартаменты',
  },
  landing_who5_desc: {
    ka: 'მარტივი ციფრული ასისტენტი — აპლიკაციისა და რთული სისტემების გარეშე.',
    en: 'A simple digital assistant — no app, no complex systems.',
    ru: 'Простой цифровой ассистент — без приложения и сложных систем.',
  },

  landing_ba_eyebrow: {
    ka: 'მანამდე / შემდეგ',
    en: 'Before / After',
    ru: 'До / После',
  },
  landing_ba_heading_pre: {
    ka: 'რა იცვლება ',
    en: 'What changes with ',
    ru: 'Что меняется с ',
  },
  landing_ba_heading_post: {
    ka: '-ით',
    en: '',
    ru: '',
  },
  landing_ba_before_badge_pre: {
    ka: '',
    en: 'Before ',
    ru: 'До ',
  },
  landing_ba_before_badge_post: {
    ka: '-მდე',
    en: '',
    ru: '',
  },
  landing_ba_before1: {
    ka: 'სტუმარი შეტყობინებებში, PDF-ებსა და სქრინშოთებში ეძებს ინფორმაციას',
    en: 'Guests search through messages, PDFs and screenshots',
    ru: 'Гости ищут информацию в сообщениях, PDF и скриншотах',
  },
  landing_ba_before2: {
    ka: 'მასპინძელი იმავე კითხვებს ისევ და ისევ პასუხობს',
    en: 'Hosts answer the same questions over and over',
    ru: 'Хозяева отвечают на одни и те же вопросы снова и снова',
  },
  landing_ba_before3: {
    ka: 'მნიშვნელოვანი ინფორმაცია იკარგება',
    en: 'Important information gets missed',
    ru: 'Важная информация теряется',
  },
  landing_ba_before4: {
    ka: 'სტუმრის გამოცდილება ნაკლებად მოწესრიგებული ჩანს',
    en: 'The guest experience feels less organized',
    ru: 'Опыт гостя кажется менее организованным',
  },
  landing_ba_before5: {
    ka: 'მასპინძელი ხელმისაწვდომია ღამითაც კი',
    en: 'Hosts on call even at night',
    ru: 'Хозяева на связи даже ночью',
  },
  landing_ba_after_badge_pre: {
    ka: '',
    en: 'After ',
    ru: 'После ',
  },
  landing_ba_after_badge_post: {
    ka: '-ის შემდეგ',
    en: '',
    ru: '',
  },
  landing_ba_after1: {
    ka: 'სტუმარი ერთ QR კოდს სკანერავს და მყისვე პოულობს საჭიროს',
    en: 'Guests scan one QR code and find what they need instantly',
    ru: 'Гости сканируют один QR-код и мгновенно находят то, что нужно',
  },
  landing_ba_after2: {
    ka: 'მასპინძელი ნაკლებ განმეორებით კითხვას იღებს',
    en: 'Hosts receive fewer repetitive questions',
    ru: 'Хозяева получают меньше повторяющихся вопросов',
  },
  landing_ba_after3: {
    ka: 'მოთხოვნებისა და დახმარების მართვა უფრო მარტივია',
    en: 'Requests and support are easier to manage',
    ru: 'Запросы и поддержку легче обрабатывать',
  },
  landing_ba_after4: {
    ka: 'ობიექტი უფრო პროფესიონალურად გამოიყურება',
    en: 'The property feels more professional',
    ru: 'Объект выглядит более профессионально',
  },
  landing_ba_after5: {
    ka: 'სტუმრობა ჩამოსვლიდან გამგზავრებამდე გლუვია',
    en: 'The stay feels smoother from arrival to check-out',
    ru: 'Проживание становится более гладким от заезда до выезда',
  },

  landing_pricing_eyebrow: {
    ka: 'ფასები',
    en: 'Pricing',
    ru: 'Цены',
  },
  landing_pricing_heading: {
    ka: 'ფასი, რომელიც თქვენს საცხოვრებელს შეეფერება',
    en: 'Pricing that fits your property',
    ru: 'Цены, которые подходят вашему объекту',
  },
  landing_pricing_subtitle: {
    ka: 'აირჩიეთ პაკეტი და დაიწყეთ დღესვე — ფარული გადასახადების გარეშე.',
    en: 'Pick a plan and get started today — no hidden fees.',
    ru: 'Выберите пакет и начните уже сегодня — без скрытых платежей.',
  },
  landing_pricing_period: {
    ka: '/თვეში',
    en: '/month',
    ru: '/в месяц',
  },
  landing_pricing_standard_name: {
    ka: 'სტანდარტი',
    en: 'Standard',
    ru: 'Стандарт',
  },
  landing_pricing_standard_f1: {
    ka: 'ციფრული სტუმრის გზამკვლევის შექმნა',
    en: 'Create your digital guest guide',
    ru: 'Создайте цифровой гид для гостей',
  },
  landing_pricing_standard_f2: {
    ka: 'გასაზიარებელი QR კოდი',
    en: 'Shareable QR code',
    ru: 'QR-код для гостей',
  },
  landing_pricing_standard_f3: {
    ka: 'Wi-Fi, წესები და ჩექინის დეტალები',
    en: 'Wi-Fi, house rules & check-in details',
    ru: 'Wi-Fi, правила дома и информация о заезде',
  },
  landing_pricing_standard_f4: {
    ka: 'ადგილობრივი რეკომენდაციები',
    en: 'Local recommendations',
    ru: 'Местные рекомендации',
  },
  landing_pricing_standard_f5: {
    ka: 'Essentials — ყველა საჭირო ინფო ერთ გვერდზე',
    en: 'Essentials — everything guests need on one page',
    ru: 'Essentials — всё нужное гостю на одной странице',
  },
  landing_pricing_standard_cta: {
    ka: 'დაგვირეკეთ',
    en: 'Call us',
    ru: 'Позвонить нам',
  },
  landing_pricing_premium_badge: {
    ka: 'პოპულარული',
    en: 'Popular',
    ru: 'Популярный',
  },
  landing_pricing_premium_name: {
    ka: 'პრემიუმი',
    en: 'Premium',
    ru: 'Премиум',
  },
  landing_pricing_premium_f1: {
    ka: 'სტანდარტის ყველა ფუნქცია',
    en: 'Everything in Standard',
    ru: 'Всё из Стандарта',
  },
  landing_pricing_premium_f2: {
    ka: 'AI სტუმართა ასისტენტი',
    en: 'AI guest assistant',
    ru: 'AI-помощник для гостей',
  },
  landing_pricing_premium_f3: {
    ka: 'რესტორნის მენიუ',
    en: 'Restaurant menu',
    ru: 'Меню ресторана',
  },
  landing_pricing_premium_f4: {
    ka: 'პრიორიტეტული მხარდაჭერა',
    en: 'Priority support',
    ru: 'Приоритетная поддержка',
  },
  landing_pricing_premium_cta: {
    ka: 'აირჩიეთ Premium',
    en: 'Choose Premium',
    ru: 'Выбрать Премиум',
  },

  landing_faq_heading: {
    ka: 'ხშირად დასმული კითხვები',
    en: 'Frequently asked questions',
    ru: 'Часто задаваемые вопросы',
  },
  landing_faq1_q: {
    ka: 'სტუმარს სჭირდება აპლიკაციის ჩამოტვირთვა?',
    en: 'Does the guest need to download an app?',
    ru: 'Нужно ли гостю скачивать приложение?',
  },
  landing_faq1_a: {
    ka: 'არა — სტუმარი უბრალოდ სკანერავს QR კოდს ან ხსნის ბმულს ბრაუზერში, აპლიკაციის ჩამოტვირთვის გარეშე.',
    en: 'No — guests simply scan the QR code or open the link in their browser, no app to download.',
    ru: 'Нет — гость просто сканирует QR-код или открывает ссылку в браузере, без установки приложения.',
  },
  landing_faq2_q: {
    ka: 'თუ ინფორმაციას შევცვლი, QR კოდის თავიდან დაბეჭდვა მჭირდება?',
    en: 'Do I need to reprint the QR code if I change information?',
    ru: 'Нужно ли перепечатывать QR-код при изменении информации?',
  },
  landing_faq2_a: {
    ka: 'არა — QR კოდი უცვლელი რჩება, ცვლილებები კი მყისვე აისახება გვერდზე.',
    en: 'No — the QR code stays the same, and any changes you make show up on the page instantly.',
    ru: 'Нет — QR-код остаётся прежним, а изменения сразу отображаются на странице.',
  },
  landing_faq3_q: {
    ka: 'მუშაობს რამდენიმე ენაზე?',
    en: 'Does it work in multiple languages?',
    ru: 'Работает ли на нескольких языках?',
  },
  landing_faq3_a: {
    ka: 'დიახ — გვერდი ხელმისაწვდომია ქართულ, ინგლისურ და რუსულ ენებზე.',
    en: 'Yes — the page is available in Georgian, English, and Russian.',
    ru: 'Да — страница доступна на грузинском, английском и русском языках.',
  },
  landing_faq4_q: {
    ka: 'შემიძლია მისი გამოცდა გამოწერამდე?',
    en: 'Can I try it before I subscribe?',
    ru: 'Могу ли я попробовать перед подпиской?',
  },
  landing_faq4_a: {
    ka: 'დაგვიკავშირდით და მოვაწყობთ ცოცხალ დემონსტრაციას, სანამ პაკეტს აირჩევთ.',
    en: "Yes — contact us and we'll walk you through a live demo before you choose a plan.",
    ru: 'Да — свяжитесь с нами, и мы проведём живую демонстрацию перед выбором пакета.',
  },
  landing_faq5_q: {
    ka: 'რამდენი დრო სჭირდება გვერდის შექმნას?',
    en: 'How long does it take to set up the page?',
    ru: 'Сколько времени занимает создание страницы?',
  },
  landing_faq5_a: {
    ka: 'სულ რაღაც რამდენიმე წუთი — შეავსებთ ინფორმაციას და მიიღებთ მზა QR კოდს.',
    en: 'Just a few minutes — fill in your property details and get a ready QR code.',
    ru: 'Всего несколько минут — заполните информацию и получите готовый QR-код.',
  },
  landing_faq6_q: {
    ka: 'შეიძლება AI ასისტენტმა შეცდომა დაუშვას?',
    en: 'Can the AI assistant get things wrong?',
    ru: 'Может ли AI-помощник ошибиться?',
  },
  landing_faq6_a: {
    ka: 'AI პასუხობს მხოლოდ იმ ინფორმაციაზე დაყრდნობით, რასაც თქვენ შეავსებთ, ამიტომ პასუხები თემასთან შესაბამისია. რთულ საკითხებზე სტუმარი ყოველთვის შეძლებს პირდაპირ დაგიკავშირდეთ.',
    en: 'The AI only answers using the information you provide about your property, so it stays on-topic. For anything more complex, guests can always reach you directly.',
    ru: 'AI отвечает только на основе информации, которую вы предоставили о своём объекте, поэтому ответы остаются по теме. Для сложных вопросов гость всегда может связаться с вами напрямую.',
  },
  landing_faq7_q: {
    ka: 'შემიძლია რამდენიმე საცხოვრებლისთვის გამოყენება?',
    en: 'Can I use it for multiple properties?',
    ru: 'Можно ли использовать для нескольких объектов?',
  },
  landing_faq7_a: {
    ka: 'დიახ — თითოეული საცხოვრებელი ცალკე ემატება სისტემაში, საკუთარი გვერდითა და პაკეტით.',
    en: 'Yes — each property is set up separately in the system, with its own page and plan.',
    ru: 'Да — каждый объект добавляется в систему отдельно, со своей страницей и пакетом.',
  },
  landing_faq8_q: {
    ka: 'სტუმრის მონაცემები დაცულია?',
    en: 'Is guest data safe?',
    ru: 'Безопасны ли данные гостей?',
  },
  landing_faq8_a: {
    ka: 'სტუმარს არ სჭირდება ანგარიშის შექმნა ან პირადი მონაცემების გაზიარება გვერდის სანახავად.',
    en: "Guests don't need to create an account or share personal data to view the page.",
    ru: 'Гостю не нужно создавать аккаунт или делиться личными данными, чтобы посмотреть страницу.',
  },

  landing_testi_eyebrow: {
    ka: 'შეფასებები',
    en: 'Testimonials',
    ru: 'Отзывы',
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
    ka: 'სასტუმროს მენეჯერი, თბილისი',
    en: 'Hotel manager, Tbilisi',
    ru: 'Менеджер отеля, Тбилиси',
  },
  landing_testi2_quote: {
    ka: 'სტუმრები, რომლებიც ქართულს არ ფლობენ, ბევრად თავისუფლად გრძნობენ თავს — ყველაფერი საკუთარ ენაზე აქვთ, ერთი შეხებით.',
    en: "Guests who don't speak Georgian feel far more at ease — everything is in their own language, one tap away.",
    ru: 'Гости, не говорящие по-грузински, чувствуют себя намного увереннее — всё на их языке, в один клик.',
  },
  landing_testi2_who: {
    ka: 'სასტუმროს მფლობელი, ბათუმი',
    en: 'Hotel owner, Batumi',
    ru: 'Владелец отеля, Батуми',
  },
  landing_testi3_quote: {
    ka: 'ბეჭდვაზე დანახარჯი პრაქტიკულად გავაქრეთ და რეცეფციაზე კითხვების რაოდენობაც შემცირდა.',
    en: "We've all but eliminated print costs, and front-desk questions have dropped noticeably.",
    ru: 'Расходы на печать практически исчезли, а вопросов на ресепшене стало заметно меньше.',
  },
  landing_testi3_who: {
    ka: 'სასტუმროს მფლობელი, ქუთაისი',
    en: 'Hotel owner, Kutaisi',
    ru: 'Владелец отеля, Кутаиси',
  },
  landing_testi4_quote: {
    ka: 'ახალ თანამშრომელსაც კი წუთებში ვასწავლით სისტემაში ცვლილებების შეტანას — ტექნიკური განათლება არ სჭირდება.',
    en: 'Even a new staff member learns to update the system in minutes — no technical background needed.',
    ru: 'Даже новый сотрудник осваивает обновление системы за минуты — без технических навыков.',
  },
  landing_testi4_who: {
    ka: 'მიმღების ხელმძღვანელი, სიღნაღი',
    en: 'Front-desk lead, Sighnaghi',
    ru: 'Руководитель ресепшена, Сигнахи',
  },
  landing_testi5_quote: {
    ka: 'სტუმრები აღნიშნავენ, რომ ინფორმაციის ასე მარტივად პოვნა სასიამოვნო გამოცდილებაა — ეს ჩვენს შეფასებებშიც ჩანს.',
    en: 'Guests mention how easy it is to find information — it shows up in our reviews too.',
    ru: 'Гости отмечают, насколько легко находить информацию — это заметно и в наших отзывах.',
  },
  landing_testi5_who: {
    ka: 'სასტუმროს მენეჯერი, ყაზბეგი',
    en: 'Hotel manager, Kazbegi',
    ru: 'Менеджер отеля, Казбеги',
  },

  landing_partners_eyebrow: {
    ka: 'თანამშრომლობა',
    en: 'Partnerships',
    ru: 'Партнёрство',
  },
  landing_partners_heading: {
    ka: 'ჩვენი პარტნიორები',
    en: 'Our partners',
    ru: 'Наши партнёры',
  },

  landing_footer_tag: {
    ka: 'checkit — ციფრული სტუმართა გზამკვლევი სასტუმროებისთვის.',
    en: 'checkit — a digital guest guide for hotels.',
    ru: 'checkit — цифровой гид для гостей отелей.',
  },
  landing_footer_made: {
    ka: 'შექმნილია საქართველოში',
    en: 'Made in Georgia',
    ru: 'Сделано в Грузии',
  },
};
