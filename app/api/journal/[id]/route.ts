import { NextResponse } from 'next/server'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const newAnalysis = await analyze(updatedEntry.content)
  if (!newAnalysis) return

  // use upsert if analysis not yet create will create a new one
  const analysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...newAnalysis,
    },
    update: newAnalysis,
  })

  return NextResponse.json({ data: { ...updatedEntry, analysis } })
}
