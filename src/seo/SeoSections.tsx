import type { Language } from '../i18n/translations';
import { localUrl, pageMeta, seoContent, toolPaths } from './catalog';
export function SeoSections({ path, language }: { path: string; language: Language }) {
  const c = seoContent[language];
  const sections = path === '/word-counter' ? c.word : path === '/currency-converter' ? c.currency : path === '/pixel-art' ? c.pixel : path === '/unit-converter' ? c.units : [];
  const related: Record<string, string[]> = {
    '/word-counter': ['/pdf-converter', '/unit-converter'], '/currency-converter': ['/unit-converter', '/world-clock'],
    '/pixel-art': ['/image-editor', '/pdf-converter'], '/image-editor': ['/pixel-art', '/pdf-converter'],
    '/pdf-converter': ['/image-editor', '/word-counter'], '/world-clock': ['/calendar', '/currency-converter'],
    '/calendar': ['/world-clock', '/unit-converter'], '/unit-converter': ['/currency-converter', '/calendar'],
  };
  const groups = [['/word-counter'], ['/image-editor', '/pixel-art', '/pdf-converter'], ['/currency-converter', '/unit-converter'], ['/world-clock', '/calendar']];
  return <div className="seo-sections">
    {path === '/' && <>{groups.map((paths, i) => <section key={i}><h2>{c.groups[i]}</h2><ul>{paths.map(p => <li key={p}><a href={localUrl(p, language)}>{pageMeta(p, language).name}</a><p>{pageMeta(p, language).description}</p></li>)}</ul></section>)}<section><h2>{c.aboutTitle}</h2><p>{c.about}</p></section></>}
    {sections.map((section, i) => <section key={i}><h2>{section[0]}</h2><p>{section[1]}</p></section>)}
    {path !== '/' && <nav aria-label={c.related}><h2>{c.related}</h2><ul>{(related[path] || toolPaths.slice(0, 3)).map(p => <li key={p}><a href={localUrl(p, language)}>{pageMeta(p, language).name}</a></li>)}</ul></nav>}
    <nav className="seo-languages" aria-label={c.languageLabel}>{(['ko', 'en', 'ja', 'zh', 'es'] as Language[]).map((lang, i) => <a key={lang} href={localUrl(path, lang)} hrefLang={lang} lang={lang} aria-current={lang === language ? 'page' : undefined}>{['한국어', 'English', '日本語', '中文', 'Español'][i]}</a>)}</nav>
  </div>;
}
