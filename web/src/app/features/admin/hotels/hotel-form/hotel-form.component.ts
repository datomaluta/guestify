import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppLanguage, Hotel } from '../../../../core/models';
import { AdminHotelService, HotelAdminProfile, HotelWritePayload } from '../../../../core/services/admin-hotel.service';

type HotelFormModel = Omit<HotelWritePayload, 'is_active'> & { is_active: boolean };

const BLANK_FORM: HotelFormModel = {
  slug: '',
  name: '',
  primary_color: '#96772F',
  secondary_color: '#7A2638',
  default_language: 'ka',
  address: '',
  phone: '',
  email: '',
  whatsapp: '',
  is_active: true
};

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss'
})
export class HotelFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly adminHotel = inject(AdminHotelService);

  protected readonly languages: AppLanguage[] = ['ka', 'en', 'ru'];

  protected readonly isNew = signal(true);
  protected readonly hotelId = signal<string | null>(null);
  protected readonly hotel = signal<Hotel | null>(null);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly saved = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly admins = signal<HotelAdminProfile[]>([]);
  protected newAdminUserId = '';
  protected newAdminName = '';
  protected readonly linkingAdmin = signal(false);

  protected readonly uploadingLogo = signal(false);

  protected form: HotelFormModel = { ...BLANK_FORM };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id || id === 'new') {
      this.isNew.set(true);
      this.loading.set(false);
      return;
    }

    this.isNew.set(false);
    this.hotelId.set(id);
    this.loadHotel(id);
  }

  private async loadHotel(id: string): Promise<void> {
    this.loading.set(true);
    try {
      const hotel = await this.adminHotel.getHotel(id);
      if (!hotel) {
        this.error.set('სასტუმრო ვერ მოიძებნა');
        return;
      }
      this.hotel.set(hotel);
      this.form = {
        slug: hotel.slug,
        name: hotel.name,
        primary_color: hotel.primary_color || BLANK_FORM.primary_color,
        secondary_color: hotel.secondary_color || BLANK_FORM.secondary_color,
        default_language: hotel.default_language,
        address: hotel.address || '',
        phone: hotel.phone || '',
        email: hotel.email || '',
        whatsapp: hotel.whatsapp || '',
        is_active: hotel.is_active
      };
      this.admins.set(await this.adminHotel.listHotelAdmins(id));
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
      if (this.isNew()) {
        const created = await this.adminHotel.createHotel({ ...this.form });
        await this.router.navigate(['/admin/hotels', created.id]);
      } else {
        await this.adminHotel.updateHotel(this.hotelId()!, { ...this.form });
        this.saved.set(true);
      }
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async onLogoSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    const id = this.hotelId();
    if (!file || !id) return;

    this.uploadingLogo.set(true);
    try {
      const logoUrl = await this.adminHotel.uploadLogo(id, file);
      this.hotel.set({ ...this.hotel()!, logo_url: logoUrl });
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.uploadingLogo.set(false);
    }
  }

  async linkAdmin(): Promise<void> {
    const id = this.hotelId();
    if (!id || !this.newAdminUserId.trim()) return;

    this.linkingAdmin.set(true);
    this.error.set(null);
    try {
      await this.adminHotel.linkHotelAdmin(this.newAdminUserId.trim(), id, this.newAdminName.trim());
      this.admins.set(await this.adminHotel.listHotelAdmins(id));
      this.newAdminUserId = '';
      this.newAdminName = '';
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.linkingAdmin.set(false);
    }
  }

  async unlinkAdmin(profileId: string): Promise<void> {
    const id = this.hotelId();
    if (!id) return;
    await this.adminHotel.unlinkHotelAdmin(profileId);
    this.admins.set(await this.adminHotel.listHotelAdmins(id));
  }

  async deleteHotel(): Promise<void> {
    const id = this.hotelId();
    if (!id) return;
    if (!confirm(`წავშალოთ „${this.form.name}“? ეს წაშლის ყველა მის სერვისს, მენიუს, გზამკვლევს და წესებსაც. ეს ქმედება შეუქცევადია.`)) {
      return;
    }
    await this.adminHotel.deleteHotel(id);
    await this.router.navigateByUrl('/admin/hotels');
  }
}
