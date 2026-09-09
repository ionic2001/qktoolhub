export const cityZones = [
  ['Asia/Seoul','서울','Seoul','ソウル','首尔','Seúl'],['Asia/Tokyo','도쿄','Tokyo','東京','东京','Tokio'],['America/New_York','뉴욕','New York','ニューヨーク','纽约','Nueva York'],['Europe/London','런던','London','ロンドン','伦敦','Londres'],['Europe/Paris','파리','Paris','パリ','巴黎','París'],['Europe/Berlin','베를린','Berlin','ベルリン','柏林','Berlín'],['America/Los_Angeles','로스앤젤레스','Los Angeles','ロサンゼルス','洛杉矶','Los Ángeles'],['America/Chicago','시카고','Chicago','シカゴ','芝加哥','Chicago'],['America/Toronto','토론토','Toronto','トロント','多伦多','Toronto'],['America/Sao_Paulo','상파울루','São Paulo','サンパウロ','圣保罗','São Paulo'],['Asia/Shanghai','상하이','Shanghai','上海','上海','Shanghái'],['Asia/Hong_Kong','홍콩','Hong Kong','香港','香港','Hong Kong'],['Asia/Singapore','싱가포르','Singapore','シンガポール','新加坡','Singapur'],['Asia/Bangkok','방콕','Bangkok','バンコク','曼谷','Bangkok'],['Asia/Kolkata','뉴델리','New Delhi','ニューデリー','新德里','Nueva Delhi'],['Asia/Dubai','두바이','Dubai','ドバイ','迪拜','Dubái'],['Australia/Sydney','시드니','Sydney','シドニー','悉尼','Sídney'],['Pacific/Auckland','오클랜드','Auckland','オークランド','奥克兰','Auckland'],['Pacific/Honolulu','호놀룰루','Honolulu','ホノルル','檀香山','Honolulu'],['Europe/Rome','로마','Rome','ローマ','罗马','Roma'],
["Asia/Taipei", "타이베이", "Taipei", "台北", "台北", "Taipéi"],
["Asia/Ho_Chi_Minh", "호찌민", "Ho Chi Minh City", "ホーチミン", "胡志明市", "Ciudad Ho Chi Minh"],
["Asia/Jakarta", "자카르타", "Jakarta", "ジャカルタ", "雅加达", "Yakarta"],
["Asia/Manila", "마닐라", "Manila", "マニラ", "马尼拉", "Manila"],
["Asia/Kuala_Lumpur", "쿠알라룸푸르", "Kuala Lumpur", "クアラルンプール", "吉隆坡", "Kuala Lumpur"],
["Asia/Kathmandu", "카트만두", "Kathmandu", "カトマンズ", "加德满都", "Katmandú"],
["Asia/Dhaka", "다카", "Dhaka", "ダッカ", "达卡", "Daca"],
["Asia/Karachi", "카라치", "Karachi", "カラチ", "卡拉奇", "Karachi"],
["Asia/Riyadh", "리야드", "Riyadh", "リヤド", "利雅得", "Riad"],
["Asia/Qatar", "도하", "Doha", "ドーハ", "多哈", "Doha"],
["Europe/Istanbul", "이스탄불", "Istanbul", "イスタンブール", "伊斯坦布尔", "Estambul"],
["Europe/Madrid", "마드리드", "Madrid", "マドリード", "马德里", "Madrid"],
["Europe/Lisbon", "리스본", "Lisbon", "リスボン", "里斯本", "Lisboa"],
["Europe/Amsterdam", "암스테르담", "Amsterdam", "アムステルダム", "阿姆斯特丹", "Ámsterdam"],
["Europe/Zurich", "취리히", "Zurich", "チューリッヒ", "苏黎世", "Zúrich"],
["Europe/Vienna", "빈", "Vienna", "ウィーン", "维也纳", "Viena"],
["Europe/Stockholm", "스톡홀름", "Stockholm", "ストックホルム", "斯德哥尔摩", "Estocolmo"],
["Europe/Oslo", "오슬로", "Oslo", "オスロ", "奥斯陆", "Oslo"],
["Europe/Warsaw", "바르샤바", "Warsaw", "ワルシャワ", "华沙", "Varsovia"],
["Europe/Athens", "아테네", "Athens", "アテネ", "雅典", "Atenas"],
["Africa/Cairo", "카이로", "Cairo", "カイロ", "开罗", "El Cairo"],
["Africa/Johannesburg", "요하네스버그", "Johannesburg", "ヨハネスブルグ", "约翰内斯堡", "Johannesburgo"],
["Africa/Nairobi", "나이로비", "Nairobi", "ナイロビ", "内罗毕", "Nairobi"],
["Africa/Lagos", "라고스", "Lagos", "ラゴス", "拉各斯", "Lagos"],
["America/Vancouver", "밴쿠버", "Vancouver", "バンクーバー", "温哥华", "Vancouver"],
["America/Mexico_City", "멕시코시티", "Mexico City", "メキシコシティ", "墨西哥城", "Ciudad de México"],
["America/Argentina/Buenos_Aires", "부에노스아이레스", "Buenos Aires", "ブエノスアイレス", "布宜诺斯艾利斯", "Buenos Aires"],
["America/Santiago", "산티아고", "Santiago", "サンティアゴ", "圣地亚哥", "Santiago"],
["America/Lima", "리마", "Lima", "リマ", "利马", "Lima"],
["Australia/Perth", "퍼스", "Perth", "パース", "珀斯", "Perth"],
["Australia/Adelaide", "애들레이드", "Adelaide", "アデレード", "阿德莱德", "Adelaida"]
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

// A local-time day/night indicator, not a weather or sunrise forecast.
const daylightFormatters = new Map<string, Intl.DateTimeFormat>();
export function isDaytime(now: number, zone: string): boolean {
  let formatter = daylightFormatters.get(zone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', hourCycle: 'h23' });
    daylightFormatters.set(zone, formatter);
  }
  const hour = Number(formatter.format(now));
  return hour >= 6 && hour < 18;
}
