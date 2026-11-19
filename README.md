# Xavier Champoux — Portfolio

A bilingual, dark-only portfolio built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS 4, Reka UI, Lenis 1.3.27, and AnimeJS 4.5.0. The application is prerendered for GitHub Pages at **xavierchampoux.com**.

## Setup

Use **Node 24.15 or newer within Node 24** (`.node-version` pins 24.15.0) and **pnpm 12.6.0**. Dependency installation enforces the supported Node range.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server binds to `127.0.0.1:3000`. No credentials or environment variables are required. Keep `packageManager`, `.node-version`, the workflow versions, and `engines` aligned when upgrading. `pnpm-workspace.yaml` permits installation scripts only for esbuild and unrs-resolver; review that allowlist before adding a package that needs an install script. Commit dependency changes together with `pnpm-lock.yaml`.

## Application structure

- `app/pages`: Home, Work, Archive, About, and the shared project page; `/projects` is a static-compatible Work redirect.
- `app/components`: shared identity/navigation, accessible dialogs/tooltips, project lists/media, About sections, and scroll control.
- `app/composables`: loading readiness/progress/messages, typed Archive controls/context, modal focus/Teleport, list motion, shared pointer tracking, preview pursuit, media recovery, metadata, and scroll access.
- `app/plugins/scroll.client.ts`, `app/utils/scroll.ts`, and `app/router.options.ts`: one Lenis owner for movement, anchors, progress, suspension, and saved-position restoration. The router delegates restoration to this service.
- `app/plugins/motion.client.ts` and `app/utils/motion`: navigation phase/cover coordination, explicit element/text reveals, animation cancellation, and shared timings. Native View Transitions capture the covered handoff; AnimeJS owns visible effects.
- `shared/data/projects.ts`: a small aggregation entry point for individual authored records in `shared/data/projects/`. Canonical profiles are derived separately from original contributions.
- `shared/data/site.ts`: identity, contact links, site origin, locales, navigation, and profile definitions. `shared/data/about.ts` contains CV/capability facts.
- `shared/types` and `shared/utils`: content contracts, profile mapping, Archive normalization/filtering/sorting, and route helpers.
- `app/locales/en.json` and `fr.json`: all translated text, retaining the original locale namespaces and loading corpus.
- `public`: retained project images/videos, portrait, noise texture, local fonts/licenses, favicons, robots, and custom-domain file.
- `server/routes/sitemap.xml.ts`: generates the sitemap during prerendering; the deployed site needs no server.
- `scripts`: source/content integrity, static preview, generated-HTML verification, and HTTP route checks.

### Code ownership and documentation

Component props/emits and shared contracts document meaning, defaults, units, and invariants. Composable/function JSDoc explains returned state, side effects, cancellation, and cleanup. Declarations are grouped with blank lines between dependencies, contracts, state, derived values, actions, effects, and teardown where those groups occur. Keep factual records separate from interface wording; document field semantics in `shared/types/portfolio.ts` rather than duplicating them on every gallery item. No JavaScript/TypeScript classes or test suite are present.

| Owner | Lifecycle and invariant |
| --- | --- |
| Document shell | SSR renders readable content and the first loading sentence. Locale setup, `page:finish`, and shell mount complete essential readiness; progress/presentation own the minimum duration and exit. |
| Navigation controller | The only phase writer. Cover the outgoing page before route commit, wait for mount/native capture/scroll restoration, prepare the destination, then uncover. Generation tokens invalidate superseded work. |
| Header/menu | Keep one header instance. Reka owns modal accessibility; the modal composable coordinates Teleport, interrupted routing, and focus restoration. The outgoing header label stays frozen until hidden. |
| Scroll service | The only document mover. Saved history position takes precedence over anchors, locale-position preservation, and default top. Restore beneath the cover before entrance preparation. |
| Reveals/project lists | Explicit reveal targets belong to the page engine unless registered to a list scope. Lists own initial rows and later Layout changes, including rapid filter updates. |
| Pointer/media | One shared pointer stream drives cursor and preview geometry. Each media component owns its playback/recovery state; user intent remains separate from visibility and preferences. |

Owned effects settle their promises when canceled. On teardown, release registered guards, hooks, observers, event listeners, timers/frames, media playback, and captured animation styles. Keep browser APIs in client plugins or lifecycle callbacks so generated HTML remains SSR-compatible. Motion timings use milliseconds, scroll/geometry use CSS pixels, and progress uses 0–100 percent; the contracts call out exceptions.

## Routes and language

English uses `/`, `/work`, `/archive`, `/about`, and `/project/:slug`. French uses the same paths under `/fr`. Language links preserve the equivalent page, query, and fragment. Browser language detection does not override a visitor’s explicit URL.

