import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AdSlotProps {
  slotId?: string;
  provider?: 'google' | 'naver' | 'auto';
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, provider = 'auto' }) => {
  const { t, language } = useLanguage();

  // If language is Korean, show Naver + Google minimal ad slot info
  const isKorean = language === 'ko';

  return (
    <div className="ad-container" aria-label="Advertisement">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
        <span className="ad-label">{t.adNotice}</span>
        {isKorean && (
          <span style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
            Naver & Google Ads Compatible
          </span>
        )}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        {/* Ad script insertion container */}
        <div id={`ad-slot-${slotId || 'default'}`}>
          {provider === 'naver' || (provider === 'auto' && isKorean) ? (
            <span>[네이버 GFA / 애드포스트 / 구글 아드센스 통합 반응형 배너 슬롯: {slotId}]</span>
          ) : (
            <span>[Google AdSense Responsive Banner Slot: {slotId}]</span>
          )}
        </div>
      </div>
    </div>
  );
};
