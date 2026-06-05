interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-normal tracking-wide
        bg-[var(--color-bg-hover)] text-[var(--color-text-muted)]
        border border-[var(--color-border-subtle)]
        ${className}`}
    >
      {children}
    </span>
  )
}
