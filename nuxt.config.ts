import { site, siteLocales } from "./shared/data/site";
import tailwindcss from "@tailwindcss/vite";
import { contentRoutes } from "./shared/data/projects";
import english from "./app/locales/en.json";
import french from "./app/locales/fr.json";

/** Build-time configuration: prerender readable bilingual HTML and bundle every runtime font/icon locally. */
export default defineNuxtConfig({
    modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxtjs/i18n", "@vueuse/nuxt"],
    ssr: true,
    devtools: { enabled: false },
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            meta: [{ name: "theme-color", content: "#111211" }],
            link: [
                { rel: "icon", type: "image/png", href: "/icons/favicon-32.png", sizes: "32x32" },
                { rel: "apple-touch-icon", href: "/icons/favicon-180.png" },
            ],
        },
        // The shared motion controller owns visible transitions; avoid a second Vue transition system.
        pageTransition: false,
    },
    css: ["~/assets/css/main.css"],
    // Native snapshots only bridge an already opaque handoff; AnimeJS controls the visible choreography.
    experimental: { viewTransition: true },
    compatibilityDate: "2026-11-15",
    nitro: {
        preset: "github-pages",
        prerender: {
            // Explicit catalog routes make missing pages fail the build without crawling external destinations.
            routes: [...contentRoutes, "/projects", "/fr/projects", "/sitemap.xml"],
            crawlLinks: false,
            failOnError: true,
        },
        hooks: {

            /**
             * Append a bilingual, index-disabled no-JavaScript error fallback to the generated 404 only; escape translated text before interpolating HTML.
             */
            "prerender:generate"(route) {
                if (route.route !== "/404.html" || !route.contents) return;

                const escapeText = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                const sections = ([["en", english], ["fr", french]] as const).map(([locale, messages], index) => {
                    const copy = messages.pages.error;
                    const heading = index === 0 ? "h1" : "h2";

                    return `<section lang="${locale}" style="max-width:65ch;margin-bottom:40px"><${heading}>${escapeText(copy.title)}</${heading}><p style="margin:24px 0">${escapeText(copy.description)}</p><a style="text-decoration:underline" href="${locale === "fr" ? "/fr" : "/"}">${escapeText(copy.home)}</a></section>`;
                });
                const fallback = `<noscript><main style="min-height:100svh;padding:8vh 4vw;background:#111211;color:#eeeee7">${sections.join("")}</main></noscript>`;

                route.contents = route.contents.replace("</head>", "<meta name=\"robots\" content=\"noindex\"></head>").replace("</body>", `${fallback}</body>`);
            },
        },
    },
    vite: {
        plugins: [tailwindcss()],
        // Shared typed records are application source, including during server-side generation.
        ssr: { noExternal: [/[/\\]shared[/\\]/] },
    },
    eslint: {
        config: { stylistic: { indent: 4, semi: true, quotes: "double" } },
    },
    fonts: {
        // Retained files/licenses live in public/fonts; no hosted font provider is used.
        provider: "local",
        families: [
            { name: "Climate Crisis", weights: [400], styles: ["normal"] },
            { name: "Manrope", weights: ["200 800"], styles: ["normal"] },
            { name: "IBM Plex Mono", weights: [400], styles: ["normal"] },
        ],
    },
    i18n: {
        baseUrl: site.origin,
        locales: siteLocales.map(locale => ({ ...locale })),
        strategy: "prefix_except_default",
        defaultLocale: "en",
        // The explicit URL is authoritative on static hosting, including direct French entry.
        detectBrowserLanguage: false,
        restructureDir: "app/locales/",
        langDir: "",
    },
    icon: {
        // Scan and bundle used glyphs at build time; never depend on an icon API at runtime.
        provider: "none",
        cssLayer: "base",
        clientBundle: { scan: true, includeCustomCollections: true },
        customCollections: [{ prefix: "console", dir: "./app/assets/icons" }],
    },
});
