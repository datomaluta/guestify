-- ============================================================================
-- 0009: ai_topics — fake AI კონსიერჟის საკვანძო თემები (Phase 2). ცვლის Phase 1-ის
-- hardcoded მასივს (web/src/app/core/services/ai-topics.local-data.ts, წაშლილია) —
-- ახლა per-hotel, admin-რედაქტირებადია (features/admin/content/ai-topics-editor).
-- keywords_* Postgres text[] — matcher (ai-topic-matcher.ts) მათ პირდაპირ კითხულობს.
-- ============================================================================

create table public.ai_topics (
  id                uuid primary key default gen_random_uuid(),
  hotel_id          uuid not null references public.hotels (id) on delete cascade,
  icon              text,
  title_ka          text not null,
  title_en          text,
  title_ru          text,
  keywords_ka       text[] not null default '{}',
  keywords_en       text[] not null default '{}',
  keywords_ru       text[] not null default '{}',
  answer_ka         text not null,
  answer_en         text,
  answer_ru         text,
  sort_order        int not null default 0,
  created_at        timestamptz not null default now()
);

alter table public.ai_topics enable row level security;

-- იგივე ორი policy, რაც 0001_init_schema.sql-ში დანარჩენ hotel-content ცხრილებს აქვთ
-- (services/hotel_rules/hotel_contacts/...) — public კითხულობს აქტიური სასტუმროს კონტენტს,
-- hotel_admin მართავს მხოლოდ საკუთარს, superadmin ყველას.
create policy "ai_topics: public reads active hotel content"
on public.ai_topics for select
using (
  exists (
    select 1 from public.hotels h
    where h.id = ai_topics.hotel_id and h.is_active
  )
  or hotel_id = public.current_hotel_id()
  or public.is_superadmin()
);

create policy "ai_topics: hotel_admin manages own, superadmin manages all"
on public.ai_topics for all
using (hotel_id = public.current_hotel_id() or public.is_superadmin())
with check (hotel_id = public.current_hotel_id() or public.is_superadmin());
