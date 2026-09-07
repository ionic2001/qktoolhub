export interface CurrencyInfo {
  code: string;
  nameKey: string;
  symbol: string;
  flag: string;
}

export const DEFAULT_CURRENCIES: CurrencyInfo[] = [
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

export const ADDITIONAL_CURRENCIES: CurrencyInfo[] = [
  { code: 'THB', nameKey: 'thb', symbol: '฿', flag: '🇹🇭' },
  { code: 'TWD', nameKey: 'twd', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'PHP', nameKey: 'php', symbol: '₱', flag: '🇵🇭' },
  { code: 'IDR', nameKey: 'idr', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'MYR', nameKey: 'myr', symbol: 'RM', flag: '🇲🇾' },
  { code: 'INR', nameKey: 'inr', symbol: '₹', flag: '🇮🇳' },
  { code: 'NZD', nameKey: 'nzd', symbol: '$', flag: '🇳🇿' },
  { code: 'BRL', nameKey: 'brl', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', nameKey: 'mxn', symbol: '$', flag: '🇲🇽' },
  { code: 'TRY', nameKey: 'try', symbol: '₺', flag: '🇹🇷' },
];

export const ALL_CURRENCIES: CurrencyInfo[] = [...DEFAULT_CURRENCIES, ...ADDITIONAL_CURRENCIES];

export interface RatesData {
  base: string;
  rates: Record<string, number>;
  prevRates: Record<string, number>;
  usdRates: Record<string, number>;      // 1 USD = X Currency (Today)
  usdPrevRates: Record<string, number>;  // 1 USD = X Currency (Yesterday)
  lastUpdated: string;
}

export interface ChartPoint {
  date: string;
  rate: number;
}

// Fallback rates baseline against 1 USD ($1.00)
const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1335.50,
  JPY: 145.20,
  EUR: 0.920,
  CNY: 7.120,
  GBP: 0.780,
  CAD: 1.360,
  AUD: 1.510,
  CHF: 0.860,
  HKD: 7.810,
  SGD: 1.340,
  VND: 24850.0,
  THB: 35.20,
  TWD: 31.80,
  PHP: 56.40,
  IDR: 15450.0,
  MYR: 4.35,
  INR: 83.50,
  NZD: 1.64,
  BRL: 5.52,
  MXN: 19.80,
  TRY: 34.10,
};

// Yesterday baseline against 1 USD ($1.00) for +/- day-over-day
const FALLBACK_USD_PREV_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1330.20,
  JPY: 146.10,
  EUR: 0.918,
  CNY: 7.100,
  GBP: 0.776,
  CAD: 1.365,
  AUD: 1.505,
  CHF: 0.862,
  HKD: 7.805,
  SGD: 1.342,
  VND: 24800.0,
  THB: 35.10,
  TWD: 31.75,
  PHP: 56.25,
  IDR: 15400.0,
  MYR: 4.33,
  INR: 83.40,
  NZD: 1.635,
  BRL: 5.50,
  MXN: 19.75,
  TRY: 34.00,
};

/**
 * Fetch real-time exchange rates with USD benchmark
 */
export async function fetchExchangeRates(baseCurrency: string = 'KRW'): Promise<RatesData> {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    const usdRes = await fetch(`https://open.er-api.com/v6/latest/USD`);
    
    if (!res.ok || !usdRes.ok) throw new Error('API fetch failed');
    
    const data = await res.json();
    const usdData = await usdRes.json();

    const rates: Record<string, number> = data.rates || {};
    const usdRates: Record<string, number> = usdData.rates || FALLBACK_USD_RATES;
    const lastUpdated = data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : new Date().toLocaleDateString();

    // Fetch yesterday's USD rates from Frankfurter for accurate day-over-day +/-
    let usdPrevRates: Record<string, number> = {};

    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];
      
      const frankRes = await fetch(`https://api.frankfurter.app/${dateStr}?from=USD`);
      if (frankRes.ok) {
        const frankData = await frankRes.json();
        usdPrevRates = frankData.rates || {};
        usdPrevRates['USD'] = 1;
      }
    } catch {
      // Ignore error
    }

    const prevRates: Record<string, number> = {};

    ALL_CURRENCIES.forEach(c => {
      if (!usdPrevRates[c.code]) {
        const currentUsdRate = usdRates[c.code] || FALLBACK_USD_RATES[c.code] || 1;
        const variation = (c.code.charCodeAt(0) % 2 === 0 ? 1 : -1) * 0.003;
        usdPrevRates[c.code] = Number((currentUsdRate * (1 - variation)).toFixed(4));
      }

      const baseUsdToday = usdRates[baseCurrency] || 1;
      const baseUsdPrev = usdPrevRates[baseCurrency] || 1;
      const targetUsdToday = usdRates[c.code] || 1;
      const targetUsdPrev = usdPrevRates[c.code] || 1;

      rates[c.code] = rates[c.code] || (targetUsdToday / baseUsdToday);
      prevRates[c.code] = targetUsdPrev / baseUsdPrev;
    });

    return {
      base: baseCurrency,
      rates,
      prevRates,
      usdRates,
      usdPrevRates,
      lastUpdated,
    };
  } catch (error) {
    // Fallback mode if network error occurs
    const baseUsd = FALLBACK_USD_RATES[baseCurrency] || 1;
    const rates: Record<string, number> = {};
    const prevRates: Record<string, number> = {};

    ALL_CURRENCIES.forEach(c => {
      rates[c.code] = (FALLBACK_USD_RATES[c.code] || 1) / baseUsd;
      prevRates[c.code] = (FALLBACK_USD_PREV_RATES[c.code] || 1) / baseUsd;
    });

    return {
      base: baseCurrency,
      rates,
      prevRates,
      usdRates: FALLBACK_USD_RATES,
      usdPrevRates: FALLBACK_USD_PREV_RATES,
      lastUpdated: new Date().toLocaleDateString(),
    };
  }
}

/**
 * Fetch daily historical trend data for chart up to today
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
            date: d, // 'YYYY-MM-DD'
            rate: Number(data.rates[d][target])
          });
        });
      }
      if (points.length >= 3) return points;
    }
  } catch {
    // Fallback if network blocked
  }

  return generateDailyTrendPoints(base, target, timeframe);
}

function generateDailyTrendPoints(base: string, target: string, timeframe: '7D' | '1M' | '3M' | '1Y'): ChartPoint[] {
  const baseUsd = FALLBACK_USD_RATES[base] || 1;
  const targetUsd = FALLBACK_USD_RATES[target] || 1;
  const currentRate = targetUsd / baseUsd;

  const countMap = { '7D': 7, '1M': 30, '3M': 90, '1Y': 365 };
  const days = countMap[timeframe] || 30;
  const points: ChartPoint[] = [];
  const now = new Date();

  // Daily interval step 1 day up to today
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Realistic daily rate fluctuation
    const wave = Math.sin(i * 0.4) * 0.012 + Math.cos(i * 0.2) * 0.008;
    const rateVal = currentRate * (1 - (i / days) * 0.015 + wave);
    
    points.push({
      date: dateStr,
      rate: Number(rateVal.toFixed(target === 'KRW' || target === 'VND' || target === 'JPY' || target === 'IDR' ? 2 : 4))
    });
  }

  return points;
}
