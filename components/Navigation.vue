<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          @click="drawer = false"
        >
          <template v-slot:prepend>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify.js</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)

const items = [
  { title: 'Welcome', icon: 'home', to: '/' },
  { title: 'Inspire', icon: 'chart-bubble', to: '/inspire' },
  { title: 'Intervals', icon: 'apps', to: '/intervalManager' },
  { title: 'Time Graph', icon: 'application', to: '/timeGraph' }
]
</script>

<style scoped>
.v-navigation-drawer {
  z-index: 100;
}

.v-app-bar {
  z-index: 99;
}
</style> 