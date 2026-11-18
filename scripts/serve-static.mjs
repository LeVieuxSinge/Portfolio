import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const contentTypes = {
    ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".mjs": "application/javascript",
    ".css": "text/css", ".json": "application/json", ".xml": "application/xml",
    ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
    ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm", ".ico": "image/x-icon",
};
const failureMedia = new Set(["/images/projects/feltkutur/showcase.webm", "/images/projects/feltkutur/1.webp"]);

/** Resolve a single HTTP byte range, including suffix ranges; invalid ranges return null. */
export function parseByteRange(value, size) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(value);
    if (!match || (!match[1] && !match[2]) || size < 1) return null;
    const suffix = !match[1];
    const first = Number(match[1] || match[2]);
    const last = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last)) return null;
    if (suffix) return first > 0 ? { start: Math.max(0, size - first), end: size - 1 } : null;
    if (first >= size || first > last) return null;
    return { start: first, end: Math.min(last, size - 1) };
}

/** Serve generated files with directory indexes, a real 404, and inline-video range support. */
export function createStaticServer({ root = ".output/public", failMedia = false } = {}) {
    const directory = fs.realpathSync(root);
    const contained = file => file === directory || file.startsWith(directory + path.sep);

    return http.createServer((request, response) => {
        if (!["GET", "HEAD"].includes(request.method)) {
            response.writeHead(405, { Allow: "GET, HEAD" }).end();
            return;
        }
        let pathname;
        try {
            pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
        }
        catch {
            response.writeHead(400).end();
            return;
        }
        if (pathname.includes("\\") || pathname.includes("\0")) {
            response.writeHead(403).end();
            return;
        }
        if (failMedia && failureMedia.has(pathname)) {
            response.writeHead(503, { "Cache-Control": "no-store" }).end();
            return;
        }

        let file = path.resolve(directory, "." + pathname);
        if (!contained(file)) {
            response.writeHead(403).end();
            return;
        }
        let status = 200;
        try {
            if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
            file = fs.realpathSync(file);
            if (!contained(file)) {
                response.writeHead(403).end();
                return;
            }
            if (!fs.statSync(file).isFile()) throw new Error("Missing file");
        }
        catch {
            file = path.join(directory, "404.html");
            status = 404;
        }
        if (!fs.existsSync(file)) {
            response.writeHead(404).end();
            return;
        }

        const size = fs.statSync(file).size;
        const headers = { "Content-Type": contentTypes[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
        let range;
        if (request.headers.range && status === 200) {
            range = parseByteRange(request.headers.range, size);
            if (!range) {
                response.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
                return;
            }
            status = 206;
            headers["Content-Range"] = `bytes ${range.start}-${range.end}/${size}`;
        }
        headers["Content-Length"] = range ? range.end - range.start + 1 : size;
        response.writeHead(status, headers);
        if (request.method === "HEAD") response.end();
        else fs.createReadStream(file, range).on("error", () => response.destroy()).pipe(response);
    });
}

/** Start on loopback only; port 0 lets automated checks reserve a free port. */
export async function startStaticServer(options = {}) {
    const { port = 3001, ...settings } = options;
    const server = createStaticServer(settings);
    await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen(port, "127.0.0.1", resolve);
    });
    return { server, url: `http://127.0.0.1:${server.address().port}` };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
    const { values } = parseArgs({ options: { "port": { type: "string", default: "3001" }, "fail-media": { type: "boolean", default: false } } });
    const port = Number(values.port);
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Port must be an integer from 0 to 65535.");
    const { url } = await startStaticServer({ port, failMedia: values["fail-media"] });
    console.log(`Static portfolio preview: ${url}`);
}
