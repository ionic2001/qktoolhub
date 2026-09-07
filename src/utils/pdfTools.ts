import { PDFDocument } from 'pdf-lib';

export interface PdfImage { id: string; name: string; url: string; bytes: Uint8Array; width: number; height: number; size: number }
export function pageLayout(width: number, height: number, paper: string, landscape: boolean, marginMm: number) {
  const margin = marginMm * 72 / 25.4;
  const pageWidth = paper === 'original' ? width * 72 / 96 + margin * 2 : landscape ? 841.89 : 595.28;
  const pageHeight = paper === 'original' ? height * 72 / 96 + margin * 2 : landscape ? 595.28 : 841.89;
  const scale = Math.min((pageWidth - margin * 2) / width, (pageHeight - margin * 2) / height);
  return { pageWidth, pageHeight, width: width * scale, height: height * scale, x: (pageWidth - width * scale) / 2, y: (pageHeight - height * scale) / 2 };
}
export async function createImagePdf(images: PdfImage[], paper: string, landscape: boolean, margin: number) {
  const pdf = await PDFDocument.create();
  pdf.setCreator('QK Tool Hub'); pdf.setTitle('Images to PDF');
  for (const item of images) {
    const embedded = await pdf.embedJpg(item.bytes);
    const box = pageLayout(item.width, item.height, paper, landscape, margin);
    const page = pdf.addPage([box.pageWidth, box.pageHeight]);
    page.drawImage(embedded, { x: box.x, y: box.y, width: box.width, height: box.height });
  }
  return pdf.save();
}
export async function prepareImage(file: File): Promise<PdfImage> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 20 * 1024 * 1024) throw new Error('imageError');
  const url = URL.createObjectURL(file);
  try {
    const img = new Image(); img.src = url; await img.decode();
    if (img.naturalWidth * img.naturalHeight > 40000000) throw new Error('imageError');
    const scale = Math.min(1, 2400 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('imageError')), 'image/jpeg', .92));
    return { id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(blob), bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height, size: file.size };
  } finally { URL.revokeObjectURL(url); }
}
export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
