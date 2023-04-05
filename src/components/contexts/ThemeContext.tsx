import { FC, createContext, useState } from 'react'

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  accessToken: string | null
  setIsLightTheme: (state: boolean) => void
  setIsLoggedIn: (state: boolean) => void
  setIsChatDrawerOpen: (state: boolean) => void
  setAccessToken: (state: string) => void
}

type ThemeContextProviderType = {
  children: JSX.Element
}

export function ThemeContextProvider({ children }: ThemeContextProviderType): JSX.Element {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const value: ThemeContextType = {
    isLightTheme,
    isLoggedIn,
    isChatDrawerOpen,
    setIsLightTheme,
    setIsLoggedIn,
    setIsChatDrawerOpen,
    accessToken,
    setAccessToken,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
