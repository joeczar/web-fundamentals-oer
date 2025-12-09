import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'shadcn-nuxt',
  ],
  css: ['~/assets/css/main.css'],
  alias: {
    '@': './app',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['js', 'ts', 'javascript', 'typescript', 'python', 'bash', 'shell', 'html', 'css', 'json', 'yaml', 'markdown', 'vue', 'sql'],
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: [
        'remark-gfm',
        'remark-emoji',
        'remark-mdc',
        'remark-rehype',
        'rehype-raw',
        'parse5',
        'unist-util-visit',
        'unified',
      ],
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})
