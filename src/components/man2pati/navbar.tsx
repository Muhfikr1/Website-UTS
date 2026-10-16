'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { SchoolLogo, KemenagText } from './logo'
import { NAV_LINKS, SCHOOL } from '@/lib/school-data'

export function Topbar() {
  return (
    <div className="hidden bg-primary text-primary-foreground md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            <span>{SCHOOL.email}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>{SCHOOL.phone}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#layanan"
            className="rounded-sm bg-primary-foreground/15 px-3 py-1 font-medium transition-colors hover:bg-primary-foreground/25"
          >
            PTSP Online
          </a>
          <a
            href="#pengumuman"
            className="rounded-sm bg-amber-500 px-3 py-1 font-semibold text-amber-950 transition-colors hover:bg-amber-400"
          >
            SPMB 2026
          </a>
        </div>
      </div>
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    // Tunggu sheet tertutup agar scroll tidak terblokir Radix
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-shadow ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <a href="#beranda" className="flex items-center gap-3" aria-label="Beranda MAN 2 Pati">
          <SchoolLogo className="h-10 w-10 shrink-0" />
          <KemenagText className="hidden sm:flex" />
          <KemenagText className="sm:hidden [&>span]:text-lg" />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2">
            <a href="#aduan">PPID</a>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            <SheetDescription className="sr-only">
              Navigasi utama website MAN 2 Pati
            </SheetDescription>
            <div className="mt-2 flex items-center gap-3 px-1">
              <SchoolLogo className="h-10 w-10" />
              <KemenagText />
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Menu seluler">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNav(e, link.href)}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
                >
                  {link.label}
                  <X className="h-3 w-3 rotate-45 opacity-30" />
                </a>
              ))}
              <a
                href="#layanan"
                onClick={(e) => handleMobileNav(e, '#layanan')}
                className="mt-2 rounded-md border border-primary/30 px-3 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                PTSP Online
              </a>
              <a
                href="#pengumuman"
                onClick={(e) => handleMobileNav(e, '#pengumuman')}
                className="rounded-md bg-amber-500 px-3 py-2.5 text-center text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-400"
              >
                SPMB 2026
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
