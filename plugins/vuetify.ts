import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1976D2',
            secondary: '#424242',
            surface: '#FFFFFF',
            'surface-variant': '#424242',
            'on-surface': '#000000',
          },
        },
        dark: {
          colors: {
            primary: '#2196F3',
            secondary: '#424242',
            surface: '#121212',
            'surface-variant': '#424242',
            'on-surface': '#FFFFFF',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)

  // Initialize theme from localStorage only on client side
  if (process.client) {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-v-theme', savedTheme)
    document.documentElement.setAttribute('v-theme', savedTheme)
    document.documentElement.classList.add(`v-theme--${savedTheme}`)
  }
}) 