import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe, Moon, Sun, FileText } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(shouldDark);
    document.documentElement.setAttribute('data-theme', shouldDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('app_theme', nextDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', nextDark ? 'dark' : 'light');
  };

  const flags: Record<Language, string> = {
    ko: '🇰🇷 한국어',
    en: '🇺🇸 English',
    ja: '🇯🇵 日本語',
    zh: '🇨🇳 中文',
    es: '🇪🇸 Español'
  };

  return (
    <header className="header-wrapper">
      <div className="logo-area">
        <div className="logo-icon">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="logo-title">{t.appTitle}</h1>
          <p className="logo-subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="controls-group">
        <div className="lang-select-wrapper">
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            aria-label="Language selector"
          >
            <option value="ko">🇰🇷 한국어</option>
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="es">🇪🇸 Español</option>
          </select>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Theme toggle"
        >
          {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
};
