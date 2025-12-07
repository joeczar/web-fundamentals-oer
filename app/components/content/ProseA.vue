<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href?: string
  target?: string
}>()

const isExternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('http://') || props.href.startsWith('https://')
})
</script>

<template>
  <NuxtLink
    :href="href"
    :target="isExternal ? '_blank' : target"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center gap-1 text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
  >
    <slot />
    <svg
      v-if="isExternal"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inline-block"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  </NuxtLink>
</template>
