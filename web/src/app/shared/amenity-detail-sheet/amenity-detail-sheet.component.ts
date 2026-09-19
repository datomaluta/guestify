import { Component, HostListener, input, output, signal } from '@angular/core';
import { FeaturedAmenity } from '../../core/models';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../core/i18n/localize.pipe';

/**
 * "გამორჩეული სერვისის" დეტალების bottom sheet — ფოტო, სრული აღწერა და
 * სამუშაო საათები. MenuItemSheetComponent-ის იგივე hand-rolled ნიმუშია
 * (იხ. მისი კომენტარი დახურვის ანიმაციის მექანიკაზე) — აპში ერთადერთი
 * overlay-პატერნია, ამიტომ მისი გამეორება მარტივია, ცალკე ბიბლიოთეკის
 * მოყოლის მაგივრად.
 */
@Component({
  selector: 'app-amenity-detail-sheet',
  standalone: true,
  imports: [TranslatePipe, LocalizePipe],
  templateUrl: './amenity-detail-sheet.component.html',
  styleUrl: './amenity-detail-sheet.component.scss'
})
export class AmenityDetailSheetComponent {
  readonly amenity = input.required<FeaturedAmenity>();
  readonly close = output<void>();

  protected readonly closing = signal(false);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.requestClose();
  }

  protected requestClose(): void {
    this.closing.set(true);
  }

  protected onSheetAnimationEnd(): void {
    if (this.closing()) {
      this.close.emit();
    }
  }
}
