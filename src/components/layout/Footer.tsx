import Link from 'next/link'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
              Pranav Khaire
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              Building AI, IoT & Modern Web Experiences
            </p>
            <a 
              href="mailto:khairepranav246@gmail.com" 
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00ffb3] hover:text-white transition-colors"
            >
              khairepranav246@gmail.com
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Links */}
          <div>
            <p className="text-meta mb-4">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/web', label: 'Web Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="text-meta mb-4">Connect</p>
            <div className="flex flex-col gap-2.5">
              {[
                { href: 'https://github.com', label: 'GitHub' },
                { href: 'https://linkedin.com', label: 'LinkedIn' },
                { href: 'https://twitter.com', label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors w-fit"
                >
                  <ExternalLink size={14} />
                  {s.label}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-subtle)]">
            © {new Date().getFullYear()} Pranav Khaire. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Designed & built with Next.js, GSAP & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
