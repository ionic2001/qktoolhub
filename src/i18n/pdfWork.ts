import type { Language } from './translations';

export const pdfPaths = ['/image-to-pdf', '/pdf-tools', '/pdf-merge', '/pdf-split', '/pdf-organize', '/pdf-to-png'] as const;
export type PdfPath = typeof pdfPaths[number];
type Copy = { name: string; description: string; how: string; note: string };
export const pdfWork: Record<Language, Record<PdfPath, Copy>> = {
  ko: {
    '/image-to-pdf': { name: '이미지 PDF 변환기 · JPG·PNG를 PDF로', description: 'JPG·PNG·WebP 이미지를 원하는 순서로 배치하고 용지 크기와 여백을 설정해 하나의 PDF로 저장하세요. 파일은 브라우저에서 처리됩니다.', how: '이미지를 추가하고 순서·용지·여백을 설정한 뒤 PDF를 생성해 다운로드하세요.', note: '파일당 20MB, 최대 20장·총 100MB입니다. 큰 이미지는 긴 변 2,400px로 축소됩니다.' },
    '/pdf-tools': { name: '무료 PDF 도구 · 병합·분리·페이지 정리', description: 'PDF 병합, 페이지 분리·추출, 순서 변경·회전·삭제, PDF 페이지 PNG 저장 도구를 선택하세요. 파일은 브라우저에서 처리됩니다.', how: '필요한 작업을 선택하고 PDF 파일을 추가한 뒤 결과를 다운로드하세요.', note: '암호화된 PDF와 서명·양식·책갈피 보존은 지원하지 않습니다.' },
    '/pdf-merge': { name: 'PDF 병합 · 여러 파일을 하나로', description: '여러 PDF를 원하는 파일 순서로 합쳐 하나의 PDF로 저장하세요. 페이지 수를 확인하고 브라우저에서 처리한 결과를 다운로드할 수 있습니다.', how: 'PDF 파일 2개 이상을 추가하고 파일 순서를 조정한 뒤 병합하세요.', note: '최대 10파일, 파일당 50MB·총 100MB, 결과 300페이지입니다. 서명·양식·책갈피 보존은 보장되지 않습니다.' },
    '/pdf-split': { name: 'PDF 분리·페이지 추출', description: 'PDF에서 1-3,5 같은 페이지 범위를 선택해 필요한 페이지만 새 PDF로 저장하세요. 선택한 페이지의 원본 품질을 유지합니다.', how: 'PDF 한 개를 선택하고 1-3,5처럼 페이지를 입력한 뒤 선택한 페이지를 저장하세요.', note: '파일당 50MB·300페이지입니다. 중복·범위 밖 페이지는 입력할 수 없습니다.' },
    '/pdf-organize': { name: 'PDF 페이지 순서 변경·회전·삭제', description: 'PDF 페이지를 앞뒤로 이동하고 90도 회전하거나 삭제·빈 페이지 추가 후 새 PDF로 저장하세요. 원본 파일은 바뀌지 않습니다.', how: 'PDF를 선택하고 페이지 목록에서 이동·회전·삭제·빈 페이지 추가를 선택한 뒤 저장하세요.', note: '파일당 50MB·300페이지입니다. 모든 페이지를 삭제할 수 없습니다. 서명·양식·책갈피 보존은 보장되지 않습니다.' },
    '/pdf-to-png': { name: 'PDF PNG 변환 · 페이지별 이미지 저장', description: 'PDF 파일에서 원하는 페이지를 선택하고 72·144·216 DPI로 렌더링해 PNG 이미지를 저장하세요. 브라우저에서 처리됩니다.', how: 'PDF를 선택하고 페이지·출력 해상도를 정한 뒤 미리보기와 PNG를 다운로드하세요.', note: '최대 50MB·300페이지, PNG 출력은 600만 픽셀 이내입니다. 암호화 PDF는 지원하지 않습니다.' },
  },
  en: {
    '/image-to-pdf': { name: 'Images to PDF Converter · JPG & PNG to PDF', description: 'Arrange JPG, PNG or WebP images, choose page size and margins, then download one PDF. Files are processed in your browser.', how: 'Add images, set their order and page settings, then create and download a PDF.', note: 'Up to 20 images, 20MB each and 100MB total. Large images are resized to 2,400px.' },
    '/pdf-tools': { name: 'Free PDF Tools · Merge, Split & Organize PDFs', description: 'Choose a tool to merge PDFs, extract pages, reorder or rotate pages, or export a PDF page as PNG. Processing stays in your browser.', how: 'Choose a PDF task, add your file and download the result.', note: 'Encrypted PDFs are unsupported. Signatures, forms and bookmarks may not survive page operations.' },
    '/pdf-merge': { name: 'Merge PDF Files Online', description: 'Merge multiple PDFs in the file order you choose. Check page counts and download one combined file, processed in your browser.', how: 'Add at least two PDFs, arrange their file order and merge them.', note: 'Up to 10 files, 50MB each, 100MB total and 300 output pages. Signatures, forms and bookmarks are not guaranteed.' },
    '/pdf-split': { name: 'Split PDF & Extract Pages', description: 'Select pages with ranges such as 1-3,5 and save them as a new PDF without converting the original pages to images.', how: 'Choose one PDF, enter pages such as 1-3,5, then download the selected pages.', note: 'Up to 50MB and 300 pages. Duplicate and out-of-range pages are rejected.' },
    '/pdf-organize': { name: 'Organize PDF Pages · Reorder, Rotate & Delete', description: 'Move, rotate or delete PDF pages, add a blank page, and save a new document. The original file remains unchanged.', how: 'Choose a PDF, edit the page list, and download the organized document.', note: 'Up to 50MB and 300 pages. You cannot remove every page. Signatures, forms and bookmarks are not guaranteed.' },
    '/pdf-to-png': { name: 'PDF to PNG · Export Individual Pages', description: 'Choose a PDF page and render it at 72, 144 or 216 DPI. Preview and download the page as PNG in your browser.', how: 'Choose a PDF, page and resolution, then preview and download its PNG.', note: 'Up to 50MB and 300 pages; output is capped at 6 megapixels. Encrypted PDFs are unsupported.' },
  },
  ja: {
    '/image-to-pdf': { name: '画像をPDFに変換 · JPG・PNG対応', description: 'JPG・PNG・WebP画像の順序、用紙サイズ、余白を設定してPDFに保存。ファイルはブラウザー内で処理します。', how: '画像を追加して順序と用紙を設定し、PDFを作成して保存します。', note: '1枚20MB、最大20枚・合計100MB。大きい画像は長辺2,400pxに縮小します。' },
    '/pdf-tools': { name: '無料PDFツール · 結合・分割・ページ整理', description: 'PDFの結合、ページの分割・抽出、並べ替え・回転・削除、PNG保存を選べます。ファイルはブラウザー内で処理します。', how: '必要な作業を選んでPDFを追加し、結果を保存します。', note: '暗号化PDFは非対応。署名・フォーム・しおりの保持は保証されません。' },
    '/pdf-merge': { name: 'PDFを結合 · 複数ファイルを一つに', description: '複数のPDFを指定したファイル順に結合し、一つのPDFとして保存。ページ数を確認してブラウザー内で処理します。', how: 'PDFを2件以上追加し、ファイル順を変えて結合します。', note: '最大10件、各50MB・合計100MB、出力300ページ。署名・フォーム・しおりは保証されません。' },
    '/pdf-split': { name: 'PDFを分割・ページを抽出', description: '1-3,5のように範囲を指定して必要なページを新しいPDFに保存します。元ページは画像に変換しません。', how: 'PDFを選び、1-3,5のようにページを入力して保存します。', note: '最大50MB・300ページ。重複や範囲外の指定はできません。' },
    '/pdf-organize': { name: 'PDFページを並べ替え・回転・削除', description: 'PDFページを移動、90度回転、削除し、空白ページを追加して新しいPDFに保存できます。原本は変わりません。', how: 'PDFを選び、ページ一覧を編集して保存します。', note: '最大50MB・300ページ。全ページの削除はできません。署名等の保持は保証されません。' },
    '/pdf-to-png': { name: 'PDFをPNGに変換 · ページ別保存', description: 'PDFのページを選び72・144・216 DPIでPNGに変換。プレビューしてブラウザーから保存します。', how: 'PDF・ページ・解像度を選び、PNGを表示して保存します。', note: '最大50MB・300ページ、出力600万画素まで。暗号化PDFは非対応です。' },
  },
  zh: {
    '/image-to-pdf': { name: '图片转PDF · JPG和PNG转换', description: '排列JPG、PNG或WebP图片，设置纸张和边距后下载PDF。文件仅在浏览器中处理。', how: '添加图片，设置顺序和纸张，然后创建并下载PDF。', note: '单张20MB，最多20张、总计100MB。大图缩至长边2,400像素。' },
    '/pdf-tools': { name: '免费PDF工具 · 合并、拆分和整理', description: '选择合并PDF、提取页面、调整顺序或旋转页面，也可将PDF页面保存为PNG。文件在浏览器中处理。', how: '选择需要的PDF工具，添加文件并下载结果。', note: '不支持加密PDF。不保证保留签名、表单和书签。' },
    '/pdf-merge': { name: '合并PDF · 多个文件合为一个', description: '按选定文件顺序合并多个PDF，检查页数后在浏览器中下载合并文件。', how: '添加至少两个PDF，调整文件顺序后合并。', note: '最多10个文件，单个50MB、总计100MB，结果300页。不保证保留签名和表单。' },
    '/pdf-split': { name: '拆分PDF·提取页面', description: '输入1-3,5等页码范围，将选定页面保存为新PDF，无需把原页面转成图片。', how: '选择一个PDF，输入1-3,5等页码并下载。', note: '最多50MB、300页。不可选择重复或超出范围的页面。' },
    '/pdf-organize': { name: '整理PDF页面·排序、旋转和删除', description: '移动、旋转或删除PDF页面，添加空白页后保存新PDF，原文件不变。', how: '选择PDF，修改页面列表并下载整理后的文件。', note: '最多50MB、300页。不能删除全部页面。不保证保留签名、表单和书签。' },
    '/pdf-to-png': { name: 'PDF转PNG · 逐页保存图片', description: '选择PDF页面，以72、144或216 DPI生成PNG，预览并在浏览器中下载。', how: '选择PDF、页面和分辨率，预览并下载PNG。', note: '最多50MB、300页，输出限制为600万像素。不支持加密PDF。' },
  },
  es: {
    '/image-to-pdf': { name: 'Imágenes a PDF · Convierte JPG y PNG', description: 'Ordena imágenes JPG, PNG o WebP, ajusta papel y márgenes y descarga un PDF. Los archivos se procesan en tu navegador.', how: 'Añade imágenes, ajusta su orden y el papel, crea y descarga el PDF.', note: 'Hasta 20 imágenes, 20MB cada una y 100MB en total. Las grandes se reducen a 2.400px.' },
    '/pdf-tools': { name: 'Herramientas PDF gratis · Unir, dividir y organizar', description: 'Elige entre unir PDF, extraer páginas, ordenarlas, girarlas o exportar una página como PNG. Todo se procesa en tu navegador.', how: 'Elige una tarea PDF, añade el archivo y descarga el resultado.', note: 'No admite PDF cifrados. No se garantiza conservar firmas, formularios o marcadores.' },
    '/pdf-merge': { name: 'Unir archivos PDF en línea', description: 'Une varios PDF en el orden elegido. Revisa las páginas y descarga un solo archivo procesado en tu navegador.', how: 'Añade al menos dos PDF, cambia el orden de archivos y únelos.', note: 'Hasta 10 archivos, 50MB cada uno, 100MB en total y 300 páginas. No se garantizan firmas o formularios.' },
    '/pdf-split': { name: 'Dividir PDF y extraer páginas', description: 'Selecciona páginas con rangos como 1-3,5 y guárdalas en un PDF nuevo sin convertir las páginas originales en imágenes.', how: 'Elige un PDF, escribe páginas como 1-3,5 y descárgalas.', note: 'Hasta 50MB y 300 páginas. No admite páginas duplicadas o fuera de rango.' },
    '/pdf-organize': { name: 'Organizar páginas PDF · Ordenar, girar y borrar', description: 'Mueve, gira o borra páginas PDF, añade una página en blanco y guarda un documento nuevo sin alterar el original.', how: 'Elige un PDF, modifica la lista de páginas y descarga el resultado.', note: 'Hasta 50MB y 300 páginas. No se pueden borrar todas las páginas. No se garantizan firmas o formularios.' },
    '/pdf-to-png': { name: 'PDF a PNG · Exportar páginas individuales', description: 'Elige una página PDF y conviértela a PNG a 72, 144 o 216 DPI. Previsualiza y descárgala en tu navegador.', how: 'Elige PDF, página y resolución; previsualiza y descarga su PNG.', note: 'Hasta 50MB y 300 páginas, máximo 6 megapíxeles. No admite PDF cifrados.' },
  },
};

