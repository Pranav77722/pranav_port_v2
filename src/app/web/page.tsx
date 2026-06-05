import type { Metadata } from 'next'
import { WebGalleryClient } from './WebGalleryClient'

export const metadata: Metadata = {
  title: 'Web Gallery',
  description: 'Design & development showcase. Creative web projects spanning Three.js, Web3, fintech, and data visualization.',
}

export default function WebGalleryPage() {
  return <WebGalleryClient />
}
