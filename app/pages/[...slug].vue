<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <article class="prose prose-slate dark:prose-invert prose-lg max-w-4xl mx-auto px-4 py-8">
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </article>
</template>
