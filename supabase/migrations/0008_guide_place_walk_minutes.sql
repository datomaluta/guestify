-- ============================================================================
-- 0008: local_guide_places.walk_minutes — ფეხით სავალი დრო სასტუმროდან ადგილამდე,
-- საჭიროა Home გვერდის "Local Favorites" სექციაში (მაგ. "3 min walk").
-- ============================================================================

alter table public.local_guide_places
  add column walk_minutes int;
