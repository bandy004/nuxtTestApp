<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
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
  }
})

const emit = defineEmits(['save'])

async function deleteItem(item) {
  const index = props.items.indexOf(item)
  confirm('Are you sure you want to delete this item?') &&
    props.items.splice(index, 1)
  emit('save')
}
</script> 