export interface CurrencyInfo {
  code: string;
  nameKey: string;
  symbol: string;
  flag: string;
  regions: string[];
  aliases?: string[];
}

const currency = (code: string, symbol: string, flag: string, regions: string[], aliases: string[] = []): CurrencyInfo => ({
  code,
  nameKey: code.toLowerCase(),
  symbol,
  flag,
  regions,
  aliases,
});

export const DEFAULT_CURRENCIES: CurrencyInfo[] = [
  currency('KRW', '₩', '🇰🇷', ['KR']),
  currency('USD', '$', '🇺🇸', ['US', 'EC', 'SV', 'PA', 'TL'], ['america', '미국']),
  currency('JPY', '¥', '🇯🇵', ['JP']),
  currency('EUR', '€', '🇪🇺', ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES']),
  currency('CNY', '¥', '🇨🇳', ['CN']),
  currency('GBP', '£', '🇬🇧', ['GB'], ['uk', 'britain', '영국']),
  currency('CAD', '$', '🇨🇦', ['CA']),
  currency('AUD', '$', '🇦🇺', ['AU']),
  currency('CHF', 'Fr', '🇨🇭', ['CH', 'LI']),
  currency('HKD', '$', '🇭🇰', ['HK']),
  currency('SGD', '$', '🇸🇬', ['SG']),
  currency('VND', '₫', '🇻🇳', ['VN']),
];

export const ADDITIONAL_CURRENCIES: CurrencyInfo[] = [
  currency('THB', '฿', '🇹🇭', ['TH']), currency('TWD', 'NT$', '🇹🇼', ['TW']),
  currency('PHP', '₱', '🇵🇭', ['PH']), currency('IDR', 'Rp', '🇮🇩', ['ID']),
  currency('MYR', 'RM', '🇲🇾', ['MY']), currency('INR', '₹', '🇮🇳', ['IN']),
  currency('NZD', '$', '🇳🇿', ['NZ']), currency('BRL', 'R$', '🇧🇷', ['BR']),
  currency('MXN', '$', '🇲🇽', ['MX']), currency('TRY', '₺', '🇹🇷', ['TR']),
  currency('AED', 'د.إ', '🇦🇪', ['AE'], ['uae', 'dubai', '두바이']),
  currency('SAR', '﷼', '🇸🇦', ['SA']), currency('QAR', '﷼', '🇶🇦', ['QA']),
  currency('KWD', 'د.ك', '🇰🇼', ['KW']), currency('BHD', 'د.ب', '🇧🇭', ['BH']),
  currency('OMR', '﷼', '🇴🇲', ['OM']), currency('JOD', 'د.ا', '🇯🇴', ['JO']),
  currency('ILS', '₪', '🇮🇱', ['IL']), currency('ZAR', 'R', '🇿🇦', ['ZA']),
  currency('EGP', 'E£', '🇪🇬', ['EG']), currency('MAD', 'DH', '🇲🇦', ['MA']),
  currency('NGN', '₦', '🇳🇬', ['NG']), currency('KES', 'KSh', '🇰🇪', ['KE']),
  currency('GHS', '₵', '🇬🇭', ['GH']), currency('TZS', 'TSh', '🇹🇿', ['TZ']),
  currency('UGX', 'USh', '🇺🇬', ['UG']), currency('ETB', 'Br', '🇪🇹', ['ET']),
  currency('XAF', 'FCFA', '🌍', ['CM', 'CF', 'TD', 'CG', 'GQ', 'GA']),
  currency('XOF', 'CFA', '🌍', ['BJ', 'BF', 'CI', 'GW', 'ML', 'NE', 'SN', 'TG']),
  currency('PLN', 'zł', '🇵🇱', ['PL']), currency('CZK', 'Kč', '🇨🇿', ['CZ']),
  currency('HUF', 'Ft', '🇭🇺', ['HU']), currency('RON', 'lei', '🇷🇴', ['RO']),
  currency('BGN', 'лв', '🇧🇬', ['BG']), currency('DKK', 'kr', '🇩🇰', ['DK']),
  currency('NOK', 'kr', '🇳🇴', ['NO']), currency('SEK', 'kr', '🇸🇪', ['SE']),
  currency('ISK', 'kr', '🇮🇸', ['IS']), currency('UAH', '₴', '🇺🇦', ['UA']),
  currency('RUB', '₽', '🇷🇺', ['RU']), currency('GEL', '₾', '🇬🇪', ['GE']),
  currency('KZT', '₸', '🇰🇿', ['KZ']), currency('UZS', 'soʻm', '🇺🇿', ['UZ']),
  currency('PKR', '₨', '🇵🇰', ['PK']), currency('BDT', '৳', '🇧🇩', ['BD']),
  currency('LKR', 'Rs', '🇱🇰', ['LK']), currency('NPR', '₨', '🇳🇵', ['NP']),
  currency('MMK', 'K', '🇲🇲', ['MM']), currency('KHR', '៛', '🇰🇭', ['KH']),
  currency('LAK', '₭', '🇱🇦', ['LA']), currency('MNT', '₮', '🇲🇳', ['MN']),
  currency('BND', '$', '🇧🇳', ['BN']), currency('MOP', 'MOP$', '🇲🇴', ['MO']),
  currency('FJD', '$', '🇫🇯', ['FJ']), currency('PGK', 'K', '🇵🇬', ['PG']),
  currency('CLP', '$', '🇨🇱', ['CL']), currency('COP', '$', '🇨🇴', ['CO']),
  currency('PEN', 'S/', '🇵🇪', ['PE']), currency('ARS', '$', '🇦🇷', ['AR']),
  currency('UYU', '$U', '🇺🇾', ['UY']), currency('PYG', '₲', '🇵🇾', ['PY']),
  currency('BOB', 'Bs', '🇧🇴', ['BO']), currency('CRC', '₡', '🇨🇷', ['CR']),
  currency('DOP', 'RD$', '🇩🇴', ['DO']), currency('GTQ', 'Q', '🇬🇹', ['GT']),
  currency('JMD', 'J$', '🇯🇲', ['JM']), currency('TTD', 'TT$', '🇹🇹', ['TT']),
  currency('XCD', 'EC$', '🌎', ['AG', 'DM', 'GD', 'KN', 'LC', 'VC']),
];

export const ALL_CURRENCIES: CurrencyInfo[] = [...DEFAULT_CURRENCIES, ...ADDITIONAL_CURRENCIES];
export const SUPPORTED_CURRENCIES: CurrencyInfo[] = ALL_CURRENCIES;

export interface RatesData {
  base: string;
  source: 'live' | 'reference-fallback';
  rates: Record<string, number>;
  prevRates: Record<string, number>;
  usdRates: Record<string, number>;      // 1 USD = X Currency (Today)
  usdPrevRates: Record<string, number>;  // 1 USD = X Currency (Yesterday)
  lastUpdated: string;
}

export function crossRateFromUsd(basePerUsd: number, targetPerUsd: number): number {
  if (!Number.isFinite(basePerUsd) || !Number.isFinite(targetPerUsd) || basePerUsd <= 0 || targetPerUsd <= 0) throw new Error('invalid rate');
  return targetPerUsd / basePerUsd;
}

export function convertCurrencyAmount(amount: number, rate: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(rate) || rate <= 0) throw new Error('invalid amount');
  return amount * rate;
}

