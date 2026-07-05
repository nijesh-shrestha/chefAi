import app from './app.js'
import { config } from './config/env.js'

app.listen(config.port, () => {
  console.log(`SmartChef AI backend listening on http://localhost:${config.port}`)
})
