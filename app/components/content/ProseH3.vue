<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <h3 :id="id" class="group flex items-center gap-2">
    <slot />
    <a
      v-if="id"
      :href="`#${id}`"
      class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground text-sm"
      aria-label="Link to this section"
    >
      #
    </a>
  </h3>
</template>
