import fs from 'node:fs';
import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';
const {pagePaths,languages,canonicalUrl,pageMeta}=loadSource('src/seo/catalog.ts');
const {pdfHomeMenu}=loadSource('src/i18n/pdfHomeMenu.ts');
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
assert.ok(!fs.existsSync('dist/index.html'), 'Root file must not shadow localized home rewrites');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,pagePaths.length*languages.length);
for(const lang of languages) {
 const html=fs.readFileSync(`dist/home/${lang}.html`,'utf8');
 const menu=pdfHomeMenu[lang];
 const links=[...html.matchAll(/<a[^>]*href="(\/[^"#]*)"/g)].map(match=>new URL(match[1],'https://www.qktoolhub.com').pathname);
 for(const item of [...menu.featured,...menu.shortcuts]) {
  assert.equal(links.filter(path=>path===item.path).length,1,`${lang} ${item.path} homepage link`);
  assert.ok(html.includes(item.title),`${lang} ${item.path} localized label`);
  assert.ok(html.includes(item.description),`${lang} ${item.path} localized explanation`);
 }
 assert.ok(!links.includes('/pdf-converter'),`${lang} legacy converter removed from homepage menu`);
 const description=pageMeta('/',lang).description;
 assert.ok(html.includes(`name="description" content="${description}"`),`${lang} homepage metadata`);
 assert.ok(html.includes(`name="twitter:description" content="${description}"`),`${lang} homepage Twitter metadata`);
 assert.ok(html.includes(`property="og:description" content="${description}"`),`${lang} homepage Open Graph metadata`);
 const graph=JSON.parse([...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)][0][1])['@graph'];
 assert.ok(graph.some(node=>node['@type']==='WebPage'&&node.description===description),`${lang} homepage JSON-LD`);
}
assert.ok(sitemap.includes('<loc>https://www.qktoolhub.com/pdf-converter</loc>'),'Indexed legacy URL retained in sitemap');
assert.ok(!sitemap.includes('lang=ko')); assert.ok(!sitemap.includes('https://qktoolhub.com'));
assert.ok(fs.readFileSync('dist/404.html','utf8').includes('noindex'));
const config=JSON.parse(fs.readFileSync('vercel.json'));
assert.ok(!config.rewrites.some(r=>r.source==='/(.*)'));
const png=fs.readFileSync('dist/og-image.png'); assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
for(const path of pagePaths) for(const lang of languages) {
 const dest=`${path==='/'?'/home':path}/${lang}.html`;
 assert.ok(config.rewrites.some(r=>r.source===path&&r.destination===dest&&r.has?.some(h=>h.key==='lang'&&h.value===lang)),`${path} ${lang} rewrite`);
}
console.log(`PASS: ${pagePaths.length*languages.length} pages, metadata, canonicals, language alternates, schemas, crawlable links, sitemap, 404 config and share image.`);
