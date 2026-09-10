import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { loadSource } from './load-source.mjs';
const { origin, pagePaths, languages, pageMeta, pageSchema, canonicalUrl, localUrl } = loadSource('src/seo/catalog.ts');
const { SeoSections } = loadSource('src/seo/SeoSections.tsx');
const { ImageEditorGuide } = loadSource('src/pages/ImageEditorGuide.tsx');
const { pdfGuide } = loadSource('src/i18n/pdfGuide.ts');
const { worldGuide } = loadSource('src/i18n/worldGuide.ts');
const { calendarGuide } = loadSource('src/i18n/calendarGuide.ts');
const { legalText } = loadSource('src/i18n/legalText.ts');
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const base = fs.readFileSync('dist/index.html','utf8');
const head = base.slice(0,base.indexOf('</head>')).replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link\b[^>]*(?:rel="canonical"|hreflang=)[^>]*>/g,'').replace(/<meta\b[^>]*>/g,tag => /(?:name|property)="(?:title|description|keywords|robots|og:[^"]*|twitter:[^"]*)"/.test(tag) ? '' : tag);
const entries=[];
for (const path of pagePaths) for (const lang of languages) {
  const meta=pageMeta(path,lang), legal=legalText[lang];
  const alternate=languages.map(l=>`<link rel="alternate" hreflang="${l}" href="${escape(canonicalUrl(path,l))}">`).join('\n')+`\n<link rel="alternate" hreflang="x-default" href="${escape(canonicalUrl(path,'ko'))}">`;
  const tags={title:meta.title,description:meta.description,robots:'index, follow, max-image-preview:large','twitter:card':'summary_large_image','twitter:title':meta.title,'twitter:description':meta.description,'twitter:url':meta.url,'twitter:image':origin+'/og-image.png','twitter:image:alt':'QK Tool Hub'};
  const og={'og:type':'website','og:site_name':'QK Tool Hub','og:title':meta.title,'og:description':meta.description,'og:url':meta.url,'og:image':origin+'/og-image.png','og:image:width':'1200','og:image:height':'630','og:image:alt':'QK Tool Hub','og:locale':{ko:'ko_KR',en:'en_US',ja:'ja_JP',zh:'zh_CN',es:'es_ES'}[lang]};
  let guide='';
  if(path==='/image-editor') guide=renderToStaticMarkup(React.createElement(ImageEditorGuide,{language:lang}));
  if(path==='/world-clock'||path==='/calendar') guide=(path==='/world-clock'?worldGuide:calendarGuide)[lang].sections.map(s=>`<section><h2>${escape(s.title)}</h2><p>${escape(s.body)}</p></section>`).join('');
  if(path==='/pdf-converter') { const g=pdfGuide[lang];guide=[[g.imageHeading,g.imageSteps],[g.pdfHeading,g.pdfSteps]].map(([h,steps])=>`<section><h2>${escape(h)}</h2><ol>${steps.map(s=>`<li>${escape(s)}</li>`).join('')}</ol></section>`).join('')+`<section><h2>${escape(g.faqHeading)}</h2>${g.faqs.map(f=>`<details><summary>${escape(f.q)}</summary><p>${escape(f.a)}</p></details>`).join('')}</section>`; }
  if(path==='/terms'||path==='/privacy') {const doc=legal[path.slice(1)];guide=`<p>${escape(doc.effectiveDate)}</p>`+doc.sections.map(s=>`<section><h2>${escape(s.title)}</h2>${s.content.map(p=>`<p>${escape(p)}</p>`).join('')}</section>`).join('')+`<a href="mailto:${escape(doc.contactEmail)}">${escape(doc.contactEmail)}</a>`;}
  const body=`<div id="root"><main class="app-container seo-static"><nav aria-label="Breadcrumb"><a href="${localUrl('/',lang)}">QK Tool Hub</a>${path==='/'?'':`<span aria-current="page"> / ${escape(meta.name)}</span>`}</nav><h1>${escape(meta.name)}</h1><p>${escape(meta.description)}</p>${guide}${renderToStaticMarkup(React.createElement(SeoSections,{path,language:lang}))}<footer class="app-footer"><a href="${localUrl('/terms',lang)}">${escape(legal.footer.termsLink)}</a> · <a href="${localUrl('/privacy',lang)}">${escape(legal.footer.privacyLink)}</a></footer></main></div>`;
  const html=head.replace(/<html lang="[^"]*"/,`<html lang="${lang}"`)+`<title>${escape(meta.title)}</title>`+Object.entries(tags).map(([name,value])=>`<meta name="${name}" content="${escape(value)}">`).join('\n')+Object.entries(og).map(([name,value])=>`<meta property="${name}" content="${escape(value)}">`).join('\n')+`<link rel="canonical" href="${escape(meta.url)}">${alternate}<script id="page-schema" type="application/ld+json">${JSON.stringify(pageSchema(path,lang)).replaceAll('<','\\u003c')}</script></head><body>${body}</body></html>`;
  const dir=`dist/${path==='/'?'home':path.slice(1)}`;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/${lang}.html`,html);

  entries.push(`  <url><loc>${escape(meta.url)}</loc>${languages.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${escape(canonicalUrl(path,l))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${escape(canonicalUrl(path,'ko'))}"/></url>`);
}
// Omit lastmod until per-page content dates can be supplied reliably.
fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('dist/404.html',`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>페이지를 찾을 수 없습니다 | QK Tool Hub</title><style>body{font:18px system-ui;max-width:700px;margin:12vh auto;padding:24px;line-height:1.8}a{color:#4f46e5}</style></head><body><main><h1>404 · 페이지를 찾을 수 없습니다</h1><p>Page not found. 주소를 확인하거나 필요한 도구를 선택하세요.</p><p><a href="/">QK Tool Hub</a> · <a href="/word-counter">글자수 세기</a> · <a href="/image-editor">이미지 편집기</a></p></main></body></html>`);
console.log(`SEO: ${entries.length} canonical URLs with initial content, metadata, schema and links.`);

// Let Vercel route every homepage query to its localized HTML before filesystem lookup.
fs.unlinkSync('dist/index.html');
