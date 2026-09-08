import { memo, useEffect, useMemo, useRef, useState } from 'react';
import './ClockFace.css';

export const clockSkins = ['default', 'airport', 'minimal', 'led'] as const;
export type ClockSkin = typeof clockSkins[number];
export function validClockSkin(value: unknown): value is ClockSkin {
  return clockSkins.some(skin => skin === value);
}

const segments = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
const paths = [
  'M12 4H48L54 10L48 16H12L6 10Z',
  'M50 18L56 12L60 18V46L54 52L48 46V24Z',
  'M54 56L60 62V90L56 96L50 90L48 84V62Z',
  'M12 92H48L54 98L48 104H12L6 98Z',
  'M6 56L12 62V84L10 90L4 96L0 90V62Z',
  'M4 12L10 18L12 24V46L6 52L0 46V18Z',
  'M12 48H48L54 54L48 60H12L6 54Z',
];

function LedDigit({ value }: { value: string }) {
  return <svg className="clock-led-digit" viewBox="0 0 60 108" aria-hidden="true">
    {paths.map((d, i) => <path key={d} d={d} className={segments[Number(value)]?.includes('abcdefg'[i]) ? 'lit' : ''} />)}
  </svg>;
}

function FlipDigit({ value, previous = value, animate }: { value: string; previous?: string; animate: boolean }) {
  const turning = animate && previous !== value;
  return <span className="clock-flip-digit">
    <span className="clock-flip-half top"><span>{value}</span></span>
    <span className="clock-flip-half bottom"><span>{turning ? previous : value}</span></span>
    {turning && <span key={value} className="clock-flip-motion">
      <span className="clock-flip-half top outgoing"><span>{previous}</span></span>
      <span className="clock-flip-half bottom incoming"><span>{value}</span></span>
    </span>}
  </span>;
}

export function ClockDisplay({ skin, groups, period = '', animate = false, previousGroups }: {
  skin: ClockSkin; groups: string[]; period?: string; animate?: boolean; previousGroups?: string[];
}) {
  return <span className={`clock-display clock-display-${skin} ${groups.length === 2 ? 'without-seconds' : ''}`} aria-hidden="true">
    <span className="clock-number-row">
      {groups.map((group, index) => <span className="clock-part" key={index}>
        {index > 0 && <span className="clock-colon">:</span>}
        <span className="clock-pair">{Array.from(group).map((value, digit) => skin === 'airport'
          ? <FlipDigit key={digit} value={value} previous={previousGroups?.[index]?.[digit]} animate={animate} />
          : skin === 'led' ? <LedDigit key={digit} value={value} />
          : <span key={digit}>{value}</span>)}</span>
      </span>)}
    </span>
    {period && <span className="clock-period">{period}</span>}
  </span>;
}

export const AIRPORT_INTRO_DURATION_MS = 3000;
export const AIRPORT_INTRO_FINAL_STEP = 39;
// Keep the board turning for three seconds, then settle on the latest target.
export function airportIntroGroups(groups: string[], step: number): string[] {
  return groups.map(group => Array.from(group, value => String(Math.min(Math.max(0, step), 30 + Number(value)) % 10)).join(''));
}

