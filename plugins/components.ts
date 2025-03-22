// Import components
import datagrid from '~/components/datagrid.vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Register components globally
  nuxtApp.vueApp.component('datagrid', datagrid)
}) 