import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  if (!user) return

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  return entry
}

async function EntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id)
  if (!entry) return null

  return (
    <div>
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage