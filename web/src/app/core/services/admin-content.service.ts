import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { resizeImage } from '../utils/image-resize';
import { HotelService as HotelServiceItem, MenuCategory, MenuItem, GuidePlace, HotelRule, HotelContact } from '../models';

type Row = Record<string, any>;

/** hotel_admin (და superadmin) წერენ/კითხულობენ საკუთარი (ან ნებისმიერი) სასტუმროს კონტენტს — RLS თავად ზღუდავს ვის რისი შეცვლა შეუძლია. */
@Injectable({ providedIn: 'root' })
export class AdminContentService {
  private readonly supabase = inject(SupabaseService);

  // ---------------------------------------------------------------- services --

  async listServices(hotelId: string): Promise<HotelServiceItem[]> {
    const { data, error } = await this.supabase.client
      .from('services')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as HotelServiceItem[];
  }

  async saveService(id: string | null, payload: Row): Promise<void> {
    const { error } = id
      ? await this.supabase.client.from('services').update(payload).eq('id', id)
      : await this.supabase.client.from('services').insert(payload);
    if (error) throw error;
  }

  async deleteService(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('services').delete().eq('id', id);
    if (error) throw error;
  }

  // ---------------------------------------------------------------- menu --

  async listMenuCategories(hotelId: string): Promise<MenuCategory[]> {
    const { data, error } = await this.supabase.client
      .from('menu_categories')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as MenuCategory[];
  }

  async saveMenuCategory(id: string | null, payload: Row): Promise<void> {
    const { error } = id
      ? await this.supabase.client.from('menu_categories').update(payload).eq('id', id)
      : await this.supabase.client.from('menu_categories').insert(payload);
    if (error) throw error;
  }

  async deleteMenuCategory(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('menu_categories').delete().eq('id', id);
    if (error) throw error;
  }

  async listMenuItems(hotelId: string): Promise<MenuItem[]> {
    const { data, error } = await this.supabase.client
      .from('menu_items')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as MenuItem[];
  }

  async saveMenuItem(id: string | null, payload: Row): Promise<MenuItem> {
    const query = id
      ? this.supabase.client.from('menu_items').update(payload).eq('id', id)
      : this.supabase.client.from('menu_items').insert(payload);
    const { data, error } = await query.select().single();
    if (error) throw error;
    return data as MenuItem;
  }

  async deleteMenuItem(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('menu_items').delete().eq('id', id);
    if (error) throw error;
  }

  // ------------------------------------------------------------ guide places --

  async listGuidePlaces(hotelId: string): Promise<GuidePlace[]> {
    const { data, error } = await this.supabase.client
      .from('local_guide_places')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as GuidePlace[];
  }

  async saveGuidePlace(id: string | null, payload: Row): Promise<GuidePlace> {
    const query = id
      ? this.supabase.client.from('local_guide_places').update(payload).eq('id', id)
      : this.supabase.client.from('local_guide_places').insert(payload);
    const { data, error } = await query.select().single();
    if (error) throw error;
    return data as GuidePlace;
  }

  async deleteGuidePlace(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('local_guide_places').delete().eq('id', id);
    if (error) throw error;
  }

  // ---------------------------------------------------------------- rules --

  async listRules(hotelId: string): Promise<HotelRule[]> {
    const { data, error } = await this.supabase.client
      .from('hotel_rules')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as HotelRule[];
  }

  async saveRule(id: string | null, payload: Row): Promise<void> {
    const { error } = id
      ? await this.supabase.client.from('hotel_rules').update(payload).eq('id', id)
      : await this.supabase.client.from('hotel_rules').insert(payload);
    if (error) throw error;
  }

  async deleteRule(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('hotel_rules').delete().eq('id', id);
    if (error) throw error;
  }

  // ------------------------------------------------------------- contacts --

  async listContacts(hotelId: string): Promise<HotelContact[]> {
    const { data, error } = await this.supabase.client
      .from('hotel_contacts')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as HotelContact[];
  }

  async saveContact(id: string | null, payload: Row): Promise<void> {
    const { error } = id
      ? await this.supabase.client.from('hotel_contacts').update(payload).eq('id', id)
      : await this.supabase.client.from('hotel_contacts').insert(payload);
    if (error) throw error;
  }

  async deleteContact(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('hotel_contacts').delete().eq('id', id);
    if (error) throw error;
  }

  // ----------------------------------------------------------------- images --

  /** ატვირთვამდე resize/compress (~480px WebP), `{hotel_id}/{relativePath}` კონვენციით. */
  async uploadEntityImage(hotelId: string, relativePath: string, file: File): Promise<string> {
    const blob = await resizeImage(file, 480, 0.82);
    const path = `${hotelId}/${relativePath}`;

    const { error } = await this.supabase.client.storage
      .from('hotel-assets')
      .upload(path, blob, { upsert: true, contentType: 'image/webp' });
    if (error) throw error;

    const { data } = this.supabase.client.storage.from('hotel-assets').getPublicUrl(path);
    return `${data.publicUrl}?v=${Date.now()}`;
  }
}
