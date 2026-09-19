import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminHotelService, HotelWritePayload } from '../../../../core/services/admin-hotel.service';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';

type EssentialsForm = Pick<
  HotelWritePayload,
  | 'wifi_network'
  | 'wifi_password'
  | 'checkin_time_ka'
  | 'checkin_time_en'
  | 'checkin_time_ru'
  | 'checkin_note_ka'
  | 'checkin_note_en'
  | 'checkin_note_ru'
  | 'checkout_time_ka'
  | 'checkout_time_en'
  | 'checkout_time_ru'
  | 'checkout_note_ka'
  | 'checkout_note_en'
  | 'checkout_note_ru'
  | 'pharmacy_maps_url'
  | 'atm_maps_url'
>;

const BLANK: EssentialsForm = {
  wifi_network: '',
  wifi_password: '',
  checkin_time_ka: '',
  checkin_time_en: '',
  checkin_time_ru: '',
  checkin_note_ka: '',
  checkin_note_en: '',
  checkin_note_ru: '',
  checkout_time_ka: '',
  checkout_time_en: '',
  checkout_time_ru: '',
  checkout_note_ka: '',
  checkout_note_en: '',
  checkout_note_ru: '',
  pharmacy_maps_url: '',
  atm_maps_url: ''
};

/**
 * hotel_admin-ის საკუთარი Wi-Fi/Check-in/Check-out/Pharmacy/ATM ველების რედაქტორი —
 * ეს ფაქტობრივად ოპერაციული დეტალებია (ხშირად იცვლება), ამიტომ hotel_admin-ის content
 * პანელშია, superadmin-ის hotel-form-ის (branding/slug/package) მაგივრად. RLS-ს უკვე
 * აქვს "hotels: own hotel_admin or superadmin can update" policy, ასე რომ hotel_admin-ს
 * საკუთარი hotels row-ის ამ ველების ჩაწერა DB-დონეზეც ეკუთვნის.
 *
 * Check-in/Check-out დრო+აღწერა მრავალენოვანია (guest UI ka/en/ru-ს შორის გადართავს) —
 * Wi-Fi ქსელი/პაროლი და Maps ბმულები კი ენისგან დამოუკიდებელია.
 */
@Component({
  selector: 'app-essentials-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './essentials-editor.component.html',
  styleUrl: './essentials-editor.component.scss'
})
export class EssentialsEditorComponent {
  private readonly adminHotel = inject(AdminHotelService);
  private readonly hotelId = inject(AdminHotelContextService).hotel()!.id;

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly saved = signal(false);
  protected readonly error = signal<string | null>(null);

  protected form: EssentialsForm = { ...BLANK };

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    try {
      const hotel = await this.adminHotel.getHotel(this.hotelId);
      if (hotel) {
        this.form = {
          wifi_network: hotel.wifi_network || '',
          wifi_password: hotel.wifi_password || '',
          checkin_time_ka: hotel.checkin_time_ka || '',
          checkin_time_en: hotel.checkin_time_en || '',
          checkin_time_ru: hotel.checkin_time_ru || '',
          checkin_note_ka: hotel.checkin_note_ka || '',
          checkin_note_en: hotel.checkin_note_en || '',
          checkin_note_ru: hotel.checkin_note_ru || '',
          checkout_time_ka: hotel.checkout_time_ka || '',
          checkout_time_en: hotel.checkout_time_en || '',
          checkout_time_ru: hotel.checkout_time_ru || '',
          checkout_note_ka: hotel.checkout_note_ka || '',
          checkout_note_en: hotel.checkout_note_en || '',
          checkout_note_ru: hotel.checkout_note_ru || '',
          pharmacy_maps_url: hotel.pharmacy_maps_url || '',
          atm_maps_url: hotel.atm_maps_url || ''
        };
      }
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.loading.set(false);
    }
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.saved.set(false);
    this.error.set(null);
    try {
      await this.adminHotel.updateHotel(this.hotelId, { ...this.form });
      this.saved.set(true);
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }
}
