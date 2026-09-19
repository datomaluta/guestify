import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';

@Component({
  selector: 'app-content-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './content-shell.component.html',
  styleUrl: './content-shell.component.scss'
})
export class ContentShellComponent {
  protected readonly hotelContext = inject(AdminHotelContextService);

  protected readonly tabs = [
    { path: 'services', label: 'სერვისები' },
    { path: 'amenities', label: 'გამორჩეული სერვისი' },
    { path: 'menu', label: 'მენიუ' },
    { path: 'guide', label: 'გზამკვლევი' },
    { path: 'rules', label: 'წესები' },
    { path: 'essentials', label: 'Essentials' },
    { path: 'ai-topics', label: 'AI თემები' }
  ];
}
