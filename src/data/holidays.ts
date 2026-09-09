export interface CountryMeta {
  code: string;
  flag: string;
  color: string;
  name: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', string>;
}

export interface HolidayItem {
  date: string; // 'YYYY-MM-DD'
  name: string;
  originalName?: string;
  countryCode: string;
  isSubstitute?: boolean;
}

export const SUPPORTED_COUNTRIES: CountryMeta[] = [
  { code: 'KR', flag: '🇰🇷', color: '#ef4444', name: { ko: '대한민국', en: 'South Korea', ja: '韓国', zh: '韩国', es: 'Corea del Sur' } },
  { code: 'US', flag: '🇺🇸', color: '#3b82f6', name: { ko: '미국', en: 'United States', ja: 'アメリカ', zh: '美国', es: 'Estados Unidos' } },
  { code: 'JP', flag: '🇯🇵', color: '#ec4899', name: { ko: '일본', en: 'Japan', ja: '日本', zh: '日本', es: 'Japón' } },
  { code: 'CN', flag: '🇨🇳', color: '#f97316', name: { ko: '중국', en: 'China', ja: '中国', zh: '中国', es: 'China' } },
  { code: 'HK', flag: '🇭🇰', color: '#e11d48', name: { ko: '홍콩', en: 'Hong Kong', ja: '香港', zh: '中国香港', es: 'Hong Kong' } },
  { code: 'TW', flag: '🇹🇼', color: '#06b6d4', name: { ko: '대만', en: 'Taiwan', ja: '台湾', zh: '中国台湾', es: 'Taiwán' } },
  { code: 'SG', flag: '🇸🇬', color: '#10b981', name: { ko: '싱가포르', en: 'Singapore', ja: 'シンガポール', zh: '新加坡', es: 'Singapur' } },
  { code: 'VN', flag: '🇻🇳', color: '#eab308', name: { ko: '베트남', en: 'Vietnam', ja: 'ベトナム', zh: '越南', es: 'Vietnam' } },
  { code: 'GB', flag: '🇬🇧', color: '#6366f1', name: { ko: '영국', en: 'United Kingdom', ja: 'イギリス', zh: '英国', es: 'Reino Unido' } },
  { code: 'FR', flag: '🇫🇷', color: '#8b5cf6', name: { ko: '프랑스', en: 'France', ja: 'フランス', zh: '法国', es: 'Francia' } },
  { code: 'DE', flag: '🇩🇪', color: '#f59e0b', name: { ko: '독일', en: 'Germany', ja: 'ドイツ', zh: '德国', es: 'Alemania' } },
  { code: 'IT', flag: '🇮🇹', color: '#14b8a6', name: { ko: '이탈리아', en: 'Italy', ja: 'イタリア', zh: '意大利', es: 'Italia' } },
  { code: 'ES', flag: '🇪🇸', color: '#f43f5e', name: { ko: '스페인', en: 'Spain', ja: 'スペイン', zh: '西班牙', es: 'España' } },
  { code: 'CH', flag: '🇨🇭', color: '#dc2626', name: { ko: '스위스', en: 'Switzerland', ja: 'スイス', zh: '瑞士', es: 'Suiza' } },
  { code: 'NL', flag: '🇳🇱', color: '#ea580c', name: { ko: '네덜란드', en: 'Netherlands', ja: 'オランダ', zh: '荷兰', es: 'Países Bajos' } },
  { code: 'AT', flag: '🇦🇹', color: '#b91c1c', name: { ko: '오스트리아', en: 'Austria', ja: 'オーストリア', zh: '奥地利', es: 'Austria' } },
  { code: 'SE', flag: '🇸🇪', color: '#0284c7', name: { ko: '스웨덴', en: 'Sweden', ja: 'スウェーデン', zh: '瑞典', es: 'Suecia' } },
  { code: 'PL', flag: '🇵🇱', color: '#db2777', name: { ko: '폴란드', en: 'Poland', ja: 'ポーランド', zh: '波兰', es: 'Polonia' } },
  { code: 'CA', flag: '🇨🇦', color: '#be123c', name: { ko: '캐나다', en: 'Canada', ja: 'カナダ', zh: '加拿大', es: 'Canadá' } },
  { code: 'MX', flag: '🇲🇽', color: '#059669', name: { ko: '멕시코', en: 'Mexico', ja: 'メキシコ', zh: '墨西哥', es: 'México' } },
  { code: 'BR', flag: '🇧🇷', color: '#16a34a', name: { ko: '브라질', en: 'Brazil', ja: 'ブラジル', zh: '巴西', es: 'Brasil' } },
  { code: 'AR', flag: '🇦🇷', color: '#38bdf8', name: { ko: '아르헨티나', en: 'Argentina', ja: 'アルゼンチン', zh: '阿根廷', es: 'Argentina' } },
  { code: 'CL', flag: '🇨🇱', color: '#2563eb', name: { ko: '칠레', en: 'Chile', ja: 'チリ', zh: '智利', es: 'Chile' } },
  { code: 'AU', flag: '🇦🇺', color: '#0d9488', name: { ko: '호주', en: 'Australia', ja: 'オーストラリア', zh: '澳大利亚', es: 'Australia' } },
  { code: 'NZ', flag: '🇳🇿', color: '#4338ca', name: { ko: '뉴질랜드', en: 'New Zealand', ja: 'ニュージーランド', zh: '新西兰', es: 'Nueva Zelanda' } }
];

