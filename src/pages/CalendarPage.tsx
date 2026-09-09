import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Download,
  Printer,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  X,
  Search,
  CheckSquare,
  Square
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AdSlot } from '../components/AdSlot';
import { useLanguage } from '../i18n/LanguageContext';
import { calendarText } from '../i18n/calendarText';
import { calendarGuide } from '../i18n/calendarGuide';
import { useCalendarSeo } from '../utils/useCalendarSeo';
import {
  SUPPORTED_COUNTRIES,
  HolidayItem,
  getAggregatedHolidays,
  SOLAR_TERMS_2026,
  SON_FREE_DAYS_2026,
  calculateBusinessDays,
  formatDateUtc,
} from '../data/holidays';
import { exportHolidaysToIcs } from '../utils/calendarIcs';
import './CalendarPage.css';

// ISO 8601 Week Number 계산 함수
function getIsoWeekNumber(d: Date): number {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.getTime();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export default function CalendarPage() {
  const { language, t } = useLanguage();
  const s = calendarText[language] || calendarText.ko;
  const guide = calendarGuide[language] || calendarGuide.ko;
  const navigate = useNavigate();

  useCalendarSeo(language);

  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const [currentYear, setCurrentYear] = useState<number>(() => today.getFullYear());
  const [activeTab, setActiveTab] = useState<'calendar' | 'holidays' | 'calculator'>('calendar');

  // 다국어 기본 국가 설정
  const defaultCountry = useMemo(() => {
    switch (language) {
      case 'ko': return 'KR';
      case 'ja': return 'JP';
      case 'zh': return 'CN';
      case 'es': return 'ES';
      default: return 'US';
    }
  }, [language]);

  // 선택된 국가 목록 (다중 선택 가능)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('qk-calendar-countries');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [defaultCountry];
  });

  // 언어 변경 시 사용자가 별도 설정을 저장하지 않은 경우 기본 국가 동기화
  useEffect(() => {
    const saved = localStorage.getItem('qk-calendar-countries');
    if (!saved) {
      setSelectedCountries([defaultCountry]);
    }
  }, [defaultCountry]);

  // 국가 변경 시 로컬 스토리지에 저장
  const handleCountryToggle = (code: string) => {
    setSelectedCountries((prev) => {
      let next: string[];
      if (prev.includes(code)) {
        if (prev.length === 1) return prev; // 최소 1개 국가 유지
        next = prev.filter((c) => c !== code);
      } else {
        next = [...prev, code];
      }
      try {
        localStorage.setItem('qk-calendar-countries', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // 옵션 토글
  const [showWeekNumbers, setShowWeekNumbers] = useState<boolean>(true);
  const [showLunar, setShowLunar] = useState<boolean>(true);

  // 국가 선택 모달 열림/닫힘
  const [isCountryModalOpen, setIsCountryModalOpen] = useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>('');

  // 날짜 클릭 상세 정보 모달
  const [selectedDateDetail, setSelectedDateDetail] = useState<string | null>(null);

  // 날짜 마우스 오버(Hover) 플로팅 툴팁 상태
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // 날짜 계산기 탭 상태
  const [ddayTarget, setDdayTarget] = useState<string>(() => `${currentYear}-12-31`);
  const [mathBaseDate, setMathBaseDate] = useState<string>(() => todayStr);
  const [mathDaysInput, setMathDaysInput] = useState<number>(100);
  const [bizStartDate, setBizStartDate] = useState<string>(() => todayStr);
  const [bizEndDate, setBizEndDate] = useState<string>(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 30);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  // 해당 연도 + 선택된 국가들의 공휴일 집합
  const holidaysMap = useMemo(() => {
    return getAggregatedHolidays(currentYear, selectedCountries);
  }, [currentYear, selectedCountries]);

  // 연간 진행률 계산
  const yearProgress = useMemo(() => {
    const start = new Date(currentYear, 0, 1);
    const end = new Date(currentYear, 11, 31, 23, 59, 59);
    const totalMs = end.getTime() - start.getTime();

    let passedMs: number;
    if (today.getFullYear() > currentYear) {
      passedMs = totalMs;
    } else if (today.getFullYear() < currentYear) {
      passedMs = 0;
    } else {
      passedMs = Math.max(0, today.getTime() - start.getTime());
    }

    const percent = Math.min(100, Math.max(0, (passedMs / totalMs) * 100));
    const dayCount = Math.floor(passedMs / 86400000) + 1;
    const totalDays = isLeapYear(currentYear) ? 366 : 365;
    const remainingDays = Math.max(0, totalDays - dayCount);

    return {
      percent: percent.toFixed(1),
      dayCount: Math.min(totalDays, dayCount),
      totalDays,
      remainingDays,
    };
  }, [currentYear, today]);

  // D-Day 계산 결과
  const ddayInfo = useMemo(() => {
    if (!ddayTarget) return null;
    const tDate = new Date(ddayTarget + 'T00:00:00');
    const bDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = Math.round((tDate.getTime() - bDate.getTime()) / 86400000);
    return diff;
  }, [ddayTarget, today]);

  // 날짜 가감 계산 결과
  const mathResultDate = useMemo(() => {
    if (!mathBaseDate) return '';
    const d = new Date(mathBaseDate + 'T00:00:00');
    d.setDate(d.getDate() + Number(mathDaysInput || 0));
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dayOfWeek = s.weekdays[d.getDay()];
    return `${y}-${m}-${day} (${dayOfWeek})`;
  }, [mathBaseDate, mathDaysInput, s.weekdays]);

  // 순수 영업일 계산 결과
  const businessDaysResult = useMemo(() => {
    return calculateBusinessDays(bizStartDate, bizEndDate, selectedCountries);
  }, [bizStartDate, bizEndDate, selectedCountries]);

  // 황금연휴 & 휴일 리스트
  const holidayList = useMemo(() => {
    const arr: HolidayItem[] = [];
    holidaysMap.forEach((items) => arr.push(...items));
    return arr.sort((a, b) => a.date.localeCompare(b.date));
  }, [holidaysMap]);

  // 징검다리 휴일 탐지
  const bridgeTips = useMemo(() => {
    const tips: { holiday: HolidayItem; tipDate: string; description: string }[] = [];
    holidayList.forEach((h) => {
      const d = new Date(h.date + 'T00:00:00');
      const day = d.getDay();
      if (day === 2) {
        // 화요일 공휴일 -> 월요일 연차 추천
        const mon = new Date(d);
        mon.setDate(mon.getDate() - 1);
        const mStr = formatDateUtc(mon);
        tips.push({
          holiday: h,
          tipDate: mStr,
          description: `${mStr} (월) 연차 1일 사용 시 토~화 4일 연속 황금연휴!`,
        });
      } else if (day === 4) {
        // 목요일 공휴일 -> 금요일 연차 추천
        const fri = new Date(d);
        fri.setDate(fri.getDate() + 1);
        const fStr = formatDateUtc(fri);
        tips.push({
          holiday: h,
          tipDate: fStr,
          description: `${fStr} (금) 연차 1일 사용 시 목~일 4일 연속 황금연휴!`,
        });
      }
    });
    return tips;
  }, [holidayList]);

  // 선택된 국가 메타 목록
  const activeCountryMetas = useMemo(() => {
    return SUPPORTED_COUNTRIES.filter((c) => selectedCountries.includes(c.code));
  }, [selectedCountries]);

  // 국가 검색 필터
  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return SUPPORTED_COUNTRIES;
    return SUPPORTED_COUNTRIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name[language]?.toLowerCase().includes(q) ||
        c.name.en.toLowerCase().includes(q) ||
        c.name.ko.includes(q)
    );
  }, [countrySearch, language]);

  return (
    <div className="app-container calendar-page">
      <Header />

      <button
        className="btn-tool"
        onClick={() => navigate('/')}
        style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={16} />
        {t.backToHub.replace(/^\s*[←⇐⟵]\s*/, '')}
      </button>

      {/* Intro Header */}
      <div className="calendar-intro">
        <span className="badge">
          <Sparkles size={14} style={{ marginRight: 6 }} />
          {s.badge}
        </span>
        <h1>{s.title}</h1>
        <p>{s.subtitle}</p>
      </div>

      <AdSlot slotId="calendar-top-banner" />

      {/* Year Progress Bar */}
      <section className="glass-card calendar-progress-card">
        <div className="progress-header">
          <div className="progress-title">
            <Clock size={16} />
            <strong>{currentYear}년 {s.yearProgress}: {yearProgress.percent}%</strong>
          </div>
          <span className="progress-details">
            {yearProgress.dayCount} {s.daysPassed} / {yearProgress.remainingDays} {s.daysRemaining} ({s.weekNumber} {getIsoWeekNumber(today)})
          </span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={Number(yearProgress.percent)} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${yearProgress.percent}%` }} />
        </div>
      </section>

      {/* Control Bar */}
      <section className="glass-card calendar-toolbar">
        <div className="toolbar-left">
          <div className="year-stepper">
            <button
              className="stepper-btn"
              onClick={() => setCurrentYear((y) => y - 1)}
              aria-label="Previous Year"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="current-year-text">{currentYear}년</span>
            <button
              className="stepper-btn"
              onClick={() => setCurrentYear((y) => y + 1)}
              aria-label="Next Year"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            className="btn-today"
            onClick={() => setCurrentYear(today.getFullYear())}
          >
            {s.today}
          </button>

          {/* Multi-Select Country Trigger */}
          <button
            className="btn-country-picker"
            onClick={() => setIsCountryModalOpen(true)}
            aria-haspopup="dialog"
          >
            <Globe size={16} />
            <span className="country-flags">
              {activeCountryMetas.slice(0, 4).map((c) => (
                <span key={c.code} className="flag-icon" title={c.name[language]}>
                  {c.flag}
                </span>
              ))}
              {activeCountryMetas.length > 4 && (
                <span className="flag-more">+{activeCountryMetas.length - 4}</span>
              )}
            </span>
            <span className="country-count-text">
              {selectedCountries.length}{s.countriesSelected}
            </span>
          </button>
        </div>

        <div className="toolbar-right">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showWeekNumbers}
              onChange={(e) => setShowWeekNumbers(e.target.checked)}
            />
            {s.showWeekNumbers}
          </label>

          {selectedCountries.includes('KR') && (
            <label className="toggle-label" title="한국 음력 및 손 없는 날 표기">
              <input
                type="checkbox"
                checked={showLunar}
                onChange={(e) => setShowLunar(e.target.checked)}
              />
              {s.showLunar}
            </label>
          )}

          <button
            className="btn-export-ics"
            onClick={() => exportHolidaysToIcs(currentYear, selectedCountries, holidaysMap, SUPPORTED_COUNTRIES)}
            title="Google/Apple 캘린더용 .ics 파일 다운로드"
          >
            <Download size={15} />
            {s.exportIcs}
          </button>

          <button
            className="btn-print"
            onClick={() => window.print()}
            title="A4 규격 인쇄"
          >
            <Printer size={15} />
            {s.print}
          </button>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="calendar-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'calendar'}
          className={`calendar-tab ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          {s.tabCalendar}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'holidays'}
          className={`calendar-tab ${activeTab === 'holidays' ? 'active' : ''}`}
          onClick={() => setActiveTab('holidays')}
        >
          {s.tabHolidays}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'calculator'}
          className={`calendar-tab ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          {s.tabCalculator}
        </button>
      </div>

      {/* TAB 1: Year View Calendar (Time.is Inspiration) */}
      {activeTab === 'calendar' && (
        <div className="calendar-grid-year">
          {Array.from({ length: 12 }).map((_, monthIdx) => {
            const firstDay = new Date(currentYear, monthIdx, 1);
            const daysInMonth = new Date(currentYear, monthIdx + 1, 0).getDate();
            const startDayOfWeek = firstDay.getDay(); // 0: 일, 6: 토

            // 달력 행(주) 생성
            const weeks: Array<Array<{ dateStr: string; day: number; isCurrentMonth: boolean; weekNum: number }>> = [];
            let currentWeek: Array<{ dateStr: string; day: number; isCurrentMonth: boolean; weekNum: number }> = [];

            // 이전 달 빈 칸
            const prevMonthDays = new Date(currentYear, monthIdx, 0).getDate();
            for (let i = startDayOfWeek - 1; i >= 0; i--) {
              const d = prevMonthDays - i;
              const dateObj = new Date(currentYear, monthIdx - 1, d);
              currentWeek.push({
                dateStr: formatDateUtc(dateObj),
                day: d,
                isCurrentMonth: false,
                weekNum: getIsoWeekNumber(dateObj),
              });
            }

            // 이번 달 날짜 채우기
            for (let d = 1; d <= daysInMonth; d++) {
              const dateObj = new Date(currentYear, monthIdx, d);
              const dateStr = formatDateUtc(dateObj);
              currentWeek.push({
                dateStr,
                day: d,
                isCurrentMonth: true,
                weekNum: getIsoWeekNumber(dateObj),
              });

              if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
              }
            }

            // 다음 달 빈 칸 채우기
            if (currentWeek.length > 0) {
              let nextD = 1;
              while (currentWeek.length < 7) {
                const dateObj = new Date(currentYear, monthIdx + 1, nextD);
                currentWeek.push({
                  dateStr: formatDateUtc(dateObj),
                  day: nextD,
                  isCurrentMonth: false,
                  weekNum: getIsoWeekNumber(dateObj),
                });
                nextD++;
              }
              weeks.push(currentWeek);
            }

            return (
              <div key={monthIdx} className="glass-card month-card">
                <div className="month-header">
                  <h3 className="month-name">{s.months[monthIdx]}</h3>
                  <span className="month-year">{currentYear}</span>
                </div>

                <div className="month-table">
                  <div className="week-header-row">
                    {showWeekNumbers && <span className="col-w">W</span>}
                    {s.weekdays.map((wd, wIdx) => (
                      <span
                        key={wd}
                        className={`col-wd ${wIdx === 0 ? 'is-sunday' : wIdx === 6 ? 'is-saturday' : ''}`}
                      >
                        {wd}
                      </span>
                    ))}
                  </div>

                  {weeks.map((week, wIdx) => {
                    const rowWeekNum = week[0]?.weekNum;
                    return (
                      <div key={wIdx} className="week-row">
                        {showWeekNumbers && <span className="cell-week-num">{rowWeekNum}</span>}
                        {week.map((cell) => {
                          const isToday = cell.dateStr === todayStr;
                          const holidaysOnDay = holidaysMap.get(cell.dateStr) || [];
                          const hasHoliday = holidaysOnDay.length > 0;
                          const cellDateObj = new Date(cell.dateStr + 'T00:00:00');
                          const dow = cellDateObj.getDay();
                          const isPast = cell.dateStr < todayStr;
                          const isSonFree =
                            showLunar &&
                            selectedCountries.includes('KR') &&
                            SON_FREE_DAYS_2026.has(cell.dateStr);
                          const solarTerm =
                            showLunar &&
                            selectedCountries.includes('KR') &&
                            SOLAR_TERMS_2026[cell.dateStr];

                          return (
                            <button
                              key={cell.dateStr}
                              className={`day-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${
                                isToday ? 'is-today' : ''
                              } ${hasHoliday ? 'has-holiday' : ''} ${
                                dow === 0 ? 'is-sunday' : dow === 6 ? 'is-saturday' : ''
                              } ${isPast ? 'is-past' : ''}`}
                              onClick={() => setSelectedDateDetail(cell.dateStr)}
                              onMouseEnter={(e) => {
                                setHoveredDate(cell.dateStr);
                                setMousePos({ x: e.clientX, y: e.clientY });
                              }}
                              onMouseMove={(e) => {
                                setMousePos({ x: e.clientX, y: e.clientY });
                              }}
                              onMouseLeave={() => {
                                setHoveredDate(null);
                                setMousePos(null);
                              }}
                              title={`${cell.dateStr} ${holidaysOnDay.map((h) => h.name).join(', ')}`}
                            >
                              <span className="day-number">{cell.day}</span>

                              {/* Holidays Badges / Flags */}
                              {hasHoliday && (
                                <div className="holiday-badges-container">
                                  {holidaysOnDay.map((h, hIdx) => {
                                    const meta = SUPPORTED_COUNTRIES.find((c) => c.code === h.countryCode);
                                    return (
                                      <span
                                        key={hIdx}
                                        className="holiday-dot"
                                        style={{ backgroundColor: meta?.color || 'var(--accent-color)' }}
                                        title={`${meta?.flag || ''} ${h.name}${h.isSubstitute ? ` (${s.substituteHoliday})` : ''}`}
                                      >
                                        {meta?.flag}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}

                              {/* 손 없는 날 / 절기 배지 (한국) */}
                              {isSonFree && <span className="son-free-tag" title={s.sonFreeDay}>🚚</span>}
                              {solarTerm && <span className="solar-term-tag">{solarTerm}</span>}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Holidays & Golden Vacation Planner */}
      {activeTab === 'holidays' && (
        <div className="tab-holidays-container">
          {/* Bridge Holiday Tips */}
          {bridgeTips.length > 0 && (
            <section className="glass-card bridge-tips-card">
              <div className="bridge-tips-header">
                <Sparkles size={18} color="var(--accent-color)" />
                <h3>{s.bridgeHolidayTip} (징검다리 황금연휴 추천)</h3>
              </div>
              <div className="bridge-tips-grid">
                {bridgeTips.map((tip, idx) => (
                  <div key={idx} className="bridge-tip-item">
                    <span className="badge badge-accent">{tip.holiday.name}</span>
                    <p>{tip.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Holiday List Timeline */}
          <section className="glass-card holiday-timeline-card">
            <div className="timeline-header">
              <h2>{s.goldenHolidayTitle} ({currentYear})</h2>
              <p>{s.totalHolidaysCount}: <strong>{holidayList.length}</strong>개</p>
            </div>

            {holidayList.length === 0 ? (
              <p className="empty-text">{s.noHolidaysFound}</p>
            ) : (
              <div className="holiday-timeline-list">
                {holidayList.map((item, idx) => {
                  const meta = SUPPORTED_COUNTRIES.find((c) => c.code === item.countryCode);
                  const dt = new Date(item.date + 'T00:00:00');
                  const weekday = s.weekdays[dt.getDay()];
                  return (
                    <div key={idx} className="holiday-timeline-row">
                      <div className="holiday-date-box">
                        <span className="date-main">{item.date}</span>
                        <span className="date-weekday">({weekday})</span>
                      </div>
                      <div className="holiday-info-box">
                        <span className="country-badge" style={{ borderColor: meta?.color }}>
                          {meta?.flag} {meta?.name[language] || item.countryCode}
                        </span>
                        <strong className="holiday-name">{item.name}</strong>
                        {item.originalName && (
                          <span className="holiday-original">({item.originalName})</span>
                        )}
                        {item.isSubstitute && (
                          <span className="badge badge-substitute">{s.substituteHoliday}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 3: Date & Working Business Days Calculator */}
      {activeTab === 'calculator' && (
        <div className="tab-calculator-container">
          {/* Net Business Working Days Tool */}
          <section className="glass-card calc-card">
            <div className="calc-card-header">
              <CalendarIcon size={20} color="var(--accent-color)" />
              <h2>{s.businessDaysTitle}</h2>
            </div>
            <p className="calc-card-desc">{s.businessDaysHelp}</p>

            <div className="calc-inputs-row">
              <label>
                {s.startDate}
                <input
                  type="date"
                  value={bizStartDate}
                  onChange={(e) => setBizStartDate(e.target.value)}
                />
              </label>
              <label>
                {s.endDate}
                <input
                  type="date"
                  value={bizEndDate}
                  onChange={(e) => setBizEndDate(e.target.value)}
                />
              </label>
            </div>

            <div className="biz-results-grid">
              <div className="biz-metric-box">
                <span className="metric-label">{s.totalCalendarDays}</span>
                <strong className="metric-value">{businessDaysResult.totalCalendarDays}일</strong>
              </div>
              <div className="biz-metric-box">
                <span className="metric-label">{s.weekendDaysCount}</span>
                <strong className="metric-value text-muted">{businessDaysResult.weekendDays}일</strong>
              </div>
              <div className="biz-metric-box">
                <span className="metric-label">{s.holidayDaysCount}</span>
                <strong className="metric-value text-danger">{businessDaysResult.holidayDays}일</strong>
              </div>
              <div className="biz-metric-box highlight-metric">
                <span className="metric-label">{s.netWorkingDays}</span>
                <strong className="metric-value text-accent">{businessDaysResult.workingDays}일</strong>
              </div>
            </div>
          </section>

          {/* D-Day & Date Math Side-by-Side */}
          <div className="calc-sub-grid">
            <section className="glass-card calc-card">
              <div className="calc-card-header">
                <Clock size={18} />
                <h3>{s.ddayTitle}</h3>
              </div>
              <label>
                {s.targetDate}
                <input
                  type="date"
                  value={ddayTarget}
                  onChange={(e) => setDdayTarget(e.target.value)}
                />
              </label>
              <div className="dday-display-box">
                {ddayInfo === null ? (
                  <p>-</p>
                ) : ddayInfo === 0 ? (
                  <p className="dday-today">{s.ddayToday}</p>
                ) : ddayInfo > 0 ? (
                  <p className="dday-future">
                    <span className="dday-tag">D-{ddayInfo}</span>
                    <span className="dday-text">({ddayInfo} {s.ddayResultBefore})</span>
                  </p>
                ) : (
                  <p className="dday-past">
                    <span className="dday-tag">D+{Math.abs(ddayInfo)}</span>
                    <span className="dday-text">({Math.abs(ddayInfo)} {s.ddayResultAfter})</span>
                  </p>
                )}
              </div>
            </section>

            <section className="glass-card calc-card">
              <div className="calc-card-header">
                <CalendarIcon size={18} />
                <h3>{s.dateMathTitle}</h3>
              </div>
              <label>
                {s.baseDate}
                <input
                  type="date"
                  value={mathBaseDate}
                  onChange={(e) => setMathBaseDate(e.target.value)}
                />
              </label>
              <label>
                {s.daysToAdd}
                <input
                  type="number"
                  value={mathDaysInput}
                  onChange={(e) => setMathDaysInput(Number(e.target.value))}
                />
              </label>
              <div className="math-result-box">
                <span className="result-label">{s.resultDate}:</span>
                <strong className="result-value">{mathResultDate}</strong>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Multi-Select Country Modal */}
      {isCountryModalOpen && (
        <dialog
          className="calendar-country-dialog"
          open
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCountryModalOpen(false);
          }}
        >
          <div className="dialog-content glass-card">
            <div className="dialog-header">
              <div>
                <h2>{s.countryModalTitle}</h2>
                <p>{s.countryModalDesc}</p>
              </div>
              <button
                className="btn-close-dialog"
                onClick={() => setIsCountryModalOpen(false)}
                aria-label={s.close}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Presets & Search */}
            <div className="dialog-presets-row">
              <button
                className="btn-preset"
                onClick={() => setSelectedCountries([defaultCountry])}
              >
                {s.presetMyLang} ({SUPPORTED_COUNTRIES.find((c) => c.code === defaultCountry)?.flag})
              </button>
              <button
                className="btn-preset"
                onClick={() => setSelectedCountries(['KR', 'US', 'JP', 'GB'])}
              >
                {s.presetMarkets}
              </button>
              <button
                className="btn-preset-clear"
                onClick={() => setSelectedCountries(['KR'])}
              >
                {s.clearAll}
              </button>
            </div>

            <div className="dialog-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder={s.countrySearchPlaceholder}
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
              />
            </div>

            {/* Country Checkbox List */}
            <div className="dialog-country-list">
              {filteredCountries.map((c) => {
                const isSelected = selectedCountries.includes(c.code);
                return (
                  <div
                    key={c.code}
                    className={`country-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCountryToggle(c.code)}
                  >
                    <div className="country-meta-left">
                      {isSelected ? (
                        <CheckSquare size={18} color="var(--accent-color)" />
                      ) : (
                        <Square size={18} color="var(--text-muted)" />
                      )}
                      <span className="flag">{c.flag}</span>
                      <strong className="name">{c.name[language] || c.name.en}</strong>
                      <span className="code">({c.code})</span>
                    </div>
                    <span className="color-dot" style={{ backgroundColor: c.color }} />
                  </div>
                );
              })}
            </div>

            <div className="dialog-footer">
              <span>{selectedCountries.length}개 국가 선택됨</span>
              <button
                className="btn-primary"
                onClick={() => setIsCountryModalOpen(false)}
              >
                {s.close}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Date Detail Popup Modal */}
      {selectedDateDetail && (
        <dialog
          className="calendar-country-dialog"
          open
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDateDetail(null);
          }}
        >
          <div className="dialog-content glass-card date-detail-card">
            <div className="dialog-header">
              <div>
                <h2>{selectedDateDetail}</h2>
                <p>
                  {new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(selectedDateDetail + 'T00:00:00'))}
                </p>
              </div>
              <button
                className="btn-close-dialog"
                onClick={() => setSelectedDateDetail(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Date Details */}
            {(() => {
              const dt = new Date(selectedDateDetail + 'T00:00:00');
              const startOfYear = new Date(dt.getFullYear(), 0, 1);
              const dayOfYear = Math.floor((dt.getTime() - startOfYear.getTime()) / 86400000) + 1;
              const isoWeek = getIsoWeekNumber(dt);
              const ddayDiff = Math.round((dt.getTime() - today.setHours(0, 0, 0, 0)) / 86400000);
              const hOnDay = holidaysMap.get(selectedDateDetail) || [];
              const isSonFree = SON_FREE_DAYS_2026.has(selectedDateDetail);
              const solarTerm = SOLAR_TERMS_2026[selectedDateDetail];

              return (
                <div className="date-detail-body">
                  <div className="detail-meta-grid">
                    <div className="meta-box">
                      <span className="meta-lbl">{dt.getFullYear()}년 {s.dayOfYear}</span>
                      <strong className="meta-val">{dayOfYear}일째</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-lbl">{s.weekOfYear}</span>
                      <strong className="meta-val">W{isoWeek}</strong>
                    </div>
                    <div className="meta-box">
                      <span className="meta-lbl">D-Day</span>
                      <strong className="meta-val">
                        {ddayDiff === 0 ? 'TODAY' : ddayDiff > 0 ? `D-${ddayDiff}` : `D+${Math.abs(ddayDiff)}`}
                      </strong>
                    </div>
                  </div>

                  {solarTerm && (
                    <div className="solar-term-info">
                      🌿 <strong>24절기:</strong> {solarTerm}
                    </div>
                  )}

                  {isSonFree && (
                    <div className="son-free-info">
                      🚚 <strong>손 없는 날:</strong> 악귀가 없어 이사나 혼례, 집수리에 길한 날입니다.
                    </div>
                  )}

                  <div className="day-holidays-section">
                    <h4>{s.holidaysOnThisDay}</h4>
                    {hOnDay.length === 0 ? (
                      <p className="no-holiday-msg">{s.none}</p>
                    ) : (
                      <div className="day-holidays-list">
                        {hOnDay.map((h, idx) => {
                          const meta = SUPPORTED_COUNTRIES.find((c) => c.code === h.countryCode);
                          return (
                            <div key={idx} className="day-holiday-badge-item">
                              <span className="flag">{meta?.flag}</span>
                              <strong>{h.name}</strong>
                              {h.originalName && <span className="original">({h.originalName})</span>}
                              {h.isSubstitute && (
                                <span className="badge badge-substitute">{s.substituteHoliday}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            <div className="dialog-footer">
              <button
                className="btn-primary"
                onClick={() => setSelectedDateDetail(null)}
              >
                {s.close}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Floating Hover Tooltip */}
      {hoveredDate && mousePos && !selectedDateDetail && (
        <div
          className="calendar-hover-tooltip"
          style={{
            position: 'fixed',
            left: mousePos.x + 16 > (typeof window !== 'undefined' ? window.innerWidth - 260 : 600) ? mousePos.x - 260 : mousePos.x + 16,
            top: mousePos.y + 16 > (typeof window !== 'undefined' ? window.innerHeight - 180 : 600) ? mousePos.y - 180 : mousePos.y + 16,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {(() => {
            const dt = new Date(hoveredDate + 'T00:00:00');
            const dayOfWeek = s.weekdays[dt.getDay()];
            const startOfYear = new Date(dt.getFullYear(), 0, 1);
            const dayOfYear = Math.floor((dt.getTime() - startOfYear.getTime()) / 86400000) + 1;
            const isoWeek = getIsoWeekNumber(dt);
            const ddayDiff = Math.round((dt.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86400000);
            const hOnDay = holidaysMap.get(hoveredDate) || [];
            const isSonFree = showLunar && selectedCountries.includes('KR') && SON_FREE_DAYS_2026.has(hoveredDate);
            const solarTerm = showLunar && selectedCountries.includes('KR') && SOLAR_TERMS_2026[hoveredDate];

            return (
              <div className="tooltip-card">
                <div className="tooltip-header">
                  <strong>{hoveredDate} ({dayOfWeek})</strong>
                  <span className="tooltip-dday">
                    {ddayDiff === 0 ? 'D-Day' : ddayDiff > 0 ? `D-${ddayDiff}` : `D+${Math.abs(ddayDiff)}`}
                  </span>
                </div>
                <div className="tooltip-meta">
                  <span>W{isoWeek}주차 · {dayOfYear}일째</span>
                </div>
                {solarTerm && <div className="tooltip-extra">🌿 {solarTerm}</div>}
                {isSonFree && <div className="tooltip-extra">🚚 {s.sonFreeDay}</div>}
                {hOnDay.length > 0 && (
                  <div className="tooltip-holidays">
                    {hOnDay.map((h, i) => {
                      const meta = SUPPORTED_COUNTRIES.find((c) => c.code === h.countryCode);
                      return (
                        <div key={i} className="tooltip-holiday-item">
                          <span>{meta?.flag}</span>
                          <strong>{h.name}</strong>
                          {h.isSubstitute && <span className="tooltip-sub">대체</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      <AdSlot slotId="calendar-bottom-banner" />

      {/* Guide Section */}
      <section className="glass-card calendar-help" aria-labelledby="calendar-guide-title">
        <h2 id="calendar-guide-title">💡 {s.title} 사용 안내 & 특징</h2>
        <div className="calendar-guide-grid">
          {guide.sections.map((item, i) => (
            <div key={i} className="calendar-guide-item">
              <h3>
                <span className="guide-num">{i + 1}</span> {item.title}
              </h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
