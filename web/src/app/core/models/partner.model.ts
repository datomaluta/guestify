/** ლენდინგის Partners სექციის / /partners გვერდის სასტუმრო (Supabase `partners`, 0021). */
export interface Partner {
  id: string;
  name: string;
  image_url: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}
