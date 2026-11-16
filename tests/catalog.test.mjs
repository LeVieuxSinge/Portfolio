import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { test } from "node:test";
import { projects, selectedProjects, contentRoutes } from "../shared/data/projects.ts";
import { archiveNeighbors, browseArchive, deriveProfiles, normalizeArchiveQuery, projectPath } from "../shared/utils/catalog.ts";
import { capabilityStacks, cvGroups } from "../shared/data/about.ts";

const readJson = path => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const locales = { en: readJson("../app/locales/en.json"), fr: readJson("../app/locales/fr.json") };
const baseline = readJson("../docs/design_v4/source/catalog.json");
const baselineLabels = readJson("../docs/design_v4/source/labels.json");
const lookup = (object, key) => key.split(".").reduce((value, part) => value?.[part], object);
const flatten = (object, prefix = "") => Object.entries(object).flatMap(([key, value]) => value && typeof value === "object" ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`]);

test("the active catalog preserves slugs and all ordered source media", () => {
    assert.equal(projects.length, 16);
    assert.equal(new Set(projects.map(project => project.slug)).size, 16);
    assert.equal(projects.reduce((sum, project) => sum + project.media.length, 0), 118);
    const paths = new Set();
    for (const project of projects) {
        const source = baseline.find(item => item.slug === project.slug);
        assert.ok(source);
        assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert.deepEqual(project.media.map(({ type, src }) => ({ type, src })), source.assets);
        assert.deepEqual(project.contributions, source.roles);
        assert.deepEqual(project.profiles, deriveProfiles(source.roles));
        assert.equal(project.links.length, source.urls.length);
        paths.add(project.hero);
        for (const medium of project.media) {
            paths.add(medium.src);
            assert.ok(Number.isInteger(medium.width) && medium.width > 0, medium.src);
            assert.ok(Number.isInteger(medium.height) && medium.height > 0, medium.src);
            if (medium.type === "video") assert.ok(medium.poster);
        }
    }
    assert.equal(paths.size, 119);
    for (const path of paths) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
});

test("Work and Archive are disjoint and cover the complete active inventory", () => {
    assert.deepEqual(selectedProjects.map(project => project.slug), ["feltkutur", "ryker", "schluter", "simona"]);
    assert.deepEqual(selectedProjects.map(project => project.featuredOrder), [0, 1, 2, 3]);
    const archive = browseArchive(projects, { role: "", sort: "newest" });
    assert.equal(archive.length, 12);
    assert.equal(new Set([...archive, ...selectedProjects].map(project => project.slug)).size, 16);
    assert.ok(!archive.some(project => selectedProjects.includes(project)));
    assert.ok(!projects.some(project => /^portfoliov[12]$/.test(project.slug)));
});

test("canonical profiles derive from contribution roles without duplicates", () => {
    assert.deepEqual(deriveProfiles(["webgldeveloper", "frontenddeveloper", "uiuxdesigner", "artist3d", "gamedeveloper", "programmer"]), ["frontend", "uiux", "art", "programming"]);
    assert.deepEqual(projects.find(project => project.slug === "schluter").profiles, ["uiux", "art", "programming"]);
    assert.deepEqual(projects.find(project => project.slug === "bromont").profiles, ["frontend", "art"]);
    assert.ok(projects.find(project => project.slug === "schluter").tags.includes("blueprint"));
});

test("Archive normalizes legacy, invalid, and repeated query values", () => {
    assert.deepEqual(normalizeArchiveQuery({}), { role: "", sort: "newest" });
    assert.deepEqual(normalizeArchiveQuery({ role: "webgldeveloper", sort: "oldest" }), { role: "frontend", sort: "oldest" });
    assert.deepEqual(normalizeArchiveQuery({ role: "artist3d", sort: "title" }), { role: "art", sort: "title" });
    assert.deepEqual(normalizeArchiveQuery({ role: "gamedeveloper" }), { role: "programming", sort: "newest" });
    assert.deepEqual(normalizeArchiveQuery({ role: "__proto__", sort: "wrong" }), { role: "", sort: "newest" });
    assert.deepEqual(normalizeArchiveQuery({ role: ["art", "frontend"], sort: ["title"] }), { role: "", sort: "newest" });
});

test("Archive sorts stably and neighbors loop within the filtered collection", () => {
    const state = { role: "", sort: "newest" };
    const archive = browseArchive(projects, state);
    assert.deepEqual(archive.slice(0, 3).map(project => project.slug), ["amb", "ecd", "bromont"]);
    assert.equal(archiveNeighbors(projects, "amb", state).previous.slug, archive.at(-1).slug);
    assert.equal(archiveNeighbors(projects, archive.at(-1).slug, state).next.slug, "amb");
    assert.deepEqual(archiveNeighbors(projects, "feltkutur", state), { previous: undefined, next: undefined });
    const filtered = { role: "frontend", sort: "oldest" };
    const frontend = browseArchive(projects, filtered);
    assert.equal(archiveNeighbors(projects, frontend[0].slug, filtered).previous.slug, frontend.at(-1).slug);
    assert.equal(archiveNeighbors(projects, frontend.at(-1).slug, filtered).next.slug, frontend[0].slug);
    assert.deepEqual(archiveNeighbors([frontend[0]], frontend[0].slug, filtered), { previous: undefined, next: undefined });
    const ecd = archiveNeighbors(projects, "ecd", state);
    assert.equal(ecd.previous.slug, "amb");
    assert.equal(ecd.next.slug, "bromont");
    const programming = browseArchive(projects, { role: "programming", sort: "oldest" });
    assert.equal(programming[0].slug, "amie");
    assert.ok(programming.every(project => project.profiles.includes("programming")));
    assert.equal(programming.length, 5);
    const titles = browseArchive(projects, { role: "", sort: "title" }).map(project => project.title);
    assert.deepEqual(titles, [...titles].sort((a, b) => a.localeCompare(b, "en")));
});

test("both existing locale files cover the complete application and retain the loading corpus", () => {
    assert.deepEqual(flatten(locales.en).sort(), flatten(locales.fr).sort());
    for (const [locale, messages] of Object.entries(locales)) {
        assert.deepEqual(messages.loading.messages, baselineLabels[locale].loading.messages);
        assert.equal(Object.keys(messages.loading.messages).length, 16);
        for (const project of projects) {
            for (const suffix of ["summary", "context", "contribution"]) assert.ok(lookup(messages, `${project.contentKey}.${suffix}`));
            for (const media of project.media) assert.ok(lookup(messages, media.altKey));
            for (const link of project.links) assert.ok(lookup(messages, link.labelKey));
            for (const profile of project.profiles) assert.ok(lookup(messages, `role.${profile}`));
            for (const tag of project.tags) assert.ok(lookup(messages, `tool.${tag}`));
        }
        assert.match(messages.pages.project.items.ecd.credits, /ECD/);
        assert.match(messages.pages.project.items.monologue.credits, /Roman Semenenko/);
        for (const group of cvGroups) for (const entry of group.entries) assert.ok(lookup(messages, entry.titleKey));
    }
    assert.equal(capabilityStacks.length, 4);
    assert.equal(cvGroups.length, 5);
});

test("generation derives exactly forty localized content routes", () => {
    assert.equal(contentRoutes.length, 40);
    assert.equal(new Set(contentRoutes).size, 40);
    for (const locale of ["en", "fr"]) for (const project of projects) assert.ok(contentRoutes.includes(projectPath(project.slug, locale)));
    assert.ok(contentRoutes.includes("/fr/archive"));
    assert.ok(!contentRoutes.includes("/projects"));
});
