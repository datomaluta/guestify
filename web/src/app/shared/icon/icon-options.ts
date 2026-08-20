/**
 * icon-picker-ის სწრაფი შემოთავაზებები — ყველაზე ხშირად საჭირო Material Symbols სახელები,
 * მოხერხებულობისთვის (ერთი დაწკაპუნებით). ეს აღარაა დახურული სია — თუ სია არ ეყოფა,
 * ნებისმიერი სხვა Material Symbols სახელიც (fonts.google.com/icons) პირდაპირ ტექსტურ ველში იწერება.
 */
export interface IconSuggestion {
  name: string;
  label: string;
}

export const ICON_SUGGESTIONS: IconSuggestion[] = [
  { name: 'local_cafe', label: 'საუზმე' },
  { name: 'restaurant', label: 'რესტორანი' },
  { name: 'local_bar', label: 'ბარი' },
  { name: 'spa', label: 'Spa' },
  { name: 'pool', label: 'აუზი' },
  { name: 'fitness_center', label: 'სავარჯიშო დარბაზი' },
  { name: 'schedule', label: '24/7' },
  { name: 'wifi', label: 'Wi-Fi' },
  { name: 'ac_unit', label: 'კონდიციონერი' },
  { name: 'tv', label: 'ტელევიზორი' },
  { name: 'lock', label: 'სეიფი' },
  { name: 'kitchen', label: 'მინი-ბარი' },
  { name: 'local_laundry_service', label: 'სამრეცხაო' },
  { name: 'elevator', label: 'ლიფტი' },
  { name: 'local_parking', label: 'პარკინგი' },
  { name: 'airport_shuttle', label: 'ტრანსფერი' },
  { name: 'luggage', label: 'ბარგი' },
  { name: 'directions_bike', label: 'ველოსიპედი' },
  { name: 'beach_access', label: 'პლაჟი' },
  { name: 'child_care', label: 'საბავშვო კლუბი' },
  { name: 'pets', label: 'ცხოველები' },
  { name: 'smoke_free', label: 'არამწეველთათვის' },
  { name: 'business_center', label: 'ბიზნეს-ცენტრი' },
  { name: 'accessible', label: 'ხელმისაწვდომობა' },
  { name: 'room_service', label: 'კონსიერჟი' },
  { name: 'star', label: 'ზოგადი' }
];

/** DB-ში icon ველი ცარიელია/null-ია — ეს ჩნდება ნაცვლად. */
export const DEFAULT_ICON = 'star';
