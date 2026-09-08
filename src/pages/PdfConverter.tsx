import { track } from '../utils/analytics';
import { AdSlot } from '../components/AdSlot';
import { pdfGuide } from '../i18n/pdfGuide';
import { usePdfSeo } from '../utils/usePdfSeo';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, FileText, ImagePlus } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Header } from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';
import { pdfText } from '../i18n/pdfTranslations';
import { createImagePdf, prepareImage, saveBlob, type PdfImage } from '../utils/pdfTools';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import './PdfConverter.css';

export default function PdfConverterPage() {
  const { language, t } = useLanguage(); const text = pdfText(language); const navigate = useNavigate();
  const guide = pdfGuide[language];
  usePdfSeo(language);
  const [mode, setMode] = useState<'images' | 'pdf'>('images');
  const [images, setImages] = useState<PdfImage[]>([]); const imagesRef = useRef<PdfImage[]>([]);
  const [paper, setPaper] = useState('a4'); const [landscape, setLandscape] = useState(false); const [margin, setMargin] = useState(10);
  const [busy, setBusy] = useState(false); const operation = useRef(false); const alive = useRef(true);
  const [error, setError] = useState<keyof ReturnType<typeof pdfText> | ''>('');
  const [result, setResult] = useState<Blob | null>(null); const [resultUrl, setResultUrl] = useState('');
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null); const pdfRef = useRef<ReturnType<typeof import('pdfjs-dist')['getDocument']> | null>(null);
  const [pdfName, setPdfName] = useState('document'); const [page, setPage] = useState(1); const [dpi, setDpi] = useState(144);
  const [rendering, setRendering] = useState(false); const [png, setPng] = useState<Blob | null>(null);
  const [pngUrl, setPngUrl] = useState(''); const [outputSize, setOutputSize] = useState('');
  const imageInput = useRef<HTMLInputElement>(null); const pdfInput = useRef<HTMLInputElement>(null);

  useEffect(() => { alive.current = true; return () => { alive.current = false; imagesRef.current.forEach(i => URL.revokeObjectURL(i.url)); void pdfRef.current?.destroy(); }; }, []);
  useEffect(() => { setResult(null); }, [images, paper, landscape, margin]);
  useEffect(() => { if (!result) { setResultUrl(''); return; } const url = URL.createObjectURL(result); setResultUrl(url); return () => URL.revokeObjectURL(url); }, [result]);
  useEffect(() => { if (!png) { setPngUrl(''); return; } const url = URL.createObjectURL(png); setPngUrl(url); return () => URL.revokeObjectURL(url); }, [png]);


  function updateImages(next: PdfImage[]) { imagesRef.current = next; setImages(next); }
  async function addImages(files: File[]) {
    if (operation.current || !files.length) return;
    setError('');
    if (imagesRef.current.length + files.length > 20 || imagesRef.current.reduce((sum, i) => sum + i.size, 0) + files.reduce((sum, f) => sum + f.size, 0) > 100 * 1024 * 1024) { setError('batchError'); return; }
    track('tool_action',{action:'pdf_convert_start'}); operation.current = true; setBusy(true); const added: PdfImage[] = [];
    try {
      for (const file of files) { added.push(await prepareImage(file)); if (!alive.current) break; }
      if (alive.current) updateImages([...imagesRef.current, ...added]); else added.forEach(i => URL.revokeObjectURL(i.url));
    } catch { added.forEach(i => URL.revokeObjectURL(i.url)); if (alive.current) setError('imageError'); }
    finally { operation.current = false; if (alive.current) setBusy(false); }
  }
  function removeImage(id: string) { const image = images.find(i => i.id === id); if (image) URL.revokeObjectURL(image.url); updateImages(images.filter(i => i.id !== id)); }
  function reorder(index: number, step: number) { const next = [...images]; [next[index], next[index + step]] = [next[index + step], next[index]]; updateImages(next); }
  async function makePdf() {
    if (!images.length || operation.current) return;
    operation.current = true; setBusy(true); setError(''); setResult(null);
    try { const bytes = await createImagePdf(images, paper, landscape, margin); if (alive.current) setResult(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })); }
    catch { if (alive.current) setError('createError'); }
    finally { operation.current = false; if (alive.current) setBusy(false); }
  }
  async function loadPdf(file: File) {
    if (operation.current) return;
    operation.current = true; setBusy(true); setError(''); setPng(null); setPdf(null); setRendering(false); setOutputSize('');
    let task: ReturnType<typeof import('pdfjs-dist')['getDocument']> | undefined;
    try {
      await pdfRef.current?.destroy(); pdfRef.current = null;
      if (file.size > 50 * 1024 * 1024 || !file.name.toLowerCase().endsWith('.pdf')) throw new Error();
      const pdfjs = await import('pdfjs-dist');
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()), cMapUrl: '/pdf-assets/cmaps/', cMapPacked: true, standardFontDataUrl: '/pdf-assets/standard_fonts/', wasmUrl: '/pdf-assets/wasm/' });
      const doc = await task.promise;
      if (!alive.current || doc.numPages > 300) { await task.destroy(); if (alive.current) setError('pdfError'); return; }
      pdfRef.current = task; setPdf(doc); setPdfName(file.name.replace(/\.pdf$/i, '')); setPage(1);
    } catch { await task?.destroy(); if (alive.current) setError('pdfError'); }
    finally { operation.current = false; if (alive.current) setBusy(false); }
  }
  useEffect(() => {
    if (!pdf || mode !== 'pdf') return;
    let cancelled = false; let render: RenderTask | undefined;
    setRendering(true); setPng(null); setError(''); setOutputSize('');
    void (async () => {
      try {
        const pdfPage = await pdf.getPage(page); if (cancelled) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const scale = Math.min(dpi / 72, Math.sqrt(6000000 / (base.width * base.height)), 8192 / Math.max(base.width, base.height));
        const viewport = pdfPage.getViewport({ scale }); const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.floor(viewport.width)); canvas.height = Math.max(1, Math.floor(viewport.height));
        render = pdfPage.render({ canvas, viewport, background: '#ffffff' }); await render.promise;
        if (cancelled) return;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error()), 'image/png'));
        if (!cancelled) { setPng(blob); setOutputSize(`${canvas.width} × ${canvas.height}px`); }
      } catch { if (!cancelled) setError('renderError'); }
      finally { if (!cancelled) setRendering(false); }
    })();
    return () => { cancelled = true; render?.cancel(); };
  }, [pdf, page, dpi, mode]);

  function sampleImages() {
    const c = document.createElement('canvas'); c.width = 960; c.height = 640; const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#eef2ff'; ctx.fillRect(0, 0, 960, 640); ctx.fillStyle = '#6366f1'; ctx.fillRect(60, 60, 840, 520);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 64px sans-serif'; ctx.fillText('QK Tool Hub', 130, 250); ctx.font = '32px sans-serif'; ctx.fillText('Images to PDF', 130, 330);
    c.toBlob(blob => { if (blob && alive.current) void addImages([new File([blob], 'sample.png', { type: 'image/png' })]); });
  }
  async function samplePdf() {
    if (operation.current) return;
    const doc = await PDFDocument.create();
    for (let i = 1; i <= 3; i++) { const p = doc.addPage([595.28, 841.89]); p.drawText(`QK Tool Hub - Page ${i}`, { x: 50, y: 730, size: 26, color: rgb(.39, .4, .94) }); p.drawRectangle({ x: 50, y: 360, width: 160 * i, height: 220, color: rgb(.2 * i, .5, .8) }); }
    if (alive.current) await loadPdf(new File([new Uint8Array(await doc.save())], 'sample.pdf', { type: 'application/pdf' }));
  }

  return <div className="app-container pdf-page"><Header />
    <button className="btn-tool" onClick={() => navigate('/')} style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid rgba(99,102,241,.3)' }}><ArrowLeft size={16} />{t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}</button>
    <main><div className="pdf-intro"><span className="badge">PDF STUDIO</span><h1>{text.title}</h1><p>{text.subtitle}</p><small>{text.privacy}</small></div>
      <AdSlot slotId="pdf-converter-top-banner" />
      <div className="pdf-tabs" role="group" aria-label={text.title}>{(['images', 'pdf'] as const).map(value => <button key={value} disabled={busy} aria-pressed={mode === value} onClick={() => { setMode(value); setError(''); }}>{value === 'images' ? <ImagePlus size={18} /> : <FileText size={18} />}{text[value]}</button>)}</div>
      {error && <p className="pdf-error" role="alert">{text[error]}</p>}
      <p className="pdf-status" role="status">{busy || rendering && mode === 'pdf' ? text.busy : ''}</p>
      {mode === 'images' ? <div className="pdf-layout"><section className="glass-card pdf-panel">
        <h2>{text.add}</h2><div className="pdf-drop" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); void addImages(Array.from(e.dataTransfer.files)); }}><ImagePlus size={32} /><p>{text.drag}</p><button className="pdf-button" disabled={busy} onClick={() => imageInput.current?.click()}>{text.add}</button><small>{text.limits}</small></div>
        <input hidden ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { void addImages(Array.from(e.target.files || [])); e.target.value = ''; }} />
        <button className="pdf-link" disabled={busy} onClick={sampleImages}>{text.sample}</button>
        <h2>{text.settings}</h2><label>{text.paper}<select disabled={busy} value={paper} onChange={e => setPaper(e.target.value)}><option value="a4">A4</option><option value="original">{text.original}</option></select></label>
        <label>{text.orientation}<select disabled={busy || paper === 'original'} value={landscape ? 'landscape' : 'portrait'} onChange={e => setLandscape(e.target.value === 'landscape')}><option value="portrait">{text.portrait}</option><option value="landscape">{text.landscape}</option></select></label>
        <label>{text.margin}<select disabled={busy} value={margin} onChange={e => setMargin(Number(e.target.value))}>{[0, 10, 20].map(n => <option key={n} value={n}>{n} mm</option>)}</select></label>
        <button className="pdf-button pdf-wide" disabled={busy || !images.length} onClick={() => void makePdf()}>{text.create}</button>
        {result && <div className="pdf-result"><button className="pdf-button pdf-wide" onClick={() => {saveBlob(result, 'qktoolhub-images.pdf');track('tool_download',{action:'pdf_export'});}}>{text.downloadPdf}</button>{resultUrl && <a href={resultUrl} target="_blank" rel="noreferrer">{text.view} ↗</a>}</div>}
      </section><section className="glass-card pdf-panel"><div className="pdf-heading"><h2>{images.length} / 20 {text.count}</h2><button className="pdf-link" disabled={busy || !images.length} onClick={() => { images.forEach(i => URL.revokeObjectURL(i.url)); updateImages([]); }}>{text.clear}</button></div>
        {!images.length ? <div className="pdf-empty"><FileText size={64} /><p>{text.empty}</p></div> : <ol className="pdf-image-list">{images.map((item, index) => <li key={item.id}><img src={item.url} alt={item.name} /><div><strong>{index + 1}. {item.name}</strong><small>{item.width} × {item.height}px</small></div><div className="pdf-actions"><button aria-label={`${text.up}: ${item.name}`} disabled={busy || !index} onClick={() => reorder(index, -1)}><ArrowUp size={16} /></button><button aria-label={`${text.down}: ${item.name}`} disabled={busy || index === images.length - 1} onClick={() => reorder(index, 1)}><ArrowDown size={16} /></button><button aria-label={`${text.remove}: ${item.name}`} disabled={busy} onClick={() => removeImage(item.id)}><Trash2 size={16} /></button></div></li>)}</ol>}
      </section></div> : <div className="pdf-layout"><section className="glass-card pdf-panel"><h2>{text.selectPdf}</h2><div className="pdf-drop" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) void loadPdf(e.dataTransfer.files[0]); }}><FileText size={32} /><p>{text.drag}</p><button className="pdf-button" disabled={busy} onClick={() => pdfInput.current?.click()}>{text.selectPdf}</button><small>{text.pdfLimit}</small></div>
        <input hidden ref={pdfInput} type="file" accept="application/pdf,.pdf" onChange={e => { if (e.target.files?.[0]) void loadPdf(e.target.files[0]); e.target.value = ''; }} />
        <button className="pdf-link" disabled={busy} onClick={() => void samplePdf()}>{text.sample}</button>
        {pdf && <><p className="pdf-filename">{pdfName}.pdf</p><label>{text.page}<select disabled={busy} value={page} onChange={e => setPage(Number(e.target.value))}>{Array.from({ length: pdf.numPages }, (_, i) => <option key={i} value={i + 1}>{i + 1} / {pdf.numPages}</option>)}</select></label><label>{text.quality}<select disabled={busy} value={dpi} onChange={e => setDpi(Number(e.target.value))}>{[72, 144, 216].map(n => <option key={n} value={n}>{n} DPI</option>)}</select></label><button className="pdf-button pdf-wide" disabled={busy || rendering || !png} onClick={() => png && saveBlob(png, `${pdfName}-page-${page}.png`)}>{text.downloadPng}</button></>}
      </section><section className="glass-card pdf-panel"><div className="pdf-heading"><h2>{text.preview}</h2><small>{outputSize}</small></div>{pngUrl && !busy && !rendering ? <img className="pdf-page-preview" src={pngUrl} alt={`${text.page} ${page}`} /> : <div className="pdf-empty"><FileText size={64} /><p>{busy || rendering ? text.busy : text.choose}</p></div>}</section></div>}
      <p className="pdf-note">{text.note}</p>
      <AdSlot slotId="pdf-converter-bottom-banner" />
      <section className="glass-card pdf-guide" aria-labelledby="pdf-guide-heading">
        <h2 id="pdf-guide-heading">{guide.heading}</h2>
        <div className="pdf-guide-columns">{[{ title: guide.imageHeading, steps: guide.imageSteps }, { title: guide.pdfHeading, steps: guide.pdfSteps }].map(section => <section key={section.title}><h3>{section.title}</h3><ol>{section.steps.map(step => <li key={step}>{step}</li>)}</ol></section>)}</div>
        <h2>{guide.faqHeading}</h2><div className="pdf-faq">{guide.faqs.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </section>
    </main></div>;
}
