export interface LegalSection {
  title: string;
  content: string[];
}

export interface LegalDocument {
  title: string;
  effectiveDate: string;
  contactEmail: string;
  sections: LegalSection[];
}

export interface LegalI18n {
  terms: LegalDocument;
  privacy: LegalDocument;
  footer: {
    termsLink: string;
    privacyLink: string;
    aboutLink: string;
    copyright: string;
    tagline: string;
    close: string;
    contactLabel: string;
    contactIntro: string;
  };
}

export const legalText: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', LegalI18n> = {
  ko: {
    terms: {
      title: "서비스 이용약관",
      effectiveDate: "개정 시행일자: 2026년 9월 16일",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "제1조 (목적)",
          content: [
            "본 약관은 QK Tool Hub(이하 '서비스')가 제공하는 브라우저 기반 온라인 웹 도구(글자수 세기, 환율·단위 변환, 이미지 편집·픽셀 아트, 세계시계·달력, 이미지 → PDF 및 PDF 병합·페이지 추출·정리·PNG 저장 등)의 이용 조건을 규정합니다."
          ]
        },
        {
          title: "제2조 (서비스의 제공 및 특성)",
          content: [
            "1. 서비스는 별도의 회원가입이나 로그인 절차 없이 누구나 100% 무료로 이용할 수 있습니다.",
            "2. 텍스트 분석, 파일 변환, 이미지 편집 도구에 입력한 콘텐츠는 브라우저 안에서 처리하도록 설계되어 있습니다. 환율 조회, 사이트 제공, 방문 통계 및 광고에 필요한 외부 통신은 개인정보처리방침에서 별도로 안내합니다.",
            "3. 서비스는 성능 개선 및 기능 추가를 위해 사전 고지 없이 서비스의 일부 또는 전부를 수정하거나 변경할 수 있습니다."
          ]
        },
        {
          title: "제3조 (이용자의 의무 및 제한사항)",
          content: [
            "1. 이용자는 서비스를 불법적이거나 타인의 권리를 침해하는 목적으로 이용해서는 안 됩니다.",
            "2. 서비스의 정상적인 운영을 방해하거나, 과도한 자동화 트래픽(DDoS, 악의적인 대량 스크래핑 등)을 유발하는 행위를 금지합니다."
          ]
        },
        {
          title: "PDF 도구의 범위와 결과 확인",
          content: ["이미지 → PDF 도구는 이미지로 새 PDF를 만듭니다. 기존 PDF 도구는 여러 파일 병합, 선택 페이지를 새 PDF 한 파일로 추출, 페이지 순서·회전·삭제·빈 페이지 추가, 선택 페이지의 PNG 저장을 지원합니다.", "암호가 걸린 PDF, OCR 및 원본 문장 수정은 지원하지 않습니다. 페이지 작업 결과에서 디지털 서명, 양식, 북마크 등이 유지되지 않을 수 있으므로 중요한 문서는 결과를 다운로드한 뒤 확인해 주세요."]
        },
        {
          title: "제4조 (면책 조항 및 책임의 한계)",
          content: [
            "1. 참고용 데이터 제공: 서비스에서 제공하는 실시간 환율 정보, 통화 변환, 공휴일 및 대체공휴일 산출, 순수 영업일수, 단위 변환 수치, 글자수 및 바이트 계산 결과 등은 이용자의 편의를 위한 참고 자료입니다. 서비스는 데이터의 완전성, 정확성, 무오류성을 보증하지 않습니다.",
            "2. 거래 및 계약 면책: 서비스의 계산 결과나 데이터를 바탕으로 이용자가 행한 실제 금융 거래, 외환 송금, 무역 계약, 프로젝트 마감, 항공/여행 예약 등에서 발생한 직·간접적인 손해나 법적 분쟁에 대해 서비스는 책임을 지지 않습니다.",
            "3. 외부 요인 면책: 서비스는 통신망 장애, 제3자 API 제공사의 서버 오류, 브라우저 환경 차이 등으로 인한 서비스 중단이나 결과의 불일치에 대해 책임을 지지 않습니다."
          ]
        },
        {
          title: "제5조 (지적재산권)",
          content: [
            "1. 서비스가 자체 개발한 UI 디자인, 텍스트, 알고리즘, 소스 코드에 대한 저작권 및 지적재산권은 QK Tool Hub에 귀속됩니다.",
            "2. 이용자가 도구를 사용하여 생성하거나 변환한 결과물(예: 편집된 이미지, 변환된 PDF, 픽셀 아트 등)의 모든 권리는 해당 이용자에게 귀속됩니다."
          ]
        },
        {
          title: "제6조 (광고의 게재)",
          content: [
            "서비스는 무료 운영을 지속하기 위해 서비스 화면 내에 제3자 광고(Google AdSense 등)를 게재할 수 있으며, 광고 페이지와의 거래는 이용자와 해당 광고주 간의 관계입니다."
          ]
        },
        {
          title: "제7조 (문의처)",
          content: [
            "서비스 이용약관에 관한 문의는 공식 이메일(contact@qktoolhub.com)로 접수해 주시기 바랍니다."
          ]
        }
      ]
    },
    privacy: {
      title: "개인정보처리방침",
      effectiveDate: "개정 시행일자: 2026년 9월 16일",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. 회원 정보와 문의 정보",
          content: [
            "QK Tool Hub는 회원가입이나 로그인을 요구하지 않으며, 도구 이용을 위해 성명·주소·결제정보를 직접 입력받지 않습니다.",
            "이메일로 문의하는 경우에는 답변을 위해 발신 이메일 주소와 문의 내용을 처리합니다. 문의 기록은 답변과 후속 대응에 필요한 기간 동안 이메일 서비스에 보관될 수 있습니다."
          ]
        },
        {
          title: "2. 도구에 입력한 텍스트와 파일",
          content: [
            "글자수 세기, 이미지 편집·픽셀 아트, 이미지 → PDF 및 PDF 병합·페이지 추출·정리·PNG 저장 도구에서 선택한 텍스트·문서·이미지는 브라우저 안에서 처리하도록 설계되어 있으며, QK Tool Hub가 운영하는 저장 서버로 의도적으로 업로드하지 않습니다.",
            "페이지 메모리에만 있는 작업 데이터는 새로고침이나 탭 종료 시 사라집니다. 다만 이용자가 다운로드한 결과 파일과 아래 로컬 저장소에 저장된 설정·임시 텍스트는 자동으로 삭제되지 않습니다."
          ]
        },
        {
          title: "PDF 작업 데이터와 문의",
          content: ["PDF 파일의 내용과 페이지 미리보기는 이용 중인 브라우저에서 처리됩니다. 파일 이름·본문·페이지 이미지를 방문 통계 이벤트로 보내도록 설계하지 않았습니다.", "문의 이메일에 원본 문서를 첨부하지 않아도 됩니다. 문서를 직접 첨부하면 그 파일과 문의 내용은 이메일 서비스에서 처리될 수 있으므로 첨부 여부를 확인해 주세요."]
        },
        {
          title: "3. 사이트 제공 및 방문 통계 데이터",
          content: [
            "사이트 접속 과정에서 호스팅 및 분석 제공업체는 IP 주소, 브라우저·기기 정보, 요청 시각, 방문·참조 페이지, 오류 및 성능 정보와 같은 기술 데이터를 처리할 수 있습니다.",
            "서비스는 이용 현황과 성능을 확인하기 위해 Google Analytics 4(Google LLC)와 Vercel Analytics(Vercel Inc.)를 사용합니다. 이 데이터는 도구에 입력한 텍스트나 파일과 구분되며 각 제공업체의 정책과 보관 설정에 따라 처리됩니다."
          ]
        },
        {
          title: "4. 제3자 광고 게재 및 쿠키(Cookie) 안내 (Google AdSense)",
          content: [
            "서비스는 무료 운영 유지를 위해 Google AdSense를 통한 제3자 광고를 게재하고 있습니다.",
            "- Google을 포함한 제3자 공급업체는 이용자가 본 웹사이트나 다른 웹사이트를 방문한 기록을 바탕으로 맞춤형 광고를 게재하기 위해 쿠키(Cookie)를 사용합니다.",
            "- 이용자는 Google 광고 설정(https://adssettings.google.com)에서 개인 맞춤 광고를 관리하거나 해제할 수 있습니다.",
            "- 또한 이용자는 웹 브라우저의 옵션 설정을 통해 모든 쿠키의 저장을 거부하거나 삭제할 수 있습니다."
          ]
        },
        {
          title: "5. 브라우저 로컬 저장소(LocalStorage)의 사용",
          content: [
            "서비스는 다크/라이트 테마, 언어, 글자수 세기 임시 텍스트, 세계시계 도시·알람, 달력 국가, 단위 변환 설정 등을 기억하기 위해 이용자 기기의 로컬 저장소(LocalStorage)를 사용합니다.",
            "이 정보는 브라우저에 남아 다음 방문 때 다시 사용될 수 있으며, 브라우저의 사이트 데이터 삭제 기능으로 지울 수 있습니다. 방문 통계나 광고 서비스가 별도로 처리하는 데이터와는 구분됩니다."
          ]
        },
        {
          title: "6. 개인정보 보호 문의처",
          content: [
            "본 개인정보처리방침에 관한 문의사항이나 의견은 아래 공식 연락처로 접수해 주시기 바랍니다.",
            "- 문의 이메일: contact@qktoolhub.com",
            "- 웹사이트: https://www.qktoolhub.com"
          ]
        }
      ]
    },
    footer: {
      termsLink: "이용약관",
      privacyLink: "개인정보처리방침",
      aboutLink: "서비스 소개",
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "설치 없이 바로 쓰는 생활·업무용 무료 웹 도구",
      close: "닫기",
      contactLabel: "문의",
      contactIntro: "본 내용에 대한 문의사항이나 의견은 이메일로 접수해 주시기 바랍니다."
    }
  },
  en: {
    terms: {
      title: "Terms of Service",
      effectiveDate: "Updated: September 16, 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "Article 1 (Purpose)",
          content: [
            "These Terms govern QK Tool Hub's browser tools, including word counting, currency and unit conversion, image editing and pixel art, world clock and calendar, images to PDF, PDF merging, page extraction and organization, and PDF-page export to PNG."
          ]
        },
        {
          title: "Article 2 (Service Characteristics & Free Access)",
          content: [
            "1. The Service is provided 100% free of charge without requiring any registration or login.",
            "2. Content entered into text, file-conversion, and image tools is designed to be processed in your browser. External requests needed for exchange-rate retrieval, site delivery, analytics, and advertising are described separately in the Privacy Policy.",
            "3. We reserve the right to modify or discontinue features at any time to improve system stability and capabilities."
          ]
        },
        {
          title: "Article 3 (User Obligations)",
          content: [
            "1. You agree not to use the Service for any unlawful purpose or to infringe upon the rights of others.",
            "2. You may not interfere with the proper working of the Service, nor generate excessive abusive automated traffic (such as DDoS or malicious scraping)."
          ]
        },
        {
          title: "PDF tool scope and output review",
          content: ["Images to PDF creates a new PDF from images. Existing-PDF tools merge files, extract selected pages into one PDF, reorder, rotate or remove pages, add blank pages and save a selected page as PNG.", "Password-protected PDFs, OCR and editing original text are not supported. Signatures, forms and bookmarks may not survive page operations. Review important documents after downloading the output."]
        },
        {
          title: "Article 4 (Disclaimer of Warranties & Limitation of Liability)",
          content: [
            "1. Informational Purposes Only: All calculations, exchange rates, holiday algorithms, business working days, unit conversions, and text statistics are provided strictly for general informational reference. We make no representations or warranties regarding absolute accuracy or completeness.",
            "2. Financial & Contractual Disclaimer: QK Tool Hub shall not be liable for any direct, indirect, incidental, or consequential damages arising from transactions, foreign transfers, legal contracts, airline bookings, or project deadlines based on the Service's data.",
            "3. Third-Party Dependencies: We are not responsible for service interruptions caused by telecommunication failures, third-party API downtimes, or browser incompatibilities."
          ]
        },
        {
          title: "Article 5 (Intellectual Property)",
          content: [
            "1. The Service UI, codebase, trademarks, and design systems are the intellectual property of QK Tool Hub.",
            "2. All outputs created or transformed by users (e.g., edited images, converted PDFs, generated pixel art) remain the sole property and copyright of the respective user."
          ]
        },
        {
          title: "Article 6 (Third-Party Advertising)",
          content: [
            "To keep the tools free, third-party advertisements (such as Google AdSense) may be displayed on the Service. Interactions with advertisers are solely between you and the third party."
          ]
        },
        {
          title: "Article 7 (Contact Information)",
          content: [
            "For questions regarding these Terms of Service, please contact us at contact@qktoolhub.com."
          ]
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      effectiveDate: "Updated: September 16, 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. Account and contact information",
          content: [
            "QK Tool Hub does not require registration or login and does not ask for your name, address, or payment information to use its tools.",
            "If you email us, we process your email address and message to reply. The correspondence may remain with our email provider for as long as needed to answer and follow up."
          ]
        },
        {
          title: "2. Text and files used in tools",
          content: [
            "Text, images and PDFs selected for word counting, image editing, pixel art, images to PDF, PDF merging, page extraction or organization, and PDF-page export to PNG are designed to be processed in the browser and are not intentionally uploaded to storage servers operated by QK Tool Hub.",
            "Work held only in page memory disappears when the page is refreshed or closed. Downloaded output and preferences or draft text saved in browser local storage do not disappear automatically."
          ]
        },
        {
          title: "3. Site delivery and analytics data",
          content: [
            "Hosting and analytics providers may process technical data such as IP address, browser and device information, request time, viewed and referring pages, errors, and performance data when the site is accessed.",
            "We use Google Analytics 4 (Google LLC) and Vercel Analytics (Vercel Inc.) to understand usage and performance. This data is separate from content entered into tools and is handled under each provider's policy and retention settings."
          ]
        },
        {
          title: "PDF work data and inquiries",
          content: ["PDF content and page previews are processed in your browser. The site is not designed to send file names, document text or page images as analytics events.", "You can ask for help without attaching the original document. If you choose to attach it to an email, the file and message may be processed by the email provider."]
        },
        {
          title: "4. Third-Party Advertising & Cookies (Google AdSense)",
          content: [
            "We serve third-party ads through Google AdSense to fund our free web tools.",
            "- Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this or other websites.",
            "- You may manage or opt out of personalized advertising through Google Ads Settings (https://adssettings.google.com).",
            "- You can also disable or clear cookies in your web browser settings at any time."
          ]
        },
        {
          title: "5. Browser LocalStorage Usage",
          content: [
            "Browser LocalStorage remembers settings such as theme, language, word-counter draft text, world-clock cities and alarms, calendar countries, and unit-converter preferences.",
            "These items can remain for later visits until you clear the site's browser data. They are separate from data processed by analytics and advertising services."
          ]
        },
        {
          title: "6. Privacy Contact",
          content: [
            "If you have questions or feedback about this Privacy Policy, please contact us at:",
            "- Email: contact@qktoolhub.com",
            "- Website: https://www.qktoolhub.com"
          ]
        }
      ]
    },
    footer: {
      termsLink: "Terms of Service",
      privacyLink: "Privacy Policy",
      aboutLink: "About",
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "Free browser tools for everyday and work tasks",
      close: "Close",
      contactLabel: "Contact",
      contactIntro: "For questions or feedback about this page, contact us by email."
    }
  },
  ja: {
    terms: {
      title: "利用規約 (Terms of Service)",
      effectiveDate: "改定日: 2026年9月16日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "第1条（目的）",
          content: [
            "本規約は、QK Tool Hubのブラウザツール（文字数、為替・単位換算、画像編集・ドット絵、世界時計・カレンダー、画像からPDF、PDF結合・ページ抽出・整理・PNG保存等）の利用条件を定めます。"
          ]
        },
        {
          title: "第2条（サービスの特徴と完全無料提供）",
          content: [
            "1. 本サービスは会員登録やログインを一切必要とせず、誰でも100%完全無料でご利用いただけます。",
            "2. テキスト、ファイル変換、画像ツールに入力した内容はブラウザ内で処理するよう設計されています。為替取得、サイト配信、アクセス解析、広告に必要な外部通信はプライバシーポリシーで別途説明します。"
          ]
        },
        {
          title: "第3条（免責事項）",
          content: [
            "1. 参考情報の提供：為替レート、通貨換算、祝日・営業日計算、単位換算、文字数・バイト数計算等の出力結果は参考情報であり、完全性や正確性を保証するものではありません。",
            "2. 取引・契約の免責：本サービスの計算結果に基づいて行われた金融取引、国際送金、契約、航空予約等により生じたいかなる損害についても、本サービスは一切の責任を負いません。"
          ]
        },
        {
          title: "PDFツールの範囲と出力確認",
          content: ["画像からPDFを作成できます。既存PDFの結合、選んだページを一つの新しいPDFへ抽出、並べ替え・回転・削除・空白ページ追加、選択ページのPNG保存に対応します。", "パスワード付きPDF、OCR、元の文章の編集には対応しません。ページ操作で署名・フォーム・しおりが保持されない場合があるため、重要な文書はダウンロード後に確認してください。"]
        },
        {
          title: "第4条（知的財産権および広告）",
          content: [
            "1. 本サービスのUIデザイン、プログラム、コンテンツの著作権はQK Tool Hubに帰属します。利用者が本ツールにより生成した成果物の権利は利用者に帰属します。",
            "2. 本サービスの無料提供を継続するため、Google AdSense等の第三者広告を配信しています。"
          ]
        },
        {
          title: "第5条（お問い合わせ）",
          content: [
            "本規約に関するお問い合わせは、公式メールアドレス（contact@qktoolhub.com）までお願いいたします。"
          ]
        }
      ]
    },
    privacy: {
      title: "プライバシーポリシー (Privacy Policy)",
      effectiveDate: "改定日: 2026年9月16日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. アカウント情報とお問い合わせ情報",
          content: [
            "QK Tool Hubは登録やログインを求めず、ツール利用のために氏名、住所、決済情報を直接入力させることはありません。",
            "メールでお問い合わせいただいた場合、返信のため送信元アドレスと内容を処理し、対応に必要な期間メールサービス上に保管されることがあります。"
          ]
        },
        {
          title: "2. ツールに入力したテキストとファイル",
          content: [
            "文字数、画像編集・ドット絵、画像からPDF、PDF結合・ページ抽出・整理・PNG保存で選択したテキストやファイルはブラウザ内で処理するよう設計され、QK Tool Hubの保存サーバーへ意図的にアップロードしません。",
            "ページメモリ上の作業データは再読み込みやタブ終了で消えますが、ダウンロード済みファイルやローカル保存された設定・下書きは自動では消えません。"
          ]
        },
        {
          title: "3. サイト配信とアクセス解析",
          content: [
            "サイト接続時、ホスティングおよび解析事業者はIPアドレス、ブラウザ・端末情報、時刻、閲覧・参照ページ、エラー、性能情報などを処理する場合があります。",
            "利用状況と性能の把握にGoogle Analytics 4とVercel Analyticsを使用します。これはツール入力内容とは別で、各提供者の方針と保存設定に従って処理されます。"
          ]
        },
        {
          title: "PDF作業データとお問い合わせ",
          content: ["PDFの内容とページプレビューはブラウザ内で処理されます。ファイル名・本文・ページ画像をアクセス解析イベントへ送る設計ではありません。", "元の文書を添付せずにお問い合わせできます。メールに文書を添付した場合、ファイルとメッセージはメールサービスで処理される場合があります。"]
        },
        {
          title: "4. 第三者配信広告とクッキー（Cookie）について",
          content: [
            "本サイトではGoogle AdSenseによる広告を配信します。Google等の第三者事業者は、本サイトや他サイトへの過去のアクセスに基づく広告のためCookieを使用する場合があります。広告設定（https://adssettings.google.com）でパーソナライズ広告を管理または無効化できます。"
          ]
        },
        {
          title: "5. ブラウザのローカル保存",
          content: [
            "テーマ、言語、文字数ツールの下書き、世界時計、カレンダー、単位変換の設定はLocalStorageに残り、次回利用時に再使用されます。ブラウザのサイトデータ削除で消去できます。解析・広告サービスが処理するデータとは別です。"
          ]
        },
        {
          title: "6. お問い合わせ窓口",
          content: [
            "プライバシーポリシーに関するご質問は、下記までご連絡ください。",
            "- メール: contact@qktoolhub.com"
          ]
        }
      ]
    },
    footer: {
      termsLink: "利用規約",
      privacyLink: "プライバシーポリシー",
      aboutLink: "サービス紹介",
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "インストール不要の日常・業務向け無料Webツール",
      close: "閉じる",
      contactLabel: "お問い合わせ",
      contactIntro: "このページに関するご質問やご意見はメールでお寄せください。"
    }
  },
  zh: {
    terms: {
      title: "服务使用条款 (Terms of Service)",
      effectiveDate: "修订生效日期：2026年9月16日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "第一条（宗旨）",
          content: [
            "本条款规范 QK Tool Hub 浏览器工具的使用，包括字数统计、汇率与单位换算、图像编辑与像素画、世界时钟与日历、图片转PDF以及PDF合并、页面提取与整理、页面转PNG等。"
          ]
        },
        {
          title: "第二条（服务特色与完全免费）",
          content: [
            "1. 本服务无需任何注册或登录，任何人均可100%免费使用。",
            "2. 文本、文件转换和图像工具的输入内容按设计在浏览器内处理。汇率查询、网站交付、访问统计和广告所需的外部通信在隐私政策中另行说明。"
          ]
        },
        {
          title: "第三条（免责声明）",
          content: [
            "1. 仅供参考：汇率数据、节假日算法、工作日计算、单位转换及字数统计结果仅供日常参考，本服务不对绝对准确性承担法律责任。",
            "2. 交易与合约免责：用户依据本服务计算结果进行的任何实际金融外汇交易、法律合同签署或物流出行决策，所产生的损益均由用户自行负责。"
          ]
        },
        {
          title: "PDF工具范围与结果核对",
          content: ["图片转PDF可创建新文件。现有PDF工具可合并文件、将选定页面提取到一个新PDF、排序、旋转、删除或添加空白页，并将选定页面保存为PNG。", "不支持加密PDF、OCR或修改原文。页面操作可能无法保留签名、表单或书签，重要文档下载后请检查。"]
        },
        {
          title: "第四条（知识产权与广告）",
          content: [
            "1. 本服务的代码、UI与界面设计归 QK Tool Hub 所有；用户使用本工具加工生成的图片与文档等成果所有权归用户本人所有。",
            "2. 为维持免费运营，本服务可能展示来自 Google AdSense 等第三方的广告内容。"
          ]
        },
        {
          title: "第五条（联系方式）",
          content: [
            "如对本服务条款有任何疑问，请联系：contact@qktoolhub.com。"
          ]
        }
      ]
    },
    privacy: {
      title: "隐私政策 (Privacy Policy)",
      effectiveDate: "更新日期：2026年9月16日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. 账户与联系信息",
          content: [
            "QK Tool Hub 无需注册或登录，使用工具时不会直接要求姓名、地址或付款信息。",
            "如果您通过邮件联系我们，我们会为回复而处理发件地址和消息内容；邮件记录可能在完成答复和后续处理所需期间保存在邮件服务中。"
          ]
        },
        {
          title: "2. 工具中的文本与文件",
          content: [
            "字数统计、图像编辑与像素画、图片转PDF、PDF合并、页面提取与整理及页面转PNG使用的文本与文件按设计在浏览器内处理，不会被有意上传到QK Tool Hub运营的存储服务器。",
            "仅存在页面内存中的工作数据会在刷新或关闭标签页时消失；已下载文件以及保存在本地存储中的设置或草稿不会自动删除。"
          ]
        },
        {
          title: "3. 网站交付与访问统计",
          content: [
            "访问网站时，托管和分析服务商可能处理IP地址、浏览器与设备信息、请求时间、访问与来源页面、错误和性能信息等技术数据。",
            "我们使用Google Analytics 4和Vercel Analytics了解使用情况与性能。此类数据与工具输入内容分开，并依各服务商的政策和保留设置处理。"
          ]
        },
        {
          title: "PDF工作数据与咨询",
          content: ["PDF内容和页面预览在浏览器中处理。网站没有设计为将文件名、正文或页面图片作为统计事件发送。", "无需附上原始文档即可咨询。如主动通过邮件附上文档，邮件服务可能处理该文件及消息内容。"]
        },
        {
          title: "4. 第三方广告与 Cookie 说明（Google AdSense）",
          content: [
            "本站使用Google AdSense展示广告。Google等第三方供应商可能使用Cookie，根据您此前访问本网站或其他网站的情况投放广告。可在Google广告设置（https://adssettings.google.com）管理或停用个性化广告，也可通过浏览器清除Cookie。"
          ]
        },
        {
          title: "5. 浏览器本地存储",
          content: [
            "主题、语言、字数工具草稿、世界时钟、日历和单位换算设置可保存在LocalStorage中供下次使用，直至您清除浏览器网站数据。它与分析和广告服务处理的数据相互区分。"
          ]
        },
        {
          title: "6. 隐私咨询联系",
          content: [
            "如有关于隐私政策的建议或问题，请通过以下方式联系我们：",
            "- 电子邮箱：contact@qktoolhub.com"
          ]
        }
      ]
    },
    footer: {
      termsLink: "使用条款",
      privacyLink: "隐私政策",
      aboutLink: "服务介绍",
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "无需安装的日常与办公免费网页工具",
      close: "关闭",
      contactLabel: "咨询",
      contactIntro: "关于本页面的问题或意见，请通过电子邮件联系我们。"
    }
  },
  es: {
    terms: {
      title: "Términos del Servicio (Terms of Service)",
      effectiveDate: "Actualizado: 16 de septiembre de 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "Artículo 1 (Objeto)",
          content: [
            "Estos términos regulan las herramientas de navegador de QK Tool Hub: contador de palabras, divisas y unidades, edición de imágenes y arte píxel, reloj y calendario, imágenes a PDF, unión y extracción u organización de páginas PDF y exportación de páginas a PNG."
          ]
        },
        {
          title: "Artículo 2 (Características y Gratuidad)",
          content: [
            "1. El Servicio es 100% gratuito y no requiere ningún tipo de registro ni inicio de sesión.",
            "2. El contenido introducido en las herramientas de texto, archivos e imágenes está diseñado para procesarse en el navegador. Las comunicaciones externas para divisas, entrega del sitio, analítica y publicidad se describen en la Política de Privacidad."
          ]
        },
        {
          title: "Artículo 3 (Exención de Responsabilidad)",
          content: [
            "1. Uso Informativo: Los tipos de cambio, días festivos, días hábiles netos y recuentos de texto se ofrecen exclusivamente a título orientativo. No garantizamos exactitud absoluta.",
            "2. Exención en Transacciones: El Servicio no se hace responsable de daños derivados de transacciones financieras, contratos legales o reservas realizadas en base a estos datos."
          ]
        },
        {
          title: "Alcance de PDF y revisión del resultado",
          content: ["Imágenes a PDF crea un documento nuevo. Las herramientas para PDF existentes unen archivos, extraen páginas elegidas en un PDF, ordenan, giran o borran páginas, añaden una página en blanco y guardan una página como PNG.", "No se admiten PDF protegidos con contraseña, OCR ni edición del texto original. Las firmas, formularios o marcadores pueden perderse en las operaciones de páginas; revisa los documentos importantes después de descargarlos."]
        },
        {
          title: "Artículo 4 (Propiedad Intelectual y Publicidad)",
          content: [
            "1. El diseño y código pertenecen a QK Tool Hub. Los resultados y archivos generados pertenecen exclusivamente al usuario.",
            "2. El sitio puede mostrar publicidad de terceros (Google AdSense) para financiar su mantenimiento gratuito."
          ]
        },
        {
          title: "Artículo 5 (Contacto)",
          content: [
            "Para cualquier consulta sobre estos términos, contáctenos en: contact@qktoolhub.com."
          ]
        }
      ]
    },
    privacy: {
      title: "Política de Privacidad (Privacy Policy)",
      effectiveDate: "Actualizado: 16 de septiembre de 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. Datos de cuenta y contacto",
          content: [
            "QK Tool Hub no requiere registro ni inicio de sesión y no solicita nombre, dirección o datos de pago para usar las herramientas.",
            "Si nos escribe por correo, procesamos la dirección del remitente y el mensaje para responder. La correspondencia puede permanecer en el servicio de correo durante el tiempo necesario para la respuesta y el seguimiento."
          ]
        },
        {
          title: "2. Textos y archivos usados en las herramientas",
          content: [
            "Los textos, imágenes y PDF elegidos para contar palabras, editar imágenes, arte píxel, imágenes a PDF, unir PDF, extraer u organizar páginas y guardar una página como PNG están diseñados para procesarse en el navegador y no se suben intencionadamente a servidores de almacenamiento de QK Tool Hub.",
            "Los datos que solo están en la memoria de la página desaparecen al actualizarla o cerrarla. Los archivos descargados y las preferencias o borradores guardados en LocalStorage no se eliminan automáticamente."
          ]
        },
        {
          title: "3. Entrega del sitio y analítica",
          content: [
            "Al acceder al sitio, los proveedores de alojamiento y analítica pueden procesar datos técnicos como dirección IP, navegador, dispositivo, hora, páginas vistas y de referencia, errores y rendimiento.",
            "Usamos Google Analytics 4 y Vercel Analytics para conocer el uso y el rendimiento. Estos datos están separados del contenido introducido en las herramientas y se tratan según las políticas y la retención de cada proveedor."
          ]
        },
        {
          title: "Datos de trabajo PDF y consultas",
          content: ["El contenido PDF y las vistas previas de páginas se procesan en el navegador. El sitio no está diseñado para enviar nombres de archivo, texto o imágenes de páginas como eventos de analítica.", "Puedes consultar sin adjuntar el documento original. Si decides enviarlo por correo, el archivo y el mensaje pueden ser procesados por el proveedor de correo."]
        },
        {
          title: "4. Publicidad y Cookies de Terceros (Google AdSense)",
          content: [
            "Google y otros proveedores pueden usar cookies para mostrar anuncios basados en visitas anteriores a este u otros sitios. Puede gestionar o desactivar la personalización en la Configuración de Anuncios de Google (https://adssettings.google.com) y borrar cookies desde el navegador."
          ]
        },
        {
          title: "5. Almacenamiento local del navegador",
          content: [
            "LocalStorage puede conservar el tema, idioma, borrador del contador, ciudades y alarmas, países del calendario y ajustes del conversor para próximas visitas, hasta que borre los datos del sitio. Es distinto de los datos tratados por analítica y publicidad."
          ]
        },
        {
          title: "6. Contacto sobre privacidad",
          content: [
            "Para dudas sobre esta política de privacidad, escríbanos a:",
            "- Correo: contact@qktoolhub.com"
          ]
        }
      ]
    },
    footer: {
      termsLink: "Términos del Servicio",
      privacyLink: "Política de Privacidad",
      aboutLink: "Acerca de",
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). Todos los derechos reservados.",
      tagline: "Herramientas web gratuitas para tareas cotidianas y de trabajo",
      close: "Cerrar",
      contactLabel: "Contacto",
      contactIntro: "Para preguntas o comentarios sobre esta página, escríbenos por correo."
    }
  }
};
