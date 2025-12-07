<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  width?: number
  height?: number
  fps?: number
}>(), {
  width: 800,
  height: 400,
  fps: 60,
})

const emit = defineEmits<{
  (e: 'init', ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void
  (e: 'frame', ctx: CanvasRenderingContext2D, time: number, deltaTime: number): void
}>()

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationId = ref<number | null>(null)
const lastTime = ref(0)
const actualWidth = ref(props.width)

const isDark = ref(false)

const colors = computed(() => ({
  background: isDark.value ? '#1a1a2e' : '#ffffff',
  foreground: isDark.value ? '#e2e8f0' : '#1e293b',
  primary: isDark.value ? '#818cf8' : '#4f46e5',
  secondary: isDark.value ? '#64748b' : '#94a3b8',
  accent: isDark.value ? '#22d3ee' : '#0891b2',
  muted: isDark.value ? '#334155' : '#f1f5f9',
}))

// Expose colors and utilities to parent components
defineExpose({
  colors,
  ctx,
  canvas: canvasRef,
})

function updateDarkMode() {
  isDark.value = document.documentElement.classList.contains('dark')
}

function resizeCanvas() {
  if (!canvasRef.value || !containerRef.value) return

  const containerWidth = containerRef.value.clientWidth
  const scale = Math.min(1, containerWidth / props.width)

  actualWidth.value = props.width * scale
  canvasRef.value.style.width = `${actualWidth.value}px`
  canvasRef.value.style.height = `${props.height * scale}px`
}

function animate(time: number) {
  if (!ctx.value) return

  const deltaTime = time - lastTime.value
  lastTime.value = time

  emit('frame', ctx.value, time, deltaTime)

  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!canvasRef.value) return

  ctx.value = canvasRef.value.getContext('2d')
  if (!ctx.value) return

  // Set actual canvas resolution
  canvasRef.value.width = props.width
  canvasRef.value.height = props.height

  resizeCanvas()
  updateDarkMode()

  // Watch for theme changes
  const observer = new MutationObserver(updateDarkMode)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  // Watch for resize
  window.addEventListener('resize', resizeCanvas)

  emit('init', ctx.value, canvasRef.value)

  // Start animation loop
  animationId.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <div ref="containerRef" class="not-prose my-8">
    <div class="rounded-lg border border-border overflow-hidden bg-background">
      <canvas
        ref="canvasRef"
        :id="id"
        class="block mx-auto"
      />
    </div>
    <div class="hidden">
      <slot />
    </div>
  </div>
</template>