export interface ChartPoint {
  date: string;
  rate: number;
}

// Fixed reference snapshot against 1 USD from ExchangeRate-API (2026-09-16).
// It keeps conversion usable during a network failure and is always labelled as non-current in the UI.
const FALLBACK_USD_RATES: Record<string, number> = {
  USD: 1.0,
  KRW: 1360.361778, JPY: 155.07604, EUR: 0.86671, CNY: 6.726834, GBP: 0.742032,
  CAD: 1.391261, AUD: 1.403148, CHF: 0.818951, HKD: 7.844364, SGD: 1.272718,
  VND: 25904.220782, THB: 33.294422, TWD: 31.840364, PHP: 62.869248,
  IDR: 17688.127123, MYR: 4.084433, INR: 95.989284, NZD: 1.737448,
  BRL: 5.150194, MXN: 17.157696, TRY: 48.664559,
  AED: 3.6725, SAR: 3.75, QAR: 3.64, KWD: 0.308429, BHD: 0.376, OMR: 0.384497, JOD: 0.709,
  ILS: 3.040812, ZAR: 16.265398, EGP: 52.063931, MAD: 9.479216, NGN: 1328.880494,
  KES: 129.534579, GHS: 11.425464, TZS: 2642.490896, UGX: 3756.658244, ETB: 161.76509,
  XAF: 568.530771, XOF: 568.530771, PLN: 3.763082, CZK: 21.059591, HUF: 317.094461,
  RON: 4.559762, BGN: 1.695156, DKK: 6.478292, NOK: 9.347332, SEK: 9.778398,
  ISK: 121.338646, UAH: 44.670612, RUB: 84.303527, GEL: 2.605177, KZT: 448.238074,
  UZS: 11785.164806, PKR: 277.720685, BDT: 123.098065, LKR: 328.79355, NPR: 153.600816,
  MMK: 2100.388846, KHR: 4039.725205, LAK: 22224.126312, MNT: 3593.59368, BND: 1.272801,
  MOP: 8.080363, FJD: 2.204415, PGK: 4.458893, CLP: 957.185297, COP: 3103.999022,
  PEN: 3.36514, ARS: 1506.6836, UYU: 40.18058, PYG: 5971.647193, BOB: 11.871528,
  CRC: 449.04748, DOP: 58.904462, GTQ: 7.633803, JMD: 157.771689, TTD: 6.767294,
  XCD: 2.7,
};

