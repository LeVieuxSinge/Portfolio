# Portfolio Website Rework

## 1. Purpose and scope

Build a new Nuxt 4 application in the existing repository, using Vue 3, TypeScript, and Tailwind CSS 4. Treat existing implementation code as reference material requiring review before reuse.

The portfolio must support applications in **Frontend Development, UI/UX Design, Technical Art, and Programming**. Demonstrate these disciplines through project evidence, visual design, and interaction. Mention industrial robotics and automation in About as an interest and potential career direction.

The main visitor journey is **Home → Work → About and CV**. Work focuses on selected projects; Archive is a separate collection reached through the menu. Contact information appears toward the end of About.

The first public release includes all pages and complete English/French content in the agreed **dark-only** visual system. [DESIGN_V4.md](DESIGN_V4.md) is the final visual handoff and supersedes conflicting V1–V3 proposals. Application implementation follows design review; the V4 documentation task changes no application code, routes or dependencies.

## 2. Pages and shared experience

### Home

- Use the lower content/action placement from V3 Four Statements, with the entire large display-text area left empty. Do not render the four oversized statements, Art × Technology, machine, intro or a visible placeholder. A semantic portfolio heading may be visually hidden.
- Keep the shared header, lower-left introduction/curiosity copy and four profile badges, plus lower-right Work/About actions. Retain “A little curiosity goes a long way,” with complete French copy. Mobile content uses full available width; Work/About are equal-width flex links spread across the row. Cap the lower content block at 640px on intermediate mobile widths.
- Fit the normal page to the available viewport height. Never render the scroll control on Home. Allow content to grow vertically for enlarged text rather than clipping it or locking scrolling.
- The blank area is reserved for future implementation work. A possible pen-triggered interactive easter egg remains outside launch scope.

### Work

- Show only **Feltkutur → Ryker → Schluter → Simona**, in the same visual, document and mobile order.
- Finalize V3's large-row list. Keep the upper-right introduction and oversized heading below it. Do not add arrows beside project names or a list/grid toggle.
- Desktop headers are index, Project, Role, Tags and Year. Profiles use rounded swatch badges with the same horizontal row-wrap behavior as tool/technique tags.
- At widths of 700px and below, keep visible headers and only index, Project and Year columns. Hide list roles/tags visually and from the accessibility tree; project details retain them.
- Keep image-only pointer/focus previews on desktop and text-only touch rows. Use Surface for the active row and an independent focus outline.
- Preserve the About/CV invitation and understated footer. Archive browsing/filter controls stay on Archive.

### Archive

- Show the **12 remaining active projects**, excluding the four selected works and Portfolio V1/V2. The menu is its only global-navigation entry; direct URLs and history still work.
- Finalize rounded filter controls and profile/tag badges. Desktop columns: index, Project, Role, Tags, Year. Mobile retains headers and only index, Project, Year; filtering remains available.
- Use four canonical profiles rather than the six contribution labels. Preserve original project contributions internally and derive badges/filter membership using the mapping below; multiple profiles can belong to one project.
- Stable profile IDs are `frontend`, `uiux`, `art`, `programming`, in that order. Frontend Developer/WebGL Developer → Frontend Development; UI/UX Designer → UI/UX Design; 3D Artist → Technical Art; Game Developer/Programmer → Programming. Deduplicate.
- Future URL contract: `role=<profile-id>` and `sort=newest|oldest|title`. Default to all profiles/newest. Normalize legacy contribution IDs through the same mapping; invalid roles become all, invalid sort becomes newest. Preserve state through language changes and restore scroll position through browser history.
- Active rows use Surface. Pointer previews are larger floating images only, without added names, years, captions, frames or borders. Clamp clear of active text, header and scroll control. Keyboard gets a stationary preview and visible outline; touch gets no preview; reduced motion removes pursuit/tilt.
- Tags describe tools/techniques. Retain Schluter's Technical Art context and Unreal Engine 4, Level Creation and Blueprint tags.

### About

Arrange content as:

1. Three personal statements, refined from the existing art/technology, problem-solving/automation, and personal-interests passages.
2. Four capability sections describing capabilities and their development stacks, without project links below the profiles. Include the separate “What I do” and “What motivates me” lists from the supplied About reference.
3. A compact CV timeline covering experience, education, awards, teaching, and public presence.
4. A short statement about industrial robotics and automation.
5. Discreet contact and professional links.

