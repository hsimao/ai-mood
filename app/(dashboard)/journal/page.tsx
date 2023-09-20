import Link from 'next/link'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'

const getEntries = async () => {
  const user = await getUserByClerkID()
  if (!user) return []

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  const result = await analyze(
    'Today was a eh, ok day I guess. I found a new coffee shop that was cool but then I got a flat tire.'
  )
  console.log('result', result)

  return entries
}

async function JournalPage() {
  const entries = await getEntries()

  return (
    <div className="h-full p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />

        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
