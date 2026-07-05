import axios from 'axios'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'
import { mapMeal, mapMealSummary } from '../utils/mealMapper.js'

const mealDb = axios.create({ baseURL: config.mealDbBaseUrl, timeout: 8000 })

// TheMealDB has no real "popularity" signal on the free tier, so we
// approximate "popular" with a fixed spread across common categories.
const POPULAR_CATEGORIES = ['Chicken', 'Beef', 'Dessert', 'Vegetarian']

export async function searchRecipesByName(query) {
  const { data } = await mealDb.get('/search.php', { params: { s: query } })
  const meals = data.meals || []
  return { query, results: meals.map(mapMeal) }
}

export async function searchRecipesByIngredients(ingredients) {
  if (ingredients.length === 0) {
    throw new ApiError(400, 'At least one ingredient is required')
  }

  // filter.php only supports one ingredient per call, so we fetch each
  // ingredient's matches separately and intersect by recipe id to find
  // recipes that contain ALL of the requested ingredients.
  const responses = await Promise.all(
    ingredients.map((ingredient) =>
      mealDb.get('/filter.php', { params: { i: ingredient } }).then((res) => res.data.meals || [])
    )
  )

  const [first, ...rest] = responses
  const intersected = first.filter((meal) =>
    rest.every((list) => list.some((m) => m.idMeal === meal.idMeal))
  )

  return {
    ingredients,
    results: intersected.map(mapMealSummary),
  }
}

export async function getRecipeById(id) {
  const { data } = await mealDb.get('/lookup.php', { params: { i: id } })
  const meal = data.meals?.[0]

  if (!meal) {
    throw new ApiError(404, `No recipe found with id "${id}"`)
  }

  return mapMeal(meal)
}

export async function getPopularRecipes() {
  const responses = await Promise.all(
    POPULAR_CATEGORIES.map((category) =>
      mealDb.get('/filter.php', { params: { c: category } }).then((res) => res.data.meals || [])
    )
  )

  // Take a few from each category so the grid isn't dominated by one type
  const results = responses.flatMap((meals) => meals.slice(0, 3)).map(mapMealSummary)

  return { results }
}
