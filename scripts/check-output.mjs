import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { contentRoutes, projects } from "../shared/data/projects.ts";
import { nextSelectedProject, projectPath } from "../shared/utils/catalog.ts";

const output = path.resolve(".output/public");
for (const route of contentRoutes) {
    const file = path.join(output, route, "index.html");
    assert.ok(existsSync(file), `Missing generated route: ${route}`);
    const html = readFileSync(file, "utf8");
    assert.match(html, /<main\b/, `Missing rendered main: ${route}`);
    assert.match(html, /<h1\b/, `Missing rendered heading: ${route}`);
    assert.match(html, /data-entry-loader/, `Missing initial loading surface: ${route}`);
    assert.match(html.slice(html.indexOf("data-entry-loader")), /<ol\b[^>]*>[\s\S]*?<li\b/, `Missing first-paint loading sentence: ${route}`);
    assert.match(html, /<noscript><style>\[data-entry-loader\]\{display:none!important\}<\/style><\/noscript>/, `Missing no-JavaScript loading fallback: ${route}`);
    assert.match(html, route.startsWith("/fr") ? /<html[^>]*lang="fr"/ : /<html[^>]*lang="en"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hreflang="fr-CA"/);
    assert.match(html, /property="og:image"/);
    assert.ok(!html.includes("fonts.googleapis.com"), `Runtime font request: ${route}`);
    assert.ok(!html.includes("api.iconify.design"), `Runtime icon request: ${route}`);
    if (route === "/" || route === "/fr") assert.ok(!html.includes("components.scroll"));
    const slug = route.split("/project/")[1];
    if (slug) {
        const project = projects.find(item => item.slug === slug);
        assert.match(html, /<dt\b[^>]*>\s*Client\s*<\/dt>/, `Missing Client fact: ${route}`);
        let previousIndex = -1;
        for (const media of project.media) {
            const index = html.indexOf(`data-media-src="${media.src}"`);
            assert.ok(index > previousIndex, `Media order mismatch: ${route}: ${media.src}`);
            previousIndex = index;
        }
        assert.ok(!/<video[^>]*\scontrols(?:\s|=|>)/.test(html), `Unexpected video controls: ${route}`);
        if (project.featuredOrder !== undefined) {
            const next = nextSelectedProject(projects, slug);
            assert.ok(html.includes(`href="${projectPath(next.slug, route.startsWith("/fr") ? "fr" : "en")}"`), `Missing next selected project: ${route}`);
        }
    }
}
for (const route of ["projects", "fr/projects"]) {
    const html = readFileSync(path.join(output, route, "index.html"), "utf8");
    assert.match(html, /http-equiv="refresh"/);
}
const sitemap = readFileSync(path.join(output, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 40);
assert.equal(readFileSync(path.join(output, "CNAME"), "utf8").trim(), "xavierchampoux.com");
assert.ok(existsSync(path.join(output, "404.html")));
const fallback = readFileSync(path.join(output, "404.html"), "utf8");
assert.match(fallback, /<noscript><main/);
assert.match(fallback, /lang="fr"/);
console.log("Verified 40 rendered content routes, ordered media, locale metadata, redirects, sitemap, custom domain, and 404 output.");
