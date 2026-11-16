import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Documentation previews only. No application code or build configuration is used.
const root = process.cwd();
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.woff2':'font/woff2', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.mp4':'video/mp4', '.webm':'video/webm' };
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = pathname.startsWith('/images/') ? 'public'+pathname : pathname;
    const target = path.resolve(root, '.'+ (relative.startsWith('/') ? relative : '/'+relative));
    if (!target.startsWith(root+path.sep)) { res.writeHead(403).end(); return; }
    const bytes = await readFile(target);
    res.writeHead(200, {'content-type':types[path.extname(target)] || 'application/octet-stream', 'cache-control':'no-store'}).end(bytes);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(4179,'127.0.0.1',()=>console.log('Design preview: http://127.0.0.1:4179/docs/design_v2/source/studio.html'));
