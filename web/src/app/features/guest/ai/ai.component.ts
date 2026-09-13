import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiTopic, localize } from '../../../core/models';
import { AiConciergeService } from '../../../core/services/ai-concierge.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../shared/icon/icon-options';

/** ფიქსირებული (არა შემთხვევითი) დაყოვნება — "აწერს..." ინდიკატორი ერთი და იმავე ხანგრძლივობით
 * ჩნდება ყოველთვის, რაც დამაჯერებელიცაა და Playwright-ით ტესტვადიც. */
const TYPING_DELAY_MS = 700;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'typing';
  text?: string;
  /** მხოლოდ 'weak' tier-ის პასუხებზე — გამოსაცნობი თემის უკვე-ლოკალიზებული სათაური
   * (თემის title_* ახლა ბაზიდან მოდის, არა translations.ts-ის key-იდან, ამიტომ პირდაპირ
   * ვინახავთ ტექსტს, არა key-ს — template-ში `| translate` აღარ სჭირდება). */
  hedgeLabel?: string;
  /** მხოლოდ 'none' tier-ზე — "დარეკეთ რეცეფციაში" გასასვლელი. */
  showContactHost?: boolean;
}

/**
 * Fake AI კონსიერჟი — chip-სია + თავისუფალი ტექსტის ველი, keyword-matching ძრავით
 * (core/utils/ai-topic-matcher.ts) პასუხობს, რეალური LLM-ის გარეშე. იხ. Phase 1 გეგმა.
 * Bottom nav-ის "AI" ტაბი — მხოლოდ premium პაკეტზე ჩანს (იხ. bottom-nav.component).
 */
