import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.'
    return Promise.reject({ ...error, message })
  }
)

export default api
