import { JournalEntry } from '@prisma/client'

function EntryCard({ entry }: { entry: JournalEntry }) {
  return <div>{entry.id}</div>
}

export default EntryCard
