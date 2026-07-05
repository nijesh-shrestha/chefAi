import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-flour text-char dark:bg-char dark:text-flour">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
