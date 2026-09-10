import { PageSeo } from './seo/PageSeo';
import { RouteFallback, NotFound } from './seo/RouteFallback';
import { VercelAnalytics } from './components/VercelAnalytics';
import { PageTracking } from './components/PageTracking';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PixelArtPage } from './pages/PixelArt';
import { Home } from './pages/Home';
import { WordCounterPage } from './pages/WordCounter';
import { CurrencyConverterPage } from './pages/CurrencyConverter';

const UnitConverter = lazy(() => import('./pages/UnitConverter'));
const ImageEditor = lazy(() => import('./pages/ImageEditor'));
const PdfConverterPage = lazy(() => import('./pages/PdfConverter'));

const WorldClockPage = lazy(() => import('./pages/WorldClock'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <PageSeo />
          <PageTracking />
          <VercelAnalytics />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Suspense fallback={<RouteFallback />}><CalendarPage /></Suspense>} />
            <Route path="/terms" element={<Suspense fallback={<RouteFallback />}><LegalPage type="terms" /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<RouteFallback />}><LegalPage type="privacy" /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<RouteFallback />}><AboutPage /></Suspense>} />
            <Route path="/unit-converter" element={<Suspense fallback={<RouteFallback />}><UnitConverter /></Suspense>} />
            <Route path="/image-editor" element={<Suspense fallback={<RouteFallback />}><ImageEditor /></Suspense>} />
            <Route path="/world-clock" element={<Suspense fallback={<RouteFallback />}><WorldClockPage /></Suspense>} />
            <Route path="/pdf-converter" element={<Suspense fallback={<RouteFallback />}><PdfConverterPage /></Suspense>} />
            <Route path="/pixel-art" element={<PixelArtPage />} />
            <Route path="/word-counter" element={<WordCounterPage />} />
            <Route path="/currency-converter" element={<CurrencyConverterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
