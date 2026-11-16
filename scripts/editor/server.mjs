// Local content editor. Run with `npm run editor`.
// It serves a form on http://localhost:5174 and writes straight into content/site.json
// and public/uploads/. It listens on this computer only and is never part of the public site.

import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const SITE = path.join(root, 'content', 'site.json');
const UPLOADS = path.join(root, 'public', 'uploads');
const PORT = 5174;
const SITE_PORT = 5173;
const MAX_UPLOAD = 15 * 1024 * 1024;

const pages = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/editor.js': ['editor.js', 'text/javascript; charset=utf-8'],
  '/editor.css': ['editor.css', 'text/css; charset=utf-8'],
};

const uploads = {
  'wallpaper-day': ['jpg', 'jpeg', 'png', 'webp'],
  'wallpaper-night': ['jpg', 'jpeg', 'png', 'webp'],
  cv: ['pdf'],
};

const send = (res, status, body, type = 'application/json; charset=utf-8') => {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

const readBody = (req, limit) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

/** Only this computer's own editor page may read or write. Blocks other websites from reaching the editor. */
const isLocal = (req) => {
  const allowed = [`localhost:${PORT}`, `127.0.0.1:${PORT}`];
  if (!allowed.includes(req.headers.host ?? '')) return false;
  const origin = req.headers.origin;
  return !origin || allowed.some((h) => origin === `http://${h}`);
};

const looksLikeSite = (s) =>
  s && typeof s === 'object' && s.identity && Array.isArray(s.projects) &&
  Array.isArray(s.experience) && Array.isArray(s.contacts) && s.wallpapers;

const server = http.createServer(async (req, res) => {
  try {
    if (!isLocal(req)) return send(res, 403, { error: 'forbidden' });
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (req.method === 'GET' && pages[url.pathname]) {
      const [file, type] = pages[url.pathname];
      return send(res, 200, await readFile(path.join(here, file)), type);
    }

    if (url.pathname === '/api/site' && req.method === 'GET') {
      return send(res, 200, await readFile(SITE, 'utf8'));
    }

    if (url.pathname === '/api/site' && req.method === 'PUT') {
      const data = JSON.parse((await readBody(req, 2 * 1024 * 1024)).toString('utf8'));
      if (!looksLikeSite(data)) return send(res, 400, { error: 'not a site file' });
      await writeFile(SITE, JSON.stringify(data, null, 2) + '\n', 'utf8');
      return send(res, 200, { ok: true });
    }

    if (url.pathname === '/api/upload' && req.method === 'POST') {
      const kind = url.searchParams.get('kind') ?? '';
      const ext = (url.searchParams.get('ext') ?? '').toLowerCase();
      if (!uploads[kind] || !uploads[kind].includes(ext)) return send(res, 400, { error: 'file type not allowed' });
      const body = await readBody(req, MAX_UPLOAD);
      await mkdir(UPLOADS, { recursive: true });
      const name = `${kind}.${ext}`;
      await writeFile(path.join(UPLOADS, name), body);
      return send(res, 200, { url: `/uploads/${name}` });
    }

    send(res, 404, { error: 'not found' });
  } catch (err) {
    send(res, 500, { error: String(err.message ?? err) });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Editor:  http://localhost:${PORT}`);
  console.log(`  Site:    http://localhost:${SITE_PORT}\n`);
});

// Start the site next to the editor so the preview works, unless it is already running.
if (!process.argv.includes('--no-site')) {
  const site = spawn('npm', ['run', 'dev', '--', '--port', String(SITE_PORT), '--strictPort'], {
    cwd: root, shell: true, stdio: 'inherit',
  });
  const stop = () => { site.kill(); process.exit(0); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}
