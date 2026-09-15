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
    description: '설치와 회원가입 없이 쓰는 텍스트·이미지·PDF·계산·시간 도구와 문의 방법을 소개합니다.',
    badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '운영 목적', content: ['QK Tool Hub는 반복되는 텍스트 분석, 계산, 이미지 편집, PDF 페이지 작업을 브라우저에서 쉽게 마칠 수 있도록 만든 무료 도구 모음입니다. 글자수 세기, 환율 계산, 단위 변환, 이미지 편집, 픽셀 아트, 세계시계와 달력뿐 아니라 이미지 → PDF, PDF 병합·페이지 추출·정리·PNG 저장 도구를 제공합니다.'] },
      { title: '도구를 만드는 기준', content: ['각 도구는 작업 흐름을 짧고 분명하게 구성하고, 지원 형식·계산 기준·주의점을 해당 화면에서 설명하는 것을 원칙으로 합니다. PDF 도구는 기존 문서의 페이지 작업에 초점을 맞추며 OCR이나 원문 텍스트 수정은 제공하지 않습니다.', '텍스트와 파일을 다루는 기능은 가능한 범위에서 브라우저 안에서 처리하도록 설계합니다. 환율 조회, 사이트 제공, 방문 통계, 광고처럼 외부 서비스가 필요한 경우는 개인정보처리방침에서 별도로 안내합니다.'] },
      { title: '결과 확인과 책임', content: ['환율, 공휴일, 단위 변환 등 외부 데이터나 계산에 의존하는 결과는 참고용입니다. 실제 거래나 중요한 의사결정 전에는 금융회사, 기관 또는 원문 자료의 최종 값을 확인해 주세요.'] },
    ],
    contactTitle: '오류 신고 및 문의',
    contactBody: '오류나 설명 부족을 발견하면 사용한 도구, 브라우저, 재현 방법을 적어 알려주세요. PDF 문제는 작업 종류와 오류 문구를 함께 적어 주시면 도움이 됩니다. 문서 원본을 보내지 않아도 문의할 수 있습니다.',
    contactAction: '이메일로 문의하기',
  },
  en: {
    title: 'About QK Tool Hub', description: 'Explore free text, image, PDF, calculation and time tools and how to contact us, without installation or sign-up.', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: 'Why we run this service', content: ['QK Tool Hub brings free browser tools for text, calculations, images and PDF page tasks together. Use the word counter, currency and unit converters, image editor, pixel art tool, world clock and calendar. PDF tools create a PDF from images, merge PDFs, extract or organize pages, and save a PDF page as PNG.'] },
      { title: 'How we design tools', content: ['We keep each workflow short and explain supported formats, calculation rules, and limitations on the relevant page. PDF tools work with document pages; OCR and editing original text are not available.', 'Text and file tools are designed to process content in the browser where practical. External services used for exchange-rate retrieval, site delivery, analytics, or advertising are described separately in the privacy policy.'] },
      { title: 'Checking results', content: ['Results that depend on external data or calculations, including exchange rates, holidays, and unit conversions, are references. Verify final values with the relevant bank, authority, or source before an important decision.'] },
    ],
    contactTitle: 'Report a problem or contact us', contactBody: 'Tell us which tool, browser and steps caused the issue. For PDF problems, include the task and error message. You can contact us without sending your original document.', contactAction: 'Contact by email',
  },
  ja: {
    title: 'QK Tool Hubについて', description: '登録不要で使えるテキスト・画像・PDF・計算・時間ツールとお問い合わせ方法をご案内します。', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '運営目的', content: ['QK Tool Hubは、文字数、為替・単位換算、画像編集、ドット絵、世界時計、カレンダーを使える無料のブラウザツール集です。画像からのPDF作成に加え、既存PDFの結合、ページ抽出・整理、PDFページのPNG保存にも対応しています。'] },
      { title: '制作方針', content: ['操作を短く分かりやすくし、対応形式、計算基準、注意点を各ページで説明します。PDFツールはページ操作を対象とし、OCRや元の文章の編集はできません。', 'テキストやファイルは可能な範囲でブラウザ内処理とし、為替取得、サイト配信、アクセス解析、広告などの外部サービスはプライバシーポリシーで別途案内します。'] },
      { title: '結果の確認', content: ['為替、祝日、単位換算など外部データや計算に依存する結果は参考値です。重要な判断の前に銀行、機関、原資料の最終値をご確認ください。'] },
    ], contactTitle: '不具合報告・お問い合わせ', contactBody: '利用したツール、ブラウザ、再現手順をお知らせください。PDFの問題は作業内容とエラー表示も添えてください。元の文書を送らずにお問い合わせできます。', contactAction: 'メールで問い合わせる',
  },
  zh: {
    title: '关于 QK Tool Hub', description: '了解无需注册的文本、图片、PDF、计算与时间工具及联系方法。', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: '运营目的', content: ['QK Tool Hub 汇集免费的浏览器工具：字数统计、汇率与单位换算、图像编辑、像素画、世界时钟和日历。PDF功能包括从图片创建PDF，以及合并现有PDF、提取或整理页面、将页面保存为PNG。'] },
      { title: '工具设计原则', content: ['我们尽量缩短操作流程，并在相应页面说明支持格式、计算标准和注意事项。PDF工具处理页面，不提供OCR或修改原文。', '文本与文件工具会尽可能在浏览器内处理。汇率查询、网站交付、访问统计和广告所需的外部服务会在隐私政策中另行说明。'] },
      { title: '结果核对', content: ['汇率、节假日和单位换算等依赖外部数据或计算的结果仅供参考。重要决定前请向银行、主管机构或原始资料核对最终数值。'] },
    ], contactTitle: '问题反馈与联系', contactBody: '请告知所用工具、浏览器及复现步骤。PDF问题请附上操作类型和错误提示；无需发送原始文档。', contactAction: '发送邮件',
  },
  es: {
    title: 'Acerca de QK Tool Hub', description: 'Conoce las herramientas gratuitas de texto, imagen, PDF, cálculo y tiempo y cómo contactarnos.', badge: 'ABOUT QK TOOL HUB',
    sections: [
      { title: 'Objetivo del servicio', content: ['QK Tool Hub reúne herramientas gratuitas de navegador: contador de palabras, conversores de divisas y unidades, editor de imágenes, arte píxel, reloj mundial y calendario. Puedes crear un PDF con imágenes, unir PDF existentes, extraer u organizar páginas y guardar una página como PNG.'] },
      { title: 'Cómo diseñamos las herramientas', content: ['Mantenemos cada flujo breve y explicamos los formatos admitidos, criterios de cálculo y límites en la página correspondiente. Las herramientas PDF trabajan con páginas; no ofrecen OCR ni edición del texto original.', 'Las herramientas de texto y archivos procesan el contenido en el navegador cuando es viable. Los servicios externos para tipos de cambio, entrega del sitio, analítica o publicidad se explican en la política de privacidad.'] },
      { title: 'Comprobación de resultados', content: ['Los resultados que dependen de datos externos o cálculos, como divisas, festivos y unidades, son orientativos. Confirma el valor final con el banco, organismo o fuente correspondiente antes de una decisión importante.'] },
    ], contactTitle: 'Informar de un problema o contactar', contactBody: 'Indica la herramienta, el navegador y los pasos para reproducir el problema. Para PDF, incluye la tarea y el mensaje de error. Puedes escribirnos sin enviar el documento original.', contactAction: 'Contactar por correo',
  },
};
