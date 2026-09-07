export interface TextStats {
  charCount: number;
  charNoSpaceCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  lineCount: number;
  utf8Bytes: number;
  eucKrBytes: number;
  readingTimeMinutes: number;
  readingTimeSeconds: number;
  speakingTimeMinutes: number;
  speakingTimeSeconds: number;
}

export interface KeywordItem {
  word: string;
  count: number;
  percentage: number;
}

export function getEucKrByteLength(str: string): number {
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // ASCII characters (0-127) take 1 byte
    if (code <= 0x007f) {
      bytes += 1;
    } else {
      // Non-ASCII (Korean, CJK, etc.) take 2 bytes in EUC-KR
      bytes += 2;
    }
  }
  return bytes;
}

export function getUtf8ByteLength(str: string): number {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str).length;
  }
  // Fallback
  return unescape(encodeURIComponent(str)).length;
}

export function calculateTextStats(text: string): TextStats {
  if (!text) {
    return {
      charCount: 0,
      charNoSpaceCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      lineCount: 0,
      utf8Bytes: 0,
      eucKrBytes: 0,
      readingTimeMinutes: 0,
      readingTimeSeconds: 0,
      speakingTimeMinutes: 0,
      speakingTimeSeconds: 0
    };
  }

  const charCount = text.length;
  const charNoSpaceCount = text.replace(/\s/g, '').length;

  // Words count: handles space-delimited & CJK words
  const trimmed = text.trim();
  const wordMatch = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = wordMatch.length;

  // Sentence count: split by . ! ?
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length || (charCount > 0 ? 1 : 0);

  // Paragraph count: split by empty lines
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length || (charCount > 0 ? 1 : 0);

  // Line count: split by newlines
  const lines = text.split('\n');
  const lineCount = lines.length;

  // Bytes
  const utf8Bytes = getUtf8ByteLength(text);
  const eucKrBytes = getEucKrByteLength(text);

  // Reading time (~300 words/min or ~500 Korean chars/min)
  // Let's use total non-space chars / 400 chars per min for universal estimation
  const totalReadSec = Math.max(1, Math.round((charNoSpaceCount / 400) * 60));
  const readingTimeMinutes = Math.floor(totalReadSec / 60);
  const readingTimeSeconds = totalReadSec % 60;

  // Speaking time (~130 words/min or ~200 Korean chars/min)
  const totalSpeakSec = Math.max(1, Math.round((charNoSpaceCount / 200) * 60));
  const speakingTimeMinutes = Math.floor(totalSpeakSec / 60);
  const speakingTimeSeconds = totalSpeakSec % 60;

  return {
    charCount,
    charNoSpaceCount,
    wordCount,
    sentenceCount,
    paragraphCount,
    lineCount,
    utf8Bytes,
    eucKrBytes,
    readingTimeMinutes: charCount > 0 ? readingTimeMinutes : 0,
    readingTimeSeconds: charCount > 0 ? readingTimeSeconds : 0,
    speakingTimeMinutes: charCount > 0 ? speakingTimeMinutes : 0,
    speakingTimeSeconds: charCount > 0 ? speakingTimeSeconds : 0
  };
}

const COMMON_STOPWORDS = new Set([
  'and', 'the', 'is', 'in', 'it', 'of', 'to', 'for', 'with', 'on', 'at', 'by', 'this', 'that', 'or', 'an', 'be', 'are',
  '그리고', '하지만', '또한', '통해', '위해', '대한', '관한', '수', '등', '것', '이', '가', '을', '를', '은', '는', '에', '의', '로', '으로'
]);

export function analyzeTopKeywords(text: string, limit: number = 5): KeywordItem[] {
  if (!text || text.trim().length === 0) return [];

  // Extract words (length >= 2, filter common stopwords & pure numbers)
  const words = text
    .toLowerCase()
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2 && !COMMON_STOPWORDS.has(w) && !/^\d+$/.test(w));

  if (words.length === 0) return [];

  const freqMap: Record<string, number> = {};
  words.forEach(w => {
    freqMap[w] = (freqMap[w] || 0) + 1;
  });

  const total = words.length;

  const sorted = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / total) * 100)
    }));

  return sorted;
}
