export interface HotelContact {
  id: string;
  hotel_id: string;
  label_ka: string;
  label_en: string | null;
  label_ru: string | null;
  phone: string;
  sort_order: number;
  created_at: string;
}
