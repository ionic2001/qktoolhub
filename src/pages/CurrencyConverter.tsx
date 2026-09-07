import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { CurrencyGrid } from '../components/CurrencyGrid';
import { fetchExchangeRates, RatesData } from '../utils/currencyRates';
import { ArrowLeft, RefreshCw, Sparkles, Info } from 'lucide-react';

export const CurrencyConverterPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Base Currency initial detection (KRW for ko, USD for en/es, JPY for ja, CNY for zh)
  const initialBaseMap: Record<string, string> = {
    ko: 'KRW',
    en: 'USD',
    ja: 'JPY',
    zh: 'CNY',
    es: 'USD'
  };

  const [baseCurrency, setBaseCurrency] = useState<string>(initialBaseMap[language] || 'KRW');
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [amount, setAmount] = useState<number>(1000);
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Default target currency setup if target matches base
  useEffect(() => {
    if (baseCurrency === targetCurrency) {
      setTargetCurrency(baseCurrency === 'USD' ? 'KRW' : 'USD');
    }
  }, [baseCurrency]);

  // Load Exchange Rates
  const loadRates = async () => {
    setLoading(true);
    const data = await fetchExchangeRates(baseCurrency);
    setRatesData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRates();
  }, [baseCurrency]);

  const currencyT = t.currency;

  const handleCurrencyInputChange = (code: string, newAmount: number) => {
    if (code !== baseCurrency) {
      setBaseCurrency(code);
    }
    setAmount(newAmount);
  };

  return (
    <div className="app-container">
      <Header />

      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="btn-tool"
          onClick={() => navigate('/')}
          style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
        >
          <ArrowLeft size={16} />
          {t.backToHub}
        </button>

        <button
          onClick={loadRates}
          className="btn-tool"
          disabled={loading}
          style={{ background: 'var(--card-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
        >
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          {language === 'ko' ? '새로고침' : language === 'ja' ? '更新' : language === 'zh' ? '刷新' : language === 'es' ? 'Actualizar' : 'Refresh'}
        </button>
      </div>

      {/* Page Hero Banner */}
      <section
        className="glass-card"
        style={{
          padding: '1.75rem 1.25rem',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12))',
          borderColor: 'rgba(99, 102, 241, 0.3)'
        }}
      >
        <div className="badge" style={{ marginBottom: '0.75rem', padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>
          <Sparkles size={14} />
          REAL-TIME CURRENCY HUB
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {currencyT?.title || '실시간 다국어 환율 변환기'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          {currencyT?.subtitle || '전 세계 주요 국가 실시간 환율 계산 및 수치 동시 변환'}
        </p>
      </section>

      {/* Top Banner Ad */}
      <AdSlot slotId="currency-top-banner" />

      {/* Multi-Currency Overview Grid */}
      <CurrencyGrid
        amount={amount}
        baseCurrency={baseCurrency}
        ratesData={ratesData}
        selectedTarget={targetCurrency}
        onSelectTarget={(code) => setTargetCurrency(code)}
        onCurrencyInputChange={handleCurrencyInputChange}
      />

      {/* Rate Difference Disclaimer Banner */}
      <div
        className="glass-card"
        style={{
          padding: '0.9rem 1.2rem',
          marginBottom: '2rem',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}
      >
        <Info size={18} color="var(--warning-color)" style={{ flexShrink: 0 }} />
        <div>
          <strong>💡 {language === 'ko' ? '환율 차이 안내' : language === 'ja' ? '為替レートのご案内' : language === 'zh' ? '汇率提示' : language === 'es' ? 'Aviso' : 'Notice'}:</strong>{' '}
          {currencyT?.disclaimerNotice}
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdSlot slotId="currency-bottom-banner" />

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
          Real-time Privacy-first Financial & Utility Web Services | Multi-language Supported
        </p>
      </footer>
    </div>
  );
};
