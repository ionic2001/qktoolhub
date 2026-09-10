import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { canonicalUrl, languages, origin, pageMeta, pagePaths, pageSchema } from './catalog';
export function PageSeo() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const set = (selector: string, tag: string, attributes: Record<string, string>) => {
      const nodes = Array.from(document.head.querySelectorAll(selector));
      const node = nodes.shift() || document.head.appendChild(document.createElement(tag));
      nodes.forEach(n => n.remove());
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
      return node;
    };
    document.documentElement.lang = language;
    const known = pagePaths.includes(pathname);
    set('meta[name="robots"]', 'meta', { name: 'robots', content: known ? 'index, follow, max-image-preview:large' : 'noindex, follow' });
    document.querySelectorAll('meta[name="keywords"],script[type="application/ld+json"],link[rel="canonical"],link[hreflang],meta[property^="twitter:"]').forEach(node => node.remove());
    if (!known) { document.title = '404 | QK Tool Hub'; return; }
    const meta = pageMeta(pathname, language);
    document.title = meta.title;
    for (const [name, content] of Object.entries({ title: meta.title, description: meta.description, 'twitter:card': 'summary_large_image', 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:url': meta.url, 'twitter:image': origin + '/og-image.png', 'twitter:image:alt': 'QK Tool Hub' })) set(`meta[name="${name}"]`, 'meta', { name, content });
    for (const [property, content] of Object.entries({ 'og:type': 'website', 'og:site_name': 'QK Tool Hub', 'og:title': meta.title, 'og:description': meta.description, 'og:url': meta.url, 'og:image': origin + '/og-image.png', 'og:image:alt': 'QK Tool Hub', 'og:locale': ({ ko: 'ko_KR', en: 'en_US', ja: 'ja_JP', zh: 'zh_CN', es: 'es_ES' })[language] })) set(`meta[property="${property}"]`, 'meta', { property, content });
    set('link[rel="canonical"]', 'link', { rel: 'canonical', href: meta.url });
    for (const lang of languages) set(`link[hreflang="${lang}"]`, 'link', { rel: 'alternate', hreflang: lang, href: canonicalUrl(pathname, lang) });
    set('link[hreflang="x-default"]', 'link', { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl(pathname, 'ko') });
    set('#page-schema', 'script', { id: 'page-schema', type: 'application/ld+json' }).textContent = JSON.stringify(pageSchema(pathname, language));
  }, [pathname, language]);
  return null;
}
