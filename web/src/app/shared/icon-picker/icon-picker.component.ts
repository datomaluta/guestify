import { Component, input, model } from '@angular/core';
import { IconComponent, IconName } from '../icon/icon.component';
import { ICON_LABELS } from '../icon/icon-options';

/** ვიზუალური grid picker curated icon-ების ნაკრებიდან — reusable services/rules/... editor-ებისთვის. */
@Component({
  selector: 'app-icon-picker',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss'
})
export class IconPickerComponent {
  readonly icons = input.required<IconName[]>();
  readonly icon = model.required<IconName>();

  labelFor(i: IconName): string {
    return ICON_LABELS[i] ?? i;
  }
}
