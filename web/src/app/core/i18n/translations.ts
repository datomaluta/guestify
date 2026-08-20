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
  nav_guide: { ka: 'თქვენი გზამკვლევი', en: 'Local Guide', ru: 'Локальный гид' },
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
  nav_rules_desc: {
    ka: 'Check-in, წესები, კონტაქტი',
    en: 'Check-in, rules & contacts',
    ru: 'Заезд, правила, контакты',
  },

  back: { ka: 'უკან', en: 'Back', ru: 'Назад' },

  services_title: {
    ka: 'სასტუმროს სერვისები',
    en: 'Hotel Services',
    ru: 'Услуги отеля',
  },
  menu_title: {
    ka: 'რესტორნის მენიუ',
    en: 'Restaurant Menu',
    ru: 'Меню ресторана',
  },
  guide_title: {
    ka: 'ადგილობრივი გზამკვლევი',
    en: 'Local Guide',
    ru: 'Локальный гид',
  },
  guide_open_maps: {
    ka: 'გახსენი Google Maps-ში',
    en: 'Open in Google Maps',
    ru: 'Открыть в Google Maps',
  },
  rules_title: {
    ka: 'წესები და კონტაქტი',
    en: 'Rules & Contact',
    ru: 'Правила и контакты',
  },
  rules_contacts_heading: {
    ka: 'საკონტაქტო ხაზები',
    en: 'Contact numbers',
    ru: 'Контактные номера',
  },

  empty_state: {
    ka: 'ინფორმაცია მალე დაემატება',
    en: 'Information coming soon',
    ru: 'Информация появится позже',
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
  landing_eyebrow: {
    ka: 'სასტუმროებისა და სასტუმროს ტიპის საცხოვრებლებისთვის',
    en: 'For hotels & short-stay properties',
    ru: 'Для отелей и гостевых домов',
  },
  landing_h1: {
    ka: 'სტუმრის გზამკვლევი — ერთ QR კოდში',
    en: 'The guest guide, in one QR code',
    ru: 'Гид для гостя в одном QR-коде',
  },
  landing_sub: {
    ka: 'შეცვალეთ ქაღალდის საინფორმაციო ბუკლეტი ცოცხალი ციფრული გვერდით — სერვისები, მენიუ, ადგილობრივი გიდი და წესები, ყოველთვის განახლებული, ნებისმიერ ენაზე.',
    en: 'Replace the paper welcome folder with a living digital page — services, menu, local guide and house rules, always current, in any language.',
    ru: 'Замените бумажную папку цифровой страницей — услуги, меню, гид по округе и правила проживания, всегда актуальные, на любом языке.',
  },
  landing_cta: { ka: 'მოითხოვეთ დემო', en: 'Request a demo', ru: 'Запросить демо' },
  landing_proof: {
    ka: 'აპლიკაციის ჩამოტვირთვის გარეშე — პირდაპირ ბრაუზერში იხსნება',
    en: 'No app to install — opens straight in the browser',
    ru: 'Без установки приложений — открывается прямо в браузере',
  },
  landing_phone_sub: {
    ka: 'დღეს რითი დაგეხმაროთ?',
    en: 'How can we help today?',
    ru: 'Чем помочь сегодня?',
  },

  landing_why_title: { ka: 'რატომ Guestify', en: 'Why Guestify', ru: 'Почему Guestify' },
  landing_why_body: {
    ka: 'ბეჭდური ბუკლეტი მალე მოძველდება, იკარგება ოთახიდან და ერთ ენაზეა დაბეჭდილი. Guestify-ით სტუმარი ყველაფერს ოთახიდანვე კითხულობს — თქვენ კი კონტენტს ცვლით წამებში, ხელახლა დაბეჭდვის გარეშე.',
    en: "A printed booklet goes stale, disappears from the room, and speaks one language. With Guestify your guest reads everything from where they're sitting — and you update the content in seconds, with nothing to reprint.",
    ru: 'Бумажный буклет быстро устаревает, теряется из номера и существует только на одном языке. С Guestify гость читает всё, не вставая с места, а вы меняете контент за секунды — без допечатки.',
  },

  landing_feat1_title: { ka: 'QR ყოველ ოთახში', en: 'A QR in every room', ru: 'QR в каждом номере' },
  landing_feat1_desc: {
    ka: 'სტუმარი კამერით ასკანერებს კოდს და პირდაპირ თქვენს გვერდზეა — ინსტალაციის გარეშე.',
    en: 'Guests scan with their camera and land straight on your page — nothing to install.',
    ru: 'Гость сканирует камерой и сразу попадает на вашу страницу — без установки.',
  },
  landing_feat2_title: { ka: 'კონტენტი რეალურ დროში', en: 'Content in real time', ru: 'Контент в реальном времени' },
  landing_feat2_desc: {
    ka: 'სერვისები, მენიუ, წესები და კონტაქტები — თქვენივე ადმინ პანელიდან იცვლება.',
    en: 'Services, menu, house rules and contacts — edited from your own admin panel.',
    ru: 'Услуги, меню, правила и контакты — редактируются в вашей админ-панели.',
  },
  landing_feat3_title: { ka: 'მრავალენოვანი ნაგულისხმევად', en: 'Multilingual by default', ru: 'Многоязычность по умолчанию' },
  landing_feat3_desc: {
    ka: 'სტუმარი თავად ირჩევს ენას, რომელზეც კითხულობს.',
    en: 'Guests choose the language they read in.',
    ru: 'Гость сам выбирает язык.',
  },
  landing_feat4_title: { ka: 'ადგილობრივი გზამკვლევი', en: 'Local guide', ru: 'Гид по окрестностям' },
  landing_feat4_desc: {
    ka: 'საუკეთესო რესტორნები და ღირსშესანიშნაობები სასტუმროს ირგვლივ — Google Maps ბმულით, ერთ შეხებაზე.',
    en: 'The best restaurants and sights around your property — with a one-tap Google Maps link.',
    ru: 'Лучшие рестораны и достопримечательности рядом с отелем — со ссылкой на Google Maps в один клик.',
  },

  landing_how_title: { ka: 'როგორ მუშაობს', en: 'How it works', ru: 'Как это работает' },
  landing_how1_title: { ka: 'ბეჭდავთ QR-ს', en: 'Print the QR', ru: 'Печатаете QR' },
  landing_how1_desc: {
    ka: 'განათავსეთ თქვენი უნიკალური კოდი ოთახში, რეცეფციაზე ან სასადილოში.',
    en: 'Place your unique code in rooms, at reception, in the restaurant.',
    ru: 'Размещаете уникальный код в номерах, на ресепшене, в ресторане.',
  },
  landing_how2_title: { ka: 'სტუმარი სკანერავს', en: 'Guest scans it', ru: 'Гость сканирует' },
  landing_how2_desc: {
    ka: 'გვერდი ეგრევე იხსნება — ინსტალაციის გარეშე.',
    en: 'The page opens instantly — nothing to install.',
    ru: 'Страница открывается мгновенно — ничего устанавливать не нужно.',
  },
  landing_how3_title: { ka: 'თქვენ განაახლებთ', en: 'You keep it current', ru: 'Вы обновляете' },
  landing_how3_desc: {
    ka: 'ფასი შეიცვალა? სერვისი დაემატა? წამებში, ადმინ პანელიდან.',
    en: 'Price changed? New service? Seconds, from the admin panel.',
    ru: 'Изменилась цена? Появилась услуга? Секунды — из админ-панели.',
  },

  landing_testi_title: { ka: 'რას ამბობენ სასტუმროები', en: 'What hotels say', ru: 'Что говорят отели' },
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

  landing_partners_eyebrow: { ka: 'სად გამოვიყენოთ', en: 'Built for', ru: 'Подходит для' },

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
  landing_footer_made: { ka: 'შექმნილია საქართველოში', en: 'Made in Georgia', ru: 'Сделано в Грузии' },
};
