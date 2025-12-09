// Cyberpunk-styled canvas rendering utilities

export interface CyberColors {
  background: string
  grid: string
  primary: string      // cyan
  secondary: string    // magenta
  accent: string       // matrix green
  warning: string      // hot pink
  text: string
}

export const cyberColors: CyberColors = {
  background: '#0a0a0f',
  grid: '#1a1a2e',
  primary: '#00ffff',
  secondary: '#ff00ff',
  accent: '#00ff00',
  warning: '#ff3366',
  text: '#ffffff',
}

export interface Position {
  x: number
  y: number
}

// Draw perspective grid background
export function drawCyberGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const horizonY = height * 0.35
  const gridColor = cyberColors.grid

  // Horizontal lines with perspective fade
  ctx.lineWidth = 1
  for (let y = height; y > horizonY; y -= 25) {
    const alpha = ((y - horizonY) / (height - horizonY)) * 0.6
    ctx.strokeStyle = `rgba(26, 26, 46, ${alpha})`
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Vertical lines converging to center horizon
  const centerX = width / 2
  for (let x = 0; x <= width; x += 50) {
    const alpha = 0.3
    ctx.strokeStyle = `rgba(26, 26, 46, ${alpha})`
    ctx.beginPath()
    ctx.moveTo(x, height)
    ctx.lineTo(centerX + (x - centerX) * 0.1, horizonY)
    ctx.stroke()
  }
}

// Draw scanline overlay effect
export function drawScanlines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number = 0.03
) {
  ctx.fillStyle = `rgba(0, 0, 0, ${intensity})`
  for (let y = 0; y < height; y += 3) {
    ctx.fillRect(0, y, width, 1)
  }
}

// Draw neon glow circle
export function drawNeonCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  filled: boolean = false
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 20
  ctx.strokeStyle = color
  ctx.fillStyle = filled ? color : 'transparent'
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  if (filled) {
    ctx.fill()
  }
  ctx.stroke()

  // Inner brighter stroke
  ctx.shadowBlur = 8
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

// Draw neon glow line
export function drawNeonLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  dashed: boolean = false
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 12
  ctx.strokeStyle = color
  ctx.lineWidth = 2

  if (dashed) {
    ctx.setLineDash([8, 4])
  }

  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()

  // Brighter core
  ctx.shadowBlur = 4
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.setLineDash([])
  ctx.restore()
}

// Draw computer/monitor icon
export function drawComputer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}22`
  ctx.lineWidth = 2

  const w = 32 * scale
  const h = 24 * scale

  // Monitor
  ctx.fillRect(x - w/2, y - h/2 - 5, w, h)
  ctx.strokeRect(x - w/2, y - h/2 - 5, w, h)

  // Screen glow
  ctx.fillStyle = `${color}44`
  ctx.fillRect(x - w/2 + 3, y - h/2 - 2, w - 6, h - 6)

  // Stand
  ctx.beginPath()
  ctx.moveTo(x - 6 * scale, y + h/2 - 5)
  ctx.lineTo(x - 10 * scale, y + h/2 + 8)
  ctx.lineTo(x + 10 * scale, y + h/2 + 8)
  ctx.lineTo(x + 6 * scale, y + h/2 - 5)
  ctx.stroke()

  ctx.restore()
}

// Draw network switch icon
export function drawSwitch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}22`
  ctx.lineWidth = 2

  const w = 50 * scale
  const h = 18 * scale

  // Main box
  ctx.fillRect(x - w/2, y - h/2, w, h)
  ctx.strokeRect(x - w/2, y - h/2, w, h)

  // Port indicators
  ctx.fillStyle = color
  const portCount = 5
  const portW = 6 * scale
  const portH = 8 * scale
  const spacing = (w - 10) / portCount
  for (let i = 0; i < portCount; i++) {
    const px = x - w/2 + 5 + i * spacing
    ctx.fillRect(px, y - portH/2, portW, portH)
  }

  ctx.restore()
}

