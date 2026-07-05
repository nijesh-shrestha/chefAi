import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {
  searchRecipesByName,
  searchRecipesByIngredients,
  getRecipeById,
  getPopularRecipes,
} from '../services/recipe.service.js'

export const searchByName = asyncHandler(async (req, res) => {
  const { q } = req.query

  if (!q || !q.trim()) {
    throw new ApiError(400, 'Query parameter "q" is required')
  }

  const data = await searchRecipesByName(q.trim())
  res.json({ success: true, data })
})

export const searchByIngredient = asyncHandler(async (req, res) => {
  const { name } = req.query

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Query parameter "name" is required')
  }

  const ingredients = name
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean)

  const data = await searchRecipesByIngredients(ingredients)
  res.json({ success: true, data })
})

export const getById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await getRecipeById(id)
  res.json({ success: true, data })
})

export const popular = asyncHandler(async (req, res) => {
  const data = await getPopularRecipes()
  res.json({ success: true, data })
})
