import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { CurrencyGrid } from '../components/CurrencyGrid';
import { CurrencyTrendChart } from '../components/CurrencyTrendChart';
import { BankDiscountCalculator } from '../components/BankDiscountCalculator';
import { fetchExchangeRates, RatesData, SUPPORTED_CURRENCIES } from '../utils/currencyRates';
import { ArrowLeft, ArrowRightLeft, RefreshCw, Sparkles } from 'lucide-react';

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

  const currentRate = ratesData?.rates[targetCurrency] || 1;

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
          새로고침
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
          {currencyT?.subtitle || '전 세계 12개 주요 통화 실시간 변환, 전일 대비 변동폭 (+/-) 및 기간별 그래프 추이 분석'}
        </p>
      </section>

      {/* Top Banner Ad */}
      <AdSlot slotId="currency-top-banner" />

      {/* Converter Input Section */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          {/* Base Currency Select & Input */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              {currencyT?.baseCurrencyLabel || '기준 통화 선택'}
            </label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 700
              }}
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({currencyT?.currencyNames?.[c.code] || c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              {currencyT?.amountLabel || '변환 금액 입력'}
            </label>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: 800
              }}
            />
          </div>
        </div>
      </div>

      {/* Multi-Currency Overview Grid (12 Currencies with +/- Day Change) */}
      <CurrencyGrid
        amount={amount}
        baseCurrency={baseCurrency}
        ratesData={ratesData}
        selectedTarget={targetCurrency}
        onSelectTarget={(code) => setTargetCurrency(code)}
      />

      {/* Interactive Trend Chart for Selected Target Currency */}
      <CurrencyTrendChart
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
      />

      {/* Bank Fee Discount Calculator */}
      <BankDiscountCalculator
        amount={amount}
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
        currentRate={currentRate}
      />

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
