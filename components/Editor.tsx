'use client'

import { useState } from 'react'
import { JournalEntry } from '@prisma/client'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value: string) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full overflow-hidden">
      {isLoading && <div>...loading</div>}
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
