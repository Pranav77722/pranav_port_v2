import { Hero } from '@/components/home/Hero'
import { AboutIntro } from '@/components/home/AboutIntro'
import { ProjectStrip } from '@/components/home/ProjectStrip'

export default function Home() {
  return (
    <main className="w-full block overflow-x-hidden">
      {/* Hero Section — Spline rendered dynamically inside Hero */}
      <Hero />

      {/* About Intro */}
      <AboutIntro />

      {/* Project Strip */}
      <ProjectStrip />

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2
            className="text-display-xl max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Let&apos;s build something extraordinary together.
          </h2>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all rounded"
            >
              Get in touch
            </a>
            <a
              href="mailto:khairepranav246@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              khairepranav246@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
