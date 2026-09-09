const fs = require('node:fs');
const ts = require('typescript');
const mod = {exports:{}};
new Function('exports', ts.transpileModule(fs.readFileSync('src/i18n/translations.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(mod.exports);
const unit = {};
new Function('exports',ts.transpileModule(fs.readFileSync('src/features/units/text.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(unit);
const base = fs.readFileSync('dist/index.html','utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const [lang,t] of Object.entries(mod.exports.translations)) {
  for(const route of ['', 'word-counter','currency-converter','unit-converter']) {
    const i=['ko','en','ja','zh','es'].indexOf(lang);
    const tool = route==='unit-converter'?{title:unit.copy.title[i],desc:unit.copy.subtitle[i]}:t.toolsList.find(x=>x.path===`/${route}`);
    const title = route ? `${tool.title} | QK Tool Hub` : `QK Tool Hub | ${t.hubTitle}`;
    const description = route ? tool.desc : t.hubSubtitle;
    const url = `https://qktoolhub.com/${route}?lang=${lang}`;
    let html = base.replace(/<html lang="[^"]*"/,`<html lang="${lang}"`).replace(/<title>.*?<\/title>/s,`<title>${escape(title)}</title>`);
    html = html.replace(/<meta\b[^>]*>/g,tag=>{
      if(/(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${escape(title)}"`);
      if(/(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${escape(description)}"`);
      if(/property="(?:og:url|twitter:url)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${url}"`);
      return tag;
    }).replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g,'').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
    html=html.replace('</head>',`<link rel="canonical" href="${url}" />`+['ko','en','ja','zh','es','x-default'].map(l=>`<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/${route}${l==='x-default'?'':`?lang=${l}`}" />`).join('')+'</head>');
    const dir = `dist/${route || 'home'}`;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/${lang}.html`,html);
  }
}
console.log('Generated home, word counter and currency metadata in five languages.');
