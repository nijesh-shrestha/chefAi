// TheMealDB returns strIngredient1..20 / strMeasure1..20 as flat, mostly-empty
// fields. We normalize that into a clean ingredients array once here, so
// nothing downstream (controllers, frontend) has to deal with the raw shape.

export function mapMeal(meal) {
  if (!meal) return null

  const ingredients = []
  for (let i = 1; i <= 20; i += 1) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() || '' })
    }
  }

  const tags = meal.strTags
    ? meal.strTags.split(',').map((t) => t.trim()).filter(Boolean)
    : []

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || null,
    area: meal.strArea || null,
    image: meal.strMealThumb || null,
    tags,
    ingredients,
    instructions: meal.strInstructions || '',
    youtubeUrl: meal.strYoutube || null,
    sourceUrl: meal.strSource || null,
  }
}

export function mapMealSummary(meal) {
  // Lighter shape for search result grids (list views don't need full ingredients)
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb || null,
    category: meal.strCategory || null,
  }
}
