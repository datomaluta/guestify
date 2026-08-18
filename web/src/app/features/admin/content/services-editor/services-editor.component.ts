import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelService as HotelServiceItem } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent, IconName } from '../../../../shared/icon/icon.component';

/** სერვისებისთვის შემოთავაზებული curated ნაკრები (UI-chrome icon-ები — chevron-*, external-link — გამორიცხულია). */
const SERVICE_ICONS: IconName[] = [
  'general',
  'concierge-bell',
  'cup',
  'cutlery',
  'bar',
  'droplet',
  'pool',
  'gym',
  'clock',
  'wifi',
  'ac',
  'tv',
  'safe',
  'minibar',
  'laundry',
  'elevator',
  'parking',
  'shuttle',
  'luggage',
  'bike',
  'beach',
  'kids-club',
  'pets',
  'non-smoking',
  'business-center',
  'accessibility',
  'shield-check',
  'map-pin',
  'phone'
];

const ICON_LABELS: Partial<Record<IconName, string>> = {
  general: 'ზოგადი',
  'concierge-bell': 'კონსიერჟი',
  cup: 'საუზმე',
  cutlery: 'რესტორანი',
  bar: 'ბარი',
  droplet: 'Spa',
  pool: 'აუზი',
  gym: 'სავარჯიშო დარბაზი',
  clock: '24/7',
  wifi: 'Wi-Fi',
  ac: 'კონდიციონერი',
  tv: 'ტელევიზორი',
  safe: 'სეიფი',
  minibar: 'მინი-ბარი',
  laundry: 'სამრეცხაო',
  elevator: 'ლიფტი',
  parking: 'პარკინგი',
  shuttle: 'ტრანსფერი',
  luggage: 'ბარგი',
  bike: 'ველოსიპედი',
  beach: 'პლაჟი',
  'kids-club': 'საბავშვო კლუბი',
  pets: 'ცხოველები',
  'non-smoking': 'არამწეველთათვის',
  'business-center': 'ბიზნეს-ცენტრი',
  accessibility: 'ხელმისაწვდომობა',
  'shield-check': 'უსაფრთხოება',
  'map-pin': 'მდებარეობა',
  phone: 'კონტაქტი'
};

interface ServiceForm {
  icon: IconName;
  title_ka: string;
  title_en: string;
  title_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  sort_order: number;
  is_active: boolean;
}

const BLANK: ServiceForm = {
  icon: 'general',
  title_ka: '',
  title_en: '',
  title_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  sort_order: 0,
  is_active: true
};

@Component({
  selector: 'app-services-editor',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './services-editor.component.html',
  styleUrl: './services-editor.component.scss'
})
export class ServicesEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly icons = SERVICE_ICONS;
  protected readonly items = signal<HotelServiceItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: ServiceForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listServices(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: HotelServiceItem): void {
    this.editingId.set(item.id);
    this.form = {
      icon: this.iconFor(item.icon),
      title_ka: item.title_ka,
      title_en: item.title_en || '',
      title_ru: item.title_ru || '',
      description_ka: item.description_ka || '',
      description_en: item.description_en || '',
      description_ru: item.description_ru || '',
      sort_order: item.sort_order,
      is_active: item.is_active
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  selectIcon(icon: IconName): void {
    this.form = { ...this.form, icon };
  }

  labelFor(icon: IconName): string {
    return ICON_LABELS[icon] ?? icon;
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      await this.content.saveService(this.editingId(), { ...this.form, hotel_id: this.hotelId });
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს სერვისი?')) return;
    await this.content.deleteService(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }

  iconFor(icon: string | null): IconName {
    return SERVICE_ICONS.includes(icon as IconName) ? (icon as IconName) : 'general';
  }
}
