import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json({ success: true, data: gallery })
  } catch (error) {
    console.error('GET /api/gallery error:', error)
    return NextResponse.json({ success: false, message: 'Gagal memuat galeri' }, { status: 500 })
  }
}
