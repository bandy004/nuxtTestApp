<template>
  <v-container>
    <DataGrid
      :actual-header="actualHeader"
      :allitems="allitems"
      :name="'Intervals'"
      :type="'I'"
      :default-item="defaultItem"
      :endpoint="endpoint"
      :load-endpoint="loadEndpoint"
      @save="handleSave"
    />
  </v-container>
</template>

<script setup>
import DataGrid from '~/components/datagrid.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const endpoint = '/addinterval'
const loadEndpoint = '/getintervals'

const defaultItem = {
  name: '',
  duration: '',
  releasedate: '',
  parent: '',
  children: [],
  start: '',
  end: '',
  tags: []
}

const actualHeader = ref([
  {
    title: "Name",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Duration", key: "duration" },
  { title: "Release Date", key: "releasedate" },
  { title: "Parent", key: "parent" },
  { title: "Start", key: "start" },
  { title: "End", key: "end" },
  { title: "Tags", key: "tags" },
  { title: "Actions", key: "actions" },
])

const allitems = ref([])

async function loadIntervals() {
  try {
    console.log('Loading intervals from:', `${apiBase}/getintervals`)
    const { data } = await useFetch(`${apiBase}/getintervals`)
    console.log('Received intervals data:', data.value)
    if (data.value) {
      allitems.value = Object.values(data.value)
      console.log('Updated allitems:', allitems.value)
    }
  } catch (error) {
    console.error('Error loading intervals:', error)
  }
}

onMounted(() => {
  console.log('Component mounted, initializing...')
  loadIntervals()
})

async function handleSave() {
  console.log('handleSave called in intervalManager')
  await loadIntervals()
}
</script> 