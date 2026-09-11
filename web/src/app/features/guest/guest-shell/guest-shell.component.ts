import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { LangDropdownComponent } from '../../../shared/lang-dropdown/lang-dropdown.component';

@Component({
  selector: 'app-guest-shell',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, BottomNavComponent, LangDropdownComponent],
  templateUrl: './guest-shell.component.html',
  styleUrl: './guest-shell.component.scss'
})
export class GuestShellComponent {
  protected readonly hotelContext = inject(HotelContextService);
}
