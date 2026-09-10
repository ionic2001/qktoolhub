import type { Language } from './translations';

export interface AboutCopy {
  title: string;
  description: string;
  badge: string;
  sections: { title: string; content: string[] }[];
  contactTitle: string;
  contactBody: string;
  contactAction: string;
}

export const aboutText: Record<Language, AboutCopy> = {
  ko: {
    title: 'QK Tool Hub 소개',
    description: '설치와 회원가입 없이 바로 사용할 수 있는 생활·업무용 브라우저 도구 모음입니다.',
    badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '운영 목적', content: ['반복되는 계산, 문서 변환, 이미지 편집 작업을 한곳에서 빠르게 끝낼 수 있도록 QK Tool Hub를 운영합니다. 현재 글자수 세기, 환율 계산기, 픽셀 아트 변환, PDF 변환, 세계시계, 달력, 이미지 편집기, 단위 변환기 등 8개 도구를 제공합니다.'] },
      { title: '도구를 만드는 기준', content: ['각 도구는 작업 흐름을 짧고 분명하게 구성하고, 지원 형식·계산 기준·주의점을 해당 화면에서 설명하는 것을 원칙으로 합니다.', '텍스트와 파일을 다루는 기능은 가능한 범위에서 브라우저 안에서 처리하도록 설계합니다. 환율 조회, 사이트 제공, 방문 통계, 광고처럼 외부 서비스가 필요한 경우는 개인정보처리방침에서 별도로 안내합니다.'] },
      { title: '결과 확인과 책임', content: ['환율, 공휴일, 단위 변환 등 외부 데이터나 계산에 의존하는 결과는 참고용입니다. 실제 거래나 중요한 의사결정 전에는 금융회사, 기관 또는 원문 자료의 최종 값을 확인해 주세요.'] },
    ],
    contactTitle: '오류 신고 및 문의',
    contactBody: '잘못된 계산, 작동하지 않는 기능, 설명이 부족한 부분을 발견하면 사용한 도구와 재현 방법을 적어 알려주세요.',
    contactAction: '이메일로 문의하기',
  },
  en: {
    title: 'About QK Tool Hub', description: 'A collection of browser tools for everyday and work tasks, available without installation or sign-up.', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: 'Why we run this service', content: ['QK Tool Hub helps people finish repetitive calculations, document conversions, and image tasks in one place. Eight tools are currently available: word counter, currency converter, pixel art converter, PDF converter, world clock, calendar, image editor, and unit converter.'] },
      { title: 'How we design tools', content: ['We keep each workflow short and explain supported formats, calculation rules, and limitations on the relevant page.', 'Text and file tools are designed to process content in the browser where practical. External services used for exchange-rate retrieval, site delivery, analytics, or advertising are described separately in the privacy policy.'] },
      { title: 'Checking results', content: ['Results that depend on external data or calculations, including exchange rates, holidays, and unit conversions, are references. Verify final values with the relevant bank, authority, or source before an important decision.'] },
    ],
    contactTitle: 'Report a problem or contact us', contactBody: 'If a calculation looks wrong, a feature fails, or an explanation is unclear, tell us which tool you used and how to reproduce the issue.', contactAction: 'Contact by email',
  },
  ja: {
    title: 'QK Tool Hubについて', description: 'インストールや会員登録なしですぐに使える、日常・業務向けブラウザツール集です。', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '運営目的', content: ['計算、文書変換、画像編集などの繰り返し作業を一か所で素早く終えられるよう運営しています。現在、文字数、為替、ピクセルアート、PDF、世界時計、カレンダー、画像編集、単位変換の8ツールを提供しています。'] },
      { title: '制作方針', content: ['操作を短く分かりやすくし、対応形式、計算基準、注意点を各ページで説明します。', 'テキストやファイルは可能な範囲でブラウザ内処理とし、為替取得、サイト配信、アクセス解析、広告などの外部サービスはプライバシーポリシーで別途案内します。'] },
      { title: '結果の確認', content: ['為替、祝日、単位換算など外部データや計算に依存する結果は参考値です。重要な判断の前に銀行、機関、原資料の最終値をご確認ください。'] },
    ], contactTitle: '不具合報告・お問い合わせ', contactBody: '計算の誤り、動作しない機能、分かりにくい説明があれば、利用したツールと再現手順をお知らせください。', contactAction: 'メールで問い合わせる',
  },
  zh: {
    title: '关于 QK Tool Hub', description: '无需安装或注册即可使用的日常与办公浏览器工具集合。', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '运营目的', content: ['QK Tool Hub 帮助用户在一个地方快速完成重复计算、文档转换和图像处理。目前提供字数统计、汇率换算、像素画、PDF转换、世界时钟、日历、图像编辑和单位换算共8种工具。'] },
      { title: '工具设计原则', content: ['我们尽量缩短操作流程，并在相应页面说明支持格式、计算标准和注意事项。', '文本与文件工具会尽可能在浏览器内处理。汇率查询、网站交付、访问统计和广告所需的外部服务会在隐私政策中另行说明。'] },
      { title: '结果核对', content: ['汇率、节假日和单位换算等依赖外部数据或计算的结果仅供参考。重要决定前请向银行、主管机构或原始资料核对最终数值。'] },
    ], contactTitle: '问题反馈与联系', contactBody: '如果发现计算错误、功能失效或说明不清，请告知所用工具和复现步骤。', contactAction: '发送邮件',
  },
  es: {
    title: 'Acerca de QK Tool Hub', description: 'Una colección de herramientas para tareas cotidianas y de trabajo, sin instalación ni registro.', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: 'Objetivo del servicio', content: ['QK Tool Hub permite completar cálculos repetitivos, conversiones de documentos y tareas de imagen en un solo lugar. Actualmente ofrece ocho herramientas: contador de palabras, conversor de divisas, arte píxel, conversor PDF, reloj mundial, calendario, editor de imágenes y conversor de unidades.'] },
      { title: 'Cómo diseñamos las herramientas', content: ['Mantenemos cada flujo breve y explicamos los formatos admitidos, criterios de cálculo y límites en la página correspondiente.', 'Las herramientas de texto y archivos procesan el contenido en el navegador cuando es viable. Los servicios externos para tipos de cambio, entrega del sitio, analítica o publicidad se explican en la política de privacidad.'] },
      { title: 'Comprobación de resultados', content: ['Los resultados que dependen de datos externos o cálculos, como divisas, festivos y unidades, son orientativos. Confirma el valor final con el banco, organismo o fuente correspondiente antes de una decisión importante.'] },
    ], contactTitle: 'Informar de un problema o contactar', contactBody: 'Si un cálculo parece incorrecto, una función falla o una explicación no está clara, indica la herramienta y los pasos para reproducirlo.', contactAction: 'Contactar por correo',
  },
};
