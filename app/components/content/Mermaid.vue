<script setup lang="ts">
import { ref, onMounted, watch, useSlots, nextTick } from 'vue'

const props = defineProps<{
  code?: string
}>()

const container = ref<HTMLDivElement>()
const hiddenSlot = ref<HTMLDivElement>()
const rendered = ref('')
const error = ref<string | null>(null)

async function renderDiagram() {
  if (!import.meta.client) return

  await nextTick()

  try {
    const mermaid = (await import('mermaid')).default

    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose',
    })

    // Get code from prop or from the hidden slot's text content
    let code = props.code

    // Handle escaped newlines from MDC props
    if (code) {
      code = code.replace(/\\n/g, '\n')
    }

    if (!code && hiddenSlot.value) {
      code = hiddenSlot.value.textContent?.trim() || ''
    }

    if (!code) {
      error.value = 'No diagram code provided'
      return
    }

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    const { svg } = await mermaid.render(id, code)
    rendered.value = svg
    error.value = null
  } catch (e) {
    console.error('Mermaid render error:', e)
    error.value = e instanceof Error ? e.message : 'Failed to render diagram'
  }
}

onMounted(() => {
  renderDiagram()

  // Re-render on theme change
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        renderDiagram()
      }
    })
  })

  observer.observe(document.documentElement, { attributes: true })
})

watch(() => props.code, renderDiagram)
</script>

<template>
  <div ref="container" class="not-prose my-8">
    <!-- Hidden slot for MDC content extraction -->
    <div ref="hiddenSlot" class="hidden">
      <slot />
    </div>
    <div
      v-if="error"
      class="p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
    >
      <p class="font-semibold">Diagram Error</p>
      <p class="text-sm">{{ error }}</p>
    </div>
    <div
      v-else-if="rendered"
      class="flex justify-center p-4 bg-background rounded-lg border border-border overflow-x-auto"
      v-html="rendered"
    />
    <div v-else class="flex justify-center p-8">
      <div class="animate-pulse text-muted-foreground">Loading diagram...</div>
    </div>
  </div>
</template>
