export interface Repo {
  name: string
  description: string
  url: string
  language: string
  languageColor: string
  stars: number
  forks: number
  featured?: boolean
}

export const repos: Repo[] = [
  {
    name: 'portfolio',
    description: 'My personal portfolio built with Next.js, GSAP, and Tailwind CSS. Dark editorial design with cinematic scroll animations.',
    url: 'https://github.com/username/portfolio',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 128,
    forks: 24,
    featured: true,
  },
  {
    name: 'ai-chat-sdk',
    description: 'Lightweight SDK for building conversational AI interfaces. Supports streaming, tool use, and multi-modal inputs.',
    url: 'https://github.com/username/ai-chat-sdk',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 342,
    forks: 67,
    featured: true,
  },
  {
    name: 'mpc-voting-contract',
    description: 'Privacy-preserving voting smart contract using multi-party computation. Built on Partisia Blockchain.',
    url: 'https://github.com/username/mpc-voting-contract',
    language: 'Rust',
    languageColor: '#dea584',
    stars: 89,
    forks: 15,
    featured: true,
  },
  {
    name: 'design-tokens-cli',
    description: 'CLI tool for syncing design tokens between Figma, CSS, and component libraries. Supports multiple output formats.',
    url: 'https://github.com/username/design-tokens-cli',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 56,
    forks: 8,
  },
]
