/** Source integrity checks for the static portfolio; no historical test fixtures or browser storage are required. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { projects, contentRoutes, selectedProjects } from "../shared/data/projects.ts";
import { capabilityStacks, cvGroups } from "../shared/data/about.ts";
import { contributionProfiles, navigationItems, profileOrder, site, siteLocales } from "../shared/data/site.ts";
import { archiveNeighbors, browseArchive, deriveProfiles, normalizeArchiveQuery } from "../shared/utils/catalog.ts";
import { entryMessages } from "../app/utils/motion/tokens.ts";

/**
 * Enumerate maintained files only; generated output and dependency code are separate checks.
 * @param {string} root Repository-relative directory.
 * @returns {string[]} File paths consumed by the source scans.
 */
function filesUnder(root) {
    return fs.readdirSync(root, { recursive: true })
        .map(file => path.join(root, file))
        .filter(file => fs.statSync(file).isFile());
}

/**
 * Flatten locale leaves without requiring non-empty credits, which are intentionally optional.
 * @param {object} value Parsed locale subtree.
 * @param {string} [prefix] Dotted parent namespace.
 * @returns {Record<string, unknown>} Leaf values keyed by full translation path.
 */
function flatten(value, prefix = "") {
    return Object.fromEntries(Object.entries(value).flatMap(([name, child]) => {
        const key = prefix ? `${prefix}.${name}` : name;
        return child && typeof child === "object" ? Object.entries(flatten(child, key)) : [[key, child]];
    }));
}

const messages = Object.fromEntries(siteLocales.map(locale => [locale.code, flatten(JSON.parse(fs.readFileSync(`app/locales/${locale.file}`, "utf8")))]));
const englishKeys = Object.keys(messages.en).sort();
assert.deepEqual(Object.keys(messages.fr).sort(), englishKeys, "English/French locale keys differ");

const usedKeys = new Set();
const assetPaths = new Set();

/**
 * Require a string leaf in both locales and register its use; this checks wiring, not factual accuracy.
 * @param {string} key Fully qualified translation key.
 */
function requireKey(key) {
    for (const locale of siteLocales) assert.equal(typeof messages[locale.code][key], "string", `${locale.code}: missing translation ${key}`);
    usedKeys.add(key);
}

/**
 * Validate/register a root-relative public file without allowing paths to escape the public directory.
 * @param {string} asset Public URL path, including its leading slash.
 */
function requireAsset(asset) {
    const root = path.resolve("public");
    const file = path.resolve(root, "." + asset);
    assert.ok(asset.startsWith("/") && file.startsWith(root + path.sep), `Invalid public path: ${asset}`);
    assert.ok(fs.existsSync(file) && fs.statSync(file).isFile(), `Missing public file: ${asset}`);
    assetPaths.add(asset);
}

// Catalog identity, collection membership, media order, and data-driven translation keys.
assert.equal(projects.length, 16, "Reviewed project inventory changed");
assert.equal(new Set(projects.map(project => project.slug)).size, projects.length, "Duplicate project slug");
assert.deepEqual(selectedProjects.map(project => project.slug), ["feltkutur", "ryker", "schluter", "simona"], "Selected project order changed");
assert.equal(projects.reduce((count, project) => count + project.media.length, 0), 118, "Reviewed media count changed");

for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(project.title.trim() && project.client.trim(), `${project.slug}: missing display facts`);
    assert.ok(Number.isInteger(project.year), `${project.slug}: year must be an integer`);
    assert.ok(project.media.length, `${project.slug}: no leading media`);
    assert.ok(project.contributions.every(role => Object.hasOwn(contributionProfiles, role)), `${project.slug}: unknown contribution`);
    assert.deepEqual(project.profiles, deriveProfiles(project.contributions), `${project.slug}: derived profile mismatch`);
    requireAsset(project.hero);
    if (project.preview) requireAsset(project.preview);
    for (const tag of project.tags) requireKey(`tool.${tag}`);
    for (const tag of Object.keys(project.tagLabels || {})) assert.ok(project.tags.includes(tag), `${project.slug}: label override for an absent tag`);
    for (const suffix of ["summary", "context", "contribution", "credits"]) requireKey(`${project.contentKey}.${suffix}`);
    for (const media of project.media) {
        assert.ok(media.width > 0 && media.height > 0, `${media.src}: invalid intrinsic dimensions`);
        requireAsset(media.src);
        requireKey(media.altKey);
        if (media.type === "video") {
            assert.ok(media.poster, `${media.src}: missing video poster`);
            requireAsset(media.poster);
        }
        else assert.equal(media.type, "image", `${media.src}: unknown media type`);
    }
    for (const link of project.links) {
        requireKey(link.labelKey);
        assert.ok(["http:", "https:"].includes(new URL(link.url).protocol), `${project.slug}: invalid external URL`);
    }
}
assert.equal(assetPaths.size, 119, "Reviewed catalog asset-path count changed");
assert.equal(contentRoutes.length, 40);
assert.equal(new Set(contentRoutes).size, 40, "Duplicate generated content route");

