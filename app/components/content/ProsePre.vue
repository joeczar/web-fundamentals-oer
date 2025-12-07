<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const copied = ref(false)

async function copyCode() {
  if (props.code) {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="relative group not-prose my-6">
    <div
      v-if="filename"
      class="flex items-center justify-between px-4 py-2 bg-muted border border-b-0 border-border rounded-t-lg text-sm text-muted-foreground font-mono"
    >
      <span>{{ filename }}</span>
      <span v-if="language" class="text-xs uppercase">{{ language }}</span>
    </div>
    <div class="relative">
      <pre
        :class="[
          'shiki overflow-x-auto rounded-lg border border-border',
          filename ? 'rounded-t-none' : '',
        ]"
      ><slot /></pre>
      <button
        type="button"
        class="absolute top-2 right-2 p-2 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
        :title="copied ? 'Copied!' : 'Copy code'"
        @click="copyCode"
      >
        <svg
          v-if="!copied"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-green-500"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
