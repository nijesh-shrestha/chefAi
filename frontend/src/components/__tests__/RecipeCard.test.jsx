import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RecipeCard from '../RecipeCard'
import { FavoritesProvider } from '../../context/FavoritesContext'

const recipe = {
  id: '52772',
  name: 'Teriyaki Chicken Casserole',
  image: 'https://example.com/image.jpg',
  category: 'Chicken',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <RecipeCard recipe={recipe} />
      </FavoritesProvider>
    </MemoryRouter>
  )
}

describe('RecipeCard', () => {
  it('renders the recipe name, category, and links to the detail page', () => {
    renderCard()

    expect(screen.getByText('Teriyaki Chicken Casserole')).toBeInTheDocument()
    expect(screen.getByText('Chicken')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/recipe/52772')
  })

  it('toggles favorite state when the favorite button is clicked', async () => {
    const user = userEvent.setup()
    renderCard()

    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i })
    await user.click(favoriteButton)

    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument()
  })
})