// The URL contract is independent of translated labels and source-role aliases.
assert.deepEqual(normalizeArchiveQuery({ role: "artist3d", sort: "invalid" }), { role: "art", sort: "newest" });
assert.deepEqual(normalizeArchiveQuery({ role: ["art", "frontend"], sort: ["title"] }), { role: "", sort: "newest" });
for (const role of ["", ...profileOrder]) {
    for (const sort of ["newest", "oldest", "title"]) {
        const state = { role, sort };
        const sequence = browseArchive(projects, state);
        assert.ok(sequence.every(project => project.featuredOrder === undefined && (!role || project.profiles.includes(role))));
        if (sequence.length > 1) {
            assert.equal(archiveNeighbors(projects, sequence[0].slug, state).previous.slug, sequence.at(-1).slug);
            assert.equal(archiveNeighbors(projects, sequence.at(-1).slug, state).next.slug, sequence[0].slug);
        }
    }
}

/**
 * Read a finite component-owned string array so deleting a key in both languages still fails validation.
 * @param {string} file Vue component path.
 * @param {string} name Script variable declaring literal suffixes.
 * @returns {string[]} Finite translation suffix domain; computed/non-literal arrays fail validation.
 */
function componentValues(file, name) {
    const content = fs.readFileSync(file, "utf8").match(/<script\b[^>]*>([\s\S]*?)<\/script>/)[1];
    const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);
    let values;
    /** Traverse syntax only; no component setup code executes during this check. */
    function visit(node) {
        if (ts.isVariableDeclaration(node) && node.name.getText(source) === name && ts.isArrayLiteralExpression(node.initializer)) {
            values = node.initializer.elements.map((element) => {
                assert.ok(ts.isStringLiteral(element), `${file}: ${name} requires a finite string array`);
                return element.text;
            });
        }
        ts.forEachChild(node, visit);
    }
    visit(source);
    assert.ok(values, `${file}: cannot resolve ${name}`);
    return values;
}

const activities = componentValues("app/components/AboutOpening.vue", "activities");
const motivations = componentValues("app/components/AboutOpening.vue", "motivations");
const mediaKeys = projects.flatMap(project => project.media.map(media => media.altKey));
const linkKeys = projects.flatMap(project => project.links.map(link => link.labelKey));
const cvKeys = cvGroups.flatMap(group => group.entries.map(entry => entry.titleKey));

// Each dynamic template has an explicit finite domain. New expressions must be
// registered instead of silently weakening missing-translation coverage.
const dynamicTemplates = new Map();

/**
 * Register a template's static prefix/suffix and binding spelling against its finite domain.
 * @param {string} head Literal text before the interpolation.
 * @param {string} binding Whitespace-free expression spelling.
 * @param {string} suffix Literal text after the interpolation.
 * @param {readonly (string|number)[]} values Every allowed interpolation value.
 */
function registerTemplate(head, binding, suffix, values) {
    dynamicTemplates.set(`${head}|${binding}|${suffix}`, values.map(value => head + value + suffix));
}
for (const binding of ["props.profile", "capability.profile", "value"]) registerTemplate("role.", binding, "", profileOrder);
registerTemplate("tool.", "tag", "", [...new Set(projects.flatMap(project => project.tags))]);
registerTemplate("layouts.navigation.", "item.id", "", navigationItems.map(item => item.id));
registerTemplate("pages.", "key", ".title", ["work", "archive", "about"]);
registerTemplate("pages.about.activities.", "key", "", activities);
registerTemplate("pages.about.motivations.", "key", "", motivations);
for (const suffix of [".title", ".body"]) registerTemplate("pages.about.statements.", "index", suffix, [1, 2, 3]);
registerTemplate("pages.about.capabilities.", "capability.profile", "", capabilityStacks.map(capability => capability.profile));
registerTemplate("pages.about.cvSections.", "group.id", "", cvGroups.map(group => group.id));
registerTemplate("loading.messages.", "message", "", Array.from({ length: entryMessages.count }, (_, index) => index + 1));
registerTemplate("", "project.value.contentKey", ".summary", projects.map(project => project.contentKey));
for (const suffix of [".context", ".contribution", ".credits"]) registerTemplate("", "project.contentKey", suffix, projects.map(project => project.contentKey));

