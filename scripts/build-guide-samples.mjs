import fs from 'node:fs';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import { loadSource } from './load-source.mjs';
const { readPdf, mergePdfs, organizePdf } = loadSource('src/utils/pdfOperations.ts');
const out = 'public/guide-samples';
fs.mkdirSync(out, { recursive: true });

async function make(name, pages) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (const item of pages) {
    const page = doc.addPage([item.width, 800]);
    if (item.rotation) page.setRotation(degrees(item.rotation));
    page.drawText(item.label, { x: 42, y: 720, size: 22, font, color: rgb(.18, .2, .35) });
    page.drawText(`${item.width} x 800 pt / rotation ${item.rotation || 0} deg`, { x: 42, y: 685, size: 12, font });
  }
  const bytes = new Uint8Array(await doc.save());
  fs.writeFileSync(`${out}/${name}`, bytes);
  return readPdf(new File([bytes], name, { type: 'application/pdf' }));
}

const first = await make('pdf-merge-input-a.pdf', [{ width: 500, rotation: 90, label: 'Input A / Page 1' }, { width: 510, label: 'Input A / Page 2' }]);
const second = await make('pdf-merge-input-b.pdf', [{ width: 520, label: 'Input B / Page 1' }]);
fs.writeFileSync(`${out}/pdf-merge-result.pdf`, new Uint8Array(await mergePdfs([first, second])));
fs.copyFileSync(`${out}/pdf-merge-input-a.pdf`, `${out}/pdf-page-source.pdf`);
fs.writeFileSync(`${out}/pdf-page-organized.pdf`, new Uint8Array(await organizePdf(first, [{ source: 1, rotation: 90 }, { source: 0, rotation: 90 }, { source: null, rotation: 0 }])));
console.log('Guide PDF samples generated.');
