import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';

export const ExplanationsFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    { q: t.explanations.faq1Q, a: t.explanations.faq1A },
    { q: t.explanations.faq2Q, a: t.explanations.faq2A },
    { q: t.explanations.faq3Q, a: t.explanations.faq3A },
    { q: t.explanations.faq4Q, a: t.explanations.faq4A },
    { q: t.explanations.faq5Q, a: t.explanations.faq5A }
  ].filter(f => f.q && f.a);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
      
      {/* 1. 세부 항목별 백과사전식 상세 가이드 */}
      {t.explanationGuide && t.explanationGuide.sections && (
        <section className="glass-card">
          <h2 className="section-title">
            <BookOpen size={22} color="var(--accent-color)" />
            {t.explanationGuide.title}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {t.explanationGuide.subtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {t.explanationGuide.sections.map((sec, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--bg-primary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '0.85rem', 
                  padding: '1.25rem' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sec.title}
                  </h3>
                  <span className="badge">{sec.badge}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>
                  {sec.description}
                </p>

                {sec.details && sec.details.length > 0 && (
                  <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {sec.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <Info size={14} color="var(--accent-color)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. 아코디언 FAQ */}
      <section className="glass-card">
        <h2 className="section-title">
          <HelpCircle size={22} color="var(--accent-color)" />
          {t.explanations.title}
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {t.explanations.subtitle}
        </p>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="faq-item" style={{ cursor: 'pointer' }} onClick={() => toggleFaq(idx)}>
                <div className="faq-question" style={{ justifyContent: 'space-between' }}>
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="var(--accent-color)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>
                {isOpen && (
                  <div className="faq-answer" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
