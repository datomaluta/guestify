export type AppLanguage = 'ka' | 'en' | 'ru';

export type HotelPackage = 'standard' | 'premium';

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  hero_image_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  default_language: AppLanguage;
  address_ka: string | null;
  address_en: string | null;
  address_ru: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  is_active: boolean;
  package: HotelPackage;
  wifi_network: string | null;
  wifi_password: string | null;
  checkin_time_ka: string | null;
  checkin_time_en: string | null;
  checkin_time_ru: string | null;
  checkin_note_ka: string | null;
  checkin_note_en: string | null;
  checkin_note_ru: string | null;
  checkout_time_ka: string | null;
  checkout_time_en: string | null;
  checkout_time_ru: string | null;
  checkout_note_ka: string | null;
  checkout_note_en: string | null;
  checkout_note_ru: string | null;
  airport_maps_url: string | null;
  parking_info_ka: string | null;
  parking_info_en: string | null;
  parking_info_ru: string | null;
  created_at: string;
  updated_at: string;
}
