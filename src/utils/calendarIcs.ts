import { CountryMeta, HolidayItem } from '../data/holidays';

export function exportHolidaysToIcs(
  year: number,
  selectedCountries: string[],
  holidayMap: Map<string, HolidayItem[]>,
  countryMetas: CountryMeta[]
): void {
  const metaMap = new Map(countryMetas.map((c) => [c.code, c]));
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QK Tool Hub//Smart Calendar Tool//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:QK Tool Hub - Holidays ${year} (${selectedCountries.join(', ')})`,
    'X-WR-TIMEZONE:UTC',
  ];

  let eventCounter = 0;
  holidayMap.forEach((items, dateStr) => {
    // dateStr: YYYY-MM-DD
    const yyyymmdd = dateStr.replace(/-/g, '');
    // DTEND는 종일 일정의 경우 다음 날짜여야 함
    const dt = new Date(dateStr + 'T00:00:00Z');
    dt.setUTCDate(dt.getUTCDate() + 1);
    const nextYyyymmdd = `${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, '0')}${String(dt.getUTCDate()).padStart(2, '0')}`;

    items.forEach((item) => {
      eventCounter++;
      const cMeta = metaMap.get(item.countryCode);
      const flag = cMeta ? cMeta.flag : '';
      const cName = cMeta ? cMeta.name.en : item.countryCode;
      const title = `${flag} ${item.name}${item.originalName ? ` (${item.originalName})` : ''}`;
      const desc = `Public holiday in ${cName}${item.isSubstitute ? ' (Observed/Substitute)' : ''}. Powered by qktoolhub.com/calendar`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:qk-holiday-${year}-${item.countryCode}-${yyyymmdd}-${eventCounter}@qktoolhub.com`);
      lines.push(`DTSTAMP:${year}0101T000000Z`);
      lines.push(`DTSTART;VALUE=DATE:${yyyymmdd}`);
      lines.push(`DTEND;VALUE=DATE:${nextYyyymmdd}`);
      lines.push(`SUMMARY:${title}`);
      lines.push(`DESCRIPTION:${desc}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:TRANSPARENT');
      lines.push('END:VEVENT');
    });
  });

  lines.push('END:VCALENDAR');
  const icsContent = lines.join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `holidays-${year}-${selectedCountries.join('-')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
