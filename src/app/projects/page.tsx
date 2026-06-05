import type { Metadata } from 'next'
import { ProjectsPageClient } from './ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects spanning prototyping, web apps, design tools, blockchain, and AI/ML.',
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