const labels = {
  choose: ['PDF 선택', 'Choose PDF', 'PDFを選択', '选择PDF', 'Elegir PDF'],
  chooseMany: ['PDF 파일 추가', 'Add PDF files', 'PDFファイルを追加', '添加PDF文件', 'Añadir archivos PDF'],
  merge: ['PDF 병합', 'Merge PDFs', 'PDFを結合', '合并PDF', 'Unir PDF'],
  split: ['페이지 추출', 'Extract pages', 'ページを抽出', '提取页面', 'Extraer páginas'],
  organize: ['정리한 PDF 저장', 'Save organized PDF', '整理したPDFを保存', '保存整理后的PDF', 'Guardar PDF organizado'],
  range: ['페이지 범위 (예: 1-3,5)', 'Page range (e.g. 1-3,5)', 'ページ範囲 (例: 1-3,5)', '页码范围（如1-3,5）', 'Rango de páginas (p. ej. 1-3,5)'],
  blank: ['빈 페이지 추가', 'Add blank page', '空白ページを追加', '添加空白页', 'Añadir página en blanco'],
  rotate: ['90도 회전', 'Rotate 90°', '90度回転', '旋转90°', 'Girar 90°'],
  remove: ['삭제', 'Delete', '削除', '删除', 'Borrar'],
  up: ['앞으로', 'Move earlier', '前へ', '向前', 'Mover antes'],
  down: ['뒤로', 'Move later', '次へ', '向后', 'Mover después'],
  reset: ['변경 초기화', 'Reset changes', '変更を戻す', '重置更改', 'Restablecer cambios'],
  busy: ['처리 중…', 'Processing…', '処理中…', '处理中…', 'Procesando…'],
  error: ['PDF를 읽거나 처리할 수 없습니다. 파일 손상·암호·용량을 확인하세요.', 'Could not read or process the PDF. Check damage, encryption and size.', 'PDFを処理できません。破損・暗号・容量を確認してください。', '无法处理PDF，请检查损坏、加密和大小。', 'No se pudo procesar el PDF. Revisa daños, cifrado y tamaño.'],
  limit: ['파일 또는 페이지 한도를 초과했습니다.', 'File or page limit exceeded.', 'ファイルまたはページの上限を超えました。', '超出文件或页数限制。', 'Se superó el límite de archivos o páginas.'],
  invalid: ['PDF 파일을 확인하세요.', 'Check the PDF file.', 'PDFファイルを確認してください。', '请检查PDF文件。', 'Comprueba el archivo PDF.'],
  duplicate: ['중복된 페이지가 있습니다.', 'A page was selected twice.', '重複したページがあります。', '页面重复。', 'Hay una página duplicada.'],
  page: ['페이지', 'Page', 'ページ', '页', 'Página'],
  files: ['파일 순서', 'File order', 'ファイル順', '文件顺序', 'Orden de archivos'],
  preview: ['선택한 페이지 미리보기', 'Selected page preview', '選択ページのプレビュー', '所选页面预览', 'Vista previa de la página'],
  result: ['결과 파일명', 'Output filename', '出力ファイル名', '结果文件名', 'Nombre del archivo final'],
  ready: ['결과 PDF가 준비되었습니다.', 'Your PDF is ready.', 'PDFの準備ができました。', 'PDF已准备好。', 'El PDF está listo.'],
  download: ['PDF 다운로드', 'Download PDF', 'PDFをダウンロード', '下载PDF', 'Descargar PDF'],
  selected: ['선택한 페이지', 'Selected pages', '選択ページ', '所选页面', 'Páginas elegidas'],
  noPages: ['최소 한 페이지가 필요합니다.', 'At least one page is required.', '最低1ページ必要です。', '至少需要一页。', 'Se requiere al menos una página.'],
} as const;
const languages: Language[] = ['ko', 'en', 'ja', 'zh', 'es'];
export function pdfLabel(lang: Language, key: keyof typeof labels) { return labels[key][languages.indexOf(lang)]; }
