'use client'

import { SplitText } from '@/components/ui/SplitText'
import { Timeline } from '@/components/about/Timeline'
import { RepoCards } from '@/components/about/RepoCards'
import { timeline } from '@/data/timeline'
import { repos } from '@/data/repos'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export function AboutPageClient() {
  return (
    <div className="pt-24">
      {/* Hero heading */}
      <section className="section-padding">
        <div className="container-narrow">
          <SplitText
            text="Engineering student, developer, and content creator."
            tag="h1"
            className="text-display-xl max-w-4xl text-white font-bold tracking-tight"
            trigger="load"
            delay={0.2}
          />
        </div>
      </section>

      {/* Bio Grid */}
      <section className="pb-16">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* My Superpower */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <h2 className="text-meta mb-4">My Superpower</h2>
              <p className="text-body-lg text-[var(--color-text-body)] leading-relaxed">
                I am an Electronics and Telecommunication Engineering student, developer, and content creator passionate about building innovative technology solutions.
              </p>
              <p className="text-body text-[var(--color-text-muted)] mt-4 leading-relaxed">
                My strength lies in transforming ideas into real-world projects by combining software development, IoT, AI, and modern web technologies. I enjoy solving problems, learning new skills, and creating impactful applications that improve everyday experiences.
              </p>
            </motion.div>

            {/* Outside the IDE */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
            >
              <h2 className="text-meta mb-4">Outside the IDE</h2>
              <p className="text-body-lg text-[var(--color-text-body)] leading-relaxed">
                Beyond development, I share my knowledge and insights through content creation on @prnv_console, helping others explore technology, coding, and innovation.
              </p>
              <p className="text-body text-[var(--color-text-muted)] mt-4 leading-relaxed">
                My goal is to continuously learn, build, and contribute to meaningful technological advancements. I believe the best engineers are endlessly curious.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-narrow">
        <div className="h-px bg-[var(--color-border)]" />
      </div>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-meta mb-10">Where I&apos;ve Been</h2>
          <Timeline items={timeline} />
        </div>
      </section>

    </div>
  )
}
