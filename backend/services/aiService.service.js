import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

const aiService = axios.create({ baseURL: config.fastApiUrl, timeout: 20000 })

export async function analyzeFoodImage(filePath, mimeType) {
  const form = new FormData()
  form.append('image', fs.createReadStream(filePath), { contentType: mimeType })

  try {
    const { data } = await aiService.post('/predict', form, {
      headers: form.getHeaders(),
    })
    return data
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      throw new ApiError(503, 'Image recognition service is currently unavailable')
    }
    throw err
  } finally {
    // The uploaded file only needs to exist long enough to forward it - clean
    // it up regardless of whether the prediction succeeded.
    fs.unlink(filePath, () => {})
  }
}
