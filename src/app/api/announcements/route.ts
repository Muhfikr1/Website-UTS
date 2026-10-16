import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const announcements = await db.announcement.findMany({
      orderBy: [{ isPinned: 'desc' }, { date: 'desc' }],
    })
    return NextResponse.json({ success: true, data: announcements })
  } catch (error) {
    console.error('GET /api/announcements error:', error)
    return NextResponse.json({ success: false, message: 'Gagal memuat pengumuman' }, { status: 500 })
  }
}
