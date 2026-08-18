import { Component, ElementRef, effect, input, viewChild } from '@angular/core';
import QRCode from 'qrcode';

/**
 * სასტუმროს public URL-იდან QR კოდს ხატავს canvas-ზე (მთლიანად client-side, გარეშე სერვისების გარეშე)
 * და აძლევს PNG-ად ჩამოტვირთვის ღილაკს — ბეჭდვისთვის (ოთახის კარზე/მაგიდაზე დასადებად).
 */
@Component({
  selector: 'app-qr-code',
  standalone: true,
  template: `
    <div class="qr-wrap">
      <canvas #canvas></canvas>
    </div>
    <button type="button" class="qr-download" (click)="download()">{{ downloadLabel() }}</button>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    /* wrap-ს კონკრეტული ზომა აღარ ვუდგენთ (%-იანი canvas-scaling ცოტა არასანდო აღმოჩნდა) —
       ის უბრალოდ ჰგუგება canvas-ის ბუნებრივ ზომას (inline-flex + padding), canvas კი
       ზუსტად იმ პიქსელებში იხატება, რასაც size() input ითხოვს — ასე ორივე ყოველთვის ემთხვევა. */
    .qr-wrap {
      display: inline-flex;
      padding: 18px;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: var(--shadow-sm);
    }

    canvas {
      display: block;
    }

    .qr-download {
      font-size: 12.5px;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: var(--paper-raised);
      color: var(--ink);
      cursor: pointer;
      transition: border-color 0.15s ease, color 0.15s ease, transform 0.1s ease;

      &:hover {
        border-color: var(--brand-primary);
        color: var(--brand-primary);
      }

      &:active {
        transform: scale(0.96);
      }
    }
  `
})
export class QrCodeComponent {
  readonly value = input.required<string>();
  readonly size = input<number>(220);
  readonly fileName = input<string>('guestify-qr.png');
  readonly downloadLabel = input<string>('ჩამოტვირთვა (PNG)');

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    effect(() => {
      const value = this.value();
      const size = this.size();
      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas || !value) return;

      QRCode.toCanvas(canvas, value, {
        width: size,
        margin: 2,
        color: { dark: '#1a1a1a', light: '#ffffff' }
      }).catch(() => {
        // უსახური QR ვერ დაიხატა (მაგ. ცარიელი/არასწორი value) — ჩუმად ვტოვებთ, საკონტროლო UI-ს ცალკე ექნება ღილაკის დაფარვა საჭიროების შემთხვევაში
      });
    });
  }

  download(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = this.fileName();
    a.click();
  }
}
