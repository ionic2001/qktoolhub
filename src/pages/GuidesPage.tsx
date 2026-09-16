import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { GuideContent } from '../guides/GuideRenderer';
import { guidePaths } from '../guides/guideContent';
import { useLanguage } from '../i18n/LanguageContext';
import './GuidesPage.css';

export default function GuidesPage() {
  const { pathname, search } = useLocation();
  const { setLanguage } = useLanguage();
  useEffect(() => { if (new URLSearchParams(search).has('lang')) setLanguage('ko'); }, [search, setLanguage]);
  return <div className="app-container guide-page"><Header />{guidePaths.includes(pathname) && <GuideContent path={pathname}/>}<Footer /></div>;
}
