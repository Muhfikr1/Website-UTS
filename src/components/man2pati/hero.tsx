'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SCHOOL } from '@/lib/school-data'

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-emerald-950">
      {/* Gambar latar */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-school.jpg"
          alt="Gedung MAN 2 Pati dengan lingkungan hijau"
          fill
          priority
          loading="eager"
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/30" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 pb-20 pt-16 sm:pb-28 sm:pt-24 lg:min-h-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <Badge className="mb-5 border-amber-400/40 bg-amber-400/15 text-amber-300 hover:bg-amber-400/20">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Madrasah Aliyah Negeri · Tayu, Pati
          </Badge>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {SCHOOL.fullName}
          </h1>

          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-emerald-100 sm:text-xl">
            {SCHOOL.tagline}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-200/80 sm:text-base">
            {SCHOOL.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="shadow-lg shadow-emerald-900/40">
              <a href="#profil">
                Profil Madrasah
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-emerald-300/40 bg-transparent text-emerald-50 hover:bg-emerald-50/10 hover:text-white"
            >
              <a href="#layanan">
                <GraduationCap className="mr-1.5 h-4 w-4" />
                PTSP Online
              </a>
            </Button>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-900/40 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur">
            {SCHOOL.motto}
          </p>
        </motion.div>
      </div>

      {/* Gelombang bawah */}
      <svg
        className="absolute bottom-0 left-0 right-0 block h-10 w-full text-background sm:h-14"
        viewBox="0 0 1440 74"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,32 C240,74 480,0 720,26 C960,52 1200,10 1440,38 L1440,74 L0,74 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  )
}
