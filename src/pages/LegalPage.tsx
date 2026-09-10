import { localUrl } from '../seo/catalog';
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';
import { legalText } from '../i18n/legalText';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import './LegalPage.css';

interface LegalPageProps {
  type: 'terms' | 'privacy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { language, t } = useLanguage();
  const currentLegal = legalText[language] || legalText.ko;
  const doc = type === 'terms' ? currentLegal.terms : currentLegal.privacy;

  return (
    <div className="app-container legal-page-container">
      <Header />

      <a
        className="btn-tool"
        href={localUrl('/', language)}
        style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} />
        {t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}
      </a>

      <main className="glass-card legal-main-card">
        <div className="legal-page-header">
          <div className="legal-badge">
            {type === 'terms' ? <FileText size={18} /> : <Shield size={18} />}
            <span>LEGAL & POLICY</span>
          </div>
          <h1>{doc.title}</h1>
          <p className="legal-effective-date">{doc.effectiveDate}</p>
        </div>

        <div className="legal-page-content">
          {doc.sections.map((section, sIdx) => (
            <section key={sIdx} className="legal-page-section">
              <h2>{section.title}</h2>
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </section>
          ))}

          <div className="legal-contact-callout">
            <h3>📬 {currentLegal.footer.contactLabel}</h3>
            <p>
              {language === 'ko' ? (
                <>
                  본 내용에 대한 문의사항이나 의견은 이메일(
                  <a href={`mailto:${doc.contactEmail}`}>{doc.contactEmail}</a>
                  )로 접수해 주시기 바랍니다.
                </>
              ) : (
                <>
                  For inquiries or questions, please contact via email (
                  <a href={`mailto:${doc.contactEmail}`}>{doc.contactEmail}</a>
                  ).
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
