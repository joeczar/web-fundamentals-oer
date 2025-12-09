// Network diagram configurations and layouts

import { cyberColors } from './useCyberRenderer'

export type NodeType = 'computer' | 'switch' | 'router' | 'modem' | 'cloud' | 'server' | 'dns'
export type DiagramType = 'two-computers' | 'mesh' | 'switch' | 'router' | 'full-stack' | 'dns'

export interface NetworkNode {
  id: string
  type: NodeType
  x: number
  y: number
  label: string
  color?: string
}

export interface Connection {
  from: string
  to: string
  color?: string
}

export interface PacketPath {
  nodes: string[]    // node IDs in order
  color: string
  speed: number      // pixels per frame
  loop: boolean
}

export interface DiagramConfig {
  width: number
  height: number
  nodes: NetworkNode[]
  connections: Connection[]
  packets: PacketPath[]
  title: string
  description: string
}

// Helper to generate pentagon positions
function pentagonPositions(cx: number, cy: number, radius: number): { x: number, y: number }[] {
  const positions: { x: number, y: number }[] = []
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI / 5) - Math.PI / 2 // Start from top
    positions.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    })
  }
  return positions
}

// Generate all connections for mesh (everyone connected to everyone)
function meshConnections(nodeIds: string[]): Connection[] {
  const connections: Connection[] = []
  for (let i = 0; i < nodeIds.length; i++) {
    for (let j = i + 1; j < nodeIds.length; j++) {
      connections.push({
        from: nodeIds[i],
        to: nodeIds[j],
        color: cyberColors.warning // Red-ish to show problem
      })
    }
  }
  return connections
}

