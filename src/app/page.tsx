import { Topbar, Navbar } from '@/components/man2pati/navbar'
import { Hero } from '@/components/man2pati/hero'
import { Stats } from '@/components/man2pati/stats'
import { Programs } from '@/components/man2pati/programs'
import { Profile } from '@/components/man2pati/profile'
import { Research } from '@/components/man2pati/research'
import { Teachers } from '@/components/man2pati/teachers'
import { Maklumat } from '@/components/man2pati/maklumat'
import { News } from '@/components/man2pati/news'
import { Announcements } from '@/components/man2pati/announcements'
import { Gallery } from '@/components/man2pati/gallery'
import { DigitalServices } from '@/components/man2pati/spbe'
import { Aduan } from '@/components/man2pati/aduan'
import { Footer, WhatsAppFloat } from '@/components/man2pati/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div>
        <Topbar />
        <Navbar />
      </div>

      <main className="flex-1">
        <Hero />
        <Stats />
        <Programs />
        <Profile />
        <Research />
        <Maklumat />
        <Teachers />
        <News />
        <Announcements />
        <Gallery />
        <DigitalServices />
        <Aduan />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
