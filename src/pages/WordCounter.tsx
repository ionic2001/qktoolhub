import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { TextEditor } from '../components/TextEditor';
import { TextStatsSummary } from '../components/TextStatsSummary';
import { PlatformLimits } from '../components/PlatformLimits';
import { TextTools } from '../components/TextTools';
import { KeywordDensity } from '../components/KeywordDensity';
import { ExplanationsFAQ } from '../components/ExplanationsFAQ';
import { AdSlot } from '../components/AdSlot';
import { calculateTextStats } from '../utils/counter';
import { ArrowLeft } from 'lucide-react';

export const WordCounterPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [text, setText] = useState<string>('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('app_saved_text');
    if (saved) {
      setText(saved);
    }
  }, []);

  // Save to LocalStorage
  const handleTextChange = (newText: string) => {
    setText(newText);
    localStorage.setItem('app_saved_text', newText);
  };

  const stats = calculateTextStats(text);

  return (
    <div className="app-container">
      <Header />

      {/* Back to Hub Breadcrumb Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          className="btn-tool"
          onClick={() => navigate('/')}
          style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
        >
          <ArrowLeft size={16} />
          {t.backToHub}
        </button>
      </div>

      {/* Top Banner Ad Slot */}
      <AdSlot slotId="word-counter-top-banner" />

      {/* Main Text Editor */}
      <TextEditor text={text} setText={handleTextChange} />

      {/* Real-time Stats Cards */}
      <TextStatsSummary stats={stats} />

      {/* Platform Length Limit Gauges */}
      <PlatformLimits stats={stats} />

      {/* Utilities & Keyword Analysis */}
      <div className="two-col-grid">
        <TextTools text={text} setText={handleTextChange} />
        <KeywordDensity text={text} />
      </div>

      {/* Explanations & FAQ Section */}
      <ExplanationsFAQ />

      {/* Bottom Banner Ad Slot */}
      <AdSlot slotId="word-counter-bottom-banner" />

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
          Real-time Privacy-first Text Analytics | Google SEO & GA4 Optimized
        </p>
      </footer>
    </div>
  );
};
