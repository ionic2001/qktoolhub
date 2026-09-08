import data from './editorLocales.json';
import type { Language } from './translations';
const dictionary: Record<string, {ja:string;zh:string;es:string}> = data;
export function editorTranslate(language:Language, ko:string, en:string):string { if(language==='ko') return ko;if(language==='en') return en;const key=en.trim();const hit=dictionary[key]?.[language];if(hit)return (en.startsWith(' ')?' ':'')+hit+(en.endsWith(' ')?' ':'');for(const [category,values] of Object.entries(dictionary)){if(en.startsWith(category+' ') && /[\u{1F000}-\u{1FFFF}\u2600-\u27BF]/u.test(en.slice(category.length)))return values[language]+en.slice(category.length);}return en;}
