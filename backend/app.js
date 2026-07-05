import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config/env.js'
import routes from './routes/index.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: config.frontendUrl }))
app.use(express.json())
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'))
}

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'SmartChef AI backend is running' })
})

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)

export default app
