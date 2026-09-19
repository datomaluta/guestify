-- ============================================================================
-- 0014: hotel_admins — many-to-many admin↔hotel დაკავშირება, profiles.hotel_id-ის
-- ნაცვლად. საჭირო გახდა ორი მიზეზით: (1) superadmin-საც უნდა შეეძლოს ნებისმიერი
-- სასტუმროს content-ის რედაქტირება, (2) ერთ hotel_admin ანგარიშს რამდენიმე
-- სასტუმროს მართვა უნდა შეეძლოს (ცალკე login თითო სასტუმროზე აღარაა საჭირო).
-- current_hotel_id() (ერთი მნიშვნელობა) იცვლება is_hotel_admin_of(target_hotel_id)-ით
-- (წევრობის შემოწმება), ყველა დამოკიდებული RLS policy ხელახლა იწერება.
--
-- ყოველი ნაბიჯი იდემპოტენტურია (if exists/if not exists/or replace) — ხელახლა
-- გაშვება უსაფრთხოა, თუნდაც წინა მცდელობა ნახევარში გაჩერებულიყო.
-- ============================================================================

create table if not exists public.hotel_admins (
  profile_id  uuid not null references public.profiles (id) on delete cascade,
  hotel_id    uuid not null references public.hotels (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (profile_id, hotel_id)
);

create index if not exists hotel_admins_hotel_id_idx on public.hotel_admins (hotel_id);

alter table public.hotel_admins enable row level security;

drop policy if exists "hotel_admins: self or superadmin can read" on public.hotel_admins;
create policy "hotel_admins: self or superadmin can read"
on public.hotel_admins for select
using (profile_id = auth.uid() or public.is_superadmin());

drop policy if exists "hotel_admins: only superadmin manages" on public.hotel_admins;
create policy "hotel_admins: only superadmin manages"
on public.hotel_admins for all
using (public.is_superadmin())
with check (public.is_superadmin());

-- არსებული 1 admin = 1 hotel მონაცემის გადატანა ახალ ცხრილში (თუ profiles.hotel_id ჯერ კიდევ არსებობს)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'hotel_id'
  ) then
    insert into public.hotel_admins (profile_id, hotel_id)
    select id, hotel_id from public.profiles
    where role = 'hotel_admin' and hotel_id is not null
    on conflict (profile_id, hotel_id) do nothing;
  end if;
end $$;

-- ----------------------------------------------------------------------------
-- profiles.hotel_id column-ის მოცილება — ახლა hotel_admins ცხრილი ინახავს ამ კავშირს
-- ----------------------------------------------------------------------------

alter table public.profiles drop constraint if exists profiles_role_hotel_check;
drop index if exists public.profiles_hotel_id_idx;
alter table public.profiles drop column if exists hotel_id;

create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() and new.role is distinct from old.role then
    raise exception 'მხოლოდ superadmin-ს შეუძლია role-ის შეცვლა';
  end if;
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- current_hotel_id() → is_hotel_admin_of(target_hotel_id) (წევრობის შემოწმება, არა
-- ტოლობა ერთ მნიშვნელობასთან — ასე ერთ admin-ს რამდენიმე hotel_id-ზეც მუშაობს)
-- ----------------------------------------------------------------------------

-- cascade საჭიროა, რადგან hotels/content ცხრილების ძველი policy-ები (და storage.objects-ის
-- hotel-assets policy-ებიც, იხ. ქვემოთ) ჯერ კიდევ ამ ფუნქციაზეა დამოკიდებული — ყველა მათგანი
-- ამ migration-ში ისედაც თავიდან იქმნება.
drop function if exists public.current_hotel_id() cascade;

create or replace function public.is_hotel_admin_of(target_hotel_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.hotel_admins
    where profile_id = auth.uid() and hotel_id = target_hotel_id
  );
$$;

-- ------------------------------------------------------------------ hotels --

drop policy if exists "hotels: public can read active, admins read own, superadmin reads all" on public.hotels;
drop policy if exists "hotels: own hotel_admin or superadmin can update" on public.hotels;

create policy "hotels: public can read active, admins read own, superadmin reads all"
on public.hotels for select
using (
  is_active
  or public.is_hotel_admin_of(id)
  or public.is_superadmin()
);

create policy "hotels: own hotel_admin or superadmin can update"
on public.hotels for update
using (public.is_hotel_admin_of(id) or public.is_superadmin());

-- ------------------------------------------------------- content tables ---
-- (services, menu_categories, menu_items, local_guide_places, hotel_rules,
--  hotel_contacts, ai_topics) — იგივე ორი policy, current_hotel_id()-ის ნაცვლად
-- is_hotel_admin_of()-ით.

do $$
declare
  t text;
begin
  foreach t in array array[
    'services', 'menu_categories', 'menu_items',
    'local_guide_places', 'hotel_rules', 'hotel_contacts', 'ai_topics'
  ]
  loop
    execute format('drop policy if exists "%1$s: public reads active hotel content" on public.%1$s', t);
    execute format('drop policy if exists "%1$s: hotel_admin manages own, superadmin manages all" on public.%1$s', t);

    execute format($f$
      create policy "%1$s: public reads active hotel content"
      on public.%1$s for select
      using (
        exists (
          select 1 from public.hotels h
          where h.id = %1$s.hotel_id and h.is_active
        )
        or public.is_hotel_admin_of(hotel_id)
        or public.is_superadmin()
      );
    $f$, t);

    execute format($f$
      create policy "%1$s: hotel_admin manages own, superadmin manages all"
      on public.%1$s for all
      using (public.is_hotel_admin_of(hotel_id) or public.is_superadmin())
      with check (public.is_hotel_admin_of(hotel_id) or public.is_superadmin());
    $f$, t);
  end loop;
end $$;

-- ---------------------------------------------------------- storage.objects --
-- (0002_storage.sql) — path_hotel_id(name) = current_hotel_id() ტოლობა იცვლება
-- is_hotel_admin_of(path_hotel_id(name)) წევრობის შემოწმებით.

drop policy if exists "hotel-assets: hotel_admin uploads to own folder, superadmin — anywhere" on storage.objects;
create policy "hotel-assets: hotel_admin uploads to own folder, superadmin — anywhere"
on storage.objects for insert
with check (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.is_hotel_admin_of(public.path_hotel_id(name))
  )
);

drop policy if exists "hotel-assets: hotel_admin updates own folder, superadmin — anywhere" on storage.objects;
create policy "hotel-assets: hotel_admin updates own folder, superadmin — anywhere"
on storage.objects for update
using (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.is_hotel_admin_of(public.path_hotel_id(name))
  )
)
with check (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.is_hotel_admin_of(public.path_hotel_id(name))
  )
);

drop policy if exists "hotel-assets: hotel_admin deletes own folder, superadmin — anywhere" on storage.objects;
create policy "hotel-assets: hotel_admin deletes own folder, superadmin — anywhere"
on storage.objects for delete
using (
  bucket_id = 'hotel-assets'
  and (
    public.is_superadmin()
    or public.is_hotel_admin_of(public.path_hotel_id(name))
  )
);
