import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { Home } from './pages/Home';
import { WordCounterPage } from './pages/WordCounter';
import { CurrencyConverterPage } from './pages/CurrencyConverter';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-counter" element={<WordCounterPage />} />
          <Route path="/currency-converter" element={<CurrencyConverterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
