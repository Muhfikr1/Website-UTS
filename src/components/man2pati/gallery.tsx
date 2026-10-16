'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera, Images, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import type { GalleryItem } from '@/lib/types'

function formatDate(idate: string) {
  return new Date(idate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    let cancelled = false
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        if (json.success) setItems(json.data)
        else throw new Error(json.message)
      })
      .catch(() => {
        if (!cancelled) {
          toast({ title: 'Gagal memuat galeri', variant: 'destructive' })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [toast])

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category))
    return ['all', ...Array.from(set)]
  }, [items])

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  )

  const current = lightbox !== null ? filtered[lightbox] : null

  const next = () => setLightbox((l) => (l === null ? null : (l + 1) % filtered.length))
  const prev = () =>
    setLightbox((l) => (l === null ? null : (l - 1 + filtered.length) % filtered.length))

  // Navigasi keyboard pada lightbox
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered.length])

  return (
    <section id="galeri" className="bg-muted/40 py-16 sm:py-24" aria-label="Galeri dokumentasi">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Dokumentasi
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Galeri Terbaru</h2>
          <p className="mt-4 text-muted-foreground">
            Dokumentasi visual kegiatan dan prestasi terbaru MAN 2 Pati.
          </p>
        </motion.div>

        {/* Filter kategori */}
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter kategori galeri">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat)
                setLightbox(null)
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
              aria-pressed={filter === cat}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>

        {/* Grid galeri */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Lihat galeri: ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <Badge className="mb-1.5 bg-white/90 text-emerald-900 hover:bg-white/90">
                    {item.category}
                  </Badge>
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-white/70">
                    <Images className="h-3 w-3" />
                    {item.photoCount} foto · {formatDate(item.date)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri: ${current.title}`}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(null)
            }}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Tutup galeri"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Galeri sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <figure
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-bold text-white">
                  <Camera className="h-4 w-4 text-emerald-300" />
                  {current.title}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {current.category} · {current.photoCount} foto · {formatDate(current.date)}
                </p>
              </div>
              <p className="text-sm font-medium text-white/60">
                {lightbox! + 1} / {filtered.length}
              </p>
            </figcaption>
          </figure>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Galeri berikutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  )
}
