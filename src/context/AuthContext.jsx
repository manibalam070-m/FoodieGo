import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'
import { defaultUser } from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.user, defaultUser)
    return stored || defaultUser
  })

  useEffect(() => {
    writeStorage(STORAGE_KEYS.user, user)
  }, [user])

  const value = useMemo(() => ({ user, setUser }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext)
}
