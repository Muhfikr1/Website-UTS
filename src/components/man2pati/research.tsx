'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Microscope, BookMarked, Medal, ArrowRight } from 'lucide-react'
import { RESEARCH_FEATURES } from '@/lib/school-data'

const FEATURE_ICONS = [Microscope, BookMarked, Medal]

export function Research() {
  return (
    <section id="riset" className="relative overflow-hidden bg-emerald-950 py-16 sm:py-24" aria-label="Riset dan akademik">
      <div className="absolute inset-0 opacity-[0.07]">
        <Image
          src="/images/g-riset.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Riset &amp; Akademik
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Membangun Budaya Berpikir Kritis sejak Kelas X
            </h2>
            <p className="mt-4 leading-relaxed text-emerald-100/80">
              MAN 2 Pati mengembangkan budaya riset, inovasi, dan olimpiade sebagai bagian penting
              dalam membentuk generasi unggul dan kompetitif.
            </p>

            <div className="mt-8 space-y-4">
              {RESEARCH_FEATURES.map((feature, i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="group flex items-start gap-4 rounded-xl border border-emerald-300/15 bg-emerald-900/40 p-5 backdrop-blur transition-colors hover:border-emerald-300/30 hover:bg-emerald-900/60"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm text-emerald-100/70">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <a
              href="#berita"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-all hover:gap-3 hover:text-emerald-200"
            >
              Lihat capaian riset &amp; kegiatan
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-emerald-300/20 shadow-2xl shadow-emerald-950/60">
              <Image
                src="/images/g-riset.jpg"
                alt="Siswa MAN 2 Pati melakukan praktikum riset di laboratorium"
                width={1152}
                height={864}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-emerald-300/25 bg-emerald-900/90 px-6 py-4 shadow-xl backdrop-blur sm:-left-8">
              <p className="text-2xl font-extrabold text-emerald-300">100+</p>
              <p className="text-xs font-medium text-emerald-100/80">
                Prestasi riset, olimpiade &amp; non-akademik
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
