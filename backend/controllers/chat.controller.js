import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { askCookingAssistant } from '../services/openai.service.js'

export const chat = asyncHandler(async (req, res) => {
  const { message, context } = req.body

  if (!message || !message.trim()) {
    throw new ApiError(400, 'Field "message" is required')
  }

  const data = await askCookingAssistant(message.trim(), context)
  res.json({ success: true, data })
})
