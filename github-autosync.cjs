const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const repo = __dirname;
const state = path.join(repo, '.git', 'autosync');
fs.mkdirSync(state, { recursive: true });
const log = message => fs.appendFileSync(path.join(state, 'sync.log'), `${new Date().toISOString()} ${message}\n`);
const lock = path.join(state, 'pid');
if (fs.existsSync(lock)) {
  try { process.kill(Number(fs.readFileSync(lock, 'utf8')), 0); process.exit(0); } catch {}
  fs.unlinkSync(lock);
}
try { fs.writeFileSync(lock, String(process.pid), { flag: 'wx' }); } catch { process.exit(0); }
process.on('exit', () => { try { fs.unlinkSync(lock); } catch {} });
function git(...args) {
  const r = spawnSync('git', ['-c', 'credential.interactive=never', ...args], {
    cwd: repo, encoding: 'utf8', windowsHide: true, timeout: 45000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'Never' }
  });
  if (r.error || r.status !== 0) throw new Error(`${args[0]}: ${r.error?.message || r.stderr || r.stdout}`);
  return r.stdout.trim();
}
let last = '', changedAt = 0, retryAt = 0;
function tick() {
  try {
    if (git('branch', '--show-current') !== 'main') return;
    if (git('remote', 'get-url', 'origin') !== 'https://github.com/ionic2001/qktoolhub.git') throw new Error('Unexpected origin; stopped syncing.');
    if (['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'rebase-merge', 'rebase-apply', 'index.lock'].some(p => fs.existsSync(path.join(repo, '.git', p)))) return;
    if (git('ls-files', '-u')) return;
    const status = git('status', '--porcelain');
    // Include tracked content diffs so repeated edits restart the debounce timer.
    const fingerprint = status + git('diff', 'HEAD');
    if (fingerprint !== last) { last = fingerprint; changedAt = Date.now(); return; }
    if (Date.now() < retryAt || Date.now() - changedAt < 5000) return;
    if (status) {
      git('add', '-A');
      if (git('diff', '--cached', '--name-only')) {
        git('commit', '-m', `Auto sync ${new Date().toISOString()}`);
        log('Committed saved changes.');
      }
    }
    const head = git('rev-parse', 'HEAD');
    const marker = path.join(state, 'pushed-head');
    if (!fs.existsSync(marker) || fs.readFileSync(marker, 'utf8') !== head) {
      git('push', '-u', 'origin', 'main');
      fs.writeFileSync(marker, head);
      log('Push succeeded: ' + head);
    }
    last = '';
  } catch (e) { log(e.message); retryAt = Date.now() + 60000; }
}
log('Started. PID ' + process.pid);
setInterval(tick, 3000);
tick();