// 2024~2030 정밀 음력 주요 공휴일 매핑 테이블
interface LunarKeyDates {
  seollalDay: string; // 음력 1월 1일
  buddhaDay: string;  // 음력 4월 8일
  duanwuDay: string;  // 음력 5월 5일
  chuseokDay: string; // 음력 8월 15일
}

const LUNAR_MAP: Record<number, LunarKeyDates> = {
  2024: { seollalDay: '2024-02-10', buddhaDay: '2024-05-15', duanwuDay: '2024-06-10', chuseokDay: '2024-09-17' },
  2025: { seollalDay: '2025-01-29', buddhaDay: '2025-05-05', duanwuDay: '2025-05-31', chuseokDay: '2025-10-06' },
  2026: { seollalDay: '2026-02-17', buddhaDay: '2026-05-24', duanwuDay: '2026-06-19', chuseokDay: '2026-09-25' },
  2027: { seollalDay: '2027-02-06', buddhaDay: '2027-05-13', duanwuDay: '2027-06-09', chuseokDay: '2027-09-15' },
  2028: { seollalDay: '2028-01-26', buddhaDay: '2028-05-02', duanwuDay: '2028-05-28', chuseokDay: '2028-10-03' },
  2029: { seollalDay: '2029-02-13', buddhaDay: '2029-05-20', duanwuDay: '2029-06-16', chuseokDay: '2029-09-22' },
  2030: { seollalDay: '2030-02-03', buddhaDay: '2030-05-09', duanwuDay: '2030-06-05', chuseokDay: '2030-09-12' },
};

// Meeus/Jones/Butcher algorithm for Easter Sunday (Gregorian)
export function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDateUtc(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function offsetDate(base: Date, days: number): Date {
  const res = new Date(base.getTime());
  res.setUTCDate(res.getUTCDate() + days);
  return res;
}

// N번째 특정 요일 찾기 (1-based nth, -1은 마지막 요일)
// weekday: 0(일) ~ 6(토)
export function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): string {
  if (n > 0) {
    const d = new Date(Date.UTC(year, month - 1, 1));
    let count = 0;
    while (d.getUTCMonth() === month - 1) {
      if (d.getUTCDay() === weekday) {
        count++;
        if (count === n) return formatDateUtc(d);
      }
      d.setUTCDate(d.getUTCDate() + 1);
    }
  } else if (n === -1) {
    // 마지막 해당 요일
    const d = new Date(Date.UTC(year, month, 0)); // 해당 달의 마지막 날
    while (d.getUTCDay() !== weekday) {
      d.setUTCDate(d.getUTCDate() - 1);
    }
    return formatDateUtc(d);
  }
  return `${year}-${String(month).padStart(2, '0')}-01`;
}

// -------------------------------------------------------------
// 국가별 공휴일 생성기
// -------------------------------------------------------------

