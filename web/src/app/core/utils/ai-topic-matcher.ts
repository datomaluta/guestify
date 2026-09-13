import { AiTopic } from '../models/ai-topic.model';

/**
 * "სამაგარი" fake-AI კონსიერჟის keyword-matching ძრავა — სუფთა ფუნქციები, Angular DI-ის
 * გარეშე (unit-ტესტვადია ცალკე, TestBed-ის გარეშე). იხ. Phase 1 გეგმა —
 * ეს განზრახ არ არის რეალური NLP/LLM, უბრალო წონიანი keyword-scoring-ია.
 *
 * ეს ზღვრები "თვალით შეფასებულია" (არა ანალიტიკურად გამოყვანილი) — ხელით ტესტვისას
 * (idle → chip-ი / თავისუფალი ტექსტი) საჭიროებისამებრ დარეგულირდება.
 */
export const CONFIDENT_MIN_SCORE = 4;
export const CONFIDENT_MARGIN = 3;

export type MatchTier = 'confident' | 'weak' | 'none';

export interface MatchResult {
  tier: MatchTier;
  topic: AiTopic | null;
  score: number;
}

/** lowercase + პუნქტუაციის მოცილება (ქართული/ლათინური/კირილიცა ერთნაირად) + whitespace-ის შეკუმშვა. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** სტუმარმა შეიძლება აკრიფოს ნებისმიერ ენაზე, UI-ს მიმდინარე ენის მიუხედავად (მაგ. UI ინგლისურზეა
 * გადართული, მაგრამ სტუმარი ქართულად წერს) — ამიტომ keyword-scoring ყოველთვის სამივე ენის სიას
 * ერთდროულად ამოწმებს. სხვადასხვა ანბანის keyword-ები ერთმანეთში ცრუ-დამთხვევას პრაქტიკულად
 * ვერ გამოიწვევს, ასე რომ გაერთიანება უსაფრთხოა. */
function allKeywords(topic: AiTopic): string[] {
  return [...topic.keywords_ka, ...topic.keywords_en, ...topic.keywords_ru];
}

/** ქულა = დამთხვეული keyword-ების სიგრძეების ჯამი — ერთდროულად ითვალისწინებს დამთხვევების
 * რაოდენობასაც და მათ სპეციფიკურობასაც (გრძელი/ზუსტი keyword მეტ წონას იძლევა). */
function scoreTopic(normalizedQuery: string, topic: AiTopic): number {
  let score = 0;
  for (const keyword of allKeywords(topic)) {
    const normalizedKeyword = normalize(keyword);
    if (normalizedKeyword && normalizedQuery.includes(normalizedKeyword)) {
      score += normalizedKeyword.length;
    }
  }
  return score;
}

/**
 * თავისუფალი ტექსტის დამუშავება — სამსაფეხურიანი confidence: confident / weak (ჰეჯირებული
 * ვარაუდი) / none (სრული fallback). იხ. Phase 1 გეგმის "Matching engine design" სექცია.
 * პასუხის ენას (რომელი `answer_*` გამოჩნდება) ცალკე ირჩევს ai.component — აქ ენას მნიშვნელობა
 * არ აქვს, მხოლოდ ის, თუ რომელი topic ჯდება საუკეთესოდ.
 */
export function matchTopic(query: string, topics: AiTopic[]): MatchResult {
  const normalizedQuery = normalize(query);
  const scored = topics
    .map((topic) => ({ topic, score: scoreTopic(normalizedQuery, topic) }))
    .sort((a, b) => b.score - a.score || a.topic.sort_order - b.topic.sort_order);

  const bestScore = scored[0]?.score ?? 0;
  if (bestScore === 0) {
    return { tier: 'none', topic: null, score: 0 };
  }

  const topsAtBest = scored.filter((entry) => entry.score === bestScore);
  const secondScore = scored.find((entry) => entry.score < bestScore)?.score ?? 0;
  const margin = bestScore - secondScore;

  if (topsAtBest.length === 1 && bestScore >= CONFIDENT_MIN_SCORE && margin >= CONFIDENT_MARGIN) {
    return { tier: 'confident', topic: topsAtBest[0].topic, score: bestScore };
  }

  return { tier: 'weak', topic: topsAtBest[0].topic, score: bestScore };
}
