import { Variants } from 'framer-motion'

// ── Page Transitions ──────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
  },
}

// ── Fade Up (common reveal) ───────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
}

// ── Stagger Container ─────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// ── Stagger Item ──────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

// ── Slide In From Right ───────────────────────────
export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.77, 0, 0.175, 1],
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0],
    },
  },
}

// ── Mobile Menu Links ─────────────────────────────
export const menuLinkVariants: Variants = {
  closed: { opacity: 0, y: 30 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
}

// ── Card Hover ────────────────────────────────────
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

// ── Timeline Item Reveal ──────────────────────────
export const timelineReveal: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
}

// ── Image Fade ────────────────────────────────────
export const imageFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

// ── Nav Bar Entry ─────────────────────────────────
export const navEntry: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}
