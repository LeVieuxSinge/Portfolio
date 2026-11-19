import assert from "node:assert/strict";
import fs from "node:fs";
import { contentRoutes } from "../shared/data/projects.ts";
import { startStaticServer } from "./serve-static.mjs";

// Port zero avoids a fixed-port conflict; both servers close in finally blocks even when an assertion fails.
const { server, url } = await startStaticServer({ port: 0 });

try {
    const routes = await Promise.all(contentRoutes.map(async (route) => {
        const response = await fetch(url + route);
        const html = await response.text();

        assert.equal(response.status, 200, route);
        assert.match(html, /<main\b/);
        assert.match(html, /<h1\b/);
        assert.match(html, route.startsWith("/fr") ? /<html[^>]*lang="fr"/ : /<html[^>]*lang="en"/);

        return { route, status: response.status, bytes: Buffer.byteLength(html) };
    }));
    for (const route of ["/projects", "/fr/projects"]) {
        const response = await fetch(url + route);
        assert.equal(response.status, 200);
        assert.match(await response.text(), /http-equiv="refresh"/);
    }
    const missing = await fetch(url + "/fr/project/does-not-exist");
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /<noscript><main/);

    const head = await fetch(url + "/project/ecd", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal((await head.arrayBuffer()).byteLength, 0);
    const partial = await fetch(url + "/icons/favicon-32.png", { headers: { Range: "bytes=0-7" } });
    assert.equal(partial.status, 206);
    assert.deepEqual(Buffer.from(await partial.arrayBuffer()), fs.readFileSync(".output/public/icons/favicon-32.png").subarray(0, 8));
    const invalidRange = await fetch(url + "/icons/favicon-32.png", { headers: { Range: "bytes=99999999-" } });
    assert.equal(invalidRange.status, 416);
    const traversal = await fetch(url + "/..%5cpackage.json");
    assert.equal(traversal.status, 403);
    const invalidEncoding = await fetch(url + "/%E0%A4%A");
    assert.equal(invalidEncoding.status, 400);

    const failurePreview = await startStaticServer({ port: 0, failMedia: true });
    try {
        for (const asset of ["showcase.webm", "1.webp"]) {
            const response = await fetch(failurePreview.url + "/images/projects/feltkutur/" + asset);
            assert.equal(response.status, 503);
            await response.arrayBuffer();
        }
    }
    finally {
        await new Promise((resolve, reject) => failurePreview.server.close(error => error ? reject(error) : resolve()));
    }

    fs.mkdirSync(".cache", { recursive: true });
    fs.writeFileSync(".cache/check-routes.json", JSON.stringify({ routes, compatibilityPages: 2, fallbackStatus: 404, head: true, range: true, traversalRejected: true, mediaFailureSimulation: true }, null, 2) + "\n");
    console.log("HTTP verified 40 content routes, compatibility pages, 404, HEAD, byte ranges, path containment, and media-failure simulation.");
}
finally {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}
