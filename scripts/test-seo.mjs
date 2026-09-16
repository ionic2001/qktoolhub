import fs from 'node:fs';
import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';
const {pagePaths,allPagePaths,languages,canonicalUrl,pageMeta}=loadSource('src/seo/catalog.ts');
const {pdfHomeMenu}=loadSource('src/i18n/pdfHomeMenu.ts');
const {guidePaths,guides,guideLinksForTool}=loadSource('src/guides/guideContent.ts');
const {aboutText}=loadSource('src/i18n/aboutText.ts');
const {legalText}=loadSource('src/i18n/legalText.ts');
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
 for(const match of html.matchAll(/<a[^>]*href="(\/[^"#]*)"/g)) assert.ok(allPagePaths.includes(new URL(match[1],'https://www.qktoolhub.com').pathname));
}
assert.ok(!fs.existsSync('dist/index.html'), 'Root file must not shadow localized home rewrites');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,pagePaths.length*languages.length+guidePaths.length);
for(const lang of languages) {
 const html=fs.readFileSync(`dist/home/${lang}.html`,'utf8');
 const menu=pdfHomeMenu[lang];
 assert.ok(html.includes(menu.guideTitle),`${lang} PDF homepage guide title`);
 for(const paragraph of menu.guide) assert.ok(html.includes(paragraph),`${lang} PDF homepage guide paragraph`);
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
 const about=fs.readFileSync(`dist/about/${lang}.html`,'utf8');
 assert.ok(about.includes(aboutText[lang].contactBody),`${lang} localized support guidance`);
 assert.ok(about.includes('href="mailto:contact@qktoolhub.com"'),`${lang} contact email`);
 assert.ok(!about.includes('8개 도구')&&!about.includes('Eight tools')&&!about.includes('8ツール')&&!about.includes('共8种')&&!about.includes('ocho herramientas'),`${lang} obsolete tool count`);
 for(const kind of ['terms','privacy']) {
  const policy=fs.readFileSync(`dist/${kind}/${lang}.html`,'utf8');
  assert.ok(policy.includes(legalText[lang][kind].effectiveDate),`${lang} ${kind} update date`);
  assert.ok(policy.includes(legalText[lang].footer.contactIntro),`${lang} ${kind} localized contact`);
  assert.ok(policy.includes('href="mailto:contact@qktoolhub.com"'),`${lang} ${kind} contact email`);
  assert.ok(policy.includes('href="/pdf-tools'+(lang==='ko'?'':'?lang='+lang)+'"'),`${lang} ${kind} PDF hub link`);
  const topic=kind==='terms'?['PDF 도구의 범위와 결과 확인','PDF tool scope and output review','PDFツールの範囲と出力確認','PDF工具范围与结果核对','Alcance de PDF y revisión del resultado']:['PDF 작업 데이터와 문의','PDF work data and inquiries','PDF作業データとお問い合わせ','PDF工作数据与咨询','Datos de trabajo PDF y consultas'];
  assert.ok(policy.includes(topic[languages.indexOf(lang)]),`${lang} ${kind} PDF guidance`);
 }
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
for(const path of guidePaths) {
 const file=path==='/guides'?'dist/guides.html':`dist${path}.html`;
 const html=fs.readFileSync(file,'utf8'), meta=pageMeta(path,'ko');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${path} H1`);
 assert.ok(html.includes(`<html lang="ko"`),`${path} language`);
 assert.ok(html.includes(`rel="canonical" href="${meta.url}"`),`${path} canonical`);
 assert.equal((html.match(/hreflang=/g)||[]).length,0,`${path} must not claim unavailable translations`);
 assert.ok(html.includes(`name="description" content="${meta.description}"`),`${path} description`);
 const schema=JSON.parse([...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)][0][1])['@graph'];
 assert.ok(schema.some(node=>node['@type']===(path==='/guides'?'CollectionPage':'Article')),`${path} schema type`);
 assert.ok(html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').length>1500,`${path} substantial visible copy`);
 assert.ok(sitemap.includes(`<loc>${meta.url}</loc>`),`${path} sitemap`);
 const destination=path==='/guides'?'/guides.html':path+'.html';
 assert.ok(config.rewrites.some(r=>r.source===path&&r.destination===destination),`${path} rewrite`);
}
for(const guide of guides) {
 const html=fs.readFileSync(`dist${guide.path}.html`,'utf8');
 assert.ok(html.includes(guide.method),`${guide.path} original method`);
 for(const tool of guide.relatedTools) assert.ok(html.includes(`href="${tool.path}"`),`${guide.path} related tool`);
}
for(const [toolPath,linkedGuides] of Object.entries(guideLinksForTool)) {
 const html=fs.readFileSync(`dist/${toolPath.slice(1)}/ko.html`,'utf8');
 for(const guidePath of linkedGuides) assert.ok(html.includes(`href="${guidePath}"`),`${toolPath} links ${guidePath}`);
}
for(const sample of ['pdf-merge-input-a.pdf','pdf-merge-input-b.pdf','pdf-merge-result.pdf','pdf-page-source.pdf','pdf-page-organized.pdf']) assert.ok(fs.statSync(`dist/guide-samples/${sample}`).size>500,`${sample} downloadable sample`);
console.log(`PASS: ${pagePaths.length*languages.length+guidePaths.length} pages, metadata, canonicals, language alternates, schemas, crawlable links, sitemap, guide evidence, 404 config and share image.`);
