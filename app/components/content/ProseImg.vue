<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <figure class="my-8">
    <img
      :src="src"
      :alt="alt || ''"
      :width="width"
      :height="height"
      class="rounded-lg border border-border mx-auto"
      loading="lazy"
    />
    <figcaption v-if="alt" class="text-center text-sm text-muted-foreground mt-2">
      {{ alt }}
    </figcaption>
  </figure>
</template>
