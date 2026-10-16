import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const complaintSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter').max(100),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().max(20).optional().or(z.literal('')),
  category: z.string().min(1),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = complaintSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      return NextResponse.json(
        { success: false, message: firstError?.message ?? 'Data tidak valid' },
        { status: 400 }
      )
    }

    const { name, email, phone, category, message } = parsed.data

    const complaint = await db.complaint.create({
      data: {
        name,
        email,
        phone: phone || null,
        category,
        message,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Aduan berhasil dikirim. Terima kasih atas masukan Anda.',
      data: { id: complaint.id },
    })
  } catch (error) {
    console.error('POST /api/aduan error:', error)
    return NextResponse.json({ success: false, message: 'Gagal mengirim aduan' }, { status: 500 })
  }
}
