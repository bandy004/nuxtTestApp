<template>
  <v-data-table
    :headers="actualHeader"
    :items="allitems"
    :items-per-page="10"
    class="elevation-1"
    :show-select="false"
    :hover="true"
    :density="'comfortable'"
    :header-props="{
      class: 'font-weight-bold text-h6 text-white',
      style: 'background-color: rgb(var(--v-theme-primary))'
    }"
  >
    <template v-slot:header="{ columns }">
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.title }}
        </th>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark v-bind="props"> New Item </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" v-for="header in actualHeader" :key="header.key">
                    <v-text-field
                      v-if="header.key !== 'actions' && header.key !== 'tags'"
                      v-model="editedItem[header.key]"
                      :label="header.title"
                    ></v-text-field>
                    <v-combobox
                      v-if="header.key === 'tags'"
                      v-model="editedItem[header.key]"
                      :label="header.title"
                      multiple
                      chips
                      closable-chips
                      :items="Object.keys(tagColors)"
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            variant="text"
            color="primary"
            v-bind="props"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="editItem(item)">
            <template v-slot:prepend>
              <v-icon>mdi-pencil</v-icon>
            </template>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteItem(item)">
            <template v-slot:prepend>
              <v-icon>mdi-delete</v-icon>
            </template>
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:item.tags="{ item }">
      <v-chip
        v-for="tag in item.tags"
        :key="tag"
        class="ma-1"
        :color="getTagColor(tag)"
        text-color="white"
        size="small"
      >
        {{ tag }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const props = defineProps({
  actualHeader: {
    type: Array,
    required: true
  },
  allitems: {
    type: Array,
    required: true
  },
  defaultItem: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  edit: {
    type: Boolean,
    default: true
  },
  del: {
    type: Boolean,
    default: true
  },
  endpoint: {
    type: String,
    required: true
  },
  loadEndpoint: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save'])

const dialog = ref(false)
const editedIndex = ref(-1)
const editedItem = ref({ ...props.defaultItem })
const { post, get } = useApi()

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

const tagColors = {
  'high': 'error',
  'medium': 'warning',
  'low': 'success',
  'urgent': 'error',
  'normal': 'info',
  'completed': 'success',
  'pending': 'warning',
  'in-progress': 'info'
}

function getTagColor(tag) {
  const lowerTag = tag.toLowerCase()
  return tagColors[lowerTag] || 'primary'
}

function editItem(item) {
  editedIndex.value = props.allitems.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

async function deleteItem(item) {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      console.log('Deleting item:', item.name)
      const response = await post('/deleteinterval', { name: item.name })
      console.log('Delete response:', response)
      
      if (response && response.status === 'success') {
        const index = props.allitems.indexOf(item)
        props.allitems.splice(index, 1)
        emit('save')
      } else {
        console.error('Delete failed:', response)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
}

function close() {
  console.log('Closing dialog...')
  dialog.value = false
  nextTick(() => {
    console.log('Resetting form state...')
    editedItem.value = Object.assign({}, props.defaultItem)
    editedIndex.value = -1
  })
}

async function save() {
  try {
    console.log('Starting save process...')
    // Prepare the interval data
    const intervalData = {
      name: editedItem.value.name,
      duration: editedItem.value.duration,
      releasedate: editedItem.value.releasedate,
      parent: editedItem.value.parent,
      children: editedItem.value.children || [],
      start: editedItem.value.start,
      end: editedItem.value.end,
      tags: editedItem.value.tags || []
    }
    console.log('Sending data to endpoint:', props.endpoint, intervalData)

    // Make API call to the provided endpoint
    const response = await post(props.endpoint, intervalData)
    console.log('API response:', response)
    
    if (response) {
      console.log('Save successful, updating local data')
      if (editedIndex.value > -1) {
        // Update existing item
        Object.assign(props.allitems[editedIndex.value], editedItem.value)
      } else {
        // Add new item
        props.allitems.push(editedItem.value)
      }
      console.log('Closing dialog and emitting save event')
      close()
      emit('save')
    }
  } catch (error) {
    console.error('Error saving interval:', error)
    // You might want to show an error message to the user here
  }
}

function handleAction(item) {
  console.log('Action clicked for item:', item)
}

async function loadItems() {
  try {
    console.log('Loading items from:', props.loadEndpoint)
    const response = await get(props.loadEndpoint)
    console.log('Received items data:', response)
    if (response) {
      props.allitems.length = 0 // Clear existing items
      props.allitems.push(...Object.values(response))
    }
  } catch (error) {
    console.error('Error loading items:', error)
  }
}

onMounted(() => {
  loadItems()
})
</script>

<style scoped>
.v-data-table {
  background-color: transparent;
}
</style> 