import { useState } from 'react'
import { analyzeImage } from '../services/imageService'

export function useImageAnalysis() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (file) => {
    setLoading(true)
    setError(null)
    setPrediction(null)
    try {
      const result = await analyzeImage(file)
      setPrediction(result)
      return result
    } catch (err) {
      setError(err.message || 'Could not analyze the image. Please try again.')
      return null
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setPrediction(null)
    setError(null)
  }

  return { prediction, loading, error, analyze, reset }
}
