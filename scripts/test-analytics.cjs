const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const exportsObject = {};
const code = ts.transpileModule(fs.readFileSync('src/utils/analytics.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const calls=[];const location={hostname:'localhost',pathname:'/world-clock'};
new Function('exports','location','window','document',code)(exportsObject,location,{gtag:(...args)=>calls.push(args)},{documentElement:{lang:'ko'}});
exportsObject.track('page_view');assert.equal(calls.length,0);
location.hostname='www.qktoolhub.com';exportsObject.track('menu_click',{menu_id:'world-clock'});assert.equal(calls.length,1);
location.pathname='/stickerbook';exportsObject.track('page_view');assert.equal(calls.length,1);
location.hostname='qktoolhub-clock-skins.ichoi73.chatgpt.site';location.pathname='/world-clock';exportsObject.track('page_view');assert.equal(calls.length,1);
for(const route of ['home','word-counter','currency-converter'])for(const lang of ['ko','en','ja','zh','es']){
 const html=fs.readFileSync(`dist/${route}/${lang}.html`,'utf8');assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert(html.includes(`lang="${lang}"`));assert(html.includes('send_page_view: false'));
}
console.log('PASS: production allowlist, local/preview/stickerbook exclusion, event payload, 15 metadata pages.');
