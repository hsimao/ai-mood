'use client'

import { JournalEntry } from '@prisma/client'

function Editor({ entry }: { entry: JournalEntry }) {
  return <div>{entry.content}</div>
}

export default Editor
