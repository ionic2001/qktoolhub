const fs = require('node:fs');
const ts = require('typescript');
const mod = {exports:{}};
new Function('exports', ts.transpileModule(fs.readFileSync('src/i18n/translations.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(mod.exports);
const unit = {};
new Function('exports',ts.transpileModule(fs.readFileSync('src/features/units/text.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(unit);
const base = fs.readFileSync('dist/index.html','utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const homeTitles = {
  ko: 'QK Tool Hub | 무료 온라인 웹 도구 모음 - 글자수 세기·환율·이미지편집·PDF·단위변환·세계시계',
  en: 'QK Tool Hub | Free All-in-One Online Web Utilities & Productivity Tools',
  ja: 'QK Tool Hub | 無料オンラインWeb便利ツール集 (文字数・為替・画像編集・PDF・時計・単位)',
  zh: 'QK Tool Hub | 一站式免费在线实用工具箱 (字数统计·实时汇率·图片编辑·PDF·时钟·单位换算)',
  es: 'QK Tool Hub | Herramientas Web Todo en Uno y Kit de Productividad Online Gratuito'
};
const homeDescs = {
  ko: '회원가입 없이 즉시 사용하는 100% 무료 올인원 웹 도구 모음! 실시간 글자수 및 바이트 계산기, 글로벌 환율 계산기, 온라인 이미지 에디터, PDF 병합·분할 변환기, 사진 픽셀아트 변환, 단위 변환기, 세계 시계 등 스마트 유틸리티 툴킷을 제공합니다.',
  en: 'Free all-in-one web utility toolkit with no sign-up required. Real-time word/byte counter, global currency converter, online image editor, PDF tools, pixel art converter, unit converter, and world clock.',
  ja: '会員登録不要で今すぐ使える無料Webツール集。リアルタイム文字数カウント、為替レート計算機、画像編集、PDF変換、ドット絵変換、単位換算、世界時計を提供します。',
  zh: '无需注册，即开即用的免费在线工具箱。提供实时字数统计、全球汇率换算、在线图片编辑、PDF转换合并、像素画转换、单位换算、世界时钟等实用工具。',
  es: 'Kit de herramientas web gratuitas sin registro. Incluye contador de palabras, conversor de divisas, editor de imágenes, herramientas PDF, conversor de pixel art, unidades y reloj mundial.'
};
for(const [lang,t] of Object.entries(mod.exports.translations)) {
  for(const route of ['', 'word-counter','currency-converter','unit-converter']) {
    const i=['ko','en','ja','zh','es'].indexOf(lang);
    const tool = route==='unit-converter'?{title:unit.copy.title[i],desc:unit.copy.subtitle[i]}:t.toolsList.find(x=>x.path===`/${route}`);
    const title = route ? `${tool.title} | QK Tool Hub` : (homeTitles[lang] || `QK Tool Hub | ${t.hubTitle}`);
    const description = route ? tool.desc : (homeDescs[lang] || t.hubSubtitle);
    const url = `https://qktoolhub.com/${route}?lang=${lang}`;
    let html = base.replace(/<html lang="[^"]*"/,`<html lang="${lang}"`).replace(/<title>.*?<\/title>/s,`<title>${escape(title)}</title>`);
    html = html.replace(/<meta\b[^>]*>/g,tag=>{
      if(/(?:name|property)="(?:title|og:title|twitter:title)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${escape(title)}"`);
      if(/(?:name|property)="(?:description|og:description|twitter:description)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${escape(description)}"`);
      if(/property="(?:og:url|twitter:url)"/.test(tag))return tag.replace(/content="[^"]*"/,`content="${url}"`);
      return tag;
    }).replace(/<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/g,'').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
    if (!route) {
      const schema = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            url,
            name: 'QK Tool Hub',
            description,
            inLanguage: lang
          },
          {
            '@type': 'WebApplication',
            name: title,
            description,
            url,
            inLanguage: lang,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
          }
        ]
      }).replaceAll('<', '\\u003c');
      html = html.replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
    }
    html=html.replace('</head>',`<link rel="canonical" href="${url}" />`+['ko','en','ja','zh','es','x-default'].map(l=>`<link rel="alternate" hreflang="${l}" href="https://qktoolhub.com/${route}${l==='x-default'?'':`?lang=${l}`}" />`).join('')+'</head>');
    const dir = `dist/${route || 'home'}`;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(`${dir}/${lang}.html`,html);
  }
}
console.log('Generated home, word counter and currency metadata in five languages.');
