'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'
import { ArrowUpRight, Send } from 'lucide-react'

export function ContactPageClient() {
  const [formState, setFormState] = useState({
    subject: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b29005ee-b670-4d2d-8ca0-98af3f2d2b63',
          subject: formState.subject,
          from_name: formState.email, // Use email as name so you know who it's from
          email: formState.email,
          message: formState.message,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-24">
      {/* Scattered display text */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-narrow">
          <div className="relative min-h-[40vh] flex flex-col justify-center">
            {/* Scattered words */}
            <div className="relative">
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-display-hero block"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                software
              </motion.span>
              <div className="flex items-center gap-6 md:gap-12 mt-2">
                <motion.span
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.1}
                  className="text-display-lg text-[var(--color-accent-warm)]"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  &
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.15}
                  className="text-display-xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  design
                </motion.span>
              </div>
              <div className="flex items-end gap-6 md:gap-12 mt-2">
                <motion.span
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.2}
                  className="text-display-hero"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  engineer
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.3}
                  className="text-display-md text-[var(--color-text-muted)]"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  Remote
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="pb-12">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-4">
            {[
              { href: 'https://www.linkedin.com/in/pranavkhaire/', label: 'LinkedIn' },
              { href: 'mailto:khairepranav246@gmail.com', label: 'Email' },
              { href: 'https://github.com/Pranav77722', label: 'Github' },
              { href: 'https://twitter.com/PranavKhai16307', label: 'Twitter' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all"
              >
                <ArrowUpRight size={14} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-narrow">
        <div className="h-px bg-[var(--color-border)]" />
      </div>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="max-w-xl">
            <SplitText
              text="Let's talk!"
              tag="h2"
              className="text-display-lg mb-10"
              trigger="scroll"
            />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-warm)]/10 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-[var(--color-accent-warm)]" />
                </div>
                <h3 className="text-xl text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Message sent!
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mt-2">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 rounded border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)] outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)] outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)] outline-none transition-colors resize-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
