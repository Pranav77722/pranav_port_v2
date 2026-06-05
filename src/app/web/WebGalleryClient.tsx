'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { galleryProjects } from '@/data/projects'
import { SplitText } from '@/components/ui/SplitText'
import { Tag } from '@/components/ui/Tag'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const certificates = [
  { name: 'BEAMDMMZBF.pdf', title: 'BEAMDMMZBF' },
  { name: 'BUBHTWIKUD.png', title: 'BUBHTWIKUD' },
  { name: 'Developer Foundation Certificate.pdf', title: 'Developer Foundation' },
  { name: 'PITAINNHYM.png', title: 'PITAINNHYM' },
  { name: 'Participation Certificate of National Level STTP 2k24 by Brainovision Solutions.pdf', title: 'National Level STTP 2k24' },
  { name: 'WhatsApp Image 2026-01-20 at 15.32.34.jpeg', title: 'WhatsApp Image' },
  { name: 'exp 1.pdf', title: 'Exp 1' },
  { name: 'iot compition.pdf', title: 'IoT Competition' },
  { name: 'js.pdf', title: 'JavaScript Certificate' },
  { name: 'nxt code 2024.png', title: 'NXT Code 2024' },
  { name: 'tecnoverse 2026.pdf', title: 'Tecnoverse 2026' },
]

export function WebGalleryClient() {
  return (
    <div className="pt-24">
      {/* Heading */}
      <section className="section-padding pb-0">
        <div className="container-narrow">
          <SplitText
            text="Web Gallery"
            tag="h1"
            className="text-display-xl"
            trigger="load"
            delay={0.2}
          />
          <p className="text-display-md text-[var(--color-text-muted)] mt-4" style={{ fontFamily: 'var(--font-display)' }}>
            Design & Development
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {galleryProjects.map((project) => (
              <motion.article
                key={project.slug}
                variants={staggerItem}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[var(--color-border)]">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: project.gradient }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                      <ArrowUpRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-5">
                  <h3
                    className="text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-warm)] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <p className="inline-flex items-center gap-1.5 mt-4 text-sm text-[var(--color-text-primary)] group-hover:gap-2.5 transition-all">
                    View Project
                    <ArrowUpRight size={14} />
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Certificates Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <SplitText
            text="Certificates"
            tag="h2"
            className="text-display-lg mb-12"
            trigger="scroll"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert) => {
              const isPdf = cert.name.toLowerCase().endsWith('.pdf')
              const url = `/api/certificates/${encodeURIComponent(cert.name)}`
              
              return (
                <a 
                  key={cert.name} 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] mb-4">
                    {isPdf ? (
                      <div className="w-full h-full relative pointer-events-none">
                        <iframe 
                          src={`${url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full border-none object-cover scale-[1.02]"
                          title={cert.title}
                        />
                        {/* Overlay to intercept clicks */}
                        <div className="absolute inset-0 z-10 bg-transparent" />
                      </div>
                    ) : (
                      <img 
                        src={url} 
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center z-20">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                        <ExternalLink size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[var(--color-text-primary)] font-medium truncate" style={{ fontFamily: 'var(--font-display)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {isPdf ? 'PDF Document' : 'Image Certificate'}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
