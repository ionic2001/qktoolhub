export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es';

export interface ExplanationDetail {
  title: string;
  badge: string;
  description: string;
  details?: string[];
}

export interface ToolItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  badge: string;
  path: string;
  isLive: boolean;
}

export interface TranslationStructure {
  appTitle: string;
  appSubtitle: string;
  hubTitle: string;
  hubSubtitle: string;
  backToHub: string;
  useNow: string;
  placeholderText: string;
  searchToolsPlaceholder: string;
  allToolsCategory: string;
  liveStatus: string;
  comingSoonStatus: string;
  stats: {
    charCount: string;
    charNoSpaceCount: string;
    wordCount: string;
    sentenceCount: string;
    paragraphCount: string;
    lineCount: string;
    eucKrBytes: string;
    utf8Bytes: string;
    readingTime: string;
    speakingTime: string;
    minutes: string;
    seconds: string;
  };
  tooltips: {
    charCount: string;
    charNoSpaceCount: string;
    wordCount: string;
    sentenceCount: string;
    paragraphCount: string;
    lineCount: string;
    eucKrBytes: string;
    utf8Bytes: string;
    readingTime: string;
    speakingTime: string;
  };
  toolsList: ToolItem[];
  tools: {
    title: string;
    removeSpaces: string;
    removeLineBreaks: string;
    toUpperCase: string;
    toLowerCase: string;
    truncateLimit: string;
    copyText: string;
    clearText: string;
    copiedNotice: string;
    clearedNotice: string;
    trimmedNotice: string;
  };
  platforms: {
    title: string;
    xTitle: string;
    xDesc: string;
    seoTitle: string;
    seoTitleDesc: string;
    metaDesc: string;
    metaDescDesc: string;
    ogDesc: string;
    ogDescDesc: string;
    smsTitle: string;
    smsDesc: string;
    chars: string;
    bytes: string;
  };
  keywords: {
    title: string;
    subtitle: string;
    emptyText: string;
    frequency: string;
  };
  explanationGuide: {
    title: string;
    subtitle: string;
    sections: ExplanationDetail[];
  };
  explanations: {
    title: string;
    subtitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q?: string;
    faq3A?: string;
    faq4Q?: string;
    faq4A?: string;
    faq5Q?: string;
    faq5A?: string;
  };
  adNotice: string;
  autoSavedNotice: string;
  currency: {
    title: string;
    subtitle: string;
    allCurrenciesTitle: string;
    selectChartNotice: string;
    quickPresetLabel: string;
    pinNotice: string;
    searchPlaceholder: string;
    disclaimerNotice: string;
    addCurrencyTitle: string;
    addCurrencyBtn: string;
    moveUp: string;
    moveDown: string;
    pin: string;
    unpin: string;
    pinnedBadge: string;
    deleteCurrency: string;
    addBtn: string;
    allAddedNotice: string;
    noSearchResultNotice: string;
    searchTipNotice: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    bankDiscountTitle?: string;
    bankDiscountSubtitle?: string;
    preferentialRate?: string;
    totalPayable?: string;
    estimatedSavings?: string;
    timeframes?: { d7: string; m1: string; m3: string; y1: string };
    currencyNames: Record<string, string>;
  };
}

