import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { ArrowLeft, DollarSign, Sparkles } from 'lucide-react';

export const CurrencyConverterPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Header />

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

      <AdSlot slotId="currency-top-banner" />

      <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ width: '4rem', height: '4rem', background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <DollarSign size={32} color="var(--accent-color)" />
        </div>

        <span className="badge" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} />
          COMING SOON
        </span>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          실시간 환율 / 환전 계산기 (Currency Converter)
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 2rem' }}>
          미국 달러(USD), 일본 엔화(JPY), 유로화(EUR), 한국 원화(KRW) 등 실시간 글로벌 환율 자동 계산 서비스가 곧 오픈될 예정입니다!
        </p>

        <button className="btn-tool" onClick={() => navigate('/word-counter')}>
          글자수 / 단어수 세기 툴 사용하기
        </button>
      </div>

      <AdSlot slotId="currency-bottom-banner" />

      <footer className="app-footer">
        <p>© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.</p>
      </footer>
    </div>
  );
};
