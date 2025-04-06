<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.name" label="Name">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.parent" label="Parent">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.start"
              label="Start"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.end"
              label="End"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.duration"
              label="Duration"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.releasedate"
              label="Release Date"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      start: 0,
      end: 0,
      duration: 0,
      releasedate: 0,
      parent: '',
      children: [],
      display: true,
      padding: 0
    })
  },
  formTitle: String,
})

const emit = defineEmits(['close', 'save'])

const editedItem = ref({ ...props.item })

watch(() => props.item, (newVal) => {
  editedItem.value = { ...newVal }
}, { immediate: true })

function close() {
  emit('close')
  editedItem.value = { ...props.item }
}

async function save() {
  try {
    console.log('Saving interval:', editedItem.value)
    const { data } = await useFetch('http://localhost:8000/addinterval', {
      method: 'POST',
      body: editedItem.value,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    if (data.value) {
      emit('save')
      editedItem.value = { ...props.item }
    }
  } catch (error) {
    console.error('Error saving interval:', error)
  }
}
</script>