Preserve the conversational voice and humor. Refine these source ideas in both languages:

- Enjoying the space between art and technology, moving between them and building bridges.
- Enjoying problem-solving and automating things whenever possible.
- Developing indie games independently, with interests in data, finance, learning, and technology.

Include the existing themes of web development, 3D and real-time graphics, UI/UX design, game development, tools and pipelines, procedural work, automation, simulation, optimization, aesthetics, and organization.

Preserve these visible lists, with complete French translations:

- **What I do:** Web Development; 3D & Real-time Graphics; UI/UX Design; Game Design & Development; Tools & Pipelines.
- **What motivates me:** Procedural; Automation; Simulation; Optimization; Aesthetics; Organization.

Use the supplied [About layout](docs/refs/About.jpg) and retained About data as the stack source:

| Profile | Development stack |
|---|---|
| Frontend Development | Nuxt, Vue, Tailwind CSS, TypeScript, Three.js, Node.js |
| UI/UX Design | Figma, Adobe XD, Miro, Adobe Photoshop, Adobe Illustrator |
| Technical Art | Blender, Unreal Engine, Substance Painter, Houdini |
| Programming | TypeScript, C++, Python, PowerShell |

These are tool lists, not claims of equal proficiency. Use V3's stronger personal chapters and portrait/list sidebar for the opening. From **Four profiles. One curious mind.** onward, use full content width for the four profiles, CV, robotics interest and contact. Profiles retain their stacks without project links. Restore V2-style underlines beneath major section labels. Use broad CV date/position/organization columns, with no separate rule above Experience. Keep reading paragraphs around 65 characters wide and linearize the layout on mobile.

Use existing CV entries as source material, with factual review before publication. Keep entries concise: dates, role or qualification, organization, and location where relevant. The readable web CV is the launch deliverable.

Contact links:

