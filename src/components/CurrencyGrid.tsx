import React, { useState } from 'react';
import { DEFAULT_CURRENCIES, ADDITIONAL_CURRENCIES, CurrencyInfo, RatesData } from '../utils/currencyRates';
import { useLanguage } from '../i18n/LanguageContext';
import { TrendingUp, TrendingDown, CheckCircle, PlusCircle, HelpCircle, Info } from 'lucide-react';

interface CurrencyGridProps {
  amount: number;
  baseCurrency: string;
  ratesData: RatesData | null;
  selectedTarget: string;
  onSelectTarget: (code: string) => void;
  onCurrencyInputChange: (code: string, newAmount: number) => void;
}

export const CurrencyGrid: React.FC<CurrencyGridProps> = ({
  amount,
  baseCurrency,
  ratesData,
  selectedTarget,
  onSelectTarget,
  onCurrencyInputChange
}) => {
  const { t } = useLanguage();
  const currencyT = t.currency;

  const [activeCurrencies, setActiveCurrencies] = useState<CurrencyInfo[]>(DEFAULT_CURRENCIES);
  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);

  if (!ratesData) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>환율 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  const { rates, usdRates, usdPrevRates } = ratesData;

  // Currencies remaining to add
  const availableToAdd = ADDITIONAL_CURRENCIES.filter(
    (addC) => !activeCurrencies.some((curr) => curr.code === addC.code)
  );

  const handleAddCurrency = (curr: CurrencyInfo) => {
    setActiveCurrencies([...activeCurrencies, curr]);
    setShowAddMenu(false);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            {currencyT?.allCurrenciesTitle || '📊 주요 국가 환율 한눈에 보기'}
          </h2>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            title="변동폭 설명 보기"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-color)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <HelpCircle size={18} />
          </button>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {currencyT?.selectChartNotice || '💡 수치를 직접 수정하면 모든 환율이 실시간 계산됩니다.'}
        </span>
      </div>

      {/* Day-over-Day Change Explanation Banner */}
      {showExplanation && (
        <div
          className="glass-card"
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
        >
          <Info size={16} color="var(--accent-color)" style={{ flexShrink: 0 }} />
          <div>
            <strong>💡 변동폭 설명:</strong> 전일 대비 변동폭 수치와 비율(%)은 국제 금융 표준인 <strong>1 달러 ($1.00 USD) 환율 기준</strong> 전날 대비 상승(<span style={{ color: '#ef4444', fontWeight: 700 }}>🔴 +</span>)/하락(<span style={{ color: '#3b82f6', fontWeight: 700 }}>🔵 -</span>) 변동량을 나타냅니다.
          </div>
        </div>
      )}

      {/* Currency Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {activeCurrencies.map((c) => {
          const isBase = c.code === baseCurrency;
          const isSelected = c.code === selectedTarget;

          // Convert current rate & prev rate for base currency
          const rate = rates[c.code] || 1;
          const convertedVal = amount * rate;

          // Day-over-Day Change Math based strictly on 1 USD ($1.00) Benchmark
          const usdRate = usdRates[c.code] || ratesData.rates[c.code] || 1;
          const usdPrevRate = usdPrevRates[c.code] || usdRate;
          const changeVal = usdRate - usdPrevRate;
          const changePct = usdPrevRate > 0 ? (changeVal / usdPrevRate) * 100 : 0;
          const isUp = changeVal >= 0;
          const isUsd = c.code === 'USD';

          const localizedName = currencyT?.currencyNames?.[c.code] || c.code;

          const isZeroDecimal = ['KRW', 'JPY', 'VND', 'IDR'].includes(c.code);
          const decimals = isZeroDecimal ? 0 : 2;

          // Formatted input value for smooth display
          const displayVal = Number.isInteger(convertedVal)
            ? String(convertedVal)
            : convertedVal.toFixed(decimals);

          return (
            <div
              key={c.code}
              className="glass-card"
              onClick={() => onSelectTarget(c.code)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                padding: '1.1rem',
                border: isSelected ? '2px solid var(--accent-color)' : isBase ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)',
                background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--card-bg)',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 8px 24px rgba(99, 102, 241, 0.2)' : 'none'
              }}
            >
              {isSelected && (
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: 'var(--accent-color)' }}>
                  <CheckCircle size={16} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {c.code} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>({c.symbol})</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {localizedName}
                  </div>
                </div>
              </div>

              {/* Two-Way Interactive Amount Input inside Card */}
              <div style={{ position: 'relative', margin: '0.5rem 0' }}>
                <input
                  type="number"
                  step={isZeroDecimal ? '1' : '0.01'}
                  value={displayVal}
                  onClick={(e) => e.stopPropagation()} // don't toggle card selection when clicking input
                  onChange={(e) => {
                    e.stopPropagation();
                    const newAmount = Math.max(0, Number(e.target.value));
                    onCurrencyInputChange(c.code, newAmount);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.2rem 0.5rem 0.65rem',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: isBase ? 'rgba(99, 102, 241, 0.15)' : 'var(--editor-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none'
                  }}
                >
                  {c.symbol}
                </span>
              </div>

              {/* Rate & Day-over-Day Change (+/- against 1 USD Benchmark) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  1 USD = {usdRate.toLocaleString(undefined, { minimumFractionDigits: isZeroDecimal ? 2 : 4, maximumFractionDigits: isZeroDecimal ? 2 : 4 })} {c.symbol}
                </span>

                {isUsd ? (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, background: 'rgba(148, 163, 184, 0.15)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
                    1 USD 기준
                  </span>
                ) : (
                  <div
                    title="전일 대비 변동폭 (1 USD 기준)"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '6px',
                      fontWeight: 700,
                      background: isUp ? 'rgba(239, 68, 68, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                      color: isUp ? '#ef4444' : '#3b82f6'
                    }}
                  >
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? '+' : ''}{changeVal.toFixed(c.code === 'KRW' || c.code === 'VND' || c.code === 'IDR' ? 1 : 3)} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add New Currency Button Card */}
        <div
          className="glass-card"
          onClick={() => setShowAddMenu(!showAddMenu)}
          style={{
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px dashed var(--accent-color)',
            background: 'rgba(99, 102, 241, 0.05)',
            color: 'var(--accent-color)',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <PlusCircle size={28} style={{ marginBottom: '0.4rem' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>+ 국가 통화 추가하기</span>

          {/* Add Currency Dropdown Menu */}
          {showAddMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 50,
                marginTop: '0.5rem',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.75rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                maxHeight: '220px',
                overflowY: 'auto'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                추가할 통화 선택:
              </div>
              {availableToAdd.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '0.5rem' }}>
                  모든 통화가 추가되었습니다.
                </div>
              ) : (
                availableToAdd.map((addC) => (
                  <div
                    key={addC.code}
                    onClick={() => handleAddCurrency(addC)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{addC.flag}</span>
                    <span>{addC.code}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({currencyT?.currencyNames?.[addC.code] || addC.code})</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