export const diagrams: Record<DiagramType, DiagramConfig> = {
  'two-computers': {
    width: 600,
    height: 250,
    title: 'Direct Connection',
    description: 'Two computers linked by a single cable',
    nodes: [
      { id: 'pc1', type: 'computer', x: 120, y: 125, label: 'Computer A', color: cyberColors.primary },
      { id: 'pc2', type: 'computer', x: 480, y: 125, label: 'Computer B', color: cyberColors.primary },
    ],
    connections: [
      { from: 'pc1', to: 'pc2', color: cyberColors.primary }
    ],
    packets: [
      { nodes: ['pc1', 'pc2'], color: cyberColors.accent, speed: 2, loop: true }
    ]
  },

  'mesh': (() => {
    const cx = 300, cy = 140, radius = 100
    const positions = pentagonPositions(cx, cy, radius)
    const nodeIds = ['pc1', 'pc2', 'pc3', 'pc4', 'pc5']

    return {
      width: 600,
      height: 300,
      title: 'Mesh Network',
      description: '5 computers = 10 cables needed!',
      nodes: positions.map((pos, i) => ({
        id: nodeIds[i],
        type: 'computer' as NodeType,
        x: pos.x,
        y: pos.y,
        label: `PC ${i + 1}`,
        color: cyberColors.primary
      })),
      connections: meshConnections(nodeIds),
      packets: [
        { nodes: ['pc1', 'pc3'], color: cyberColors.accent, speed: 1.5, loop: true },
        { nodes: ['pc2', 'pc5'], color: cyberColors.secondary, speed: 1.8, loop: true },
      ]
    }
  })(),

  'switch': (() => {
    const cx = 300, cy = 150
    return {
      width: 600,
      height: 300,
      title: 'Star Topology',
      description: '5 computers, only 5 cables!',
      nodes: [
        { id: 'sw', type: 'switch' as NodeType, x: cx, y: cy, label: 'Switch', color: cyberColors.secondary },
        { id: 'pc1', type: 'computer' as NodeType, x: cx, y: 40, label: 'PC 1', color: cyberColors.primary },
        { id: 'pc2', type: 'computer' as NodeType, x: cx + 130, y: 100, label: 'PC 2', color: cyberColors.primary },
        { id: 'pc3', type: 'computer' as NodeType, x: cx + 80, y: 240, label: 'PC 3', color: cyberColors.primary },
        { id: 'pc4', type: 'computer' as NodeType, x: cx - 80, y: 240, label: 'PC 4', color: cyberColors.primary },
        { id: 'pc5', type: 'computer' as NodeType, x: cx - 130, y: 100, label: 'PC 5', color: cyberColors.primary },
      ],
      connections: [
        { from: 'pc1', to: 'sw', color: cyberColors.primary },
        { from: 'pc2', to: 'sw', color: cyberColors.primary },
        { from: 'pc3', to: 'sw', color: cyberColors.primary },
        { from: 'pc4', to: 'sw', color: cyberColors.primary },
        { from: 'pc5', to: 'sw', color: cyberColors.primary },
      ],
      packets: [
        { nodes: ['pc1', 'sw', 'pc3'], color: cyberColors.accent, speed: 2, loop: true },
        { nodes: ['pc2', 'sw', 'pc5'], color: cyberColors.accent, speed: 1.8, loop: true },
      ]
    }
  })(),

  'router': {
    width: 700,
    height: 320,
    title: 'Connected Networks',
    description: 'Router bridges two separate networks',
    nodes: [
      // Network A
      { id: 'swA', type: 'switch', x: 120, y: 160, label: 'Switch A', color: cyberColors.primary },
      { id: 'pcA1', type: 'computer', x: 60, y: 60, label: 'PC A1', color: cyberColors.primary },
      { id: 'pcA2', type: 'computer', x: 60, y: 260, label: 'PC A2', color: cyberColors.primary },
      { id: 'pcA3', type: 'computer', x: 180, y: 260, label: 'PC A3', color: cyberColors.primary },

      // Router
      { id: 'router', type: 'router', x: 350, y: 160, label: 'Router', color: cyberColors.secondary },

      // Network B
      { id: 'swB', type: 'switch', x: 580, y: 160, label: 'Switch B', color: cyberColors.accent },
      { id: 'pcB1', type: 'computer', x: 640, y: 60, label: 'PC B1', color: cyberColors.accent },
      { id: 'pcB2', type: 'computer', x: 640, y: 260, label: 'PC B2', color: cyberColors.accent },
      { id: 'pcB3', type: 'computer', x: 520, y: 260, label: 'PC B3', color: cyberColors.accent },
    ],
    connections: [
      // Network A connections
      { from: 'pcA1', to: 'swA', color: cyberColors.primary },
      { from: 'pcA2', to: 'swA', color: cyberColors.primary },
      { from: 'pcA3', to: 'swA', color: cyberColors.primary },
      // Router connections
      { from: 'swA', to: 'router', color: cyberColors.secondary },
      { from: 'router', to: 'swB', color: cyberColors.secondary },
      // Network B connections
      { from: 'swB', to: 'pcB1', color: cyberColors.accent },
      { from: 'swB', to: 'pcB2', color: cyberColors.accent },
      { from: 'swB', to: 'pcB3', color: cyberColors.accent },
    ],
    packets: [
      { nodes: ['pcA1', 'swA', 'router', 'swB', 'pcB2'], color: cyberColors.accent, speed: 2, loop: true },
    ]
  },

  'full-stack': {
    width: 800,
    height: 280,
    title: 'Internet Infrastructure',
    description: 'The complete journey from your computer to a web server',
    nodes: [
      { id: 'pc', type: 'computer', x: 60, y: 140, label: 'Your PC', color: cyberColors.primary },
      { id: 'switch', type: 'switch', x: 160, y: 140, label: 'Switch', color: cyberColors.primary },
      { id: 'modem', type: 'modem', x: 260, y: 140, label: 'Modem', color: cyberColors.secondary },
      { id: 'isp', type: 'cloud', x: 400, y: 140, label: 'ISP', color: cyberColors.secondary },
      { id: 'internet', type: 'cloud', x: 540, y: 140, label: 'Internet', color: cyberColors.accent },
      { id: 'server', type: 'server', x: 700, y: 140, label: 'Web Server', color: cyberColors.accent },
    ],
    connections: [
      { from: 'pc', to: 'switch', color: cyberColors.primary },
      { from: 'switch', to: 'modem', color: cyberColors.primary },
      { from: 'modem', to: 'isp', color: cyberColors.secondary },
      { from: 'isp', to: 'internet', color: cyberColors.secondary },
      { from: 'internet', to: 'server', color: cyberColors.accent },
    ],
    packets: [
      { nodes: ['pc', 'switch', 'modem', 'isp', 'internet', 'server'], color: cyberColors.accent, speed: 2.5, loop: true },
    ]
  },

  'dns': {
    width: 700,
    height: 320,
    title: 'DNS Resolution',
    description: 'How "example.com" becomes 93.184.216.34',
    nodes: [
      { id: 'browser', type: 'computer', x: 80, y: 160, label: 'Browser', color: cyberColors.primary },
      { id: 'resolver', type: 'dns', x: 200, y: 160, label: 'Resolver', color: cyberColors.secondary },
      { id: 'root', type: 'dns', x: 350, y: 60, label: 'Root DNS', color: cyberColors.warning },
      { id: 'tld', type: 'dns', x: 500, y: 60, label: '.com TLD', color: cyberColors.warning },
      { id: 'auth', type: 'dns', x: 620, y: 160, label: 'Auth DNS', color: cyberColors.accent },
      { id: 'result', type: 'server', x: 350, y: 260, label: '93.184.216.34', color: cyberColors.accent },
    ],
    connections: [
      { from: 'browser', to: 'resolver', color: cyberColors.primary },
      { from: 'resolver', to: 'root', color: cyberColors.secondary },
      { from: 'root', to: 'tld', color: cyberColors.warning },
      { from: 'tld', to: 'auth', color: cyberColors.warning },
      { from: 'auth', to: 'resolver', color: cyberColors.accent },
      { from: 'resolver', to: 'result', color: cyberColors.accent },
    ],
    packets: [
      { nodes: ['browser', 'resolver', 'root', 'tld', 'auth', 'resolver', 'result'], color: cyberColors.accent, speed: 1.5, loop: true },
    ]
  }
}

export function getDiagram(type: DiagramType): DiagramConfig {
  return diagrams[type]
}

export function getNodeById(config: DiagramConfig, id: string): NetworkNode | undefined {
  return config.nodes.find(n => n.id === id)
}
