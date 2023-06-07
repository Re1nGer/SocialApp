import { FC, createContext, useState } from 'react'

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  accessToken: string | null
  chatId: string | null,
  headerProfileImageLink: string,
  backgroundProfileImageLink: string,
  setHeaderProfileImageLink: (state: string) => void
  setBackgroundProfileImageLink: (state: string) => void
  setIsLightTheme: (state: boolean) => void
  setIsLoggedIn: (state: boolean) => void
  setIsChatDrawerOpen: (state: boolean) => void
  setAccessToken: (state: string) => void
  setChatId: (state: string | null) => void
}

type ThemeContextProviderType = {
  children: JSX.Element
}

export function ThemeContextProvider({ children }: ThemeContextProviderType): JSX.Element {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [chatId, setChatId] = useState<string | null>(null)
  const [headerProfileImageLink, setHeaderProfileImageLink] = useState<string>('')
  const [backgroundProfileImageLink, setBackgroundProfileImageLink] = useState<string>('')

  const value: ThemeContextType = {
    isLightTheme,
    isLoggedIn,
    isChatDrawerOpen,
    accessToken,
    chatId,
    headerProfileImageLink,
    backgroundProfileImageLink,
    setHeaderProfileImageLink,
    setBackgroundProfileImageLink,
    setIsLightTheme,
    setIsLoggedIn,
    setIsChatDrawerOpen,
    setAccessToken,
    setChatId
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
