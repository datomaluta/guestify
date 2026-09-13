/**
 * Fake AI კონსიერჟის თემის ერთი ჩანაწერი — Supabase `ai_topics` ცხრილის რიგი, hotel_id-ით
 * scoped, სასტუმროს admin-ის მიერ რედაქტირებადი (features/admin/content/ai-topics-editor).
 * `_ka/_en/_ru` კონვენცია იმეორებს HotelRule/GuidePlace-ის ველებს — `localize()` (core/models/
 * localized.ts) მუშაობს უცვლელად `title_*`/`answer_*`-ზე. `keywords_*` მასივებია (Postgres
 * `text[]`) — core/utils/ai-topic-matcher.ts მათ პირდაპირ კითხულობს, არა localize()-ით.
 */
export interface AiTopic {
  id: string;
  hotel_id: string;
  icon: string | null;
  title_ka: string;
  title_en: string | null;
  title_ru: string | null;
  keywords_ka: string[];
  keywords_en: string[];
  keywords_ru: string[];
  answer_ka: string;
  answer_en: string | null;
  answer_ru: string | null;
  sort_order: number;
  created_at: string;
}
