import { Injectable, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';

export interface Profile {
  id: string;
  role: 'superadmin' | 'hotel_admin';
  full_name: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService);

  readonly session = signal<Session | null>(null);
  readonly profile = signal<Profile | null>(null);
  /** hotel_admin-ის მიბმული hotel_id-ების სია (hotel_admins ცხრილიდან) — superadmin-ისთვის ცარიელია,
   * რადგან მას ნებისმიერ სასტუმროზე წვდომა აქვს role-ითვე (იხ. hotelAdminGuard). */
  readonly adminHotelIds = signal<string[]>([]);
  readonly ready = signal(false);

  /** გამოსაყენებელია route guard-ებში — resolve ხდება პირველი getSession() შემოწმების შემდეგ. */
  readonly readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = this.supabase.client.auth.getSession().then(async ({ data }) => {
      this.session.set(data.session);
      await this.loadProfile();
      this.ready.set(true);
    });

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.loadProfile();
    });
  }

  /** signInWithPassword-ის დასრულების შემდეგ session/onAuthStateChange ცალკე, ასინქრონულად
   * ტვირთავს profile-ს — თუ აქ არ დაველოდებით, გამომძახებელი (login component) ნავიგაციას
   * profile-ის ჩატვირთვამდე გააკეთებდა და შემდეგი გვერდი ცარიელი დარჩებოდა refresh-მდე. */
  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    this.session.set(data.session);
    await this.loadProfile();
    return { error: null };
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this.profile.set(null);
  }

  private async loadProfile(): Promise<void> {
    const userId = this.session()?.user.id;
    if (!userId) {
      this.profile.set(null);
      this.adminHotelIds.set([]);
      return;
    }

    const { data } = await this.supabase.client.from('profiles').select('*').eq('id', userId).maybeSingle();
    this.profile.set(data as Profile | null);

    if ((data as Profile | null)?.role === 'hotel_admin') {
      const { data: rows } = await this.supabase.client.from('hotel_admins').select('hotel_id').eq('profile_id', userId);
      this.adminHotelIds.set((rows ?? []).map((r) => r['hotel_id'] as string));
    } else {
      this.adminHotelIds.set([]);
    }
  }
}
