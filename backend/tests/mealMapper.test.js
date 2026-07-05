import { describe, it, expect } from '@jest/globals'
import { mapMeal, mapMealSummary } from '../utils/mealMapper.js'

const rawMeal = {
  idMeal: '52772',
  strMeal: 'Teriyaki Chicken Casserole',
  strCategory: 'Chicken',
  strArea: 'Japanese',
  strMealThumb: 'https://example.com/image.jpg',
  strTags: 'Meat,Casserole',
  strInstructions: 'Preheat oven...',
  strIngredient1: 'soy sauce',
  strMeasure1: '3/4 cup',
  strIngredient2: 'water',
  strMeasure2: '1/2 cup',
  strIngredient3: '',
  strMeasure3: '',
}

describe('mapMeal', () => {
  it('returns null for a missing meal', () => {
    expect(mapMeal(null)).toBeNull()
  })

  it('extracts only non-empty ingredients', () => {
    const result = mapMeal(rawMeal)

    expect(result.ingredients).toEqual([
      { name: 'soy sauce', measure: '3/4 cup' },
      { name: 'water', measure: '1/2 cup' },
    ])
  })

  it('splits comma-separated tags into an array', () => {
    const result = mapMeal(rawMeal)
    expect(result.tags).toEqual(['Meat', 'Casserole'])
  })

  it('maps top-level fields to a clean shape', () => {
    const result = mapMeal(rawMeal)
    expect(result).toMatchObject({
      id: '52772',
      name: 'Teriyaki Chicken Casserole',
      category: 'Chicken',
      area: 'Japanese',
    })
  })
})

describe('mapMealSummary', () => {
  it('returns a lightweight shape without ingredients', () => {
    const result = mapMealSummary(rawMeal)
    expect(result).toEqual({
      id: '52772',
      name: 'Teriyaki Chicken Casserole',
      image: 'https://example.com/image.jpg',
      category: 'Chicken',
    })
  })
})
