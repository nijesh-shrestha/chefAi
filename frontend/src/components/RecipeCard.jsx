import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="card-stitch group relative overflow-hidden rounded-card border border-char/10 bg-white/50 transition hover:-translate-y-0.5 hover:shadow-md dark:border-flour/10 dark:bg-white/5"
    >
      <FavoriteButton
        recipe={{ id: recipe.id, name: recipe.name, image: recipe.image, category: recipe.category }}
        className="absolute right-2 top-2 z-10"
      />
      <div className="aspect-square overflow-hidden bg-char/5 dark:bg-flour/5">
        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 font-display font-medium">{recipe.name}</h3>
        {recipe.category && (
          <p className="mt-0.5 text-xs text-char/60 dark:text-flour/60">{recipe.category}</p>
        )}
      </div>
    </Link>
  )
}

export default RecipeCard
