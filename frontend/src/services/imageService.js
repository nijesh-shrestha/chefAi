import api from './api'

export async function analyzeImage(file) {
  const form = new FormData()
  form.append('image', file)

  const { data } = await api.post('/api/image/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data // { food, confidence, low_confidence }
}
