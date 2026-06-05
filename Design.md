# Design.md — bettinasosa.com Portfolio
## Complete Reverse-Engineering & Recreation Blueprint

> **Author:** Senior UI/UX Design & Frontend Architecture Analysis  
> **Source:** https://www.bettinasosa.com  
> **GitHub:** https://github.com/bettinasosa/portfolio  
> **Date:** May 2026  
> **Difficulty:** ★★★★☆ (Advanced)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design Style Analysis](#2-design-style-analysis)
3. [Layout Architecture](#3-layout-architecture)
4. [Color System](#4-color-system)
5. [Typography System](#5-typography-system)
6. [Component Library](#6-component-library)
7. [Animation System](#7-animation-system)
8. [Technology Stack](#8-technology-stack)
9. [Responsive Design](#9-responsive-design)
10. [Design System Tokens](#10-design-system-tokens)
11. [Recreation Blueprint](#11-recreation-blueprint)
12. [Tailwind CSS Theme Configuration](#12-tailwind-css-theme-configuration)
13. [React Component Structure](#13-react-component-structure)
14. [Framer Motion Animation Presets](#14-framer-motion-animation-presets)
15. [Claude Code Prompt](#15-claude-code-prompt)

---

## 1. Executive Summary

Bettina Sosa's portfolio is a **dark-mode editorial portfolio** blending Minimalist Swiss design principles with cinematic scroll storytelling. The experience is built for a dual audience: technical hiring managers and creative collaborators. It communicates **"design engineer"** identity — someone who thinks visually but builds precisely.

The site's defining characteristics:
- **Dark monochromatic base** (#0a0a0a background) with warm serif display typography
- **Cinematic full-screen sections** separated by generous whitespace
- **Character-splitting text animations** — individual letters rendered as separate DOM elements for GSAP timeline control
- **Sliding/expanding panel navigation** with a profile sidebar that reveals on demand
- **Horizontal scroll carousels** for project image galleries
- **Live data widgets** (live clock showing UK timezone, GitHub repo cards via Octokit API)
- **Vertical scroll-driven storytelling** via Lenis smooth scroll + GSAP ScrollTrigger

---

## 2. Design Style Analysis

### 2.1 Overall Design Philosophy

**"Controlled Restraint with Dramatic Punctuation"**

The site practices severe editorial restraint — long stretches of near-empty black canvas — broken by deliberate typographic moments. This is the visual grammar of high-end fashion editorials (Dazed, i-D) applied to a developer portfolio. Negative space is weaponized to make content land harder.

Key philosophy tenets:
- Every element earns its position; nothing is decorative filler
- Typography does the visual heavy lifting (mixed serif/sans hierarchies)
- Motion communicates intelligence and craft, not just aesthetics
- Information architecture mirrors her self-description: "design engineer" — structured but human

### 2.2 Visual Style Category

**Primary:** `Editorial Minimalism` with `Kinetic Typography`  
**Secondary influences:** Swiss International Style, Brutalist web typography, Awwwards-era motion design

This is NOT:
- Glassmorphism (no frosted glass, backdrop-blur heavy patterns)
- Bento Grid (no card grid layouts)
- Neo-brutalism (no thick borders / raw HTML aesthetics)
- Cyberpunk (no neon glow, gradients, or sci-fi chrome)

### 2.3 User Experience Approach

The UX is **immersive and sequential.** The user is guided through a narrative:
1. Kinetic text intro → who she is
2. Scroll reveal → what she does
3. Project gallery scroll → evidence of her work
4. About page → deeper biography via timeline
5. Contact → direct CTA

The **side panel** (profile card with photo, email, socials, timezone) functions as a persistent identity widget — slide it in from the right, and it transforms the page into a diptych layout. This is a signature UX device not commonly seen in developer portfolios.

### 2.4 Design Inspiration Sources

- Awwwards SOTM winners (2022–2024)
- Locomotive Scroll showcase sites
- Editorial design: Kinfolk magazine, Bloomberg Businessweek
- Portfolio references: Bruno Simon, Maxime Heckel
- Motion: GSAP showcase

### 2.5 Unique Visual Elements

1. **Character-split marquee text** — individual `<span>` letters for "Creativity is my craft / abstract thinking is my passion"
2. **Vimeo loop background video** embedded in the hero section (autoplay, muted, loop, no controls)
3. **Live timezone clock** showing UK time with real-time updates
4. **Sliding profile panel** — full-screen overlay/sidebar with profile photo, bio, socials
5. **Horizontal project image strip** — scrollable image carousel using Embla or GSAP horizontal scroll
6. **Kinetic hero text reveal** — "software engineer" rendered character by character with stagger
7. **Open source repo cards** — pulled live from GitHub via Octokit API

---

## 3. Layout Architecture

### 3.1 Navigation Structure

```
DESKTOP NAV
┌──────────────────────────────────────────────────────────┐
│  [Logo: Bettinas logo © coded by Bettina Sosa]   About  Projects  Web Gallery  Blog  Contact  │
└──────────────────────────────────────────────────────────┘

MOBILE NAV
┌──────────────────────────────────────────────┐
│  [Logo]                              [Menu]  │
└──────────────────────────────────────────────┘
         ↓ (Menu opens)
┌──────────────────────────────────────────────┐
│                                    [Close]  │
│  About                                      │
│  Projects                                   │
│  Web Gallery                                │
│  Blog                                       │
│  Contact                                    │
└──────────────────────────────────────────────┘
```

**Nav behavior:**
- Fixed position, `position: fixed; top: 0; width: 100%; z-index: 100`
- Logo left-aligned, links right-aligned
- Background: transparent or very subtle dark overlay on scroll
- Logo is a small image + text "© coded by Bettina Sosa"
- Mobile: hamburger "Menu" text (not icon) → full-screen overlay menu with "Close" text

**Profile Side Panel** (separate from nav):
- Triggered by some interaction (scroll to bottom or specific button)
- Slides in from right as full-height sidebar
- Contains: profile photo, "Let's work together!", CTA button, email, bio, version/timezone/socials metadata

### 3.2 Hero Section Design

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│     [CHARACTER-SPLIT KINETIC TEXT, large display font]      │
│     "A software engineer with a passion for innovation      │
│      and cutting-edge technology."                          │
│                                                             │
│                                                             │
│     [Vertical scroll indicator: "Scroll" with line]         │
│                                                             │
│     [Background: Vimeo video loop, full-bleed, dark overlay]│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Key features:
- Full viewport height (`100vh`)
- Video background from Vimeo (autoplay, loop, muted, no controls)
- Text rendered as individual `<span>` character elements for stagger animation
- Two text marquee strips with vertical orientation: "Creativity is my craft" / "abstract thinking is my passion"
- "Scroll" CTA at bottom with animated downward arrow or line

### 3.3 About Section Layout (Homepage intro)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Large display text — staggered word reveal on scroll]     │
│  "A software engineer with a passion for innovation         │
│   and cutting-edge technology."                             │
│                                                             │
│  [Smaller body text — fade in]                              │
│  "Particularly interested in the intersection of art,       │
│   design, and software..."                                  │
│                                                             │
│  [CTA: "About me →"]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 About Page Layout (Full `/about` page)

```
┌─────────────────────────────────────────────────────────────┐
│  [Large display heading — character animated]               │
│  "Design engineer turned software engineer."                │
├─────────────────────────────────────────────────────────────┤
│  My Superpower     │  Outside the IDE                       │
│  [text block]      │  [text block]                          │
├─────────────────────────────────────────────────────────────┤
│  WHERE I'VE BEEN                                            │
│  [Vertical timeline]                                        │
│  Now  ──── Freelance Engineer & DevRel                      │
│  2025 ──── Head of Engineering @ Partisia                   │
│  2024 ──── AI & Trading Systems @ Catapult                  │
│  ...                                                        │
├─────────────────────────────────────────────────────────────┤
│  OPEN SOURCE                                                │
│  [GitHub repo cards in horizontal strip]                    │
│  [telegram-ai-bot] [portfolio] [mpc-voting-contract]        │
└─────────────────────────────────────────────────────────────┘
```

### 3.5 Projects Page Layout (`/projects`)

```
┌─────────────────────────────────────────────────────────────┐
│  [Project tab navigation]                                   │
│  M31 Controller | AXO | StyleSync | StackeRs | ASTRA        │
├─────────────────────────────────────────────────────────────┤
│  [Full-width horizontally scrollable image strip]           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │img 1 │ │img 2 │ │img 3 │ │img 4 │ │img 5 │             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                             │
│  [Project title + category tag]                             │
│  M31 Controller     Prototyping                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.6 Web Gallery Layout (`/web`)

```
┌─────────────────────────────────────────────────────────────┐
│  # Web Gallery                                              │
│  # Design & Development                                     │
├─────────────────────────────────────────────────────────────┤
│  [Grid: 2-col on desktop, 1-col mobile]                     │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ [image]            │  │ [image]            │            │
│  │ ### One Thought... │  │ ### WalletCon      │            │
│  │ description        │  │ description        │            │
│  │ [tag] [tag]        │  │ [tag] [tag]        │            │
│  │ [View Project →]   │  │ [View Project →]   │            │
│  └────────────────────┘  └────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### 3.7 Contact Section Layout (`/contact`)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Large scattered display text]                             │
│  "software"                                                 │
│  "&"           "design"                                     │
│  "engineer"    "Ldn"                                        │
│                                                             │
│  [Three link buttons]                                       │
│  → Linkedin   → Email   → Github                           │
│                                                             │
│  ## Let's talk!                                             │
│  [Contact form: Subject / Email / Message]                  │
│  [Submit]                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.8 Grid System

- **Base grid:** 12-column CSS Grid
- **Max container width:** 1400px (`2xl` Tailwind breakpoint)
- **Container padding:** `2rem` (32px) on all sizes
- **Custom grid:** `grid-template-columns: repeat(53, minmax(0, 1fr))` — 53-column GitHub-style contribution grid used likely for a visual calendar/activity heatmap
- **Section layout:** mostly full-bleed with internal content constraints

### 3.9 Spacing System

Based on Tailwind defaults (4px base unit):

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Tight internal |
| `space-4` | 16px | Default padding |
| `space-6` | 24px | Component gaps |
| `space-8` | 32px | Section internal |
| `space-12` | 48px | Card padding |
| `space-16` | 64px | Section padding |
| `space-24` | 96px | Large section gaps |
| `space-32` | 128px | Hero margins |
| `space-48` | 192px | Section whitespace |

---

## 4. Color System

### 4.1 Observed Color Palette

Based on visual analysis of the dark editorial style:

```css
:root {
  /* ── Background ── */
  --color-bg-primary:    #0a0a0a;   /* Near-black base */
  --color-bg-secondary:  #111111;   /* Slightly lifted black */
  --color-bg-card:       #141414;   /* Card/panel background */
  --color-bg-hover:      #1a1a1a;   /* Hover state surfaces */

  /* ── Foreground / Text ── */
  --color-text-primary:  #f5f5f5;   /* Off-white headlines */
  --color-text-body:     #d4d4d4;   /* Body copy */
  --color-text-muted:    #737373;   /* Metadata, timestamps */
  --color-text-subtle:   #404040;   /* Decorative, disabled */

  /* ── Accent ── */
  --color-accent-warm:   #e8e0d5;   /* Warm cream — display text */
  --color-accent-red:    #dc2626;   /* Potential link/CTA hover */

  /* ── Borders ── */
  --color-border:        #262626;   /* Default border */
  --color-border-subtle: #1c1c1c;   /* Subtle dividers */

  /* ── shadcn/ui HSL Tokens (from tailwind.config.ts) ── */
  --background:     0 0% 4%;         /* hsl(0,0%,4%) = #0a0a0a */
  --foreground:     0 0% 96%;        /* hsl(0,0%,96%) = #f5f5f5 */
  --primary:        0 0% 96%;        /* White */
  --primary-foreground: 0 0% 4%;    /* Near black */
  --secondary:      0 0% 8%;         /* Dark gray */
  --secondary-foreground: 0 0% 96%;
  --muted:          0 0% 10%;
  --muted-foreground: 0 0% 45%;     /* #737373 */
  --accent:         0 0% 10%;
  --accent-foreground: 0 0% 96%;
  --border:         0 0% 15%;        /* #262626 */
  --input:          0 0% 15%;
  --ring:           0 0% 80%;
  --radius:         0.5rem;
}
```

### 4.2 CSS Variables Reference

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 96%;
    --card: 0 0% 6%;
    --card-foreground: 0 0% 96%;
    --popover: 0 0% 6%;
    --popover-foreground: 0 0% 96%;
    --primary: 0 0% 96%;
    --primary-foreground: 0 0% 4%;
    --secondary: 0 0% 8%;
    --secondary-foreground: 0 0% 96%;
    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 45%;
    --accent: 0 0% 10%;
    --accent-foreground: 0 0% 96%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 0 0% 80%;
    --radius: 0.5rem;
  }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### 4.3 Color Usage Map

| Element | Color |
|---------|-------|
| Page background | `#0a0a0a` |
| Display headings | `#f5f5f5` or `#e8e0d5` (warm) |
| Body text | `#d4d4d4` |
| Metadata (version, timezone) | `#737373` |
| Nav links | `#f5f5f5` |
| Nav links (hover) | `#d4d4d4` with underline |
| Card backgrounds | `#141414` |
| Dividers / borders | `#262626` |
| CTA buttons (text) | `#f5f5f5` |
| CTA buttons (border) | `#262626` |
| CTA buttons (hover bg) | `#1a1a1a` |
| Tags / badges | `#1a1a1a` bg, `#737373` text |
| Sidebar panel | `#111111` |

---

## 5. Typography System

### 5.1 Font Families

From `tailwind.config.ts`:

```ts
fontFamily: {
  display: ['"Inria Serif"', 'serif'],      // Elegant display serif
  body:    ['Inter', 'sans-serif'],          // Clean UI sans-serif
  playfair:['"Playfair Display"', 'serif'],  // Secondary serif option
}
```

**Inria Serif** — The hero/display typeface. An open-source typeface from Google Fonts, designed with humanist letterforms. Used for large headings, character-split animations, and section titles. Pairs intellectual weight with artistic sensibility.

**Inter** — The workhorse UI font. Used for body copy, labels, nav, metadata, form inputs. Highly legible at all sizes.

**Playfair Display** — Alternate serif for specific accents (likely used for pull-quotes, sidebar headings, or editorial moments).

### 5.2 Font Import

```css
/* In globals.css or layout.tsx */
@import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
```

Or via `@fontsource/inter` (already in package.json):
```ts
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
```

### 5.3 Type Scale

```css
/* Display - Inria Serif */
.text-display-xl  { font-size: clamp(3rem, 8vw, 7rem);  font-family: 'Inria Serif'; font-weight: 300; line-height: 1.0; letter-spacing: -0.02em; }
.text-display-lg  { font-size: clamp(2rem, 5vw, 4.5rem); font-family: 'Inria Serif'; font-weight: 400; line-height: 1.1; letter-spacing: -0.01em; }
.text-display-md  { font-size: clamp(1.5rem, 3vw, 2.5rem); font-family: 'Inria Serif'; font-weight: 400; line-height: 1.2; }

/* UI - Inter */
.text-ui-lg   { font-size: 1.125rem; /* 18px */ font-family: 'Inter'; font-weight: 500; }
.text-ui-md   { font-size: 1rem;     /* 16px */ font-family: 'Inter'; font-weight: 400; }
.text-ui-sm   { font-size: 0.875rem; /* 14px */ font-family: 'Inter'; font-weight: 400; }
.text-ui-xs   { font-size: 0.75rem;  /* 12px */ font-family: 'Inter'; font-weight: 400; }

/* Metadata */
.text-meta    { font-size: 0.75rem; font-family: 'Inter'; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; color: hsl(var(--muted-foreground)); }
```

### 5.4 Heading Hierarchy

```
H1 — Page title, hero intro text
     Font: Inria Serif, 300–400 weight
     Size: clamp(3rem, 8vw, 7rem)
     Color: #f5f5f5
     Letter-spacing: -0.02em
     Line-height: 1.0

H2 — Section headers ("Where I've Been", "Open Source")
     Font: Inria Serif or Inter, 400 weight
     Size: clamp(1.5rem, 3vw, 2.5rem)
     Color: #f5f5f5

H3 — Card titles, subsection labels
     Font: Inter, 500 weight
     Size: 1.125rem–1.25rem
     Color: #f5f5f5

Body — Paragraph text
     Font: Inter, 400 weight
     Size: 1rem (16px)
     Color: #d4d4d4
     Line-height: 1.6

Small / Meta — Timestamps, tags, version numbers
     Font: Inter, 400 weight
     Size: 0.75rem–0.875rem
     Color: #737373
     Letter-spacing: 0.08em (uppercase tracking for labels)
```

### 5.5 Special Typography

**Character-split animation text:** Individual letters wrapped in `<span>` elements with `display: inline-block`. This allows GSAP to animate each character independently (stagger, y-offset, opacity).

```html
<!-- Rendered output of character-split text -->
<span class="char" style="display: inline-block;">C</span>
<span class="char" style="display: inline-block;">r</span>
<span class="char" style="display: inline-block;">e</span>
...
```

---

## 6. Component Library

### 6.1 Navigation Bar

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo img 32×32] © coded by Bettina Sosa    About Projects  Web Blog Contact │
└─────────────────────────────────────────────────────────────┘

Specs:
- Height: 56–64px
- Position: fixed, top:0, z-index: 50
- Background: transparent → rgba(10,10,10,0.9) + backdrop-blur(8px) on scroll
- Logo: small square image + italic serif caption text
- Links: Inter 14px, #d4d4d4, hover → #f5f5f5 with border-bottom 1px
- Mobile: "Menu" text replaces icon, opens full-screen overlay
```

### 6.2 Mobile Menu Overlay

```
Full-screen, black background
- Close button top-right: "Close" text, same style as "Menu"
- Nav links: large display text (Inria Serif, ~3rem), staggered slide-up animation
- Animation: translateY(30px) → 0, opacity 0 → 1, stagger 0.1s per link
```

### 6.3 Profile Side Panel

```
Width: 320–380px (or full-screen on mobile)
Position: fixed right, slides in from off-screen
Background: #111111
Border-left: 1px solid #262626
Padding: 32px

Contents:
- Profile photo: ~200×200px, rounded (border-radius: 50% or rounded-lg)
- "Let's work together!" heading — Inria Serif
- [Get in touch] button
- Email text
- Bio text (small, muted)
- Version label + value ("2024 © Edition")
- Timezone label + live clock value
- Socials label + Twitter/Github/LinkedIn links

Backdrop: Dark overlay covers rest of page when panel open
Animation: translateX(100%) → translateX(0), ease-out 0.4s
```

### 6.4 Buttons

```css
/* Primary CTA */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid hsl(var(--border));   /* #262626 */
  background: transparent;
  color: hsl(var(--foreground));          /* #f5f5f5 */
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  border-radius: 4px;
  transition: background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}
.btn-primary:hover {
  background: hsl(var(--muted));          /* #1a1a1a */
  border-color: hsl(var(--muted-foreground)); /* #737373 */
}

/* Link Arrow CTA ("About me →", "View Projects →") */
.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: hsl(var(--foreground));
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.btn-link:hover {
  border-bottom-color: hsl(var(--foreground));
}
```

### 6.5 Project Cards (Gallery)

```css
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  transition: transform 0.3s ease;
}
.project-card:hover {
  transform: translateY(-4px);
}
.project-card .project-image {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  display: block;
}
.project-card .project-info {
  padding: 16px 20px;
}
.project-card .project-title {
  font-family: 'Inria Serif', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: hsl(var(--foreground));
}
.project-card .project-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}
```

### 6.6 Tags / Badges

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  background: hsl(var(--muted));          /* #1a1a1a */
  color: hsl(var(--muted-foreground));    /* #737373 */
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
}
```

### 6.7 Timeline Item (About page)

```css
.timeline-item {
  display: grid;
  grid-template-columns: 80px 1px 1fr;
  gap: 0 24px;
  padding-bottom: 48px;
}
.timeline-year {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--muted-foreground));
  padding-top: 4px;
}
.timeline-line {
  width: 1px;
  background: hsl(var(--border));
  position: relative;
}
.timeline-line::before {
  content: '';
  position: absolute;
  top: 8px;
  left: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: hsl(var(--foreground));
}
.timeline-content h3 {
  font-family: 'Inria Serif', serif;
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 8px;
}
```

### 6.8 GitHub Repo Cards

```css
.repo-card {
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  padding: 20px 24px;
  background: hsl(var(--card));
  transition: border-color 0.2s ease, background 0.2s ease;
}
.repo-card:hover {
  border-color: hsl(var(--muted-foreground));
  background: hsl(var(--muted));
}
.repo-card .repo-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}
.repo-card .repo-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-top: 4px;
}
.repo-card .repo-badge {
  /* "Featured" label */
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
}
```

### 6.9 Form Inputs

```css
.form-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid hsl(var(--border));
  padding: 12px 0;
  color: hsl(var(--foreground));
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}
.form-input:focus {
  border-bottom-color: hsl(var(--foreground));
}
.form-input::placeholder {
  color: hsl(var(--muted-foreground));
}
```

### 6.10 Social Link Icons

```css
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: hsl(var(--muted-foreground));
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}
.social-link:hover {
  color: hsl(var(--foreground));
}
/* Uses Radix UI icons or Lucide React icons */
```

---

## 7. Animation System

### 7.1 Animation Philosophy

The site uses **three animation tiers:**

1. **Page Load (Entry)** — GSAP timeline, staggered, runs once on mount
2. **Scroll-driven (Progress)** — GSAP ScrollTrigger + Lenis smooth scroll
3. **Interaction (Micro)** — CSS transitions for hover/focus/active states

### 7.2 Character-Split Text Animation

```js
// GSAP character split — the site's signature animation
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText' // Or manual split

// Manual split utility
function splitChars(element) {
  const text = element.innerText
  element.innerHTML = text
    .split('')
    .map(char => char === ' ' 
      ? '<span class="char space" style="display:inline-block">&nbsp;</span>'
      : `<span class="char" style="display:inline-block">${char}</span>`)
    .join('')
  return element.querySelectorAll('.char')
}

// Animate on scroll
const chars = splitChars(headingEl)
gsap.from(chars, {
  scrollTrigger: {
    trigger: headingEl,
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 40,
  opacity: 0,
  stagger: 0.02,
  duration: 0.6,
  ease: 'power3.out'
})
```

### 7.3 Page Load Sequence

```js
// Master timeline on page mount
const tl = gsap.timeline({ delay: 0.2 })

tl
  .from('.nav', { y: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
  .from('.hero-text .char', {
    y: 60,
    opacity: 0,
    stagger: 0.015,
    duration: 0.8,
    ease: 'power4.out'
  }, '-=0.3')
  .from('.hero-scroll-cta', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
```

### 7.4 Smooth Scroll with Lenis

```js
// Lenis setup — in layout.tsx or a context provider
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2
})

// Sync Lenis with GSAP ticker
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// ScrollTrigger integration
lenis.on('scroll', ScrollTrigger.update)
```

### 7.5 Scroll Reveal Animations

```js
// Standard section reveal
gsap.from('.section-content', {
  scrollTrigger: {
    trigger: '.section-content',
    start: 'top 75%',
    end: 'bottom 25%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.1
})

// Timeline items stagger reveal
gsap.from('.timeline-item', {
  scrollTrigger: {
    trigger: '.timeline',
    start: 'top 70%',
    scrub: false
  },
  x: -30,
  opacity: 0,
  stagger: 0.15,
  duration: 0.5,
  ease: 'power2.out'
})
```

### 7.6 Sidebar Panel Animation

```js
// Profile panel slide-in
function openPanel() {
  gsap.fromTo('.profile-panel', 
    { x: '100%' },
    { x: '0%', duration: 0.5, ease: 'power3.inOut' }
  )
  gsap.fromTo('.panel-overlay',
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' }
  )
}
function closePanel() {
  gsap.to('.profile-panel', { x: '100%', duration: 0.4, ease: 'power3.in' })
  gsap.to('.panel-overlay', { opacity: 0, duration: 0.3 })
}
```

### 7.7 Horizontal Image Scroll (Projects)

```js
// GSAP horizontal scroll panel
const images = document.querySelector('.project-images')
const totalWidth = images.scrollWidth - window.innerWidth

gsap.to('.project-images', {
  x: -totalWidth,
  ease: 'none',
  scrollTrigger: {
    trigger: '.projects-section',
    start: 'top top',
    end: `+=${totalWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1
  }
})
```

### 7.8 CSS Transition Defaults

```css
/* Global transition defaults */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
}

a, button {
  transition: color 0.2s ease, background-color 0.2s ease, 
              border-color 0.2s ease, opacity 0.2s ease;
}

.project-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 7.9 Vertical Marquee / Ticker Text

```js
// Rotating marquee animation (the "Creativity is my craft" text strips)
// These appear to be vertically rotated text that may use CSS animation
gsap.to('.marquee-track', {
  yPercent: -50,
  ease: 'none',
  repeat: -1,
  duration: 12
})
```

### 7.10 Recommended Libraries

| Library | Version | Purpose | Confidence |
|---------|---------|---------|-----------|
| `gsap` | `^3.12.5` | Primary animation engine | **Confirmed** |
| `@gsap/react` | `^2.1.1` | React hooks for GSAP | **Confirmed** |
| `@studio-freight/lenis` | `^1.0.42` | Smooth scroll | **Confirmed** |
| `lenis` | `^1.0.45` | (also installed) | **Confirmed** |
| `framer-motion` | `^11.18.2` | UI micro-interactions | **Confirmed** |
| `locomotive-scroll` | `^5.0.0-beta` | Alternative scroll | Installed but maybe unused |
| `react-tilt` | `^1.0.2` | 3D card tilt on hover | **Confirmed** |
| `vanilla-tilt` | `^1.8.1` | Tilt for non-React elements | **Confirmed** |
| `@react-three/fiber` | `^8.18.0` | 3D elements | Likely for future/specific pages |
| `@react-three/drei` | `^9.122.0` | Three.js helpers | Paired with above |

---

## 8. Technology Stack

### 8.1 Confirmed Stack

| Technology | Version | Confidence |
|-----------|---------|-----------|
| **Next.js** | 16.1.6 | ✅ Confirmed (package.json) |
| **React** | ^18 | ✅ Confirmed |
| **TypeScript** | ^5 | ✅ Confirmed (82.4% of codebase) |
| **Tailwind CSS** | 3.3.3 | ✅ Confirmed |
| **GSAP** | ^3.12.5 | ✅ Confirmed |
| **Framer Motion** | ^11.18.2 | ✅ Confirmed |
| **Lenis** | ^1.0.42 | ✅ Confirmed |
| **Vercel** | - | ✅ Confirmed (deploy badge) |
| **shadcn/ui** | ^0.0.4 | ✅ Confirmed (components.json) |
| **Radix UI** | various | ✅ Confirmed (multiple packages) |

### 8.2 Additional Dependencies (Confirmed)

- **Supabase** — for contact form storage / auth
- **Octokit REST** (`@octokit/rest`) — GitHub API for open source repo cards
- **Embla Carousel** — project image carousels
- **Swiper** — alternate slider implementation
- **Lucide React** — icons
- **React Hook Form** + `@hookform/resolvers` — form handling
- **date-fns** + `date-fns-tz` — live timezone clock
- **Luxon** — date/time utilities (timezone display)
- **d3-scale** + `react-d3-cloud` — data visualizations (possibly GitHub activity chart)
- **Three.js** + React Three Fiber — 3D scenes (selective pages)
- **Vercel Analytics** + Speed Insights — analytics
- **Spotify Web API** — possibly used in a "Now Playing" widget
- **SASS** — supplementary styling

### 8.3 CSS Framework Strategy

Hybrid approach:
- **Tailwind CSS** for utility classes and layout
- **SASS/SCSS** for complex animation states and component overrides
- **shadcn/ui** design tokens via CSS custom properties
- **CSS Modules** likely used for page-specific styles

### 8.4 Hosting & Infrastructure

- **Host:** Vercel (confirmed from README badge)
- **Domain:** Custom (bettinasosa.com)
- **CDN:** Vercel Edge Network
- **Video:** Vimeo embeds (not self-hosted)
- **Images:** Next.js Image Optimization (`/_next/image`)
- **Database:** Supabase (contact form, possibly more)
- **Analytics:** Vercel Analytics

---

## 9. Responsive Design

### 9.1 Breakpoints

From `tailwind.config.ts`:

```ts
screens: {
  '2xs': '380px',    // Small mobile
  xs:   '450px',    // Mobile
  sm:   '640px',    // Large mobile (Tailwind default)
  md:   '768px',    // Tablet (Tailwind default)
  lg:   '1024px',   // Small desktop (Tailwind default)
  xl:   '1280px',   // Desktop (Tailwind default)
  '2xl':'1400px',   // Wide desktop (custom max)
}
```

### 9.2 Layout Changes by Breakpoint

**Mobile (< 640px):**
- Single column layout everywhere
- Navigation: hidden links → hamburger "Menu" text
- Hero text: smaller clamp values, possibly line breaks adjusted
- Profile panel: full-screen overlay
- Projects: vertical stack, no horizontal scroll
- Timeline: simplified 2-col to single column

**Tablet (640px – 1024px):**
- 2-col grid for gallery/cards
- Nav links still visible (may compress)
- Hero text: medium scale
- Timeline: 2-col layout maintained
- Sidebar panel: fixed-width partial overlay

**Desktop (> 1024px):**
- Full layout with max-width container (1400px)
- Profile panel: slides in from right without full-screen overlay
- Projects: horizontal scroll strip
- About: 3-col for stats / timeline
- Gallery: 2–3 col grid

### 9.3 Navigation Mobile Behavior

```
Mobile state machine:
[Default] Menu visible, links hidden
    ↓ click "Menu"
[Open] Full-screen overlay, links visible, "Close" button shown
    ↓ click "Close" or link
[Default] Returns to base state

Animation: overlay fades in (opacity 0→1), links slide up (y 30→0, stagger 0.08s)
```

---

## 10. Design System Tokens

### 10.1 Complete Token Set

```css
:root {
  /* Colors */
  --color-bg:            #0a0a0a;
  --color-bg-raised:     #111111;
  --color-bg-overlay:    #141414;
  --color-text:          #f5f5f5;
  --color-text-secondary:#d4d4d4;
  --color-text-muted:    #737373;
  --color-text-subtle:   #404040;
  --color-border:        #262626;
  --color-border-muted:  #1c1c1c;
  --color-accent:        #e8e0d5;

  /* Typography */
  --font-display:        'Inria Serif', serif;
  --font-body:           'Inter', sans-serif;
  --font-alt:            'Playfair Display', serif;

  /* Type Scale */
  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-lg:    1.125rem;
  --text-xl:    1.25rem;
  --text-2xl:   1.5rem;
  --text-3xl:   1.875rem;
  --text-4xl:   2.25rem;
  --text-5xl:   3rem;
  --text-hero:  clamp(3rem, 8vw, 7rem);

  /* Line Heights */
  --leading-tight:   1.1;
  --leading-snug:    1.3;
  --leading-normal:  1.5;
  --leading-relaxed: 1.6;
  --leading-loose:   2;

  /* Letter Spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0em;
  --tracking-wide:   0.04em;
  --tracking-wider:  0.08em;
  --tracking-widest: 0.16em;

  /* Spacing */
  --space-1:  0.25rem;   /* 4px  */
  --space-2:  0.5rem;    /* 8px  */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-48: 12rem;     /* 192px */

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm:    0 1px 2px rgba(0,0,0,0.5);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.6);
  --shadow-lg:    0 8px 32px rgba(0,0,0,0.7);
  --shadow-panel: 0 0 40px rgba(0,0,0,0.8);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   350ms ease;
  --transition-panel:  450ms cubic-bezier(0.77, 0, 0.175, 1);

  /* Z-Index */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 40;
  --z-nav:     50;
  --z-panel:   60;
  --z-modal:   70;
}
```

---

## 11. Recreation Blueprint

### 11.1 Recommended Tech Stack

```
Core:
├── Next.js 14+ (App Router)
├── TypeScript 5
├── Tailwind CSS 3.3
└── SASS (supplementary)

Animation:
├── GSAP 3.12 + @gsap/react
├── Lenis (@studio-freight/lenis)
├── Framer Motion 11 (micro-interactions)
└── react-tilt (card hover)

UI Components:
├── shadcn/ui
├── Radix UI primitives
└── Lucide React (icons)

Data:
├── Octokit REST (GitHub API)
├── Supabase (contact form)
├── date-fns-tz (timezone clock)
└── Embla Carousel (project gallery)

3D (optional):
├── Three.js
└── @react-three/fiber + @react-three/drei

Deploy:
└── Vercel
```

### 11.2 Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile2.jpg
│   │   ├── logo.jpg
│   │   ├── projects/
│   │   │   ├── m31/
│   │   │   ├── axo/
│   │   │   ├── stylesync/
│   │   │   ├── stackers/
│   │   │   └── astra/
│   │   └── gallery/
│   └── fonts/ (if self-hosting)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, font setup, Lenis
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # CSS variables, base styles
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── web/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── ProfilePanel.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutIntro.tsx
│   │   │   └── ProjectStrip.tsx
│   │   ├── about/
│   │   │   ├── Timeline.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   └── RepoCards.tsx
│   │   ├── projects/
│   │   │   ├── ProjectTabs.tsx
│   │   │   └── ProjectImageStrip.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── SocialLinks.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── SplitText.tsx      # Character split animation utility
│   │   │   ├── LiveClock.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   └── three/
│   │       └── Scene.tsx
│   │
│   ├── hooks/
│   │   ├── useGSAP.ts
│   │   ├── useLenis.ts
│   │   ├── useGitHub.ts
│   │   └── useLiveClock.ts
│   │
│   ├── lib/
│   │   ├── gsap.ts            # GSAP registration + config
│   │   ├── animations.ts      # Reusable animation presets
│   │   ├── github.ts          # Octokit client
│   │   ├── supabase.ts        # Supabase client
│   │   └── utils.ts
│   │
│   ├── data/
│   │   ├── projects.ts
│   │   ├── timeline.ts
│   │   └── repos.ts
│   │
│   └── types/
│       ├── project.ts
│       └── repo.ts
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

### 11.3 Development Roadmap

**Phase 1 — Foundation (Week 1)**
- [ ] Project setup: Next.js 14, TypeScript, Tailwind, SASS
- [ ] Font import: Inria Serif, Inter, Playfair Display
- [ ] CSS variables / design token setup in `globals.css`
- [ ] Base layout: `Navbar`, `MobileMenu`, `ProfilePanel` shell
- [ ] Lenis smooth scroll integration in root layout
- [ ] GSAP registration (`ScrollTrigger`, `ScrollSmoother`)

**Phase 2 — Homepage (Week 2)**
- [ ] Hero section: video background (Vimeo iframe) + character-split heading
- [ ] Scroll indicator animation
- [ ] About intro section with scroll reveal text
- [ ] Project image strip (horizontal scroll with Embla or GSAP)
- [ ] "View Projects" CTA

**Phase 3 — About Page (Week 3)**
- [ ] Header with character animation
- [ ] Superpower + Outside the IDE two-column layout
- [ ] Timeline component with scroll reveal per item
- [ ] Education & Recognition section
- [ ] Open Source repo cards (GitHub API via Octokit)
- [ ] Contact mailto button

**Phase 4 — Projects & Gallery (Week 4)**
- [ ] Projects tab navigation
- [ ] Horizontal image carousel per project (GSAP pinned scroll)
- [ ] Individual project `[slug]` pages
- [ ] Web Gallery grid page with hover effects
- [ ] Gallery image cards with tags

**Phase 5 — Contact & Polish (Week 5)**
- [ ] Contact page scattered display text layout
- [ ] Contact form with React Hook Form + Supabase submission
- [ ] Social links with icons
- [ ] ProfilePanel complete (live clock, all data)
- [ ] Mobile responsive audit across all pages
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] Vercel Analytics integration

**Phase 6 — Advanced Features (Week 6)**
- [ ] Blog page (static MDX or Supabase-backed)
- [ ] 3D elements with React Three Fiber (if applicable)
- [ ] Spotify "Now Playing" widget (if implemented)
- [ ] GitHub activity heatmap (53-column grid)
- [ ] SEO metadata for all pages
- [ ] Final animation polish pass

### 11.4 Estimated Difficulty Breakdown

| Component | Difficulty | Key Challenge |
|-----------|-----------|---------------|
| Navbar + Mobile Menu | ⭐⭐ | Overlay animation |
| Profile Side Panel | ⭐⭐⭐ | Slide animation + live data |
| Hero Video + Split Text | ⭐⭐⭐⭐ | GSAP character stagger |
| Horizontal Project Scroll | ⭐⭐⭐⭐ | GSAP pinned scroll |
| About Timeline | ⭐⭐ | CSS layout |
| GitHub Repo Cards | ⭐⭐⭐ | API integration |
| Live Clock | ⭐⭐ | Timezone calculation |
| Contact Form | ⭐⭐ | Supabase integration |
| Lenis + GSAP ScrollTrigger | ⭐⭐⭐⭐ | Synchronization |
| 3D Elements | ⭐⭐⭐⭐⭐ | Three.js setup |
| **Total** | **★★★★☆** | Advanced |

---

## 12. Tailwind CSS Theme Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    fontFamily: {
      display:  ['"Inria Serif"', 'serif'],
      body:     ['Inter', 'sans-serif'],
      playfair: ['"Playfair Display"', 'serif'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      screens: {
        '2xs': '380px',
        xs:    '450px',
      },
      gridTemplateColumns: {
        '53': 'repeat(53, minmax(0, 1fr))',
      },
      colors: {
        // shadcn/ui tokens
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom palette
        ink: {
          950: '#0a0a0a',
          900: '#111111',
          800: '#141414',
          700: '#1a1a1a',
          600: '#262626',
          500: '#404040',
          400: '#737373',
          300: '#d4d4d4',
          200: '#e8e0d5',
          100: '#f5f5f5',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        hero: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.45s cubic-bezier(0.77, 0, 0.175, 1)',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        marquee: 'marquee 12s linear infinite',
      },
      transitionTimingFunction: {
        'panel': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 13. React Component Structure

### 13.1 Root Layout

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { ProfilePanel } from '@/components/layout/ProfilePanel'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Bettina's portfolio",
  description: 'Creative Builder · Software Engineer · Design Engineer. Product, code & craft.',
  openGraph: {
    title: "Bettina's portfolio",
    description: 'Creative Builder · Software Engineer · Design Engineer.',
    url: 'https://www.bettinasosa.com',
    siteName: "Bettina's portfolio",
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-body bg-background text-foreground antialiased`}>
        <LenisProvider>
          <Navbar />
          <ProfilePanel />
          <main>{children}</main>
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 13.2 Lenis Provider

```tsx
// src/components/providers/LenisProvider.tsx
'use client'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return <>{children}</>
}
```

### 13.3 Navbar Component

```tsx
// src/components/layout/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/web', label: 'Web Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between',
          'transition-all duration-300',
          scrolled && 'backdrop-blur-md bg-background/80 border-b border-border'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="rounded" />
          <span className="text-xs text-muted-foreground font-body">
            © coded by<br />
            <span className="text-foreground font-medium">Bettina Sosa</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-sm font-body text-foreground"
        >
          Menu
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  )
}
```

### 13.4 Split Text Animation Component

```tsx
// src/components/ui/SplitText.tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SplitTextProps {
  text: string
  className?: string
  trigger?: 'scroll' | 'load'
  stagger?: number
  duration?: number
  delay?: number
  tag?: keyof JSX.IntrinsicElements
}

export function SplitText({
  text,
  className,
  trigger = 'scroll',
  stagger = 0.02,
  duration = 0.6,
  delay = 0,
  tag: Tag = 'span',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll<HTMLSpanElement>('.split-char')

    const animConfig = {
      y: 40,
      opacity: 0,
      stagger,
      duration,
      delay,
      ease: 'power3.out',
    }

    if (trigger === 'scroll') {
      gsap.from(chars, {
        ...animConfig,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    } else {
      gsap.from(chars, animConfig)
    }
  }, [trigger, stagger, duration, delay])

  const chars = text.split('').map((char, i) => (
    <span
      key={i}
      className="split-char"
      style={{ display: 'inline-block' }}
      aria-hidden="true"
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <Tag ref={containerRef as any} className={className} aria-label={text}>
      {chars}
    </Tag>
  )
}
```

### 13.5 ProfilePanel Component

```tsx
// src/components/layout/ProfilePanel.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { LiveClock } from '@/components/ui/LiveClock'

export function ProfilePanel() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay) return

    if (open) {
      gsap.to(panel, { x: '0%', duration: 0.45, ease: 'power3.inOut' })
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' })
    } else {
      gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.in' })
      gsap.to(overlay, { opacity: 0, duration: 0.3, pointerEvents: 'none' })
    }
  }, [open])

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-background/60 opacity-0 pointer-events-none"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{ transform: 'translateX(100%)' }}
        className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-[#111111] border-l border-border p-8 flex flex-col gap-6 overflow-y-auto"
      >
        <Image
          src="/images/profile2.jpg"
          alt="profile"
          width={200}
          height={200}
          className="rounded-full w-24 h-24 object-cover"
        />
        <div>
          <h2 className="font-display text-xl text-foreground">Let's work together!</h2>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:bg-muted transition-colors rounded"
          >
            Get in touch
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">bettinasosarohl@gmail.com</p>
        <p className="text-sm text-muted-foreground">
          AI/LLM enthusiast | Cutting-edge tech advocate | Web3 builder
        </p>

        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Version</p>
            <p className="text-foreground">2024 © Edition</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Timezone</p>
            <LiveClock timezone="Europe/London" label="UK (GMT+1)" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Socials</p>
            <div className="flex gap-4">
              {[
                { href: 'https://twitter.com/bettysrohl', label: 'Twitter' },
                { href: 'https://github.com/bettinasosa', label: 'Github' },
                { href: 'https://www.linkedin.com/in/bettina-sosa/', label: 'Linkedin' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

### 13.6 LiveClock Component

```tsx
// src/components/ui/LiveClock.tsx
'use client'
import { useState, useEffect } from 'react'
import { formatInTimeZone } from 'date-fns-tz'

interface LiveClockProps {
  timezone: string
  label: string
}

export function LiveClock({ timezone, label }: LiveClockProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(formatInTimeZone(new Date(), timezone, 'HH:mm'))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  return (
    <p className="text-foreground font-body">
      {time} {label}
    </p>
  )
}
```

---

## 14. Framer Motion Animation Presets

```ts
// src/lib/animations.ts
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
      ease: [0.34, 1.56, 0.64, 1], // overshoot spring
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
```

---

## 15. Claude Code Prompt

Use this prompt with Claude Code CLI (`claude`) to recreate the entire portfolio:

```
You are building a pixel-perfect recreation of bettinasosa.com, a dark editorial portfolio website.

TECH STACK:
- Next.js 14 with App Router and TypeScript
- Tailwind CSS 3.3 for utility classes
- GSAP 3.12 + @gsap/react for primary animations
- @studio-freight/lenis for smooth scrolling
- Framer Motion 11 for micro-interactions
- shadcn/ui + Radix UI for accessible components
- Lucide React for icons
- Embla Carousel for project image strips
- date-fns-tz for live timezone clock
- @octokit/rest for GitHub repo data
- Supabase for contact form
- Vercel for deployment

DESIGN SYSTEM:
- Dark monochromatic theme: background #0a0a0a, text #f5f5f5
- Font families: "Inria Serif" (display), "Inter" (body), "Playfair Display" (accents)
- Hero text size: clamp(3rem, 8vw, 7rem), Inria Serif weight 300
- CSS variables for all colors via shadcn/ui HSL token system
- Minimal border-radius (4–8px), subtle borders (#262626)

PAGES TO BUILD:
1. Homepage (/) — Hero with Vimeo video bg + character-split heading, about intro, horizontal project strip
2. About (/about) — Display heading, bio sections, vertical timeline, GitHub repo cards
3. Projects (/projects) — Tab navigation, horizontal scrollable image gallery per project
4. Web Gallery (/web) — 2-col grid of project cards with images and tags
5. Contact (/contact) — Scattered display text layout, social links, contact form (React Hook Form + Supabase)
6. Blog (/blog) — Article list layout

LAYOUT COMPONENTS:
- Navbar: fixed, transparent → frosted on scroll, logo left, links right, mobile "Menu" text hamburger
- MobileMenu: full-screen overlay, large nav links with stagger animation, "Close" text button
- ProfilePanel: right-side sliding panel with photo, bio, live clock, socials — triggered by a button or interaction
- LenisProvider: root-level smooth scroll context with GSAP ScrollTrigger sync

KEY ANIMATIONS:
1. Character-split text: split heading text into individual <span> elements, animate with gsap.from(chars, { y:40, opacity:0, stagger:0.02, ease:'power3.out' })
2. Scroll reveals: gsap ScrollTrigger on all sections, start:'top 75%', y:40 → 0, opacity 0 → 1
3. Profile panel: gsap translateX(100%) → translateX(0%), ease 'power3.inOut', duration 0.45s
4. Horizontal project scroll: GSAP pinned section with scrub:1 for horizontal image strip
5. Lenis + GSAP sync: lenis.on('scroll', ScrollTrigger.update) + gsap.ticker.add((t) => lenis.raf(t*1000))
6. Mobile menu: Framer Motion AnimatePresence with staggered link reveals

IMPORTANT DETAILS:
- Each character in hero/section headings is an individual <span style="display:inline-block">
- The side panel shows a live-updating time in UK timezone using date-fns-tz
- Projects have a marquee-style horizontal strip of images using Embla Carousel
- GitHub repos are fetched client-side via Octokit and displayed as styled cards
- Video hero background is a muted, autoplay, loop Vimeo iframe
- All text is rendered with -webkit-font-smoothing: antialiased
- Use Next.js <Image> for all images with proper sizes/priority attributes
- Install: gsap @gsap/react @studio-freight/lenis framer-motion @octokit/rest date-fns date-fns-tz embla-carousel-react @supabase/supabase-js react-hook-form @hookform/resolvers lucide-react tailwindcss-animate

Start by creating the project structure, then implement page by page starting with the root layout and Navbar.
```

---

*Design.md generated from live analysis of bettinasosa.com — May 2026*  
*Source repository: github.com/bettinasosa/portfolio*  
*License: MIT*
