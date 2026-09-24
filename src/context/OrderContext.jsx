import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.orders, []))

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orders, orders)
  }, [orders])

  const addOrder = (newOrder) => {
    setOrders((current) => [newOrder, ...current])
  }

  const value = useMemo(() => ({ orders, setOrders, addOrder }), [orders])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrderContext() {
  return useContext(OrderContext)
}
