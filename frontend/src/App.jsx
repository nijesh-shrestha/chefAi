import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { FavoritesProvider } from './context/FavoritesContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import RecipeDetails from './pages/RecipeDetails'
import Favorites from './pages/Favorites'
import About from './pages/About'

function App() {
  return (
    <FavoritesProvider>
      <Toaster position="bottom-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  )
}

export default App
