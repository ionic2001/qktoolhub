import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Landmark, PiggyBank } from 'lucide-react';

interface BankDiscountCalculatorProps {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  currentRate: number;
}

export const BankDiscountCalculator: React.FC<BankDiscountCalculatorProps> = ({
  amount,
  baseCurrency,
  targetCurrency,
  currentRate
}) => {
  const { t } = useLanguage();
  const currencyT = t.currency;

  const [discountPercent, setDiscountPercent] = useState<number>(80); // Default 80% preferential rate

  // Standard bank spread markup (typically ~1.75% for major currencies)
  const spreadPercent = 0.0175;
  const rawSpread = currentRate * spreadPercent;
  
  // Discounted fee
  const actualSpread = rawSpread * (1 - discountPercent / 100);
  const finalRate = currentRate + actualSpread;
  const noDiscountRate = currentRate + rawSpread;

  const totalPayable = amount * finalRate;
  const noDiscountPayable = amount * noDiscountRate;
  const estimatedSavings = noDiscountPayable - totalPayable;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Landmark size={22} color="var(--accent-color)" />
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {currencyT?.bankDiscountTitle || '🏦 은행별 환율 우대율 (수수료 할인) 계산기'}
        </h2>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {currencyT?.bankDiscountSubtitle || '주요 시중은행(신한, 국민, 우리, 하나 등) 환율 우대 쿠폰 적용 시 실제 절약되는 환전 금액'}
      </p>

      {/* Discount Rate Buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
          {currencyT?.preferentialRate || '우대율 선택'}
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[50, 70, 80, 90, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => setDiscountPercent(pct)}
              style={{
                flex: 1,
                minWidth: '60px',
                padding: '0.6rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: discountPercent === pct ? 700 : 500,
                borderRadius: '8px',
                border: discountPercent === pct ? '1.5px solid var(--accent-color)' : '1px solid var(--border-color)',
                background: discountPercent === pct ? 'var(--accent-color)' : 'var(--card-bg)',
                color: discountPercent === pct ? '#ffffff' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {pct}% {pct === 90 ? '🔥' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* Total Payable */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '1.1rem', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            {currencyT?.totalPayable || '실제 예상 지불액'} ({discountPercent}% 우대 적용)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-color)' }}>
            {totalPayable.toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
            <span style={{ fontSize: '0.9rem' }}>{baseCurrency}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            우대 적용 환율: 1 {targetCurrency} = {finalRate.toFixed(2)} {baseCurrency} (매매기준율 + 우대 수수료)
          </div>
        </div>

        {/* Estimated Savings */}
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.1rem', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
            <PiggyBank size={16} />
            {currencyT?.estimatedSavings || '수수료 절약 예상 금액'}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
            +{estimatedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
            <span style={{ fontSize: '0.9rem' }}>{baseCurrency} 절약</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            우대 미적용 대비 혜택 금액
          </div>
        </div>
      </div>
    </div>
  );
};
