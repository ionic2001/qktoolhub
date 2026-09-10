import { seoContent, localUrl } from '../seo/catalog';
import { ToolIntro } from '../components/ToolIntro';
import toolIntro from '../i18n/toolIntro.json';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdSlot } from '../components/AdSlot';
import { CurrencyGrid } from '../components/CurrencyGrid';
import { fetchExchangeRates, getInitialRatesData, RatesData } from '../utils/currencyRates';
import { ArrowLeft, RefreshCw, Info, HelpCircle } from 'lucide-react';

export const CurrencyConverterPage: React.FC = () => {
  const { t, language } = useLanguage();

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
  const [ratesData, setRatesData] = useState<RatesData>(() => getInitialRatesData(initialBaseMap[language] || 'KRW'));
  const [loading, setLoading] = useState<boolean>(false);

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
        <a
          className="btn-tool"
          href={localUrl('/', language)}
          style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
        >
          <ArrowLeft size={16} />
          {t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}
        </a>

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

      <ToolIntro badge={toolIntro[language].currencyBadge} title={toolIntro[language].currencyTitle} description={toolIntro[language].currencyDescription} />

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
          {seoContent[language].currency[0][1]}
        </div>
      </div>

      {/* SEO Content Section (Rich Keyword Information for Google & Naver Search) */}
      <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HelpCircle size={20} color="var(--accent-color)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            {currencyT?.faqTitle || '💡 환율 변환기 이용 안내 및 FAQ'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {currencyT?.faq1Q || 'Q. 매매기준율이란 무엇인가요?'}
            </h3>
            <p>
              {seoContent[language].currency[0][1]}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {currencyT?.faq2Q || 'Q. 1만엔(JPY 10,000) 등 주요 퀵 입력은 어떻게 이용하나요?'}
            </h3>
            <p>
              {currencyT?.faq2A || '상단의 퀵 입력 버튼(예: $100, 10만원, 1만엔 등)을 클릭하시면 원클릭으로 해당 금액과 통화가 즉시 적용되어 전 세계 모든 주요 통화의 최신 수치가 동시 계산됩니다.'}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <AdSlot slotId="currency-bottom-banner" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
