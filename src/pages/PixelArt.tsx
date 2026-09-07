import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { pixelTranslations } from '../i18n/pixelTranslations';
import { usePixelSeo } from '../utils/usePixelSeo';
import { Header } from '../components/Header';
import './PixelArt.css';

export function PixelArtPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const tr = (key: string) => pixelTranslations[language][key] || key;
  usePixelSeo(language);
  const [source, setSource] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState('image');
  const [size, setSize] = useState(12);
  const [colors, setColors] = useState(0);
  const [monochrome, setMonochrome] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dimensions, setDimensions] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  useEffect(() => () => { request.current++; }, []);

  async function load(file: File) {
    const id = ++request.current;
    setError('');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setBusy(false); setError(tr("JPG, PNG 또는 WebP 이미지를 선택해 주세요.")); return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setBusy(false); setError(tr("20MB 이하의 이미지를 선택해 주세요.")); return;
    }
    setBusy(true);
    const url = URL.createObjectURL(file);
    try {
      const img = new Image(); img.src = url;
      await img.decode();
      if (id !== request.current) return;
      if (img.naturalWidth * img.naturalHeight > 40000000) throw new Error(tr("이미지는 4천만 픽셀 이하로 선택해 주세요."));
      // Keep a bounded preview in memory; the uploaded file never leaves this browser.
      const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
      const preview = document.createElement('canvas');
      preview.width = Math.max(1, Math.round(img.naturalWidth * scale));
      preview.height = Math.max(1, Math.round(img.naturalHeight * scale));
      preview.getContext('2d')!.drawImage(img, 0, 0, preview.width, preview.height);
      const bounded = new Image(); bounded.src = preview.toDataURL('image/png');
      await bounded.decode();
      if (id !== request.current) return;
      setSource(bounded); setName(file.name.replace(/\.[^.]+$/, ''));
    } catch (e) {
      if (id === request.current) setError(e instanceof Error && e.message === tr('이미지는 4천만 픽셀 이하로 선택해 주세요.') ? e.message : tr("이미지를 읽을 수 없습니다. 다른 파일을 선택해 주세요."));
    } finally { URL.revokeObjectURL(url); if (id === request.current) setBusy(false); }
  }

  useEffect(() => {
    if (!source || !canvas.current) return;
    const output = canvas.current;
    output.width = source.naturalWidth; output.height = source.naturalHeight;
    const small = document.createElement('canvas');
    small.width = Math.max(1, Math.round(output.width / size));
    small.height = Math.max(1, Math.round(output.height / size));
    const ctx = small.getContext('2d', { willReadFrequently: true })!;
    ctx.drawImage(source, 0, 0, small.width, small.height);
    if (monochrome) {
      const gray = ctx.getImageData(0, 0, small.width, small.height);
      for (let i = 0; i < gray.data.length; i += 4) {
        const luminance = Math.round(0.2126 * gray.data[i] + 0.7152 * gray.data[i + 1] + 0.0722 * gray.data[i + 2]);
        const value = colors ? Math.round(Math.round(luminance / 255 * (colors - 1)) * 255 / (colors - 1)) : luminance;
        gray.data[i] = gray.data[i + 1] = gray.data[i + 2] = value;
      }
      ctx.putImageData(gray, 0, 0);
    }
    if (colors && !monochrome) {
      const pixels = ctx.getImageData(0, 0, small.width, small.height);
      const histogram = new Map<number, { rgb: number[]; count: number }>();
      for (let i = 0; i < pixels.data.length; i += 4) {
        if (!pixels.data[i + 3]) continue;
        const rgb = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]];
        const key = (rgb[0] >> 3) * 1024 + (rgb[1] >> 3) * 32 + (rgb[2] >> 3);
        const entry = histogram.get(key);
        if (entry) { entry.rgb = entry.rgb.map((v, c) => v + rgb[c]); entry.count++; }
        else histogram.set(key, { rgb, count: 1 });
      }
      const buckets = [Array.from(histogram.values()).map(e => ({ rgb: e.rgb.map(v => v / e.count), count: e.count }))];
      while (buckets.length < colors) {
        let chosen = -1, channel = 0, largest = -1;
        buckets.forEach((bucket, index) => {
          if (bucket.length < 2) return;
          for (let c = 0; c < 3; c++) {
            let lo = 255, hi = 0;
            for (const e of bucket) { lo = Math.min(lo, e.rgb[c]); hi = Math.max(hi, e.rgb[c]); }
            if (hi - lo > largest) { largest = hi - lo; chosen = index; channel = c; }
          }
        });
        if (chosen < 0) break;
        const bucket = buckets.splice(chosen, 1)[0].sort((a, b) => a.rgb[channel] - b.rgb[channel]);
        const half = bucket.reduce((sum, e) => sum + e.count, 0) / 2;
        let sum = 0, split = 0;
        while (split < bucket.length - 1 && sum < half) sum += bucket[split++].count;
        buckets.push(bucket.slice(0, split), bucket.slice(split));
      }
      const palette = buckets.filter(b => b.length).map(bucket => {
        const count = bucket.reduce((sum, e) => sum + e.count, 0);
        return [0, 1, 2].map(c => Math.round(bucket.reduce((sum, e) => sum + e.rgb[c] * e.count, 0) / count));
      });
      const cache = new Map<number, number[]>();
      for (let i = 0; i < pixels.data.length; i += 4) {
        if (!pixels.data[i + 3]) continue;
        const key = pixels.data[i] * 65536 + pixels.data[i + 1] * 256 + pixels.data[i + 2];
        let nearest = cache.get(key);
        if (!nearest) {
          let distance = Infinity;
          for (const color of palette) {
            const d = color.reduce((sum, v, c) => sum + (v - pixels.data[i + c]) ** 2, 0);
            if (d < distance) { nearest = color; distance = d; }
          }
          if (nearest) cache.set(key, nearest);
        }
        if (nearest) for (let c = 0; c < 3; c++) pixels.data[i + c] = nearest[c];
      }
      ctx.putImageData(pixels, 0, 0);
    }
    const out = output.getContext('2d')!;
    out.imageSmoothingEnabled = false;
    out.drawImage(small, 0, 0, output.width, output.height);
    setDimensions(`${output.width} × ${output.height}px · ${small.width} × ${small.height}`);
  }, [source, size, colors, monochrome]);

  function sample() {
    const c = document.createElement('canvas'); c.width = 800; c.height = 600;
    const ctx = c.getContext('2d')!;
    const sky = ctx.createLinearGradient(0, 0, 0, 600);
    sky.addColorStop(0, '#648bcc'); sky.addColorStop(0.6, '#edb3a2'); sky.addColorStop(1, '#395865');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = '#ffe3a0'; ctx.beginPath(); ctx.arc(565, 185, 65, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#667084'; ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(270, 200); ctx.lineTo(530, 460); ctx.lineTo(710, 310); ctx.lineTo(800, 440); ctx.lineTo(800, 600); ctx.lineTo(0, 600); ctx.fill();
    ctx.fillStyle = '#2f5c55'; ctx.beginPath(); ctx.moveTo(0, 520); ctx.quadraticCurveTo(400, 320, 800, 550); ctx.lineTo(800, 600); ctx.lineTo(0, 600); ctx.fill();
    c.toBlob(blob => { if (blob) void load(new File([blob], 'sample-landscape.png', {type: 'image/png'})); });
  }

  function download() {
    canvas.current?.toBlob(blob => {
      if (!blob) { setError(tr("다운로드를 준비하지 못했습니다. 다시 시도해 주세요.")); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${name}-pixel-${size}px.png`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }, 'image/png');
  }

  return <div className="app-container pixel-page">
    <Header />
    <div style={{ marginBottom: '1.5rem' }}><button className="btn-tool" onClick={() => navigate('/')} style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid rgba(99, 102, 241, 0.3)' }}><ArrowLeft size={16} />{t.backToHub}</button></div>
    <main>
      <div className="pixel-intro"><span className="badge">IMAGE TO PIXEL</span><h1>{tr("사진 한 장, 픽셀 아트로.")}</h1><p>{tr("사진을 넣고 픽셀과 색상을 조절해 나만의 레트로 이미지를 만들어 보세요.")}</p><small>{tr("사진은 이 브라우저에서만 처리되며 서버에 업로드되지 않습니다.")}</small></div>
      <div className="pixel-layout">
        <section className="glass-card pixel-settings" aria-label={tr("변환 설정")}>
          <h2>{tr("01. 이미지 선택")}</h2>
          <div className={`pixel-drop ${dragging ? 'is-dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) void load(e.dataTransfer.files[0]); }}>
            <span className="pixel-upload-icon" aria-hidden="true">▧</span>
            <button className="pixel-button" onClick={() => input.current?.click()} disabled={busy}>{busy ? tr("이미지 읽는 중…") : source ? tr("다른 사진 선택") : tr("사진 선택")}</button>
            <p>{tr("또는 여기에 파일을 끌어 놓으세요")}</p><small>{tr("JPG · PNG · WebP / 최대 20MB")}</small>
            <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label={tr("사진 파일")} onChange={e => { if (e.target.files?.[0]) void load(e.target.files[0]); e.target.value = ''; }} hidden />
          </div>
          <button className="pixel-text-button" onClick={sample} disabled={busy}>{tr("샘플 이미지로 먼저 체험하기 ↗")}</button>
          {error && <p className="pixel-error" role="alert">{error}</p>}
          <h2>{tr("02. 스타일 조절")}</h2>
          <label className="pixel-label" htmlFor="pixel-size">{tr("픽셀 크기")} <strong>{size}px</strong></label>
          <input id="pixel-size" type="range" min="2" max="64" value={size} onChange={e => setSize(Number(e.target.value))} />
          <div className="pixel-range-labels"><span>{tr("섬세하게")}</span><span>{tr("큼직하게")}</span></div>
          <label className="pixel-label" htmlFor="pixel-colors">{tr("색상 팔레트")}</label>
          <select id="pixel-colors" value={colors} onChange={e => setColors(Number(e.target.value))}><option value={0}>{monochrome ? tr("전체 명암") : tr("원본 색상")}</option>{[32, 64, 128, 246].map(n => <option key={n} value={n}>{n}{monochrome ? tr("단계 명암") : tr("색")}</option>)}</select>
          <label className="pixel-label" htmlFor="pixel-mode">{tr("컬러 / 흑백")}</label>
          <select id="pixel-mode" value={monochrome ? 'gray' : 'color'} onChange={e => setMonochrome(e.target.value === 'gray')}><option value="color">{tr("컬러")}</option><option value="gray">{tr("흑백")}</option></select>
          <button className="pixel-text-button" onClick={() => { setSize(12); setColors(0); setMonochrome(false); }}>{tr("설정 초기화")}</button>
          <button className="pixel-button pixel-download" disabled={!source || busy} onClick={download}>{tr("PNG 다운로드 ↓")}</button>
          <p className="pixel-note">{tr("투명 배경 유지 · 비율 유지")}<br />{tr("큰 사진은 긴 변 1,600px로 줄여 저장합니다.")}</p>
        </section>
        <section className="glass-card pixel-preview" aria-label={tr("미리보기")}>
          <div className="pixel-preview-heading"><h2>{tr("03. 미리보기")}</h2><span aria-live="polite">{source ? dimensions : tr("이미지를 선택해 주세요")}</span></div>
          {source ? <div className="pixel-comparison"><figure><figcaption>{tr("원본")}</figcaption><div className="pixel-image-area"><img src={source.src} alt={tr("선택한 원본 이미지")} /></div></figure><figure><figcaption>{tr("픽셀 변환")}</figcaption><div className="pixel-image-area"><canvas ref={canvas} aria-label={tr("픽셀 변환 결과")} /></div></figure></div> : <div className="pixel-empty"><div className="pixel-motif" aria-hidden="true">▦</div><h3>{tr("어떤 사진을 바꿔볼까요?")}</h3><p>{tr("풍경, 반려동물, 일상의 순간까지.")}<br />{tr("사진을 선택하면 변환 결과가 바로 나타납니다.")}</p><button className="pixel-text-button" onClick={sample}>{tr("샘플로 시작 →")}</button></div>}
        </section>
      </div>
      <p className="pixel-footnote">{tr("작은 픽셀은 디테일을, 큰 픽셀은 추상적인 분위기를 살려줍니다. 색상을 줄이면 고전 게임 같은 느낌이 더해집니다.")}</p>
    </main>
  </div>;
}
