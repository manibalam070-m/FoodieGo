import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useThemeContext } from '../../context/ThemeContext'
import { readStorage, STORAGE_KEYS, writeStorage } from '../../utils/storage'
import { useEffect, useMemo, useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/offers', label: 'Offers' },
  { to: '/orders', label: 'Orders' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' },
]

const mobileItems = [
  { to: '/', label: 'Home' },
  { to: '/restaurants', label: 'Search' },
  { to: '/orders', label: 'Orders' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' },
]

export default function Layout({ children }) {
  const { cart } = useCartContext()
  const { theme, setTheme } = useThemeContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [recentSearches, setRecentSearches] = useState(() => readStorage(STORAGE_KEYS.recentSearches, []))

  useEffect(() => {
    if (location.pathname === '/restaurants' && search) {
      const trimmed = search.trim()
      if (!trimmed) return
      setRecentSearches((current) => [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 6))
      writeStorage(STORAGE_KEYS.recentSearches, recentSearches)
    }
  }, [location.pathname, search, recentSearches])

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])

  function handleSearchSubmit(e) {
    e.preventDefault()
    const trimmed = search.trim()
    if (!trimmed) return
    navigate(`/restaurants?search=${encodeURIComponent(trimmed)}`)
    setRecentSearches((current) => [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 6))
  }

  function handleThemeToggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname)

  if (isAuthRoute) {
    return <>{children}</>
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand" aria-label="FoodieGo home">
            <span className="brand-mark">F</span>
            <span>FoodieGo</span>
          </Link>

          <div className="location-box">
            <span className="dot" />
            Chennai, TN
          </div>

          <form onSubmit={handleSearchSubmit} className="global-search" role="search">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants, dishes or cuisines..."
              aria-label="Search restaurants, dishes or cuisines"
            />
          </form>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="icon-button" aria-label="Toggle theme" onClick={handleThemeToggle}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/cart" className="cart-pill" aria-label="View cart">
              Cart <span>{cartCount}</span>
            </Link>
            <Link to="/profile" className="profile-avatar" aria-label="Profile">
              A
            </Link>
          </div>
        </div>
      </header>

      <main className="page-wrap">
        <div className="container">{children}</div>
      </main>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {mobileItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
