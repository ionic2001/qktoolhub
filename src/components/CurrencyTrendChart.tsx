import React, { useState, useEffect } from 'react';
import { fetchHistoricalTrend, ChartPoint, SUPPORTED_CURRENCIES } from '../utils/currencyRates';
import { useLanguage } from '../i18n/LanguageContext';
import { TrendingUp, Clock } from 'lucide-react';

interface CurrencyTrendChartProps {
  baseCurrency: string;
  targetCurrency: string;
}

export const CurrencyTrendChart: React.FC<CurrencyTrendChartProps> = ({
  baseCurrency,
  targetCurrency
}) => {
  const { t } = useLanguage();
  const currencyT = t.currency;

  const [timeframe, setTimeframe] = useState<'7D' | '1M' | '3M' | '1Y'>('1M');
  const [points, setPoints] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchHistoricalTrend(baseCurrency, targetCurrency, timeframe).then((data) => {
      if (isMounted) {
        setPoints(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [baseCurrency, targetCurrency, timeframe]);

  const targetInfo = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrency) || { flag: '', symbol: '', code: targetCurrency };
  const targetName = currencyT?.currencyNames?.[targetCurrency] || targetCurrency;

  // Chart Min/Max math
  const rates = points.map(p => p.rate);
  const minRate = rates.length ? Math.min(...rates) : 0;
  const maxRate = rates.length ? Math.max(...rates) : 1;
  const rateRange = maxRate - minRate || 1;

  // SVG Chart Dimensions
  const chartWidth = 700;
  const chartHeight = 220;
  const padding = 35;

  const getX = (idx: number) => {
    if (points.length <= 1) return padding;
    return padding + (idx / (points.length - 1)) * (chartWidth - padding * 2);
  };

  const getY = (rate: number) => {
    return chartHeight - padding - ((rate - minRate) / rateRange) * (chartHeight - padding * 2);
  };

  // Generate SVG Path
  const svgPath = points.length > 1
    ? points.reduce((acc, p, idx) => {
        const x = getX(idx);
        const y = getY(p.rate);
        return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '')
    : '';

  const areaPath = svgPath ? `${svgPath} L ${getX(points.length - 1)} ${chartHeight - padding} L ${getX(0)} ${chartHeight - padding} Z` : '';

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="var(--accent-color)" />
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {targetInfo.flag} {targetName} ({targetCurrency}) {currencyT?.trendChartTitle || '환율 변동 추이 차트'}
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            1 {baseCurrency} ↔ {targetCurrency} 환율 히스토리
          </p>
        </div>

        {/* Timeframe Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(148, 163, 184, 0.1)', padding: '0.25rem', borderRadius: '8px' }}>
          {(['7D', '1M', '3M', '1Y'] as const).map((tf) => {
            const isActive = timeframe === tf;
            const labelMap = {
              '7D': currencyT?.timeframes?.d7 || '7일',
              '1M': currencyT?.timeframes?.m1 || '1개월',
              '3M': currencyT?.timeframes?.m3 || '3개월',
              '1Y': currencyT?.timeframes?.y1 || '1년',
            };

            return (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-color)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {labelMap[tf]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      {loading ? (
        <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <Clock size={18} style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
          차트 데이터를 불러오는 중...
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.25, 0.5, 0.75].map((ratio) => {
              const yVal = padding + ratio * (chartHeight - padding * 2);
              return (
                <line
                  key={ratio}
                  x1={padding}
                  y1={yVal}
                  x2={chartWidth - padding}
                  y2={yVal}
                  stroke="rgba(148, 163, 184, 0.15)"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Gradient Fill under Line */}
            {areaPath && <path d={areaPath} fill="url(#chartGradient)" />}

            {/* Smooth SVG Trend Line */}
            {svgPath && (
              <path
                d={svgPath}
                fill="none"
                stroke="var(--accent-color)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Points */}
            {points.map((p, idx) => {
              const cx = getX(idx);
              const cy = getY(p.rate);
              const isHovered = hoveredPoint?.date === p.date;

              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 3.5}
                    fill={isHovered ? '#ffffff' : 'var(--accent-color)'}
                    stroke="var(--accent-color)"
                    strokeWidth={isHovered ? 3 : 1}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip Popup on Hover */}
          {hoveredPoint && (
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div><strong>날짜:</strong> {hoveredPoint.date}</div>
              <div><strong>환율:</strong> 1 {baseCurrency} = {hoveredPoint.rate} {targetCurrency}</div>
            </div>
          )}

          {/* Min & Max Range Indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            <span>최저: {minRate} {targetCurrency}</span>
            <span>최고: {maxRate} {targetCurrency}</span>
          </div>
        </div>
      )}
    </div>
  );
};
