import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []))

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart)
  }, [cart])

  const addToCart = (item, qty = 1, customizations = {}) => {
    setCart((current) => {
      const existingItem = current.find((entry) => entry.id === item.id && JSON.stringify(entry.customizations) === JSON.stringify(customizations))
      if (existingItem) {
        return current.map((entry) =>
          entry.id === item.id && JSON.stringify(entry.customizations) === JSON.stringify(customizations)
            ? { ...entry, quantity: entry.quantity + qty }
            : entry,
        )
      }
      return [...current, { ...item, quantity: qty, customizations }]
    })
  }

  const updateQuantity = (id, customizations, change) => {
    setCart((current) =>
      current
        .map((item) => {
          const sameItem = item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
          if (!sameItem) return item
          return { ...item, quantity: Math.max(0, item.quantity + change) }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id, customizations) => {
    setCart((current) => current.filter((item) => !(item.id === id && JSON.stringify(item.customizations) === JSON.stringify(customizations))))
  }

  const value = useMemo(() => ({ cart, setCart, addToCart, updateQuantity, removeFromCart }), [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  return useContext(CartContext)
}
