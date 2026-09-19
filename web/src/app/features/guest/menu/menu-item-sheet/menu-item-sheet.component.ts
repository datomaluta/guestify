import { Component, DestroyRef, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { ALLERGENS, MenuItem } from '../../../../core/models';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../../core/i18n/localize.pipe';
import { ImgFadeInDirective } from '../../../../shared/directives/img-fade-in.directive';

/**
 * მენიუს კერძის დეტალების bottom sheet — ფოტო, სრული აღწერა, შემადგენლობა
 * და ალერგენები. აპში პირველი overlay-ია, ამიტომ hand-rolled-ია (CDK/Material
 * არ არსებობს პროექტში ერთი გამოყენებისთვის) — position: fixed, ცენტრირებული
 * .app-shell-ის იმავე 430px ჩარჩოში (იხ. menu-item-sheet.component.scss).
 *
 * დახურვა ანიმირებულია: close()-ის დაჭერისას კომპონენტი მშობელს არ ეუბნება
 * მაშინვე წაშლას (Angular @if მყისვე ამოაგდებდა DOM-იდან, ანიმაციის დროც არ eqნებოდა) —
 * closing სიგნალს რთავს, CSS-ის საპირისპირო ანიმაცია გაეშვება, და მხოლოდ მისი
 * დასრულების (animationend) შემდეგ ემიტდება `close`, რომ მშობელმა რეალურად ამოშალოს.
 */
@Component({
  selector: 'app-menu-item-sheet',
  standalone: true,
  imports: [TranslatePipe, LocalizePipe, ImgFadeInDirective],
  templateUrl: './menu-item-sheet.component.html',
  styleUrl: './menu-item-sheet.component.scss'
})
export class MenuItemSheetComponent {
  readonly item = input.required<MenuItem>();
  readonly close = output<void>();

  protected readonly allergenIcons = new Map(ALLERGENS.map((a) => [a.key, a.icon]));
  protected readonly closing = signal(false);

  /** sheet-ის ღიაობისას .app-body-ს (ნამდვილი scroll-container, იხ. scss-ის კომენტარი) ვბლოკავთ, რომ ფონზე არ ისქროლოს. */
  constructor() {
    const appBody = inject(ElementRef).nativeElement.closest('.app-body') as HTMLElement | null;
    const previousOverflow = appBody?.style.overflow ?? '';
    if (appBody) {
      appBody.style.overflow = 'hidden';
    }
    inject(DestroyRef).onDestroy(() => {
      if (appBody) {
        appBody.style.overflow = previousOverflow;
      }
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.requestClose();
  }

  protected requestClose(): void {
    this.closing.set(true);
  }

  /** სვამდება ორივე ანიმაციის (გახსნის slide-up-ის და დახურვის slide-down-ის) დასრულებისას — რეალურად მხოლოდ დახურვისას ვასრულებთ. */
  protected onSheetAnimationEnd(): void {
    if (this.closing()) {
      this.close.emit();
    }
  }
}
