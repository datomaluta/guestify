import { Component, model } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ICON_SUGGESTIONS, DEFAULT_ICON } from '../icon/icon-options';

/**
 * Material Symbols-ის თავისუფალი ტექსტური picker — ნებისმიერი აიქონის სახელი fonts.google.com/icons-იდან
 * შეიძლება ჩაიწეროს პირდაპირ, აღარაა შეზღუდული curated ნაკრებზე. ქვემოთ რამდენიმე ხშირად საჭირო
 * შემოთავაზება დევს სწრაფი დაწკაპუნებისთვის.
 */
@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent {
  readonly icon = model.required<string>();

  protected readonly suggestions = ICON_SUGGESTIONS;
  protected readonly defaultIcon = DEFAULT_ICON;

  onInput(value: string): void {
    this.icon.set(value.trim());
  }
}
