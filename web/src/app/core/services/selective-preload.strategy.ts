import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * მხოლოდ `data: { preload: true }` მონიშნულ route-ებს (services/menu/guide/rules)
 * წინასწარტვირთავს Home-ის გახსნისთანავე, ფონურ რეჟიმში — admin-ის chunk-ები
 * (login, hotels, editors) ხელუხლებელი რჩება, on-demand, რადგან სტუმარი მათთან
 * ალბათ ვერასდროს მივა და ტყუილად არ გვინდა მისი (ხშირად მობილური) მონაცემის ხარჯვა.
 */
@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.['preload'] ? load() : of(null);
  }
}
