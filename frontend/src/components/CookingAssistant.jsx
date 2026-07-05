import { useState } from 'react'
import toast from 'react-hot-toast'
import { askCookingAssistant } from '../services/chatService'
import Spinner from './Spinner'

const SUGGESTED_QUESTIONS = [
  'Can I replace butter?',
  'How can I make this spicy?',
  'Can I air fry this instead?',
]

function CookingAssistant({ recipeContext }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (question) => {
    const text = question ?? input
    if (!text.trim()) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const reply = await askCookingAssistant(text, recipeContext)
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      const message = err.message || 'Something went wrong. Please try again.'
      toast.error(message)
      setMessages((prev) => [...prev, { role: 'assistant', text: message }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-basil px-5 py-2.5 text-sm font-medium text-flour hover:bg-basil-dark"
      >
        Ask AI
      </button>
    )
  }

  return (
    <div className="rounded-card border border-char/10 p-4 dark:border-flour/10">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">Cooking Assistant</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close cooking assistant"
          className="text-char/50 hover:text-char dark:text-flour/50 dark:hover:text-flour"
        >
          ×
        </button>
      </div>

      {messages.length === 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-full border border-char/10 px-3 py-1 text-xs dark:border-flour/10"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'font-medium' : 'text-char/80 dark:text-flour/80'}>
            {m.role === 'user' ? 'You: ' : 'Chef: '}
            {m.text}
          </p>
        ))}
        {loading && (
          <p className="flex items-center gap-2 text-char/50 dark:text-flour/50">
            <Spinner /> Chef is thinking...
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a cooking question..."
          className="w-full rounded-full border border-char/15 bg-white/70 px-4 py-2 text-sm outline-none focus:border-saffron dark:border-flour/15 dark:bg-white/5"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-saffron px-4 py-2 text-sm font-medium text-char disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default CookingAssistant
