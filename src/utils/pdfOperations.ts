import { degrees, PDFDocument } from 'pdf-lib';

export type PdfInput = { name: string; bytes: Uint8Array; pages: number };
export type PagePlan = { source: number | null; rotation: number; width?: number; height?: number };
export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024;
export const MAX_PAGES = 300;
export const MAX_FILES = 10;

export async function readPdf(file: File): Promise<PdfInput> {
  if (file.size > MAX_FILE_BYTES || !/\.pdf$/i.test(file.name)) throw new Error('limit');
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!new TextDecoder('ascii').decode(bytes.subarray(0, 1024)).includes('%PDF-')) throw new Error('invalid');
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  const pages = doc.getPageCount();
  if (!pages || pages > MAX_PAGES) throw new Error('limit');
  return { name: file.name, bytes, pages };
}

export function parsePageSelection(value: string, count: number): number[] {
  const result: number[] = [];
  const seen = new Set<number>();
  for (const part of value.split(',')) {
    const match = /^\s*(\d+)\s*(?:-\s*(\d+)\s*)?$/.exec(part);
    if (!match) throw new Error('range');
    const start = Number(match[1]), end = match[2] ? Number(match[2]) : start;
    if (start < 1 || end > count || start > end) throw new Error('range');
    for (let page = start; page <= end; page++) {
      if (seen.has(page)) throw new Error('duplicate');
      seen.add(page); result.push(page - 1);
    }
  }
  if (!result.length) throw new Error('range');
  if (result.some((page, index) => index > 0 && page < result[index - 1])) throw new Error('range');
  return result;
}

export async function mergePdfs(inputs: PdfInput[]): Promise<Uint8Array> {
  if (inputs.length < 2 || inputs.length > MAX_FILES || inputs.reduce((n, f) => n + f.bytes.byteLength, 0) > MAX_TOTAL_BYTES || inputs.reduce((n, f) => n + f.pages, 0) > MAX_PAGES) throw new Error('limit');
  const output = await PDFDocument.create();
  for (const input of inputs) {
    const source = await PDFDocument.load(input.bytes, { updateMetadata: false });
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach(page => output.addPage(page));
  }
  output.setCreator('QK Tool Hub');
  return output.save();
}

export async function splitPdf(input: PdfInput, indices: number[]): Promise<Uint8Array> {
  if (!indices.length || indices.some(index => index < 0 || index >= input.pages)) throw new Error('range');
  const source = await PDFDocument.load(input.bytes, { updateMetadata: false });
  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, indices);
  pages.forEach(page => output.addPage(page));
  output.setCreator('QK Tool Hub');
  return output.save();
}

export async function organizePdf(input: PdfInput, plan: PagePlan[]): Promise<Uint8Array> {
  if (!plan.length || plan.length > MAX_PAGES || plan.some(item => item.source !== null && (item.source < 0 || item.source >= input.pages))) throw new Error('range');
  const source = await PDFDocument.load(input.bytes, { updateMetadata: false });
  const output = await PDFDocument.create();
  for (const item of plan) {
    if (item.source === null) { output.addPage([item.width || 595.28, item.height || 841.89]); continue; }
    const [page] = await output.copyPages(source, [item.source]);
    page.setRotation(degrees(((page.getRotation().angle + item.rotation) % 360 + 360) % 360));
    output.addPage(page);
  }
  output.setCreator('QK Tool Hub');
  return output.save();
}
