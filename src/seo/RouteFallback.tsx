import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { localUrl, pageMeta } from './catalog';
import { SeoSections } from './SeoSections';
export function RouteFallback() {
  const { pathname } = useLocation(), { language } = useLanguage(), meta = pageMeta(pathname, language);
  return <main className="app-container seo-static"><a href={localUrl('/', language)}>QK Tool Hub</a><h1>{meta.name}</h1><p>{meta.description}</p><p role="status">{({ko:'도구를 불러오는 중입니다…',en:'Loading tool…',ja:'ツールを読み込み中…',zh:'正在加载工具…',es:'Cargando herramienta…'})[language]}</p><SeoSections path={pathname} language={language}/></main>;
}
export function NotFound() {
  const { language } = useLanguage();
  return <main className="app-container seo-static"><h1>404</h1><p>{({ko:'페이지를 찾을 수 없습니다.',en:'Page not found.',ja:'ページが見つかりません。',zh:'页面不存在。',es:'Página no encontrada.'})[language]}</p><a href={localUrl('/',language)}>QK Tool Hub</a></main>;
}
