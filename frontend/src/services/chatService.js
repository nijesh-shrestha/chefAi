import api from './api'

export async function askCookingAssistant(message, context) {
  const { data } = await api.post('/api/chat', { message, context })
  return data.data.reply
}
