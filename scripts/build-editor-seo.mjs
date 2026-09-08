import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const compiled = new Map();
function loadLocal(filename) {
  if(compiled.has(filename))return compiled.get(filename);
  if(filename.endsWith('.json'))return JSON.parse(fs.readFileSync(filename,'utf8'));
  const module = {exports:{}};compiled.set(filename,module.exports);
  const code = ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  const localRequire = id => {if(!id.startsWith('.'))return require(id);let target=path.resolve(path.dirname(filename),id);if(!path.extname(target))target+='.ts';return loadLocal(target);};
  new Function('require','module','exports',code)(localRequire,module,module.exports);return module.exports;
}
const { ImageEditorGuide } = loadLocal(path.resolve('src/pages/ImageEditorGuide.tsx'));
const dictionaries = JSON.parse(fs.readFileSync('src/i18n/editorMeta.json','utf8'));
const guides = dictionaries;
const base = fs.readFileSync('dist/index.html', 'utf8');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
fs.mkdirSync('dist/image-editor', { recursive: true });
for (const [lang, tr] of Object.entries(dictionaries)) {
  const guide = guides[lang];
  const title = guide.title + " | QK Tool Hub";
  const desc = guide.description;
  const url = 'https://qktoolhub.com/image-editor?lang=' + lang;
  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`).replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  html = html.replace(/<meta\b[^>]*>/g, tag => {
    if (/\b(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(title)}"`);
    if (/\b(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${escape(desc)}"`);
    if (/property="(?:og:url|twitter:url)"/.test(tag)) return tag.replace(/content="[^"]*"/, `content="${url}"`);
    if (/name="keywords"/.test(tag)) return '';
    return tag;
  });
  html = html.replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g, '').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  const alternates = Object.keys(dictionaries).map(l => `<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/image-editor?lang=${l}" />`).join('\n');
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: title, description: desc, url, inLanguage: lang, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `<link rel="canonical" href="${url}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="https://qktoolhub.com/image-editor" />\n<script type="application/ld+json">${schema}</script>\n</head>`);
  html = html.replace('<div id="root"></div>', '<div id="root"><main><h1>'+escape(tr.name)+'</h1><p>'+escape(guide.description)+'</p>'+renderToStaticMarkup(React.createElement(ImageEditorGuide,{language:lang}))+'</main></div>');
  fs.writeFileSync(`dist/image-editor/${lang}.html`, html);
}
console.log('Generated image-editor SEO HTML for five languages.');
