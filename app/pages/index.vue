<script setup lang="ts">
const { data: pages } = await useAsyncData('internet-pages', () => {
  return queryCollection('content').where('path', 'LIKE', '/internet/%').all()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Mini-Internet</h1>
    <p class="text-lg text-muted-foreground mb-8">
      An open educational resource for learning internet fundamentals.
    </p>

    <nav class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
                v-for="page in pages"
                :key="page.path"
                :to="page.path"
                class="block p-6 rounded-lg border bg-card hover:bg-accent transition-colors">
        <h2 class="text-xl font-semibold mb-2">{{ page.title }}</h2>
        <p class="text-muted-foreground">{{ page.description }}</p>
      </NuxtLink>
    </nav>
  </div>
</template>