export const translations: Record<Language, TranslationStructure> = {
  ko: {
    appTitle: "QK Tool Hub",
    appSubtitle: "실시간 글자수 세기 - Word Counter",
    hubTitle: "QK Tool Hub - 스마트 웹 툴 모음",
    hubSubtitle: "회원가입 없이 즉시 사용하는 무료 유틸리티 웹 서비스 툴킷",
    backToHub: "← 메인 툴 허브로 돌아가기",
    useNow: "바로 이용하기",
    placeholderText: "여기에 텍스트를 입력하거나 붙여넣으세요... (실시간 분석 및 자동 저장이 지원됩니다)",
    searchToolsPlaceholder: "원하는 유틸리티 도구를 검색하세요...",
    allToolsCategory: "전체 도구",
    liveStatus: "즉시 사용 가능",
    comingSoonStatus: "출시 예정",
    stats: {
      charCount: "글자 수 (공백 포함)",
      charNoSpaceCount: "글자 수 (공백 제외)",
      wordCount: "단어 수",
      sentenceCount: "문장 수",
      paragraphCount: "단락 수",
      lineCount: "줄 수",
      eucKrBytes: "EUC-KR 바이트 (자소서)",
      utf8Bytes: "UTF-8 바이트 (웹 표준)",
      readingTime: "예상 읽기 시간",
      speakingTime: "예상 발표 시간",
      minutes: "분",
      seconds: "초"
    },
    tooltips: {
      charCount: "띄어쓰기, 줄바꿈, 탭을 모두 포함한 전체 문자 수",
      charNoSpaceCount: "순수 알파벳, 한글, 숫자, 기호의 개수 (공백 제외)",
      wordCount: "띄어쓰기(공백)로 구분된 단어(어절)의 총 개수",
      sentenceCount: "마침표(.), 물음표(?), 느낌표(!) 기준으로 구분된 문장 수",
      paragraphCount: "빈 줄(엔터 2회)로 구분된 문단/단락의 개수",
      lineCount: "줄바꿈(엔터) 문자의 개수 기반 전체 줄 수",
      eucKrBytes: "한글 1자=2Byte, 영문/숫자=1Byte (국내 대기업 자소서/공기업 채용폼)",
      utf8Bytes: "한글 1자=3Byte, 영문/숫자=1Byte (현대 웹 표준 및 깃허브)",
      readingTime: "눈으로 읽을 때 (평균 분당 400자 기준 소요 시간)",
      speakingTime: "발표/스피치로 말할 때 (평균 분당 200자 기준 소요 시간)"
    },
    toolsList: [
      {
        id: "word-counter",
        title: "글자수 / 단어수 세기 (Word Counter)",
        desc: "실시간 글자수, 공백제외, 단어수, EUC-KR/UTF-8 바이트 및 소셜/SEO 길이 제한 분석",
        category: "텍스트 / 원고",
        badge: "인기 LIVE",
        path: "/word-counter",
        isLive: true
      },
      {
        id: "currency-converter",
        title: "실시간 환율 / 환전 계산기 (Currency Converter)",
        desc: "실시간 글로벌 환율 계산 및 주요 통화(USD, JPY, EUR, KRW) 변환",
        category: "금융 / 계산",
        badge: "신규 LIVE",
        path: "/currency-converter",
        isLive: true
      },
      {
        id: "unit-converter",
        title: "스마트 단위 변환기 (Unit Converter)",
        desc: "길이, 넓이(평/㎡), 무게, 온도 등 생활 및 해외직구 단위 실시간 변환",
        category: "생활 / 단위",
        badge: "출시 예정",
        path: "/unit-converter",
        isLive: false
      },
      {
        id: "ocr-tool",
        title: "이미지 텍스트 추출기 (Image OCR)",
        desc: "이미지 및 사진 속 텍스트를 손쉽게 글자로 자동 추출 및 복사",
        category: "이미지 / AI",
        badge: "출시 예정",
        path: "/ocr-tool",
        isLive: false
      }
    ],
    tools: {
      title: "빠른 텍스트 편집 도구",
      removeSpaces: "모든 공백 제거",
      removeLineBreaks: "줄바꿈 제거",
      toUpperCase: "대문자로 변환",
      toLowerCase: "소문자로 변환",
      truncateLimit: "길이 제한 자르기",
      copyText: "텍스트 전체 복사",
      clearText: "내용 초기화",
      copiedNotice: "클립보드에 복사되었습니다!",
      clearedNotice: "텍스트가 초기화되었습니다.",
      trimmedNotice: "선택한 자수로 잘라냈습니다."
    },
    platforms: {
      title: "주요 채널별 글자수 제한 가이드",
      xTitle: "X (구 트위터) 게시물",
      xDesc: "한글 약 140자 / 영문 280자 기준",
      seoTitle: "구글 SEO 타이틀 제목",
      seoTitleDesc: "검색 결과 제목 권장 (30~50자)",
      metaDesc: "구글 메타 디스크립션",
      metaDescDesc: "검색 요약문 권장 (75~150자)",
      ogDesc: "Open Graph 요약 설명",
      ogDescDesc: "카톡/소셜 카드 권장 (80~100자)",
      smsTitle: "SMS / LMS 문자 바이트",
      smsDesc: "80 Byte 초과 시 장문(LMS) 전환",
      chars: "자",
      bytes: "Byte"
    },
    keywords: {
      title: "자주 사용된 주요 키워드 Top 5",
      subtitle: "원고 및 SEO 글쓰기 시 반복 단어 밀도 체크",
      emptyText: "텍스트를 입력하면 주요 단어 빈도수가 분석됩니다.",
      frequency: "회 출현"
    },
    explanationGuide: {
      title: "📖 항목별 상세 가이드 & 백과사전",
      subtitle: "각 분석 수치가 의미하는 정확한 개념과 활용법을 확인하세요.",
      sections: [
        {
          title: "1. 글자 수 (공백 포함 vs 공백 제외)",
          badge: "기본 지표",
          description: "글자 수는 텍스트 내에 존재하는 문자들의 총개수입니다.",
          details: [
            "공백 포함(With Spaces): 띄어쓰기(Space), 줄바꿈(Enter/Newline), 탭(Tab) 문자까지 모두 1글자로 카운트합니다.",
            "공백 제외(No Spaces): 순수 텍스트(한글, 영문, 숫자, 문장부호)만을 카운트하며 공백 문자는 제거됩니다.",
            "활용 팁: 대학 입시 및 주요 대기업(삼성, 현대, LG 등) 자기소개서는 '공백 포함'을 기준으로 글자수를 제한하는 경우가 많으므로 제출 양식을 반드시 확인하세요."
          ]
        }
      ]
    },
    explanations: {
      title: "자주 묻는 질문 (FAQ)",
      subtitle: "서비스 이용 시 궁금한 사항에 대한 답변입니다.",
      faq1Q: "글자수(공백 포함)와 공백 제외의 차이는 무엇인가요?",
      faq1A: "공백 포함은 띄어쓰기, 줄바꿈, 탭 문자까지 모두 1글자로 계산합니다. 공백 제외는 순수 텍스트와 기호, 숫자의 개수만 세어 자기소개서 작성 시 공백 포함/제외 여부를 확인하는 데 유용합니다.",
      faq2Q: "EUC-KR 바이트와 UTF-8 바이트는 왜 다른가요?",
      faq2A: "EUC-KR은 한글 1글자를 2바이트로 계산하는 과거 한국 표준이며, 주요 대기업/공공기관 입사지원서에서 사용합니다. UTF-8은 현대 웹 표준으로 한글 1글자를 3바이트로 계산합니다.",
      faq3Q: "SEO 메타 타이틀 및 디스크립션 적정 길이는 얼마인가요?",
      faq3A: "구글 검색 결과 화면(SERP)에서 제목(Title)은 한글 약 30자, 영문 50~60자 내외가 적당하며, 설명문(Meta Description)은 한글 75~80자, 영문 150~160자를 넘지 않아야 잘리지 않고 노출됩니다.",
      faq4Q: "예상 읽기 시간과 연설 시간은 어떻게 계산되나요?",
      faq4A: "성인의 평균 묵독 속도(분당 약 250~300단어)와 소리 내어 읽는 스피치/발표 속도(분당 약 130~150단어)를 기준으로 계산됩니다.",
      faq5Q: "작성 중인 텍스트가 서버로 전송되거나 저장되나요?",
      faq5A: "아닙니다. 본 사이트의 모든 글자수 연산 및 처리 작업은 100% 브라우저 내부에서만 실행되며 서버로 절대 전송되지 않아 보안상 매우 안전합니다."
    },
    adNotice: "스폰서 광고",
    autoSavedNotice: "임시 저장됨",
    currency: {
      title: "실시간 다국어 환율 변환기",
      subtitle: "전 세계 주요 국가 실시간 환율 계산 및 수치 동시 변환",
      allCurrenciesTitle: "📊 주요 국가 환율 한눈에 보기",
      selectChartNotice: "💡 수치를 직접 수정하면 실시간 환율로 모든 통화가 즉시 연산됩니다.",
      quickPresetLabel: "자주 쓰는 금액 퀵 입력:",
      pinNotice: "💡 📌 버튼으로 자주 쓰는 통화를 상단에 고정하거나 ▲▼ 버튼으로 순서를 변경하세요.",
      searchPlaceholder: "국가명 또는 통화 코드 검색 (예: THB, 대만, 바트, JPY)...",
      disclaimerNotice: "본 서비스의 환율 정보는 국제 외환시장 실시간 고시 기준이며, 실제 시중은행 및 환전소 거래 시 거래 시점, 수수료, 우대율 등에 따라 약간의 차이가 발생할 수 있습니다.",
      addCurrencyTitle: "추가할 국가 통화 선택",
      addCurrencyBtn: "+ 국가 통화 추가하기",
      moveUp: "위로 이동",
      moveDown: "아래로 이동",
      pin: "상단 고정",
      unpin: "상단 고정 해제",
      pinnedBadge: "고정",
      deleteCurrency: "이 통화 삭제",
      addBtn: "+ 추가",
      allAddedNotice: "모든 주요 국가 통화가 추가되었습니다.",
      noSearchResultNotice: "검색 결과가 없습니다.",
      searchTipNotice: "통화 코드(THB, TWD 등) 또는 국가명으로 검색해 보세요.",
      faqTitle: "💡 환율 변환기 이용 안내 및 FAQ",
      faq1Q: "Q. 매매기준율이란 무엇인가요?",
      faq1A: "매매기준율(Mid-Market Rate)은 국제 외환시장에서 금융기관 간 거래 시 적용되는 수수료가 포함되지 않은 순수한 시장 기준 환율입니다. 본 서비스는 유럽중앙은행(ECB) 및 국제 공식 데이터를 바탕으로 당일 매매기준율을 제공합니다.",
      faq2Q: "Q. 1만엔(JPY 10,000) 등 주요 퀵 입력은 어떻게 이용하나요?",
      faq2A: "상단의 퀵 입력 버튼(예: $100, 10만원, 1만엔 등)을 클릭하시면 원클릭으로 해당 금액과 통화가 즉시 적용되어 전 세계 모든 주요 통화의 최신 수치가 동시 계산됩니다.",
      currencyNames: {
        KRW: "대한민국 원", USD: "미국 달러", JPY: "일본 엔화", EUR: "유로", CNY: "중국 위안화", GBP: "영국 파운드",
        CAD: "캐나다 달러", AUD: "호주 달러", CHF: "스위스 프랑", HKD: "홍콩 달러", SGD: "싱가포르 달러", VND: "베트남 동",
        THB: "태국 바트", TWD: "대만 달러", PHP: "필리핀 페소", IDR: "인도네시아 루피아", MYR: "말레이시아 링깃",
        INR: "인도 루피", NZD: "뉴질랜드 달러", BRL: "브라질 헤알", MXN: "멕시코 페소", TRY: "튀르키예 리라"
      }
    }
  },
  en: {
    appTitle: "QK Tool Hub",
    appSubtitle: "Real-time Word & Character Counter",
    hubTitle: "QK Tool Hub - Smart Web Tools Collection",
    hubSubtitle: "Instant free web utilities without sign-up",
    backToHub: "← Back to QK Tool Hub",
    useNow: "Use Now",
    placeholderText: "Type or paste your text here...",
    searchToolsPlaceholder: "Search utility tools...",
    allToolsCategory: "All Tools",
    liveStatus: "LIVE",
    comingSoonStatus: "Coming Soon",
    stats: {
      charCount: "Characters (with spaces)",
      charNoSpaceCount: "Characters (no spaces)",
      wordCount: "Words",
      sentenceCount: "Sentences",
      paragraphCount: "Paragraphs",
      lineCount: "Lines",
      eucKrBytes: "EUC-KR Bytes (2B/Char)",
      utf8Bytes: "UTF-8 Bytes (Web Standard)",
      readingTime: "Reading Time",
      speakingTime: "Speaking Time",
      minutes: "min",
      seconds: "sec"
    },
    tooltips: {
      charCount: "Total characters including spaces, line breaks, and tabs",
      charNoSpaceCount: "Letters, numbers, and symbols only (excluding spaces)",
      wordCount: "Total words separated by spaces",
      sentenceCount: "Sentences separated by periods, question marks, or exclamation marks",
      paragraphCount: "Paragraphs separated by double line breaks",
      lineCount: "Total lines separated by newline characters",
      eucKrBytes: "Korean 2Bytes, English 1Byte (Korean enterprise application standard)",
      utf8Bytes: "Korean 3Bytes, English 1Byte (Global Web standard)",
      readingTime: "Estimated silent reading time (~250-300 words/min)",
      speakingTime: "Estimated speech/presentation time (~130-150 words/min)"
    },
    toolsList: [
      {
        id: "word-counter",
        title: "Word & Character Counter",
        desc: "Real-time word, character, EUC-KR/UTF-8 byte & SEO platform limit counter",
        category: "Text / Writing",
        badge: "POPULAR LIVE",
        path: "/word-counter",
        isLive: true
      },
      {
        id: "currency-converter",
        title: "Currency Converter",
        desc: "Real-time global exchange rate calculator for USD, JPY, EUR, KRW",
        category: "Finance / Calc",
        badge: "NEW LIVE",
        path: "/currency-converter",
        isLive: true
      },
      {
        id: "unit-converter",
        title: "Smart Unit Converter",
        desc: "Instant conversion for length, area, weight, and temperature",
        category: "Utility / Unit",
        badge: "Coming Soon",
        path: "/unit-converter",
        isLive: false
      },
      {
        id: "ocr-tool",
        title: "Image Text Extractor (OCR)",
        desc: "Extract text from images and photos automatically",
        category: "Image / AI",
        badge: "Coming Soon",
        path: "/ocr-tool",
        isLive: false
      }
    ],
    tools: {
      title: "Quick Text Edit Tools",
      removeSpaces: "Remove All Spaces",
      removeLineBreaks: "Remove Line Breaks",
      toUpperCase: "UPPERCASE",
      toLowerCase: "lowercase",
      truncateLimit: "Truncate to Limit",
      copyText: "Copy All Text",
      clearText: "Clear Text",
      copiedNotice: "Copied to clipboard!",
      clearedNotice: "Text cleared.",
      trimmedNotice: "Text truncated to selected limit."
    },
    platforms: {
      title: "Platform Length Limits Guide",
      xTitle: "X (Twitter) Post",
      xDesc: "Max 280 characters limit",
      seoTitle: "Google SEO Title",
      seoTitleDesc: "Recommended 50–60 chars",
      metaDesc: "Google Meta Description",
      metaDescDesc: "Recommended 150–160 chars",
      ogDesc: "Open Graph Description",
      ogDescDesc: "Recommended 80–100 chars",
      smsTitle: "SMS / LMS Message Bytes",
      smsDesc: "Converts to LMS above 80 Bytes",
      chars: "chars",
      bytes: "Bytes"
    },
    keywords: {
      title: "Top 5 Frequent Keywords",
      subtitle: "Keyword density check for copywriting and SEO",
      emptyText: "Enter text to see keyword density analysis.",
      frequency: "times"
    },
    explanationGuide: {
      title: "📖 Detailed Metrics Guide & Encyclopedia",
      subtitle: "Learn the exact definitions and use cases of each text measurement metric.",
      sections: [
        {
          title: "1. Character Count (With vs Without Spaces)",
          badge: "Core Metric",
          description: "Measures the total number of individual characters in the text.",
          details: [
            "With Spaces: Includes spaces, line breaks, and tab characters in the count.",
            "Without Spaces: Counts only letters, numbers, and symbols while omitting all space characters."
          ]
        }
      ]
    },
    explanations: {
      title: "Frequently Asked Questions (FAQ)",
      subtitle: "Answers to common questions regarding text counting.",
      faq1Q: "What is the difference between characters with and without spaces?",
      faq1A: "Character count with spaces counts spaces, tabs, and line breaks. Character count without spaces counts only letters, numbers, and symbols.",
      faq2Q: "Why are EUC-KR and UTF-8 byte counts different?",
      faq2A: "UTF-8 uses 3 bytes for CJK non-Latin characters, while EUC-KR uses 2 bytes per Korean character (legacy standard). ASCII letters use 1 byte in both.",
      faq3Q: "What is the optimal SEO title and description length?",
      faq3A: "Google typically displays up to 50-60 characters for titles and 150-160 characters for meta descriptions before truncating with an ellipsis.",
      faq4Q: "How are reading and speaking times estimated?",
      faq4A: "Reading time is based on an average silent reading speed of ~250-300 words per minute. Speaking time is calculated at ~130-150 words per minute.",
      faq5Q: "Is my text uploaded or stored on any server?",
      faq5A: "No. All text processing and counting happens entirely in your local browser for maximum privacy and security."
    },
    adNotice: "Sponsored Advertisement",
    autoSavedNotice: "Auto-saved",
    currency: {
      title: "Real-time Multi-Language Currency Converter",
      subtitle: "Convert real-time exchange rates for major currencies worldwide instantly",
      allCurrenciesTitle: "📊 Major Exchange Rates Overview",
      selectChartNotice: "💡 Edit numbers directly to convert all currencies in real time.",
      quickPresetLabel: "Quick Amount Presets:",
      pinNotice: "💡 Use 📌 to pin favorite currencies or ▲▼ to reorder cards.",
      searchPlaceholder: "Search country or currency code (e.g. THB, TWD, JPY)...",
      disclaimerNotice: "Exchange rates are based on real-time international market quotes. Slight differences may occur in actual bank or exchange office transactions.",
      addCurrencyTitle: "Select Currency to Add",
      addCurrencyBtn: "+ Add Country Currency",
      moveUp: "Move Up",
      moveDown: "Move Down",
      pin: "Pin to Top",
      unpin: "Unpin",
      pinnedBadge: "PIN",
      deleteCurrency: "Remove Currency",
      addBtn: "+ Add",
      allAddedNotice: "All supported currencies have been added.",
      noSearchResultNotice: "No currencies found.",
      searchTipNotice: "Try searching by currency code (e.g. THB, TWD) or country name.",
      faqTitle: "💡 Currency Converter Guide & FAQ",
      faq1Q: "Q. What is the mid-market rate?",
      faq1A: "The mid-market rate is the real-time midpoint between buy and sell prices in global currency markets without bank markups. We provide live mid-market rates powered by ECB and official global data.",
      faq2Q: "Q. How do quick presets like ¥10,000 (10k JPY) work?",
      faq2A: "Click any quick preset button ($10, $100, 10k JPY) at the top to instantly apply that value and calculate exchange rates across all major world currencies in real time.",
      currencyNames: {
        KRW: "South Korean Won", USD: "US Dollar", JPY: "Japanese Yen", EUR: "Euro", CNY: "Chinese Yuan", GBP: "British Pound",
        CAD: "Canadian Dollar", AUD: "Australian Dollar", CHF: "Swiss Franc", HKD: "Hong Kong Dollar", SGD: "Singapore Dollar", VND: "Vietnamese Dong",
        THB: "Thai Baht", TWD: "New Taiwan Dollar", PHP: "Philippine Peso", IDR: "Indonesian Rupiah", MYR: "Malaysian Ringgit",
        INR: "Indian Rupee", NZD: "New Zealand Dollar", BRL: "Brazilian Real", MXN: "Mexican Peso", TRY: "Turkish Lira"
      }
    }
  },
  ja: {
    appTitle: "QK Tool Hub",
    appSubtitle: "文字数カウント・単語数計算 (Word & Character Counter)",
    hubTitle: "QK Tool Hub - Webツール コレクション",
    hubSubtitle: "会員登録不要で使える無料Webツールキット",
    backToHub: "← QK Tool Hub メインへ戻る",
    useNow: "今すぐ使う",
    placeholderText: "ここにテキストを入力または貼り付けてください...",
    searchToolsPlaceholder: "ツールを検索...",
    allToolsCategory: "全ツール",
    liveStatus: "利用可能",
    comingSoonStatus: "公開予定",
    stats: {
      charCount: "文字数 (スペース込み)",
      charNoSpaceCount: "文字数 (スペースなし)",
      wordCount: "単語数",
      sentenceCount: "文の数",
      paragraphCount: "段落数",
      lineCount: "行数",
      eucKrBytes: "EUC-KR バイト",
      utf8Bytes: "UTF-8 バイト (Web標準)",
      readingTime: "読了予想時間",
      speakingTime: "スピーチ予想時間",
      minutes: "分",
      seconds: "秒"
    },
    tooltips: {
      charCount: "スペースや改行を含む全文字数",
      charNoSpaceCount: "スペースを除く純粋な文字・数字・記号数",
      wordCount: "スペースで区切られた単語数",
      sentenceCount: "句点等で区切られた文の数",
      paragraphCount: "空行で区切られた段落数",
      lineCount: "改行に基づく総行数",
      eucKrBytes: "韓国語2Byte・英数1Byte",
      utf8Bytes: "日本語/韓国語3Byte・英数1Byte",
      readingTime: "黙読予想時間",
      speakingTime: "スピーチ予想時間"
    },
    toolsList: [
      {
        id: "word-counter",
        title: "文字数・単語数 カウンター",
        desc: "リアルタイム文字数、単語数、バイト数及びSNS/SEO文字数制限解析",
        category: "テキスト",
        badge: "人気 LIVE",
        path: "/word-counter",
        isLive: true
      },
      {
        id: "currency-converter",
        title: "為替レート計算機",
        desc: "世界の主要通貨リアルタイム換算",
        category: "金融",
        badge: "NEW LIVE",
        path: "/currency-converter",
        isLive: true
      }
    ],
    tools: {
      title: "クイック テキスト編集ツール",
      removeSpaces: "スペース全削除",
      removeLineBreaks: "改行削除",
      toUpperCase: "大文字に変換",
      toLowerCase: "小文字に変換",
      truncateLimit: "文字数制限で切り取り",
      copyText: "テキスト全コピー",
      clearText: "クリア",
      copiedNotice: "クリップボードにコピーしました！",
      clearedNotice: "テキストをクリアしました。",
      trimmedNotice: "指定文字数に切り取りました。"
    },
    platforms: {
      title: "主要プラットフォーム文字数制限ガイド",
      xTitle: "X (旧 Twitter) 投稿",
      xDesc: "全角140文字 / 半角280文字",
      seoTitle: "Google SEO タイトル",
      seoTitleDesc: "推奨 30〜50文字",
      metaDesc: "Google メタディスクリプション",
      metaDescDesc: "推奨 75〜120文字",
      ogDesc: "Open Graph 説明文",
      ogDescDesc: "推奨 80〜100文字",
      smsTitle: "SMS メッセージ バイト",
      smsDesc: "80 Byte 超過で長文(LMS)切り替え",
      chars: "文字",
      bytes: "Byte"
    },
    keywords: {
      title: "頻出キーワード Top 5",
      subtitle: "SEO文章作成時のキーワード出現頻度チェック",
      emptyText: "テキストを入力すると頻出単語が分析されます。",
      frequency: "回出現"
    },
    explanationGuide: {
      title: "📖 項目別詳細ガイド",
      subtitle: "各指標の定義と活用方法",
      sections: [
        {
          title: "1. 文字数 (スペース込み / なし)",
          badge: "基本指標",
          description: "テキスト全体の文字数を測定します。",
          details: [
            "スペース込み：空白、改行、タブも1文字としてカウントします。",
            "スペースなし：文字・数字・記号のみをカウントします。"
          ]
        }
      ]
    },
    explanations: {
      title: "よくある質問 (FAQ)",
      subtitle: "文字数カウント基準とSEO推奨ガイド",
      faq1Q: "スペース込みとスペースなしの違いは何ですか？",
      faq1A: "スペース込みは改行や空白文字も1文字として数えます。スペースなしは純粋な文字や記号のみをカウントします。",
      faq2Q: "サーバーにテキストが送信・保存されますか？",
      faq2A: "いいえ。すべての処理はお使いのブラウザ内部でのみ完了し、外部サーバーへ送信されることはありません。"
    },
    adNotice: "スポンサー広告",
    autoSavedNotice: "自動保存済み",
    currency: {
      title: "リアルタイム多言語 為替レート計算機",
      subtitle: "世界主要国のリアルタイム為替レートを一括計算・変換",
      allCurrenciesTitle: "📊 主要国為替レート一覧",
      selectChartNotice: "💡 数値を直接入力すると、全ての通貨がリアルタイムで換算されます。",
      quickPresetLabel: "よく使う金額のクイック入力:",
      pinNotice: "💡 📌ボタンでお気に入り通貨を固定、▲▼ボタンで表示順を変更できます。",
      searchPlaceholder: "国名または通貨コードを検索 (例: THB, 台湾, JPY)...",
      disclaimerNotice: "為替レート情報は国際市場のリアルタイム基準であり、実際の銀行や両替所での取引時に若干の差が生じる場合があります。",
      addCurrencyTitle: "追加する通貨を選択",
      addCurrencyBtn: "+ 国・通貨を追加",
      moveUp: "上に移動",
      moveDown: "下に移動",
      pin: "上にピン留め",
      unpin: "ピン留め解除",
      pinnedBadge: "固定",
      deleteCurrency: "この通貨を削除",
      addBtn: "+ 追加",
      allAddedNotice: "すべての主要通貨が追加されています。",
      noSearchResultNotice: "検索結果が見つかりません。",
      searchTipNotice: "通貨コード（THB、TWDなど）または国名で検索してください。",
      faqTitle: "💡 為替レート計算機のご案内 & FAQ",
      faq1Q: "Q. 仲値（TTS・TTB基準）とは何ですか？",
      faq1A: "仲値（ミッドマーケットレート）は、国際外国為替市場で金融機関間で取引される手数料を含まない基準レートです。本サービスは欧州中央銀行（ECB）等の公式データを基に最新レートを提供します。",
      faq2Q: "Q. 1万円などのクイック入力機能の使い方を教えてください。",
      faq2A: "上部のクイック入力ボタン（$100、1万円など）をクリックすると、ワンクリックで該当金額と通貨が即時適用され、世界中の主要通貨の換算値が一括計算されます。",
      currencyNames: {
        KRW: "韓国ウォン", USD: "米ドル", JPY: "日本円", EUR: "ユーロ", CNY: "中国人民元", GBP: "英ポンド",
        CAD: "カナダドル", AUD: "豪ドル", CHF: "スイスフラン", HKD: "香港ドル", SGD: "シンガポールドル", VND: "ベトナムドン",
        THB: "タイバーツ", TWD: "台湾ドル", PHP: "フィリピンペソ", IDR: "インドネシアルピア", MYR: "マレーシアリンギット",
        INR: "インドルピー", NZD: "ニュージーランドドル", BRL: "ブラジルレアル", MXN: "メキシコペソ", TRY: "トルコリラ"
      }
    }
  },
  zh: {
    appTitle: "QK Tool Hub",
    appSubtitle: "在线字数与单词计数器 (Word & Character Counter)",
    hubTitle: "QK Tool Hub - 智能Web工具箱",
    hubSubtitle: "无需注册，即开即用的免费在线工具",
    backToHub: "← 返回 QK Tool Hub 主页",
    useNow: "立即使用",
    placeholderText: "在此输入或粘贴文本...",
    searchToolsPlaceholder: "搜索工具...",
    allToolsCategory: "全部工具",
    liveStatus: "已上线",
    comingSoonStatus: "即将推出",
    stats: {
      charCount: "字符数 (含空格)",
      charNoSpaceCount: "字符数 (不含空格)",
      wordCount: "单词数",
      sentenceCount: "句子数",
      paragraphCount: "段落数",
      lineCount: "行数",
      eucKrBytes: "EUC-KR 字节",
      utf8Bytes: "UTF-8 字节 (Web标准)",
      readingTime: "预计阅读时间",
      speakingTime: "预计演讲时间",
      minutes: "分",
      seconds: "秒"
    },
    tooltips: {
      charCount: "包括空格和换行符的总字符数",
      charNoSpaceCount: "仅文字、数字和符号 (不含空格)",
      wordCount: "按空格分隔的总词数",
      sentenceCount: "按句号等标点分隔的句子数",
      paragraphCount: "按空行分隔的段落数",
      lineCount: "按换行符计算的总行数",
      eucKrBytes: "韩文2字节，英数1字节",
      utf8Bytes: "中文/韩文3字节，英数1字节",
      readingTime: "默读预估时间",
      speakingTime: "朗读/演讲预估时间"
    },
    toolsList: [
      {
        id: "word-counter",
        title: "字数与单词计数器",
        desc: "实时字符数、单词数、字节数及SEO长度限制分析",
        category: "文本处理",
        badge: "热门 LIVE",
        path: "/word-counter",
        isLive: true
      },
      {
        id: "currency-converter",
        title: "实时汇率换算器",
        desc: "全球主要货币实时汇率计算",
        category: "金融计算",
        badge: "NEW LIVE",
        path: "/currency-converter",
        isLive: true
      }
    ],
    tools: {
      title: "快捷文本编辑工具",
      removeSpaces: "删除所有空格",
      removeLineBreaks: "删除换行",
      toUpperCase: "转大写",
      toLowerCase: "转小写",
      truncateLimit: "截取至限制字数",
      copyText: "复制全部",
      clearText: "清空",
      copiedNotice: "已复制到剪贴板！",
      clearedNotice: "内容已清空。",
      trimmedNotice: "已截取至指定字数。"
    },
    platforms: {
      title: "主要平台字数限制指南",
      xTitle: "X (推特) 帖子",
      xDesc: "最多 280 个字符限制",
      seoTitle: "谷歌 SEO 标题",
      seoTitleDesc: "建议 30-50 个字符",
      metaDesc: "谷歌 Meta 描述",
      metaDescDesc: "建议 75-150 个字符",
      ogDesc: "Open Graph 摘要描述",
      ogDescDesc: "建议 80-100 个字符",
      smsTitle: "SMS / LMS 字节",
      smsDesc: "超过 80 字节转长短信(LMS)",
      chars: "字",
      bytes: "字节"
    },
    keywords: {
      title: "高频关键词 Top 5",
      subtitle: "文案与SEO写作关键词密度分析",
      emptyText: "输入文本即可分析高频词汇。",
      frequency: "次出现"
    },
    explanationGuide: {
      title: "📖 详细指标指南与说明",
      subtitle: "了解各项文本测量指标的具体含义。",
      sections: [
        {
          title: "1. 字符数 (含空格 vs 不含空格)",
          badge: "基础指标",
          description: "测量文本中的字符总数。",
          details: [
            "含空格：包括空格、换行符和制表符。",
            "不含空格：仅计算文字、数字和标点符号。"
          ]
        }
      ]
    },
    explanations: {
      title: "常见问题 (FAQ)",
      subtitle: "文本计数标准与SEO优化提示",
      faq1Q: "含空格与不含空格有什么区别？",
      faq1A: "含空格包括空格、制表符和换行符。不含空格仅计算纯文字、数字和标点符号。",
      faq2Q: "我的文本会被上传到服务器吗？",
      faq2A: "不会。所有处理均在您的浏览器本地进行，绝对保证数据安全与隐私。"
    },
    adNotice: "赞助商广告",
    autoSavedNotice: "已自动保存",
    currency: {
      title: "实时多语言汇率换算器",
      subtitle: "实时换算全球主要国家与地区汇率",
      allCurrenciesTitle: "📊 主要国家与地区汇率一览",
      selectChartNotice: "💡 直接修改数值，所有货币将实时换算。",
      quickPresetLabel: "常用金额快捷输入：",
      pinNotice: "💡 使用 📌 置顶常用货币，或使用 ▲▼ 调整顺序。",
      searchPlaceholder: "搜索国家名或货币代码 (例如: THB, 台湾, JPY)...",
      disclaimerNotice: "本服务汇率信息基于国际外汇市场实时行情，实际银行或换汇所交易时可能存在微小差异。",
      addCurrencyTitle: "选择要添加的货币",
      addCurrencyBtn: "+ 添加国家/货币",
      moveUp: "向上移动",
      moveDown: "向下移动",
      pin: "置顶固定",
      unpin: "取消置顶",
      pinnedBadge: "已固定",
      deleteCurrency: "删除此货币",
      addBtn: "+ 添加",
      allAddedNotice: "已添加所有主要国家货币。",
      noSearchResultNotice: "未找到匹配的货币。",
      searchTipNotice: "请尝试搜索货币代码（如 THB、TWD）或国家名称。",
      faqTitle: "💡 汇率换算器使用指南与常见问题 FAQ",
      faq1Q: "Q. 什么是中间价汇率（Mid-Market Rate）？",
      faq1A: "中间价汇率是国际外汇市场上金融机构间交易的不含银行手续费的纯净市场基准汇率。本服务基于欧洲中央银行 (ECB) 及国际官方数据提供实时中间价。",
      faq2Q: "Q. 如何使用 1万日元 等快捷输入功能？",
      faq2A: "点击顶部快捷按钮（如 $100、1万日元等），即可一键应用对应金额与货币，并实时同步计算全球所有主要货币的换算数值。",
      currencyNames: {
        KRW: "韩元", USD: "美元", JPY: "日元", EUR: "欧元", CNY: "人民币", GBP: "英镑",
        CAD: "加元", AUD: "澳元", CHF: "瑞士法郎", HKD: "港币", SGD: "新加坡元", VND: "越南盾",
        THB: "泰铢", TWD: "新台币", PHP: "菲律宾比索", IDR: "印尼盾", MYR: "马来西亚林吉特",
        INR: "印度卢比", NZD: "新西兰元", BRL: "巴西雷亚尔", MXN: "墨西哥比索", TRY: "土耳其里拉"
      }
    }
  },
  es: {
    appTitle: "QK Tool Hub",
    appSubtitle: "Contador de Palabras y Caracteres (Word & Character Counter)",
    hubTitle: "QK Tool Hub - Kit de herramientas Web",
    hubSubtitle: "Utilidades web gratuitas al instante y sin registro",
    backToHub: "← Volver a QK Tool Hub",
    useNow: "Usar ahora",
    placeholderText: "Escribe o pega tu texto aquí...",
    searchToolsPlaceholder: "Buscar herramientas...",
    allToolsCategory: "Todas las herramientas",
    liveStatus: "DISPONIBLE",
    comingSoonStatus: "Próximamente",
    stats: {
      charCount: "Caracteres (con espacios)",
      charNoSpaceCount: "Caracteres (sin espacios)",
      wordCount: "Palabras",
      sentenceCount: "Oraciones",
      paragraphCount: "Párrafos",
      lineCount: "Líneas",
      eucKrBytes: "Bytes EUC-KR",
      utf8Bytes: "Bytes UTF-8 (Estándar Web)",
      readingTime: "Tiempo de lectura",
      speakingTime: "Tiempo de discurso",
      minutes: "min",
      seconds: "seg"
    },
    tooltips: {
      charCount: "Total de caracteres incluyendo espacios y saltos de línea",
      charNoSpaceCount: "Solo letras, números y símbolos (sin espacios)",
      wordCount: "Palabras totales separadas por espacios",
      sentenceCount: "Oraciones delimitadas por puntos o signos de interrogación",
      paragraphCount: "Párrafos separados por líneas en blanco",
      lineCount: "Número total de líneas",
      eucKrBytes: "Coreano 2Bytes, inglés 1Byte",
      utf8Bytes: "Estándar web UTF-8",
      readingTime: "Tiempo estimado de lectura silenciosa",
      speakingTime: "Tiempo estimado de discurso/presentación"
    },
    toolsList: [
      {
        id: "word-counter",
        title: "Contador de Palabras y Caracteres",
        desc: "Análisis de caracteres, palabras, bytes y límites SEO",
        category: "Texto",
        badge: "POPULAR LIVE",
        path: "/word-counter",
        isLive: true
      },
      {
        id: "currency-converter",
        title: "Conversor de Divisas",
        desc: "Calculadora de tipos de cambio en tiempo real",
        category: "Finanzas",
        badge: "NUEVO LIVE",
        path: "/currency-converter",
        isLive: true
      }
    ],
    tools: {
      title: "Herramientas de edición rápida",
      removeSpaces: "Eliminar espacios",
      removeLineBreaks: "Eliminar saltos de línea",
      toUpperCase: "MAYÚSCULAS",
      toLowerCase: "minúsculas",
      truncateLimit: "Recortar al límite",
      copyText: "Copiar texto",
      clearText: "Limpiar todo",
      copiedNotice: "¡Copiado al portapapeles!",
      clearedNotice: "Texto limpiado.",
      trimmedNotice: "Texto recortado al límite seleccionado."
    },
    platforms: {
      title: "Guía de límites por plataforma",
      xTitle: "Publicación en X (Twitter)",
      xDesc: "Límite máximo de 280 caracteres",
      seoTitle: "Título SEO de Google",
      seoTitleDesc: "Recomendado 50–60 caracteres",
      metaDesc: "Meta Descripción SEO",
      metaDescDesc: "Recomendado 150–160 caracteres",
      ogDesc: "Descripción Open Graph",
      ogDescDesc: "Recomendado 80–100 caracteres",
      smsTitle: "Mensaje SMS / LMS",
      smsDesc: "Pasa a LMS con más de 80 Bytes",
      chars: "caracteres",
      bytes: "Bytes"
    },
    keywords: {
      title: "Palabras clave Top 5",
      subtitle: "Verificación de densidad para SEO y redacción",
      emptyText: "Ingresa texto para ver el análisis de palabras clave.",
      frequency: "veces"
    },
    explanationGuide: {
      title: "📖 Guía detallada de métricas",
      subtitle: "Conoce el significado de cada medida de texto.",
      sections: [
        {
          title: "1. Caracteres (con vs sin espacios)",
          badge: "Métrica básica",
          description: "Mide el número total de caracteres.",
          details: [
            "Con espacios: Incluye espacios y saltos de línea.",
            "Sin espacios: Solo cuenta letras, números y símbolos."
          ]
        }
      ]
    },
    explanations: {
      title: "Preguntas frecuentes (FAQ)",
      subtitle: "Comprende el recuento de caracteres y métricas de SEO",
      faq1Q: "¿Cuál es la diferencia entre caracteres con y sin espacios?",
      faq1A: "Con espacios incluye saltos de línea y tabulaciones. Sin espacios cuenta únicamente letras, números y símbolos.",
      faq2Q: "¿Mi texto se sube a algún servidor?",
      faq2A: "No. Todo el procesamiento ocurre 100% en tu navegador para garantizar tu privacidad."
    },
    adNotice: "Sponsored Advertisement",
    autoSavedNotice: "Guardado automático",
    currency: {
      title: "Conversor de Divisas en Tiempo Real",
      subtitle: "Convierte tipos de cambio en tiempo real para las principales monedas del mundo",
      allCurrenciesTitle: "📊 Resumen de Tipos de Cambio Principales",
      selectChartNotice: "💡 Edita las cifras directamente para convertir todas las monedas en tiempo real.",
      quickPresetLabel: "Acceso rápido a montos:",
      pinNotice: "💡 Usa 📌 para fijar monedas favoritas o ▲▼ para reordenar.",
      searchPlaceholder: "Buscar país o código (ej. THB, TWD, JPY)...",
      disclaimerNotice: "Las tasas se basan en cotizaciones de mercado en tiempo real. Pueden existir ligeras diferencias en transacciones bancarias reales.",
      addCurrencyTitle: "Seleccionar moneda para añadir",
      addCurrencyBtn: "+ Añadir moneda de país",
      moveUp: "Mover arriba",
      moveDown: "Mover abajo",
      pin: "Fijar arriba",
      unpin: "Desfijar",
      pinnedBadge: "FIJADO",
      deleteCurrency: "Eliminar moneda",
      addBtn: "+ Añadir",
      allAddedNotice: "Se han añadido todas las monedas disponibles.",
      noSearchResultNotice: "No se encontraron resultados de búsqueda.",
      searchTipNotice: "Intenta buscar por código de moneda (ej. THB, TWD) o nombre de país.",
      faqTitle: "💡 Guía del Conversor de Divisas y Preguntas Frecuentes FAQ",
      faq1Q: "Q. ¿Qué es el tipo de cambio medio del mercado?",
      faq1A: "El tipo de cambio medio del mercado es el punto medio en tiempo real entre los precios de compra y venta en los mercados globales sin comisiones bancarias. Proporcionamos tasas basadas en el BCE y datos oficiales.",
      faq2Q: "Q. ¿Cómo funcionan los accesos rápidos como ¥10.000?",
      faq2A: "Haz clic en cualquier botón de acceso rápido ($10, $100, ¥10.000) en la parte superior para aplicar instantáneamente ese monto y calcular el cambio en todas las monedas principales.",
      currencyNames: {
        KRW: "Won Surcoreano", USD: "Dólar Estadounidense", JPY: "Yen Japonés", EUR: "Euro", CNY: "Yuan Chino", GBP: "Libra Esterlina",
        CAD: "Dólar Canadiense", AUD: "Dólar Australiano", CHF: "Franco Suizo", HKD: "Dólar de Hong Kong", SGD: "Dólar de Singapur", VND: "Dong Vietnamita",
        THB: "Baht Tailandés", TWD: "Nuevo Dólar Taiwanés", PHP: "Peso Filipino", IDR: "Rupia Indonesia", MYR: "Ringgit Malayo",
        INR: "Rupia India", NZD: "Dólar Neozelandés", BRL: "Real Brasileño", MXN: "Peso Mexicano", TRY: "Lira Turca"
      }
    }
  }
};
