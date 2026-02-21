import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    modules: [
        "@nuxt/eslint",
        "@nuxt/image",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxtjs/i18n",
        "@pinia/nuxt",
        "@vueuse/nuxt",
    ],

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
        // pages: false,
        strategy: "prefix",
        defaultLocale: "en",
        restructureDir: "app/locales/",
        langDir: "",
    },

    // Target: https://go.nuxtjs.dev/config-target
    // target: 'static',

    // For Static deployment
    // router: {
    //   base: '/Portfolio/',
    // },

    // Exlude route from static build
    // generate: {
    //   exclude: [
    //     /^\/projects/,
    //   ]
    // },

    // Custom Loading (https://nuxtjs.org/docs/2.x/features/loading)
    //   loading: '~/components/Loading.vue',

    // Transitions
    //   pageTransition: {
    //     name: 'page',
    //     css: true,
    //     mode: 'out-in',
    //     appear: true,
    //   },

    // Global CSS: https://go.nuxtjs.dev/config-css
    //   css: [
    //     '~/assets/scss/_reset.scss',
    //   ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    //   plugins: [
    //     {src: '~/plugins/modules/Simplicity.js', mode: 'client'},
    //     {src: '~/plugins/modules/Three.js', mode: 'client'},
    //     {src: '~/plugins/modules/Anime.js', mode: 'client'},
    //     {src: '~/plugins/modules/Popmotion.js', mode: 'client'},
    //     {src: '~/plugins/Environments.js', mode: 'client'},
    //   ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    //   components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    //   buildModules: [
    //   ],

    // Modules: https://go.nuxtjs.dev/config-modules
    //   modules: [
    //     '@nuxtjs/style-resources',
    //   ],

    //   styleResources: {
    //     scss: ['~/assets/scss/_reset.scss',],
    //   },

    // Build Configuration: https://go.nuxtjs.dev/config-build
//   build: {
//     // transpile: [
//     //   'three'
//     // ],
//   }
});
