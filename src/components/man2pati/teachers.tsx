'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserRound } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import type { TeacherItem } from '@/lib/types'

function initialsOf(name: string) {
  const cleaned = name.replace(/[,().]/g, ' ').replace(/[^a-zA-Z\s]/g, ' ').trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length === 0) return '??'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

const ROLE_LABELS: Record<string, string> = {
  KEPALA: 'Kepala Madrasah',
  TU: 'Kepala Urusan TU',
  WAKABID: 'Wakil Kepala Bidang',
}

export function Teachers() {
  const [teachers, setTeachers] = useState<TeacherItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<'pimpinan' | 'guru'>('pimpinan')
  const { toast } = useToast()

  useEffect(() => {
    let cancelled = false
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        if (json.success) setTeachers(json.data)
        else throw new Error(json.message)
      })
      .catch(() => {
        if (!cancelled) {
          toast({
            title: 'Gagal memuat data guru',
            description: 'Silakan muat ulang halaman.',
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

  const pimpinan = useMemo(() => teachers.filter((t) => t.role !== 'GURU'), [teachers])

  const filteredGuru = useMemo(() => {
    const q = search.trim().toLowerCase()
    return teachers
      .filter((t) => t.role === 'GURU')
      .filter(
        (t) =>
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.position.toLowerCase().includes(q)
      )
  }, [teachers, search])

  return (
    <section id="guru" className="py-16 sm:py-24" aria-label="Struktur pimpinan dan dewan guru">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Sumber Daya Manusia
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Struktur Pimpinan &amp; Dewan Guru
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dewan guru dan tenaga kependidikan yang berdedikasi membina putra-putri terbaik.
          </p>
        </motion.div>

        <Tabs value={role} onValueChange={(v) => setRole(v as 'pimpinan' | 'guru')} className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pimpinan">Unsur Pimpinan</TabsTrigger>
            <TabsTrigger value="guru">
              Dewan Guru {teachers.length > 0 && `(${teachers.filter((t) => t.role === 'GURU').length})`}
            </TabsTrigger>
          </TabsList>

          {role === 'pimpinan' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-2xl border bg-card p-5">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))
                : pimpinan.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className={`flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        t.role === 'KEPALA' ? 'border-primary/50 ring-1 ring-primary/20' : ''
                      }`}
                    >
                      <Avatar className="h-16 w-16 border-2 border-primary/20 bg-primary text-lg font-extrabold text-primary-foreground">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {t.initials || initialsOf(t.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-bold leading-snug">{t.name}</p>
                        <p className="mt-0.5 text-sm text-primary">{ROLE_LABELS[t.role] ?? t.position}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>
          )}

          {role === 'guru' && (
            <div>
              <div className="relative mx-auto mb-6 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari nama guru atau mata pelajaran…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  aria-label="Cari guru"
                />
              </div>

              {loading ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card p-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-11 w-11 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3.5 w-4/5" />
                          <Skeleton className="h-3 w-2/5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredGuru.length === 0 ? (
                <div className="mx-auto max-w-md rounded-2xl border border-dashed bg-card p-10 text-center">
                  <UserRound className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="font-medium">Guru tidak ditemukan</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Coba kata kunci lain, misalnya &ldquo;Matematika&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="grid max-h-[480px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredGuru.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
                      className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50"
                    >
                      <Avatar className="h-11 w-11 shrink-0 bg-primary/10 text-sm font-extrabold text-primary">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {t.initials || initialsOf(t.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold leading-snug">{t.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{t.position}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Tabs>
      </div>
    </section>
  )
}
