export type ThemeName = 'default' | 'neuromancer' | 'neon-matrix' | 'cyber-magenta' | 'digital-frost'
export type ColorMode = 'light' | 'dark' | 'system'

interface ThemeConfig {
  name: string
  value: ThemeName
  primaryColor: string // For swatch display
  description: string
}

export const themes: ThemeConfig[] = [
  {
    name: 'Neuromancer',
    value: 'neuromancer',
    primaryColor: 'oklch(0.82 0.30 65)',
    description: 'Amber phosphor. Gibson\'s matrix.',
  },
  {
    name: 'Default',
    value: 'default',
    primaryColor: 'oklch(0.208 0.042 265.755)',
    description: 'Clean slate blue',
  },
  {
    name: 'Neon Matrix',
    value: 'neon-matrix',
    primaryColor: 'oklch(0.80 0.28 145)',
    description: 'Matrix green terminal',
  },
  {
    name: 'Cyber Magenta',
    value: 'cyber-magenta',
    primaryColor: 'oklch(0.72 0.30 330)',
    description: 'Synthwave pink',
  },
  {
    name: 'Digital Frost',
    value: 'digital-frost',
    primaryColor: 'oklch(0.85 0.18 195)',
    description: 'Ice blue tech',
  },
]

const THEME_STORAGE_KEY = 'mini-internet-theme'
const MODE_STORAGE_KEY = 'mini-internet-color-mode'

export function useTheme() {
  const theme = useState<ThemeName>('theme', () => 'neuromancer')
  const colorMode = useState<ColorMode>('colorMode', () => 'system')
  const resolvedMode = useState<'light' | 'dark'>('resolvedMode', () => 'light')

  const applyTheme = (themeName: ThemeName) => {
    if (import.meta.client) {
      const html = document.documentElement
      if (themeName === 'default') {
        html.removeAttribute('data-theme')
      } else {
        html.setAttribute('data-theme', themeName)
      }
    }
  }

  const applyColorMode = (mode: ColorMode) => {
    if (import.meta.client) {
      const html = document.documentElement
      let isDark = false

      if (mode === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        isDark = mode === 'dark'
      }

      resolvedMode.value = isDark ? 'dark' : 'light'

      if (isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  const setTheme = (themeName: ThemeName) => {
    theme.value = themeName
    applyTheme(themeName)
    if (import.meta.client) {
      localStorage.setItem(THEME_STORAGE_KEY, themeName)
    }
  }

  const setColorMode = (mode: ColorMode) => {
    colorMode.value = mode
    applyColorMode(mode)
    if (import.meta.client) {
      localStorage.setItem(MODE_STORAGE_KEY, mode)
    }
  }

  const toggleColorMode = () => {
    const newMode = resolvedMode.value === 'dark' ? 'light' : 'dark'
    setColorMode(newMode)
  }

  const initTheme = () => {
    if (import.meta.client) {
      // Load saved preferences
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as ColorMode | null

      // Apply theme
      if (savedTheme && themes.some(t => t.value === savedTheme)) {
        theme.value = savedTheme
      }
      applyTheme(theme.value)

      // Apply color mode
      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        colorMode.value = savedMode
      }
      applyColorMode(colorMode.value)

      // Listen for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', () => {
        if (colorMode.value === 'system') {
          applyColorMode('system')
        }
      })
    }
  }

  return {
    theme: readonly(theme),
    colorMode: readonly(colorMode),
    resolvedMode: readonly(resolvedMode),
    themes,
    setTheme,
    setColorMode,
    toggleColorMode,
    initTheme,
  }
}
