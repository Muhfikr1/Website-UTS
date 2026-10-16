'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Pin, CalendarDays } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import type { AnnouncementItem } from '@/lib/types'

function formatDate(idate: string) {
  return new Date(idate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function Announcements() {
  const [items, setItems] = useState<AnnouncementItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    let cancelled = false
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        if (json.success) setItems(json.data)
        else throw new Error(json.message)
      })
      .catch(() => {
        if (!cancelled) {
          toast({
            title: 'Gagal memuat pengumuman',
            variant: 'destructive',
          })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [toast])

  return (
    <section id="pengumuman" className="py-16 sm:py-24" aria-label="Pengumuman madrasah">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Informasi Resmi
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Pengumuman Madrasah
            </h2>
            <p className="mt-4 text-muted-foreground">
              Pengumuman resmi seputar akademik, penerimaan murid baru, dan agenda penting MAN 2
              Pati.
            </p>
            <div className="mt-8 hidden overflow-hidden rounded-2xl lg:block">
              <div className="bg-gradient-to-br from-primary to-emerald-700 p-8 text-primary-foreground">
                <Megaphone className="mb-4 h-10 w-10 opacity-80" />
                <p className="text-lg font-bold leading-snug">
                  SPMB Tahun Ajaran 2026/2027 Telah Dibuka
                </p>
                <p className="mt-2 text-sm opacity-90">
                  Bergabunglah bersama madrasah unggul riset-akademik yang berbudaya lingkungan.
                </p>
                <a
                  href="#layanan"
                  className="mt-5 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-bold text-primary shadow transition-transform hover:scale-[1.03]"
                >
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3 lg:col-span-3">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl border bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-full space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-5 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                ))
              : items.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(item.date)}
                      </p>
                      {item.isPinned && (
                        <Badge className="gap-1 bg-amber-400 text-amber-950 hover:bg-amber-400">
                          <Pin className="h-3 w-3" />
                          Disematkan
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-2 font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.content}
                    </p>
                  </motion.article>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