/**
 * Expand a parsed translation argument, rejecting unknown dynamic wiring instead of skipping it.
 * @param {import('typescript').Expression} expression First translation-call argument.
 * @param {import('typescript').SourceFile} source AST host used to read binding spellings.
 * @returns {string[]} Every key that the current finite expression may request.
 */
function expressionKeys(expression, source) {
    if (ts.isStringLiteralLike(expression)) return [expression.text];
    if (ts.isConditionalExpression(expression)) return [...expressionKeys(expression.whenTrue, source), ...expressionKeys(expression.whenFalse, source)];
    if (ts.isTemplateExpression(expression) && expression.templateSpans.length === 1) {
        const span = expression.templateSpans[0];
        const key = `${expression.head.text}|${span.expression.getText(source).replace(/\s+/g, "")}|${span.literal.text}`;
        assert.ok(dynamicTemplates.has(key), `Unresolved dynamic translation: ${expression.getText(source)}`);
        return dynamicTemplates.get(key);
    }
    const key = expression.getText(source).replace(/\s+/g, "");
    const propertyKeys = { "media.altKey": mediaKeys, "props.media.altKey": mediaKeys, "link.labelKey": linkKeys, "entry.titleKey": cvKeys };
    assert.ok(Object.hasOwn(propertyKeys, key), `Unresolved translation argument: ${key}`);
    return propertyKeys[key];
}

/**
 * Find a t(...) call's closing parenthesis while ignoring quoted/template text.
 * @param {string} text Maintained source containing the call.
 * @param {number} start Offset immediately after its opening parenthesis.
 * @returns {number} Exclusive closing offset; unterminated source throws.
 */
function callEnd(text, start) {
    let depth = 1;
    let quote = "";
    for (let index = start; index < text.length; index++) {
        const char = text[index];
        if (char === "\\") {
            index++;
            continue;
        }
        if (quote) {
            if (char === quote) quote = "";
        }
        else if (["'", "\"", "`"].includes(char)) quote = char;
        else if (char === "(") depth++;
        else if (char === ")" && --depth === 0) return index + 1;
    }
    throw new Error("Unterminated translation call");
}

const appFiles = filesUnder("app").filter(file => /\.(vue|ts|css)$/.test(file));
let translationCalls = 0;
for (const file of appFiles) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/\bt\s*\(/g)) {
        const end = callEnd(text, match.index + match[0].length);
        const call = text.slice(match.index, end);
        const source = ts.createSourceFile("translation.ts", `const key = ${call};`, ts.ScriptTarget.Latest, true);
        const expression = source.statements[0].declarationList.declarations[0].initializer.arguments[0];
        expressionKeys(expression, source).forEach(requireKey);
        translationCalls++;
    }
}

// Static shell assets supplement catalog paths. Fonts/licenses are conventional
// module inputs and therefore do not need a direct component import to be retained.
for (const file of [...appFiles, "shared/data/site.ts", "nuxt.config.ts"]) {
    for (const match of fs.readFileSync(file, "utf8").matchAll(/['"`]((?:\/(?:images|models|textures|icons|fonts)\/|\/portrait\.webp|\/favicon\.ico)[^'"`\s)<>]*)['"`]/g)) requireAsset(match[1]);
}
for (const file of ["climate-crisis.woff2", "manrope-200-800.woff2", "ibm-plex-mono.woff2", "climate-crisis-OFL.txt", "manrope-OFL.txt", "ibm-plex-mono-OFL.txt", "LICENSE-material-icons.txt"]) requireAsset("/fonts/" + file);
requireAsset("/favicon.ico");
assert.equal(fs.readFileSync("public/CNAME", "utf8").trim(), new URL(site.origin).hostname);
assert.ok(fs.readFileSync("public/robots.txt", "utf8").includes(site.origin + "/sitemap.xml"));

fs.mkdirSync(".cache", { recursive: true });
fs.writeFileSync(".cache/check-content.json", JSON.stringify({ projects: projects.length, media: 118, catalogAssetPaths: 119, contentRoutes: contentRoutes.length, localeLeaves: englishKeys.length, referencedTranslationKeys: usedKeys.size, translationCalls, publicReferences: assetPaths.size }, null, 2) + "\n");
console.log(`Verified source inventory, ${usedKeys.size} bilingual translation keys (${translationCalls} calls), finite dynamic bindings, Archive neighbors, and public/font/license references.`);
