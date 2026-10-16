'use client'

import { motion } from 'framer-motion'
import { ArrowRight, FlaskConical, Leaf, ShieldCheck } from 'lucide-react'
import { PROGRAMS } from '@/lib/school-data'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  flask: FlaskConical,
  leaf: Leaf,
  shield: ShieldCheck,
}

export function Programs() {
  return (
    <section id="program" className="pattern-grid bg-muted/40 py-16 sm:py-24" aria-label="Program unggulan">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Program Unggulan
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tiga Karakter Utama Madrasah
          </h2>
          <p className="mt-4 text-muted-foreground">
            Program disusun untuk menguatkan akademik, budaya lingkungan, dan kualitas pelayanan
            publik.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((program, i) => {
            const Icon = ICONS[program.icon]
            return (
              <motion.article
                key={program.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border bg-card p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-lg"
              >
                <span className="pointer-events-none absolute -right-4 -top-6 text-[7rem] font-extrabold leading-none text-primary/5 transition-colors group-hover:text-primary/10">
                  {program.number}
                </span>
                <div className="relative">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-md shadow-primary/25">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{program.title}</h3>
                  <p className="mb-6 min-h-[72px] text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <a
                    href={program.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-3"
                  >
                    {program.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
