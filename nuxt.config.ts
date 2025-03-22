// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: ['@invictus.codes/nuxt-vuetify'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
      styles: { configFile: 'assets/settings.scss' },
      autoImport: true,
      useVuetifyLabs: true,
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
      display: {
        mobileBreakpoint: 'sm',
      },
    },
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
    }
  },
  compatibilityDate: '2025-03-15',
})