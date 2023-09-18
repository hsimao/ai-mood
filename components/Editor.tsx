'use client'

import { JournalEntry } from '@prisma/client'
import { useState } from 'react'

function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content)

  return (
    <div className="w-full h-full overflow-x-hidden">
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {entry.content}
    </div>
  )
}

export default Editor
