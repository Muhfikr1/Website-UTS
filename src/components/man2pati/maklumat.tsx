'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Timer, HeartHandshake, HandHeart, Lock } from 'lucide-react'
import { SCHOOL } from '@/lib/school-data'

const CERIA = [
  { icon: Timer, letter: 'C', label: 'Cepat' },
  { icon: ShieldCheck, letter: 'E', label: 'Efisien' },
  { icon: HeartHandshake, letter: 'R', label: 'Ramah' },
  { icon: HandHeart, letter: 'I', label: 'Ikhlas' },
  { icon: Lock, letter: 'A', label: 'Amanah' },
]

export function Maklumat() {
  return (
    <section
      id="maklumat"
      className="pattern-grid bg-gradient-to-b from-amber-50/80 via-background to-background py-16 sm:py-24"
      aria-label="Maklumat layanan dan Zona Integritas"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Zona Integritas · Maklumat Layanan
          </p>
          <blockquote className="relative rounded-3xl border bg-card p-8 shadow-lg shadow-primary/5 sm:p-12">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-primary p-3 text-primary-foreground shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xl font-semibold leading-relaxed tracking-tight sm:text-2xl">
              &ldquo;{SCHOOL.maklumat}&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-bold text-primary">{SCHOOL.principal}</p>
              <p className="text-sm text-muted-foreground">Kepala MAN 2 Pati</p>
            </footer>
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Layanan CERIA
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {CERIA.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center gap-2.5 rounded-2xl border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
