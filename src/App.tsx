import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PixelArtPage } from './pages/PixelArt';
import { Home } from './pages/Home';
import { WordCounterPage } from './pages/WordCounter';
import { CurrencyConverterPage } from './pages/CurrencyConverter';

const ImageEditor = lazy(() => import('./pages/ImageEditor'));
const PdfConverterPage = lazy(() => import('./pages/PdfConverter'));

const WorldClockPage = lazy(() => import('./pages/WorldClock'));
export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-editor" element={<Suspense fallback={<div role="status">…</div>}><ImageEditor /></Suspense>} />
            <Route path="/world-clock" element={<Suspense fallback={<div role="status">…</div>}><WorldClockPage /></Suspense>} />
            <Route path="/pdf-converter" element={<Suspense fallback={<div role="status">PDF…</div>}><PdfConverterPage /></Suspense>} />
            <Route path="/pixel-art" element={<PixelArtPage />} />
            <Route path="/word-counter" element={<WordCounterPage />} />
            <Route path="/currency-converter" element={<CurrencyConverterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
