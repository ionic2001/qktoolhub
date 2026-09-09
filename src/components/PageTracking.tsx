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
  const { language, t } = useLanguage();
  useEffect(() => {
    // Run after the tool's own metadata effect, including lazy-loaded pages.
    const timer = window.setTimeout(() => {
      if (['/', '/word-counter', '/currency-converter'].includes(pathname)) {
        const tool = t.toolsList.find(item => item.path === pathname);
        const title = pathname === '/' ? `QK Tool Hub | ${t.hubTitle}` : `${tool?.title || t.appTitle} | QK Tool Hub`;
        const description = pathname === '/' ? t.hubSubtitle : tool?.desc || t.hubSubtitle;
        document.title = title;
        const url = `https://qktoolhub.com${pathname}?lang=${language}`;
        const set = (selector: string, tag: string, attrs: Record<string,string>) => {
          const el = document.head.querySelector(selector) || document.head.appendChild(document.createElement(tag));
          Object.entries(attrs).forEach(([key,value]) => el.setAttribute(key,value));
        };
        for (const [name, content] of Object.entries({title,description})) set(`meta[name="${name}"]`, 'meta', {name,content});
        for (const [property,content] of Object.entries({'og:title':title,'og:description':description,'og:url':url,'twitter:title':title,'twitter:description':description,'twitter:url':url})) set(`meta[property="${property}"]`, 'meta', {property,content});
        set('link[rel="canonical"]','link',{rel:'canonical',href:url});
        for (const lang of ['ko','en','ja','zh','es','x-default']) set(`link[hreflang="${lang}"]`,'link',{rel:'alternate',hreflang:lang,href:`https://qktoolhub.com${pathname}${lang==='x-default'?'':`?lang=${lang}`}`});
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, language, t]);
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
