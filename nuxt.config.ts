import tailwindcss from "@tailwindcss/vite";
import { contentRoutes } from "./shared/data/projects";
import english from "./app/locales/en.json";
import french from "./app/locales/fr.json";

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
        pageTransition: false,
    },
    css: ["~/assets/css/main.css"],
    experimental: { viewTransition: true },
    compatibilityDate: "2026-11-15",
    nitro: {
        preset: "github-pages",
        prerender: {
            routes: [...contentRoutes, "/projects", "/fr/projects", "/sitemap.xml"],
            crawlLinks: false,
            failOnError: true,
        },
        hooks: {
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
        ssr: { noExternal: [/[/\\]shared[/\\]/] },
    },
    eslint: {
        config: { stylistic: { indent: 4, semi: true, quotes: "double" } },
    },
    fonts: {
        provider: "local",
        families: [
            { name: "Climate Crisis", weights: [400], styles: ["normal"] },
            { name: "Manrope", weights: ["200 800"], styles: ["normal"] },
            { name: "IBM Plex Mono", weights: [400], styles: ["normal"] },
        ],
    },
    i18n: {
        baseUrl: "https://xavierchampoux.com",
        locales: [
            { code: "en", language: "en-CA", name: "English", file: "en.json" },
            { code: "fr", language: "fr-CA", name: "Français", file: "fr.json" },
        ],
        strategy: "prefix_except_default",
        defaultLocale: "en",
        detectBrowserLanguage: false,
        restructureDir: "app/locales/",
        langDir: "",
    },
    icon: {
        provider: "none",
        cssLayer: "base",
        clientBundle: { scan: true, includeCustomCollections: true },
        customCollections: [{ prefix: "console", dir: "./app/assets/icons" }],
    },
});
