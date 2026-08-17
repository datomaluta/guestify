-- ============================================================================
-- 0001_init_schema.sql
-- სასტუმროს ციფრული QR გზამკვლევი — საწყისი Supabase schema
--
-- მოიცავს:
--   1. profiles      — superadmin / hotel_admin როლები (auth.users-ზე მიბმული)
--   2. hotels         — ტენანტ-ცხრილი (slug, branding, კონტაქტი)
--   3. services        — სასტუმროს სერვისები
--   4. menu_categories / menu_items — რესტორნის მენიუ
--   5. local_guide_places — ადგილობრივი გზამკვლევი (სია + Google Maps ბმული)
--   6. hotel_rules     — წესები
--   7. hotel_contacts  — დამატებითი საკონტაქტო ხაზები
--
-- + helper ფუნქციები, updated_at/immutability trigger-ები და RLS policy-ები
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- 1. HOTELS
-- ----------------------------------------------------------------------------

create table public.hotels (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  logo_url          text,
  primary_color     text,
  secondary_color   text,
  default_language  text not null default 'ka' check (default_language in ('ka', 'en', 'ru')),
  address           text,
  phone             text,
  email             text,
  whatsapp          text,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.hotels is 'ტენანტ-ცხრილი: თითო row = ერთი სასტუმრო თავისი slug-ითა და branding-ით';

create index hotels_slug_idx on public.hotels (slug);
create index hotels_is_active_idx on public.hotels (is_active);

-- ----------------------------------------------------------------------------
-- 2. PROFILES  (auth.users-ის გაფართოება)
-- ----------------------------------------------------------------------------

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        text not null check (role in ('superadmin', 'hotel_admin')),
  hotel_id    uuid references public.hotels (id) on delete restrict,
  full_name   text,
  created_at  timestamptz not null default now(),
  constraint profiles_role_hotel_check check (
    (role = 'superadmin' and hotel_id is null) or
    (role = 'hotel_admin' and hotel_id is not null)
  )
);

comment on table public.profiles is 'superadmin: hotel_id = null (ხედავს ყველაფერს). hotel_admin: hotel_id სავალდებულოა (1 admin = 1 hotel).';

create index profiles_hotel_id_idx on public.profiles (hotel_id);

-- ----------------------------------------------------------------------------
-- 3. SERVICES
-- ----------------------------------------------------------------------------

create table public.services (
  id               uuid primary key default gen_random_uuid(),
  hotel_id         uuid not null references public.hotels (id) on delete cascade,
  icon             text,
  title_ka         text not null,
  title_en         text,
  title_ru         text,
  description_ka   text,
  description_en   text,
  description_ru   text,
  sort_order       int not null default 0,
  is_active        boolean not null default true,
  created_at       timestamptz not null default now()
);

create index services_hotel_id_idx on public.services (hotel_id);

-- ----------------------------------------------------------------------------
-- 4. MENU (categories + items)
-- ----------------------------------------------------------------------------

