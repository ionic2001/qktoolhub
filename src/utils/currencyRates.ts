export interface CurrencyInfo {
  code: string;
  nameKey: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'KRW', nameKey: 'krw', symbol: '₩', flag: '🇰🇷' },
  { code: 'USD', nameKey: 'usd', symbol: '$', flag: '🇺🇸' },
  { code: 'JPY', nameKey: 'jpy', symbol: '¥', flag: '🇯🇵' },
  { code: 'EUR', nameKey: 'eur', symbol: '€', flag: '🇪🇺' },
  { code: 'CNY', nameKey: 'cny', symbol: '¥', flag: '🇨🇳' },
  { code: 'GBP', nameKey: 'gbp', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', nameKey: 'cad', symbol: '$', flag: '🇨🇦' },
  { code: 'AUD', nameKey: 'aud', symbol: '$', flag: '🇦🇺' },
  { code: 'CHF', nameKey: 'chf', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'HKD', nameKey: 'hkd', symbol: '$', flag: '🇭🇰' },
  { code: 'SGD', nameKey: 'sgd', symbol: '$', flag: '🇸🇬' },
  { code: 'VND', nameKey: 'vnd', symbol: '₫', flag: '🇻🇳' },
];

export interface RatesData {
  base: string;
  rates: Record<string, number>;
  prevRates: Record<string, number>;
  lastUpdated: string;
}

export interface ChartPoint {
  date: string;
  rate: number;
}

// Fallback rates baseline against 1 USD
const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1335.5,
  JPY: 145.2,
  EUR: 0.92,
  CNY: 7.12,
  GBP: 0.78,
  CAD: 1.36,
  AUD: 1.51,
  CHF: 0.86,
  HKD: 7.81,
  SGD: 1.34,
  VND: 24850.0,
};

// Fallback slight variation for yesterday's rate (for +/- demo)
const FALLBACK_PREV_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1330.2, // +5.30 (+0.40%)
  JPY: 146.1,  // -0.90 (-0.62%)
  EUR: 0.918,  // +0.002 (+0.22%)
  CNY: 7.10,   // +0.02 (+0.28%)
  GBP: 0.776,  // +0.004 (+0.52%)
  CAD: 1.365,  // -0.005 (-0.37%)
  AUD: 1.505,  // +0.005 (+0.33%)
  CHF: 0.862,  // -0.002 (-0.23%)
  HKD: 7.805,  // +0.005 (+0.06%)
  SGD: 1.342,  // -0.002 (-0.15%)
  VND: 24800.0 // +50.0 (+0.20%)
};

/**
 * Fetch real-time exchange rates with fallback
 */
export async function fetchExchangeRates(baseCurrency: string = 'KRW'): Promise<RatesData> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();

    const rates: Record<string, number> = data.rates || {};
    const lastUpdated = data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : new Date().toLocaleDateString();

    // Try fetching yesterday's rates from Frankfurter for accurate day-over-day +/-
    let prevRates: Record<string, number> = {};
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];
      const frankRes = await fetch(`https://api.frankfurter.app/${dateStr}?from=${baseCurrency}`);
      if (frankRes.ok) {
        const frankData = await frankRes.json();
        prevRates = frankData.rates || {};
        prevRates[baseCurrency] = 1;
      }
    } catch {
      // Ignore frankfurter error, fallback will handle
    }

    // Fill missing prev rates with synthetic 0.2% fluctuation baseline if API lacks
    SUPPORTED_CURRENCIES.forEach(c => {
      if (!prevRates[c.code]) {
        const currentRate = rates[c.code] || convertViaUsd(baseCurrency, c.code, FALLBACK_RATES);
        const variation = (c.code.charCodeAt(0) % 2 === 0 ? 1 : -1) * 0.003;
        prevRates[c.code] = currentRate * (1 - variation);
      }
    });

    return {
      base: baseCurrency,
      rates,
      prevRates,
      lastUpdated,
    };
  } catch (error) {
    // Fallback mode if network error occurs
    const baseUsd = FALLBACK_RATES[baseCurrency] || 1;
    const rates: Record<string, number> = {};
    const prevRates: Record<string, number> = {};

    SUPPORTED_CURRENCIES.forEach(c => {
      rates[c.code] = (FALLBACK_RATES[c.code] || 1) / baseUsd;
      prevRates[c.code] = (FALLBACK_PREV_RATES[c.code] || 1) / baseUsd;
    });

    return {
      base: baseCurrency,
      rates,
      prevRates,
      lastUpdated: new Date().toLocaleDateString(),
    };
  }
}

function convertViaUsd(from: string, to: string, rateMap: Record<string, number>): number {
  const fromUsd = rateMap[from] || 1;
  const toUsd = rateMap[to] || 1;
  return toUsd / fromUsd;
}

/**
 * Generate historical trend data for chart (7D, 1M, 3M, 1Y)
 */
export async function fetchHistoricalTrend(base: string, target: string, timeframe: '7D' | '1M' | '3M' | '1Y'): Promise<ChartPoint[]> {
  try {
    const daysMap: Record<string, number> = { '7D': 7, '1M': 30, '3M': 90, '1Y': 365 };
    const days = daysMap[timeframe] || 30;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const res = await fetch(`https://api.frankfurter.app/${startStr}..${endStr}?from=${base}&to=${target}`);
    if (res.ok) {
      const data = await res.json();
      const points: ChartPoint[] = [];
      if (data.rates) {
        Object.keys(data.rates).sort().forEach(d => {
          points.push({
            date: d.slice(5), // 'MM-DD'
            rate: data.rates[d][target]
          });
        });
      }
      if (points.length >= 3) return points;
    }
  } catch {
    // Ignore and fallback to curve generator below
  }

  // Fallback synthetic smooth curve generator for chart visualization
  return generateSyntheticTrendPoints(base, target, timeframe);
}

function generateSyntheticTrendPoints(base: string, target: string, timeframe: '7D' | '1M' | '3M' | '1Y'): ChartPoint[] {
  const baseUsd = FALLBACK_RATES[base] || 1;
  const targetUsd = FALLBACK_RATES[target] || 1;
  const currentRate = targetUsd / baseUsd;

  const countMap = { '7D': 7, '1M': 15, '3M': 20, '1Y': 24 };
  const pointCount = countMap[timeframe] || 15;
  const points: ChartPoint[] = [];

  const now = new Date();
  for (let i = pointCount - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * (timeframe === '1Y' ? 15 : timeframe === '3M' ? 4 : timeframe === '1M' ? 2 : 1));
    const dateLabel = `${d.getMonth() + 1}/${d.getDate()}`;
    
    // Wave Math for smooth realistic chart curve
    const wave = Math.sin(i * 0.6) * 0.015 + Math.cos(i * 0.3) * 0.01;
    const rateVal = currentRate * (1 - (i / pointCount) * 0.02 + wave);
    
    points.push({
      date: dateLabel,
      rate: Number(rateVal.toFixed(target === 'KRW' || target === 'VND' || target === 'JPY' ? 2 : 4))
    });
  }

  return points;
}
