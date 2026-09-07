import React, { useState } from 'react';
import { DEFAULT_CURRENCIES, ADDITIONAL_CURRENCIES, CurrencyInfo, RatesData } from '../utils/currencyRates';
import { useLanguage } from '../i18n/LanguageContext';
import { CheckCircle, PlusCircle, X, Globe, Search, Pin, ChevronUp, ChevronDown, Zap } from 'lucide-react';

interface CurrencyGridProps {
  amount: number;
  baseCurrency: string;
  ratesData: RatesData | null;
  selectedTarget: string;
  onSelectTarget: (code: string) => void;
  onCurrencyInputChange: (code: string, newAmount: number) => void;
}

// Korean digit scale helper for human-readable reading (억, 만 원/엔/동)
function formatCurrencyScale(val: number, code: string): string {
  if (isNaN(val) || val <= 0) return '';

  if (code === 'KRW') {
    if (val >= 100000000) {
      const uk = Math.floor(val / 100000000);
      const man = Math.floor((val % 100000000) / 10000);
      return `≈ ${uk}억 ${man > 0 ? man + '만 ' : ''}원`;
    }
    if (val >= 10000) {
      const man = Math.floor(val / 10000);
      const rest = Math.floor(val % 10000);
      return `≈ ${man}만 ${rest > 0 ? rest.toLocaleString() + ' ' : ''}원`;
    }
    return `≈ ${Math.floor(val).toLocaleString()}원`;
  }

  if (code === 'JPY') {
    if (val >= 10000) {
      const man = Math.floor(val / 10000);
      const rest = Math.floor(val % 10000);
      return `≈ ${man}만 ${rest > 0 ? rest.toLocaleString() + ' ' : ''}엔`;
    }
    return `≈ ${Math.floor(val).toLocaleString()}엔`;
  }

  if (code === 'VND' || code === 'IDR') {
    if (val >= 10000) {
      const man = Math.floor(val / 10000);
      return `≈ ${man}만 ${code === 'VND' ? '동' : '루피아'}`;
    }
  }

  const isZeroDecimal = ['KRW', 'JPY', 'VND', 'IDR'].includes(code);
  return `≈ ${val.toLocaleString(undefined, {
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2
  })}`;
}

