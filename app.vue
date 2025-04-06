<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="miniVariant" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click="right = !right">
          <template v-slot:prepend>
            <v-icon light>mdi-repeat</v-icon>
          </template>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const drawer = ref(false)
const clipped = ref(true)
const fixed = ref(false)
const miniVariant = ref(false)
const right = ref(true)
const rightDrawer = ref(false)
const title = ref('Interval Tree')

const items = ref([
  {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '/'
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'Inspire',
    to: '/inspire'
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'Intervals',
    to: '/intervalManager'
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'Time Graph',
    to: '/aggregationManager'
  }
])
</script>
