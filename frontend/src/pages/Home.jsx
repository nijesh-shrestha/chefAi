import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SearchBar from '../components/SearchBar'
import IngredientSearch from '../components/IngredientSearch'
import ImageUpload from '../components/ImageUpload'
import GeneratedRecipe from '../components/GeneratedRecipe'
import RecipeGrid from '../components/RecipeGrid'
import { useRecipeSearch } from '../hooks/useRecipeSearch'
import { useImageAnalysis } from '../hooks/useImageAnalysis'
import { useRecentSearches } from '../hooks/useRecentSearches'
import { searchByName, searchByIngredients, getPopularRecipes } from '../services/recipeService'

function Home() {
  const nameSearch = useRecipeSearch(searchByName)
  const ingredientSearch = useRecipeSearch(searchByIngredients)
  const popular = useRecipeSearch(getPopularRecipes)
  const imageAnalysis = useImageAnalysis()
  const { recent, addSearch, clearRecent } = useRecentSearches()
  const [activeMode, setActiveMode] = useState(null) // 'name' | 'ingredient' | null

  useEffect(() => {
    popular.run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (nameSearch.error) toast.error(nameSearch.error)
  }, [nameSearch.error])

  useEffect(() => {
    if (ingredientSearch.error) toast.error(ingredientSearch.error)
  }, [ingredientSearch.error])

  useEffect(() => {
    if (imageAnalysis.error) toast.error(imageAnalysis.error)
  }, [imageAnalysis.error])

  const handleNameSearch = (query) => {
    setActiveMode('name')
    nameSearch.run(query)
    addSearch(query)
  }

  const handleIngredientSearch = (ingredients) => {
    setActiveMode('ingredient')
    ingredientSearch.run(ingredients)
  }

  const activeSearch =
    activeMode === 'name' ? nameSearch : activeMode === 'ingredient' ? ingredientSearch : null

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          What&apos;s in your kitchen?
        </h1>
        <p className="mt-2 max-w-xl text-char/70 dark:text-flour/70">
          Search recipes, search by ingredients, or upload a photo of your food to get started.
        </p>

        <div className="mt-6 max-w-lg">
          <SearchBar onSearch={handleNameSearch} loading={nameSearch.loading} />
        </div>

        <div className="mt-4 max-w-lg">
          <IngredientSearch onSearch={handleIngredientSearch} loading={ingredientSearch.loading} />
        </div>

        {recent.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-char/50 dark:text-flour/50">Recent:</span>
            {recent.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleNameSearch(term)}
                className="rounded-full border border-char/10 px-3 py-1 text-xs hover:border-saffron dark:border-flour/10"
              >
                {term}
              </button>
            ))}
            <button
              type="button"
              onClick={clearRecent}
              className="text-xs text-char/40 hover:text-clay dark:text-flour/40"
            >
              Clear
            </button>
          </div>
        )}
      </section>

      {activeSearch && (
        <section>
          <h2 className="font-display text-xl font-semibold">Results</h2>
          <div className="mt-4">
            <RecipeGrid
              recipes={activeSearch.results}
              loading={activeSearch.loading}
              error={activeSearch.error}
              emptyMessage="No recipes matched. Try a different search."
            />
          </div>
        </section>
      )}

      <section>
        <h2 className="font-display text-xl font-semibold">Upload a Food Photo</h2>
        <div className="mt-4 max-w-lg">
          <ImageUpload onFileSelected={imageAnalysis.analyze} loading={imageAnalysis.loading} />

          {imageAnalysis.error && (
            <p className="mt-3 text-sm text-clay">{imageAnalysis.error}</p>
          )}

          {imageAnalysis.prediction && !imageAnalysis.error && (
            <div className="mt-4 rounded-card border border-char/10 p-4 dark:border-flour/10">
              {imageAnalysis.prediction.low_confidence ? (
                <p className="text-sm">
                  We&apos;re not fully sure what this is (best guess:{' '}
                  <span className="font-medium capitalize">{imageAnalysis.prediction.food}</span>
                  ). Try searching for the dish by name instead, or upload a clearer photo.
                </p>
              ) : (
                <>
                  <p className="text-sm">
                    Looks like <span className="font-medium capitalize">{imageAnalysis.prediction.food}</span>{' '}
                    <span className="font-mono text-char/60 dark:text-flour/60">
                      ({Math.round(imageAnalysis.prediction.confidence * 100)}% confident)
                    </span>
                  </p>

                  {imageAnalysis.prediction.recipe && (
                    <GeneratedRecipe recipe={imageAnalysis.prediction.recipe} />
                  )}

                  {imageAnalysis.prediction.recipeError && (
                    <p className="mt-2 text-sm text-clay">
                      Identified the food, but couldn&apos;t generate a recipe right now.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">Popular Recipes</h2>
        <div className="mt-4">
          <RecipeGrid recipes={popular.results} loading={popular.loading} error={popular.error} />
        </div>
      </section>

    </div>
  )
}

export default Home
