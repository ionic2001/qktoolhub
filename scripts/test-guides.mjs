import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';

const { calculateTextStats } = loadSource('src/utils/counter.ts');
const { convert } = loadSource('src/features/units/model.ts');
const { resizeImageDimensions } = loadSource('src/utils/imageEditor.ts');
const { crossRateFromUsd, convertCurrencyAmount, fetchHistoricalTrend, getInitialRatesData } = loadSource('src/utils/currencyRates.ts');
const { zoneSnapshot } = loadSource('src/utils/worldTime.ts');
const { calculateBusinessDays } = loadSource('src/data/holidays.ts');

assert.deepEqual(
  (({ charCount, charNoSpaceCount, utf8Bytes, eucKrBytes }) => ({ charCount, charNoSpaceCount, utf8Bytes, eucKrBytes }))(calculateTextStats('한글 ABC')),
  { charCount: 6, charNoSpaceCount: 5, utf8Bytes: 10, eucKrBytes: 8 },
);
assert.deepEqual(
  (({ charCount, utf8Bytes, eucKrBytes }) => ({ charCount, utf8Bytes, eucKrBytes }))(calculateTextStats('😊')),
  { charCount: 2, utf8Bytes: 4, eucKrBytes: 4 },
);
assert.equal(convert(1, 'data', 'MB', 'B'), 1_000_000);
assert.equal(convert(1, 'data', 'MiB', 'B'), 1_048_576);
assert.equal(convert(1, 'data', 'MiB', 'MB'), 1.048576);
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 600, true), { width: 600, height: 400 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'height', 600, true), { width: 900, height: 600 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 5000, true), { width: 4096, height: 2731 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'height', 20, true), { width: 96, height: 64 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 600, false), { width: 600, height: 800 });
assert.equal(convertCurrencyAmount(100, crossRateFromUsd(1, 1350)), 135000);
assert.ok(Math.abs(convertCurrencyAmount(100000, crossRateFromUsd(1350, 1)) - 74.07407407407408) < 1e-10);
assert.equal(getInitialRatesData('KRW').source, 'reference-fallback');
const savedFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('offline'); };
assert.deepEqual(await fetchHistoricalTrend('USD', 'KRW', '7D'), []);
globalThis.fetch = savedFetch;
assert.deepEqual(zoneSnapshot(Date.parse('2026-03-08T06:59:59Z'), 'America/New_York'), { date: '2026-03-08', time: '01:59:59', offset: 'GMT-5' });
assert.deepEqual(zoneSnapshot(Date.parse('2026-03-08T07:00:00Z'), 'America/New_York'), { date: '2026-03-08', time: '03:00:00', offset: 'GMT-4' });
assert.deepEqual(zoneSnapshot(Date.parse('2026-03-08T07:00:00Z'), 'Asia/Seoul'), { date: '2026-03-08', time: '16:00:00', offset: 'GMT+9' });
assert.deepEqual(calculateBusinessDays('2026-01-01', '2026-01-09', ['KR']), { totalCalendarDays: 9, weekendDays: 2, holidayDays: 1, workingDays: 6 });
assert.deepEqual(calculateBusinessDays('2026-01-09', '2026-01-01', ['KR']), { totalCalendarDays: 9, weekendDays: 2, holidayDays: 1, workingDays: 6 });

console.log('PASS: guide evidence matches text bytes, data units, image ratios, currency calculations, DST boundaries and business-day rules; unavailable history is not fabricated.');
