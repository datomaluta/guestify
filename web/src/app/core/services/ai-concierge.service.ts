import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { AiTopic } from '../models';
import { MatchResult, matchTopic } from '../utils/ai-topic-matcher';

/**
 * Fake AI კონსიერჟის data-access ფენა — იმეორებს HotelService-ის ფორმას (`getRules()` და
 * მისნაირები): `select('*').eq('hotel_id', hotelId).order('sort_order')`. Phase 1-ში აქ
 * hardcoded მასივი იჯდა (core/services/ai-topics.local-data.ts, ახლა წაშლილი) — Phase 2-ში
 * ეს რეალურ `ai_topics` ცხრილს ეკითხება (იხ. supabase/migrations/0009_ai_topics.sql).
 */
@Injectable({ providedIn: 'root' })
export class AiConciergeService {
  private readonly supabase = inject(SupabaseService);

  async getTopics(hotelId: string): Promise<AiTopic[]> {
    const { data, error } = await this.supabase.client
      .from('ai_topics')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as AiTopic[];
  }

  match(query: string, topics: AiTopic[]): MatchResult {
    return matchTopic(query, topics);
  }
}
