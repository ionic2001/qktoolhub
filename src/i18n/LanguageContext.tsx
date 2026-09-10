import React, { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language, translations, TranslationStructure } from './translations';
import { languageFromSearch, languages } from '../seo/catalog';
interface LanguageContextType { language: Language; setLanguage: (lang: Language) => void; t: TranslationStructure }
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(), navigate = useNavigate();
  // A URL always identifies one language; saved preferences never override it.
  const language = languageFromSearch(location.search);
  const setLanguage = (lang: Language) => {
    if (!languages.includes(lang)) return;
    const query = new URLSearchParams(location.search);
    if (lang === 'ko') query.delete('lang'); else query.set('lang', lang);
    try { localStorage.setItem('app_language', lang); } catch { /* Optional preference. */ }
    navigate({ pathname: location.pathname, search: query.toString(), hash: location.hash });
  };
  return <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>{children}</LanguageContext.Provider>;
};
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
