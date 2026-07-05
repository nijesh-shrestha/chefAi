import dotenv from 'dotenv'

dotenv.config()

const required = ['OPENAI_API_KEY']

const missing = required.filter((key) => !process.env[key])
if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
  console.warn(
    `Warning: missing environment variables: ${missing.join(', ')}. ` +
      'Related features will fail until these are set in backend/.env'
  )
}

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  fastApiUrl: process.env.FASTAPI_URL || 'http://localhost:8000',
  mealDbBaseUrl:
    process.env.MEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1/1',
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
}
