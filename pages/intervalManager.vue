<template>
  <v-card flat>
    <v-btn @click="showDep = !showDep" color="primary">Show Dependecy</v-btn>
    <v-btn @click="reset" color="primary">Reset</v-btn>
    <v-row>
      <v-col :cols="displayInterval">
        <datagrid
          :actualHeader="invHeaders"
          :allitems="intervals"
          :showHeader="showInvHeaders"
          :defaultItem="defaultItem"
          name="Intervals"
          type="I"
          :edit="true"
          :del="true"
          @save="save"
        />
      </v-col>
      <v-col :cols="displayDep" class="mt-12">
        <simplegrid
          v-if="showDep"
          :items="dependencies"
          :headers="depHeaders"
          :defaultItem="defaultDep"
          name="Dependecy"
          type="D"
          :edit="false"
          :del="true"
          @save="save"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import datagrid from "@/components/datagrid"
import simplegrid from "@/components/simplegrid"

const showDep = ref(false)
const displayInterval = ref(12)
const displayDep = ref(0)
const intervals = ref([])
const dependencies = ref([])

const invHeaders = [
  {
    text: "Name",
    align: "start",
    value: "name",
  },
  { text: "Parent", value: "parent" },
  { text: "Release Date", value: "releasedate" },
  { text: "Start", value: "start" },
  { text: "Duration", value: "duration" },
  { text: "End", value: "end" },
  { text: "Actions", value: "actions" },
]

const depHeaders = [
  {
    text: "Name",
    align: "start",
    value: "name",
  },
  { text: "From", value: "from" },
  { text: "To", value: "to" },
  { text: "Actions", value: "actions" },
]

const defaultItem = {
  id: '',
  name: "",
  parent: "",
  releasedate: 0,
  start: 0,
  duration: 0,
  end: 0,
  display: "",
  padding: 0,
  children: [],
}

const defaultDep = {
  id: 0,
  name: "",
  from: "",
  to: "",
}

async function fetchIntervals() {
  console.log('fetchIntervals function called')
  try {
    console.log('About to make fetch request for intervals')
    const data = await $fetch('http://localhost:8000/getintervals', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log('Fetch request completed')

    console.log('Received intervals:', data)
    intervals.value = [] // Clear existing intervals
    
    if (data) {
      // Create a map of all intervals for easier lookup
      const intervalMap = new Map()
      
      // First pass: create all intervals with initialized children array
      for (const interval of data) {
        console.log('Processing interval:', interval)
        const intervalWithChildren = {
          id: interval.id || '',
          name: interval.name || '',
          parent: interval.parent || '',
          releasedate: interval.releasedate || 0,
          start: interval.start || 0,
          duration: interval.duration || 0,
          end: interval.end || 0,
          display: interval.display || true,
          padding: interval.padding || 0,
          children: [] // Always initialize children array
        }
        intervalMap.set(intervalWithChildren.name, intervalWithChildren)
        intervals.value.push(intervalWithChildren)
      }

      // Second pass: set up parent-child relationships using the map
      for (const interval of intervals.value) {
        if (interval.parent) {
          const parentInterval = intervalMap.get(interval.parent)
          if (parentInterval) {
            parentInterval.children.push(interval.name)
          }
        }
      }

      // Log the final structure for debugging
      console.log('Final intervals structure:', JSON.stringify(intervals.value, null, 2))
    }
    return true
  } catch (error) {
    console.error('Error fetching intervals:', error)
    return false
  }
}

async function fetchDependencies() {
  console.log('fetchDependencies function called')
  try {
    console.log('About to make fetch request for dependencies')
    const data = await $fetch('http://localhost:8000/getdependencies', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log('Fetch request completed')

    console.log('Received dependencies:', data)
    dependencies.value = [] // Clear existing dependencies
    if (data) {
      for (const dependency of data) {
        console.log('Adding dependency:', dependency)
        dependencies.value.push(dependency)
      }
    }
    return true
  } catch (error) {
    console.error('Error fetching dependencies:', error)
    return false
  }
}

async function save() {
  console.log('Save function called')
  const intervalsSuccess = await fetchIntervals()
  if (intervalsSuccess) {
    await fetchDependencies()
  }
}

function reset() {
  console.log('Reset function called')
  showDep.value = false
  displayInterval.value = 12
  displayDep.value = 0
}

console.log('Component script starting')
onMounted(async () => {
  console.log('Component mounted')
  const intervalsSuccess = await fetchIntervals()
  if (intervalsSuccess) {
    await fetchDependencies()
  }
})
</script>