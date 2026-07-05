import OpenAI from 'openai'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

const client = new OpenAI({ apiKey: config.openaiApiKey })

const RECIPE_SYSTEM_PROMPT = `You are a professional chef. Given a food name, create a detailed
homemade recipe. Respond with ONLY valid JSON (no markdown fences, no commentary) matching this
exact shape:
{
  "name": string,
  "ingredients": [{"name": string, "amount": string}],
  "instructions": [string],
  "cookingTimeMinutes": number,
  "difficulty": "Easy" | "Medium" | "Hard",
  "caloriesEstimate": number,
  "chefTips": [string]
}
Calories and difficulty are estimates, not verified nutritional data.`

const CHAT_SYSTEM_PROMPT = `You are SmartChef AI's cooking assistant. Answer cooking questions
concisely and practically: ingredient substitutions, technique adjustments, cooking methods
(e.g. air frying vs baking), and general culinary guidance. Keep responses focused and short
unless the user asks for detail.`

function parseJsonResponse(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    throw new ApiError(502, 'AI response could not be parsed. Please try again.')
  }
}

export async function generateRecipeFromFood(foodName) {
  if (!config.openaiApiKey) {
    throw new ApiError(503, 'OpenAI is not configured on the server')
  }

  const completion = await client.chat.completions.create({
    model: config.openaiModel,
    messages: [
      { role: 'system', content: RECIPE_SYSTEM_PROMPT },
      { role: 'user', content: `Create a detailed homemade recipe for ${foodName}.` },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const recipe = parseJsonResponse(completion.choices[0].message.content)
  return { ...recipe, aiGenerated: true }
}

export async function askCookingAssistant(message, context) {
  if (!config.openaiApiKey) {
    throw new ApiError(503, 'OpenAI is not configured on the server')
  }

  const messages = [{ role: 'system', content: CHAT_SYSTEM_PROMPT }]

  if (context) {
    messages.push({
      role: 'system',
      content: `The user is currently viewing this recipe: ${JSON.stringify(context)}`,
    })
  }

  messages.push({ role: 'user', content: message })

  const completion = await client.chat.completions.create({
    model: config.openaiModel,
    messages,
    temperature: 0.6,
  })

  return { reply: completion.choices[0].message.content }
}
