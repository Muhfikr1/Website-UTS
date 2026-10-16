'use client'

import { motion } from 'framer-motion'
import { MonitorSmartphone, ExternalLink, PhoneCall } from 'lucide-react'
import { DIGITAL_SERVICES } from '@/lib/school-data'

export function DigitalServices() {
  return (
    <section id="layanan" className="py-16 sm:py-24" aria-label="Akses layanan digital">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            SPBE &amp; Aplikasi
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Akses Layanan Digital
          </h2>
          <p className="mt-4 text-muted-foreground">
            Akses cepat aplikasi Kementerian Agama dan layanan digital MAN 2 Pati.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {DIGITAL_SERVICES.map((service, i) => (
            <motion.a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: (i % 5) * 0.05 }}
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{service.name}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
            </motion.a>
          ))}
        </div>

        {/* PTSP Online highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 grid gap-6 rounded-3xl bg-gradient-to-r from-primary to-emerald-700 p-8 text-primary-foreground shadow-lg sm:grid-cols-3 sm:items-center sm:p-10"
        >
          <div className="sm:col-span-2">
            <h3 className="text-2xl font-extrabold">PTSP Online MAN 2 Pati</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-90">
              Pelayanan Terpadu Satu Pintu secara daring — permohonan surat, layanan administrasi,
              dan informasi pendidikan. Cepat, Efisien, Ramah, Ikhlas, dan Amanah.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">
              <PhoneCall className="h-3.5 w-3.5" />
              Tersedia setiap hari kerja
            </span>
            <a
              href="https://ptsp.kemenag.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary shadow transition-transform hover:scale-[1.04]"
            >
              Buka PTSP Online
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
