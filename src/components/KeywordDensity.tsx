import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { analyzeTopKeywords } from '../utils/counter';
import { Key } from 'lucide-react';

interface KeywordDensityProps {
  text: string;
}

export const KeywordDensity: React.FC<KeywordDensityProps> = ({ text }) => {
  const { t } = useLanguage();
  const keywords = analyzeTopKeywords(text, 5);

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>
        <Key size={18} color="var(--accent-color)" />
        {t.keywords.title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        {t.keywords.subtitle}
      </p>

      {keywords.length === 0 ? (
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
          {t.keywords.emptyText}
        </div>
      ) : (
        <div>
          {keywords.map((kw, idx) => (
            <div key={idx} className="keyword-chip">
              <span className="keyword-word">
                #{idx + 1} {kw.word}
              </span>
              <div className="keyword-stats">
                <span style={{ fontWeight: 700, color: 'var(--accent-color)' }}>{kw.count}{t.keywords.frequency}</span>
                <span>({kw.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
