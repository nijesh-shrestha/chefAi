import api from './api'

export async function searchByName(query) {
  const { data } = await api.get('/api/recipes/search', { params: { q: query } })
  return data.data.results
}

export async function searchByIngredients(ingredients) {
  const { data } = await api.get('/api/recipes/ingredient', {
    params: { name: ingredients.join(',') },
  })
  return data.data.results
}

export async function getRecipeById(id) {
  const { data } = await api.get(`/api/recipes/${id}`)
  return data.data
}

export async function getPopularRecipes() {
  const { data } = await api.get('/api/popular')
  return data.data.results
}
