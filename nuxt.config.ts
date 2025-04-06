// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
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
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#1867C0',
              secondary: '#5CBBF6',
            },
          },
          dark: {
            colors: {
              primary: '#2196F3',
              secondary: '#424242',
            },
          },
        },
      },
    },
  },
})