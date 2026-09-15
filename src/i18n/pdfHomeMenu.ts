import type { Language } from './translations';
import type { PdfPath } from './pdfWork';

type MenuItem = { title: string; description: string; path: PdfPath };
type HomeMenu = { category: string; imageCategory: string; shortcutsHeading: string; featured: [MenuItem, MenuItem]; shortcuts: [MenuItem, MenuItem, MenuItem, MenuItem] };
export const pdfHomeMenu: Record<Language, HomeMenu> = {
  ko: {
    category: 'PDF 도구', imageCategory: '이미지 → PDF', shortcutsHeading: 'PDF 작업 바로가기',
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
