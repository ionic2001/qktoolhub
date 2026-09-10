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
  };
}

export const legalText: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', LegalI18n> = {
  ko: {
    terms: {
      title: "서비스 이용약관",
      effectiveDate: "시행일자: 2026년 9월 9일",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "제1조 (목적)",
          content: [
            "본 약관은 QK Tool Hub(이하 '서비스')가 제공하는 브라우저 기반 온라인 웹 유틸리티 도구(글자수 세기, 환율 계산기, 단위 변환기, 이미지 에디터, PDF 도구, 픽셀 아트 변환, 세계시계, 스마트 달력 등)의 이용 조건 및 절차, 권리와 의무를 규정함을 목적으로 합니다."
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
      effectiveDate: "시행일자: 2026년 9월 10일",
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
            "글자수 세기, 이미지 편집, PDF 변환, 픽셀 아트 등에서 이용자가 입력하거나 선택한 텍스트·문서·이미지는 해당 기능을 실행하는 브라우저 안에서 처리하도록 설계되어 있으며, QK Tool Hub가 운영하는 저장 서버로 의도적으로 업로드하지 않습니다.",
            "페이지 메모리에만 있는 작업 데이터는 새로고침이나 탭 종료 시 사라집니다. 다만 이용자가 다운로드한 결과 파일과 아래 로컬 저장소에 저장된 설정·임시 텍스트는 자동으로 삭제되지 않습니다."
          ]
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
      contactLabel: "문의"
    }
  },
  en: {
    terms: {
      title: "Terms of Service",
      effectiveDate: "Effective Date: September 9, 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "Article 1 (Purpose)",
          content: [
            "These Terms of Service govern your use of QK Tool Hub (the 'Service') and its suite of browser-based online web utilities, including Word Counter, Currency Converter, Unit Converter, Image Editor, PDF Tools, Pixel Art Converter, World Clock, and Smart Calendar."
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
      effectiveDate: "Effective Date: September 10, 2026",
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
            "Text, documents, PDFs, and images selected for the word, image, PDF, and pixel-art tools are designed to be processed in the browser and are not intentionally uploaded to storage servers operated by QK Tool Hub.",
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
      contactLabel: "Contact"
    }
  },
  ja: {
    terms: {
      title: "利用規約 (Terms of Service)",
      effectiveDate: "制定日: 2026年9月9日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "第1条（目的）",
          content: [
            "本規約は、QK Tool Hub（以下「本サービス」）が提供するブラウザ完結型オンラインWebツール（文字数カウント、為替計算機、単位換算、画像編集、PDF変換、ドット絵変換、世界時計、年間カレンダー等）の利用条件を定めるものです。"
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
      effectiveDate: "改定日: 2026年9月10日",
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
            "文字数、画像、PDF、ピクセルアートの各ツールで選択したテキストやファイルはブラウザ内で処理するよう設計され、QK Tool Hubの保存サーバーへ意図的にアップロードしません。",
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
      contactLabel: "お問い合わせ"
    }
  },
  zh: {
    terms: {
      title: "服务使用条款 (Terms of Service)",
      effectiveDate: "生效日期：2026年9月9日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "第一条（宗旨）",
          content: [
            "本条款规范您使用 QK Tool Hub（以下简称“本服务”）所提供的所有基于浏览器的免费在线实用工具（字数统计、实时汇率换算、单位换算、图片编辑、PDF工具、像素画转换、世界时钟及智能日历等）。"
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
      effectiveDate: "更新日期：2026年9月10日",
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
            "字数、图像、PDF和像素画工具所选文本与文件按设计在浏览器内处理，不会被有意上传到QK Tool Hub运营的存储服务器。",
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
      contactLabel: "咨询"
    }
  },
  es: {
    terms: {
      title: "Términos del Servicio (Terms of Service)",
      effectiveDate: "Fecha de entrada en vigor: 9 de septiembre de 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "Artículo 1 (Objeto)",
          content: [
            "Los presentes Términos regulan el uso de QK Tool Hub (el 'Servicio') y su conjunto de herramientas en línea gratuitas ejecutadas en navegador (contador de palabras, conversor de divisas, conversor de unidades, editor de imágenes, herramientas PDF, reloj mundial y calendario)."
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
      effectiveDate: "Fecha de actualización: 10 de septiembre de 2026",
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
            "Los textos, documentos, PDF e imágenes seleccionados para las herramientas están diseñados para procesarse en el navegador y no se suben intencionadamente a servidores de almacenamiento operados por QK Tool Hub.",
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
      contactLabel: "Contacto"
    }
  }
};
