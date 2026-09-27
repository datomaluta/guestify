import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Partner } from '../models';

/**
 * ლენდინგის Partners სექციისა და /partners გვერდის საჯარო სია. ერთხელ ითხოვს და
 * Promise-ს ინახავს — ლენდინგიდან /partners-ზე გადასვლისას სია მაშინვე ჩნდება.
 */
@Injectable({ providedIn: 'root' })
export class PartnersService {
  private readonly supabase = inject(SupabaseService);
  private request: Promise<Partner[]> | null = null;

  /** მხოლოდ აქტიურები — `is_active` ფილტრი ცალკეც საჭიროა, რადგან დალოგინებულ superadmin-ს RLS გამორთულებსაც უჩვენებს. */
  listActive(): Promise<Partner[]> {
    this.request ??= this.fetchActive().catch((err) => {
      this.request = null; // შეცდომაზე cache არ ჩარჩეს — შემდეგმა მცდელობამ თავიდან სცადოს
      throw err;
    });
    return this.request;
  }

  private async fetchActive(): Promise<Partner[]> {
    const { data, error } = await this.supabase.client
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error) throw error;
    return (data ?? []) as Partner[];
  }
}
