import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { chat } from '../controllers/chat.controller.js'

const router = Router()

// Each chat request calls OpenAI (billed) - throttle to prevent abuse
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please slow down.' },
})

router.post('/chat', chatLimiter, chat)

export default router
