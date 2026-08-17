export interface GuidePlace {
  id: string;
  hotel_id: string;
  category: string | null;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  description_ka: string | null;
  description_en: string | null;
  description_ru: string | null;
  image_url: string | null;
  google_maps_url: string | null;
  sort_order: number;
  created_at: string;
}
