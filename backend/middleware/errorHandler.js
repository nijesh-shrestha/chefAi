import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'
import multer from 'multer'

export function errorHandler(err, req, res, next) {
  let statusCode = err instanceof ApiError ? err.statusCode : 500
  let message = err.message || 'Internal server error'

  // Multer-specific errors (file too large, wrong field name, etc.)
  if (err instanceof multer.MulterError) {
    statusCode = 400
    message = `Upload error: ${err.message}`
  }

  // Errors bubbling up from Axios calls to FastAPI / OpenAI / TheMealDB
  if (err.isAxiosError) {
    statusCode = err.response?.status || 502
    message = err.response?.data?.message || 'A downstream service failed to respond'
  }

  if (config.nodeEnv !== 'production') {
    console.error(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.nodeEnv !== 'production' && { stack: err.stack }),
  })
}
