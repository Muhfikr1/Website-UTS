'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Users, Award, BookOpen } from 'lucide-react'

interface StatDef {
  icon: React.ComponentType<{ className?: string }>
  value: number
  suffix?: string
  label: string
  isText?: boolean
}

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    let frame: number
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return <span ref={ref}>{value.toLocaleString('id-ID')}</span>
}

const STATS: StatDef[] = [
  { icon: Trophy, value: 100, suffix: '+', label: 'Prestasi' },
  { icon: Users, value: 5000, suffix: '+', label: 'Alumni' },
  { icon: BookOpen, value: 63, suffix: '', label: 'Dewan Guru' },
]

export function Stats() {
  return (
    <section className="relative -mt-2 pb-4 pt-10" aria-label="MAN 2 Pati dalam angka">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                <CountUp target={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
          <div className="group flex flex-col items-center gap-2 rounded-xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-600 transition-colors group-hover:bg-amber-400 group-hover:text-white">
              <Award className="h-6 w-6" />
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-amber-600 sm:text-4xl">A+</p>
            <p className="text-sm font-medium text-muted-foreground">Akreditasi</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-center text-sm font-semibold tracking-[0.25em] text-muted-foreground"
        >
          {`MAN 2 PATI DALAM ANGKA · BERSIH · SMART · HARMONIS · JAYA`}
        </motion.p>
      </div>
    </section>
  )
}
