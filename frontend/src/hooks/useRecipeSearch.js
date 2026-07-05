import { useCallback, useState } from 'react'

// Generic async-search hook: pass it any (args) => Promise<results> function
// (searchByName, searchByIngredients, getPopularRecipes, ...) and it manages
// the loading/error/data lifecycle so components don't repeat this logic.
export function useRecipeSearch(searchFn) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const data = await searchFn(...args)
        setResults(data)
      } catch (err) {
        setError(err.message || 'Search failed. Please try again.')
        setResults([])
      } finally {
        setLoading(false)
      }
    },
    [searchFn]
  )

  return { results, loading, error, run }
}
