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
    ka: 'Check-in, Wi-Fi, დახმარება',
    en: 'Check-in, Wi-Fi, help',
    ru: 'Заселение, Wi-Fi, помощь',
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
};
