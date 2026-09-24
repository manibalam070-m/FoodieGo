export const STORAGE_KEYS = {
  user: 'foodiego_user',
  cart: 'foodiego_cart',
  orders: 'foodiego_orders',
  favorites: 'foodiego_favorites',
  addresses: 'foodiego_addresses',
  notifications: 'foodiego_notifications',
  theme: 'foodiego_theme',
  recentSearches: 'foodiego_recent_searches',
  coupons: 'foodiego_coupons',
}

export const readStorage = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (error) {
    console.error(`Error reading ${key}:`, error)
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key}:`, error)
  }
}

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key}:`, error)
  }
}
