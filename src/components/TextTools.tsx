import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Sliders, Space, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';

interface TextToolsProps {
  text: string;
  setText: (text: string) => void;
}

export const TextTools: React.FC<TextToolsProps> = ({ text, setText }) => {
  const { t } = useLanguage();

  const removeAllSpaces = () => {
    if (!text) return;
    setText(text.replace(/\s+/g, ''));
  };

  const removeLineBreaks = () => {
    if (!text) return;
    setText(text.replace(/[\r\n]+/g, ' '));
  };

  const toUpperCase = () => {
    if (!text) return;
    setText(text.toUpperCase());
  };

  const toLowerCase = () => {
    if (!text) return;
    setText(text.toLowerCase());
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
      <h3 className="section-title" style={{ fontSize: '1rem', marginBottom: '0.85rem' }}>
        <Sliders size={18} color="var(--accent-color)" />
        {t.tools.title}
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        <button className="btn-tool" onClick={removeAllSpaces}>
          <Space size={14} />
          {t.tools.removeSpaces}
        </button>

        <button className="btn-tool" onClick={removeLineBreaks}>
          <CornerDownLeft size={14} />
          {t.tools.removeLineBreaks}
        </button>

        <button className="btn-tool" onClick={toUpperCase}>
          <ArrowUp size={14} />
          {t.tools.toUpperCase}
        </button>

        <button className="btn-tool" onClick={toLowerCase}>
          <ArrowDown size={14} />
          {t.tools.toLowerCase}
        </button>
      </div>
    </div>
  );
};
