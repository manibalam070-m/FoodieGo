import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultNotifications } from '../data/notifications'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => readStorage(STORAGE_KEYS.notifications, defaultNotifications))

  useEffect(() => {
    writeStorage(STORAGE_KEYS.notifications, notifications)
  }, [notifications])

  const addNotification = (notification) => {
    setNotifications((current) => [{ ...notification, id: notification.id || Date.now().toString(), read: false }, ...current])
  }

  const markAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }

  const markOneAsRead = (id) => {
    setNotifications((current) => current.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)))
  }

  const value = useMemo(() => ({ notifications, setNotifications, addNotification, markAllAsRead, deleteNotification, markOneAsRead }), [notifications])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotificationContext() {
  return useContext(NotificationContext)
}
