'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfileLightboxProps {
  open: boolean
  onClose: () => void
}

export function ProfileLightbox({ open, onClose }: ProfileLightboxProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* ── Close button ── */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.2, duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Close lightbox"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* ── Photo container ── */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 8 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 22,
              mass: 1,
            }}
          >
            {/* ── Outer glow rings ── */}
            <div className="absolute -inset-8 sm:-inset-12 rounded-full opacity-30 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(52,211,153,0.05) 50%, transparent 70%)',
              }}
            />
            <div className="absolute -inset-4 sm:-inset-6 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 60%)',
              }}
            />

            {/* ── Animated border ring ── */}
            <motion.div
              className="absolute -inset-[3px] sm:-inset-1 rounded-2xl sm:rounded-3xl"
              style={{
                background: 'conic-gradient(from 0deg, rgba(52,211,153,0.6), rgba(52,211,153,0.1), rgba(110,231,183,0.4), rgba(52,211,153,0.1), rgba(52,211,153,0.6))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Photo frame ── */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_60px_rgba(52,211,153,0.2),0_0_120px_rgba(52,211,153,0.08)] techy-avatar">
              <Image
                src="/profile.webp"
                alt="Pranav Khaire"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                priority
              />

              {/* ── Inner shine overlay ── */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 pointer-events-none" />

              {/* ── Animated shimmer ── */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 60%)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              />
            </div>

            {/* ── Name label ── */}
            <motion.div
              className="absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p
                className="text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-white/90"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Pranav <span className="text-emerald-400">Khaire</span>
              </p>
              <p
                className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-emerald-500/60 mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Creative Builder & Software Engineer
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
