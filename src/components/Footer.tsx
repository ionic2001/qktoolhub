import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { legalText } from '../i18n/legalText';
import { SeoSections } from '../seo/SeoSections';
import { localUrl, pagePaths } from '../seo/catalog';
import { guidePaths } from '../guides/guideContent';
import './Footer.css';
export function Footer() {
  const { language } = useLanguage(), { pathname } = useLocation();
  const t = legalText[language].footer;
  const isGuide = guidePaths.includes(pathname);
  return <>{!isGuide && <SeoSections path={pagePaths.includes(pathname) ? pathname : '/'} language={language}/>}<footer className="app-footer"><p>{t.copyright}</p><p className="footer-tagline">{t.tagline}</p><div className="footer-links"><Link className="footer-link-btn" to="/guides">{{ko:'활용 가이드',en:'Guides (Korean)',ja:'活用ガイド（韓国語）',zh:'使用指南（韩语）',es:'Guías (coreano)'}[language]}</Link><Link className="footer-link-btn" to={localUrl('/about', language)}>{t.aboutLink}</Link><Link className="footer-link-btn" to={`${localUrl('/about', language)}#contact`}>{t.contactLabel}</Link><Link className="footer-link-btn" to={localUrl('/terms', language)}>{t.termsLink}</Link><Link className="footer-link-btn" to={localUrl('/privacy', language)}>{t.privacyLink}</Link></div></footer></>;
}
