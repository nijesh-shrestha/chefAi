import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  it('calls onSearch with the trimmed query on submit', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(<SearchBar onSearch={onSearch} loading={false} />)

    const input = screen.getByPlaceholderText(/search recipes/i)
    await user.type(input, '  Chicken Biryani  ')
    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(onSearch).toHaveBeenCalledWith('Chicken Biryani')
  })

  it('does not call onSearch when the input is empty', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(<SearchBar onSearch={onSearch} loading={false} />)
    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(onSearch).not.toHaveBeenCalled()
  })

  it('disables the button and shows a loading label while loading', () => {
    render(<SearchBar onSearch={vi.fn()} loading={true} />)

    const button = screen.getByRole('button', { name: /searching/i })
    expect(button).toBeDisabled()
  })
})