// Draw router icon
export function drawRouter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}22`
  ctx.lineWidth = 2

  const w = 40 * scale
  const h = 16 * scale

  // Main box
  ctx.fillRect(x - w/2, y - h/2 + 5, w, h)
  ctx.strokeRect(x - w/2, y - h/2 + 5, w, h)

  // Antennas
  ctx.beginPath()
  ctx.moveTo(x - 12 * scale, y - h/2 + 5)
  ctx.lineTo(x - 16 * scale, y - 20 * scale)
  ctx.moveTo(x + 12 * scale, y - h/2 + 5)
  ctx.lineTo(x + 16 * scale, y - 20 * scale)
  ctx.stroke()

  // Signal waves
  ctx.lineWidth = 1.5
  for (let i = 1; i <= 2; i++) {
    ctx.beginPath()
    ctx.arc(x, y - 15 * scale, 6 * i * scale, Math.PI * 1.2, Math.PI * 1.8)
    ctx.stroke()
  }

  ctx.restore()
}

// Draw modem icon
export function drawModem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}22`
  ctx.lineWidth = 2

  const w = 24 * scale
  const h = 32 * scale

  // Main box (vertical)
  ctx.fillRect(x - w/2, y - h/2, w, h)
  ctx.strokeRect(x - w/2, y - h/2, w, h)

  // Status LEDs
  ctx.fillStyle = cyberColors.accent
  ctx.shadowColor = cyberColors.accent
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(x, y - h/2 + 8 + i * 8, 2 * scale, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

// Draw ISP cloud
export function drawCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 20
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}15`
  ctx.lineWidth = 2

  // Cloud shape using circles
  ctx.beginPath()
  ctx.arc(x - 15 * scale, y + 5 * scale, 15 * scale, Math.PI * 0.5, Math.PI * 1.5)
  ctx.arc(x, y - 10 * scale, 18 * scale, Math.PI, 0)
  ctx.arc(x + 18 * scale, y + 5 * scale, 12 * scale, Math.PI * 1.5, Math.PI * 0.5)
  ctx.lineTo(x - 15 * scale, y + 20 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.restore()
}

// Draw server icon
export function drawServer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  ctx.save()
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeStyle = color
  ctx.fillStyle = `${color}22`
  ctx.lineWidth = 2

  const w = 28 * scale
  const h = 36 * scale
  const slotH = 10 * scale

  // Server rack (3 slots)
  for (let i = 0; i < 3; i++) {
    const slotY = y - h/2 + i * slotH + 2
    ctx.fillRect(x - w/2, slotY, w, slotH - 2)
    ctx.strokeRect(x - w/2, slotY, w, slotH - 2)

    // LEDs
    ctx.fillStyle = i === 1 ? cyberColors.accent : cyberColors.primary
    ctx.shadowColor = ctx.fillStyle
    ctx.beginPath()
    ctx.arc(x + w/2 - 5, slotY + slotH/2 - 1, 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = `${color}22`
  }

  ctx.restore()
}

// Draw DNS server icon
export function drawDNS(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  scale: number = 1
) {
  drawServer(ctx, x, y, color, scale)

  // Add DNS label
  ctx.save()
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 8
  ctx.font = `bold ${10 * scale}px monospace`
  ctx.textAlign = 'center'
  ctx.fillText('DNS', x, y + 28 * scale)
  ctx.restore()
}

// Draw data packet with trail
export function drawPacket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  trailPositions: Position[] = []
) {
  ctx.save()

  // Draw trail
  trailPositions.forEach((pos, i) => {
    const alpha = 1 - (i / trailPositions.length)
    const size = 4 - (i / trailPositions.length) * 2
    ctx.fillStyle = color + Math.floor(alpha * 100).toString(16).padStart(2, '0')
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2)
    ctx.fill()
  })

  // Main packet
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 6, 0, Math.PI * 2)
  ctx.fill()

  // Bright core
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(x, y, 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

// Draw glowing text label
export function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  fontSize: number = 12
) {
  ctx.save()
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 8
  ctx.font = `${fontSize}px "JetBrains Mono", monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
  ctx.restore()
}

// Apply subtle glitch effect (occasional)
export function applyGlitch(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  probability: number = 0.02
) {
  if (Math.random() > probability) return

  const sliceHeight = Math.floor(Math.random() * 20) + 5
  const y = Math.floor(Math.random() * (height - sliceHeight))
  const shift = Math.floor(Math.random() * 10) - 5

  const imageData = ctx.getImageData(0, y, width, sliceHeight)
  ctx.putImageData(imageData, shift, y)
}

// Get pulse scale for breathing animation
export function getPulseScale(time: number, offset: number = 0): number {
  return 1 + Math.sin((time + offset) * 0.003) * 0.05
}
