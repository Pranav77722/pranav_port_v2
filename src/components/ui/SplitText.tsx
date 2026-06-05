'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  text: string
  className?: string
  trigger?: 'scroll' | 'load'
  stagger?: number
  duration?: number
  delay?: number
  tag?: keyof React.JSX.IntrinsicElements
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

    const fromConfig = {
      y: 40,
      opacity: 0,
    }

    const toConfig = {
      y: 0,
      opacity: 1,
      stagger,
      duration,
      delay,
      ease: 'power3.out',
    }

    if (trigger === 'scroll') {
      gsap.fromTo(chars, fromConfig, {
        ...toConfig,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    } else {
      gsap.fromTo(chars, fromConfig, toConfig)
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [trigger, stagger, duration, delay])

  const content = text.split(' ').map((word, i, arr) => (
    <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {word.split('').map((char, j) => (
        <span
          key={j}
          className="split-char"
          style={{ display: 'inline-block' }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      {i !== arr.length - 1 && (
        <span
          className="split-char"
          style={{ display: 'inline-block' }}
          aria-hidden="true"
        >
          {'\u00A0'}
        </span>
      )}
    </span>
  ))

  return (
    // @ts-expect-error - dynamic tag type
    <Tag ref={containerRef} className={className} aria-label={text}>
      {content}
    </Tag>
  )
}