function AirportClock({ groups, previousGroups, period, animate }: {
  groups: string[]; previousGroups?: string[]; period?: string; animate: boolean;
}) {
  const latest = useRef(groups);
  const settled = useRef<string[] | null>(null);
  useEffect(() => { latest.current = groups; }, [groups]);
  const [intro, setIntro] = useState(() => ({
    active: typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    groups: groups.map(group => '0'.repeat(group.length)),
    previous: groups.map(group => '0'.repeat(group.length)),
  }));
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || document.hidden) {
      setIntro(frame => ({ ...frame, active: false }));
      return;
    }
    const start = performance.now();
    let lastStep = 0;
    let timer: ReturnType<typeof setInterval>;
    const finish = () => {
      clearInterval(timer);
      settled.current = latest.current;
      setIntro(frame => ({ ...frame, active: false }));
    };
    const visibility = () => { if (document.hidden) finish(); };
    const preference = () => { if (motion.matches) finish(); };
    timer = setInterval(() => {
      // Wall time prevents a queued animation backlog after a stalled frame.
      const elapsed = performance.now() - start;
      const step = Math.max(0, Math.floor((elapsed - 100) / ((AIRPORT_INTRO_DURATION_MS - 100) / (AIRPORT_INTRO_FINAL_STEP + 1))));
      if (elapsed >= AIRPORT_INTRO_DURATION_MS) { finish(); return; }
      if (step === lastStep) return;
      lastStep = step;
      setIntro(frame => ({ active: true, previous: frame.groups, groups: airportIntroGroups(latest.current, step) }));
    }, 30);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', preference);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', preference);
    };
  }, []);
  return <span className={intro.active ? 'clock-airport-intro' : 'clock-airport-ready'}>
    <ClockDisplay key={intro.active ? 'intro' : 'live'} skin="airport" groups={intro.active ? intro.groups : groups}
      previousGroups={intro.active ? intro.previous : previousGroups} period={period}
      animate={intro.active || (animate && groups !== settled.current)} />
  </span>;
}

export const ClockFace = memo(function ClockFace({ skin, now, zone, locale, h24, seconds }: {
  skin: ClockSkin; now: number; zone: string; locale: string; h24: boolean; seconds: boolean;
}) {
  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, {
    timeZone: zone, hour: '2-digit', minute: '2-digit', ...(seconds ? { second: '2-digit' as const } : {}),
    hourCycle: h24 ? 'h23' : 'h12',
  }), [zone, locale, h24, seconds]);
  const last = useRef({ now, formatter, skin });
  const animate = now - last.current.now === 1000 && last.current.formatter === formatter && last.current.skin === skin;
  useEffect(() => { last.current = { now, formatter, skin }; }, [now, formatter, skin]);
  const parts = formatter.formatToParts(now);
  const groups = parts.filter(part => ['hour', 'minute', 'second'].includes(part.type)).map(part => part.value.padStart(2, '0'));
  const previousGroups = animate ? formatter.formatToParts(last.current.now).filter(part => ['hour', 'minute', 'second'].includes(part.type)).map(part => part.value.padStart(2, '0')) : undefined;
  const period = parts.find(part => part.type === 'dayPeriod')?.value;
  return <div className={`clock-face clock-face-${skin}`} role="timer" aria-label={formatter.format(now)} aria-live="off">
    {skin === 'default' ? <span className="world-digits">{formatter.format(now)}</span>
      : skin === 'airport' ? <AirportClock key={`${zone}:${locale}:${h24}:${seconds}`} groups={groups} period={period} animate={animate} previousGroups={previousGroups} />
      : <ClockDisplay skin={skin} groups={groups} period={period} animate={animate} previousGroups={previousGroups} />}
  </div>;
});

const DurationDigits = memo(function DurationDigits({ skin, whole }: { skin: ClockSkin; whole: string }) {
  const groups = useMemo(() => whole.split(':'), [whole]);
  const totalSeconds = groups.reduce((total, group) => total * 60 + Number(group), 0);
  const last = useRef({ groups, totalSeconds, skin });
  const animate = Math.abs(totalSeconds - last.current.totalSeconds) === 1 && skin === last.current.skin;
  const previousGroups = animate ? last.current.groups : undefined;
  useEffect(() => { last.current = { groups, totalSeconds, skin }; }, [groups, totalSeconds, skin]);
  return <ClockDisplay skin={skin} groups={groups} previousGroups={previousGroups} animate={animate} />;
});

export const DurationFace = memo(function DurationFace({ skin, value }: { skin: ClockSkin; value: string }) {
  const [whole, fraction] = value.split('.');
  return <div className={`clock-face clock-face-${skin}`} role="timer" aria-label={value} aria-live="off">
    {skin === 'default' ? <span className="world-digits world-duration">{value}</span> : <>
      <DurationDigits skin={skin} whole={whole} />
      {fraction !== undefined && <span className="clock-duration-fraction" aria-hidden="true">.{fraction}</span>}
    </>}
  </div>;
});
