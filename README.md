# Xavier Champoux — Portfolio

A bilingual, dark-only portfolio built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4, Reka UI, Lenis 1.3.27, and AnimeJS 4.5.0. The V4 design handoff is the visual reference. The application is prerendered for GitHub Pages at **xavierchampoux.com**.

## Setup

Use **Node 24.15 or newer within Node 24** (`.node-version` pins 24.15.0) and **pnpm 12.6.0**. Dependency installation enforces the supported Node range.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server binds to `127.0.0.1:3000`. No credentials or environment variables are required.

## Application structure

- `app/pages`: Home, Work, Archive, About, and the shared project page; `/projects` is a static-compatible Work redirect.
- `app/components`: shared identity/navigation, accessible dialogs/tooltips, project lists/media, About sections, and scroll control.
- `app/composables`: focused loading, Archive state, preview, video, text fitting, metadata, and scroll interfaces.
- `app/plugins/scroll.client.ts` and `app/router.options.ts`: one Lenis instance, motion preferences, navigation, anchors, progress, and saved-position restoration.
- `app/plugins/motion.client.ts`: coordinated AnimeJS text/element entrances and one-time scroll reveals, alongside Nuxt's native View Transition integration.
- `shared/data`: a pure typed project catalog and structured CV/capability data, usable at runtime and during generation.
- `shared/types` and `shared/utils`: content contracts, profile mapping, Archive normalization/filtering/sorting, and route helpers.
- `app/locales/en.json` and `fr.json`: all translated text, retaining the original locale namespaces and loading corpus.
- `public`: retained project images/videos, portrait, noise texture, local fonts/licenses, favicons, robots, and custom-domain file.
- `server/routes/sitemap.xml.ts`: generates the sitemap during prerendering; the deployed site needs no server.
- `docs/design_v4`: preserved reference studies and acceptance evidence. Their HTML/CSS/JavaScript is not application code.

## Routes and language

English uses `/`, `/work`, `/archive`, `/about`, and `/project/:slug`. French uses the same paths under `/fr`. Language links preserve the equivalent page, query, and fragment. Browser language detection does not override a visitor’s explicit URL.

Generation derives **40 content pages** from the catalog: four collection/static pages and 16 projects per language, plus compatibility/error pages and sitemap. Every content page contains readable HTML before JavaScript runs. The generated 404 also includes a bilingual no-JavaScript fallback.

Archive is linked globally only from the menu. Its URL contract is `role=frontend|uiux|art|programming` and `sort=newest|oldest|title`. Missing values mean all profiles/newest; legacy contribution roles normalize to canonical profiles. Newest/oldest ties use stable slug order. Query changes are navigable history entries; normalization replaces the current entry. Archive project links and looping neighbors preserve this context, and browser Back restores the saved list position without browser storage. Direct query URLs initially hydrate from the prerendered state, then apply the URL selection, avoiding a mismatch with the static HTML.

## Editing content

Edit project records in `shared/data/projects.ts`; edit prose in the existing locale files under `pages.project.items.<slug>`. Add translations in both languages, including summary, context, contribution, link labels, credits, and every media description. Keep proper names intact. Use only responsibilities supported by source material.

- Preserve stable slugs. Derive routes from them instead of storing route strings.
- `featuredOrder` determines Work membership and order. Launch order is Feltkutur, Ryker, Schluter, Simona. Other active projects form Archive; Portfolio V1/V2 remain excluded.
- Original `contributions` remain separate from derived `profiles`. Frontend/WebGL map to Frontend Development; UI/UX to UI/UX Design; 3D Artist to Technical Art; Game Developer/Programmer to Programming. Profiles deduplicate in that order.
- Tags describe tools/techniques. Schluter retains Unreal Engine 4, Level Creation, and Blueprint.
- Keep media in authoritative source order. A leading video stays first; a poster does not become another gallery item. Record actual intrinsic dimensions and localized descriptions. Keep portrait media contained.
- Preserve applicable external links and credits, particularly ECD’s model ownership and Roman Semenenko’s original head design for Monologue.
- Edit CV dates, organizations, and sections in `shared/data/about.ts`; localized role/qualification wording remains under `pages.about.cv`.

The retained catalog has **16 projects, 118 ordered media items, and 119 unique asset paths**. Catalog tests compare ordering, contributions, and links with the preserved inventory. Update that preservation contract deliberately when making a reviewed inventory change.

## Visual system and interaction

Semantic colors, typography, responsive utilities, focus, and common motion styles live in `app/assets/css/main.css`. Component layouts use Tailwind utilities. The layout is fluid with 56px/4vw desktop gutters and 20px mobile gutters; compact layouts begin at 700px.

