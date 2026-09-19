export interface FeaturedAmenity {
  id: string;
  hotel_id: string;
  image_url: string | null;
  title_ka: string;
  title_en: string | null;
  title_ru: string | null;
  description_ka: string;
  description_en: string | null;
  description_ru: string | null;
  hours_ka: string | null;
  hours_en: string | null;
  hours_ru: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}
