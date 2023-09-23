import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'

export const POST = async () => {
  const user = await getUserByClerkID()

  if (!user) return NextResponse.json('User not found', { status: 404 })

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  // save ChatGPT answer to db
  const analysis = await analyze(entry.content)
  if (!analysis) return

  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
