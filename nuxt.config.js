export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // For Static deployment
  router: { 
    base: '/Portfolio/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Xavier Champoux\'s personal portfolio.' },
      { hid: 'author', name: 'author', content: 'Xavier Champoux' },
      { hid: 'keywords', name: 'keywords', content: 'portfolio, art, 3D, three.js' },
    ],
    script: [
      { src: '/CSSSupport.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/base.css',
    '~/assets/css/styles.css',
    '~/assets/scss/_reset.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/modules/Simplicity.js', mode: 'client'},
    {src: '~/plugins/modules/Three.js', mode: 'client'},
    {src: '~/plugins/modules/Anime.js', mode: 'client'},
    {src: '~/plugins/modules/Popmotion.js', mode: 'client'},
    // {src: '~/plugins/StickImage/index.js', mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['~/assets/scss/_reset.scss',],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
