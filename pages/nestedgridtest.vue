<template>
  <v-app>
    <v-main>
      <v-container>
        <DataGrid
          :actual-header="actualHeader"
          :allitems="allitems"
          :name="'Items'"
          :type="'I'"
          :default-item="defaultItem"
          @save="handleSave"
          @addDependency="handleAddDependency"
        />

        <!-- Dependency Dialog -->
        <v-dialog v-model="dependencyDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Add Dependency</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedDependency"
                      :items="availableDependencies"
                      item-title="name"
                      item-value="name"
                      label="Select Dependency"
                      :disabled="!dependencyParent"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDependencyDialog">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="saveDependency">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import DataGrid from '~/components/nestedgrid.vue'

const { initTheme } = useTheme()

const defaultItem = {
  name: '',
  parent: '',
  children: [],
  display: true,
  padding: 0,
  tags: [],
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
  iron: '0%',
  dependencies: []
}

const actualHeader = ref([
  {
    title: "Dessert (100g serving)",
    align: "start",
    sortable: false,
    key: "name",
  },
  { title: "Calories", key: "calories" },
  { title: "Fat (g)", key: "fat" },
  { title: "Carbs (g)", key: "carbs" },
  { title: "Protein (g)", key: "protein" },
  { title: "Iron (%)", key: "iron" },
  { title: "Tags", key: "tags" },
  { title: "Actions", key: "actions", sortable: false },
])

const allitems = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: "1%",
    children: ["Cupcake", "Eclair", "Ice cream sandwich"],
    parent: "",
    display: true,
    padding: 0,
    tags: ["Tag-1", "Tag-2"],
    dependencies: []
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: "1%",
    children: [],
    parent: "Frozen Yogurt",
    display: true,
    padding: 10,
    dependencies: []
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: "7%",
    children: [],
    parent: "Frozen Yogurt",
    display: true,
    padding: 10,
    dependencies: []
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: "8%",
    children: ["Donut", "KitKat"],
    parent: "Frozen Yogurt",
    display: true,
    padding: 10,
    dependencies: []
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: "16%",
    children: [],
    parent: "",
    display: true,
    padding: 0,
    dependencies: []
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: "0%",
    children: [],
    parent: "",
    display: true,
    padding: 0,
    dependencies: []
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: "2%",
    children: [],
    parent: "KitKat",
    display: true,
    padding: 30,
    dependencies: []
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: "45%",
    children: [],
    parent: "KitKat",
    display: true,
    padding: 30,
    dependencies: []
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: "22%",
    children: [],
    parent: "Cupcake",
    display: true,
    padding: 20,
    dependencies: []
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: "6%",
    children: ["Honeycomb", "Lollipop"],
    parent: "Cupcake",
    display: true,
    padding: 20,
    dependencies: []
  },
])

const dependencyDialog = ref(false)
const dependencyParent = ref(null)
const selectedDependency = ref(null)
const availableDependencies = ref([])

function handleAddDependency(item) {
  dependencyParent.value = item
  // Filter out the current item and its existing dependencies from available dependencies
  availableDependencies.value = allitems.value.filter(i => 
    i.name !== item.name && 
    !item.dependencies?.some(dep => dep.name === i.name)
  )
  dependencyDialog.value = true
}

function closeDependencyDialog() {
  dependencyDialog.value = false
  dependencyParent.value = null
  selectedDependency.value = null
}

function saveDependency() {
  if (!dependencyParent.value || !selectedDependency.value) return

  const dependency = allitems.value.find(i => i.name === selectedDependency.value)
  if (dependency) {
    if (!dependencyParent.value.dependencies) {
      dependencyParent.value.dependencies = []
    }
    dependencyParent.value.dependencies.push(dependency)
    closeDependencyDialog()
  }
}

function handleSave() {
  // Handle save event if needed
  console.log('Data saved')
}

// Initialize theme on mount
onMounted(() => {
  initTheme()
})
</script>

<style scoped>
/* Remove theme toggle styles */
</style> 