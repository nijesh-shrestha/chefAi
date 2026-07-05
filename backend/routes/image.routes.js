import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { upload } from '../middleware/upload.js'
import { analyzeImage } from '../controllers/image.controller.js'

const router = Router()

// Image analysis triggers a downstream FastAPI call - throttle to prevent abuse
const imageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many image uploads. Please try again later.' },
})

router.post('/image/analyze', imageLimiter, upload.single('image'), analyzeImage)

export default router
