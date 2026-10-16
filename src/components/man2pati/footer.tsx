'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Eye, Users, Calendar, Hash, Globe } from 'lucide-react'
import { SchoolLogo, KemenagText } from './logo'
import { SCHOOL, NAV_LINKS } from '@/lib/school-data'
import type { VisitorStats } from '@/lib/types'

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
      <div className="min-w-0">
        <p className="text-sm font-bold leading-none text-white">{value}</p>
        <p className="mt-1 text-[11px] leading-none text-emerald-100/60">{label}</p>
      </div>
    </div>
  )
}

export function Footer() {
  const [stats, setStats] = useState<VisitorStats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setStats(json.data)
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-emerald-950 text-emerald-100" aria-label="Informasi kontak dan tautan">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identitas */}
          <div>
            <div className="flex items-center gap-3">
              <SchoolLogo className="h-11 w-11" />
              <div className="leading-tight">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-emerald-100/60">
                  {SCHOOL.ministry}
                </p>
                <p className="text-lg font-extrabold tracking-wide text-white">{SCHOOL.name}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">
              Madrasah unggul riset-akademik, religius, berbudaya lingkungan, dan berorientasi pada
              pelayanan publik yang mudah diakses.
            </p>
            <div className="mt-5 space-y-2.5 text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                {SCHOOL.address}
              </p>
              <a
                href={`tel:${SCHOOL.phone.replace(/-/g, '')}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-emerald-300" />
                {SCHOOL.phone}
              </a>
              <a
                href={`mailto:${SCHOOL.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-emerald-300" />
                {SCHOOL.email}
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigasi</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-emerald-100/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wider text-white">
              Ikuti Kami
            </h3>
            <div className="flex gap-2">
              {['Facebook', 'Instagram', 'YouTube', 'TikTok'].map((soc) => (
                <a
                  key={soc}
                  href="#beranda"
                  aria-label={soc}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-emerald-100 transition-colors hover:bg-primary hover:text-white"
                  title={soc}
                >
                  {soc.slice(0, 2)}
                </a>
              ))}
            </div>
          </nav>

          {/* Layanan Digital */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Layanan Digital
            </h3>
            <ul className="space-y-2.5 text-sm">
              {['Simpatika', 'EMIS', 'RDM', 'Pusaka', 'PTSP Online', 'Sikapmu'].map((svc) => (
                <li key={svc}>
                  <Link
                    href="#layanan"
                    className="inline-flex items-center gap-2 text-emerald-100/70 transition-colors hover:text-white"
                  >
                    <Globe className="h-3.5 w-3.5 text-emerald-300" />
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Statistik */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Statistik Pengunjung
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <StatItem
                icon={Eye}
                label="Hari Ini"
                value={stats ? stats.today.toLocaleString('id-ID') : '—'}
              />
              <StatItem
                icon={Eye}
                label="Kemarin"
                value={stats ? stats.yesterday.toLocaleString('id-ID') : '—'}
              />
              <StatItem
                icon={Calendar}
                label="Bulan Ini"
                value={stats ? stats.month.toLocaleString('id-ID') : '—'}
              />
              <StatItem
                icon={Hash}
                label="Total"
                value={stats ? stats.total.toLocaleString('id-ID') : '—'}
              />
              <div className="col-span-2 flex items-center gap-3 rounded-lg bg-emerald-400/10 px-3 py-2.5">
                <Users className="h-4 w-4 shrink-0 text-emerald-300" />
                <p className="text-sm text-emerald-100/80">
                  <span className="font-bold text-white">
                    {stats ? stats.online : '—'}
                  </span>{' '}
                  pengunjung online saat ini
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-emerald-100/60">
            © {new Date().getFullYear()} Madrasah Aliyah Negeri 2 Pati
          </p>
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-100/60">
            {SCHOOL.motto}
          </p>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/62295452635"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 p-3.5 text-white shadow-lg shadow-emerald-600/30 transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
