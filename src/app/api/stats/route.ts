import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export async function GET() {
  try {
    const today = startOfDay(new Date())

    let stat = await db.visitorStat.findFirst({ orderBy: { date: 'desc' } })

    if (!stat) {
      stat = await db.visitorStat.create({
        data: {
          date: today,
          todayCount: 1,
          yesterdayCount: 0,
          monthCount: 1,
          totalCount: 1,
          onlineCount: 1,
        },
      })
    } else {
      const statDate = startOfDay(stat.date)
      const diffDays = Math.floor((today.getTime() - statDate.getTime()) / 86400000)

      if (diffDays === 0) {
        // Same day: increment today's count
        stat = await db.visitorStat.update({
          where: { id: stat.id },
          data: {
            todayCount: { increment: 1 },
            monthCount: { increment: 1 },
            totalCount: { increment: 1 },
          },
        })
      } else {
        // New day: rotate counters
        const isNewMonth = today.getMonth() !== statDate.getMonth() || today.getFullYear() !== statDate.getFullYear()
        const yesterdayCount = stat.todayCount

        stat = await db.visitorStat.update({
          where: { id: stat.id },
          data: {
            date: today,
            todayCount: 1,
            yesterdayCount,
            monthCount: isNewMonth ? 1 : stat.monthCount + 1,
            totalCount: stat.totalCount + 1,
            onlineCount: 1,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        today: stat.todayCount,
        yesterday: stat.yesterdayCount,
        month: stat.monthCount,
        total: stat.totalCount,
        online: stat.onlineCount,
      },
    })
  } catch (error) {
    console.error('GET /api/stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Gagal memuat statistik', data: null },
      { status: 500 }
    )
  }
}
