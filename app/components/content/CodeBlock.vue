<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
}>()
</script>

<template>
  <div class="code-block-tab">
    <div class="px-4 py-2 bg-muted border-b border-border text-sm font-medium">
      {{ label }}
    </div>
    <div class="[&>pre]:rounded-none [&>pre]:border-0 [&>pre]:my-0">
      <slot />
    </div>
  </div>
</template>
