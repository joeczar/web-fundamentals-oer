<script setup lang="ts">
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-vue-next'
import { useTheme, type ThemeName, type ColorMode } from '~/composables/useTheme'

const { theme, colorMode, resolvedMode, themes, setTheme, setColorMode, initTheme } = useTheme()

const isOpen = ref(false)

onMounted(() => {
  initTheme()
})

const colorModeOptions: { value: ColorMode; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

function selectTheme(value: ThemeName) {
  setTheme(value)
}

function selectColorMode(mode: ColorMode) {
  setColorMode(mode)
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="theme-switcher relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      @click="isOpen = !isOpen"
    >
      <Palette class="size-4" />
      <span class="hidden sm:inline">Theme</span>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border bg-popover p-3 shadow-lg"
      >
        <!-- Color Mode -->
        <div class="mb-3">
          <div class="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Color Mode
          </div>
          <div class="flex gap-1">
            <button
              v-for="option in colorModeOptions"
              :key="option.value"
              type="button"
              class="flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors"
              :class="[
                colorMode === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              ]"
              @click="selectColorMode(option.value)"
            >
              <component :is="option.icon" class="size-3.5" />
              <span class="text-xs">{{ option.label }}</span>
            </button>
          </div>
        </div>

        <div class="my-2 h-px bg-border" />

        <!-- Theme Selection -->
        <div>
          <div class="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Theme
          </div>
          <div class="space-y-1">
            <button
              v-for="t in themes"
              :key="t.value"
              type="button"
              class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors"
              :class="[
                theme === t.value
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50 hover:text-accent-foreground'
              ]"
              @click="selectTheme(t.value)"
            >
              <div
                class="size-4 rounded-full border border-border/50 shadow-sm"
                :style="{ backgroundColor: t.primaryColor }"
              />
              <div class="flex-1">
                <div class="text-sm font-medium">{{ t.name }}</div>
                <div class="text-xs text-muted-foreground">{{ t.description }}</div>
              </div>
              <Check v-if="theme === t.value" class="size-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
