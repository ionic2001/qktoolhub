export type Unit = {id:string; symbol:string; names:string[]; factor:number; offset?:number};
export type Category = {id:string; names:string[]; units:Unit[]};
const u=(id:string,symbol:string,factor:number,names:string[],offset=0):Unit=>({id,symbol,factor,names,offset});
const dataNames=[
 ['바이트','Byte','バイト','字节','Byte'],
 ['킬로바이트','Kilobyte','キロバイト','千字节','Kilobyte'],
 ['메가바이트','Megabyte','メガバイト','兆字节','Megabyte'],
 ['기가바이트','Gigabyte','ギガバイト','吉字节','Gigabyte'],
 ['테라바이트','Terabyte','テラバイト','太字节','Terabyte'],
 ['키비바이트','Kibibyte','キビバイト','二进制千字节','Kibibyte'],
 ['메비바이트','Mebibyte','メビバイト','二进制兆字节','Mebibyte'],
 ['기비바이트','Gibibyte','ギビバイト','二进制吉字节','Gibibyte'],
 ['테비바이트','Tebibyte','テビバイト','二进制太字节','Tebibyte'],
];
export const categories:Category[] = [
 {id:'length',names:['길이','Length','長さ','长度','Longitud'],units:[u('mm','mm',.001,['밀리미터','Millimeter','ミリメートル','毫米','Milímetro']),u('cm','cm',.01,['센티미터','Centimeter','センチメートル','厘米','Centímetro']),u('m','m',1,['미터','Meter','メートル','米','Metro']),u('km','km',1000,['킬로미터','Kilometer','キロメートル','千米','Kilómetro']),u('in','in',.0254,['인치','Inch','インチ','英寸','Pulgada']),u('ft','ft',.3048,['피트','Foot','フィート','英尺','Pie']),u('yd','yd',.9144,['야드','Yard','ヤード','码','Yarda']),u('mi','mi',1609.344,['마일','Mile','マイル','英里','Milla'])]},
 {id:'mass',names:['무게','Weight','重さ','重量','Peso'],units:[u('mg','mg',.000001,['밀리그램','Milligram','ミリグラム','毫克','Miligramo']),u('g','g',.001,['그램','Gram','グラム','克','Gramo']),u('kg','kg',1,['킬로그램','Kilogram','キログラム','千克','Kilogramo']),u('t','t',1000,['미터톤','Metric tonne','トン','公吨','Tonelada métrica']),u('oz','oz',.028349523125,['온스','Ounce','オンス','盎司','Onza']),u('lb','lb',.45359237,['파운드','Pound','ポンド','磅','Libra'])]},
 {id:'area',names:['넓이','Area','面積','面积','Área'],units:[u('m2','m²',1,['제곱미터','Square meter','平方メートル','平方米','Metro cuadrado']),u('km2','km²',1e6,['제곱킬로미터','Square kilometer','平方キロメートル','平方千米','Kilómetro cuadrado']),u('pyeong','평',400/121,['평','Pyeong','坪（韓国）','坪（韩国）','Pyeong']),u('tsubo','坪',400/121,['쓰보','Tsubo','坪','坪（日本）','Tsubo']),u('ha','ha',10000,['헥타르','Hectare','ヘクタール','公顷','Hectárea']),u('acre','ac',4046.8564224,['에이커 (국제 피트)','Acre (international foot)','エーカー（国際フィート）','英亩（国际英尺）','Acre (pie internacional)']),u('ft2','ft²',.09290304,['제곱피트','Square foot','平方フィート','平方英尺','Pie cuadrado'])]},
 {id:'volume',names:['부피','Volume','体積','体积','Volumen'],units:[u('ml','mL',1,['밀리리터','Milliliter','ミリリットル','毫升','Mililitro']),u('l','L',1000,['리터','Liter','リットル','升','Litro']),u('m3','m³',1e6,['세제곱미터','Cubic meter','立方メートル','立方米','Metro cúbico']),u('gal-us','US gal',3785.411784,['미국 갤런','US gallon','米ガロン','美制加仑','Galón estadounidense']),u('gal-uk','UK gal',4546.09,['영국 갤런','Imperial gallon','英ガロン','英制加仑','Galón imperial']),u('floz-us','US fl oz',29.5735295625,['미국 액량 온스','US fluid ounce','米液量オンス','美制液量盎司','Onza líquida estadounidense']),u('floz-uk','UK fl oz',28.4130625,['영국 액량 온스','Imperial fluid ounce','英液量オンス','英制液量盎司','Onza líquida imperial'])]},
 {id:'temperature',names:['온도','Temperature','温度','温度','Temperatura'],units:[u('c','°C',1,['섭씨','Celsius','摂氏','摄氏度','Celsius'],273.15),u('f','°F',5/9,['화씨','Fahrenheit','華氏','华氏度','Fahrenheit'],459.67),u('k','K',1,['켈빈','Kelvin','ケルビン','开尔文','Kelvin'])]},
 {id:'speed',names:['속도','Speed','速度','速度','Velocidad'],units:[u('kmh','km/h',1/3.6,['시속 킬로미터','Kilometer per hour','時速キロメートル','千米每小时','Kilómetro por hora']),u('ms','m/s',1,['초속 미터','Meter per second','秒速メートル','米每秒','Metro por segundo']),u('mph','mph',.44704,['시속 마일','Mile per hour','時速マイル','英里每小时','Milla por hora']),u('kn','kn',1852/3600,['노트','Knot','ノット','节','Nudo'])]},
 {id:'time',names:['시간','Time','時間','时间','Tiempo'],units:[u('msec','ms',.001,['밀리초','Millisecond','ミリ秒','毫秒','Milisegundo']),u('sec','s',1,['초','Second','秒','秒','Segundo']),u('min','min',60,['분','Minute','分','分钟','Minuto']),u('hr','h',3600,['시간','Hour','時間','小时','Hora']),u('day','d',86400,['일','Day','日','天','Día']),u('week','wk',604800,['주','Week','週','周','Semana'])]},
 {id:'data',names:['데이터','Data','データ','数据','Datos'],units:[u('bit','bit',.125,['비트','Bit','ビット','比特','Bit']),...['B','KB','MB','GB','TB','KiB','MiB','GiB','TiB'].map((s,i)=>u(s,s,i<5?1000**i:1024**(i-4),dataNames[i]))]},
 {id:'pressure',names:['압력','Pressure','圧力','压力','Presión'],units:[u('pa','Pa',1,['파스칼','Pascal','パスカル','帕斯卡','Pascal']),u('kpa','kPa',1000,['킬로파스칼','Kilopascal','キロパスカル','千帕','Kilopascal']),u('bar','bar',1e5,['바','Bar','バール','巴','Bar']),u('atm','atm',101325,['표준기압','Standard atmosphere','標準気圧','标准大气压','Atmósfera estándar']),u('psi','psi',6894.757293168,['제곱인치당 파운드힘','Pound-force per square inch','重量ポンド毎平方インチ','磅力每平方英寸','Libra-fuerza por pulgada cuadrada'])]},
 {id:'energy',names:['에너지','Energy','エネルギー','能量','Energía'],units:[u('j','J',1,['줄','Joule','ジュール','焦耳','Julio']),u('kj','kJ',1000,['킬로줄','Kilojoule','キロジュール','千焦','Kilojulio']),u('cal','cal',4.184,['열화학 칼로리','Thermochemical calorie','熱化学カロリー','热化学卡路里','Caloría termoquímica']),u('kcal','kcal',4184,['킬로칼로리','Kilocalorie','キロカロリー','千卡','Kilocaloría']),u('wh','Wh',3600,['와트시','Watt-hour','ワット時','瓦时','Vatio-hora']),u('kwh','kWh',3.6e6,['킬로와트시','Kilowatt-hour','キロワット時','千瓦时','Kilovatio-hora'])]},
 {id:'power',names:['전력','Power','電力','功率','Potencia'],units:[u('w','W',1,['와트','Watt','ワット','瓦','Vatio']),u('kw','kW',1000,['킬로와트','Kilowatt','キロワット','千瓦','Kilovatio']),u('mw','MW',1e6,['메가와트','Megawatt','メガワット','兆瓦','Megavatio']),u('hp','hp',745.6998715822702,['영미 기계마력','Mechanical horsepower','英馬力','英制机械马力','Caballo mecánico']),u('ps','PS',735.49875,['미터마력','Metric horsepower','仏馬力','公制马力','Caballo métrico'])]},
 {id:'angle',names:['각도','Angle','角度','角度','Ángulo'],units:[u('deg','°',Math.PI/180,['도','Degree','度','度','Grado']),u('rad','rad',1,['라디안','Radian','ラジアン','弧度','Radián']),u('turn','turn',2*Math.PI,['회전','Turn','回転','圈','Vuelta'])]},
 {id:'cooking',names:['요리 계량','Cooking','料理の計量','烹饪计量','Cocina'],units:[u('ml','mL',1,['밀리리터','Milliliter','ミリリットル','毫升','Mililitro']),u('g','g',1,['그램 (재료 기준)','Gram (ingredient)','グラム（材料別）','克（按食材）','Gramo (ingrediente)']),u('cup-200','200 mL',200,['200mL 계량컵','200 mL cup','計量カップ 200mL','200mL 量杯','Taza de 200 mL']),u('cup-250','250 mL',250,['250mL 미터법 컵','250 mL metric cup','メートル法カップ 250mL','250mL 公制杯','Taza métrica de 250 mL']),u('cup-us','US cup',236.5882365,['미국 관습 컵','US customary cup','米慣用カップ','美制惯用杯','Taza estadounidense']),u('tbsp-15','15 mL',15,['15mL 큰술','15 mL tablespoon','大さじ 15mL','15mL 汤匙','Cucharada de 15 mL']),u('tsp-5','5 mL',5,['5mL 작은술','5 mL teaspoon','小さじ 5mL','5mL 茶匙','Cucharadita de 5 mL']),u('tbsp-us','US tbsp',14.78676478125,['미국 큰술','US tablespoon','米大さじ','美制汤匙','Cucharada estadounidense'])]},
];
export const regions=['KR','US','GB','JP','CN','TW','ES','MX'] as const;
export type Region=typeof regions[number];
export const locales:Record<Region,string>={KR:'ko-KR',US:'en-US',GB:'en-GB',JP:'ja-JP',CN:'zh-CN',TW:'zh-TW',ES:'es-ES',MX:'es-MX'};
export function defaultRegion(lang:string,browser:string):Region {const country=browser.split('-').pop()?.toUpperCase();const allowed:Record<string,Region[]>={ko:['KR'],en:['US','GB'],ja:['JP'],zh:['CN','TW'],es:['ES','MX']};const candidates=allowed[lang]||['US'];return candidates.includes(country as Region)?country as Region:candidates[0];}
export function preferred(category:string,region:Region):string[]{
 const metric:Record<string,string[]>={length:['cm','m','km'],mass:['kg','g'],area:region==='KR'?['pyeong','m2']:region==='JP'?['tsubo','m2']:['m2','ha'],volume:['l','ml'],temperature:['c','f'],speed:['kmh','ms'],time:['hr','min','sec'],data:['GB','MB','GiB'],pressure:['kpa','bar'],energy:['kcal','kj'],power:['kw','w'],angle:['deg','rad'],cooking:region==='JP'||region==='KR'?['cup-200','ml','g','tbsp-15']:['cup-250','ml','g','tbsp-15']};
 const us:Record<string,string[]>={length:['in','cm','ft'],mass:['lb','kg','oz'],area:['ft2','m2','acre'],volume:['gal-us','l','floz-us'],temperature:['f','c'],speed:['mph','kmh'],pressure:['psi','kpa'],cooking:['cup-us','g','ml','tbsp-us']};
 const gb:Record<string,string[]>={length:['m','ft','cm'],mass:['kg','lb'],volume:['l','gal-uk','floz-uk'],speed:['mph','kmh']};
 return (region==='US'?us[category]:region==='GB'?gb[category]:undefined)||metric[category]||[];
}
export const ingredients=[{id:'water',names:['물','Water','水','水','Agua'],density:1},{id:'flour',names:['중력분','All-purpose flour','中力粉','中筋面粉','Harina de trigo'],density:120/236.5882365}];
export function convert(value:number,category:string,from:string,to:string,ingredient='water'):number {
 const c=categories.find(c=>c.id===category);const a=c?.units.find(u=>u.id===from),b=c?.units.find(u=>u.id===to);if(!a||!b||!Number.isFinite(value))throw Error('invalid');
 const density=ingredients.find(i=>i.id===ingredient)?.density;if(!density)throw Error('invalid');
 const base=category==='cooking'?value*(from==='g'?1/density:a.factor):(value+(a.offset||0))*a.factor;
 if(category==='temperature'&&base < -1e-10)throw Error('absolute');
 const result=category==='cooking'?base/(to==='g'?1/density:b.factor):base/b.factor-(b.offset||0);
 if(!Number.isFinite(result))throw Error('range');return category==='temperature'&&Math.abs(result)<1e-12?0:result;
}
export type Selection={category:string;from:string;to:string;ingredient:string};
export function validSelection(x:unknown):x is Selection {if(!x||typeof x!=='object')return false;const s=x as Selection;const c=categories.find(c=>c.id===s.category);return !!c&&c.units.some(u=>u.id===s.from)&&c.units.some(u=>u.id===s.to)&&ingredients.some(i=>i.id===s.ingredient);}
export function parseNumber(raw:string,locale:string):number|null {
 if(!raw.trim())return null;const parts=new Intl.NumberFormat(locale).formatToParts(12345.6),group=parts.find(p=>p.type==='group')?.value,decimal=parts.find(p=>p.type==='decimal')?.value||'.';
 let s=raw.trim();if(group&&s.includes(group)){const integer=s.split(decimal)[0].replace(/^[+-]/,'');if(!new RegExp('^\\d{1,3}('+group.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\d{3})+$').test(integer))return NaN;s=s.split(group).join('');}s=s.replace(decimal,'.');return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s)?Number(s):NaN;
}

export function searchUnits(query:string) {
 const q=query.trim().toLocaleLowerCase();
 if(!q)return [];
 const normalize=(v:string)=>v.toLocaleLowerCase().replace(/²/g,'2').replace(/³/g,'3');
 return categories.flatMap(category=>category.units.map(unit=>({category,unit}))).filter(({unit})=>[unit.id,unit.symbol,...unit.names].some(v=>normalize(v).includes(normalize(q))));
}
export function exactUnit(query:string) {
 const q=query.trim().toLocaleLowerCase();
 const hits=searchUnits(query).filter(({unit})=>[unit.id,unit.symbol,...unit.names].some(v=>v.toLocaleLowerCase()===q));
 return hits.length===1?hits[0]:null;
}
