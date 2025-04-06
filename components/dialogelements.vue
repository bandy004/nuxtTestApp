<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ attrs }">
      <v-btn
        v-if="!edit"
        color="primary"
        dark
        class="ma-4"
        v-bind="attrs"
        @click="handleClick"
      >
        <v-icon>mdi-plus-circle</v-icon>
        {{ buttonText }}
      </v-btn>
    </template>
    <dependencyDialog
      v-if="isDependency"
      :formTitle="formTitle"
      :item="item"
      @close="close"
      @save="save"
    />
    <intervalDialog
      v-if="isInterval"
      :formTitle="formTitle"
      :item="item"
      @close="close"
      @save="save"
    />
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import dependencyDialog from "@/components/dependencyDialog.vue"
import intervalDialog from "@/components/intervalDialog.vue"

const props = defineProps({
  type: String,
  item: Object,
  formTitle: String,
  show: Boolean,
  edit: Boolean,
  buttonText: String,
})

const emit = defineEmits(['close', 'save'])

const dialog = ref(false)

const isDependency = computed(() => props.type === "D")
const isInterval = computed(() => props.type === "I")

watch(() => props.show, (newVal) => {
  console.log('Dialog show prop changed:', newVal)
  dialog.value = newVal
})

watch(dialog, (newVal) => {
  console.log('Dialog state changed:', newVal)
})

function handleClick() {
  console.log('Add button clicked')
  dialog.value = true
}

function close() {
  console.log('Dialog close called')
  emit('close')
  dialog.value = false
}

function save() {
  console.log('Dialog save called')
  emit('save')
  dialog.value = false
}
</script>