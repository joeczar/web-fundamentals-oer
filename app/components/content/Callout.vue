<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip'
  title?: string
}>(), {
  type: 'info',
})

const styles = computed(() => {
  const typeStyles = {
    info: {
      container: 'border-blue-500 bg-blue-50 dark:bg-blue-950/50',
      icon: 'text-blue-500',
      title: 'text-blue-700 dark:text-blue-300',
    },
    warning: {
      container: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/50',
      icon: 'text-yellow-500',
      title: 'text-yellow-700 dark:text-yellow-300',
    },
    success: {
      container: 'border-green-500 bg-green-50 dark:bg-green-950/50',
      icon: 'text-green-500',
      title: 'text-green-700 dark:text-green-300',
    },
    error: {
      container: 'border-red-500 bg-red-50 dark:bg-red-950/50',
      icon: 'text-red-500',
      title: 'text-red-700 dark:text-red-300',
    },
    tip: {
      container: 'border-purple-500 bg-purple-50 dark:bg-purple-950/50',
      icon: 'text-purple-500',
      title: 'text-purple-700 dark:text-purple-300',
    },
  }
  return typeStyles[props.type]
})

const icons = {
  info: 'M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z',
  warning: 'M12 9v4m0 4h.01M21.73 18l-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  tip: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
}

const defaultTitles = {
  info: 'Info',
  warning: 'Warning',
  success: 'Success',
  error: 'Error',
  tip: 'Tip',
}
</script>

<template>
  <div
    :class="[
      'not-prose my-6 rounded-lg border-l-4 p-4',
      styles.container,
    ]"
    role="alert"
  >
    <div class="flex items-start gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="['flex-shrink-0 mt-0.5', styles.icon]"
      >
        <path :d="icons[type]" />
      </svg>
      <div class="flex-1 min-w-0">
        <p v-if="title || defaultTitles[type]" :class="['font-semibold mb-1', styles.title]">
          {{ title || defaultTitles[type] }}
        </p>
        <div class="text-sm text-foreground/90">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
