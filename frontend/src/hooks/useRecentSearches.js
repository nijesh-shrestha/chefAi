import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'smartchef-recent-searches'
const MAX_ITEMS = 8

function readRecent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useRecentSearches() {
  const [recent, setRecent] = useState(readRecent)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent))
  }, [recent])

  const addSearch = useCallback((term) => {
    if (!term.trim()) return
    setRecent((prev) => {
      const deduped = [term, ...prev.filter((t) => t.toLowerCase() !== term.toLowerCase())]
      return deduped.slice(0, MAX_ITEMS)
    })
  }, [])

  const clearRecent = useCallback(() => setRecent([]), [])

  return { recent, addSearch, clearRecent }
}
