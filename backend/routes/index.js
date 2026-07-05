import { Router } from 'express'
import recipeRoutes from './recipe.routes.js'
import imageRoutes from './image.routes.js'
import chatRoutes from './chat.routes.js'

const router = Router()

router.use(recipeRoutes)
router.use(imageRoutes)
router.use(chatRoutes)

export default router
