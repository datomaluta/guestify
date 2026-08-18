import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Hotel } from '../models';
import { resizeImage } from '../utils/image-resize';

export interface HotelAdminProfile {
  id: string;
  role: 'superadmin' | 'hotel_admin';
  hotel_id: string | null;
  full_name: string | null;
}

export type HotelWritePayload = Omit<Hotel, 'id' | 'created_at' | 'updated_at' | 'logo_url'>;

/** superadmin-ის Hotels CRUD + hotel_admin-ის მიბმა/მოხსნა კონკრეტულ სასტუმროზე. */
@Injectable({ providedIn: 'root' })
export class AdminHotelService {
  private readonly supabase = inject(SupabaseService);

  async listHotels(): Promise<Hotel[]> {
    const { data, error } = await this.supabase.client.from('hotels').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as Hotel[];
  }

  async getHotel(id: string): Promise<Hotel | null> {
    const { data, error } = await this.supabase.client.from('hotels').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data as Hotel | null;
  }

  async createHotel(payload: HotelWritePayload): Promise<Hotel> {
    const { data, error } = await this.supabase.client.from('hotels').insert(payload).select().single();
    if (error) throw error;
    return data as Hotel;
  }

  async updateHotel(id: string, payload: Partial<HotelWritePayload>): Promise<void> {
    const { error } = await this.supabase.client.from('hotels').update(payload).eq('id', id);
    if (error) throw error;
  }

  async deleteHotel(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('hotels').delete().eq('id', id);
    if (error) throw error;
  }

  /** ლოგოს ატვირთვა — client-side resize/compress, შემდეგ hotels.logo_url-ის განახლება. */
  async uploadLogo(hotelId: string, file: File): Promise<string> {
    const blob = await resizeImage(file, 480, 0.85);
    const path = `${hotelId}/logo.webp`;

    const { error: uploadError } = await this.supabase.client.storage
      .from('hotel-assets')
      .upload(path, blob, { upsert: true, contentType: 'image/webp' });
    if (uploadError) throw uploadError;

    const { data } = this.supabase.client.storage.from('hotel-assets').getPublicUrl(path);
    const logoUrl = `${data.publicUrl}?v=${Date.now()}`; // cache-bust, ხშირად ერთსა და იმავე path-ზე ხელახლა იტვირთება

    await this.updateHotel(hotelId, { logo_url: logoUrl } as Partial<HotelWritePayload>);
    return logoUrl;
  }

  async listHotelAdmins(hotelId: string): Promise<HotelAdminProfile[]> {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('role', 'hotel_admin');
    if (error) throw error;
    return (data ?? []) as HotelAdminProfile[];
  }

  /**
   * არსებულ Supabase Auth user-ს (Dashboard → Authentication-ში წინასწარ შექმნილს)
   * უკავშირებს hotel_admin როლს ამ სასტუმროზე. ახალი auth user-ის შექმნა
   * service_role-ს მოითხოვს — ეს frontend-იდან ვერ კეთდება (იხ. README).
   */
  async linkHotelAdmin(userId: string, hotelId: string, fullName: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('profiles')
      .insert({ id: userId, role: 'hotel_admin', hotel_id: hotelId, full_name: fullName });
    if (error) throw error;
  }

  async unlinkHotelAdmin(profileId: string): Promise<void> {
    const { error } = await this.supabase.client.from('profiles').delete().eq('id', profileId);
    if (error) throw error;
  }
}
