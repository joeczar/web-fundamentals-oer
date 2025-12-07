<script setup lang="ts">
defineProps<{
  code?: string
  language?: string
}>()
</script>

<template>
  <code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground before:content-none after:content-none">
    <slot />
  </code>
</template>
