import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * ერთი გაზიარებული Supabase client მთელი აპლიკაციისთვის.
 * ყველა query RLS-ის ქვეშ მუშაობს — anon-ისთვის მხოლოდ active hotel-ის public
 * მონაცემები ჩანს, hotel_admin ხედავს საკუთარს, superadmin — ყველაფერს.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );
}
