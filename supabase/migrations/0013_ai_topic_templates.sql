-- ============================================================================
-- 0013: ai_topic_templates — გლობალური, hotel_id-ის გარეშე შაბლონების ბიბლიოთეკა
-- ხშირად გამეორებადი AI კონსიერჟის თემებისთვის (მაგ. "როგორ მუშაობს room service").
-- სვეტები იმეორებს ai_topics-ს (0009) hotel_id-ის გარეშე. Superadmin მართავს
-- (features/admin/ai-topic-templates), ნებისმიერი hotel_admin მხოლოდ კითხულობს და
-- ai-topics-editor-დან "დაამატე ბიბლიოთეკიდან" ღილაკით აკოპირებს საკუთარ
-- hotel-სპეციფიკურ ai_topics რიგად, რომლის შემდეგაც თავისუფლად არედაქტირებს.
-- ============================================================================

create table public.ai_topic_templates (
  id                uuid primary key default gen_random_uuid(),
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

alter table public.ai_topic_templates enable row level security;

create policy "ai_topic_templates: any admin can read"
on public.ai_topic_templates for select
using (public.current_role() in ('hotel_admin', 'superadmin'));

create policy "ai_topic_templates: superadmin manages"
on public.ai_topic_templates for all
using (public.is_superadmin())
with check (public.is_superadmin());
