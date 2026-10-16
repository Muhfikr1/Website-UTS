'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Target, Quote, BadgeCheck } from 'lucide-react'
import { SCHOOL, INNOVATIONS } from '@/lib/school-data'
import { Badge } from '@/components/ui/badge'

export function Profile() {
  return (
    <section id="profil" className="py-16 sm:py-24" aria-label="Profil madrasah">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Sambutan Kepala Madrasah */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Profil Madrasah
            </p>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sambutan Kepala Madrasah
            </h2>

            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[3/4] max-h-[420px] w-full">
                <Image
                  src="/images/kepala.png"
                  alt="Arif Baehaqi, S.Pd., M.Si., Kepala MAN 2 Pati"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-5 pt-16">
                  <p className="font-bold text-white">{SCHOOL.principal}</p>
                  <p className="text-sm text-emerald-200">Kepala Madrasah</p>
                </div>
              </div>
              <div className="p-5">
                <Quote className="mb-3 h-6 w-6 text-primary/40" />
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  Assalamu&rsquo;alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi
                  MAN 2 Pati. Kami terus berkomitmen mewujudkan madrasah yang religius, unggul,
                  berbasis riset, berbudaya lingkungan, serta memberikan pelayanan yang CERIA.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visi Misi + Inovasi */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Tentang Madrasah
            </p>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Integritas, Riset-Akademik, dan Budaya Lingkungan
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              MAN 2 Pati menerapkan nilai dan spirit Zona Integritas dalam setiap aktivitas,
              mengutamakan program riset-akademik, serta menjadi pelopor madrasah yang peduli
              terhadap keberlangsungan lingkungan melalui program Adiwiyata. Komitmen lingkungan
              diwujudkan melalui pengelolaan sampah 3R, penghijauan, penghematan energi dan air,
              serta keterlibatan seluruh warga madrasah.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Visi */}
              <div className="rounded-2xl border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">Visi</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{SCHOOL.vision}</p>
              </div>

              {/* Misi */}
              <div className="rounded-2xl border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-500/5 to-transparent p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">Misi</h3>
                </div>
                <ol className="space-y-1.5">
                  {SCHOOL.missions.map((mission, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-snug text-muted-foreground">
                      <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                      {mission}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Inovasi Unggulan */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">Inovasi Unggulan</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {INNOVATIONS.map((innov, i) => (
                  <motion.div
                    key={innov.initials}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-extrabold text-secondary-foreground">
                      {innov.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{innov.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {innov.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Badge variant="outline" className="mt-6 border-primary/30 bg-primary/5 text-primary">
              Layanan CERIA · Cepat, Efisien, Ramah, Ikhlas, Amanah
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
