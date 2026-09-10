import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url), ts = require('typescript'), cache = new Map();
export function loadSource(filename) {
  filename = path.resolve(filename);
  if (cache.has(filename)) return cache.get(filename);
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
  const mod = { exports: {} }; cache.set(filename, mod.exports);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const localRequire = id => {
    if (!id.startsWith('.')) return require(id);
    const target = path.resolve(path.dirname(filename), id);
    const resolved = [target, target + '.ts', target + '.tsx', target + '.json'].find(f => fs.existsSync(f) && fs.statSync(f).isFile());
    if (!resolved) throw new Error(`Cannot load ${id} from ${filename}`);
    return loadSource(resolved);
  };
  new Function('require', 'module', 'exports', code)(localRequire, mod, mod.exports);
  return mod.exports;
}
