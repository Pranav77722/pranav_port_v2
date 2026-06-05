import type { Metadata } from 'next'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About',
  description: 'Design engineer turned software engineer. Learn about my journey, skills, and open source work.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
