import http from 'node:http';
import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
if (!existsSync(path.join(root, 'index.html'))) throw new Error('Run yarn build before yarn serve.');
const port = Number(process.env.PORT || 3101);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

http
  .createServer((req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let requested;
    try {
      requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (requested.includes('\0')) {
      res.writeHead(400).end();
      return;
    }
    const base = path.resolve(root, `.${requested}`);
    if (base !== root && !base.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    const file = [base, `${base}.html`, path.join(base, 'index.html')].find(
      (candidate) => existsSync(candidate) && statSync(candidate).isFile()
    );
    const target = file || path.join(root, '404.html');
    if (!existsSync(target)) {
      res.writeHead(404).end();
      return;
    }
    if (!realpathSync(target).startsWith(`${realpathSync(root)}${path.sep}`)) {
      res.writeHead(403).end();
      return;
    }
    res.writeHead(file ? 200 : 404, {
      'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    createReadStream(target)
      .on('error', () => res.destroy())
      .pipe(res);
  })
  .listen(port, '127.0.0.1', () => console.log(`Static preview: http://127.0.0.1:${port}`));
