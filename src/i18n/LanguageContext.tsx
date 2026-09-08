import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationStructure } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ko';
  const navLang = navigator.language || (navigator as any).userLanguage || 'ko';
  const lower = navLang.toLowerCase();

  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('es')) return 'es';
  return 'en'; // default for global users
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => { const requested = new URLSearchParams(window.location.search).get('lang') as Language; return requested && ['ko', 'en', 'ja', 'zh', 'es'].includes(requested) ? requested : 'ko'; });

  const applySeoAndLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
    if (['/pixel-art', '/pdf-converter', '/world-clock', '/image-editor'].includes(window.location.pathname)) return;
    const currentT = translations[lang] || translations.ko;
    
    const dynamicTitle = `${currentT.appTitle} | ${currentT.appSubtitle}`;
    const dynamicDesc = `${currentT.appTitle} - ${currentT.appSubtitle}. ${currentT.hubSubtitle || ''}`;

    // Dynamic Page Title
    document.title = dynamicTitle;
    
    // Meta Description & Meta Title
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dynamicDesc);

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', dynamicTitle);

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', dynamicTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', dynamicDesc);

    // Twitter
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', dynamicTitle);

    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', dynamicDesc);
  };

  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language;
    let initialLang: Language = 'ko';

    const requested = new URLSearchParams(window.location.search).get('lang') as Language;
    if (requested && ['ko', 'en', 'ja', 'zh', 'es'].includes(requested)) {
      initialLang = requested;
    } else if (saved && ['ko', 'en', 'ja', 'zh', 'es'].includes(saved)) {
      initialLang = saved;
    } else {
      initialLang = detectBrowserLanguage();
    }

    setLanguageState(initialLang);
    applySeoAndLanguage(initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
    applySeoAndLanguage(lang);
  };

  const t = translations[language] || translations.ko;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