// A fallback snapshot cannot prove day-over-day movement, so it uses the same values for both days.
const FALLBACK_USD_PREV_RATES: Record<string, number> = {
  ...FALLBACK_USD_RATES,
};

/**
 * Synchronous initial rates provider to guarantee immediate instant UI rendering (0ms delay)
 */
export function getInitialRatesData(baseCurrency: string = 'KRW'): RatesData {
  const baseUsd = FALLBACK_USD_RATES[baseCurrency];
  if (!Number.isFinite(baseUsd) || baseUsd <= 0) throw new Error(`Unsupported fallback currency: ${baseCurrency}`);
  const rates: Record<string, number> = {};
  const prevRates: Record<string, number> = {};

  ALL_CURRENCIES.forEach(c => {
    const targetUsd = FALLBACK_USD_RATES[c.code];
    if (!Number.isFinite(targetUsd) || targetUsd <= 0) return;
    rates[c.code] = crossRateFromUsd(baseUsd, targetUsd);
    prevRates[c.code] = (FALLBACK_USD_PREV_RATES[c.code] || targetUsd) / (FALLBACK_USD_PREV_RATES[baseCurrency] || baseUsd);
  });

  return {
    base: baseCurrency,
    source: 'reference-fallback',
    rates,
    prevRates,
    usdRates: FALLBACK_USD_RATES,
    usdPrevRates: FALLBACK_USD_PREV_RATES,
    lastUpdated: '',
  };
}

/**
 * Fetch real-time exchange rates with USD benchmark (with 3-second fast timeout)
 */
export async function fetchExchangeRates(baseCurrency: string = 'KRW'): Promise<RatesData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`, { signal: controller.signal });
    const usdRes = await fetch(`https://open.er-api.com/v6/latest/USD`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok || !usdRes.ok) throw new Error('API fetch failed');
    
    const data = await res.json();
    const usdData = await usdRes.json();

    if (data.result !== 'success' || usdData.result !== 'success' || !data.rates || !usdData.rates) throw new Error('Invalid API response');
    const rates: Record<string, number> = data.rates;
    const usdRates: Record<string, number> = usdData.rates;
    const lastUpdated = data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : new Date().toLocaleDateString();

    // Fetch yesterday's USD rates from Frankfurter for accurate day-over-day +/-
    let usdPrevRates: Record<string, number> = {};

    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split('T')[0];
      
      const frankController = new AbortController();
      const frankTimeout = setTimeout(() => frankController.abort(), 2000);
      const frankRes = await fetch(`https://api.frankfurter.app/${dateStr}?from=USD`, { signal: frankController.signal });
      clearTimeout(frankTimeout);

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
        const currentUsdRate = usdRates[c.code] || FALLBACK_USD_RATES[c.code];
        if (!currentUsdRate) return;
        usdPrevRates[c.code] = currentUsdRate;
      }

      const baseUsdToday = usdRates[baseCurrency];
      const baseUsdPrev = usdPrevRates[baseCurrency];
      const targetUsdToday = usdRates[c.code];
      const targetUsdPrev = usdPrevRates[c.code];
      if (![baseUsdToday, baseUsdPrev, targetUsdToday, targetUsdPrev].every(value => Number.isFinite(value) && value > 0)) return;

      rates[c.code] = rates[c.code] || (targetUsdToday / baseUsdToday);
      prevRates[c.code] = targetUsdPrev / baseUsdPrev;
    });

    return {
      base: baseCurrency,
      source: 'live',
      rates,
      prevRates,
      usdRates,
      usdPrevRates,
      lastUpdated,
    };
  } catch {
    return getInitialRatesData(baseCurrency);
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

  return [];
}
