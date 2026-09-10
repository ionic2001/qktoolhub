import { copy as unitCopy } from '../features/units/text';
import { worldGuide } from '../i18n/worldGuide';
import { pdfGuide } from '../i18n/pdfGuide';
import { pixelTranslations } from '../i18n/pixelTranslations';
import editorMeta from '../i18n/editorMeta.json';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { track } from '../utils/analytics';

export function PageTracking() {
  const { pathname } = useLocation();
  const previousPage = useRef(document.referrer);
  const { language } = useLanguage();
  useEffect(() => {
    // Observer waits for lazy tool metadata; one event per route/language navigation.
    let timeout: number;
    const send = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        observer.disconnect();
        const titles: Record<string,string> = {
          '/unit-converter': unitCopy.title[['ko','en','ja','zh','es'].indexOf(language)],
          '/world-clock': worldGuide[language].title,
          '/pdf-converter': pdfGuide[language].title,
          '/pixel-art': pixelTranslations[language]['사진 픽셀 아트 변환'],
          '/image-editor': editorMeta[language].title,
        };
        track('page_view', {page_referrer: previousPage.current, page_title: titles[pathname] ? `${titles[pathname]} | QK Tool Hub` : document.title, page_location: `${location.origin}${pathname}?lang=${language}`});
        previousPage.current = `${location.origin}${pathname}?lang=${language}`;
      }, 150);
    };
    const observer = new MutationObserver(send);
    observer.observe(document.head, {subtree:true, childList:true, attributes:true, characterData:true});
    send();
    return () => { clearTimeout(timeout); observer.disconnect(); };
  }, [pathname, language]);
  return null;
}
