/**
 * გზამკვლევის კატეგორიების მეტამონაცემები — მხოლოდ აისქონი + სახელი; ფერი ყველა
 * კატეგორიისთვის ერთი და იგივეა (ბრენდის აქცენტი), განზრახ არ განსხვავდება
 * კატეგორიების მიხედვით.
 */
export interface GuideCategoryMeta {
  icon: string;
  labelKey: string;
}

export const GUIDE_CATEGORIES: Record<string, GuideCategoryMeta> = {
  cafe: { icon: 'local_cafe', labelKey: 'guide_cat_cafe' },
  restaurant: { icon: 'restaurant', labelKey: 'guide_cat_restaurant' },
  experience: { icon: 'explore', labelKey: 'guide_cat_experience' },
  attraction: { icon: 'photo_camera', labelKey: 'guide_cat_attraction' },
  shop: { icon: 'shopping_bag', labelKey: 'guide_cat_shop' }
};

const DEFAULT_CATEGORY: GuideCategoryMeta = {
  icon: 'place',
  labelKey: 'guide_cat_other'
};

export function guideCategoryMeta(category: string | null | undefined): GuideCategoryMeta {
  return (category && GUIDE_CATEGORIES[category]) || DEFAULT_CATEGORY;
}
