import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { analyzeFoodImage } from '../services/aiService.service.js'
import { generateRecipeFromFood } from '../services/openai.service.js'

export const analyzeImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No image file uploaded. Use field name "image".')
  }

  const prediction = await analyzeFoodImage(req.file.path, req.file.mimetype)

  // Only chain into OpenAI recipe generation when the model is confident.
  // Generating a full recipe for a low-confidence guess would be misleading,
  // so we let the frontend prompt the user to search manually instead.
  if (prediction.low_confidence) {
    return res.json({ success: true, data: { ...prediction, recipe: null } })
  }

  try {
    const recipe = await generateRecipeFromFood(prediction.food)
    res.json({ success: true, data: { ...prediction, recipe } })
  } catch (err) {
    // Image identification still succeeded even if recipe generation failed -
    // surface the prediction with a note rather than failing the whole request.
    res.json({
      success: true,
      data: { ...prediction, recipe: null, recipeError: err.message },
    })
  }
})
