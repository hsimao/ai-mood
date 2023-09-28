'use client'

import { useState } from 'react'

function Question() {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
