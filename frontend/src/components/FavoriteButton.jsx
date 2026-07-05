import toast from 'react-hot-toast'
import { useFavorites } from '../hooks/useFavorites'

function FavoriteButton({ recipe, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(recipe.id)

  const handleClick = (e) => {
    // Prevent navigating away when this button sits inside a card's <Link>
    e.preventDefault()
    e.stopPropagation()

    toggleFavorite(recipe)
    toast.success(favorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-lg leading-none shadow-sm transition dark:bg-char/80 ${
        favorite ? 'text-clay' : 'text-char/40 dark:text-flour/40'
      } ${className}`}
    >
      {favorite ? '♥' : '♡'}
    </button>
  )
}

export default FavoriteButton
