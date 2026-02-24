<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const isLocked = computed(() => page.value?.status === 'locked')
</script>

<template>
  <article class="prose prose-slate dark:prose-invert prose-lg max-w-4xl mx-auto px-4 py-8">

    <!-- Locked sector banner -->
    <div v-if="isLocked" class="not-prose mb-10">
      <div class="font-mono text-xs text-muted-foreground tracking-widest mb-3">
        // SECTOR STATUS
      </div>
      <div class="border border-primary/40 bg-card p-5">
        <div class="flex items-center justify-between gap-4 mb-3">
          <span class="font-mono text-xs tracking-widest text-muted-foreground">○ LOCKED</span>
          <span class="font-mono text-xs tracking-widest text-primary/60">IN DEVELOPMENT</span>
        </div>
        <p class="text-sm text-muted-foreground font-mono leading-relaxed">
          This training module is not yet active. The outline below shows what will be covered.
          Built in public — check back or
          <a
            href="https://github.com/joeczar/web-fundamentals-oer"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline underline-offset-4 hover:text-primary/80"
          >follow the repo</a>
          for updates.
        </p>
      </div>
    </div>

    <ContentRenderer
      v-if="page"
      :value="page"
    />

  </article>
</template>
