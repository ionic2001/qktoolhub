import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Moon, Sun, FileText } from 'lucide-react';

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

  return (
    <header className="header-wrapper">
      <div className="logo-area">
        <div className="logo-icon">
          <FileText size={24} />
        </div>
        <div>
          <div className="logo-title">{t.appTitle}</div>
          <p className="logo-subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="controls-group">
        <div className="lang-select-wrapper">
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            aria-label={{ko:'언어 선택',en:'Language selector',ja:'言語を選択',zh:'选择语言',es:'Seleccionar idioma'}[language]}
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
          aria-label={{ko:'테마 변경',en:'Toggle theme',ja:'テーマを切り替え',zh:'切换主题',es:'Cambiar tema'}[language]}
          title={{ko:'테마 변경',en:'Toggle theme',ja:'テーマを切り替え',zh:'切换主题',es:'Cambiar tema'}[language]}
        >
          {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
};
