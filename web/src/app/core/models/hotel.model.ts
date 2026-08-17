export type AppLanguage = 'ka' | 'en' | 'ru';

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  default_language: AppLanguage;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
