import fs from 'node:fs';
const domain='https://qktoolhub.com';
const languages=['ko','en','ja','zh','es'];
const app=fs.readFileSync('src/App.tsx','utf8');
const routes=[...new Set([...app.matchAll(/<Route path="([^"*]+)"/g)].map(m=>m[1]))];
const today = new Date().toISOString().slice(0, 10);
const entries=[];
for(const route of routes){
  const base=domain+route;
  const alternatives=[...languages.map(lang=>'<xhtml:link rel="alternate" hreflang="'+lang+'" href="'+base+'?lang='+lang+'"/>'),'<xhtml:link rel="alternate" hreflang="x-default" href="'+base+'"/>'].join('\n    ');
  for(const language of [null,...languages]){
    const url=base+(language?'?lang='+language:'');
    entries.push('  <url>\n    <loc>'+url+'</loc>\n    <lastmod>'+today+'</lastmod>\n    '+alternatives+'\n  </url>');
  }
}
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+entries.join('\n')+'\n</urlset>\n';
fs.writeFileSync('public/sitemap.xml',xml);if(fs.existsSync('dist'))fs.writeFileSync('dist/sitemap.xml',xml);console.log('Sitemap: '+routes.length+' routes, '+entries.length+' unique URLs with language alternates.');