Generation derives **40 content pages** from the catalog: four collection/static pages and 16 projects per language, plus compatibility/error pages and sitemap. Every content page contains readable HTML before JavaScript runs. The generated 404 also includes a bilingual no-JavaScript fallback.

Archive is linked globally only from the menu. Its URL contract is `role=frontend|uiux|art|programming` and `sort=newest|oldest|title`. Missing values mean all profiles/newest; legacy contribution roles normalize to canonical profiles. Newest/oldest ties use stable slug order. Query changes update the existing list with AnimeJS Layout, without replaying the page entrance or resetting scroll. They are navigable history entries; normalization replaces the current entry. Archive project links and looping neighbors preserve this context, and browser Back restores the saved list position without browser storage. Direct query URLs initially hydrate from the prerendered state, then apply the URL selection, avoiding a mismatch with the static HTML.

## Editing content

Edit individual project records in `shared/data/projects/<slug>.ts`; edit prose in the existing locale files under `pages.project.items.<slug>`. Add translations in both languages, including summary, context, contribution, link labels, credits, and every media description. Keep proper names intact. Use only responsibilities supported by source material.

- Preserve stable slugs. Derive routes from them instead of storing route strings.
- Set each project's `client` independently of its `title`. Review client names and the treatment of school/personal projects before publication. This field appears only in project facts; Work/Archive retain their Project column.
- `featuredOrder` determines Work membership and order. The selected slug order is `feltkutur`, `ryker`, `schluter`, `simona`. Other active projects form Archive; Portfolio V1/V2 remain excluded.
- Original `contributions` remain separate from derived `profiles`. Frontend/WebGL map to Frontend Development; UI/UX to UI/UX Design; 3D Artist to Technical Art; Game Developer/Programmer to Programming. Profiles deduplicate in that order.
- Tags describe tools/techniques. Optional `tagLabels` hold project-specific wording, such as Schluter's Unreal Engine 4, alongside its unchanged Level Creation and Blueprint tags. Optional `preview` selects a retained image independently of the hero.
- Keep media in authoritative source order. Image/video records are distinct types; every video requires a poster. A leading video stays first; its poster does not become another gallery item. Record actual intrinsic dimensions and localized descriptions. Keep portrait media contained.
- Preserve applicable external links and credits, particularly ECD’s model ownership and Roman Semenenko’s original head design for Monologue.
- Edit CV dates, organizations, and sections in `shared/data/about.ts`; localized role/qualification wording remains under `pages.about.cv`.
- Edit shared identity/contact details in `shared/data/site.ts`. Its public portrait path is used by About and social metadata; both retained portrait files remain available pending the later asset review.

The catalog has **16 projects, 118 ordered media items, and 119 unique asset paths**. Review ordering, contributions, credits, and links when editing project data; update these counts deliberately when changing the inventory.

## Visual system and interaction

Semantic colors, typography, responsive utilities, focus, and common motion styles live in `app/assets/css/main.css`. Component layouts use Tailwind utilities. The layout is fluid with 56px/4vw desktop gutters and 20px mobile gutters; compact layouts begin at 700px.

Climate Crisis, Manrope, and IBM Plex Mono are loaded locally through Nuxt Fonts. Font files and their licenses are under `public/fonts`; keep the licenses alongside the fonts. Required Material Symbols and the original console chevron are bundled through Nuxt Icon, with runtime icon fetching disabled. No browser font API or icon server is required.

The logo uses four independent colored paths without shared SVG IDs. AnimatedNoise and CustomCursor are retained with integration/accessibility fixes. Pointer previews trail to the right of the cursor, with their left center aligned to the hovered cursor's right center, and tilt in the drag direction. Their size stays constant and they can overflow the viewport at its edges. They reselect the row under a stationary pointer during scrolling. Keyboard previews remain stationary; touch requires none. Home has an empty display region and never renders a scroll control.

The menu uses Reka Dialog for modal behavior, with one persistent header teleported into the dialog focus region. Its background fades while whole rows, including borders, enter downward and leave upward in sequence. The menu fills the viewport below the shared header without document or modal scrolling. Menu navigation keeps the background opaque until the destination is mounted, then reveals the new page. Its custom Manrope toggle morphs offset lines into a cross using AnimeJS state interpolation, preserving motion and pointer alignment when Teleport moves the header. Archive filters use full-width Reka Dropdown Menu triggers, Line borders, and Reka state-driven reveal/exit animations. The header has a soft downward gradient and hides identity copy on mobile. Its normal-weight page/project label fades in at the same destination used by Scroll down (80% of the viewport, clamped to the content end). Scrollbars remain hidden throughout. Header clearance follows its measured height, including wrapped/enlarged copy. Tooltips use Reka Tooltip and remain supplementary to accessible names. The mobile progress control is a 56px circular button with safe-area offsets and no added page-end strip.

