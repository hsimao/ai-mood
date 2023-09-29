'use client'

import { useState } from 'react'
import { askQuestion } from '@/utils/api'

function Question() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const { data } = await askQuestion(value)

    setAnswer(data)
    setValue('')
    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-2 bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {answer && <p className="my-4 text-xl">{answer}</p>}
    </div>
  )
}

export default Question
