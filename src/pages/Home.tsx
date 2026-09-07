import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { ToolItem } from '../i18n/translations';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const rawTools: ToolItem[] = t.toolsList || [];
  const filteredTools = rawTools.filter((tool: ToolItem) => {
    const q = searchTerm.toLowerCase();
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-container">
      <Header />

      {/* Hero Banner Section */}
      <section 
        className="glass-card" 
        style={{ 
          textAlign: 'center', 
          padding: '2.5rem 1.5rem', 
          marginBottom: '2.5rem', 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12))', 
          borderColor: 'rgba(99, 102, 241, 0.3)' 
        }}
      >
        <div className="badge" style={{ marginBottom: '1rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          <Sparkles size={14} />
          QK TOOL HUB v1.0 LIVE
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
          {t.hubTitle}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 1.75rem' }}>
          {t.hubSubtitle}
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="editor-textarea"
            style={{ minHeight: 'auto', padding: '0.85rem 1rem 0.85rem 2.8rem', fontSize: '0.95rem', borderRadius: '9999px' }}
            placeholder={t.searchToolsPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Top Banner Ad */}
      <AdSlot slotId="home-top-banner" />

      {/* Tools Cards Grid */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            ⚡ {t.allToolsCategory} ({filteredTools.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredTools.map((tool: ToolItem) => {
            const isLive = tool.isLive;
            const cardBorder = isLive ? '1px solid var(--accent-color)' : '1px solid var(--border-color)';
            const cardOpacity = isLive ? 1 : 0.7;
            const badgeBg = isLive ? 'var(--accent-light)' : 'rgba(148, 163, 184, 0.2)';
            const badgeColor = isLive ? 'var(--accent-color)' : 'var(--text-muted)';
            const footerColor = isLive ? 'var(--accent-color)' : 'var(--text-muted)';

            return (
              <div
                key={tool.id}
                className="glass-card"
                style={{
                  cursor: isLive ? 'pointer' : 'default',
                  opacity: cardOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  border: cardBorder
                }}
                onClick={() => {
                  if (isLive) {
                    navigate(tool.path);
                  }
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {tool.category}
                    </span>
                    <span className="badge" style={{ background: badgeBg, color: badgeColor }}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {tool.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {tool.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: footerColor, fontWeight: 600, fontSize: '0.875rem' }}>
                  {isLive ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      바로 이용하기 <ArrowRight size={16} />
                    </span>
                  ) : (
                    <span>{t.comingSoonStatus}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Ad */}
      <AdSlot slotId="home-bottom-banner" />

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
          Privacy-first Online Utilities | Google SEO & AdSense Optimized
        </p>
      </footer>
    </div>
  );
};
