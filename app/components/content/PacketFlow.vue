<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  speed?: 'slow' | 'normal' | 'fast'
}>(), {
  speed: 'normal',
})

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const animationId = ref<number | null>(null)

interface Packet {
  x: number
  y: number
  size: number
  color: string
  speed: number
}

const packets = ref<Packet[]>([])
const nodes = [
  { x: 100, y: 200, label: 'Client', icon: 'laptop' },
  { x: 300, y: 200, label: 'Router', icon: 'router' },
  { x: 500, y: 200, label: 'Server', icon: 'server' },
]

const speedMultiplier = {
  slow: 0.5,
  normal: 1,
  fast: 2,
}

function getColors() {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    background: isDark ? '#0f172a' : '#ffffff',
    foreground: isDark ? '#e2e8f0' : '#1e293b',
    primary: isDark ? '#818cf8' : '#4f46e5',
    secondary: isDark ? '#475569' : '#cbd5e1',
    accent: isDark ? '#22d3ee' : '#0891b2',
    packet: isDark ? '#34d399' : '#10b981',
    line: isDark ? '#334155' : '#e2e8f0',
  }
}

function spawnPacket() {
  const colors = getColors()
  packets.value.push({
    x: nodes[0].x,
    y: nodes[0].y,
    size: 8,
    color: colors.packet,
    speed: 2 * speedMultiplier[props.speed],
  })
}

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const colors = getColors()

  // Clear canvas
  ctx.fillStyle = colors.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw connection lines
  ctx.strokeStyle = colors.line
  ctx.lineWidth = 3
  ctx.setLineDash([10, 5])
  ctx.beginPath()
  ctx.moveTo(nodes[0].x, nodes[0].y)
  ctx.lineTo(nodes[1].x, nodes[1].y)
  ctx.lineTo(nodes[2].x, nodes[2].y)
  ctx.stroke()
  ctx.setLineDash([])

  // Draw nodes
  nodes.forEach((node) => {
    // Node circle
    ctx.fillStyle = colors.primary
    ctx.beginPath()
    ctx.arc(node.x, node.y, 30, 0, Math.PI * 2)
    ctx.fill()

    // Node border
    ctx.strokeStyle = colors.foreground
    ctx.lineWidth = 2
    ctx.stroke()

    // Label
    ctx.fillStyle = colors.foreground
    ctx.font = '14px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(node.label, node.x, node.y + 55)
  })

  // Update and draw packets
  packets.value = packets.value.filter((packet) => {
    // Move packet
    packet.x += packet.speed

    // Draw packet
    ctx.fillStyle = packet.color
    ctx.beginPath()
    ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2)
    ctx.fill()

    // Glow effect
    ctx.shadowColor = packet.color
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.shadowBlur = 0

    // Remove if past the server
    return packet.x < nodes[2].x + 50
  })
}

function animate() {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  draw(ctx, canvasRef.value)
  animationId.value = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!canvasRef.value) return

  canvasRef.value.width = 600
  canvasRef.value.height = 300

  // Spawn packets periodically
  const spawnInterval = setInterval(() => {
    if (packets.value.length < 5) {
      spawnPacket()
    }
  }, 1500 / speedMultiplier[props.speed])

  animate()

  onUnmounted(() => {
    clearInterval(spawnInterval)
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
  })
})
</script>

<template>
  <div ref="containerRef" class="not-prose my-8">
    <div class="rounded-lg border border-border overflow-hidden bg-background">
      <canvas ref="canvasRef" class="block mx-auto w-full max-w-[600px]" />
    </div>
    <p class="text-center text-sm text-muted-foreground mt-2">
      Data packets traveling from client to server
    </p>
  </div>
</template>
