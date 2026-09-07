import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AdSlotProps {
  slotId?: string;
  provider?: 'google' | 'naver' | 'auto';
  format?: 'auto' | 'fluid' | 'rectangle';
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, format = 'auto' }) => {
  const { t } = useLanguage();
  const publisherId = 'ca-pub-8866331689980638';
  const defaultSlotId = '2460449246';
  
  // Use numeric slot ID if provided, otherwise default to 2460449246
  const activeSlotId = (slotId && /^\d+$/.test(slotId)) ? slotId : defaultSlotId;

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch {
        // Ignore adsbygoogle load errors in dev or adblock environments
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeSlotId]);

  return (
    <div className="ad-container" aria-label="Advertisement">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
        <span className="ad-label">{t.adNotice}</span>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={publisherId}
          data-ad-slot={activeSlotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
