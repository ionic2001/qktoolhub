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
  const [language, setLanguageState] = useState<Language>('ko');

  const applySeoAndLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
    const currentT = translations[lang] || translations.ko;
    
    // Dynamic Page Title & Meta Description update for Google SEO
    document.title = `${currentT.appTitle} | ${currentT.appSubtitle}`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${currentT.appTitle} - ${currentT.appSubtitle}`);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language;
    let initialLang: Language = 'ko';

    if (saved && ['ko', 'en', 'ja', 'zh', 'es'].includes(saved)) {
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
