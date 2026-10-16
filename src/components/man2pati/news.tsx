'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Newspaper, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import type { NewsItem, NewsResponse } from '@/lib/types'

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'Berita Madrasah', label: 'Berita Madrasah' },
  { value: 'Adiwiyata', label: 'Adiwiyata' },
]

function formatDate(idate: string) {
  return new Date(idate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const { toast } = useToast()

  const loadNews = useCallback(
    async (cat: string, q: string, p: number) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ category: cat, search: q, page: String(p) })
        const res = await fetch(`/api/news?${params}`)
        const json: NewsResponse = await res.json()
        if (!json.success) throw new Error('Gagal memuat')
        setNews(json.data)
        setPagination({
          page: json.pagination.page,
          totalPages: json.pagination.totalPages,
          total: json.pagination.total,
        })
      } catch {
        toast({
          title: 'Gagal memuat berita',
          description: 'Periksa koneksi Anda lalu coba lagi.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  useEffect(() => {
    const t = setTimeout(() => {
      loadNews(category, search, page)
    }, 300)
    return () => clearTimeout(t)
  }, [category, search, page, loadNews])

  // Reset ke halaman 1 saat filter/search berubah
  useEffect(() => {
    setPage(1)
  }, [category, search])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput.trim())
    setPage(1)
  }

  return (
    <section id="berita" className="bg-muted/40 py-16 sm:py-24" aria-label="Kabar madrasah">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Kabar Madrasah
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Berita Terbaru</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Informasi kegiatan, prestasi, dan agenda terbaru MAN 2 Pati.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs" role="search">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari berita…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
              aria-label="Cari berita"
            />
          </form>
        </motion.div>

        {/* Filter kategori */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter kategori berita">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
              aria-pressed={category === cat.value}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
            <Newspaper className="h-4 w-4" />
            {pagination.total} berita
          </span>
        </div>

        {/* Grid berita */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[16/9] w-full rounded-none" />
                <CardContent className="space-y-3 p-5">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed bg-card p-10 text-center">
            <Newspaper className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium">Berita tidak ditemukan</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Card
                  className="group h-full cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setSelected(item)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <Badge className="absolute left-3 top-3 bg-primary/95 text-primary-foreground">
                      {item.category}
                    </Badge>
                  </div>
                  <CardContent className="flex h-[calc(100%-9rem)] flex-col p-5">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(item.date)}
                    </p>
                    <h3 className="mb-2 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <span className="text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Selengkapnya →
                    </span>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page <= 1}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="px-2 text-sm font-medium text-muted-foreground">
              Halaman <span className="font-bold text-primary">{pagination.page}</span> dari{' '}
              {pagination.totalPages}
              <span className="ml-2 hidden sm:inline">· {pagination.total} berita</span>
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.page >= pagination.totalPages}
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Dialog detail berita */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
          {selected && (
            <>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <Badge className="mb-2 bg-primary text-primary-foreground">
                    {selected.category}
                  </Badge>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-white/90">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(selected.date)}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-left text-xl font-extrabold leading-snug">
                    {selected.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Detail berita MAN 2 Pati
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-3">
                  {selected.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
