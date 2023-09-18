import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

export const POST = async () => {
  const user = await getUserByClerkID()

  if (!user) return NextResponse.json('User not found', { status: 404 })

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
