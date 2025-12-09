<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  cyberColors,
  drawCyberGrid,
  drawScanlines,
  drawNeonLine,
  drawComputer,
  drawSwitch,
  drawRouter,
  drawModem,
  drawCloud,
  drawServer,
  drawDNS,
  drawPacket,
  drawLabel,
  applyGlitch,
  getPulseScale,
  type Position
} from '~/composables/useCyberRenderer'
import {
  getDiagram,
  getNodeById,
  type DiagramType,
  type DiagramConfig,
  type NetworkNode
} from '~/composables/useNetworkDiagram'

const props = withDefaults(defineProps<{
  diagram: DiagramType
  animated?: boolean
  showLabels?: boolean
  showGlitch?: boolean
}>(), {
  animated: true,
  showLabels: true,
  showGlitch: true
})

const canvasRef = ref<HTMLCanvasElement>()
const containerRef = ref<HTMLDivElement>()
const animationId = ref<number | null>(null)

// Packet state for animation
interface ActivePacket {
  pathIndex: number        // Current segment index
  progress: number         // 0-1 along current segment
  path: string[]           // Node IDs
  color: string
  speed: number
  loop: boolean
  trail: Position[]        // Recent positions for trail effect
}

const activePackets = ref<ActivePacket[]>([])

const config = computed<DiagramConfig>(() => getDiagram(props.diagram))

// Node drawing dispatch
function drawNode(
  ctx: CanvasRenderingContext2D,
  node: NetworkNode,
  time: number
) {
  const scale = props.animated ? getPulseScale(time, node.id.charCodeAt(0) * 100) : 1
  const color = node.color || cyberColors.primary

  switch (node.type) {
    case 'computer':
      drawComputer(ctx, node.x, node.y, color, scale)
      break
    case 'switch':
      drawSwitch(ctx, node.x, node.y, color, scale)
      break
    case 'router':
      drawRouter(ctx, node.x, node.y, color, scale)
      break
    case 'modem':
      drawModem(ctx, node.x, node.y, color, scale)
      break
    case 'cloud':
      drawCloud(ctx, node.x, node.y, color, scale)
      break
    case 'server':
      drawServer(ctx, node.x, node.y, color, scale)
      break
    case 'dns':
      drawDNS(ctx, node.x, node.y, color, scale)
      break
  }

  // Draw label below node
  if (props.showLabels) {
    const labelOffset = node.type === 'cloud' ? 45 : 40
    drawLabel(ctx, node.label, node.x, node.y + labelOffset, color, 11)
  }
}

// Get position along path between two nodes
function interpolatePosition(
  from: NetworkNode,
  to: NetworkNode,
  progress: number
): Position {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress
  }
}

// Update packet positions
function updatePackets(deltaTime: number) {
  activePackets.value.forEach(packet => {
    const cfg = config.value
    const fromNode = getNodeById(cfg, packet.path[packet.pathIndex])
    const toNode = getNodeById(cfg, packet.path[packet.pathIndex + 1])

    if (!fromNode || !toNode) return

    // Calculate distance and update progress
    const dx = toNode.x - fromNode.x
    const dy = toNode.y - fromNode.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const increment = (packet.speed * deltaTime) / distance / 16

    packet.progress += increment

    // Store current position in trail
    const currentPos = interpolatePosition(fromNode, toNode, Math.min(packet.progress, 1))
    packet.trail.unshift(currentPos)
    if (packet.trail.length > 8) {
      packet.trail.pop()
    }

    // Move to next segment
    if (packet.progress >= 1) {
      packet.progress = 0
      packet.pathIndex++

      // Loop or reset
      if (packet.pathIndex >= packet.path.length - 1) {
        if (packet.loop) {
          packet.pathIndex = 0
          packet.trail = []
        }
      }
    }
  })
}

// Main draw function
function draw(ctx: CanvasRenderingContext2D, time: number, deltaTime: number) {
  const cfg = config.value

  // Clear with background
  ctx.fillStyle = cyberColors.background
  ctx.fillRect(0, 0, cfg.width, cfg.height)

  // Draw perspective grid
  drawCyberGrid(ctx, cfg.width, cfg.height)

  // Draw connections
  cfg.connections.forEach(conn => {
    const from = getNodeById(cfg, conn.from)
    const to = getNodeById(cfg, conn.to)
    if (from && to) {
      drawNeonLine(ctx, from.x, from.y, to.x, to.y, conn.color || cyberColors.primary)
    }
  })

  // Draw nodes
  cfg.nodes.forEach(node => {
    drawNode(ctx, node, time)
  })

  // Update and draw packets
  if (props.animated) {
    updatePackets(deltaTime)

    activePackets.value.forEach(packet => {
      if (packet.pathIndex < packet.path.length - 1) {
        const fromNode = getNodeById(cfg, packet.path[packet.pathIndex])
        const toNode = getNodeById(cfg, packet.path[packet.pathIndex + 1])
        if (fromNode && toNode) {
          const pos = interpolatePosition(fromNode, toNode, packet.progress)
          drawPacket(ctx, pos.x, pos.y, packet.color, packet.trail)
        }
      }
    })
  }

  // Draw scanlines overlay
  drawScanlines(ctx, cfg.width, cfg.height)

  // Occasional glitch effect
  if (props.showGlitch) {
    applyGlitch(ctx, cfg.width, cfg.height, 0.005)
  }
}

let lastTime = 0

function animate(time: number) {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const deltaTime = time - lastTime
  lastTime = time

  draw(ctx, time, deltaTime)

  animationId.value = requestAnimationFrame(animate)
}

function initPackets() {
  const cfg = config.value
  activePackets.value = cfg.packets.map(p => ({
    pathIndex: 0,
    progress: 0,
    path: p.nodes,
    color: p.color,
    speed: p.speed,
    loop: p.loop,
    trail: []
  }))
}

onMounted(() => {
  if (!canvasRef.value) return

  const cfg = config.value
  canvasRef.value.width = cfg.width
  canvasRef.value.height = cfg.height

  initPackets()
  animationId.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>

<template>
  <div ref="containerRef" class="not-prose my-8">
    <div class="rounded-lg border border-border overflow-hidden" style="background: #0a0a0f;">
      <canvas
        ref="canvasRef"
        class="block mx-auto w-full"
        :style="{ maxWidth: `${config.width}px` }"
      />
    </div>
    <div class="mt-3 text-center">
      <p class="text-sm font-medium text-foreground">{{ config.title }}</p>
      <p class="text-xs text-muted-foreground">{{ config.description }}</p>
    </div>
  </div>
</template>
