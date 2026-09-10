import fs from 'node:fs';
import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';
const {pagePaths,languages,canonicalUrl}=loadSource('src/seo/catalog.ts');
for(const path of pagePaths) for(const lang of languages){
 const html=fs.readFileSync(`dist/${path==='/'?'home':path.slice(1)}/${lang}.html`,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${path} ${lang} H1`);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert.ok(html.includes(`rel="canonical" href="${canonicalUrl(path,lang)}"`));
 assert.equal((html.match(/hreflang=/g)||[]).length,6);
 assert.equal((html.match(/name="description"/g)||[]).length,1);
 assert.ok((html.match(/<a /g)||[]).length>=3);
 const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
 assert.equal(schemas.length,1); JSON.parse(schemas[0][1]);
 assert.ok(!html.includes('FinancialProduct'));
 assert.ok(!html.includes('https://qktoolhub.com'));
 for(const match of html.matchAll(/<a[^>]*href="(\/[^"#]*)"/g)) assert.ok(pagePaths.includes(new URL(match[1],'https://www.qktoolhub.com').pathname));
}
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,55);
assert.ok(!sitemap.includes('lang=ko')); assert.ok(!sitemap.includes('https://qktoolhub.com'));
assert.ok(fs.readFileSync('dist/404.html','utf8').includes('noindex'));
const config=JSON.parse(fs.readFileSync('vercel.json'));
assert.ok(!config.rewrites.some(r=>r.source==='/(.*)'));
const png=fs.readFileSync('dist/og-image.png'); assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
console.log('PASS: 55 pages, metadata, canonicals, language alternates, schemas, crawlable links, sitemap, 404 config and share image.');
