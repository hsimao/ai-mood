import { NextResponse } from 'next/server'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

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

  return NextResponse.json({ data: updatedEntry })
}
