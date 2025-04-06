import { ref, watch } from 'vue'

export const useTheme = () => {
  const isDark = ref(false)

  // Initialize theme from localStorage
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') || 'light'
      isDark.value = savedTheme === 'dark'
      updateTheme(savedTheme)
    }
  }

  // Update theme in the DOM and localStorage
  const updateTheme = (theme: string) => {
    if (process.client) {
      // Update localStorage
      localStorage.setItem('theme', theme)
      // Update DOM attributes and classes
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.setAttribute('data-v-theme', theme)
      document.documentElement.classList.remove('v-theme--light', 'v-theme--dark')
      document.documentElement.classList.add(`v-theme--${theme}`)
      // Update Vuetify theme through data attribute
      document.documentElement.setAttribute('v-theme', theme)
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    const newTheme = isDark.value ? 'dark' : 'light'
    updateTheme(newTheme)
  }

  // Watch for theme changes
  watch(isDark, (newValue) => {
    const theme = newValue ? 'dark' : 'light'
    updateTheme(theme)
  })

  return {
    isDark,
    initTheme,
    toggleTheme
  }
} 