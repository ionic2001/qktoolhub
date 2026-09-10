import { Footer } from '../components/Footer';
import { localUrl } from '../seo/catalog';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowDownUp, Copy, Star, Link as LinkIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { AdSlot } from '../components/AdSlot';
import { useLanguage } from '../i18n/LanguageContext';
import { track } from '../utils/analytics';
import { searchUnits, exactUnit, categories, regions, locales, defaultRegion, preferred, ingredients, convert, parseNumber, validSelection, type Region, type Selection, type Unit } from '../features/units/model';
import { copy } from '../features/units/text';
import './UnitConverter.css';
const key='qk-units-v1';
function read():any {try{return JSON.parse(localStorage.getItem(key)||'null')||{};}catch{return {};}}
function initial(language:string) {
 const saved=read(),q=new URLSearchParams(location.search);
 let initialLanguage=q.get('lang');
 if(!initialLanguage){try{initialLanguage=localStorage.getItem('app_language');}catch{/* Optional preference. */}}
 if(!initialLanguage)initialLanguage=navigator.language.split('-')[0];
 if(['ko','en','ja','zh','es'].includes(initialLanguage||''))language=initialLanguage!;
 const region=regions.includes(q.get('region') as Region)?q.get('region') as Region:regions.includes(saved.region)?saved.region:defaultRegion(language,navigator.language);
 const selection={category:q.get('category'),from:q.get('from'),to:q.get('to'),ingredient:q.get('ingredient')||'water'};
 const fallback={category:'length',from:preferred('length',region)[0],to:preferred('length',region)[1],ingredient:'water'};
 return {region,selection:validSelection(selection)?selection:validSelection(saved.selection)?saved.selection:fallback};
}
export default function UnitConverter(){
 const {language,t}=useLanguage(),i=['ko','en','ja','zh','es'].indexOf(language),tr=(k:keyof typeof copy)=>copy[k][i];
 const [start]=useState(()=>initial(language));const [region]=useState<Region>(start.region),[s,setS]=useState<Selection>(start.selection);
 const [raw,setRaw]=useState('1'),[digits,setDigits]=useState('auto'),[query,setQuery]=useState(''),[message,setMessage]=useState('');
 const [favorites,setFavorites]=useState<Selection[]>(()=>{const f=read().favorites;return Array.isArray(f)?f.filter(validSelection).slice(0,12):[];});
 const [feet,setFeet]=useState('5'),[inches,setInches]=useState('7');
 const locale=locales[region],c=categories.find(c=>c.id===s.category)!,from=c.units.find(u=>u.id===s.from)!,to=c.units.find(u=>u.id===s.to)!;
 const value=parseNumber(raw,locale);let result:number|null=null,error='';
 if(value!==null){if(!Number.isFinite(value))error=tr('invalid');else try{result=convert(value,s.category,s.from,s.to,s.ingredient);}catch(e){error=tr((e as Error).message==='absolute'?'absolute':'range');}}
 const format=(v:number)=>new Intl.NumberFormat(locale,digits==='auto'?{maximumSignificantDigits:12}:{minimumFractionDigits:0,maximumFractionDigits:Number(digits)}).format(v);
 const text=result===null?'':format(result),approx=result!==null&&(s.category==='cooking'||Math.abs((parseNumber(text,locale)??0)-result)>Math.abs(result)*1e-14);
 const symbol=(u:Unit)=>['pyeong','tsubo'].includes(u.id)?u.names[i]:u.symbol;
 const label=(u:Unit)=>`${u.names[i]} (${symbol(u)})`;
 const change=(next:Selection)=>{setS(next);setQuery('');setMessage('');track('unit_selection',{category:next.category,from_unit:next.from,to_unit:next.to});};
 const selectCategory=(id:string)=>{const p=preferred(id,region);change({category:id,from:p[0],to:p[1],ingredient:s.ingredient});};
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify({region,selection:s,favorites}));}catch{setMessage('storage');}},[region,s,favorites]);
 async function clipboard(text:string,event:string){try{await navigator.clipboard.writeText(text);setMessage('copied');track(event,{category:s.category});}catch{setMessage('failed');}}
 function saveFavorite(){if(favorites.some(f=>JSON.stringify(f)===JSON.stringify(s)))return;if(favorites.length>=12){setMessage('limit');return;}setFavorites([...favorites,s]);setMessage('saved');track('unit_favorite',{category:s.category});}
 function share(){const url=new URL('/unit-converter',location.origin);Object.entries({...s,region,lang:language}).forEach(([k,v])=>url.searchParams.set(k,v));void clipboard(url.toString(),'unit_share');}
 const matches=searchUnits(query);
 function chooseSearch(category:string,unit:string,automatic=false){
  const cat=categories.find(c=>c.id===category)!;
  const target=category===s.category&&s.to!==unit?s.to:preferred(category,region).find(id=>id!==unit)||cat.units.find(u=>u.id!==unit)!.id;
  setS({category,from:unit,to:target,ingredient:s.ingredient});setQuery('');setMessage('switched');
  track('unit_search_select',{category,from_unit:unit,to_unit:target,selection_method:automatic?'automatic':'result_click'});
 }
 useEffect(()=>{const hit=exactUnit(query);if(!hit)return;const timer=setTimeout(()=>chooseSearch(hit.category.id,hit.unit.id,true),500);return ()=>clearTimeout(timer);},[query,region,s]);
 const options=()=>{const list=c.units;const p=preferred(c.id,region);return <><optgroup label={tr('popular')}>{p.map(id=>list.find(u=>u.id===id)).filter((u):u is Unit=>!!u).map(u=><option key={u.id} value={u.id}>{label(u)}</option>)}</optgroup><optgroup label={tr('all')}>{list.filter(u=>!p.includes(u.id)).map(u=><option key={u.id} value={u.id}>{label(u)}</option>)}</optgroup></>;};
 const ft=parseNumber(feet,locale),inch=parseNumber(inches,locale),height=ft!==null&&inch!==null&&Number.isInteger(ft)&&ft>=0&&inch>=0&&inch<12?(ft*12+inch)*2.54:null;
 return <div className="app-container unit-page"><Header/><a className="btn-tool" href={localUrl('/', language)}><ArrowLeft size={16}/>{t.backToHub.replace(/^[\s←⇐⟵]+/, "")}</a><section className="unit-intro"><span className="badge">QK TOOL HUB</span><h1>{tr('title')}</h1><p>{tr('subtitle')}</p></section>
 <nav className="unit-tabs" aria-label={tr('title')}>{categories.map(cat=><button key={cat.id} aria-pressed={cat.id===c.id} onClick={()=>selectCategory(cat.id)}>{cat.names[i]}</button>)}</nav>
 <section className="glass-card unit-search"><h2>{tr('search')}</h2><p id="unit-search-help">{tr('searchHelp')}</p><input type="search" aria-label={tr('search')} aria-describedby="unit-search-help" placeholder={tr('search')} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&matches.length===1){e.preventDefault();chooseSearch(matches[0].category.id,matches[0].unit.id);}if(e.key==='Escape')setQuery('');}}/>{query.trim()&&<div className="unit-search-results">{matches.length?matches.map(({category,unit})=><button key={`${category.id}-${unit.id}`} onClick={()=>chooseSearch(category.id,unit.id)}>{category.names[i]} · {label(unit)}</button>):<p role="status">{tr('noResults')}</p>}</div>}</section>
 <section className="glass-card unit-work"><div className="unit-work-head"><h2>{c.names[i]}</h2></div>
 {c.id==='cooking'&&<label>{tr('ingredient')}<select value={s.ingredient} onChange={e=>change({...s,ingredient:e.target.value})}>{ingredients.map(item=><option key={item.id} value={item.id}>{item.names[i]}</option>)}</select></label>}
 <div className="unit-fields"><div><label htmlFor="unit-input">{tr('input')}</label><input id="unit-input" className="unit-number" inputMode="decimal" value={raw} onChange={e=>{setRaw(e.target.value);setMessage('');}} placeholder={new Intl.NumberFormat(locale).format(1234.5)} aria-invalid={!!error} aria-describedby="unit-error"/><select aria-label={tr('from')} value={s.from} onChange={e=>change({...s,from:e.target.value})}>{options()}</select></div><button className="unit-swap" aria-label={tr('swap')} title={tr('swap')} onClick={()=>{if(result!==null)setRaw(new Intl.NumberFormat(locale,{maximumSignificantDigits:16,useGrouping:false}).format(result));change({...s,from:s.to,to:s.from});track('unit_swap',{category:c.id});}}><ArrowDownUp/></button><div><label htmlFor="unit-output">{tr('output')}</label><output id="unit-output" className="unit-number" aria-live="polite">{result===null?'—':`${approx?'≈ ':''}${text}`}</output><select aria-label={tr('to')} value={s.to} onChange={e=>change({...s,to:e.target.value})}>{options()}</select></div></div>
 <p id="unit-error" className={error?'unit-error':'unit-hint'}>{error|| (value===null?tr('empty'):result!==null?`${format(value!)} ${symbol(from)} ${approx?'≈':'='} ${text} ${symbol(to)}`:'')}</p>
 <div className="unit-actions"><label>{tr('precision')}<select value={digits} onChange={e=>{setDigits(e.target.value);track('unit_precision',{precision:e.target.value,category:c.id});}}><option value="auto">{tr('auto')}</option>{[0,2,4,6,8].map(n=><option key={n}>{n}</option>)}</select></label><button disabled={result===null} onClick={()=>void clipboard(`${text} ${symbol(to)}`,'unit_copy')}><Copy size={16}/>{tr('copy')}</button><button disabled={result===null} onClick={()=>void clipboard(text,'unit_copy')}>{tr('number')}</button><button onClick={saveFavorite}><Star size={16}/>{tr('favorite')}</button><button onClick={share}><LinkIcon size={16}/>{tr('share')}</button></div><p role="status" className="unit-status">{message?tr(message as keyof typeof copy):''}</p>
 {c.id==='data'&&<p className="unit-hint">{tr('dataNote')}</p>}{c.id==='cooking'&&<p className="unit-hint">{tr('cookingNote')} <a href="https://www.kingarthurbaking.com/learn/ingredient-weight-chart" target="_blank" rel="noreferrer">King Arthur Baking</a></p>}
 {c.id==='length'&&<details><summary>{tr('height')}</summary>{value!==null&&Number.isFinite(value)&&value>=0&&<p>{(()=>{let total;try{total=convert(value,'length',s.from,'in');}catch{return tr('range');}const rounded=total<1e15?Math.round(total*100)/100:total;return `${Math.floor(rounded/12)} ft + ${format(rounded%12)} in`;})()}</p>}<p>{tr('heightNote')}</p><div className="unit-height"><label>{tr('feet')} (ft)<input inputMode="numeric" value={feet} onChange={e=>setFeet(e.target.value)}/></label><label>{tr('inches')} (in)<input inputMode="decimal" value={inches} onChange={e=>setInches(e.target.value)}/></label><output>{height===null?tr('invalid'):`≈ ${format(height)} cm`}</output></div></details>}
 <details onToggle={e=>{if(e.currentTarget.open)track('unit_expand',{category:c.id});}}><summary>{tr('more')}</summary><div className="unit-all">{c.units.map(u=>{let n;try{n=value!==null?convert(value,c.id,s.from,u.id,s.ingredient):null;}catch{n=null;}return <div key={u.id}><span>{label(u)}</span><strong>{n!==null&&Number.isFinite(n)?format(n):'—'}</strong></div>;})}</div></details></section>
 {favorites.length>0&&<section className="glass-card unit-favorites"><h2>{tr('favorites')}</h2>{favorites.map((f,index)=>{const cat=categories.find(c=>c.id===f.category)!;return <div key={index}><button onClick={()=>{change(f);track('unit_favorite_use',{category:f.category,from_unit:f.from,to_unit:f.to});}}>{cat.names[i]} · {symbol(cat.units.find(u=>u.id===f.from)!)} → {symbol(cat.units.find(u=>u.id===f.to)!)}{f.category==='cooking'?` · ${ingredients.find(x=>x.id===f.ingredient)!.names[i]}`:''}</button><button aria-label={tr('remove')} onClick={()=>setFavorites(favorites.filter((_,n)=>n!==index))}>×</button></div>;})}</section>}
 <AdSlot slotId="unit-bottom"/><section className="glass-card unit-guide"><h2>{tr('guide')}</h2><p>{tr('note')}</p><a href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors" target="_blank" rel="noreferrer">{tr('source')} · NIST</a></section><Footer /></div>;
}
