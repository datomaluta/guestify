import { Component, input } from '@angular/core';
import { GuidePlace, guideCategoryMeta } from '../../core/models';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../core/i18n/localize.pipe';
import { ImgFadeInDirective } from '../directives/img-fade-in.directive';

/**
 * ერთი ადგილობრივი რჩევის ბარათი (ფოტო/badge-ები/სახელი/აღწერა/Maps-ლინკი) —
 * Home-ის "Local Favorites" და Discover-ის კატეგორიების სექციები ორივე ამას იყენებს,
 * რომ ვიზუალი ერთ ადგილას იმართებოდეს და ორივეგან ერთდროულად არ დასცილდეს ერთმანეთს.
 */
@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [IconComponent, TranslatePipe, LocalizePipe, ImgFadeInDirective],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.scss'
})
export class PlaceCardComponent {
  readonly place = input<GuidePlace | null>(null);
  readonly showCategory = input(false);
  // "peek-scroll" ტრიუკისთვის — მშობელი .fav-scroll-ის პირველ ბარათს დამატებითი
  // მარცხენა margin სჭირდება (:first-child ვეღარ გამოვიყენებთ, რადგან ეს ბარათი
  // ახლა ცალკე კომპონენტის host-შია გახვეული, არა პირდაპირ .fav-scroll-ის შვილი).
  readonly first = input(false);
  readonly skeleton = input(false);

  protected readonly guideCategoryMeta = guideCategoryMeta;
}
