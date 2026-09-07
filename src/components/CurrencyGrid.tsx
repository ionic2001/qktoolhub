import React from 'react';
import { SUPPORTED_CURRENCIES, RatesData } from '../utils/currencyRates';
import { useLanguage } from '../i18n/LanguageContext';
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

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

  if (!ratesData) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>환율 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  const { rates, prevRates } = ratesData;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {currencyT?.allCurrenciesTitle || '📊 주요 국가 환율 한눈에 보기'}
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {currencyT?.selectChartNotice || '💡 수치를 직접 수정하면 모든 환율이 실시간 계산됩니다.'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {SUPPORTED_CURRENCIES.map((c) => {
          const isBase = c.code === baseCurrency;
          const isSelected = c.code === selectedTarget;

          // Convert current rate & prev rate
          const rate = rates[c.code] || 1;
          const prevRate = prevRates[c.code] || rate;
          const convertedVal = amount * rate;

          // Day-over-day change rate math
          const changeVal = rate - prevRate;
          const changePct = prevRate > 0 ? (changeVal / prevRate) * 100 : 0;
          const isUp = changeVal >= 0;

          const localizedName = currencyT?.currencyNames?.[c.code] || c.code;

          // Formatted input value for smooth display
          const displayVal = Number.isInteger(convertedVal)
            ? String(convertedVal)
            : convertedVal.toFixed(c.code === 'KRW' || c.code === 'VND' || c.code === 'JPY' ? 0 : 2);

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

              {/* Rate & Day-over-Day Change (+/-) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  1 {baseCurrency} = {rate.toFixed(c.code === 'KRW' || c.code === 'VND' ? 2 : 4)}
                </span>

                {!isBase && (
                  <div
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
                    {isUp ? '+' : ''}{changeVal.toFixed(c.code === 'KRW' || c.code === 'VND' ? 1 : 3)} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
