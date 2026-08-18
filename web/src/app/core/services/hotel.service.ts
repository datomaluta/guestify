import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import {
  Hotel,
  HotelService as HotelServiceItem,
  MenuCategory,
  MenuItem,
  GuidePlace,
  HotelRule,
  HotelContact
} from '../models';

/**
 * ყველა read-only query-ს ერთად აგროვებს — RLS თავად ზღუდავს რას ხედავს anon/hotel_admin/superadmin.
 *
 * სტუმრის გვერდები (services/menu/guide/rules) ერთ სესიაში ხშირად წინ-უკან იხსნება (home <-> გვერდი),
 * ამიტომ თითო hotelId-ის შედეგი მეხსიერებაში ინახება (Map) — მეორედ იმავე გვერდზე დაბრუნებისას აღარ
 * ვითხოვთ თავიდან Supabase-ს, გვერდი მაშინვე ჩნდება ბოლო ცნობილი მონაცემით. ეს service singleton-ია
 * (`providedIn: 'root'`) და მთელი SPA სესიის განმავლობაში ცოცხლობს — უბრალო refresh (F5)
 * ავტომატურად ასუფთავებს, რადგან აპლიკაცია ნულიდან იტვირთება.
 */
@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly supabase = inject(SupabaseService);
  private readonly cache = new Map<string, Promise<unknown>>();

  /** cache-hit-ზე იგივე Promise-ს აბრუნებს — ორმა გვერდმა ერთდროულად რომ მოითხოვოს, ქსელში ერთხელაც არ გავა. */
  private cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (!this.cache.has(key)) {
      const promise = fetcher().catch((err) => {
        this.cache.delete(key); // შეცდომაზე cache არ ჩარჩეს — შემდეგმა მცდელობამ თავიდან სცადოს
        throw err;
      });
      this.cache.set(key, promise);
    }
    return this.cache.get(key) as Promise<T>;
  }

  async getBySlug(slug: string): Promise<Hotel | null> {
    const { data, error } = await this.supabase.client
      .from('hotels')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data as Hotel | null;
  }

  getServices(hotelId: string): Promise<HotelServiceItem[]> {
    return this.cached(`services:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('services')
        .select('*')
        .eq('hotel_id', hotelId)
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as HotelServiceItem[];
    });
  }

  getMenuCategories(hotelId: string): Promise<MenuCategory[]> {
    return this.cached(`menu_categories:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('menu_categories')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as MenuCategory[];
    });
  }

  getMenuItems(hotelId: string): Promise<MenuItem[]> {
    return this.cached(`menu_items:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('menu_items')
        .select('*')
        .eq('hotel_id', hotelId)
        .eq('is_available', true)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as MenuItem[];
    });
  }

  getGuidePlaces(hotelId: string): Promise<GuidePlace[]> {
    return this.cached(`guide_places:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('local_guide_places')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as GuidePlace[];
    });
  }

  getRules(hotelId: string): Promise<HotelRule[]> {
    return this.cached(`rules:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('hotel_rules')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as HotelRule[];
    });
  }

  getContacts(hotelId: string): Promise<HotelContact[]> {
    return this.cached(`contacts:${hotelId}`, async () => {
      const { data, error } = await this.supabase.client
        .from('hotel_contacts')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('sort_order');

      if (error) throw error;
      return (data ?? []) as HotelContact[];
    });
  }
}
