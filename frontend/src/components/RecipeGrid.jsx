import RecipeCard from './RecipeCard'
import SkeletonCard from './SkeletonCard'

function RecipeGrid({ recipes, loading, error, emptyMessage = 'No recipes found.' }) {
  if (error) {
    return <p className="text-sm text-clay dark:text-clay">{error}</p>
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!recipes || recipes.length === 0) {
    return <p className="text-sm text-char/60 dark:text-flour/60">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeGrid
