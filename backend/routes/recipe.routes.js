import { Router } from 'express'
import {
  searchByName,
  searchByIngredient,
  getById,
  popular,
} from '../controllers/recipe.controller.js'

const router = Router()

router.get('/recipes/search', searchByName)
router.get('/recipes/ingredient', searchByIngredient)
router.get('/recipes/:id', getById)
router.get('/popular', popular)

export default router
