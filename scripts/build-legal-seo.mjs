import fs from 'node:fs';

const legalRaw = fs.readFileSync('src/i18n/legalText.ts', 'utf8');

function extractExportedObject(source, varName) {
  const marker = `export const ${varName}`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${varName}`);
  const equals = source.indexOf('=', start);
  const jsonCandidate = source.slice(equals + 1).trim().replace(/;$/, '');
  return (new Function(`return (${jsonCandidate});`))();
}

const legal = extractExportedObject(legalRaw, 'legalText');
const base = fs.readFileSync('dist/index.html', 'utf8');

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

fs.mkdirSync('dist/terms', { recursive: true });
fs.mkdirSync('dist/privacy', { recursive: true });

for (const type of ['terms', 'privacy']) {
  for (const [lang, docData] of Object.entries(legal)) {
    const doc = docData[type];
    const title = `${doc.title} | QK Tool Hub`;
    const desc = type === 'terms'
      ? `${doc.title} - QK Tool Hub 서비스 이용 조건 및 책임 한계 안내`
      : `${doc.title} - QK Tool Hub 100% 클라이언트 사이드 개인정보 보호 및 쿠키 정책 안내`;
    const url = `https://qktoolhub.com/${type}?lang=${lang}`;

    let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);

    html = html.replace(/<meta\b[^>]*>/g, tag => {
      if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
      if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(desc)}"`);
      if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
      if (/name="keywords"/.test(tag)) return '';
      return tag;
    });

    html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

    const alternates = Object.keys(legal).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/${type}?lang=${l}" />`).join('\n');

    html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/${type}" />\n</head>`);

    const sectionsHtml = doc.sections.map(s => `<section><h2>${escape(s.title)}</h2>${s.content.map(c => `<p>${escape(c)}</p>`).join('')}</section>`).join('');

    html = html.replace('<div id="root"></div>', `<div id="root"><main><h1>${escape(doc.title)}</h1><p>${escape(doc.effectiveDate)}</p>${sectionsHtml}<p>Contact: ${escape(doc.contactEmail)}</p></main></div>`);

    fs.writeFileSync(`dist/${type}/${lang}.html`, html);
  }
}

console.log('Generated terms and privacy SEO HTML for five languages.');
