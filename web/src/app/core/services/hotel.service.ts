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

/** ყველა read-only query-ს ერთად აგროვებს — RLS თავად ზღუდავს რას xედავს anon/hotel_admin/superadmin. */
@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly supabase = inject(SupabaseService);

  async getBySlug(slug: string): Promise<Hotel | null> {
    const { data, error } = await this.supabase.client
      .from('hotels')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data as Hotel | null;
  }

  async getServices(hotelId: string): Promise<HotelServiceItem[]> {
    const { data, error } = await this.supabase.client
      .from('services')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as HotelServiceItem[];
  }

  async getMenuCategories(hotelId: string): Promise<MenuCategory[]> {
    const { data, error } = await this.supabase.client
      .from('menu_categories')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as MenuCategory[];
  }

  async getMenuItems(hotelId: string): Promise<MenuItem[]> {
    const { data, error } = await this.supabase.client
      .from('menu_items')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('is_available', true)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as MenuItem[];
  }

  async getGuidePlaces(hotelId: string): Promise<GuidePlace[]> {
    const { data, error } = await this.supabase.client
      .from('local_guide_places')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as GuidePlace[];
  }

  async getRules(hotelId: string): Promise<HotelRule[]> {
    const { data, error } = await this.supabase.client
      .from('hotel_rules')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as HotelRule[];
  }

  async getContacts(hotelId: string): Promise<HotelContact[]> {
    const { data, error } = await this.supabase.client
      .from('hotel_contacts')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as HotelContact[];
  }
}
