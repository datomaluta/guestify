import { Component, input, output } from '@angular/core';
import { FeaturedAmenity } from '../../core/models';
import { LocalizePipe } from '../../core/i18n/localize.pipe';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ImgFadeInDirective } from '../directives/img-fade-in.directive';

/**
 * "გამორჩეული სერვისი" ბარათი Essentials-ზე — PlaceCardComponent-ის ფორკია
 * (არა გენერალიზაცია), რადგან footer-ი (Maps-ლინკი/ფეხით-დრო) აქ საერთოდ არ
 * გამოიყენება. ბარათზე მხოლოდ სახელი + 2-სტრიქონიანი აღწერაა (bare, ellipsis-ით
 * მოკვეცილი) და "დეტალურად ნახვა" ღილაკი ბოლოში მარჯვნივ — დაწკაპუნებაზე `open`-ს
 * ასხივებს, მშობელი კი menu-item-sheet-ის მსგავს bottom sheet-ს
 * (app-amenity-detail-sheet) ხსნის სრული დეტალებით.
 */
@Component({
  selector: 'app-amenity-card',
  standalone: true,
  imports: [LocalizePipe, TranslatePipe, ImgFadeInDirective],
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
