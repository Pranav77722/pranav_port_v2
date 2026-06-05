'use client'

import { useState, useEffect } from 'react'
import { formatInTimeZone } from 'date-fns-tz'

import { cn } from '@/lib/utils'

interface LiveClockProps {
  timezone: string
  label: string
  className?: string
}

export function LiveClock({ timezone, label, className }: LiveClockProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(formatInTimeZone(new Date(), timezone, 'HH:mm'))
    }
    tick() // Initial call
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  if (!time) return null

  return (
    <p className={cn("text-foreground font-body", className)}>
      {time} {label}
    </p>
  )
}
