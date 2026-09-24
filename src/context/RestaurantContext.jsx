import { createContext, useContext, useMemo } from 'react'
import { restaurants } from '../data/restaurants'

const RestaurantContext = createContext(null)

export function RestaurantProvider({ children }) {
  const value = useMemo(() => ({ restaurants }), [])

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>
}

export function useRestaurantContext() {
  return useContext(RestaurantContext)
}
