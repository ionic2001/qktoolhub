import type { Language } from './translations';
import type { PdfPath } from './pdfWork';

type MenuItem = { title: string; description: string; path: PdfPath };
type HomeMenu = { category: string; imageCategory: string; shortcutsHeading: string; guideTitle: string; guide: [string, string, string]; featured: [MenuItem, MenuItem]; shortcuts: [MenuItem, MenuItem, MenuItem, MenuItem] };
export const pdfHomeMenu: Record<Language, HomeMenu> = {
  ko: {
    category: 'PDF 도구', imageCategory: '이미지 → PDF', shortcutsHeading: 'PDF 작업 바로가기',
    guideTitle: '무료 PDF 도구로 할 수 있는 작업', guide: [
      '사진이나 이미지로 새 PDF를 만들 때는 JPG·PNG·WebP 파일을 원하는 순서로 배치하고 용지 크기와 여백을 선택할 수 있습니다. 기존 PDF 작업은 별도의 PDF 도구에서 진행합니다.',
      '기존 PDF 여러 개를 한 파일로 병합하거나 선택한 페이지를 새 PDF 한 파일로 추출할 수 있습니다. 페이지 정리에서는 순서 변경·회전·삭제·빈 페이지 추가를 지원하며, PDF 페이지를 PNG 이미지로 저장할 수도 있습니다.',
      '파일 내용은 브라우저에서 처리합니다. 암호가 걸린 PDF, OCR, 원본 문장 수정은 지원하지 않습니다. 병합·추출·정리 결과에서 서명·양식·북마크가 유지되지 않을 수 있으므로 중요한 문서는 저장 후 확인하세요.',
    ],
    featured: [
      { title: '이미지를 PDF로 만들기', description: 'JPG·PNG·WebP 이미지를 순서대로 배치하고 용지·여백을 설정해 PDF 한 파일로 저장합니다.', path: '/image-to-pdf' },
      { title: 'PDF 병합·페이지 관리', description: '기존 PDF를 병합하거나 필요한 페이지를 추출하고 순서·회전·삭제를 변경합니다. PDF 페이지를 PNG로 저장하는 도구도 선택할 수 있습니다.', path: '/pdf-tools' },
    ],
    shortcuts: [
      { title: 'PDF 병합', description: '여러 PDF를 원하는 순서로 한 파일에 합칩니다.', path: '/pdf-merge' },
      { title: 'PDF 페이지 추출', description: '1-3,5처럼 선택한 페이지를 새 PDF 한 파일로 저장합니다.', path: '/pdf-split' },
      { title: 'PDF 페이지 정리', description: '페이지 순서를 바꾸고 회전·삭제하거나 빈 페이지를 추가합니다.', path: '/pdf-organize' },
      { title: 'PDF 페이지를 PNG로', description: '선택한 PDF 페이지를 미리보고 PNG 이미지로 저장합니다.', path: '/pdf-to-png' },
    ],
  },
  en: {
    category: 'PDF tools', imageCategory: 'Images → PDF', shortcutsHeading: 'PDF task shortcuts',
    guideTitle: 'What you can do with free PDF tools', guide: [
      'To create a new PDF from images, arrange JPG, PNG or WebP files, then choose page size and margins. Use the separate PDF tools to work with existing PDFs.',
      'Merge multiple PDFs into one file or extract selected pages into one new PDF. You can reorder, rotate or remove pages, add a blank page, and save a selected PDF page as a PNG image.',
      'File content is processed in your browser. Password-protected PDFs, OCR and editing original text are not supported. Signatures, forms or bookmarks may not survive page operations, so check important output after downloading.',
    ],
    featured: [
      { title: 'Create a PDF from images', description: 'Arrange JPG, PNG or WebP images, choose page size and margins, and save them as one PDF.', path: '/image-to-pdf' },
      { title: 'Merge and manage PDF pages', description: 'Merge existing PDFs, extract selected pages, or reorder, rotate and delete pages. You can also choose a PDF-to-PNG tool.', path: '/pdf-tools' },
    ],
    shortcuts: [
      { title: 'Merge PDFs', description: 'Combine multiple PDFs in your chosen order into one file.', path: '/pdf-merge' },
      { title: 'Extract PDF pages', description: 'Save pages such as 1-3,5 together in one new PDF.', path: '/pdf-split' },
      { title: 'Organize PDF pages', description: 'Reorder, rotate or delete pages and add a blank page.', path: '/pdf-organize' },
      { title: 'PDF page to PNG', description: 'Preview and save the selected PDF page as a PNG image.', path: '/pdf-to-png' },
    ],
  },
  ja: {
    category: 'PDFツール', imageCategory: '画像 → PDF', shortcutsHeading: 'PDF作業へのショートカット',
    guideTitle: '無料PDFツールでできること', guide: [
      '画像から新しいPDFを作る場合、JPG・PNG・WebPを並べて用紙サイズと余白を選べます。既存のPDFの操作は別のPDFツールで行います。',
      '複数のPDFを一つに結合したり、選んだページを一つの新しいPDFとして抽出したりできます。ページの並べ替え・回転・削除・空白ページの追加、選択ページのPNG保存にも対応しています。',
      'ファイルの内容はブラウザ内で処理します。パスワード付きPDF、OCR、元の文章の編集には対応していません。ページ操作で署名・フォーム・しおりが保持されない場合があるため、重要な出力は保存後に確認してください。',
    ],
    featured: [
      { title: '画像からPDFを作成', description: 'JPG・PNG・WebP画像を並べ、用紙と余白を設定して一つのPDFに保存します。', path: '/image-to-pdf' },
      { title: 'PDFの結合・ページ管理', description: '既存のPDFを結合し、必要なページを抽出、並べ替え・回転・削除します。PDFからPNGへの保存も選べます。', path: '/pdf-tools' },
    ],
    shortcuts: [
      { title: 'PDFを結合', description: '複数のPDFを指定した順序で一つにまとめます。', path: '/pdf-merge' },
      { title: 'PDFページを抽出', description: '1-3,5などのページを一つの新しいPDFに保存します。', path: '/pdf-split' },
      { title: 'PDFページを整理', description: '並べ替え・回転・削除と空白ページの追加ができます。', path: '/pdf-organize' },
      { title: 'PDFページをPNGに', description: '選んだPDFページを表示してPNG画像に保存します。', path: '/pdf-to-png' },
    ],
  },
  zh: {
    category: 'PDF工具', imageCategory: '图片 → PDF', shortcutsHeading: '快速选择PDF操作',
    guideTitle: '免费PDF工具可以完成哪些操作', guide: [
      '从图片创建新PDF时，可以排列JPG、PNG或WebP文件，并选择纸张尺寸和边距。处理现有PDF请使用独立的PDF工具。',
      '可将多个PDF合并为一个文件，或将选定页面提取到一个新PDF。还可排序、旋转、删除页面、添加空白页，并将选定的PDF页面保存为PNG图片。',
      '文件内容在浏览器中处理。不支持加密PDF、OCR或修改原文。页面操作可能无法保留签名、表单或书签，重要文件下载后请检查。',
    ],
    featured: [
      { title: '用图片创建PDF', description: '排列JPG、PNG或WebP图片，设置纸张和边距后保存为一个PDF。', path: '/image-to-pdf' },
      { title: '合并PDF与管理页面', description: '合并现有PDF、提取所需页面，或调整顺序、旋转和删除页面。也可选择PDF转PNG。', path: '/pdf-tools' },
    ],
    shortcuts: [
      { title: '合并PDF', description: '按所选顺序将多个PDF合为一个文件。', path: '/pdf-merge' },
      { title: '提取PDF页面', description: '将1-3,5等所选页面保存为一个新PDF。', path: '/pdf-split' },
      { title: '整理PDF页面', description: '排序、旋转、删除页面或添加空白页。', path: '/pdf-organize' },
      { title: 'PDF页面转PNG', description: '预览并将选定PDF页面保存为PNG图片。', path: '/pdf-to-png' },
    ],
  },
  es: {
    category: 'Herramientas PDF', imageCategory: 'Imágenes → PDF', shortcutsHeading: 'Accesos directos para PDF',
    guideTitle: 'Qué puedes hacer con las herramientas PDF gratuitas', guide: [
      'Para crear un PDF nuevo con imágenes, ordena archivos JPG, PNG o WebP y elige el tamaño del papel y los márgenes. Para trabajar con PDF existentes, usa las herramientas PDF independientes.',
      'Puedes unir varios PDF en un archivo o extraer las páginas elegidas en un PDF nuevo. También puedes ordenar, girar o borrar páginas, añadir una página en blanco y guardar una página PDF elegida como PNG.',
      'El contenido de los archivos se procesa en el navegador. No se admiten PDF protegidos con contraseña, OCR ni edición del texto original. Las firmas, formularios o marcadores pueden perderse al manipular páginas; revisa los documentos importantes tras descargarlos.',
    ],
    featured: [
      { title: 'Crear PDF con imágenes', description: 'Ordena imágenes JPG, PNG o WebP, ajusta el papel y los márgenes y guárdalas en un solo PDF.', path: '/image-to-pdf' },
      { title: 'Unir PDF y gestionar páginas', description: 'Une PDF existentes, extrae páginas elegidas o cambia su orden, giro y eliminación. También puedes elegir PDF a PNG.', path: '/pdf-tools' },
    ],
    shortcuts: [
      { title: 'Unir PDF', description: 'Combina varios PDF en el orden elegido en un solo archivo.', path: '/pdf-merge' },
      { title: 'Extraer páginas PDF', description: 'Guarda páginas como 1-3,5 juntas en un PDF nuevo.', path: '/pdf-split' },
      { title: 'Organizar páginas PDF', description: 'Ordena, gira o borra páginas y añade una página en blanco.', path: '/pdf-organize' },
      { title: 'Página PDF a PNG', description: 'Previsualiza y guarda la página PDF elegida como PNG.', path: '/pdf-to-png' },
    ],
  },
};
