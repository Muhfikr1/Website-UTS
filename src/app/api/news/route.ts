import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') ?? 'all'
    const search = searchParams.get('search')?.trim() ?? ''
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const perPage = 6

    type WhereCondition = {
      AND: Array<{ category?: string } | { OR: Array<{ title: { contains: string } } | { excerpt: { contains: string } }> }>
    }
    const where: WhereCondition = { AND: [] }

    if (category !== 'all') {
      where.AND.push({ category })
    }
    if (search) {
      where.AND.push({
        OR: [{ title: { contains: search } }, { excerpt: { contains: search } }],
      })
    }

    const [total, news] = await Promise.all([
      db.news.count({ where }),
      db.news.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / perPage))

    return NextResponse.json({
      success: true,
      data: news,
      pagination: { page, perPage, total, totalPages },
    })
  } catch (error) {
    console.error('GET /api/news error:', error)
    return NextResponse.json({ success: false, message: 'Gagal memuat berita' }, { status: 500 })
  }
}
