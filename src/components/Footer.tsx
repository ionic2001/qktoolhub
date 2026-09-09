import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { legalText } from '../i18n/legalText';
import { Shield, FileText, X, ExternalLink } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = legalText[language] || legalText.ko;
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  const doc = modalType === 'terms' ? t.terms : modalType === 'privacy' ? t.privacy : null;

  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-copyright">{t.footer.copyright}</p>
          <p className="footer-tagline">{t.footer.tagline}</p>

          <div className="footer-links">
            <button
              className="footer-link-btn"
              onClick={() => setModalType('terms')}
            >
              <FileText size={14} />
              {t.footer.termsLink}
            </button>
            <span className="footer-link-divider">·</span>
            <button
              className="footer-link-btn"
              onClick={() => setModalType('privacy')}
            >
              <Shield size={14} />
              {t.footer.privacyLink}
            </button>
          </div>
        </div>
      </footer>

      {/* Legal Document Modal */}
      {modalType && doc && (
        <dialog
          className="legal-dialog"
          open
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalType(null);
          }}
        >
          <div className="legal-dialog-box glass-card">
            <div className="legal-dialog-header">
              <div>
                <h2>{doc.title}</h2>
                <span className="legal-effective">{doc.effectiveDate}</span>
              </div>
              <div className="legal-header-actions">
                <a
                  href={`/${modalType}?lang=${language}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-open-fullpage"
                  title="새 탭에서 전체보기"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  className="btn-close-legal"
                  onClick={() => setModalType(null)}
                  aria-label={t.footer.close}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="legal-dialog-body">
              {doc.sections.map((sec, idx) => (
                <section key={idx} className="legal-sec">
                  <h3>{sec.title}</h3>
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </section>
              ))}

              <div className="legal-contact-box">
                <strong>{t.footer.contactLabel}:</strong>{' '}
                <a href={`mailto:${doc.contactEmail}`}>{doc.contactEmail}</a>
              </div>
            </div>

            <div className="legal-dialog-footer">
              <button
                className="btn-primary"
                onClick={() => setModalType(null)}
              >
                {t.footer.close}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
