import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUp, FileText, RotateCw, Trash2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useLanguage } from '../i18n/LanguageContext';
import { pdfLabel, pdfPaths, pdfWork, type PdfPath } from '../i18n/pdfWork';
import { localUrl } from '../seo/catalog';
import { mergePdfs, organizePdf, parsePageSelection, readPdf, splitPdf, MAX_FILES, MAX_PAGES, MAX_TOTAL_BYTES, type PagePlan, type PdfInput } from '../utils/pdfOperations';
import { saveBlob } from '../utils/pdfTools';
import './PdfConverter.css';

function friendlyName(name: string) { return name.trim().replace(/[\\/:*?"<>|\x00-\x1f]/g, '-').replace(/\.pdf$/i, '').slice(0, 100) || 'qktoolhub'; }

export default function PdfWorkPage({ path }: { path: PdfPath }) {
  const { language, t } = useLanguage();
  const copy = pdfWork[language][path];
  const chooseLabel = pdfLabel(language, path === '/pdf-merge' ? 'chooseMany' : 'choose');
  const [files, setFiles] = useState<PdfInput[]>([]);
  const [plan, setPlan] = useState<PagePlan[]>([]);
  const [range, setRange] = useState('1');
  const [selected, setSelected] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState('qktoolhub');
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  const working = useRef(false);

  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => { setResult(null); }, [files, plan, range]);
  useEffect(() => {
    if (path !== '/pdf-organize' && path !== '/pdf-split') return;
    const file = files[0];
    const sourcePage = path === '/pdf-organize' ? plan[selected]?.source : Math.max(0, Math.min(file?.pages || 1, selected + 1) - 1);
    if (!file || sourcePage === null || sourcePage === undefined) { setPreview(''); return; }
    let cancelled = false;
    let url = '';
    let task: ReturnType<typeof import('pdfjs-dist')['getDocument']> | undefined;
    setPreview('');
    void (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        task = pdfjs.getDocument({ data: file.bytes.slice(), cMapUrl: '/pdf-assets/cmaps/', cMapPacked: true, standardFontDataUrl: '/pdf-assets/standard_fonts/', wasmUrl: '/pdf-assets/wasm/' });
        const doc = await task.promise;
        const page = await doc.getPage(sourcePage + 1);
        const raw = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: Math.min(1, 850 / Math.max(raw.width, raw.height)) });
        const canvas = document.createElement('canvas'); canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        await page.render({ canvas, viewport, background: '#ffffff' }).promise;
        if (cancelled) return;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('preview')), 'image/png'));
        url = URL.createObjectURL(blob);
        if (!cancelled) setPreview(url);
      } catch { if (!cancelled) setPreview(''); }
    })();
    return () => { cancelled = true; if (url) URL.revokeObjectURL(url); void task?.destroy(); };
  }, [files, path, plan, selected]);

  function message(reason: unknown) {
    const key = reason instanceof Error ? reason.message : '';
    return pdfLabel(language, key === 'limit' ? 'limit' : key === 'range' ? 'invalid' : key === 'duplicate' ? 'duplicate' : 'error');
  }
  async function addFiles(incoming: File[]) {
    if (!incoming.length || working.current) return;
    working.current = true; setBusy(true); setError(''); setResult(null);
    try {
      const next = path === '/pdf-merge' ? [...files] : [];
      if (next.length + incoming.length > MAX_FILES || next.reduce((n, f) => n + f.bytes.byteLength, 0) + incoming.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) throw new Error('limit');
      for (const file of (path === '/pdf-merge' ? incoming : incoming.slice(0, 1))) next.push(await readPdf(file));
      if (next.reduce((n, f) => n + f.pages, 0) > MAX_PAGES) throw new Error('limit');
      if (!alive.current) return;
      setFiles(next);
      if (path === '/pdf-organize') { setPlan(Array.from({ length: next[0].pages }, (_, source) => ({ source, rotation: 0 }))); setSelected(0); }
      if (path === '/pdf-split') { setRange('1'); setSelected(0); }
      setOutputName(friendlyName(next[0].name) + (path === '/pdf-merge' ? '-merged' : path === '/pdf-split' ? '-pages' : '-organized'));
    } catch (reason) { if (alive.current) setError(message(reason)); }
    finally { working.current = false; if (alive.current) setBusy(false); }
  }
  function moveFile(index: number, step: number) {
    const next = [...files]; [next[index], next[index + step]] = [next[index + step], next[index]]; setFiles(next);
  }
  function changePlan(next: PagePlan[]) { if (next.length) { setPlan(next); setSelected(Math.min(selected, next.length - 1)); setError(''); } else setError(pdfLabel(language, 'noPages')); }
  function movePage(index: number, step: number) {
    const next = [...plan]; [next[index], next[index + step]] = [next[index + step], next[index]]; changePlan(next); setSelected(index + step);
  }
  async function create() {
    if (working.current) return;
    working.current = true; setBusy(true); setError(''); setResult(null);
    try {
      const bytes = path === '/pdf-merge' ? await mergePdfs(files) : path === '/pdf-split' ? await splitPdf(files[0], parsePageSelection(range, files[0].pages)) : await organizePdf(files[0], plan);
      if (alive.current) setResult(new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
    } catch (reason) { if (alive.current) setError(message(reason)); }
    finally { working.current = false; if (alive.current) setBusy(false); }
  }

  return <div className="app-container pdf-page"><Header />
    <a className="btn-tool" href={localUrl(path === '/pdf-tools' ? '/' : '/pdf-tools', language)}><ArrowLeft size={16} />{t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}</a>
    <main><div className="pdf-intro"><span className="badge">PDF TOOLS</span><h1>{copy.name}</h1><p>{copy.description}</p></div>
      {path === '/pdf-tools' ? <div className="pdf-tool-grid">{pdfPaths.filter(p => p !== '/pdf-tools').map(p => <a className="glass-card pdf-tool-card" key={p} href={localUrl(p, language)}><FileText size={26} /><h2>{pdfWork[language][p].name}</h2><p>{pdfWork[language][p].description}</p></a>)}</div> : <div className="pdf-layout"><section className="glass-card pdf-panel">
        <h2>{chooseLabel}</h2><div className="pdf-drop" onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); void addFiles(Array.from(event.dataTransfer.files)); }}><FileText size={32} /><p>{copy.how}</p><button className="pdf-button" disabled={busy} onClick={() => inputRef.current?.click()}>{chooseLabel}</button><small>{copy.note}</small></div>
        <input hidden ref={inputRef} type="file" accept="application/pdf,.pdf" multiple={path === '/pdf-merge'} onChange={event => { void addFiles(Array.from(event.target.files || [])); event.target.value = ''; }} />
        {path === '/pdf-split' && files[0] && <><p>{files[0].name} · {files[0].pages} {pdfLabel(language, 'page')}</p><label htmlFor="pdf-page-range">{pdfLabel(language, 'range')}</label><input id="pdf-page-range" className="pdf-text-input" value={range} onChange={event => setRange(event.target.value)} /><p>{pdfLabel(language, 'selected')}: {range}</p></>}
        {files.length > 0 && <><label htmlFor="pdf-output-name">{pdfLabel(language, 'result')}</label><input id="pdf-output-name" className="pdf-text-input" value={outputName} maxLength={100} onChange={event => setOutputName(event.target.value)} /><button className="pdf-button pdf-wide" disabled={busy || (path === '/pdf-merge' ? files.length < 2 : path === '/pdf-organize' ? !plan.length : !range.trim())} onClick={() => void create()}>{pdfLabel(language, path === '/pdf-merge' ? 'merge' : path === '/pdf-split' ? 'split' : 'organize')}</button></>}
        {result && <div className="pdf-result"><p role="status">{pdfLabel(language, 'ready')}</p><button className="pdf-button pdf-wide" onClick={() => saveBlob(result, `${friendlyName(outputName)}.pdf`)}>{pdfLabel(language, 'download')}</button></div>}
        {error && <p className="pdf-error" role="alert">{error}</p>}<p className="pdf-status" role="status">{busy ? pdfLabel(language, 'busy') : ''}</p>
      </section><section className="glass-card pdf-panel">
        <h2>{path === '/pdf-merge' ? pdfLabel(language, 'files') : pdfLabel(language, 'page')}</h2>
        {path === '/pdf-merge' && <ol className="pdf-work-list">{files.map((file, index) => <li key={`${file.name}-${index}`}><strong>{index + 1}. {file.name}</strong><small>{file.pages} {pdfLabel(language, 'page')} · {(file.bytes.byteLength / 1024 / 1024).toFixed(1)}MB</small><div className="pdf-actions"><button aria-label={`${pdfLabel(language, 'up')} ${file.name}`} disabled={busy || index === 0} onClick={() => moveFile(index, -1)}><ArrowUp size={16} /></button><button aria-label={`${pdfLabel(language, 'down')} ${file.name}`} disabled={busy || index === files.length - 1} onClick={() => moveFile(index, 1)}><ArrowDown size={16} /></button><button aria-label={`${pdfLabel(language, 'remove')} ${file.name}`} disabled={busy} onClick={() => setFiles(files.filter((_, i) => i !== index))}><Trash2 size={16} /></button></div></li>)}</ol>}
        {path === '/pdf-organize' && files[0] && <><button className="pdf-link" disabled={busy || plan.length >= MAX_PAGES} onClick={() => changePlan([...plan, { source: null, rotation: 0 }])}>{pdfLabel(language, 'blank')}</button><button className="pdf-link" disabled={busy} onClick={() => { setPlan(Array.from({ length: files[0].pages }, (_, source) => ({ source, rotation: 0 }))); setSelected(0); }}>{pdfLabel(language, 'reset')}</button><ol className="pdf-work-list pdf-page-list">{plan.map((item, index) => <li key={`${item.source ?? 'blank'}-${index}`} aria-current={selected === index ? 'true' : undefined}><button className="pdf-page-select" onClick={() => setSelected(index)}>{index + 1}. {item.source === null ? pdfLabel(language, 'blank') : `${pdfLabel(language, 'page')} ${item.source + 1}`}{item.rotation ? ` · ${item.rotation}°` : ''}</button><div className="pdf-actions"><button aria-label={`${pdfLabel(language, 'up')} ${index + 1}`} disabled={busy || index === 0} onClick={() => movePage(index, -1)}><ArrowUp size={16} /></button><button aria-label={`${pdfLabel(language, 'down')} ${index + 1}`} disabled={busy || index === plan.length - 1} onClick={() => movePage(index, 1)}><ArrowDown size={16} /></button><button aria-label={`${pdfLabel(language, 'rotate')} ${index + 1}`} disabled={busy || item.source === null} onClick={() => changePlan(plan.map((entry, i) => i === index ? { ...entry, rotation: (entry.rotation + 90) % 360 } : entry))}><RotateCw size={16} /></button><button aria-label={`${pdfLabel(language, 'remove')} ${index + 1}`} disabled={busy || plan.length === 1} onClick={() => changePlan(plan.filter((_, i) => i !== index))}><Trash2 size={16} /></button></div></li>)}</ol></>}
        {path === '/pdf-split' && files[0] && <label>{pdfLabel(language, 'preview')}<select value={selected} onChange={event => setSelected(Number(event.target.value))}>{Array.from({ length: files[0].pages }, (_, i) => <option key={i} value={i}>{i + 1} / {files[0].pages}</option>)}</select></label>}
        {(path === '/pdf-organize' || path === '/pdf-split') && files[0] && <div className="pdf-work-preview"><h3>{pdfLabel(language, 'preview')}</h3>{preview ? <img src={preview} style={path === '/pdf-organize' ? { transform: `rotate(${plan[selected]?.rotation || 0}deg)` } : undefined} alt={`${pdfLabel(language, 'page')} ${selected + 1}`} /> : <FileText size={48} />}</div>}
      </section></div>}
      <section className="glass-card pdf-guide"><h2>{copy.name}</h2><p>{copy.how}</p><p>{copy.note}</p><nav aria-label="PDF tools"><h3>{pdfWork[language]['/pdf-tools'].name}</h3><ul>{pdfPaths.filter(p => p !== path).map(p => <li key={p}><a href={localUrl(p, language)}>{pdfWork[language][p].name}</a></li>)}</ul></nav></section>
    </main><Footer /></div>;
}
