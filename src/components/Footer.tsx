import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { legalText } from '../i18n/legalText';
import { SeoSections } from '../seo/SeoSections';
import { localUrl, pagePaths } from '../seo/catalog';
import './Footer.css';
export function Footer() {
  const { language } = useLanguage(), { pathname } = useLocation();
  const t = legalText[language].footer;
  return <><SeoSections path={pagePaths.includes(pathname) ? pathname : '/'} language={language}/><footer className="app-footer"><p>{t.copyright}</p><p className="footer-tagline">{t.tagline}</p><div className="footer-links"><a className="footer-link-btn" href={localUrl('/about', language)}>{t.aboutLink}</a><a className="footer-link-btn" href={`${localUrl('/about', language)}#contact`}>{t.contactLabel}</a><a className="footer-link-btn" href={localUrl('/terms', language)}>{t.termsLink}</a><a className="footer-link-btn" href={localUrl('/privacy', language)}>{t.privacyLink}</a></div></footer></>;
}