export function getCountryHolidays(year: number, countryCode: string): HolidayItem[] {
  const list: HolidayItem[] = [];
  const added = new Set<string>();

  const add = (date: string, name: string, originalName?: string, isSubstitute = false) => {
    const key = `${date}:${name}`;
    if (!added.has(key)) {
      added.add(key);
      list.push({ date, name, originalName, countryCode, isSubstitute });
    }
  };

  const lunar = LUNAR_MAP[year] || LUNAR_MAP[2026];
  const easter = getEasterSunday(year);
  const goodFriday = formatDateUtc(offsetDate(easter, -2));
  const easterMonday = formatDateUtc(offsetDate(easter, 1));
  const ascensionDay = formatDateUtc(offsetDate(easter, 39));
  const whitMonday = formatDateUtc(offsetDate(easter, 50));

  switch (countryCode) {
    case 'KR': {
      // 1. 고정 공휴일
      const fixed = [
        { m: 1, d: 1, name: '신정', sub: false },
        { m: 3, d: 1, name: '3·1절', sub: true },
        { m: 5, d: 5, name: '어린이날', sub: true },
        { m: 6, d: 6, name: '현충일', sub: false },
        { m: 8, d: 15, name: '광복절', sub: true },
        { m: 10, d: 3, name: '개천절', sub: true },
        { m: 10, d: 9, name: '한글날', sub: true },
        { m: 12, d: 25, name: '크리스마스', sub: true },
      ];
      fixed.forEach(({ m, d, name }) => {
        add(`${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, name);
      });

      // 2. 음력 공휴일 (설날 3일, 부처님오신날, 추석 3일)
      const seollalDt = new Date(lunar.seollalDay + 'T00:00:00Z');
      const seollalSeries = [
        formatDateUtc(offsetDate(seollalDt, -1)),
        lunar.seollalDay,
        formatDateUtc(offsetDate(seollalDt, 1)),
      ];
      seollalSeries.forEach((d, i) => add(d, i === 1 ? '설날' : '설 연휴'));

      add(lunar.buddhaDay, '부처님오신날');

      const chuseokDt = new Date(lunar.chuseokDay + 'T00:00:00Z');
      const chuseokSeries = [
        formatDateUtc(offsetDate(chuseokDt, -1)),
        lunar.chuseokDay,
        formatDateUtc(offsetDate(chuseokDt, 1)),
      ];
      chuseokSeries.forEach((d, i) => add(d, i === 1 ? '추석' : '추석 연휴'));

      // 3. 대체공휴일 로직 (대한민국 대통령령 관공서의 공휴일에 관한 규정)
      // (A) 국경일 4종 + 어린이날 + 부처님오신날 + 성탄절
      const singleSubs = [
        `${year}-03-01`, `${year}-05-05`, `${year}-08-15`,
        `${year}-10-03`, `${year}-10-09`, `${year}-12-25`,
        lunar.buddhaDay,
      ];
      const krHolidaySet = new Set(list.map((h) => h.date));

      singleSubs.forEach((dStr) => {
        const dt = new Date(dStr + 'T00:00:00Z');
        const day = dt.getUTCDay(); // 0: 일, 6: 토
        if (day === 0 || day === 6) {
          const cur = new Date(dt.getTime());
          while (true) {
            cur.setUTCDate(cur.getUTCDate() + 1);
            const cStr = formatDateUtc(cur);
            const cDay = cur.getUTCDay();
            if (cDay !== 0 && cDay !== 6 && !krHolidaySet.has(cStr)) {
              const original = list.find((h) => h.date === dStr);
              add(cStr, `대체공휴일(${original?.name || ''})`, undefined, true);
              krHolidaySet.add(cStr);
              break;
            }
          }
        }
      });

      // (B) 설날/추석 연휴: 연휴 3일 중 일요일이나 다른 공휴일과 겹치면 다음 첫 비공휴일
      const checkSeries = (series: string[], name: string) => {
        const hasOverlap = series.some((dStr) => {
          const dt = new Date(dStr + 'T00:00:00Z');
          return dt.getUTCDay() === 0;
        });
        if (hasOverlap) {
          const last = new Date(series[series.length - 1] + 'T00:00:00Z');
          const cur = new Date(last.getTime());
          while (true) {
            cur.setUTCDate(cur.getUTCDate() + 1);
            const cStr = formatDateUtc(cur);
            const cDay = cur.getUTCDay();
            if (cDay !== 0 && cDay !== 6 && !krHolidaySet.has(cStr)) {
              add(cStr, `대체공휴일(${name})`, undefined, true);
              krHolidaySet.add(cStr);
              break;
            }
          }
        }
      };
      checkSeries(seollalSeries, '설날');
      checkSeries(chuseokSeries, '추석');
      break;
    }

    case 'US': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      add(getNthWeekdayOfMonth(year, 1, 1, 3), '마틴 루터 킹의 날', 'Martin Luther King Jr. Day');
      add(getNthWeekdayOfMonth(year, 2, 1, 3), '워싱턴 탄생일', "Washington's Birthday");
      add(getNthWeekdayOfMonth(year, 5, 1, -1), '메모리얼 데이', 'Memorial Day');
      add(`${year}-06-19`, '준틴스 독립일', 'Juneteenth');
      add(`${year}-07-04`, '독립기념일', 'Independence Day');
      add(getNthWeekdayOfMonth(year, 9, 1, 1), '노동절', 'Labor Day');
      add(getNthWeekdayOfMonth(year, 10, 1, 2), '콜럼버스의 날', 'Columbus Day');
      add(`${year}-11-11`, '재향군인의 날', 'Veterans Day');
      add(getNthWeekdayOfMonth(year, 11, 4, 4), '추수감사절', 'Thanksgiving Day');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');

      // US Federal observed rule: Sunday -> Monday, Saturday -> Friday
      const fixedUS = [`${year}-01-01`, `${year}-06-19`, `${year}-07-04`, `${year}-11-11`, `${year}-12-25`];
      fixedUS.forEach((dStr) => {
        const dt = new Date(dStr + 'T00:00:00Z');
        const day = dt.getUTCDay();
        if (day === 0) {
          const obs = formatDateUtc(offsetDate(dt, 1));
          add(obs, '대체 휴일 (미국 관측일)', 'Observed Holiday', true);
        } else if (day === 6) {
          const obs = formatDateUtc(offsetDate(dt, -1));
          add(obs, '대체 휴일 (미국 관측일)', 'Observed Holiday', true);
        }
      });
      break;
    }

    case 'JP': {
      add(`${year}-01-01`, '원단(신정)', '元日');
      add(getNthWeekdayOfMonth(year, 1, 1, 2), '성인의 날', '成人の日');
      add(`${year}-02-11`, '건국기념의 날', '建国記念の日');
      add(`${year}-02-23`, '천황탄생일', '天皇誕生日');
      add(`${year}-03-20`, '춘분의 날', '春分の日');
      add(`${year}-04-29`, '쇼와의 날', '昭和の日');
      add(`${year}-05-03`, '헌법기념일', '憲法記念日');
      add(`${year}-05-04`, '녹색의 날', 'みどりの日');
      add(`${year}-05-05`, '어린이날', 'こどもの日');
      add(getNthWeekdayOfMonth(year, 7, 1, 3), '바다의 날', '海の日');
      add(`${year}-08-11`, '산의 날', '山の日');
      add(getNthWeekdayOfMonth(year, 9, 1, 3), '경로의 날', '敬老の日');
      add(`${year}-09-23`, '추분의 날', '秋分の日');
      add(getNthWeekdayOfMonth(year, 10, 1, 2), '스포츠의 날', 'スポーツの日');
      add(`${year}-11-03`, '문화의 날', '文化の日');
      add(`${year}-11-23`, '근로감사의 날', '勤労感謝の日');

      // 일본 振替休日: 일요일과 겹칠 시 다음 월요일 대체
      const jpList = [...list];
      jpList.forEach((h) => {
        const dt = new Date(h.date + 'T00:00:00Z');
        if (dt.getUTCDay() === 0) {
          const sub = formatDateUtc(offsetDate(dt, 1));
          add(sub, `대체휴일(${h.name})`, '振替休日', true);
        }
      });
      break;
    }

    case 'CN': {
      add(`${year}-01-01`, '원단(신정)', '元旦');
      // 춘절 (음력 1/1 전후)
      const cnSeollal = new Date(lunar.seollalDay + 'T00:00:00Z');
      for (let i = 0; i < 3; i++) {
        add(formatDateUtc(offsetDate(cnSeollal, i)), '춘절(설날)', '春节');
      }
      add(`${year}-04-04`, '청명절', '清明节');
      add(`${year}-05-01`, '노동절', '劳动节');
      add(lunar.duanwuDay, '단오절', '端午节');
      add(lunar.chuseokDay, '중추절', '中秋节');
      for (let i = 1; i <= 3; i++) {
        add(`${year}-10-0${i}`, '국경절', '国庆节');
      }
      break;
    }

    case 'HK': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      const hkSeollal = new Date(lunar.seollalDay + 'T00:00:00Z');
      for (let i = 0; i < 3; i++) {
        add(formatDateUtc(offsetDate(hkSeollal, i)), '음력 설날', 'Lunar New Year');
      }
      add(goodFriday, '성금요일', 'Good Friday');
      add(easterMonday, '부활절 월요일', 'Easter Monday');
      add(`${year}-04-04`, '청명절', 'Ching Ming Festival');
      add(`${year}-05-01`, '노동절', 'Labour Day');
      add(lunar.buddhaDay, '부처님오신날', "Birthday of the Buddha");
      add(lunar.duanwuDay, '단오절', 'Tuen Ng Festival');
      add(`${year}-07-01`, '홍콩 특별행정구 설립기념일', 'HKSAR Establishment Day');
      add(formatDateUtc(offsetDate(new Date(lunar.chuseokDay + 'T00:00:00Z'), 1)), '중추절 다음날', 'Day following Mid-Autumn Festival');
      add(`${year}-10-01`, '중국 국경절', 'National Day');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      add(`${year}-12-26`, '박싱 데이', 'Boxing Day');
      break;
    }

    case 'TW': {
      add(`${year}-01-01`, '중화민국 개국기념일', '元旦');
      const twSeollal = new Date(lunar.seollalDay + 'T00:00:00Z');
      for (let i = -1; i <= 3; i++) {
        add(formatDateUtc(offsetDate(twSeollal, i)), '춘절 연휴', '春節');
      }
      add(`${year}-02-28`, '평화기념일', '和平紀念日');
      add(`${year}-04-04`, '어린이날 / 청명절', '兒童節 / 清明節');
      add(`${year}-05-01`, '노동절', '勞動節');
      add(lunar.duanwuDay, '단오절', '端午節');
      add(lunar.chuseokDay, '중추절', '中秋節');
      add(`${year}-10-10`, '국경일(쌍십절)', '國慶日');
      break;
    }

    case 'SG': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      const sgSeollal = new Date(lunar.seollalDay + 'T00:00:00Z');
      add(lunar.seollalDay, '구정 1일차', 'Chinese New Year Day 1');
      add(formatDateUtc(offsetDate(sgSeollal, 1)), '구정 2일차', 'Chinese New Year Day 2');
      add(goodFriday, '성금요일', 'Good Friday');
      add(`${year}-05-01`, '노동절', 'Labour Day');
      add(lunar.buddhaDay, '베삭 데이', 'Vesak Day');
      add(`${year}-08-09`, '국경일', 'National Day');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      break;
    }

    case 'VN': {
      add(`${year}-01-01`, '신정', 'Tết Dương Lịch');
      const vnTet = new Date(lunar.seollalDay + 'T00:00:00Z');
      for (let i = -1; i <= 3; i++) {
        add(formatDateUtc(offsetDate(vnTet, i)), '뗏(설날 연휴)', 'Tết Nguyên Đán');
      }
      add(`${year}-04-30`, '전승기념일', 'Ngày Giải phóng');
      add(`${year}-05-01`, '국제 노동절', 'Ngày Quốc tế Lao động');
      add(`${year}-09-02`, '국경일', 'Quốc khánh');
      break;
    }

    case 'GB': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      add(goodFriday, '성금요일', 'Good Friday');
      add(easterMonday, '부활절 월요일', 'Easter Monday');
      add(getNthWeekdayOfMonth(year, 5, 1, 1), '초여름 뱅크 홀리데이', 'Early May Bank Holiday');
      add(getNthWeekdayOfMonth(year, 5, 1, -1), '봄 뱅크 홀리데이', 'Spring Bank Holiday');
      add(getNthWeekdayOfMonth(year, 8, 1, -1), '여름 뱅크 홀리데이', 'Summer Bank Holiday');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      add(`${year}-12-26`, '박싱 데이', 'Boxing Day');
      break;
    }

    case 'FR': {
      add(`${year}-01-01`, '신정', "Jour de l'An");
      add(easterMonday, '부활절 월요일', 'Lundi de Pâques');
      add(`${year}-05-01`, '노동절', 'Fête du Travail');
      add(`${year}-05-08`, '2차대전 승전기념일', 'Fête de la Victoire');
      add(ascensionDay, '예수승천일', 'Ascension');
      add(whitMonday, '성령강림절 월요일', 'Lundi de Pentecôte');
      add(`${year}-07-14`, '혁명기념일', 'Fête Nationale');
      add(`${year}-08-15`, '성모승천일', 'Assomption');
      add(`${year}-11-01`, '모든 성인의 날', 'Toussaint');
      add(`${year}-11-11`, '1차대전 휴전기념일', 'Armistice');
      add(`${year}-12-25`, '크리스마스', 'Noël');
      break;
    }

    case 'DE': {
      add(`${year}-01-01`, '신정', 'Neujahr');
      add(goodFriday, '성금요일', 'Karfreitag');
      add(easterMonday, '부활절 월요일', 'Ostermontag');
      add(`${year}-05-01`, '노동절', 'Tag der Arbeit');
      add(ascensionDay, '예수승천일', 'Christi Himmelfahrt');
      add(whitMonday, '성령강림절 월요일', 'Pfingstmontag');
      add(`${year}-10-03`, '독일 통일의 날', 'Tag der Deutschen Einheit');
      add(`${year}-12-25`, '크리스마스 1일차', '1. Weihnachtstag');
      add(`${year}-12-26`, '크리스마스 2일차', '2. Weihnachtstag');
      break;
    }

    case 'IT': {
      add(`${year}-01-01`, '신정', 'Capodanno');
      add(`${year}-01-06`, '주현절', 'Epifania');
      add(easterMonday, '부활절 월요일', 'Lunedì dell’Angelo');
      add(`${year}-04-25`, '해방기념일', 'Festa della Liberazione');
      add(`${year}-05-01`, '노동절', 'Festa dei Lavoratori');
      add(`${year}-06-02`, '공화국기념일', 'Festa della Repubblica');
      add(`${year}-08-15`, '성모승천일', 'Ferragosto');
      add(`${year}-11-01`, '모든 성인의 날', 'Ognissanti');
      add(`${year}-12-08`, '성모원죄회태일', 'Immacolata Concezione');
      add(`${year}-12-25`, '크리스마스', 'Natale');
      add(`${year}-12-26`, '성 스테파노의 날', 'Santo Stefano');
      break;
    }

    case 'ES': {
      add(`${year}-01-01`, '신정', 'Año Nuevo');
      add(`${year}-01-06`, '주현절(동방박사의 날)', 'Epifanía del Señor');
      add(goodFriday, '성금요일', 'Viernes Santo');
      add(`${year}-05-01`, '노동절', 'Fiesta del Trabajo');
      add(`${year}-08-15`, '성모승천일', 'Asunción de la Virgen');
      add(`${year}-10-12`, '스페인 국경일', 'Fiesta Nacional de España');
      add(`${year}-11-01`, '모든 성인의 날', 'Todos los Santos');
      add(`${year}-12-06`, '헌법기념일', 'Día de la Constitución Española');
      add(`${year}-12-08`, '성모원죄회태일', 'Inmaculada Concepción');
      add(`${year}-12-25`, '크리스마스', 'Natividad del Señor');
      break;
    }

    case 'CH': {
      add(`${year}-01-01`, '신정', 'Neujahrstag');
      add(goodFriday, '성금요일', 'Karfreitag');
      add(easterMonday, '부활절 월요일', 'Ostermontag');
      add(ascensionDay, '예수승천일', 'Auffahrt');
      add(whitMonday, '성령강림절', 'Pfingstmontag');
      add(`${year}-08-01`, '스위스 연방기념일', 'Bundesfeiertag');
      add(`${year}-12-25`, '크리스마스', 'Weihnachten');
      break;
    }

    case 'NL': {
      add(`${year}-01-01`, '신정', 'Nieuwjaarsdag');
      add(goodFriday, '성금요일', 'Goede Vrijdag');
      add(easterMonday, '부활절 월요일', 'Paasmaandag');
      add(`${year}-04-27`, '국왕의 날', 'Koningsdag');
      add(ascensionDay, '예수승천일', 'Hemelvaartsdag');
      add(whitMonday, '성령강림절 월요일', 'Pinkstermaandag');
      add(`${year}-12-25`, '크리스마스', 'Eerste Kerstdag');
      add(`${year}-12-26`, '크리스마스 2일차', 'Tweede Kerstdag');
      break;
    }

    case 'AT': {
      add(`${year}-01-01`, '신정', 'Neujahr');
      add(`${year}-01-06`, '주현절', 'Heilige Drei Könige');
      add(easterMonday, '부활절 월요일', 'Ostermontag');
      add(`${year}-05-01`, '노동절', 'Staatsfeiertag');
      add(ascensionDay, '예수승천일', 'Christi Himmelfahrt');
      add(whitMonday, '성령강림절', 'Pfingstmontag');
      add(`${year}-10-26`, '국경일', 'Nationalfeiertag');
      add(`${year}-11-01`, '모든 성인의 날', 'Allerheiligen');
      add(`${year}-12-08`, '성모원죄회태일', 'Mariä Empfängnis');
      add(`${year}-12-25`, '크리스마스', 'Christtag');
      add(`${year}-12-26`, '성 스테파노의 날', 'Stefanitag');
      break;
    }

    case 'SE': {
      add(`${year}-01-01`, '신정', 'Nyårsdagen');
      add(`${year}-01-06`, '주현절', 'Trettondedag jul');
      add(goodFriday, '성금요일', 'Långfredagen');
      add(easterMonday, '부활절 월요일', 'Annandag påsk');
      add(`${year}-05-01`, '노동절', 'Första maj');
      add(ascensionDay, '예수승천일', 'Kristi himmelsfärdsdag');
      add(`${year}-06-06`, '스웨덴 국경일', 'Sveriges nationaldag');
      add(`${year}-12-25`, '크리스마스', 'Juldagen');
      add(`${year}-12-26`, '박싱 데이', 'Annandag jul');
      break;
    }

    case 'PL': {
      add(`${year}-01-01`, '신정', 'Nowy Rok');
      add(`${year}-01-06`, '주현절', 'Święto Trzech Króli');
      add(easterMonday, '부활절 월요일', 'Poniedziałek Wielkanocny');
      add(`${year}-05-01`, '노동절', 'Święto Pracy');
      add(`${year}-05-03`, '헌법기념일', 'Święto Konstytucji 3 Maja');
      add(`${year}-08-15`, '성모승천일 / 국군의 날', 'Wniebowzięcie NMP');
      add(`${year}-11-01`, '모든 성인의 날', 'Wszystkich Świętych');
      add(`${year}-11-11`, '독립기념일', 'Święto Niepodległości');
      add(`${year}-12-25`, '크리스마스', 'Boże Narodzenie');
      add(`${year}-12-26`, '크리스마스 2일차', 'Drugi Dzień Bożego Narodzenia');
      break;
    }

    case 'CA': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      add(goodFriday, '성금요일', 'Good Friday');
      add(getNthWeekdayOfMonth(year, 5, 1, -1), '빅토리아 데이', 'Victoria Day');
      add(`${year}-07-01`, '캐나다 데이', 'Canada Day');
      add(getNthWeekdayOfMonth(year, 9, 1, 1), '노동절', 'Labour Day');
      add(getNthWeekdayOfMonth(year, 10, 1, 2), '추수감사절', 'Thanksgiving Day');
      add(`${year}-11-11`, '영령기념일', 'Remembrance Day');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      add(`${year}-12-26`, '박싱 데이', 'Boxing Day');
      break;
    }

    case 'MX': {
      add(`${year}-01-01`, '신정', 'Año Nuevo');
      add(getNthWeekdayOfMonth(year, 2, 1, 1), '헌법기념일', 'Día de la Constitución');
      add(getNthWeekdayOfMonth(year, 3, 1, 3), '베니토 후아레스 탄생일', 'Natalicio de Benito Juárez');
      add(`${year}-05-01`, '노동절', 'Día del Trabajo');
      add(`${year}-09-16`, '독립기념일', 'Día de la Independencia');
      add(getNthWeekdayOfMonth(year, 11, 1, 3), '멕시코 혁명기념일', 'Día de la Revolución');
      add(`${year}-12-25`, '크리스마스', 'Navidad');
      break;
    }

    case 'BR': {
      add(`${year}-01-01`, '신정', 'Confraternização Universal');
      add(goodFriday, '성금요일', 'Sexta-feira Santa');
      add(`${year}-04-21`, '티라덴치스 기념일', 'Tiradentes');
      add(`${year}-05-01`, '노동절', 'Dia do Trabalho');
      add(`${year}-09-07`, '독립기념일', 'Independência do Brasil');
      add(`${year}-10-12`, '아파레시다 성모의 날', 'Nossa Senhora Aparecida');
      add(`${year}-11-02`, '위령의 날', 'Finados');
      add(`${year}-11-15`, '공화국 선포일', 'Proclamação da República');
      add(`${year}-12-25`, '크리스마스', 'Natal');
      break;
    }

    case 'AR': {
      add(`${year}-01-01`, '신정', 'Año Nuevo');
      add(`${year}-03-24`, '진실과 정의의 날', 'Día de la Memoria');
      add(`${year}-04-02`, '말비나스의 날', 'Día del Veterano');
      add(goodFriday, '성금요일', 'Viernes Santo');
      add(`${year}-05-01`, '노동절', 'Día del Trabajador');
      add(`${year}-05-25`, '5월 혁명기념일', 'Revolución de Mayo');
      add(`${year}-06-20`, '국기의 날', 'Día de la Bandera');
      add(`${year}-07-09`, '독립기념일', 'Día de la Independencia');
      add(`${year}-12-08`, '성모무염시태일', 'Inmaculada Concepción');
      add(`${year}-12-25`, '크리스마스', 'Navidad');
      break;
    }

    case 'CL': {
      add(`${year}-01-01`, '신정', 'Año Nuevo');
      add(goodFriday, '성금요일', 'Viernes Santo');
      add(`${year}-05-01`, '노동절', 'Día del Trabajo');
      add(`${year}-05-21`, '해군의 날', 'Día de las Glorias Navales');
      add(`${year}-07-16`, '카르멘 성모의 날', 'Virgen del Carmen');
      add(`${year}-08-15`, '성모승천일', 'Asunción de la Virgen');
      add(`${year}-09-18`, '독립기념일', 'Fiestas Patrias');
      add(`${year}-09-19`, '군대의 날', 'Glorias del Ejército');
      add(`${year}-11-01`, '모든 성인의 날', 'Día de Todos los Santos');
      add(`${year}-12-08`, '성모수태일', 'Inmaculada Concepción');
      add(`${year}-12-25`, '크리스마스', 'Navidad');
      break;
    }

    case 'AU': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      add(`${year}-01-26`, '호주의 날', 'Australia Day');
      add(goodFriday, '성금요일', 'Good Friday');
      add(easterMonday, '부활절 월요일', 'Easter Monday');
      add(`${year}-04-25`, '안작 데이', 'ANZAC Day');
      add(getNthWeekdayOfMonth(year, 6, 1, 2), '국왕 탄생일', "King's Birthday");
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      add(`${year}-12-26`, '박싱 데이', 'Boxing Day');
      break;
    }

    case 'NZ': {
      add(`${year}-01-01`, '신정', "New Year's Day");
      add(`${year}-01-02`, '신정 연휴', "Day after New Year's Day");
      add(`${year}-02-06`, '와이탕이의 날', 'Waitangi Day');
      add(goodFriday, '성금요일', 'Good Friday');
      add(easterMonday, '부활절 월요일', 'Easter Monday');
      add(`${year}-04-25`, '안작 데이', 'ANZAC Day');
      add(getNthWeekdayOfMonth(year, 6, 1, 1), '국왕 탄생일', "King's Birthday");
      add(getNthWeekdayOfMonth(year, 10, 1, 4), '노동절', 'Labour Day');
      add(`${year}-12-25`, '크리스마스', 'Christmas Day');
      add(`${year}-12-26`, '박싱 데이', 'Boxing Day');
      break;
    }

    default:
      break;
  }

  return list.sort((a, b) => a.date.localeCompare(b.date));
}

// 여러 국가의 공휴일 맵 생성
export function getAggregatedHolidays(year: number, countryCodes: string[]): Map<string, HolidayItem[]> {
  const map = new Map<string, HolidayItem[]>();
  countryCodes.forEach((code) => {
    const list = getCountryHolidays(year, code);
    list.forEach((item) => {
      const cur = map.get(item.date) || [];
      cur.push(item);
      map.set(item.date, cur);
    });
  });
  return map;
}

// -------------------------------------------------------------
// 한국 특화: 24절기 & 손 없는 날 (이사 길일)
// -------------------------------------------------------------

export const SOLAR_TERMS_2026: Record<string, string> = {
  '2026-02-04': '입춘',
  '2026-02-19': '우수',
  '2026-03-05': '경칩',
  '2026-03-20': '춘분',
  '2026-04-05': '청명',
  '2026-04-20': '곡우',
  '2026-05-05': '입하',
  '2026-05-21': '소만',
  '2026-06-05': '망종',
  '2026-06-21': '하지',
  '2026-07-07': '소서',
  '2026-07-23': '대서',
  '2026-08-07': '입추',
  '2026-08-23': '처서',
  '2026-09-07': '백로',
  '2026-09-23': '추분',
  '2026-10-08': '한로',
  '2026-10-23': '상강',
  '2026-11-07': '입동',
  '2026-11-22': '소설',
  '2026-12-07': '대설',
  '2026-12-22': '동지',
  '2026-01-05': '소한',
  '2026-01-20': '대한',
};

// 손 없는 날 (음력 끝자리 9, 0인 날)
// 2026년 양력 환산 기준 주요 손 없는 날 집합
export const SON_FREE_DAYS_2026 = new Set<string>([
  '2026-01-07', '2026-01-08', '2026-01-17', '2026-01-18', '2026-01-27', '2026-01-28',
  '2026-02-06', '2026-02-07', '2026-02-15', '2026-02-16', '2026-02-25', '2026-02-26',
  '2026-03-07', '2026-03-08', '2026-03-17', '2026-03-18', '2026-03-27', '2026-03-28',
  '2026-04-06', '2026-04-07', '2026-04-16', '2026-04-17', '2026-04-26', '2026-04-27',
  '2026-05-06', '2026-05-07', '2026-05-15', '2026-05-16', '2026-05-25', '2026-05-26',
  '2026-06-04', '2026-06-05', '2026-06-14', '2026-06-15', '2026-06-24', '2026-06-25',
  '2026-07-03', '2026-07-04', '2026-07-13', '2026-07-14', '2026-07-23', '2026-07-24',
  '2026-08-02', '2026-08-03', '2026-08-11', '2026-08-12', '2026-08-21', '2026-08-22', '2026-08-31',
  '2026-09-01', '2026-09-10', '2026-09-11', '2026-09-20', '2026-09-21', '2026-09-30',
  '2026-10-01', '2026-10-09', '2026-10-10', '2026-10-19', '2026-10-20', '2026-10-29', '2026-10-30',
  '2026-11-08', '2026-11-09', '2026-11-18', '2026-11-19', '2026-11-28', '2026-11-29',
  '2026-12-07', '2026-12-08', '2026-12-17', '2026-12-18', '2026-12-27', '2026-12-28'
]);

// -------------------------------------------------------------
// 순수 영업일(Business Days) 정밀 계산 함수
// -------------------------------------------------------------

export interface BusinessDaysResult {
  totalCalendarDays: number;
  weekendDays: number;
  holidayDays: number;
  workingDays: number;
}

export function calculateBusinessDays(
  startDateStr: string,
  endDateStr: string,
  selectedCountries: string[]
): BusinessDaysResult {
  if (!startDateStr || !endDateStr) {
    return { totalCalendarDays: 0, weekendDays: 0, holidayDays: 0, workingDays: 0 };
  }

  const [d1, d2] = startDateStr <= endDateStr ? [startDateStr, endDateStr] : [endDateStr, startDateStr];
  const start = new Date(d1 + 'T00:00:00Z');
  const end = new Date(d2 + 'T00:00:00Z');

  // 연도 목록 추출
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();
  const allHolidays = new Set<string>();

  for (let y = startYear; y <= endYear; y++) {
    const map = getAggregatedHolidays(y, selectedCountries);
    map.forEach((_, date) => allHolidays.add(date));
  }

  let totalCalendarDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;
  let workingDays = 0;

  const cur = new Date(start.getTime());
  while (cur <= end) {
    totalCalendarDays++;
    const dayOfWeek = cur.getUTCDay();
    const dateStr = formatDateUtc(cur);

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else if (allHolidays.has(dateStr)) {
      holidayDays++;
    } else {
      workingDays++;
    }

    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  return {
    totalCalendarDays,
    weekendDays,
    holidayDays,
    workingDays,
  };
}