- [xavierchampoux@hotmail.com](mailto:xavierchampoux@hotmail.com)
- [GitHub](https://github.com/LeVieuxSinge)
- [Instagram](https://www.instagram.com/doldmnk/)
- [LinkedIn](https://www.linkedin.com/in/doldmnk/)
- [YouTube](https://www.youtube.com/@levieuxsinge1168)

Use the supplied About contact list; retain applicable repository links on project pages.

### Individual projects

- Use a broad masthead and compact metadata strip with rounded profile/tag badges, followed by the first media item in source order, concise context/contribution and a spacious single-column media sequence. Profiles wrap horizontally like tags. Project facts always use flex: a desktop row and a mobile vertical definition list with one Client/Role/Tags/Year entry at a time; never a grid.
- The source media array is authoritative. A first video leads; never insert the cover before it or sort assets by type. Remove each media item's visible caption; keep meaningful localized alternative descriptions and team credits in the project context.
- Keep images/videos inline without enlargement, lightboxes, zoom dialogs or fullscreen controls. Constrain portrait screenshots and preserve source proportions in the default layout.
- Videos autoplay muted inline when visible and ready; pause off-screen and when the document is hidden. No visible toolbar, seeking or audio controls. The surface supports click/tap and Enter/Space pause/resume. Show minimal Play when activation is needed, including blocked playback, manual pause, reduced motion or data-saving preferences. Never enable sound automatically.
- Selected-work projects end with **Back to Work**. Archive projects end with **Previous / Next** following the preserved profile-filtered/sorted Archive sequence. Direct visits use newest-first with stable slug tie-breaking. Omit unavailable neighbors rather than wrapping; never include selected works. Browser Back restores Archive state and scroll position.
- Retain applicable live/demo/repository links and explicit team/model credits. Review contribution facts before publication.
- Optional future treatment: expand only the first video from content width to 100vw × 100svh as it passes through the viewport, then continue the ordered sequence. Cover cropping must be acknowledged. This is not the default and adds no duplicate media or enlargement view; reduced motion stays in normal flow with a contained poster.

### Header and layout

- Keep a compact fixed header with adequate content clearance. Place the colored logo, Xavier Champoux and **Design. Connect. Automate. Create** on the left, with a localized French equivalent.
- Keep uppercase EN/FR and menu controls on the right. Use approximately 11px visible labels and 16px icons while retaining at least 44px targets. Reduce the visible logo to about 28px desktop / 23px mobile; allow the French descriptor to wrap on narrow screens.
- Use English at / and French under /fr. Language switching preserves the equivalent page and relevant query state. Locale identifiers in routes remain lowercase.
- Use the **dark palette only**, independent of system theme. Do not include a theme switch, light variant, sun/moon icon or theme-preference flow.
- Remove the rule below the header and above the footer. Keep useful internal separators in lists and CV rows, except for the explicitly removed rule above Experience.
- Use a fluid, full-width desktop grid with roughly 4vw gutters and a 56px minimum; use 20px mobile gutters. Remove the former 1120px page cap. Limit reading paragraphs to about 65 characters and bound media by viewport/intrinsic dimensions where appropriate.
- Default to about 160px between major desktop sections and 80px on mobile. Let the site breathe even when this increases document height.
- Keep the desktop bottom-right arrow/percentage in the outer gutter. Mobile uses a **56px circular FAB** floating over content, 20px from the right and 20px plus the safe area from the bottom. Put small progress numbers under the arrow inside it. Fill its outline clockwise from twelve o’clock. Remove the fixed mobile utility strip and added bottom clearance; align the scroll indicator with the footer/content end. Use down at the top and up after scrolling. Never show it on Home, menu or loading.
- Underlined actions retain a 45° up-right arrow and one out/in underline cycle on hover/focus, with slide-in for secondary actions. Retain independent focus outlines and static reduced-motion feedback.
- Use **Lenis 1.3.27** for eased desktop wheel and mobile touch movement, anchors and return-to-top; use AnimeJS for coordinated effects. One scroll owner drives progress. Remove the competing AnimeJS scroll-position proxy. Disable smoothing under reduced motion; preserve keyboard scrolling, zoom and nested controls; cancel requested movement on manual input and suspend page motion behind the menu. See [Lenis](https://github.com/darkroomengineering/lenis) and [AnimeJS onScroll](https://animejs.com/documentation/events/onscroll/).
- Tooltips use Paper background, Ink text, a subtle Line border and **4px corners**. Keep localized hover/focus text, accessible names and Escape dismissal; retain at least 44px targets.

### Menu View

- Keep Home, Work, Archive and About in that order in a full-screen menu. Combine V1 numbered rows/separators/up-right arrows with V3 A's large type and vertical spacing. Make whole rows span the full content width.
- Keep the compact current header. Do not restore Explore, a range heading, machine, caption, footer or theme control.
- Support Escape, focus containment/restoration, background inertness and scroll locking. Stop underlying inertia while open; allow menu content to scroll when enlarged text requires it.

### Loading View and navigation

- Full-screen dark field, **no logo**. Reuse all 16 existing English/French loading messages at top-left; keep the large typographic percentage bottom-right. No header, footer, tagline, central caption or press-any-key gate.
- Loading sentences use uppercase IBM Plex Mono, a compact 4px message gap without minimum row height, and Google Material Icons chevron_right as the console prompt. Keep the corpus unchanged and apply uppercase in presentation. Newest sentence appears at the top and moves history down. At most five remain, with opacity 100%, 80%, 60%, 40%, 20%. Add a non-repeating sentence about every 800ms while loading persists. Once all 16 have appeared, hold the last five instead of repeating. Reduced motion updates without sliding.
- The playful log is separate from genuine readiness. Percent measures completed essential tasks, never a simulated timer; do not delay to show five sentences or wait for gallery media. Dismiss immediately when usable. Optional media failure must not hold the page at 99%; provide usable fallback/retry for essential failure.
- In-page navigation does not replay document-entry loading. Coordinate route transitions with focus/history and reduced motion; do not run competing transition systems.

### Deferred interactive experience

The earlier procedural machine and four-step intro are outside the current launch scope. Their design history remains in DESIGN.md and DESIGN_V2.md. A future curiosity-triggered easter egg, possibly activated by picking up a pen, needs a separate brief and accessibility review. No current route, state machine, loading milestone, 3D asset or acceptance check depends on it.

## 3. Visual system and preservation rules

### Colors

Keep the agreed palette as semantic Tailwind tokens:

| Token | Dark value |
|---|---|
| Paper | `#111211` |
| Surface | `#191a19` |
| Ink | `#eeeee7` |
| Muted | `#a1a39c` |
| Line | `#393b36` |
| Frontend | `#649c91` |
| UI/UX | `#6F4E4C` |
| Technical Art | `#BE8B61` |
| Programming | `#DEDED8` |

Use paper/ink for the main composition and capability colors for the identity and accents. Role/tag presentation may stay neutral. Keep ordinary text in colors that meet contrast requirements.

### Fonts

| Usage | Font |
|---|---|
| Major headings and short display statements | “Climate Crisis”, sans-serif |
| Body text and smaller headings | “Manrope”, sans-serif |
| Labels and metadata | “IBM Plex Mono”, monospace |

Load fonts through [Nuxt Fonts](https://nuxt.com/modules/fonts). Use a consistent Material Symbols collection through [Nuxt Icon](https://nuxt.com/modules/icon), bundling required icons for static hosting.

### Logo

Rework the existing [ProfileLogo](app/components/ProfileLogo.vue), using [profile-logo.svg](app/assets/images/profile-logo.svg) as the geometry reference, into four independently colored SVG shapes with dark-theme outlines and instance-safe SVG identifiers. The logo stays colored at rest.

| Shape | Discipline |
|---|---|
| Top-left | Frontend Development |
| Top-right | UI/UX Design |
| Bottom-left | Technical Art |
| Bottom-right | Programming |

### Existing components and styles

- Retain [AnimatedNoise](app/components/AnimatedNoise.vue) and [CustomCursor](app/components/CustomCursor.vue). Limit changes to necessary integration, defect, accessibility, or compatibility fixes.
- Fix the noise component’s missing effect class. Preserve required cursor/noise utilities or update their references when replacing old tokens.
- Enable pointer decoration only for appropriate devices; provide reduced-motion behavior.
- Use Tailwind utilities and theme tokens for styling. Keep global styles in [main.css](app/assets/css/main.css).
- Remove legacy styles and dependencies only after confirming they are unused.

### Inspiration

- [Sharlee](https://itssharl.ee/): reference for the single-frame presentation and arrival experience.
- [Lucas Lima](https://www.lucaslima.design/): reference for black and white ink type design.
- [Matthieu Givelet](https://matthieugivelet.com/archive): reference for archive presentation and layout.
- [Mike Wilcock](https://mikewilcockdesign.com/): reference for the work/archive page, animation and motion design techniques, page transitions.
- [Guillaume Zhu](https://guillaumezhu.com/): reference for the loading view, animation and motion design techniques
- [Juan Mora Romero](https://www.juanmoraromero.com/): reference for layout, composition, synchronized gallery metadata, and motion design techniques.
- [Awwwards](https://www.awwwards.com/): selective visual and motion inspiration within the agreed scope.
- [Dribbble](https://dribbble.com/): reference for UI/UX design inspiration and trends.
- [CollectUI](https://collectui.com/): reference for curated UI design inspiration.
- [CanvasUI](https://canvasui.dev/): reference for interactive WebGL/WebGPU effects.

## 4. Architecture, content, and deployment

### Application architecture

- Stay on **Nuxt 4**. Use Composition API and `<script setup lang="ts">`.
- Rebuild the app shell and features within [app](app/), preserving current user edits and reviewing retained assets individually.
- Prerender content with SSR enabled at build time; Home has readable supporting copy and links, with no required browser-only 3D scene. Static generation should produce readable HTML rather than the existing empty SPA shell. See [Nuxt static hosting guidance](https://nuxt.com/docs/4.x/getting-started/deployment).
- Retain `/project/:slug`; introduce `/work`, `/archive`, and `/about`, with French equivalents. Serve Archive at `/archive` and `/fr/archive`. Provide static-compatible redirects from the former `/projects` URLs to Work.
- Generate all localized routes from the active catalog: initially **40 content pages** (four collection/static pages and 16 project pages per language), plus error and compatibility pages.
- Keep a pure typed catalog importable by both the application and generation configuration. Derive paths from slugs rather than storing duplicate route strings.
- Give substantial features clear ownership: the shell coordinates overlays and navigation, archive controls own their browsing state, and Lenis owns document scrolling while AnimeJS coordinates visual effects.

### Content contracts and authoring

Maintain structured project/CV data in the repository and translated text in [English](app/locales/en.json) and [French](app/locales/fr.json) locale files.

| Type | Required information |
|---|---|
| Project | Stable slug, title, year, original contribution role IDs, derived canonical profile IDs, tag IDs, optional featured order, hero, ordered media, external links, localized content reference |
| Project copy | Summary, description/context, contribution; optional process and outcomes |
| Media | Image/video type, source, dimensions, localized alternative descriptions (no default visible captions), video poster where applicable |
| CV entry | Section, dates, organization, localized role/qualification, optional location |

Draft and refine English and French copy for your review. Use existing content as evidence; flag missing facts rather than inventing achievements or responsibilities.

Use featured order to determine collection membership: the four selected projects appear on Work, and the remaining 12 appear in Archive. Both collections link to the same individual-project template without duplicating project records.

The current source inventory has 16 active projects. Revalidate the retained local image/video paths against the current catalog during migration; documentation audits record the current inventory.

### Search and sharing

Provide localized titles, descriptions, canonical URLs, language alternates, social previews, sitemap, robots configuration, and useful missing-project/404 pages.

### Deployment

Keep GitHub Pages and `xavierchampoux.com`. Update CI to **Node 24.15+ within Node 24**, use a frozen pnpm lockfile, generate static output, and deploy through GitHub Actions. Consolidate the older competing deployment script.

Build and verify the complete application before publishing. Design review and content review are explicit checkpoints before the first public release.

## 5. Ordered tasks, skills, and acceptance

All Vue implementation tasks use **vue-best-practices** and **vue**. Read the applicable skill instructions before implementation. The available **nuxt** skill also contains Nuxt 5 guidance, so verify applicability against this project’s Nuxt 4 version.

| Order | Task | Additional relevant skills |
|---|---|---|
| 1 | Audit retained code/assets; establish Nuxt 4 shell, rendering, routes, localization, and CI | **nuxt**, **vue-router-best-practices** |
| 2 | Implement dark tokens, typography, logo, header, menu, loading and locale controls | **nuxt**, **vueuse-functions** |
| 3 | Build typed content, selected Work, the separate Archive with filters and hover previews, About, project pages, and bilingual copy | **nuxt**, **vue-router-best-practices**, **vueuse-functions** |
| 4 | Integrate Lenis wheel/touch/anchor scrolling, AnimeJS effects, tooltips and radial FAB progress | **nuxt**, **vueuse-functions** |
| 5 | Verify behavior, accessibility, performance and release readiness | **computer-use:computer-use**; **vue-debug-guides** for observed Vue issues |
| 6 | Update [README](README.md) with setup, structure, content editing, assets, checks and deployment | No dedicated documentation skill required |

No dedicated Tailwind or AnimeJS skill is available; consult their official documentation. Custom shaders, generated raster assets, Figma deliverables, and Sites hosting are outside the agreed launch requirements.

### Acceptance checks

- [ ] Lint, type checking, focused automated checks, and static generation pass.
- [ ] Catalog checks validate unique slugs, role/tag references, featured order, media paths, and required translations; Work and Archive form non-overlapping collections covering all 16 active projects.
- [ ] Every English/French route supports direct loading, refresh, internal navigation, and browser Back/Forward.
- [ ] Work shows only the four selected projects; Archive shows the other 12 and is linked only from the menu in both languages.
- [ ] Archive filtering, sorting, previews, and restored browsing state, including scroll position after browser Back from a project, work across input methods.
- [ ] Home retains supporting copy, four profile badges and Work/About actions; its large display area stays empty and no scroll control is rendered. Machine, intro, theme controls and menu footer are absent.
- [ ] Touch, keyboard-only use, reduced motion, unavailable storage and unavailable View Transitions are verified.
- [ ] Menu focus handling, dark-theme contrast, text enlargement, media controls, and small-screen layouts are verified.
- [ ] The new header descriptor, small controls, fluid full-width grid, generous spacing, 45° action arrows and bottom-right arrow/progress tooltip match DESIGN_V4.md.
- [ ] Project media follows data order, video-first records lead with video, muted autoplay has a usable blocked/reduced-motion fallback, and no enlargement view remains. Project footers differ correctly by collection.
- [ ] Lenis eases wheel/touch and requested moves without conflicting scroll owners; user interruption, keyboard input, zoom, menu locking, progress ring, tooltip and reduced-motion behavior work across navigation without accumulating listeners.
- [ ] Both languages, project contributions/credits, CV facts and links are reviewed before release.
- [ ] README is updated and the complete launch scope passes these checks before publication.

### Review checkpoints and defaults

- Review the V4 final handoff before application implementation. The possible interactive easter egg requires a future brief.
- Review drafted English/French copy, project attribution, and CV facts before publication.
- Keep all 16 active projects, split into four selected projects on Work and 12 other projects in Archive; the previous portfolio versions remain outside the launch inventory.
- Use the supplied About contact list, including GitHub, and the readable web CV for launch.
