function GeneratedRecipe({ recipe }) {
  return (
    <div className="mt-4 space-y-4 border-t border-char/10 pt-4 dark:border-flour/10">
      <div className="flex flex-wrap gap-4 text-sm">
        <span>
          <span className="text-char/60 dark:text-flour/60">Time:</span>{' '}
          {recipe.cookingTimeMinutes} min
        </span>
        <span>
          <span className="text-char/60 dark:text-flour/60">Difficulty:</span>{' '}
          {recipe.difficulty}
        </span>
        <span>
          <span className="text-char/60 dark:text-flour/60">Calories (est.):</span>{' '}
          {recipe.caloriesEstimate}
        </span>
      </div>
      <p className="text-xs italic text-char/50 dark:text-flour/50">
        Difficulty and calories are AI-estimated, not verified nutritional data.
      </p>

      <div>
        <h3 className="font-display font-semibold">Ingredients</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {recipe.ingredients.map((ing) => (
            <li key={ing.name}>
              {ing.amount} {ing.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display font-semibold">Instructions</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-sm">
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      {recipe.chefTips?.length > 0 && (
        <div>
          <h3 className="font-display font-semibold">Chef Tips</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            {recipe.chefTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GeneratedRecipe
