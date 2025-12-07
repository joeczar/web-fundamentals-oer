<script setup lang="ts">
import { ref, provide } from 'vue'

const activeTab = ref(0)

provide('codeGroupActiveTab', activeTab)
provide('codeGroupRegister', (index: number) => {
  return index
})
</script>

<template>
  <div class="not-prose my-6 rounded-lg border border-border overflow-hidden">
    <slot />
  </div>
</template>
