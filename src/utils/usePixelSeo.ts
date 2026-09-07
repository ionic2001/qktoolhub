import { useEffect } from 'react';
import { pixelTranslations } from '../i18n/pixelTranslations';

export function usePixelSeo(language: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const undo: (() => void)[] = [];
    const set = (selector: string, tag: string, attributes: Record<string, string>) => {
      let node = document.head.querySelector(selector);
      const created = !node;
      if (!node) { node = document.createElement(tag); document.head.appendChild(node); }
      const original = node.cloneNode(true) as Element;
      Object.entries(attributes).forEach(([k, v]) => node!.setAttribute(k, v));
      const target = node;
      undo.push(() => { if (created) target.remove(); else target.replaceWith(original); });
      return node;
    };
    const tr = pixelTranslations[language];
    const title = `${tr['사진 픽셀 아트 변환']} | QK Tool Hub`;
    const description = `${tr['사진을 넣고 픽셀과 색상을 조절해 나만의 레트로 이미지를 만들어 보세요.']} ${tr['사진은 이 브라우저에서만 처리되며 서버에 업로드되지 않습니다.']}`;
    const base = 'https://qktoolhub.com/pixel-art';
    const url = `${base}?lang=${language}`;
    document.title = title; document.documentElement.lang = language;
    const local = new URL(window.location.href); local.searchParams.set('lang', language);
    window.history.replaceState(window.history.state, '', local);
    for (const [key, value] of Object.entries({ title, description })) set(`meta[name="${key}"]`, 'meta', { name: key, content: value });
    for (const [key, value] of Object.entries({ 'og:title': title, 'og:description': description, 'og:url': url, 'og:type': 'website', 'twitter:title': title, 'twitter:description': description, 'twitter:url': url })) set(`meta[property="${key}"]`, 'meta', { property: key, content: value });
    set('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });
    for (const lang of ['ko', 'en', 'ja', 'zh', 'es', 'x-default']) set(`link[hreflang="${lang}"]`, 'link', { rel: 'alternate', hreflang: lang, href: lang === 'x-default' ? base : `${base}?lang=${lang}` });
    const schemas = Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'));
    schemas.forEach(s => s.remove());
    const schema = set('#pixel-schema', 'script', { id: 'pixel-schema', type: 'application/ld+json' });
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url, inLanguage: language, applicationCategory: 'MultimediaApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript and HTML Canvas', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['32 / 64 / 128 / 246 colors', 'Grayscale', 'PNG export', 'Local image processing'] });
    return () => { undo.reverse().forEach(fn => fn()); schemas.forEach(s => document.head.appendChild(s)); document.title = previousTitle; document.documentElement.lang = previousLang; };
  }, [language]);
}
