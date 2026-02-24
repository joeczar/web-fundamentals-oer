<script setup lang="ts">
const { data: pages } = await useAsyncData('internet-pages', () => {
  return queryCollection('content').where('path', 'LIKE', '/internet/%').all()
})

const modules = computed(() =>
  (pages.value ?? []).map((page, index) => ({
    ...page,
    index: index + 1,
    status: page.path.includes('/1.how') ? 'active' : 'locked',
  }))
)

const activeCount = computed(() => modules.value.filter(m => m.status === 'active').length)
</script>

<template>
  <div class="min-h-screen px-4 py-8 md:px-8 md:py-12 max-w-3xl mx-auto">

    <!-- Protocol header -->
    <div class="font-mono text-xs text-muted-foreground mb-16 tracking-widest">
      // CYBERSPACE TRAINING PROTOCOL v0.1 — OPEN SOURCE — LEARNING IN PUBLIC
    </div>

    <!-- Hero -->
    <section class="mb-16">
      <h1 class="display-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-10 text-primary">
        WEB<br>FUNDAMENTALS
      </h1>

      <blockquote class="border-l-2 border-primary pl-5 mb-10">
        <p class="font-mono text-sm text-muted-foreground italic leading-relaxed">
          "Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators,
          in every nation... A graphic representation of data abstracted from the banks of every computer
          in the human system. Unthinkable complexity."
        </p>
        <cite class="font-mono text-xs text-muted-foreground/60 mt-3 block not-italic">
          — William Gibson, Neuromancer (1984)
        </cite>
      </blockquote>

      <p class="text-lg md:text-xl leading-relaxed text-foreground/80">
        You already live in it.<br>
        <span class="text-primary font-semibold">Now learn how it works.</span>
      </p>
    </section>

    <!-- Section label -->
    <div class="font-mono text-xs text-muted-foreground mb-6 flex items-center gap-4">
      <span class="tracking-widest">// TRAINING SECTORS</span>
      <span class="flex-1 border-t border-border" />
      <span class="tracking-widest">{{ activeCount }}&nbsp;/&nbsp;{{ modules.length }}&nbsp;ACTIVE</span>
    </div>

    <!-- Module grid -->
    <section class="grid gap-2 mb-16 md:grid-cols-2">

      <!-- Active module -->
      <NuxtLink
        v-for="module in modules.filter(m => m.status === 'active')"
        :key="module.path"
        :to="module.path"
        class="module-card-active group block border border-primary/50 bg-card p-5 transition-all duration-200 hover:border-primary"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <span class="font-mono text-3xl font-bold text-primary/40 group-hover:text-primary/70 transition-colors leading-none select-none">
            {{ String(module.index).padStart(2, '0') }}
          </span>
          <span class="font-mono text-xs tracking-widest text-primary">► ACTIVE</span>
        </div>
        <h2 class="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-2">
          {{ module.title }}
        </h2>
        <p class="text-sm text-muted-foreground leading-relaxed">{{ module.description }}</p>
      </NuxtLink>

      <!-- Locked modules -->
      <div
        v-for="module in modules.filter(m => m.status === 'locked')"
        :key="module.path"
        class="border border-border/30 bg-card/30 p-5 opacity-50 cursor-not-allowed select-none"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <span class="font-mono text-3xl font-bold text-muted-foreground/30 leading-none">
            {{ String(module.index).padStart(2, '0') }}
          </span>
          <span class="font-mono text-xs tracking-widest text-muted-foreground">○ LOCKED</span>
        </div>
        <h2 class="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
          {{ module.title }}
        </h2>
        <p class="text-sm text-muted-foreground/70 leading-relaxed">{{ module.description }}</p>
      </div>

    </section>

    <!-- Open transmission -->
    <div class="font-mono text-xs border-t border-border pt-8 space-y-3 text-muted-foreground">
      <div class="tracking-widest text-primary/70">// OPEN TRANSMISSION</div>
      <p class="leading-relaxed">
        Built in public. An experiment in openly developing educational materials about the web.
        Corrections, contributions, and questions welcome.
      </p>
      <p>
        <span class="text-primary mr-2">→</span>
        <a
          href="https://github.com/joeczar/web-fundamentals-oer"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-4 hover:text-primary transition-colors"
        >
          github.com/joeczar/web-fundamentals-oer
        </a>
      </p>
    </div>

  </div>
</template>

<style scoped>
.display-title {
  font-family: 'Share Tech Mono', monospace;
}

.module-card-active:hover {
  box-shadow: 0 0 24px color-mix(in oklch, var(--color-primary) 15%, transparent);
}
</style>
