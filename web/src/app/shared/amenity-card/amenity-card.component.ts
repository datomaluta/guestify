import { Component, input, output } from '@angular/core';
import { FeaturedAmenity } from '../../core/models';
import { LocalizePipe } from '../../core/i18n/localize.pipe';

/**
 * "გამორჩეული სერვისი" ბარათი Essentials-ზე — PlaceCardComponent-ის ფორკია
 * (არა გენერალიზაცია), რადგან footer-ი (Maps-ლინკი/ფეხით-დრო) აქ საერთოდ არ
 * გამოიყენება. ბარათზე მხოლოდ სახელი + 2-სტრიქონიანი აღწერაა (bare, ellipsis-ით
 * მოკვეცილი) — დაწკაპუნებაზე `open`-ს ასხივებს, მშობელი კი menu-item-sheet-ის
 * მსგავს bottom sheet-ს (app-amenity-detail-sheet) ხსნის სრული დეტალებით.
 */
@Component({
  selector: 'app-amenity-card',
  standalone: true,
  imports: [LocalizePipe],
  templateUrl: './amenity-card.component.html',
  styleUrl: './amenity-card.component.scss'
})
export class AmenityCardComponent {
  readonly amenity = input<FeaturedAmenity | null>(null);
  // "peek-scroll" ტრიუკი — იხ. PlaceCardComponent-ის იგივე ველის კომენტარი.
  readonly first = input(false);
  readonly skeleton = input(false);
  readonly open = output<FeaturedAmenity>();

  protected onOpen(): void {
    const amenity = this.amenity();
    if (amenity) this.open.emit(amenity);
  }
}
