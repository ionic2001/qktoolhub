import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { CurrencyGrid } from '../components/CurrencyGrid';
import { fetchExchangeRates, RatesData } from '../utils/currencyRates';
import { ArrowLeft, RefreshCw, Sparkles, Info, HelpCircle } from 'lucide-react';

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

  // Dynamic SEO Head Updates for Google & Naver Search Engines
  useEffect(() => {
    const seoMap: Record<string, { title: string; desc: string; keywords: string }> = {
      ko: {
        title: 'QK Tool Hub | 실시간 환율 계산기 - 달러, 엔화, 유로, 원화 환전 연산',
        desc: '전 세계 주요 국가 실시간 매매기준율 환율 계산기. 미국 달러($), 일본 엔화(1만엔), 유로(€), 원화(₩), 중국 위안화, 태국 바트, 대만 달러 환전 금액 실시간 변환.',
        keywords: '환율 계산기, 실시간 환율, 원달러 환율, 엔화 환율, 1만엔 환율, 유로 환율, 환전 계산기, 달러 환율, 태국 바트 환율, 대만 달러 환율, currency converter, exchange rate calculator'
      },
      en: {
        title: 'QK Tool Hub | Real-time Currency Converter - USD, EUR, JPY, KRW Exchange Rates',
        desc: 'Convert real-time mid-market exchange rates for major global currencies including USD, EUR, JPY, KRW, CNY, GBP, THB, and TWD instantly.',
        keywords: 'currency converter, exchange rate calculator, USD to EUR, USD to JPY, USD to KRW, real time exchange rates, forex converter'
      },
      ja: {
        title: 'QK Tool Hub | リアルタイム為替レート計算機 - 米ドル・日本円・ユーロ・ウォン',
        desc: '世界主要国のリアルタイム為替レートを一括計算。米ドル、日本円(1万円)、ユーロ、韓国ウォン、人民元の最新レート換算。',
        keywords: '為替レート計算機, リアルタイム為替, 米ドル, 日本円, 1万円, ユーロ, 韓国ウォン, 通貨換算'
      },
      zh: {
        title: 'QK Tool Hub | 实时汇率换算器 - 美元, 日元, 欧元, 韩元',
        desc: '实时换算全球主要国家与地区汇率。支持美元、日元、欧元、韩元、人民币、泰铢、新台币等实时汇率一键计算。',
        keywords: '汇率换算器, 实时汇率, 美元汇率, 日元汇率, 欧元汇率, 韩元汇率, 外汇换算'
      },
      es: {
        title: 'QK Tool Hub | Conversor de Divisas en Tiempo Real - USD, JPY, EUR, KRW',
        desc: 'Calculadora de tipos de cambio en tiempo real para las principales monedas del mundo: USD, EUR, JPY, KRW, CNY, GBP, THB, TWD.',
        keywords: 'conversor de divisas, calculadora de tipo de cambio, USD a EUR, USD a JPY, cambio de moneda'
      }
    };

    const currentSeo = seoMap[language] || seoMap.ko;
    document.title = currentSeo.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.desc);

    // Update Meta Keywords
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', currentSeo.keywords);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://qktoolhub.com/currency-converter');

    // Inject Schema.org JSON-LD for Search Rich Snippets
    const existingScript = document.getElementById('currency-jsonld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'currency-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      'name': currentSeo.title,
      'url': 'https://qktoolhub.com/currency-converter',
      'description': currentSeo.desc,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    });
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('currency-jsonld');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [language]);

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

      {/* SEO Content Section (Rich Keyword Information for Google & Naver Search) */}
      <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HelpCircle size={20} color="var(--accent-color)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            {language === 'ko' ? '💡 환율 변환기 이용 안내 및 FAQ' : '💡 Currency Exchange Guide & FAQ'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Q. 매매기준율이란 무엇인가요?
            </h3>
            <p>
              매매기준율(Mid-Market Rate)은 국제 외환시장에서 금융기관 간 거래 시 적용되는 수수료가 포함되지 않은 순수한 시장 기준 환율입니다. 본 서비스는 유럽중앙은행(ECB) 및 국제 공식 데이터를 바탕으로 당일 매매기준율을 제공합니다.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Q. 1만엔(JPY 10,000) 등 주요 퀵 입력은 어떻게 이용하나요?
            </h3>
            <p>
              상단의 퀵 입력 버튼(예: $100, 10만원, 1만엔 등)을 클릭하시면 원클릭으로 해당 금액과 통화가 즉시 적용되어 전 세계 모든 주요 통화의 최신 수치가 동시 계산됩니다.
            </p>
          </div>
        </div>
      </section>

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
