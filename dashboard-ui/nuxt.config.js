export default {
  ssr    : false,
  target : 'static',
  loading: {
    color : '#3480eb',
    height: '2px'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title    : 'dashboard-ui',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name   : 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid    : 'description',
        name   : 'description',
        content: ''
      },
      {
        name   : 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel : 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/api/index',
    '@/plugins/auth/index'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended):
  // https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-vite'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3009/api'
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3009'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  server: {
    port: 8009
  }
}
