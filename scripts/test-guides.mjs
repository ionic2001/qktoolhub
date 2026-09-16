import assert from 'node:assert/strict';
import { loadSource } from './load-source.mjs';

const { calculateTextStats } = loadSource('src/utils/counter.ts');
const { convert } = loadSource('src/features/units/model.ts');
const { resizeImageDimensions } = loadSource('src/utils/imageEditor.ts');

assert.deepEqual(
  (({ charCount, charNoSpaceCount, utf8Bytes, eucKrBytes }) => ({ charCount, charNoSpaceCount, utf8Bytes, eucKrBytes }))(calculateTextStats('한글 ABC')),
  { charCount: 6, charNoSpaceCount: 5, utf8Bytes: 10, eucKrBytes: 8 },
);
assert.deepEqual(
  (({ charCount, utf8Bytes, eucKrBytes }) => ({ charCount, utf8Bytes, eucKrBytes }))(calculateTextStats('😊')),
  { charCount: 2, utf8Bytes: 4, eucKrBytes: 4 },
);
assert.equal(convert(1, 'data', 'MB', 'B'), 1_000_000);
assert.equal(convert(1, 'data', 'MiB', 'B'), 1_048_576);
assert.equal(convert(1, 'data', 'MiB', 'MB'), 1.048576);
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 600, true), { width: 600, height: 400 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'height', 600, true), { width: 900, height: 600 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 5000, true), { width: 4096, height: 2731 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'height', 20, true), { width: 96, height: 64 });
assert.deepEqual(resizeImageDimensions(1200, 800, 'width', 600, false), { width: 600, height: 800 });

console.log('PASS: guide evidence matches live text byte, data unit, and image ratio calculations.');
