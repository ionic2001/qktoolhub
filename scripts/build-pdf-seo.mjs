import fs from 'node:fs';
const raw = fs.readFileSync('src/i18n/pdfGuide.ts', 'utf8');
const guides = JSON.parse(raw.slice(raw.indexOf('=') + 1).trim().replace(/;$/, ''));
const base = fs.readFileSync('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
fs.mkdirSync('dist/pdf-converter', { recursive: true });
for (const [lang, guide] of Object.entries(guides)) {
  const title = `${guide.title} | QK Tool Hub`, description = guide.description;
  const url = `https://qktoolhub.com/pdf-converter?lang=${lang}`;
  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  html = html.replace(/<meta\b[^>]*>/g, tag => {
    if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
    if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(description)}"`);
    if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
    if (/name="keywords"/.test(tag)) return '';
    return tag;
  });
  html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const alternates = Object.keys(guides).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/pdf-converter?lang=${l}" />`).join('\n');
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', name: title, description, url, inLanguage: lang, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@type': 'FAQPage', inLanguage: lang, mainEntity: guide.faqs.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
  ] };
  html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/pdf-converter" />\n<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>\n</head>`);
  const steps = (title, items) => `<section><h2>${escape(title)}</h2><ol>${items.map(s => `<li>${escape(s)}</li>`).join('')}</ol></section>`;
  const content = `<main><h1>${escape(guide.title)}</h1><p>${escape(description)}</p>${steps(guide.imageHeading, guide.imageSteps)}${steps(guide.pdfHeading, guide.pdfSteps)}<section><h2>${escape(guide.faqHeading)}</h2>${guide.faqs.map(item => `<details><summary>${escape(item.q)}</summary><p>${escape(item.a)}</p></details>`).join('')}</section></main>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  fs.writeFileSync(`dist/pdf-converter/${lang}.html`, html);
}
console.log('Generated PDF converter metadata and visible guides for five languages.');
