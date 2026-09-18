export interface MenuCategory {
  id: string;
  hotel_id: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  hotel_id: string;
  category_id: string;
  name_ka: string;
  name_en: string | null;
  name_ru: string | null;
  description_ka: string | null;
  description_en: string | null;
  description_ru: string | null;
  ingredients_ka: string | null;
  ingredients_en: string | null;
  ingredients_ru: string | null;
  allergens: string[];
  price: number;
  currency: string;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}

/**
 * ფიქსირებული ალერგენების სია — key ბაზაში (menu_items.allergens) ინახება.
 * icon + label (ka) აქ გამოიყენება admin-პანელის toggle-ჩიფებში (რომელიც მთლიანად
 * ქართულადაა, i18n-ის გარეშე); guest sheet-ში კი მრავალენოვანი წარწერა
 * translate pipe-ით მოდის (translations.ts-ში `allergen_${key}`).
 */
export const ALLERGENS: { key: string; icon: string; label: string }[] = [
  { key: 'gluten', icon: '🌾', label: 'გლუტენი' },
  { key: 'dairy', icon: '🥛', label: 'რძის პროდუქტი' },
  { key: 'nuts', icon: '🌰', label: 'თხილეული' },
  { key: 'peanuts', icon: '🥜', label: 'არაქისი' },
  { key: 'egg', icon: '🥚', label: 'კვერცხი' },
  { key: 'soy', icon: '🌱', label: 'სოია' },
  { key: 'fish', icon: '🐟', label: 'თევზი' },
  { key: 'shellfish', icon: '🦐', label: 'ზღვის პროდუქტები' },
  { key: 'molluscs', icon: '🦪', label: 'მოლუსკები' },
  { key: 'celery', icon: '🥬', label: 'ნიახური' },
  { key: 'mustard', icon: '🟡', label: 'მდოგვი' },
  { key: 'sesame', icon: '🥯', label: 'სუსამი' },
  { key: 'sulfites', icon: '🍷', label: 'სულფიტები' },
  { key: 'lupin', icon: '🌸', label: 'ლუპინი' },
  { key: 'spicy', icon: '🌶️', label: 'ცხარე' },
];
