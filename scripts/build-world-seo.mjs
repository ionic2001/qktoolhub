import fs from 'node:fs';
const raw = fs.readFileSync('src/i18n/worldText.ts', 'utf8');
const dictionaries = JSON.parse(raw.slice(raw.indexOf('=') + 1).trim().replace(/;$/, ''));
const guideRaw = fs.readFileSync('src/i18n/worldGuide.ts', 'utf8');
const guides = JSON.parse(guideRaw.slice(guideRaw.indexOf('=')+1).trim().replace(/;$/, ''));
const base = fs.readFileSync('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
fs.mkdirSync('dist/world-clock', { recursive: true });
for (const [lang, tr] of Object.entries(dictionaries)) {
  const guide = guides[lang];
  const title = guide.title + " | QK Tool Hub";
  const desc = guide.description;
  const url = 'https://qktoolhub.com/world-clock?lang=' + lang;
  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  html = html.replace(/<meta\b[^>]*>/g, tag => {
    if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
    if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(desc)}"`);
    if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
    if (/name="keywords"/.test(tag)) return '';
    return tag;
  });
  html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const alternates = Object.keys(dictionaries).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/world-clock?lang=${l}" />`).join('\n');
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description: desc, url, inLanguage: lang, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/world-clock" />\n<script type="application/ld+json">${schema}</script>\n</head>`);
  html = html.replace('<div id="root"></div>', '<div id="root"><main><h1>'+escape(tr.title)+'</h1><p>'+escape(guide.description)+'</p><h2>'+escape(tr.help)+'</h2>'+guide.sections.map(item=>'<section><h3>'+escape(item.title)+'</h3><p>'+escape(item.body)+'</p></section>').join('')+'</main></div>');
  fs.writeFileSync(`dist/world-clock/${lang}.html`, html);
}
console.log('Generated world-clock SEO HTML for five languages.');