Lenis is the sole scroll owner. Requested moves remain interruptible; menu opening stops inertia; reduced motion uses native scrolling and immediate jumps. Locale changes swap text without a document reload or replayed entrances. Every page change shares a covered handoff: fade the outgoing page and its frozen header label, mount and restore scroll under the opaque cover, prepare entrances, then reveal. Native View Transitions capture this opaque handoff where supported; the main page is not captured separately above the cover. AnimeJS owns the visible choreography. Loader and menu exits explicitly await entrance preparation, and concurrent preparation requests share one task per page. Same-page Archive query updates bypass the handoff. Project titles wrap naturally. Selected projects group the closing invitation with Back to Work, opposite the next selected project in Work order. Next-project actions align right on mobile. Browsers without View Transitions keep the same AnimeJS handoff and entrances. All decorative movement is disabled for reduced motion. Videos play muted inline when visible, pause off-screen/when hidden, and support native button Enter/Space activation. Manual pause, reduced motion, data saving, playback rejection, and media errors have visible Play or retry fallbacks. Gallery media never gates readiness.

The document-entry loader waits for the active locale, resolved page, and mounted shell. Its percentage takes at least two seconds to reach 100%, followed by a 500ms AnimeJS exit coordinated with the page entrance. The loading surface and first shuffled sentence are server-rendered. A CSS counter starts at first paint, then AnimeJS continues the remaining time after hydration; no dead interval waits for app mounting. The loader uses the same background fade and upward exit as the menu; a no-JavaScript style reveals the readable page instead. It does not replay during client navigation. The 16 original loading sentences are shuffled without replacement; at most five appear, then hold when exhausted. Gallery media never gates this sequence.

Startup timing is logged in the development console. Append `?startup=1` to a generated preview URL to inspect bootstrap, hydration, and supported long-task timings there as well.

## Checks and production output

```sh
pnpm lint
pnpm typecheck
pnpm check:content
pnpm generate
pnpm check:output
pnpm check:routes
pnpm preview
```

`pnpm check:content` verifies the 16-project/118-media/119-path inventory, selected membership/order, original-to-canonical profile mapping, Archive normalization and looping neighbors, 40 unique content routes, bilingual key parity, finite dynamic translation bindings, and local asset/font/license references. It currently resolves all 345 keys in each language across 115 translation calls. Unknown dynamic bindings fail until their finite domains are registered in the checker. This checks wiring and presence, not wording or factual accuracy; empty optional credits are allowed. Its report is `.cache/check-content.json`.

`pnpm check:output` checks actual prerendered HTML, project headings/client facts, language/sharing metadata, ordered media, generated script/style/font/media references, compatibility pages, sitemap, CNAME, `.nojekyll`, and readable bilingual 404 output. Run generation first so results describe current source. `pnpm check:routes` starts its own temporary local server, verifies all 40 generated routes and HTTP behavior, then closes it; its report is `.cache/check-routes.json`. No unit test suite is currently included; these maintained checks run alongside lint and type checking. Generated `.nuxt`, `.output`, and `.cache` folders are ignored and can be regenerated from source.

`pnpm preview` serves `.output/public` at `http://127.0.0.1:3001`, including directory indexes, a real 404 response, HEAD requests, and video byte ranges. Use `pnpm preview --port 3002` for another port. `pnpm preview --fail-media` simulates failures for the first Feltkutur video/poster to review recovery behavior. Run `pnpm generate` before previewing.

The navigation controller is the only writer of the shared navigation phase. Header labels, the page cover, and scroll suspension derive their flags from that phase. Entry/menu surfaces request entrance preparation while opaque; regular navigation restores scroll before revealing. Lists register their own reveal scope and retain ownership when switching to layout animation. Playback listeners/policy belong to `useInlineVideo`; image retries belong to `useImageRecovery`. Animation waiters settle when canceled, and lifecycle cleanup removes observers, listeners, timers, and pending restoration work. Motion durations are in `app/utils/motion/tokens.ts`; stacking layers and reusable badge styles are in `app/assets/css/main.css`.

Lint targets maintained application code, scripts, and configuration. Development guidance and generated folders are excluded. Static hosting output is `.output/public`; use a static server with directory-index support to check direct project links and the generated 404 fallback.

### Local verification — 2026-11-18

