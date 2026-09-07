import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Copy, RotateCcw, Scissors, Check, Save } from 'lucide-react';

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ text, setText }) => {
  const { t } = useLanguage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [truncateValue, setTruncateValue] = useState<number>(280);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(t.tools.copiedNotice);
  };

  const handleClear = () => {
    if (!text) return;
    setText('');
    showToast(t.tools.clearedNotice);
  };

  const handleTruncate = () => {
    if (!text || text.length <= truncateValue) return;
    setText(text.slice(0, truncateValue));
    showToast(`${truncateValue}${t.platforms.chars} ${t.tools.trimmedNotice}`);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <span className="badge">
          <Save size={12} />
          {t.autoSavedNotice}
        </span>
        {toastMessage && (
          <span className="badge" style={{ background: 'var(--success-color)', color: 'white' }}>
            <Check size={12} />
            {toastMessage}
          </span>
        )}
      </div>

      <textarea
        className="editor-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholderText}
        autoFocus
      />

      <div className="editor-actions">
        <button className="btn-tool" onClick={handleCopy}>
          <Copy size={16} />
          {t.tools.copyText}
        </button>

        <button className="btn-tool btn-danger" onClick={handleClear}>
          <RotateCcw size={16} />
          {t.tools.clearText}
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
          <select
            className="lang-select"
            value={truncateValue}
            onChange={(e) => setTruncateValue(Number(e.target.value))}
            style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
          >
            <option value={140}>140{t.platforms.chars} (X 한글)</option>
            <option value={280}>280{t.platforms.chars} (X 영문)</option>
            <option value={50}>50{t.platforms.chars} (SEO Title)</option>
            <option value={150}>150{t.platforms.chars} (Meta Desc)</option>
            <option value={500}>500{t.platforms.chars}</option>
            <option value={1000}>1000{t.platforms.chars}</option>
          </select>
          <button className="btn-tool" onClick={handleTruncate}>
            <Scissors size={16} />
            {t.tools.truncateLimit}
          </button>
        </div>
      </div>
    </div>
  );
};
