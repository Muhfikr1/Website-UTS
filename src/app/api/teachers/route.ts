import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const teachers = await db.teacher.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ success: true, data: teachers })
  } catch (error) {
    console.error('GET /api/teachers error:', error)
    return NextResponse.json({ success: false, message: 'Gagal memuat data guru' }, { status: 500 })
  }
}