Climate Crisis, Manrope, and IBM Plex Mono are loaded locally through Nuxt Fonts. Font source information and licenses are retained in `docs/design_v4/fonts`; served fonts/licenses are under `public/fonts`. Required Material Symbols and the original console chevron are bundled through Nuxt Icon, with runtime icon fetching disabled. No browser font API or icon server is required.

The logo uses four independent colored paths without shared SVG IDs. AnimatedNoise and CustomCursor are retained with integration/accessibility fixes. Pointer previews trail to the right of the cursor and reselect the row under a stationary pointer during scrolling. Keyboard previews remain stationary; touch requires none. Home has an empty display region and never renders a scroll control.

The menu uses Reka Dialog for modal behavior, with one persistent header teleported into the dialog focus region. Its background fades while text and elements enter downward and leave upward. Menu navigation keeps the background opaque until the destination is mounted, then reveals the new page. Its custom Manrope toggle morphs offset lines into a cross. Archive filters use full-width Reka Dropdown Menu triggers, Line borders, and Reka state-driven reveal/exit animations. The header has a soft downward gradient and hides identity copy on mobile. Its normal-weight page/project label fades in at the same destination used by Scroll down (80% of the viewport, clamped to the content end). Scrollbars remain hidden throughout. Header clearance follows its measured height, including wrapped/enlarged copy. Tooltips use Reka Tooltip and remain supplementary to accessible names. The mobile progress control is a 56px circular button with safe-area offsets and no added page-end strip.

Lenis is the sole scroll owner. Requested moves remain interruptible; menu opening stops inertia; reduced motion uses native scrolling and immediate jumps. Locale changes swap text without a document reload or replayed entrances. Native View Transitions provide other page handoffs where supported; AnimeJS handles text/element entrances, menu choreography, and one-time scroll reveals. Browsers without View Transitions keep the AnimeJS entrances. All decorative movement is disabled for reduced motion. Videos play muted inline when visible, pause off-screen/when hidden, and support native button Enter/Space activation. Manual pause, reduced motion, data saving, playback rejection, and media errors have visible Play or retry fallbacks. Gallery media never gates readiness.

The document-entry loader waits for the active locale, resolved page, and mounted shell. Its percentage takes at least two seconds to reach 100%, followed by a 500ms AnimeJS exit coordinated with the page entrance. The loading surface is server-rendered to avoid a content flash; a no-JavaScript style reveals the readable page instead. It does not replay during client navigation. The 16 original loading sentences are shuffled without replacement; at most five appear, then hold when exhausted. Gallery media never gates this sequence.

## Checks and production output

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm generate
pnpm check:output
pnpm preview
```

`pnpm test` checks catalog/media preservation, file paths/dimensions, profile/tag references, collection membership, query normalization, ordering/neighbors, translations, original loading sentences, CV references, and the 40-route generation contract. `pnpm check:output` checks actual prerendered HTML, language/sharing metadata, media order, redirects, sitemap, CNAME, and 404 output.

Lint targets maintained code/configuration/tests. Preserved design studies, vendored documentation assets, skills, and generated folders are excluded. Static hosting output is `.output/public`; use a static server with directory-index support to test direct project links and the generated 404 fallback.

## Deployment and publication review

GitHub Actions installs the frozen lockfile with Node 24.15.0 and pnpm 12.6.0, runs all checks, generates static output, and deploys the artifact to GitHub Pages on `master`. Pull requests validate without deploying. The older competing `push-dir` deployment path was removed. `public/CNAME` retains `xavierchampoux.com`.

This implementation does **not** publish the site. Before a public release, review both languages, project responsibilities, external destinations, CV dates/qualifications, award wording, and public appearances. The source CV’s Pixistudio 2021–2026 dates and school/award details were retained rather than independently certified. Bromont’s narrative mentions interface design while its original contribution array remains unchanged. ECD’s Technical Art profile does not claim ownership of its supplied models. The incorrect film-year reference in the old Monologue prose was omitted; its explicit design/performance credits remain.

Browser verification covers responsive layouts, semantic navigation, menu containment/restoration, Archive controls/history, project ordering, and muted keyboard-operated playback. Physical iOS/Android touch behavior, Safari autoplay policy, screen-reader speech output, OS text settings, and real browser zoom still need device testing before publication. Viewport emulation and accessibility-tree inspection do not replace those checks.

Future Home artwork/easter eggs, 3D scenes, immersive first-video expansion, light mode, downloadable CV generation, and alternative hosting remain outside this release.
