import { useState } from 'react'
import Spinner from './Spinner'

function IngredientSearch({ onSearch, loading }) {
  const [ingredients, setIngredients] = useState([])
  const [input, setInput] = useState('')

  const addIngredient = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed])
    }
    setInput('')
  }

  const removeIngredient = (name) => {
    setIngredients(ingredients.filter((i) => i !== name))
  }

  const handleSearch = () => {
    if (ingredients.length > 0) onSearch(ingredients)
  }

  return (
    <div>
      <form onSubmit={addIngredient} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an ingredient (Egg, Tomato, Cheese...)"
          className="w-full rounded-full border border-char/15 bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-saffron dark:border-flour/15 dark:bg-white/5"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-full border border-char/15 px-4 py-2.5 text-sm font-medium dark:border-flour/15"
        >
          Add
        </button>
      </form>

      {ingredients.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="flex items-center gap-1.5 rounded-full bg-basil/10 px-3 py-1 text-sm text-basil dark:text-basil"
            >
              {ingredient}
              <button
                type="button"
                onClick={() => removeIngredient(ingredient)}
                aria-label={`Remove ${ingredient}`}
                className="text-basil/70 hover:text-basil"
              >
                ×
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="ml-1 flex items-center gap-2 rounded-full bg-saffron px-4 py-1.5 text-sm font-medium text-char hover:bg-saffron-dark disabled:opacity-60"
          >
            {loading && <Spinner />}
            {loading ? 'Searching...' : 'Find recipes'}
          </button>
        </div>
      )}
    </div>
  )
}

export default IngredientSearch