@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, IconComponent, TranslatePipe],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AiComponent {
  private readonly aiConcierge = inject(AiConciergeService);
  protected readonly hotelContext = inject(HotelContextService);
  private readonly language = inject(LanguageService);

  /** ერთდროულად ხილული chip-ების ჯერადი ლიმიტი — 20 თემა ერთბაშად ძალიან ბევრი/ხმაურიანია
   * ეკრანზე; თავიდან მხოლოდ პირველი (sort_order-ით) ჩანს, დანარჩენი "მეტის ნახვით" იშლება. */
  private static readonly VISIBLE_TOPICS_LIMIT = 5;

  protected readonly defaultIcon = DEFAULT_ICON;

  protected readonly topics = signal<AiTopic[]>([]);
  protected readonly messages = signal<ChatMessage[]>([]);
  protected draft = '';

  /** ერთი გაზიარებული signal საკმარისია — გაშლა ყველგან (idle-ზეც და fallback-ის ქვემოთაც)
   * ერთად ეხმარება, ცალ-ცალკე მდგომარეობის მართვა ამ მასშტაბით ზედმეტი გართულება იქნებოდა. */
  protected readonly showAllTopics = signal(false);
  protected readonly visibleTopics = computed(() =>
    this.showAllTopics() ? this.topics() : this.topics().slice(0, AiComponent.VISIBLE_TOPICS_LIMIT)
  );
  protected readonly hasMoreTopics = computed(
    () => !this.showAllTopics() && this.topics().length > AiComponent.VISIBLE_TOPICS_LIMIT
  );

  private readonly bottomMarker = viewChild<ElementRef<HTMLElement>>('bottomMarker');

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      this.aiConcierge.getTopics(hotelId).then((topics) => this.topics.set(topics));
    }
  }

  protected topicAnswer(topic: AiTopic): string {
    return localize(topic, 'answer', this.language.lang());
  }

  protected topicTitle(topic: AiTopic): string {
    return localize(topic, 'title', this.language.lang());
  }

  /** chip-ზე დაჭერა — ყოველთვის ზუსტი პასუხი, scoring-ის გვერდის ავლით (screenshot 2-ის ქცევა). */
  protected onChipTap(topic: AiTopic): void {
    this.pushUserMessage(this.topicTitle(topic));
    this.pushTypingThenAnswer(() => ({
      id: crypto.randomUUID(),
      role: 'assistant',
      text: this.topicAnswer(topic)
    }));
  }

  protected onSend(): void {
    const query = this.draft.trim();
    if (!query) return;

    this.draft = '';
    this.pushUserMessage(query);

    const result = this.aiConcierge.match(query, this.topics());

    this.pushTypingThenAnswer(() => {
      if (result.tier === 'confident' && result.topic) {
        return { id: crypto.randomUUID(), role: 'assistant', text: this.topicAnswer(result.topic) };
      }
      if (result.tier === 'weak' && result.topic) {
        return {
          id: crypto.randomUUID(),
          role: 'assistant',
          hedgeLabel: this.topicTitle(result.topic),
          text: this.topicAnswer(result.topic)
        };
      }
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: this.language.t('ai_fallback_text'),
        showContactHost: true
      };
    });
  }

  /**
   * ისევ idle (მისალმება + chip-სია) ეკრანზე დაბრუნება — route-ის შეცვლის გარეშე.
   * route არ იცვლება, ასე რომ Router-ის scroll-restoration არ ჩაერთვება — manually ვწევთ
   * ზემოთ, თორემ დიდი საუბრიდან დაბრუნებისას გვერდი ძველ (ახლა უკვე შეცვლილ/მოკლე)
   * scroll-პოზიციაზე დარჩება და idle-ის თავი (მისალმება) აღარ ჩანს.
   */
  protected onBack(): void {
    this.messages.set([]);
    this.showAllTopics.set(false);
    // setTimeout (და არა პირდაპირი გამოძახება) — Angular-ს DOM-ის განახლება რომ დაასწროს,
    // თორემ დიდი საუბრიდან დაბრუნებისას გვერდი ძველ (ახლა უკვე შეცვლილ/მოკლე) scroll-პოზიციაზე
    // დარჩება და idle-ის თავი (მისალმება) აღარ ჩანს.
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }

  private pushUserMessage(text: string): void {
    this.messages.update((list) => [...list, { id: crypto.randomUUID(), role: 'user', text }]);
    this.scrollToBottom();
  }

  /** ჯერ "typing" ბაბლს დებს, მერე ფიქსირებული დაყოვნების შემდეგ იმავე ადგილას რეალურით ცვლის. */
  private pushTypingThenAnswer(build: () => ChatMessage): void {
    const typingId = crypto.randomUUID();
    this.messages.update((list) => [...list, { id: typingId, role: 'typing' }]);
    this.scrollToBottom();

    setTimeout(() => {
      const answer = build();
      this.messages.update((list) => list.map((m) => (m.id === typingId ? answer : m)));
      this.scrollToBottom();
    }, TYPING_DELAY_MS);
  }

  /**
   * წინათ ეს `effect(() => messages() ...)`-ით იყო გატანილი, მაგრამ setTimeout-ში
   * (pushTypingThenAnswer) დაგვიანებული messages.update()-ის მერე ეფექტი აღარ ეშვებოდა —
   * პასუხის დაბრუნების შემდეგ სქროლი აღარ მოძრაობდა და ახალი ბაბლი ნახევრად დაფარული რჩებოდა
   * composer-ის მიღმა. ამიტომ ყოველ messages.update()-ის შემდეგ პირდაპირ, აშკარად ვიძახებთ.
   * setTimeout(…,0) კვლავ საჭიროა — Angular-ის change detection-მა DOM ჯერ უნდა განაახლოს,
   * თორემ marker-ის პოზიცია ჯერ ძველ (განახლებამდელ) სიმაღლეს აირეკლავს.
   */
  private scrollToBottom(): void {
    setTimeout(() => {
      this.bottomMarker()?.nativeElement.scrollIntoView({ behavior: 'auto', block: 'end' });
    });
  }
}
