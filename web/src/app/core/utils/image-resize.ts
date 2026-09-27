/**
 * ატვირთვამდე ფოტოს რესაიზი/კომპრესია — Storage-ში მსუბუქი ფაილები ხვდება (WebP).
 * დიდ შემცირებას ეტაპობრივად ვაკეთებთ (ყოველ ნაბიჯზე ≤2x), რადგან ერთბაშად
 * დაპატარავებისას canvas დეტალებს "ჭამს" და ფოტო რბილი გამოდის.
 */
export function resizeImage(file: File, maxDimension = 480, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      let source: CanvasImageSource = img;
      let sourceWidth = img.width;
      let sourceHeight = img.height;

      // შუალედური ნაბიჯები — ყოველ ჯერზე ნახევრამდე, სანამ სამიზნის 2x-ზე მეტია
      while (sourceWidth / 2 > width) {
        const step = createCanvas(Math.round(sourceWidth / 2), Math.round(sourceHeight / 2));
        if (!step) {
          reject(new Error('Canvas context is not available'));
          return;
        }
        step.ctx.drawImage(source, 0, 0, step.canvas.width, step.canvas.height);
        source = step.canvas;
        sourceWidth = step.canvas.width;
        sourceHeight = step.canvas.height;
      }

      const target = createCanvas(width, height);
      if (!target) {
        reject(new Error('Canvas context is not available'));
        return;
      }

      target.ctx.drawImage(source, 0, 0, width, height);
      target.canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Image compression failed'))),
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not load image'));
    };

    img.src = url;
  });
}

function createCanvas(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { canvas, ctx };
}
