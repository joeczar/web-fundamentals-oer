<script setup lang="ts">
defineProps<{
  title: string
  step?: number | string
}>()
</script>

<template>
  <div class="relative pl-10">
    <div
      class="absolute left-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
    >
      {{ step || '' }}
    </div>
    <div>
      <h4 class="font-semibold text-lg mb-2">{{ title }}</h4>
      <div class="text-muted-foreground">
        <slot />
      </div>
    </div>
  </div>
</template>
