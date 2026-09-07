export const cityZones = [
  ['Asia/Seoul','서울','Seoul','ソウル','首尔','Seúl'],['Asia/Tokyo','도쿄','Tokyo','東京','东京','Tokio'],['America/New_York','뉴욕','New York','ニューヨーク','纽约','Nueva York'],['Europe/London','런던','London','ロンドン','伦敦','Londres'],['Europe/Paris','파리','Paris','パリ','巴黎','París'],['Europe/Berlin','베를린','Berlin','ベルリン','柏林','Berlín'],['America/Los_Angeles','로스앤젤레스','Los Angeles','ロサンゼルス','洛杉矶','Los Ángeles'],['America/Chicago','시카고','Chicago','シカゴ','芝加哥','Chicago'],['America/Toronto','토론토','Toronto','トロント','多伦多','Toronto'],['America/Sao_Paulo','상파울루','São Paulo','サンパウロ','圣保罗','São Paulo'],['Asia/Shanghai','상하이','Shanghai','上海','上海','Shanghái'],['Asia/Hong_Kong','홍콩','Hong Kong','香港','香港','Hong Kong'],['Asia/Singapore','싱가포르','Singapore','シンガポール','新加坡','Singapur'],['Asia/Bangkok','방콕','Bangkok','バンコク','曼谷','Bangkok'],['Asia/Kolkata','뉴델리','New Delhi','ニューデリー','新德里','Nueva Delhi'],['Asia/Dubai','두바이','Dubai','ドバイ','迪拜','Dubái'],['Australia/Sydney','시드니','Sydney','シドニー','悉尼','Sídney'],['Pacific/Auckland','오클랜드','Auckland','オークランド','奥克兰','Auckland'],['Pacific/Honolulu','호놀룰루','Honolulu','ホノルル','檀香山','Honolulu'],['Europe/Rome','로마','Rome','ローマ','罗马','Roma']
];
export function duration(ms: number, fraction = false) { const n=Math.max(0,Math.floor(ms)); const h=Math.floor(n/3600000),m=Math.floor(n/60000)%60,s=Math.floor(n/1000)%60; return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':')+(fraction?'.'+String(Math.floor(n%1000/10)).padStart(2,'0'):''); }
export interface Alarm { id: string; name: string; time: string; zone: string; days: number[]; tone: string; enabled: boolean; next: number }
export function localDay(at: number, zone: string) { return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(at); }
export function nextAlarm(time: string, zone: string, days: number[], after: number, excludeDay?: string): number {
  const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'});
  const weekdays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  for(let date=Math.floor(after/60000)*60000+60000,end=date+8*86400000;date<end;date+=60000){
    const parts=Object.fromEntries(fmt.formatToParts(date).map(p=>[p.type,p.value]));
    if(`${parts.hour}:${parts.minute}`===time&&(!days.length||days.includes(weekdays.indexOf(parts.weekday)))&&(!excludeDay||localDay(date,zone)!==excludeDay))return date;
  }
  return after+86400000;
}
export function validZone(zone: string) { try { new Intl.DateTimeFormat('en',{timeZone:zone}).format(); return true; } catch { return false; } }
