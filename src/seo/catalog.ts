import type { Language } from '../i18n/translations';
import toolIntro from '../i18n/toolIntro.json';
import editor from '../i18n/editorMeta.json';
import { pdfGuide } from '../i18n/pdfGuide';
import { worldGuide } from '../i18n/worldGuide';
import { worldText } from '../i18n/worldText';
import { calendarGuide } from '../i18n/calendarGuide';
import { calendarText } from '../i18n/calendarText';
import { legalText } from '../i18n/legalText';
import { pixelTranslations } from '../i18n/pixelTranslations';
import { copy } from '../features/units/text';
import content from './content.json';

export const origin = 'https://www.qktoolhub.com';
export const languages: Language[] = ['ko', 'en', 'ja', 'zh', 'es'];
export const toolPaths = ['/word-counter', '/currency-converter', '/pixel-art', '/pdf-converter', '/world-clock', '/calendar', '/image-editor', '/unit-converter'];
export const pagePaths = ['/', ...toolPaths, '/terms', '/privacy'];
export const localUrl = (path: string, lang: Language) => path + (lang === 'ko' ? '' : `?lang=${lang}`);
export const canonicalUrl = (path: string, lang: Language) => origin + localUrl(path, lang);
export const languageFromSearch = (search: string): Language => {
  const lang = new URLSearchParams(search).get('lang') as Language;
  return languages.includes(lang) ? lang : 'ko';
};
export function pageMeta(path: string, lang: Language) {
  const c = content[lang], intro = toolIntro[lang];
  let name = c.homeTitle, description = c.homeDescription, title = name;
  switch (path) {
    case '/word-counter': name = intro.wordTitle; title = c.wordTitle; description = intro.wordDescription; break;
    case '/currency-converter': name = c.currencyTitle; title = name; description = intro.currencyDescription; break;
    case '/pixel-art': name = pixelTranslations[lang]['사진 픽셀 아트 변환']; title = name; description = c.pixelDescription; break;
    case '/pdf-converter': name = pdfGuide[lang].title; title = name; description = pdfGuide[lang].description; break;
    case '/image-editor': name = editor[lang].name; title = editor[lang].title; description = editor[lang].description; break;
    case '/world-clock': name = worldText[lang].title; title = worldGuide[lang].title; description = worldGuide[lang].description; break;
    case '/calendar': name = calendarText[lang].title; title = calendarGuide[lang].title; description = c.calendarDescription; break;
    case '/unit-converter': name = copy.title[languages.indexOf(lang)]; title = name; description = c.unitDescription; break;
    case '/terms': case '/privacy': { const doc = legalText[lang][path === '/terms' ? 'terms' : 'privacy']; name = doc.title; title = name; description = path === '/terms' ? c.termsDescription : c.privacyDescription; break; }
  }
  return { name, title: `${title} | QK Tool Hub`, description, url: canonicalUrl(path, lang) };
}
export function pageSchema(path: string, lang: Language) {
  const meta = pageMeta(path, lang), home = canonicalUrl('/', lang);
  const graph: Record<string, unknown>[] = [];
  if (path === '/') graph.push({ '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: 'QK Tool Hub', alternateName: 'QKToolHub', inLanguage: languages, description: meta.description });
  graph.push({ '@type': 'WebPage', '@id': meta.url + '#page', url: meta.url, name: meta.name, description: meta.description, inLanguage: lang, isPartOf: { '@id': origin + '/#website' } });
  if (toolPaths.includes(path)) graph.push({ '@type': 'WebApplication', '@id': meta.url + '#app', name: meta.name, description: meta.description, url: meta.url, inLanguage: lang, applicationCategory: path === '/currency-converter' ? 'FinanceApplication' : 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } });
  if (path !== '/') graph.push({ '@type': 'BreadcrumbList', '@id': meta.url + '#breadcrumb', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'QK Tool Hub', item: home }, { '@type': 'ListItem', position: 2, name: meta.name, item: meta.url }] });
  if (path === '/pdf-converter') graph.push({ '@type': 'FAQPage', inLanguage: lang, mainEntity: pdfGuide[lang].faqs.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export const seoContent = content;
