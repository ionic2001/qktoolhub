import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AdSlotProps {
  slotId?: string;
  provider?: 'google' | 'naver' | 'auto';
  format?: 'auto' | 'fluid' | 'rectangle';
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, provider = 'auto', format = 'auto' }) => {
  const { t } = useLanguage();
  const publisherId = 'ca-pub-8866331689980638';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && slotId) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // Ignore adsbygoogle load errors in dev or adblock environments
    }
  }, [slotId]);

  return (
    <div className="ad-container" aria-label="Advertisement">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
        <span className="ad-label">{t.adNotice}</span>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {slotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={publisherId}
            data-ad-slot={slotId}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        ) : (
          <div style={{ opacity: 0.65, fontSize: '0.75rem' }}>
            <span>[Google AdSense Ready - Pub ID: {publisherId}]</span>
          </div>
        )}
      </div>
    </div>
  );
};
