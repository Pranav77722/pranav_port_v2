'use client'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { MobileMenu } from './MobileMenu'
import { ProfileLightbox } from '@/components/ui/ProfileLightbox'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/web', label: 'Web Gallery' },
  { href: '/contact', label: 'Contact' },
]

// ── Magnetic hover hook (desktop only) ──
function useMagnetic(strength = 0.3) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { springX, springY, handleMouseMove, handleMouseLeave }
}

// ── NavLink with magnetic effect ──
function NavLink({ link, isActive, hoveredPath, setHoveredPath }: {
  link: { href: string; label: string }
  isActive: boolean
  hoveredPath: string | null
  setHoveredPath: (path: string | null) => void
}) {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useMagnetic(0.25)

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave()
        setHoveredPath(null)
      }}
    >
      <Link
        href={link.href}
        onMouseEnter={() => setHoveredPath(link.href)}
        className={cn(
          'relative h-9 flex items-center px-3 lg:px-4 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.12em] lg:tracking-[0.14em] transition-all duration-300 leading-none rounded-lg whitespace-nowrap',
          isActive
            ? 'text-emerald-400'
            : 'text-white/40 hover:text-white/90'
        )}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Active pill indicator */}
        {isActive && (
          <motion.div
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-lg -z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.12), rgba(52,211,153,0.04))',
              border: '1px solid rgba(52,211,153,0.2)',
              boxShadow: '0 0 20px rgba(52,211,153,0.08), inset 0 1px 0 rgba(52,211,153,0.1)',
            }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        {/* Hover pill (non-active) */}
        {!isActive && hoveredPath === link.href && (
          <motion.div
            layoutId="nav-hover-pill"
            className="absolute inset-0 rounded-lg bg-white/[0.04] border border-white/[0.06] -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
          />
        )}

        {/* Active dot */}
        {isActive && (
          <motion.span
            layoutId="nav-active-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
            style={{ boxShadow: '0 0 6px rgba(52,211,153,0.6)' }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
          />
        )}

        <span className="relative z-10">{link.label}</span>
      </Link>
    </motion.div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  // ── Scroll: hide on down, reveal on up ──
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Mount animation ──
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // ── Close mobile menu on route change ──
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const openProfile = () => {
    window.dispatchEvent(new CustomEvent('toggle-profile'))
  }

  return (
    <>
      {/* ── Navbar Container ── */}
      <motion.div
        className="fixed left-0 right-0 w-full flex justify-center pointer-events-none z-[100] px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden"
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: mounted ? 1 : 0,
        }}
        transition={{
          y: { type: 'spring', stiffness: 260, damping: 30 },
          opacity: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
        }}
        style={{ top: scrolled ? 6 : 12, paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <header
          ref={navRef}
          className="pointer-events-auto relative w-full max-w-full sm:max-w-[1400px] overflow-hidden transition-all duration-500 ease-out"
        >
          {/* ── Animated gradient border ── */}
          <div
            className="absolute -inset-px rounded-2xl opacity-40 transition-opacity duration-500 hidden sm:block"
            style={{
              background: scrolled
                ? 'linear-gradient(135deg, rgba(52,211,153,0.3), rgba(52,211,153,0.05) 30%, transparent 60%, rgba(52,211,153,0.05) 80%, rgba(52,211,153,0.2))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02) 30%, transparent 60%, rgba(255,255,255,0.02) 80%, rgba(255,255,255,0.08))',
              borderRadius: '1rem',
              animation: 'borderRotate 8s linear infinite',
            }}
          />

          {/* ── Glass background ── */}
          <div
            className={cn(
              'relative rounded-2xl transition-all duration-500 ease-out',
              scrolled
                ? 'py-2 sm:py-2.5 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#0a0a0a]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.05)]'
                : 'py-2.5 sm:py-3.5 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#0a0a0a]/50 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_1px_rgba(255,255,255,0.06)]'
            )}
          >
            {/* ── Inner top shine ── */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

            {/* ── Content ── */}
            <div className="relative flex items-center justify-between gap-2 min-w-0 overflow-hidden">

              {/* ── Logo ── */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="relative"
                >
                  {/* Glow ring */}
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-400/30 via-emerald-500/10 to-transparent opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  {/* Profile image — click to open lightbox */}
                  <div
                    className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-emerald-500/30 group-hover:border-emerald-400/60 overflow-hidden transition-all duration-300 shadow-[0_0_12px_rgba(52,211,153,0.1)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] cursor-pointer techy-avatar"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setLightboxOpen(true)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="View profile photo"
                  >
                    <Image src="/profile.webp" alt="Pranav" fill className="object-cover" />
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border-[1.5px] sm:border-2 border-[#0a0a0a]">
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  </div>
                </motion.div>

                <div className="flex flex-col">
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-white/90 group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Pranav <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">Khaire</span>
                    <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors hidden sm:inline"></span>
                  </span>
                  <span
                    className="text-[7px] sm:text-[8px] font-medium tracking-[0.12em] sm:tracking-[0.15em] uppercase text-emerald-500/60 group-hover:text-emerald-400/80 transition-colors duration-300 hidden md:block"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Available for work
                  </span>
                </div>
              </Link>

              {/* ── Desktop Navigation ── */}
              <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <div key={link.href} className="flex items-center gap-0.5 lg:gap-1">
                      <NavLink
                        link={link}
                        isActive={isActive}
                        hoveredPath={hoveredPath}
                        setHoveredPath={setHoveredPath}
                      />
                      {index < navLinks.length - 1 && (
                        <div className="w-px h-3.5 bg-white/[0.08]" />
                      )}
                    </div>
                  )
                })}

                {/* Divider */}
                <div className="w-px h-4 bg-white/10 mx-1 lg:mx-2" />

                {/* Profile CTA */}
                <motion.button
                  onClick={openProfile}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative h-8 lg:h-9 flex items-center gap-1.5 px-3 lg:px-5 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.1em] lg:tracking-[0.12em] rounded-lg overflow-hidden transition-all duration-300 group/btn"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 to-emerald-400/5 border border-emerald-500/20 rounded-lg group-hover/btn:from-emerald-500/25 group-hover/btn:to-emerald-400/10 group-hover/btn:border-emerald-400/40 transition-all duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(52,211,153,0.15)]" />
                  <span className="relative text-emerald-400 group-hover/btn:text-emerald-300 transition-colors">Profile</span>
                  <svg className="relative w-2.5 h-2.5 lg:w-3 lg:h-3 text-emerald-500/60 group-hover/btn:text-emerald-400 group-hover/btn:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </motion.button>
              </nav>

              {/* ── Mobile Hamburger ── */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                className="md:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center z-[100] active:bg-white/[0.08] transition-all duration-200 shrink-0"
                aria-label="Toggle Menu"
              >
                <div className="relative w-4 h-3 flex flex-col justify-between">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 5.5, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                    transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
                    className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block w-3/4 h-[1.5px] bg-white/60 rounded-full"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -5.5, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                    transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
                    className="block h-[1.5px] bg-white/80 rounded-full origin-center"
                  />
                </div>
              </motion.button>

            </div>
          </div>
        </header>
      </motion.div>

      {/* ── Vertical Profile Side Tab (desktop/tablet only) ── */}
      <motion.button
        onClick={openProfile}
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[99] items-center justify-center cursor-pointer group"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="relative py-6 px-2.5 rounded-l-xl border border-r-0 border-white/[0.06] bg-white/[0.03] backdrop-blur-md group-hover:bg-emerald-500/[0.08] group-hover:border-emerald-500/20 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all duration-500">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25 group-hover:text-emerald-400/80 transition-colors duration-500"
            style={{
              fontFamily: 'var(--font-body)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}
          >
            Profile
          </span>
        </div>
      </motion.button>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
      <ProfileLightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  )
}
