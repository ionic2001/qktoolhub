import editorMeta from '../i18n/editorMeta.json';
import { useEffect } from 'react';
import type { Language } from '../i18n/translations';

export function useEditorSeo(language: Language) {
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

    const title = `${editorMeta[language].title} | QK Tool Hub`;
    const description = editorMeta[language].description;
    const base = 'https://qktoolhub.com/image-editor';
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
    const schema = set('#editor-schema', 'script', { id: 'editor-schema', type: 'application/ld+json' });
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description, url, inLanguage: language, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any',  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } });
    return () => { undo.reverse().forEach(fn => fn()); schemas.forEach(s => document.head.appendChild(s)); document.title = previousTitle; document.documentElement.lang = previousLang; };
  }, [language]);
}