export const CurrencyGrid: React.FC<CurrencyGridProps> = ({
  amount,
  baseCurrency,
  ratesData,
  selectedTarget,
  onSelectTarget,
  onCurrencyInputChange
}) => {
  const { t } = useLanguage();
  const currencyT = t.currency;

  const [activeCurrencies, setActiveCurrencies] = useState<CurrencyInfo[]>(DEFAULT_CURRENCIES);
  const [pinnedCodes, setPinnedCodes] = useState<string[]>(['KRW', 'USD']);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Controlled input strings for smooth decimal typing (.5, 10., 0.05)
  const [inputStrings, setInputStrings] = useState<Record<string, string>>({});
  const [focusedCode, setFocusedCode] = useState<string | null>(null);

  if (!ratesData) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>환율 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  const { rates } = ratesData;

  // Available currencies to add from ADDITIONAL_CURRENCIES
  const availableToAdd = ADDITIONAL_CURRENCIES.filter(
    (addC) => !activeCurrencies.some((curr) => curr.code === addC.code)
  );

  // Filtered available currencies based on search query
  const filteredAvailable = availableToAdd.filter((addC) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const codeMatch = addC.code.toLowerCase().includes(query);
    const symbolMatch = addC.symbol.toLowerCase().includes(query);
    const localizedName = (currencyT?.currencyNames?.[addC.code] || '').toLowerCase();
    const nameMatch = localizedName.includes(query);
    return codeMatch || symbolMatch || nameMatch;
  });

  const handleAddCurrency = (curr: CurrencyInfo) => {
    setActiveCurrencies((prev) => [...prev, curr]);
    onSelectTarget(curr.code);
    setShowAddModal(false);
    setSearchQuery('');
  };

  const handleRemoveCurrency = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCurrencies.length <= 2) return;
    setActiveCurrencies((prev) => prev.filter((c) => c.code !== code));
    setPinnedCodes((prev) => prev.filter((p) => p !== code));
    if (selectedTarget === code) {
      const remaining = activeCurrencies.filter((c) => c.code !== code);
      if (remaining.length > 0) {
        onSelectTarget(remaining[0].code);
      }
    }
  };

  const togglePin = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const moveCurrency = (code: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const index = activeCurrencies.findIndex((c) => c.code === code);
    if (index < 0) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= activeCurrencies.length) return;

    const updated = [...activeCurrencies];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setActiveCurrencies(updated);
  };

  // Sort currencies: Pinned currencies float to the top
  const sortedCurrencies = [...activeCurrencies].sort((a, b) => {
    const aPinned = pinnedCodes.includes(a.code);
    const bPinned = pinnedCodes.includes(b.code);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  const handleInputChange = (code: string, rawVal: string) => {
    setInputStrings((prev) => ({ ...prev, [code]: rawVal }));

    // Parse float value for calculation
    const parsed = parseFloat(rawVal);
    if (!isNaN(parsed) && parsed >= 0) {
      onCurrencyInputChange(code, parsed);
    } else if (rawVal === '') {
      onCurrencyInputChange(code, 0);
    }
  };

  const handleInputBlur = (code: string) => {
    setFocusedCode(null);
    setInputStrings((prev) => {
      const copy = { ...prev };
      delete copy[code];
      return copy;
    });
  };

  const getPresetLabel = (p: { code: string; val: number; labelKo: string; labelEn: string; labelJa: string; labelZh: string; labelEs: string }) => {
    if (language === 'ko') return p.labelKo;
    if (language === 'ja') return p.labelJa;
    if (language === 'zh') return p.labelZh;
    if (language === 'es') return p.labelEs;
    return p.labelEn;
  };

  // Preset Amount Quick Buttons
  const presetAmounts = [
    { labelKo: '$10', labelEn: '$10', labelJa: '$10', labelZh: '$10', labelEs: '$10', code: 'USD', val: 10 },
    { labelKo: '$100', labelEn: '$100', labelJa: '$100', labelZh: '$100', labelEs: '$100', code: 'USD', val: 100 },
    { labelKo: '$500', labelEn: '$500', labelJa: '$500', labelZh: '$500', labelEs: '$500', code: 'USD', val: 500 },
    { labelKo: '$1,000', labelEn: '$1,000', labelJa: '$1,000', labelZh: '$1,000', labelEs: '$1,000', code: 'USD', val: 1000 },
    { labelKo: '10만원', labelEn: '₩100K', labelJa: '10万ウォン', labelZh: '10万韩元', labelEs: '₩100K', code: 'KRW', val: 100000 },
    { labelKo: '100만원', labelEn: '₩1M', labelJa: '100万ウォン', labelZh: '100万韩元', labelEs: '₩1M', code: 'KRW', val: 1000000 },
    { labelKo: '1만엔', labelEn: '¥10,000', labelJa: '1万円', labelZh: '1万日元', labelEs: '¥10.000', code: 'JPY', val: 10000 }
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Quick Amount Preset Bar */}
      <div
        className="glass-card"
        style={{
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          background: 'rgba(99, 102, 241, 0.06)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-color)', flexShrink: 0 }}>
          <Zap size={16} />
          {currencyT?.quickPresetLabel || '자주 쓰는 금액 퀵 입력:'}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {presetAmounts.map((p) => {
            const label = getPresetLabel(p);
            return (
              <button
                key={p.code + p.val}
                onClick={() => onCurrencyInputChange(p.code, p.val)}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.color = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          {currencyT?.allCurrenciesTitle || '📊 주요 국가 환율 한눈에 보기'}
        </h2>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {currencyT?.pinNotice || '💡 📌 버튼으로 자주 쓰는 통화를 상단에 고정하거나 ▲▼ 버튼으로 순서를 변경하세요.'}
        </span>
      </div>

      {/* Currency Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {sortedCurrencies.map((c) => {
          const isBase = c.code === baseCurrency;
          const isSelected = c.code === selectedTarget;
          const isPinned = pinnedCodes.includes(c.code);
          const isCustomAdded = ADDITIONAL_CURRENCIES.some((ac) => ac.code === c.code);

          // Convert current rate for base currency
          const rate = rates[c.code] || 1;
          const convertedVal = amount * rate;

          const localizedName = currencyT?.currencyNames?.[c.code] || c.code;
          const isZeroDecimal = ['KRW', 'JPY', 'VND', 'IDR'].includes(c.code);
          const decimals = isZeroDecimal ? 0 : 2;

          // Smooth Controlled Input Value (Preserves decimal dots like 10. or .5)
          const isEditing = focusedCode === c.code && inputStrings[c.code] !== undefined;
          const displayVal = isEditing
            ? inputStrings[c.code]
            : Number.isInteger(convertedVal)
            ? String(convertedVal)
            : convertedVal.toFixed(decimals);

          const scaleText = formatCurrencyScale(convertedVal, c.code);

          return (
            <div
              key={c.code}
              className="glass-card"
              onClick={() => onSelectTarget(c.code)}
              style={{
                cursor: 'pointer',
                position: 'relative',
                padding: '1.1rem',
                border: isPinned
                  ? '2px solid #a855f7'
                  : isSelected
                  ? '2px solid var(--accent-color)'
                  : isBase
                  ? '1px solid rgba(99, 102, 241, 0.4)'
                  : '1px solid var(--border-color)',
                background: isPinned
                  ? 'rgba(168, 85, 247, 0.08)'
                  : isSelected
                  ? 'rgba(99, 102, 241, 0.12)'
                  : 'var(--card-bg)',
                transition: 'all 0.2s ease',
                boxShadow: isSelected || isPinned ? '0 8px 24px rgba(99, 102, 241, 0.18)' : 'none'
              }}
            >
              {/* Card Controls Header (Pin, Order Arrows, Selected Checkmark, Remove X) */}
              <div style={{ position: 'absolute', top: '0.65rem', right: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {/* Order Up */}
                <button
                  onClick={(e) => moveCurrency(c.code, 'up', e)}
                  title="위로 이동"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.15rem'
                  }}
                >
                  <ChevronUp size={14} />
                </button>

                {/* Order Down */}
                <button
                  onClick={(e) => moveCurrency(c.code, 'down', e)}
                  title="아래로 이동"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.15rem'
                  }}
                >
                  <ChevronDown size={14} />
                </button>

                {/* Pin Toggle Button */}
                <button
                  onClick={(e) => togglePin(c.code, e)}
                  title={isPinned ? '상단 고정 해제' : '상단 고정 (핀)'}
                  style={{
                    background: isPinned ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.2rem 0.35rem',
                    color: isPinned ? '#a855f7' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <Pin size={13} style={{ transform: isPinned ? 'rotate(-45deg)' : 'none' }} />
                </button>

                {isSelected && (
                  <span style={{ color: 'var(--accent-color)', marginLeft: '0.2rem' }}>
                    <CheckCircle size={16} />
                  </span>
                )}

                {isCustomAdded && (
                  <button
                    onClick={(e) => handleRemoveCurrency(c.code, e)}
                    title="이 통화 삭제"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '0.7rem'
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Currency Flag & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {c.code} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>({c.symbol})</span>
                    {isPinned && (
                      <span style={{ fontSize: '0.65rem', color: '#a855f7', background: 'rgba(168, 85, 247, 0.15)', padding: '0.05rem 0.35rem', borderRadius: '4px', fontWeight: 700 }}>
                        고정
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {localizedName}
                  </div>
                </div>
              </div>

              {/* Two-Way Interactive Amount Input inside Card (Smooth Decimal Support) */}
              <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                <input
                  type="text"
                  inputMode="decimal"
                  value={displayVal}
                  onFocus={() => setFocusedCode(c.code)}
                  onBlur={() => handleInputBlur(c.code)}
                  onClick={(e) => e.stopPropagation()} // don't toggle card selection when clicking input
                  onChange={(e) => {
                    e.stopPropagation();
                    handleInputChange(c.code, e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 2.2rem 0.5rem 0.65rem',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: isBase ? 'rgba(99, 102, 241, 0.15)' : 'var(--editor-bg)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none'
                  }}
                >
                  {c.symbol}
                </span>
              </div>

              {/* Human Readable Currency Digit Scale Helper (억, 만 단위 표시) */}
              {scaleText && (
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-color)', marginTop: '0.35rem', textAlign: 'right' }}>
                  {scaleText}
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Currency Button Card */}
        <div
          className="glass-card"
          onClick={() => {
            setShowAddModal(true);
            setSearchQuery('');
          }}
          style={{
            minHeight: '130px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px dashed var(--accent-color)',
            background: 'rgba(99, 102, 241, 0.05)',
            color: 'var(--accent-color)',
            transition: 'all 0.2s ease'
          }}
        >
          <PlusCircle size={28} style={{ marginBottom: '0.4rem' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{currencyT?.addCurrencyBtn || '+ 국가 통화 추가하기'}</span>
        </div>
      </div>

      {/* Add Currency Modal Dialog */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '1.25rem',
              width: '100%',
              maxWidth: '480px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <Globe size={20} color="var(--accent-color)" />
                {currencyT?.addCurrencyTitle || '추가할 국가 통화 선택'}
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Real-Time Search Box */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                placeholder={currencyT?.searchPlaceholder || '국가명 또는 통화 코드 검색...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.65rem 2.2rem 0.65rem 2.4rem',
                  fontSize: '0.9rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Modal List */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.25rem' }}>
              {availableToAdd.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={32} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 600 }}>모든 주요 국가 통화가 추가되었습니다.</p>
                </div>
              ) : filteredAvailable.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                  <p style={{ fontWeight: 600 }}>"{searchQuery}" 검색 결과가 없습니다.</p>
                  <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>통화 코드(THB, TWD 등) 또는 한국어 국가명으로 검색해 보세요.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {filteredAvailable.map((addC) => (
                    <button
                      key={addC.code}
                      onClick={() => handleAddCurrency(addC)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-color)',
                        background: 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.background = 'var(--card-bg)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{addC.flag}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                            {addC.code} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({addC.symbol})</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {currencyT?.currencyNames?.[addC.code] || addC.code}
                          </div>
                        </div>
                      </div>

                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--accent-color)',
                          background: 'rgba(99, 102, 241, 0.12)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px'
                        }}
                      >
                        + 추가
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
