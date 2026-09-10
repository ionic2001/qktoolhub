import { ArrowLeft, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../i18n/LanguageContext';
import { aboutText } from '../i18n/aboutText';
import { localUrl } from '../seo/catalog';
import './LegalPage.css';

export default function AboutPage() {
  const { language, t } = useLanguage();
  const { hash } = useLocation();
  const copy = aboutText[language];

  useEffect(() => {
    if (hash !== '#contact') return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return <div className="app-container legal-page-container">
    <Header />
    <a className="btn-tool" href={localUrl('/', language)} style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', marginBottom: '1.5rem' }}><ArrowLeft size={16}/>{t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}</a>
    <main className="glass-card legal-main-card">
      <div className="legal-page-header"><div className="legal-badge"><span>{copy.badge}</span></div><h1>{copy.title}</h1><p className="legal-effective-date">{copy.description}</p></div>
      <div className="legal-page-content">
        {copy.sections.map(section => <section className="legal-page-section" key={section.title}><h2>{section.title}</h2>{section.content.map(text => <p key={text}>{text}</p>)}</section>)}
        <section id="contact" className="legal-contact-callout"><h2><Mail size={18}/> {copy.contactTitle}</h2><p>{copy.contactBody}</p><p><a href="mailto:contact@qktoolhub.com">{copy.contactAction}: contact@qktoolhub.com</a></p></section>
      </div>
    </main>
    <Footer />
  </div>;
}
