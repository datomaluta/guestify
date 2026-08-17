export interface HotelService {
  id: string;
  hotel_id: string;
  icon: string | null;
  title_ka: string;
  title_en: string | null;
  title_ru: string | null;
  description_ka: string | null;
  description_en: string | null;
  description_ru: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}
