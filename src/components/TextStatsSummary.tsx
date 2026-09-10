import { seoContent } from '../seo/catalog';
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { TextStats } from '../utils/counter';
import { Type, AlignLeft, Hash, Clock, FileCode, HardDrive } from 'lucide-react';

interface TextStatsSummaryProps {
  stats: TextStats;
}

export const TextStatsSummary: React.FC<TextStatsSummaryProps> = ({ stats }) => {
  const { t, language } = useLanguage();
  const labels = seoContent[language];

  return (
    <div className="stats-grid">
      {/* 글자수 (공백 포함) */}
      <div className="glass-card stat-card primary" title={t.tooltips.charCount}>
        <div className="stat-label">
          <Type size={16} />
          {t.stats.charCount}
        </div>
        <div className="stat-value">
          {stats.charCount.toLocaleString()}
          <span className="stat-unit">{t.platforms.chars}</span>
        </div>
      </div>

      {/* 글자수 (공백 제외) */}
      <div className="glass-card stat-card primary" title={t.tooltips.charNoSpaceCount}>
        <div className="stat-label">
          <Type size={16} />
          {t.stats.charNoSpaceCount}
        </div>
        <div className="stat-value">
          {stats.charNoSpaceCount.toLocaleString()}
          <span className="stat-unit">{t.platforms.chars}</span>
        </div>
      </div>

      {/* 단어수 */}
      <div className="glass-card stat-card" title={t.tooltips.wordCount}>
        <div className="stat-label">
          <AlignLeft size={16} />
          {t.stats.wordCount}
        </div>
        <div className="stat-value">
          {stats.wordCount.toLocaleString()}
        </div>
      </div>

      {/* 문장수 / 단락수 / 줄수 */}
      <div className="glass-card stat-card" title={`${t.tooltips.sentenceCount} | ${t.tooltips.lineCount}`}>
        <div className="stat-label">
          <Hash size={16} />
          {t.stats.sentenceCount} / {t.stats.paragraphCount}
        </div>
        <div className="stat-value" style={{ fontSize: '1.4rem' }}>
          {stats.sentenceCount} <span className="stat-unit">{labels.sentenceUnit}</span> | {stats.lineCount} <span className="stat-unit">{labels.lineUnit}</span>
        </div>
      </div>

      {/* EUC-KR 바이트 */}
      <div className="glass-card stat-card" title={t.tooltips.eucKrBytes}>
        <div className="stat-label">
          <HardDrive size={16} />
          {t.stats.eucKrBytes}
        </div>
        <div className="stat-value">
          {stats.eucKrBytes.toLocaleString()}
          <span className="stat-unit">Byte</span>
        </div>
      </div>

      {/* UTF-8 바이트 */}
      <div className="glass-card stat-card" title={t.tooltips.utf8Bytes}>
        <div className="stat-label">
          <FileCode size={16} />
          {t.stats.utf8Bytes}
        </div>
        <div className="stat-value">
          {stats.utf8Bytes.toLocaleString()}
          <span className="stat-unit">Byte</span>
        </div>
      </div>

      {/* 예상 읽기 시간 */}
      <div className="glass-card stat-card" title={t.tooltips.readingTime}>
        <div className="stat-label">
          <Clock size={16} />
          {t.stats.readingTime}
        </div>
        <div className="stat-value" style={{ fontSize: '1.3rem' }}>
          {stats.readingTimeMinutes > 0 && `${stats.readingTimeMinutes}${t.stats.minutes} `}
          {stats.readingTimeSeconds}{t.stats.seconds}
        </div>
      </div>

      {/* 예상 발표 시간 */}
      <div className="glass-card stat-card" title={t.tooltips.speakingTime}>
        <div className="stat-label">
          <Clock size={16} />
          {t.stats.speakingTime}
        </div>
        <div className="stat-value" style={{ fontSize: '1.3rem' }}>
          {stats.speakingTimeMinutes > 0 && `${stats.speakingTimeMinutes}${t.stats.minutes} `}
          {stats.speakingTimeSeconds}{t.stats.seconds}
        </div>
      </div>
    </div>
  );
};
