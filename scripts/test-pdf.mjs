import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PDFDocument, degrees } from 'pdf-lib';
import { loadSource } from './load-source.mjs';
const { readPdf, parsePageSelection, mergePdfs, splitPdf, organizePdf } = loadSource('src/utils/pdfOperations.ts');

async function sample(name, widths, rotate = false) {
  const doc = await PDFDocument.create();
  widths.forEach((width, index) => {
    const page = doc.addPage([width, 800]);
    if (rotate && index === 0) page.setRotation(degrees(90));
  });
  return readPdf(new File([new Uint8Array(await doc.save())], name, { type: 'application/pdf' }));
}
const first = await sample('first.pdf', [500, 510], true);
const second = await sample('second.pdf', [520]);
const merged = await PDFDocument.load(await mergePdfs([first, second]));
assert.deepEqual(merged.getPages().map(page => page.getWidth()), [500, 510, 520]);
assert.equal(merged.getPage(0).getRotation().angle, 90);
const selected = parsePageSelection('1-2, 3', 3);
assert.deepEqual(selected, [0, 1, 2]);
for (const value of ['0', '4', '2-1', '1,1', '1-4', '3,1', '']) assert.throws(() => parsePageSelection(value, 3));
const split = await PDFDocument.load(await splitPdf(first, [1, 0]));
assert.deepEqual(split.getPages().map(page => page.getWidth()), [510, 500]);
const organized = await PDFDocument.load(await organizePdf(first, [{ source: 1, rotation: 90 }, { source: 0, rotation: 90 }, { source: null, rotation: 0 }]));
assert.deepEqual(organized.getPages().map(page => page.getWidth()), [510, 500, 595.28]);
assert.deepEqual(organized.getPages().map(page => page.getRotation().angle), [90, 180, 0]);
await assert.rejects(() => mergePdfs([first]));
await assert.rejects(() => organizePdf(first, []));
const guideMerged = await PDFDocument.load(fs.readFileSync('public/guide-samples/pdf-merge-result.pdf'));
assert.deepEqual(guideMerged.getPages().map(page => page.getWidth()), [500, 510, 520]);
assert.equal(guideMerged.getPage(0).getRotation().angle, 90);
const guideOrganized = await PDFDocument.load(fs.readFileSync('public/guide-samples/pdf-page-organized.pdf'));
assert.deepEqual(guideOrganized.getPages().map(page => page.getWidth()), [510, 500, 595.28]);
assert.deepEqual(guideOrganized.getPages().map(page => page.getRotation().angle), [90, 180, 0]);
console.log('PASS: PDF merge, split, page range validation, reorder, rotation, blank-page output and downloadable guide samples.');
