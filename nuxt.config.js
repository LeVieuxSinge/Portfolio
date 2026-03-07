import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    modules: [
        "@nuxt/eslint",
        "@nuxt/image",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxtjs/i18n",
        "@vueuse/nuxt",
        "@tresjs/nuxt",
    ],

    ssr: false,

    devtools: { enabled: true },

    app: {
        head: {
            link: [
                // Favicons
                { rel: "icon", type: "image/png", href: "/icons/favicon-32.png", sizes: "32x32" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-128.png", sizes: "128x128" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-152.png", sizes: "152x152" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-167.png", sizes: "167x167" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-180.png", sizes: "180x180" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-192.png", sizes: "192x192" },
                { rel: "icon", type: "image/png", href: "/icons/favicon-196.png", sizes: "196x196" },
                // Android
                { rel: "shortcut icon", type: "image/png", href: "/icons/favicon-196.png", sizes: "196x196" },
                // IOS
                { rel: "apple-touch-icon", type: "image/png", href: "/icons/favicon-128.png", sizes: "128x128" },
                { rel: "apple-touch-icon", type: "image/png", href: "/icons/favicon-152.png", sizes: "152x152" },
                { rel: "apple-touch-icon", type: "image/png", href: "/icons/favicon-180.png", sizes: "180x180" },

                // Icons
                { prefetch: true, rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" },
            ],
        },

        // Transitions
        pageTransition: {
            name: "page",
            css: true,
            mode: "out-in",
            appear: true,
        },
    },
    css: ["~/assets/css/main.css"],

    compatibilityDate: "2025-07-15",

    vite: {
        plugins: [
            // Tailwind CSS
            tailwindcss(),
        ],
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
            },
        },
    },

    fonts: {
        provider: "google",
        families: [
            { name: "Anton", weights: [400] },
            { name: "Lexend", weights: [400, 800] },
            { name: "VT323", weights: [400] },
        ],
    },

    i18n: {
        locales: [
            { code: "en", name: "English", file: "en.ts" },
            { code: "fr", name: "Français", file: "fr.ts" },
        ],
        strategy: "no_prefix",
        defaultLocale: "en",
        restructureDir: "app/locales/",
        langDir: "",
    },
});
