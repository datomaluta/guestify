import { Injectable, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase.service';

export interface Profile {
  id: string;
  role: 'superadmin' | 'hotel_admin';
  hotel_id: string | null;
  full_name: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService);

  readonly session = signal<Session | null>(null);
  readonly profile = signal<Profile | null>(null);
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

  async signIn(email: string, password: string): Promise<{ error: string | null }> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this.profile.set(null);
  }

  private async loadProfile(): Promise<void> {
    const userId = this.session()?.user.id;
    if (!userId) {
      this.profile.set(null);
      return;
    }

    const { data } = await this.supabase.client.from('profiles').select('*').eq('id', userId).maybeSingle();

    this.profile.set(data as Profile | null);
  }
}
