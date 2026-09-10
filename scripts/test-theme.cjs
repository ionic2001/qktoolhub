const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script id="theme-bootstrap">([\s\S]*?)<\/script>/);
assert.ok(match, 'theme bootstrap script must exist');
assert.ok(html.indexOf('id="theme-bootstrap"') < html.indexOf('pagead2.googlesyndication.com'), 'theme must initialize before external scripts');

for (const builtPage of ['dist/home/ko.html', 'dist/home/en.html']) {
  if (fs.existsSync(builtPage)) {
    const builtHtml = fs.readFileSync(builtPage, 'utf8');
    const builtThemeIndex = builtHtml.indexOf('id="theme-bootstrap"');
    const builtStylesheetIndex = builtHtml.indexOf('rel="stylesheet"');

    assert.ok(builtThemeIndex >= 0, `${builtPage} must include theme bootstrap`);
    assert.ok(
      builtStylesheetIndex < 0 || builtThemeIndex < builtStylesheetIndex,
      `${builtPage} must initialize the theme before its stylesheet loads`,
    );
  }
}

for (const test of [
  { saved: 'dark', prefersDark: false, expected: 'dark' },
  { saved: 'light', prefersDark: true, expected: 'light' },
  { saved: null, prefersDark: true, expected: 'dark' },
  { saved: null, prefersDark: false, expected: 'light' },
]) {
  const root = { attrs: {}, style: {}, setAttribute(name, value) { this.attrs[name] = value; } };
  vm.runInNewContext(match[1], {
    localStorage: { getItem: () => test.saved },
    matchMedia: () => ({ matches: test.prefersDark }),
    document: { documentElement: root },
  });
  assert.equal(root.attrs['data-theme'], test.expected);
  assert.equal(root.style.colorScheme, test.expected);
}

console.log('PASS: saved and system themes are applied before page rendering.');
