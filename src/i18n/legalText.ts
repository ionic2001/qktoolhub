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
            "2. 서비스에서 제공하는 모든 텍스트 분석, 파일 변환, 이미지 편집 작업은 이용자의 웹 브라우저 로컬 환경(클라이언트 사이드)에서 처리되며 서버로 전송되지 않습니다.",
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
      effectiveDate: "시행일자: 2026년 9월 9일",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. 개인식별정보 미수집 원칙",
          content: [
            "QK Tool Hub는 회원가입이나 로그인 없이 100% 무료로 운영되며, 이용자의 성명, 생년월일, 주민번호, 연락처, 이메일, 주소 등 개인을 식별할 수 있는 정보를 일체 수집하거나 저장하지 않습니다."
          ]
        },
        {
          title: "2. 브라우저 내 데이터 처리 (Zero-Server Processing)",
          content: [
            "이용자가 글자수 세기, 단위 변환, 이미지 편집, PDF 변환, 픽셀 아트, 스마트 달력 등에서 입력하거나 업로드하는 모든 텍스트, 문서, 이미지 파일은 이용자의 웹 브라우저 로컬 메모리(WebAssembly, Canvas, Local API) 내에서만 처리됩니다.",
            "어떠한 데이터도 서비스의 외부 서버로 전송되거나 저장되지 않으며, 브라우저 창을 닫으면 즉시 메모리에서 완전 소멸합니다."
          ]
        },
        {
          title: "3. 방문자 통계 분석 도구 (Google Analytics, Vercel Analytics)",
          content: [
            "서비스는 안정적인 서버 성능 유지와 방문자 이용 패턴 분석을 위해 익명 통계 도구를 활용합니다.",
            "- 수집 항목: 익명화된 IP 주소, 브라우저 종류, 운영체제(OS), 방문 일시, 페이지 조회 기록, 기기 유형 등 개인을 특정할 수 없는 비식별 로그 데이터",
            "- 사용 도구: Google Analytics 4 (Google LLC), Vercel Analytics (Vercel Inc.)"
          ]
        },
        {
          title: "4. 제3자 광고 게재 및 쿠키(Cookie) 안내 (Google AdSense)",
          content: [
            "서비스는 무료 운영 유지를 위해 Google AdSense를 통한 제3자 광고를 게재하고 있습니다.",
            "- Google을 포함한 제3자 공급업체는 이용자가 본 웹사이트나 다른 웹사이트를 방문한 기록을 바탕으로 맞춤형 광고를 게재하기 위해 쿠키(Cookie)를 사용합니다.",
            "- 이용자는 Google 광고 설정(https://adssettings.google.com) 또는 AboutAds(http://www.aboutads.info)를 방문하여 개인 맞춤설정 광고 쿠키 사용을 선택 해제(Opt-out)할 수 있습니다.",
            "- 또한 이용자는 웹 브라우저의 옵션 설정을 통해 모든 쿠키의 저장을 거부하거나 삭제할 수 있습니다."
          ]
        },
        {
          title: "5. 브라우저 로컬 저장소(LocalStorage)의 사용",
          content: [
            "서비스는 이용자의 편의성(다크/라이트 테마, 언어 선택, 세계시계 관심 도시, 달력 선택 국가 등)을 유지하기 위해 이용자 기기의 로컬 저장소(LocalStorage)를 사용합니다. 이 정보는 전적으로 이용자 기기에만 머무르며 외부로 전송되지 않습니다."
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
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "100% 클라이언트 사이드 개인정보 보호 무료 웹 유틸리티 툴킷",
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
            "2. All text analytics, file conversion, and image manipulation operate entirely within your local browser environment (client-side) and are never transmitted to our servers.",
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
      effectiveDate: "Effective Date: September 9, 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. No Personally Identifiable Information (Zero-PII)",
          content: [
            "QK Tool Hub is committed to protecting your privacy. We do not require account registration and do not collect, store, or sell any Personally Identifiable Information (PII) such as your name, email, phone number, address, or payment details."
          ]
        },
        {
          title: "2. Client-Side Processing (Zero-Server Architecture)",
          content: [
            "All text inputs, documents, PDF files, and images processed through our tools (Word Counter, Image Editor, PDF Converter, Calendar, etc.) are handled exclusively in your local browser memory using modern WebAssembly and Canvas APIs.",
            "No user content is ever uploaded to or stored on our servers. When you close or refresh the browser tab, all session data is permanently cleared."
          ]
        },
        {
          title: "3. Anonymous Web Analytics (Google Analytics & Vercel Analytics)",
          content: [
            "To understand traffic trends and ensure server reliability, we collect anonymous, aggregated diagnostic metrics.",
            "- Collected Data: Anonymized IP addresses, browser types, operating systems, visit timestamps, referring URLs, and pageview counts.",
            "- Providers: Google Analytics 4 (Google LLC) and Vercel Analytics (Vercel Inc.)."
          ]
        },
        {
          title: "4. Third-Party Advertising & Cookies (Google AdSense)",
          content: [
            "We serve third-party ads through Google AdSense to fund our free web tools.",
            "- Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this or other websites.",
            "- You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or www.aboutads.info.",
            "- You can also disable or clear cookies in your web browser settings at any time."
          ]
        },
        {
          title: "5. Browser LocalStorage Usage",
          content: [
            "We utilize browser LocalStorage solely to remember your user preferences (e.g., dark/light theme, language selection, selected holiday countries). This data remains strictly on your device and is never sent to our servers."
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
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "100% Client-Side Privacy-First Free Online Web Utilities",
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
            "2. 本サービス上のすべてのテキスト解析、画像編集、PDF変換等の処理はお客様のブラウザ内（クライアントサイド）でのみ実行され、当社のサーバーへ送信されることはありません。"
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
      effectiveDate: "制定日: 2026年9月9日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. 個人識別情報の非収集原則",
          content: [
            "QK Tool Hubは氏名、生年月日、住所、電話番号、メールアドレス等の個人を特定できる情報（PII）を一切収集・保存・販売いたしません。"
          ]
        },
        {
          title: "2. クライアントサイド処理（Zero-Server Processing）",
          content: [
            "入力されたテキストやアップロードされた画像・PDF等のファイルは、お客様のブラウザメモリ内でのみ処理されます。外部サーバーにアップロードされることはなく、ブラウザを閉じると完全に消去されます。"
          ]
        },
        {
          title: "3. アクセス解析ツール（Google Analytics, Vercel Analytics）",
          content: [
            "サービス改善および統計分析のため、匿名化されたIPアドレス、ブラウザ種類、閲覧履歴などの個人を特定しないログデータを収集しています。"
          ]
        },
        {
          title: "4. 第三者配信広告とクッキー（Cookie）について",
          content: [
            "本サイトではGoogle AdSenseによる広告を配信しています。Google等の第三者事業者はクッキーを使用してお客様の過去のアクセス情報に基づき適切な広告を配信します。広告設定（https://adssettings.google.com）よりパーソナライズ広告を無効化できます。"
          ]
        },
        {
          title: "5. お問い合わせ窓口",
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
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "100%クライアントサイド動作・プライバシー優先の無料Webツール集",
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
            "2. 所有文字统计、图片编辑及文件转换均在您的本地浏览器（客户端）内完成，绝不上传至外部服务器。"
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
      effectiveDate: "生效日期：2026年9月9日",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. 不收集个人身份信息（Zero-PII）",
          content: [
            "QK Tool Hub 严格保护用户隐私，无需注册账户，绝不收集、保存或贩卖任何个人身份信息（如姓名、身份证号、电话、邮箱或住址等）。"
          ]
        },
        {
          title: "2. 本地浏览器处理（纯客户端运行）",
          content: [
            "您在各工具中输入的文本、上传的图像及PDF文件仅在本地浏览器内存中即时处理，不会上传至任何云端服务器，关闭网页标签后立即销毁。"
          ]
        },
        {
          title: "3. 访问统计工具（Google Analytics & Vercel Analytics）",
          content: [
            "为优化服务质量，我们使用 Google Analytics 4 与 Vercel Analytics 收集匿名的非身份识别日志（如匿名IP、浏览器类型、操作系统、访问时长与页面浏览量）。"
          ]
        },
        {
          title: "4. 第三方广告与 Cookie 说明（Google AdSense）",
          content: [
            "本站使用 Google AdSense 展示广告以维持免费运营。Google 等第三方供应商使用 Cookie 根据用户过往浏览记录投放广告。用户可访问 Google 广告设置（https://adssettings.google.com）停用个性化广告 Cookie。"
          ]
        },
        {
          title: "5. 隐私咨询联系",
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
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). All rights reserved.",
      tagline: "100% 纯客户端运行·隐私至上的免费在线实用工具箱",
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
            "2. Todos los cálculos y conversiones se ejecutan localmente en su navegador (lado del cliente) sin enviarse a servidores externos."
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
      effectiveDate: "Fecha de entrada en vigor: 9 de septiembre de 2026",
      contactEmail: "contact@qktoolhub.com",
      sections: [
        {
          title: "1. No Recopilación de Información Personal (Zero-PII)",
          content: [
            "QK Tool Hub no solicita registro ni recopila datos personales identificables como nombre, teléfono, dirección o datos bancarios."
          ]
        },
        {
          title: "2. Procesamiento en el Navegador (Lado del Cliente)",
          content: [
            "Los textos, imágenes y archivos PDF se procesan en la memoria local de su navegador y nunca se transmiten a servidores externos. Los datos se eliminan al cerrar la pestaña."
          ]
        },
        {
          title: "3. Herramientas de Análisis Anónimo",
          content: [
            "Utilizamos Google Analytics 4 y Vercel Analytics para recopilar registros anónimos no identificables (tipo de navegador, páginas visitadas y tiempos de carga) con fines estadísticos."
          ]
        },
        {
          title: "4. Publicidad y Cookies de Terceros (Google AdSense)",
          content: [
            "Google utiliza cookies para mostrar anuncios basados en visitas anteriores. Puede desactivar la personalización de anuncios en la Configuración de Anuncios de Google (https://adssettings.google.com)."
          ]
        },
        {
          title: "5. Contacto sobre Privacidad",
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
      copyright: "© 2026 QK Tool Hub (qktoolhub.com). Todos los derechos reservados.",
      tagline: "Herramientas web online gratuitas con privacidad garantizada en el cliente",
      close: "Cerrar",
      contactLabel: "Contacto"
    }
  }
};
