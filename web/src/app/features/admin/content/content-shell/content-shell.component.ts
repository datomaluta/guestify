import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './content-shell.component.html',
  styleUrl: './content-shell.component.scss'
})
export class ContentShellComponent {
  protected readonly tabs = [
    { path: 'services', label: 'სერვისები' },
    { path: 'menu', label: 'მენიუ' },
    { path: 'guide', label: 'გზამკვლევი' },
    { path: 'rules', label: 'წესები' },
    { path: 'contacts', label: 'კონტაქტები' }
  ];
}
