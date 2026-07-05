import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecentSearches } from '../useRecentSearches'

beforeEach(() => {
  localStorage.clear()
})

describe('useRecentSearches', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useRecentSearches())
    expect(result.current.recent).toEqual([])
  })

  it('adds a search term to the front of the list', () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => result.current.addSearch('Pizza'))
    act(() => result.current.addSearch('Biryani'))

    expect(result.current.recent).toEqual(['Biryani', 'Pizza'])
  })

  it('de-duplicates case-insensitively, moving the repeated term to the front', () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => result.current.addSearch('Pizza'))
    act(() => result.current.addSearch('Biryani'))
    act(() => result.current.addSearch('pizza'))

    expect(result.current.recent).toEqual(['pizza', 'Biryani'])
  })

  it('caps the list at 8 items', () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      for (let i = 0; i < 10; i += 1) {
        result.current.addSearch(`term-${i}`)
      }
    })

    expect(result.current.recent).toHaveLength(8)
    expect(result.current.recent[0]).toBe('term-9')
  })

  it('clears all recent searches', () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => result.current.addSearch('Pizza'))
    act(() => result.current.clearRecent())

    expect(result.current.recent).toEqual([])
  })
})
