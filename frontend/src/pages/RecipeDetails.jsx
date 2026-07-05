import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../services/recipeService'
import CookingAssistant from '../components/CookingAssistant'
import FavoriteButton from '../components/FavoriteButton'

function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    getRecipeById(id)
      .then((data) => {
        if (!cancelled) setRecipe(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load recipe.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <p className="text-char/60 dark:text-flour/60">Loading recipe...</p>
  }

  if (error) {
    return <p className="text-clay">{error}</p>
  }

  if (!recipe) return null

  return (
    <article>
      <div className="grid gap-6 sm:grid-cols-2">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full rounded-card object-cover"
        />

        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-3xl font-semibold">{recipe.name}</h1>
            <FavoriteButton
              recipe={{ id: recipe.id, name: recipe.name, image: recipe.image, category: recipe.category }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-char/60 dark:text-flour/60">
            {recipe.category && <span>{recipe.category}</span>}
            {recipe.area && <span>· {recipe.area}</span>}
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-char/10 px-2.5 py-0.5 text-xs dark:border-flour/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-3">
        <section className="sm:col-span-1">
          <h2 className="font-display text-xl font-semibold">Ingredients</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {recipe.ingredients.map((ing) => (
              <li key={ing.name} className="flex justify-between gap-4 border-b border-char/5 py-1 dark:border-flour/5">
                <span>{ing.name}</span>
                <span className="font-mono text-char/60 dark:text-flour/60">{ing.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sm:col-span-2">
          <h2 className="font-display text-xl font-semibold">Instructions</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-char/80 dark:text-flour/80">
            {recipe.instructions}
          </p>
        </section>
      </div>

      <div className="mt-10">
        <CookingAssistant
          recipeContext={{ name: recipe.name, ingredients: recipe.ingredients }}
        />
      </div>
    </article>
  )
}

export default RecipeDetails
