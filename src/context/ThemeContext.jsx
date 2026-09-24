import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.theme, 'light')
    return stored || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    writeStorage(STORAGE_KEYS.theme, theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
