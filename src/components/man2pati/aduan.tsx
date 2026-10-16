'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareHeart, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

const ADUAN_CATEGORIES = [
  'Layanan Administrasi',
  'Kurikulum & Akademik',
  'Kesiswaan',
  'Sarana Prasarana',
  'Kepegawaian',
  'PPID / Permohonan Informasi',
  'Saran & Apresiasi',
]

export function Aduan() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/aduan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, category, message }),
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengirim aduan')
      }

      toast({
        title: 'Aduan berhasil dikirim',
        description: json.message,
      })
      setSubmitted(true)
      setName('')
      setEmail('')
      setPhone('')
      setCategory('')
      setMessage('')
    } catch (err) {
      toast({
        title: 'Gagal mengirim aduan',
        description: err instanceof Error ? err.message : 'Silakan coba lagi.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="aduan"
      className="pattern-grid bg-muted/40 py-16 sm:py-24"
      aria-label="Layanan aduan dan aspirasi"
    >
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
              Zona Integritas · PPID
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Layanan Aduan &amp; Aspirasi
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sampaikan laporan, aduan, saran, maupun permohonan informasi kepada madrasah. Setiap
              masukan akan kami tindaklanjuti sesuai standar layanan Zona Integritas.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  title: 'Ditindaklanjuti cepat',
                  desc: 'Aduan diproses maksimal 3 hari kerja oleh tim Zona Integritas.',
                },
                {
                  title: 'Jaminan kerahasiaan',
                  desc: 'Identitas pelapor dijaga kerahasiaannya sesuai prinsip PPID.',
                },
                {
                  title: 'Bebas gratifikasi',
                  desc: 'Seluruh layanan madrasah tanpa biaya — bersih dari pungutan liar.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border bg-card p-6 shadow-lg shadow-primary/5 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageSquareHeart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Formulir Aduan / Aspirasi</h3>
                  <p className="text-xs text-muted-foreground">
                    Fields bertanda * wajib diisi
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 py-12 text-center">
                  <CheckCircle2 className="h-14 w-14 text-primary" />
                  <div>
                    <p className="text-lg font-bold">Terima kasih!</p>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Aduan Anda telah tercatat dan akan segera ditindaklanjuti oleh tim Zona
                      Integritas MAN 2 Pati.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Kirim aduan lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="aduan-name">Nama Lengkap *</Label>
                      <Input
                        id="aduan-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama Anda"
                        required
                        minLength={3}
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aduan-email">Email *</Label>
                      <Input
                        id="aduan-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="aduan-phone">No. HP (opsional)</Label>
                      <Input
                        id="aduan-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aduan-category">Kategori *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger id="aduan-category" aria-label="Pilih kategori aduan">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {ADUAN_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aduan-message">Pesan / Isi Aduan *</Label>
                    <Textarea
                      id="aduan-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan laporan, saran, atau permohonan informasi Anda…"
                      rows={5}
                      required
                      minLength={10}
                      maxLength={2000}
                      className="resize-none"
                    />
                    <p className="text-right text-xs text-muted-foreground">
                      {message.length}/2000
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Aduan
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