| Check | Result |
| --- | --- |
| Pinned frozen installation, lint, type checking, source checks | Passed on Node 24.15.0 / pnpm 12.6.0. |
| Static generation, generated HTML/assets, HTTP checks | Passed: 40 content pages, 89 prerendered outputs including payloads, compatibility/error pages, sitemap, domain files, HEAD and byte ranges. |
| Browser entry and history | All 40 localized pages loaded directly and refreshed. All 32 localized project routes also passed client navigation and Back/Forward checks. |
| Reported interactions | Covered Home → About and Work → About & CV/project handoffs, frozen header label, menu focus/Escape/interruption, in-place filters, legacy query normalization, query/hash-preserving locale swaps, filtered looping neighbors, and Archive restoration checked. |
| Layouts and media | 320px French About/collections/project layouts, hidden mobile metadata, right-aligned next action, Home at 320/700/701/900/1440/1920px, pointer previews during scrolling, muted keyboard playback, menu/offscreen pausing, and simulated failures/retry controls checked. |
| Documentation-only preservation | Application syntax, template/style behavior, authored locale/catalog data, and retained asset content were compared against the pre-pass baseline. No content review or asset deletion was applied. |

The build reports existing upstream Vue annotation and Nitro cache-driver resolution warnings; static generation and generated-output/HTTP checks still pass. Reassess these warnings when upgrading the framework. Browser checks used the in-app Chromium browser, not physical devices. Real 200% browser zoom/enlarged text, reduced-motion/data-saving preferences, Safari autoplay, touch devices, and screen-reader speech remain unverified. Zoom shortcuts did not change the harness viewport, and its available controls did not expose preference emulation. These limits are not replaced by the narrow-viewport checks.

## Deployment and publication review

GitHub Actions installs the frozen lockfile with Node 24.15.0 and pnpm 12.6.0, runs lint, type checking, and source/content checks, generates static output, verifies generated HTML and HTTP routes, and deploys the artifact to GitHub Pages on `master`. Pull requests validate without deploying. `public/CNAME` retains `xavierchampoux.com`.

For deployment, configure the repository's **Settings → Pages → Source** as **GitHub Actions**, retain the custom domain and its DNS configuration, and merge approved changes to `master` (or run the workflow manually on that branch). Only `.output/public` is uploaded; the Nitro generation server is not deployed. A local `pnpm generate`/preview does not publish anything. If the domain changes, update `shared/data/site.ts`, `public/CNAME`, and `public/robots.txt` together and verify canonical/alternate URLs before deploying. Retain font and icon licenses in the artifact.

This pass does **not** publish the site. The owner will perform the shared/page/CV and 16 individual project reviews separately; no wording, locale values, client names, contributions, or credits were approved or rewritten here. Review both languages, external destinations (including suspicious endings), project/client treatment for school and personal work, CV dates/qualifications, awards, and whether public appearances were attendance, representation, or speaking. The CV’s Pixistudio 2021–2026 dates and school/award details remain authored claims. Review Bromont’s interface-design narrative against its original contribution roles, ECD’s supplied-model ownership, and Roman Semenenko’s Monologue head-design credit. External URL syntax is checked, but external availability and publication rights are not independently certified.

Browser verification includes desktop and 320px French layouts, covered Home/Work/About/menu navigation, menu interruption with Back, focus containment/restoration, in-place Archive controls, saved-position restoration, locale/query preservation, stationary-pointer previews after scrolling, constant preview sizing/overflow, muted keyboard-operated playback, and simulated image/video failures with retry controls. Physical iOS/Android touch behavior, Safari autoplay policy, browser data-saving/reduced-motion preferences, screen-reader speech output, OS text settings, and real browser zoom still need device testing before publication. Viewport emulation and accessibility-tree inspection do not replace those checks.

Future Home artwork/easter eggs, 3D scenes, immersive first-video expansion, light mode, downloadable CV generation, and alternative hosting remain outside this release.

## Retained media

These files remain intact. Choose **integrate**, **retain for a concrete future use**, or **remove** in a separately approved asset pass; reference and output checks must accompany any later deletion. Git history is retained.

| Retained candidate | Current use / decision needed |
| --- | --- |
| `public/videos/reel_2020.mp4` — 67,550,308 bytes (64.4 MiB) | Unused and copied into public output. Decide this first because of its output size. |
| `public/models/head.glb` | Deferred 3D work; no active experience consumes it. |
| `public/images/decks/deck_*.webp` — five files | Former Home decks; no active page consumes them. |
| `public/images/projects/portfoliov1/` and `portfoliov2/` | Older galleries excluded from the 16 active projects. |
| `public/icons/favicon-{128,152,167,192,196}.png` | No active shell reference; 32px and 180px icons plus `public/favicon.ico` remain active/fallback assets. |
| `app/assets/images/profile-logo.svg` | Unused image; the active logo is a Vue SVG component. |
| `app/assets/images/portrait.webp` | Retained duplicate; `public/portrait.webp` is canonical for About and metadata. |
