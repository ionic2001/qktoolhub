const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const Module = require('node:module');
const source = fs.readFileSync('src/components/clock/ClockFace.tsx', 'utf8').replace("import './ClockFace.css';", '');
const compiled = ts.transpileModule(source, {compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const mod = new Module(require('node:path').resolve('src/components/clock/ClockFace.cjs'), module);
mod.filename = mod.id; mod.paths = module.paths; mod._compile(compiled, mod.filename);
const {ClockFace, ClockDisplay, DurationFace, AIRPORT_INTRO_DURATION_MS, AIRPORT_INTRO_FINAL_STEP, airportIntroGroups, validClockSkin, clockSkins} = mod.exports;
const render = (props) => renderToStaticMarkup(React.createElement(ClockFace, {skin:'airport',now:Date.parse('2026-09-08T00:59:59Z'),zone:'Asia/Seoul',locale:'ko-KR',h24:true,seconds:true,...props}));
for(const skin of clockSkins) {
  assert(validClockSkin(skin));
  assert.match(render({skin}), /aria-label="09:59:59"/);
  assert.match(render({skin,now:Date.parse('2026-09-08T01:00:00Z')}), /aria-label="10:00:00"/);
  assert.match(render({skin,now:Date.parse('2026-09-08T15:00:00Z')}), /aria-label="00:00:00"/);
}
assert(!validClockSkin(null)); assert(!validClockSkin('unknown'));
assert.match(render({seconds:false}), /aria-label="09:59"/);
assert.equal((render({seconds:false}).match(/clock-flip-digit/g)||[]).length,4);
assert.equal((render({}).match(/clock-flip-digit/g)||[]).length,6);
assert.match(render({h24:false,now:Date.parse('2026-09-08T15:00:00Z')}), /aria-label="(?:오전|AM) 12:00:00"/);
assert.match(render({zone:'America/New_York',now:Date.parse('2026-03-08T06:59:59Z')}), /aria-label="01:59:59"/);
assert.match(render({zone:'America/New_York',now:Date.parse('2026-03-08T07:00:00Z')}), /aria-label="03:00:00"/);
for (const locale of ['ko-KR','en-US','ja-JP','zh-CN','es-ES']) assert.match(render({locale,h24:false}),/clock-period/);
assert(!render({}).includes('clock-flip-motion'));
assert.equal((render({skin:'led'}).match(/<path /g)||[]).length,42);
console.log('PASS: all skins, rollover, midnight, 12/24h, seconds, DST, five locales, skin fallback and LED segments.');

const flip = (before, after, animate=true) => renderToStaticMarkup(React.createElement(ClockDisplay,{skin:'airport',groups:after,previousGroups:before,animate}));
assert.equal((flip(['09','59','59'],['10','00','00']).match(/clock-flip-motion/g)||[]).length,6);
assert.equal((flip(['10','00','00'],['10','00','01']).match(/clock-flip-motion/g)||[]).length,1);
assert.equal((flip(['10','00'],['10','00']).match(/clock-flip-motion/g)||[]).length,0);
assert.equal((flip(['10','00','01'],['10','05','23'],false).match(/clock-flip-motion/g)||[]).length,0);
console.log('PASS: flip animation affects changed digits only; stationary and skipped time do not animate.');

for (const target of [['23','59','59'],['00','00','00'],['12','48']]) {
  assert.deepEqual(airportIntroGroups(target,0), target.map(()=>'00'));
  assert.deepEqual(airportIntroGroups(target,AIRPORT_INTRO_FINAL_STEP), target);
  assert.deepEqual(airportIntroGroups(target,100), target);
  for(let step=1;step<=AIRPORT_INTRO_FINAL_STEP;step++) {
    const before=airportIntroGroups(target,step-1).join('');
    const after=airportIntroGroups(target,step).join('');
    for(let i=0;i<after.length;i++) assert([0,1].includes((Number(after[i])-Number(before[i])+10)%10));
  }
}
console.log('PASS: airport intro starts at zero, advances sequentially and settles on the current target.');

assert.equal(AIRPORT_INTRO_DURATION_MS,3000);
for (const skin of clockSkins) {
  for (const value of ['00:00:00.00','00:01:02.34','00:25:00','24:00:00','100:00:00']) {
    const output = renderToStaticMarkup(React.createElement(DurationFace,{skin,value}));
    assert(output.includes(`aria-label="${value}"`));
    if (skin !== 'default') assert(output.includes(`clock-display-${skin}`));
    if (skin === 'airport') assert.equal((output.match(/clock-flip-digit/g)||[]).length,value.split('.')[0].replaceAll(':','').length);
    if (skin !== 'default' && value.includes('.')) assert(output.includes('clock-duration-fraction'));
  }
}
console.log('PASS: three-second world-clock intro; every skin supports durations, stopwatch fractions and durations beyond 24 hours.');
