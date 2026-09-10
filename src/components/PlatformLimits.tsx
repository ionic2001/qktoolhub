import { seoContent } from '../seo/catalog';
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { TextStats } from '../utils/counter';
import { BarChart3, AlertCircle } from 'lucide-react';

interface PlatformLimitsProps {
  stats: TextStats;
}

interface LimitItem {
  title: string;
  desc: string;
  current: number;
  max: number;
  unit: string;
  isByte?: boolean;
}

export const PlatformLimits: React.FC<PlatformLimitsProps> = ({ stats }) => {
  const { t, language } = useLanguage();

  const platformItems: LimitItem[] = [
    {
      title: t.platforms.xTitle,
      desc: t.platforms.xDesc,
      current: stats.charCount,
      max: 280,
      unit: t.platforms.chars
    },
    {
      title: t.platforms.seoTitle,
      desc: t.platforms.seoTitleDesc,
      current: stats.charCount,
      max: 50,
      unit: t.platforms.chars
    },
    {
      title: t.platforms.metaDesc,
      desc: t.platforms.metaDescDesc,
      current: stats.charCount,
      max: 150,
      unit: t.platforms.chars
    },
    {
      title: t.platforms.ogDesc,
      desc: t.platforms.ogDescDesc,
      current: stats.charCount,
      max: 100,
      unit: t.platforms.chars
    },
    {
      title: t.platforms.smsTitle,
      desc: t.platforms.smsDesc,
      current: stats.eucKrBytes,
      max: 80,
      unit: t.platforms.bytes,
      isByte: true
    }
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 className="section-title">
        <BarChart3 size={20} color="var(--accent-color)" />
        {t.platforms.title}
      </h2>

      <p>{seoContent[language].seoNote}</p>
      <div className="platform-grid">
        {platformItems.map((item, idx) => {
          const percent = Math.min(100, Math.round((item.current / item.max) * 100));
          const isOver = item.current > item.max;
          const isWarning = !isOver && percent >= 80;

          let barClass = 'progress-bar normal';
          if (isOver) barClass = 'progress-bar over';
          else if (isWarning) barClass = 'progress-bar warning';

          return (
            <div key={idx} className="glass-card platform-card">
              <div className="platform-header">
                <span className="platform-name">
                  {item.title}
                  {isOver && <AlertCircle size={14} color="var(--danger-color)" />}
                </span>
                <span className="platform-count" style={{ color: isOver ? 'var(--danger-color)' : 'var(--text-primary)' }}>
                  {item.current} / {item.max} {item.unit}
                </span>
              </div>

              <div className="progress-track">
                <div className={barClass} style={{ width: `${percent}%` }} />
              </div>

              <div className="platform-desc">
                {item.desc} {isOver && <span style={{ color: 'var(--danger-color)', fontWeight: 600 }}>(초과됨)</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
