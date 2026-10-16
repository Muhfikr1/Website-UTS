import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { PrismaClient } from '@prisma/client'

const sourcePath = resolve('db/custom.db')
const python = process.env.PYTHON ?? (process.platform === 'win32' ? 'python' : 'python3')
const exportScript = `
import json
import pathlib
import sqlite3
import sys

source = pathlib.Path(sys.argv[1]).resolve()
if not source.is_file():
    raise SystemExit(f"SQLite source database not found: {source}")

tables = ("News", "Gallery", "Teacher", "Announcement", "Complaint", "VisitorStat")
with sqlite3.connect(source.as_uri() + "?mode=ro", uri=True) as connection:
    connection.row_factory = sqlite3.Row
    records = {
        table: [dict(row) for row in connection.execute(f'SELECT * FROM "{table}"')]
        for table in tables
    }
print(json.dumps(records, ensure_ascii=False))
`

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('Set NEON_DATABASE_URL to the Neon connection string before running this migration.')
}

const exported = spawnSync(python, ['-c', exportScript, sourcePath], {
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
})

if (exported.error) {
  throw new Error(`Could not run ${python}: ${exported.error.message}`)
}
if (exported.status !== 0) {
  throw new Error(`SQLite export failed: ${exported.stderr.trim() || 'unknown error'}`)
}

const records = JSON.parse(exported.stdout)
const dateFields = {
  News: ['date', 'createdAt', 'updatedAt'],
  Gallery: ['date', 'createdAt'],
  Announcement: ['date', 'createdAt'],
  Complaint: ['createdAt'],
  VisitorStat: ['date'],
}

for (const [table, fields] of Object.entries(dateFields)) {
  records[table] = records[table].map((record) => {
    for (const field of fields) {
      if (record[field] !== null) record[field] = new Date(record[field])
    }
    if (table === 'Announcement') record.isPinned = Boolean(record.isPinned)
    return record
  })
}

const db = new PrismaClient({
  datasources: { db: { url: process.env.NEON_DATABASE_URL } },
})

const countRows = async (client) => {
  const [news, gallery, teachers, announcements, complaints, visitorStats] =
    await Promise.all([
      client.news.count(),
      client.gallery.count(),
      client.teacher.count(),
      client.announcement.count(),
      client.complaint.count(),
      client.visitorStat.count(),
    ])
  return {
    News: news,
    Gallery: gallery,
    Teacher: teachers,
    Announcement: announcements,
    Complaint: complaints,
    VisitorStat: visitorStats,
  }
}

const verifyInsertedCount = (table, result, expected) => {
  if (result.count !== expected) {
    throw new Error(
      `Record count mismatch for ${table}: expected ${expected}, inserted ${result.count}.`,
    )
  }
}

try {
  const existingCounts = await countRows(db)
  if (Object.values(existingCounts).some((count) => count !== 0)) {
    throw new Error('Neon database is not empty; refusing to merge or overwrite existing records.')
  }

  const migratedCounts = await db.$transaction(async (tx) => {
    const news = await tx.news.createMany({ data: records.News })
    verifyInsertedCount('News', news, records.News.length)

    const gallery = await tx.gallery.createMany({ data: records.Gallery })
    verifyInsertedCount('Gallery', gallery, records.Gallery.length)

    const teachers = await tx.teacher.createMany({ data: records.Teacher })
    verifyInsertedCount('Teacher', teachers, records.Teacher.length)

    const announcements = await tx.announcement.createMany({ data: records.Announcement })
    verifyInsertedCount('Announcement', announcements, records.Announcement.length)

    const complaints = await tx.complaint.createMany({ data: records.Complaint })
    verifyInsertedCount('Complaint', complaints, records.Complaint.length)

    const visitorStats = await tx.visitorStat.createMany({ data: records.VisitorStat })
    verifyInsertedCount('VisitorStat', visitorStats, records.VisitorStat.length)

    return {
      News: news.count,
      Gallery: gallery.count,
      Teacher: teachers.count,
      Announcement: announcements.count,
      Complaint: complaints.count,
      VisitorStat: visitorStats.count,
    }
  }, { maxWait: 10_000, timeout: 60_000 })

  console.log('SQLite records migrated to Neon:')
  for (const [table, count] of Object.entries(migratedCounts)) {
    console.log(`${table}: ${count}`)
  }
} finally {
  await db.$disconnect()
}
