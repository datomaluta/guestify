-- ============================================================================
-- icon-ების გადაყვანა ჩვენს ძველ curated slug-ებიდან (cup, droplet, wifi...) რეალურ
-- Google Material Symbols სახელებზე (local_cafe, spa, wifi...). ეს საჭიროა მხოლოდ
-- უკვე არსებული services/hotel_rules რიგებისთვის — ახალი ჩანაწერები პირდაპირ
-- Material Symbols სახელით ინახება (icon-picker-ის free-text ველიდან).
-- უსაფრთხოდ ხელახლა გასაშვებია — არარელევანტურ მნიშვნელობებს (უკვე Material Symbols
-- სახელს ან null-ს) არ ეხება.
-- ============================================================================

update public.services set icon = case icon
  when 'cup' then 'local_cafe'
  when 'cutlery' then 'restaurant'
  when 'bar' then 'local_bar'
  when 'droplet' then 'spa'
  when 'pool' then 'pool'
  when 'gym' then 'fitness_center'
  when 'clock' then 'schedule'
  when 'wifi' then 'wifi'
  when 'ac' then 'ac_unit'
  when 'tv' then 'tv'
  when 'safe' then 'lock'
  when 'minibar' then 'kitchen'
  when 'laundry' then 'local_laundry_service'
  when 'elevator' then 'elevator'
  when 'parking' then 'local_parking'
  when 'shuttle' then 'airport_shuttle'
  when 'luggage' then 'luggage'
  when 'bike' then 'directions_bike'
  when 'beach' then 'beach_access'
  when 'kids-club' then 'child_care'
  when 'pets' then 'pets'
  when 'non-smoking' then 'smoke_free'
  when 'business-center' then 'business_center'
  when 'accessibility' then 'accessible'
  when 'concierge-bell' then 'room_service'
  when 'shield-check' then 'rule'
  when 'map-pin' then 'location_on'
  when 'phone' then 'call'
  when 'general' then 'star'
  else icon
end
where icon in (
  'cup', 'cutlery', 'bar', 'droplet', 'pool', 'gym', 'clock', 'wifi', 'ac', 'tv', 'safe',
  'minibar', 'laundry', 'elevator', 'parking', 'shuttle', 'luggage', 'bike', 'beach',
  'kids-club', 'pets', 'non-smoking', 'business-center', 'accessibility', 'concierge-bell',
  'shield-check', 'map-pin', 'phone', 'general'
);

update public.hotel_rules set icon = case icon
  when 'cup' then 'local_cafe'
  when 'cutlery' then 'restaurant'
  when 'bar' then 'local_bar'
  when 'droplet' then 'spa'
  when 'pool' then 'pool'
  when 'gym' then 'fitness_center'
  when 'clock' then 'schedule'
  when 'wifi' then 'wifi'
  when 'ac' then 'ac_unit'
  when 'tv' then 'tv'
  when 'safe' then 'lock'
  when 'minibar' then 'kitchen'
  when 'laundry' then 'local_laundry_service'
  when 'elevator' then 'elevator'
  when 'parking' then 'local_parking'
  when 'shuttle' then 'airport_shuttle'
  when 'luggage' then 'luggage'
  when 'bike' then 'directions_bike'
  when 'beach' then 'beach_access'
  when 'kids-club' then 'child_care'
  when 'pets' then 'pets'
  when 'non-smoking' then 'smoke_free'
  when 'business-center' then 'business_center'
  when 'accessibility' then 'accessible'
  when 'concierge-bell' then 'room_service'
  when 'shield-check' then 'rule'
  when 'map-pin' then 'location_on'
  when 'phone' then 'call'
  when 'general' then 'star'
  else icon
end
where icon in (
  'cup', 'cutlery', 'bar', 'droplet', 'pool', 'gym', 'clock', 'wifi', 'ac', 'tv', 'safe',
  'minibar', 'laundry', 'elevator', 'parking', 'shuttle', 'luggage', 'bike', 'beach',
  'kids-club', 'pets', 'non-smoking', 'business-center', 'accessibility', 'concierge-bell',
  'shield-check', 'map-pin', 'phone', 'general'
);
