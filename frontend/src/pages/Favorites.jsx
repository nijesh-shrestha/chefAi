import RecipeGrid from '../components/RecipeGrid'
import { useFavorites } from '../hooks/useFavorites'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <section>
      <h1 className="font-display text-3xl font-semibold">Favorites</h1>
      <p className="mt-2 text-char/70 dark:text-flour/70">
        {favorites.length > 0
          ? 'Your saved recipes.'
          : 'You haven\u2019t saved any recipes yet. Tap the heart on a recipe to save it here.'}
      </p>

      <div className="mt-6">
        <RecipeGrid recipes={favorites} loading={false} error={null} />
      </div>
    </section>
  )
}

export default Favorites
