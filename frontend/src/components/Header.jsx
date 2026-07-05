import { NavLink } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/about', label: 'About' },
]

function Header() {
  const { theme, toggleTheme } = useDarkMode()

  return (
    <header className="border-b border-char/10 dark:border-flour/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="font-display text-xl font-semibold tracking-tight">
          SmartChef <span className="text-saffron">AI</span>
        </NavLink>

        <nav className="flex items-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-saffron ${
                  isActive ? 'text-saffron' : 'text-char/70 dark:text-flour/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border border-char/10 px-3 py-1.5 text-sm dark:border-flour/10"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
