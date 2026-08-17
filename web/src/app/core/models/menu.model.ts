export interface MenuCategory {
  id: string;
  hotel_id: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  hotel_id: string;
  category_id: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  description_ka: string | null;
  description_en: string | null;
  description_ru: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}
