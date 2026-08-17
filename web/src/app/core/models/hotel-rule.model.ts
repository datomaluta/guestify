export interface HotelRule {
  id: string;
  hotel_id: string;
  title_ka: string;
  title_en: string | null;
  title_ru: string | null;
  content_ka: string | null;
  content_en: string | null;
  content_ru: string | null;
  sort_order: number;
  created_at: string;
}
