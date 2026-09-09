import fs from 'node:fs';

const guideRaw = fs.readFileSync('src/i18n/calendarGuide.ts', 'utf8');
const textRaw = fs.readFileSync('src/i18n/calendarText.ts', 'utf8');

// Simple TS parser for the guide & text objects
function extractExportedObject(source, varName) {
  const marker = `export const ${varName}`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${varName}`);
  const equals = source.indexOf('=', start);
  const jsonCandidate = source.slice(equals + 1).trim().replace(/;$/, '');
  return (new Function(`return (${jsonCandidate});`))();
}

const guides = extractExportedObject(guideRaw, 'calendarGuide');
const texts = extractExportedObject(textRaw, 'calendarText');
const base = fs.readFileSync('dist/index.html', 'utf8');

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

fs.mkdirSync('dist/calendar', { recursive: true });

for (const [lang, tr] of Object.entries(texts)) {
  const guide = guides[lang] || guides.ko;
  const title = guide.title + " | QK Tool Hub";
  const desc = guide.description;
  const url = 'https://qktoolhub.com/calendar?lang=' + lang;

  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);

  html = html.replace(/<meta\b[^>]*>/g, tag => {
    if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
    if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(desc)}"`);
    if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
    if (/name="keywords"/.test(tag)) return '';
    return tag;
  });

  html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

  const alternates = Object.keys(texts).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/calendar?lang=${l}" />`).join('\n');
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: desc,
    url,
    inLanguage: lang,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [tr.tabCalendar, tr.tabHolidays, tr.tabCalculator, tr.exportIcs, tr.businessDaysTitle]
  }).replaceAll('<', '\\u003c');

  html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/calendar" />\n<script type="application/ld+json">${schema}</script>\n</head>`);

  html = html.replace('<div id="root"></div>', '<div id="root"><main><h1>' + escape(tr.title) + '</h1><p>' + escape(guide.description) + '</p><h2>' + escape(tr.goldenHolidayTitle) + '</h2>' + guide.sections.map(item => '<section><h3>' + escape(item.title) + '</h3><p>' + escape(item.body) + '</p></section>').join('') + '</main></div>');

  fs.writeFileSync(`dist/calendar/${lang}.html`, html);
}

console.log('Generated calendar SEO HTML for five languages.');
