import fs from 'node:fs';
const raw = fs.readFileSync('src/i18n/pixelTranslations.ts', 'utf8');
const dictionaries = JSON.parse(raw.slice(raw.indexOf('=') + 1).trim().replace(/;$/, ''));
const base = fs.readFileSync('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
fs.mkdirSync('dist/pixel-art', { recursive: true });
for (const [lang, tr] of Object.entries(dictionaries)) {
  const title = tr['사진 픽셀 아트 변환'] + ' | QK Tool Hub';
  const desc = tr['사진을 넣고 픽셀과 색상을 조절해 나만의 레트로 이미지를 만들어 보세요.'] + ' ' + tr['사진은 이 브라우저에서만 처리되며 서버에 업로드되지 않습니다.'];
  const url = 'https://qktoolhub.com/pixel-art?lang=' + lang;
  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  html = html.replace(/<meta\b[^>]*>/g, tag => {
    if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
    if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(desc)}"`);
    if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
    return tag;
  });
  html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const alternates = Object.keys(dictionaries).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/pixel-art?lang=${l}" />`).join('\n');
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description: desc, url, inLanguage: lang, applicationCategory: 'MultimediaApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/pixel-art" />\n<script type="application/ld+json">${schema}</script>\n</head>`);
  fs.writeFileSync(`dist/pixel-art/${lang}.html`, html);
}
console.log('Generated pixel-art SEO HTML for five languages.');
