<template>
  <span class="local-icon" :style="{ width: size + 'px', height: size + 'px' }" v-html="svgContent"></span>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  }
})

const svgContent = ref('')

onMounted(async () => {
  try {
    const response = await fetch(`/icons/${props.name}.svg`)
    if (!response.ok) throw new Error(`Failed to load icon: ${props.name}`)
    const text = await response.text()
    // Remove any existing fill attributes and add currentColor
    const modifiedSvg = text.replace(/fill="[^"]*"/g, 'fill="currentColor"')
    svgContent.value = modifiedSvg
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
.local-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  position: relative;
  vertical-align: middle;
}

.local-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
  position: absolute;
  top: 0;
  left: 0;
}
</style> 