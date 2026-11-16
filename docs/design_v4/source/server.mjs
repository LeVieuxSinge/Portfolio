import http from 'node:http';
import path from 'node:path';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
const root=process.cwd(),types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.webm':'video/webm','.mp4':'video/mp4'};
http.createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),relative=pathname.startsWith('/images/')?'/public'+pathname:pathname,target=path.resolve(root,'.'+relative);
 if(!target.startsWith(root+path.sep)){res.writeHead(403).end();return}
 const info=await stat(target),headers={'content-type':types[path.extname(target)]||'application/octet-stream','cache-control':'no-store','accept-ranges':'bytes'};
 if(req.headers.range){const match=req.headers.range.match(/bytes=(\d+)-(\d*)/);if(!match){res.writeHead(416).end();return}const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),info.size-1):info.size-1;if(start>=info.size){res.writeHead(416).end();return}res.writeHead(206,{...headers,'content-range':`bytes ${start}-${end}/${info.size}`,'content-length':end-start+1});createReadStream(target,{start,end}).pipe(res)}else{res.writeHead(200,{...headers,'content-length':info.size});createReadStream(target).pipe(res)}
 }catch{res.writeHead(404).end('Not found')}}).listen(4181,'127.0.0.1',()=>console.log('V4 review: http://localhost:4181/docs/design_v4/source/studio.html?page=home'));