create table public.menu_categories (
  id           uuid primary key default gen_random_uuid(),
  hotel_id     uuid not null references public.hotels (id) on delete cascade,
  name_ka      text not null,
  name_en      text,
  name_ru      text,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create index menu_categories_hotel_id_idx on public.menu_categories (hotel_id);

create table public.menu_items (
  id               uuid primary key default gen_random_uuid(),
  hotel_id         uuid not null references public.hotels (id) on delete cascade,
  category_id      uuid not null references public.menu_categories (id) on delete cascade,
  name_ka          text not null,
  name_en          text,
  name_ru          text,
  description_ka   text,
  description_en   text,
  description_ru   text,
  price            numeric(10, 2) not null check (price >= 0),
  currency         text not null default 'GEL',
  image_url        text,
  is_available     boolean not null default true,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

comment on column public.menu_items.image_url is 'ატვირთვამდე resize/compress client-side (~480px, WebP) — ბაზა მხოლოდ საბოლოო URL-ს ინახავს';

create index menu_items_hotel_id_idx on public.menu_items (hotel_id);
create index menu_items_category_id_idx on public.menu_items (category_id);

-- ----------------------------------------------------------------------------
-- 5. LOCAL GUIDE PLACES  (სია + Google Maps ბმული, embedded რუკის გარეშე)
-- ----------------------------------------------------------------------------

create table public.local_guide_places (
  id                uuid primary key default gen_random_uuid(),
  hotel_id          uuid not null references public.hotels (id) on delete cascade,
  category          text,
  name_ka           text not null,
  name_en           text,
  name_ru           text,
  description_ka    text,
  description_en    text,
  description_ru    text,
  image_url         text,
  google_maps_url   text,
  sort_order        int not null default 0,
  created_at        timestamptz not null default now()
);

create index local_guide_places_hotel_id_idx on public.local_guide_places (hotel_id);

-- ----------------------------------------------------------------------------
-- 6. HOTEL RULES
-- ----------------------------------------------------------------------------

create table public.hotel_rules (
  id            uuid primary key default gen_random_uuid(),
  hotel_id      uuid not null references public.hotels (id) on delete cascade,
  title_ka      text not null,
  title_en      text,
  title_ru      text,
  content_ka    text,
  content_en    text,
  content_ru    text,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index hotel_rules_hotel_id_idx on public.hotel_rules (hotel_id);

-- ----------------------------------------------------------------------------
-- 7. HOTEL CONTACTS  (Reception, Room Service, Taxi და ა.შ.)
-- ----------------------------------------------------------------------------

create table public.hotel_contacts (
  id            uuid primary key default gen_random_uuid(),
  hotel_id      uuid not null references public.hotels (id) on delete cascade,
  label_ka      text not null,
  label_en      text,
  label_ru      text,
  phone         text not null,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index hotel_contacts_hotel_id_idx on public.hotel_contacts (hotel_id);

-- ============================================================================
-- HELPER FUNCTIONS  (security definer, რომ RLS-მა თავად საკუთარი თავი არ დაბლოკოს)
-- ============================================================================

create function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create function public.current_hotel_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select hotel_id from public.profiles where id = auth.uid();
$$;

create function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'superadmin';
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_hotels_updated_at
before update on public.hotels
for each row execute function public.set_updated_at();

-- slug-ს მხოლოდ superadmin-ს ვაძლევთ ცვლილების უფლებას
create function public.protect_hotel_slug()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() and new.slug is distinct from old.slug then
    raise exception 'მხოლოდ superadmin-ს შეუძლია slug-ის შეცვლა';
  end if;
  return new;
end;
$$;

create trigger trg_protect_hotel_slug
before update on public.hotels
for each row execute function public.protect_hotel_slug();

-- role/hotel_id-ს მხოლოდ superadmin-ს ვაძლევთ ცვლილების უფლებას
create function public.protect_profile_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() and (
    new.role is distinct from old.role or
    new.hotel_id is distinct from old.hotel_id
  ) then
    raise exception 'მხოლოდ superadmin-ს შეუძლია role/hotel_id-ის შეცვლა';
  end if;
  return new;
end;
$$;

create trigger trg_protect_profile_fields
before update on public.profiles
for each row execute function public.protect_profile_fields();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.hotels enable row level security;
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.local_guide_places enable row level security;
alter table public.hotel_rules enable row level security;
alter table public.hotel_contacts enable row level security;

-- ---------------------------------------------------------------- profiles --

create policy "profiles: self or superadmin can select"
on public.profiles for select
using (id = auth.uid() or public.is_superadmin());

create policy "profiles: only superadmin can insert"
on public.profiles for insert
with check (public.is_superadmin());

create policy "profiles: self or superadmin can update"
on public.profiles for update
using (id = auth.uid() or public.is_superadmin());

create policy "profiles: only superadmin can delete"
on public.profiles for delete
using (public.is_superadmin());

-- ------------------------------------------------------------------ hotels --

create policy "hotels: public can read active, admins read own, superadmin reads all"
on public.hotels for select
using (
  is_active
  or id = public.current_hotel_id()
  or public.is_superadmin()
);

create policy "hotels: only superadmin can insert"
on public.hotels for insert
with check (public.is_superadmin());

create policy "hotels: own hotel_admin or superadmin can update"
on public.hotels for update
using (id = public.current_hotel_id() or public.is_superadmin());

create policy "hotels: only superadmin can delete"
on public.hotels for delete
using (public.is_superadmin());

-- ------------------------------------------------------- content tables ---
-- (services, menu_categories, menu_items, local_guide_places, hotel_rules,
--  hotel_contacts) ერთი და იგივე პატერნით: public კითხულობს active hotel-ის
-- კონტენტს, hotel_admin მართავს მხოლოდ საკუთარს, superadmin — ყველაფერს.

do $$
declare
  t text;
begin
  foreach t in array array[
    'services', 'menu_categories', 'menu_items',
    'local_guide_places', 'hotel_rules', 'hotel_contacts'
  ]
  loop
    execute format($f$
      create policy "%1$s: public reads active hotel content"
      on public.%1$s for select
      using (
        exists (
          select 1 from public.hotels h
          where h.id = %1$s.hotel_id and h.is_active
        )
        or hotel_id = public.current_hotel_id()
        or public.is_superadmin()
      );
    $f$, t);

    execute format($f$
      create policy "%1$s: hotel_admin manages own, superadmin manages all"
      on public.%1$s for all
      using (hotel_id = public.current_hotel_id() or public.is_superadmin())
      with check (hotel_id = public.current_hotel_id() or public.is_superadmin());
    $f$, t);
  end loop;
end $$;
