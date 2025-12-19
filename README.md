# Mini-Internet OER

An Open Educational Resource (OER) for learning internet fundamentals. Built with Nuxt 4 and designed for interactive, content-rich educational experiences.

## Features

- **Interactive Quizzes** - Multiple-choice and true/false questions with instant feedback
- **Mermaid Diagrams** - Flowcharts, sequence diagrams, and visualizations with dark mode support
- **Code Highlighting** - Syntax highlighting for JS, TS, Python, Bash, HTML, CSS, and more
- **Step-by-Step Tutorials** - Structured procedural instructions
- **Dark Mode** - Full theme support with oklch color system

## Tech Stack

- **Nuxt 4** - Vue 3 meta-framework
- **Nuxt Content** - Markdown-based CMS with MDC components
- **Tailwind CSS 4** - Utility-first styling
- **shadcn-vue** - Accessible UI components
- **Mermaid** - Diagram rendering

## Content Structure

```
content/
├── index.md              # Home page
├── about.md              # About page
└── internet/             # Course modules
    ├── 1.how-the-internet-works.md
    ├── 2.dns.md
    ├── 3.domain-names.md
    ├── 4.http.md
    ├── 5.hosting.md
    └── 6.browsers.md
```

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Starts at `http://localhost:3000`

## Production

Build for production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

Generate static site:

```bash
pnpm generate
```

## Deployment

Configured for Netlify. The build outputs to `.output/public`.

## License

Open Educational Resource - see content for specific licensing.
