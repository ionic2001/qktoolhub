import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentLegal = legalText[language] || legalText.ko;
  const doc = type === 'terms' ? currentLegal.terms : currentLegal.privacy;

  useEffect(() => {
    const pageTitle = `${doc.title} | QK Tool Hub`;
    document.title = pageTitle;

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', pageTitle);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const descContent = type === 'terms'
      ? `${doc.title} - QK Tool Hub 서비스 이용 조건 및 책임에 관한 안내`
      : `${doc.title} - QK Tool Hub 100% 클라이언트 사이드 개인정보 보호 및 쿠키 정책 안내`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descContent);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descContent);
  }, [doc, type, location]);

  return (
    <div className="app-container legal-page-container">
      <Header />

      <button
        className="btn-tool"
        onClick={() => navigate('/')}
        style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} />
        {t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}
      </button>

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
