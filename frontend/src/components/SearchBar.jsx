import { useState } from 'react'
import Spinner from './Spinner'

function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search recipes, e.g. Chicken Biryani"
        className="w-full rounded-full border border-char/15 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-saffron dark:border-flour/15 dark:bg-white/5"
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 whitespace-nowrap rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-char transition hover:bg-saffron-dark disabled:opacity-60"
      >
        {loading && <Spinner />}
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
