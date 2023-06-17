import { createContext, useState } from 'react'
import IProfileInfo from "../../types/IProfileInfo";

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  accessToken: string
  chatId: string | null,
  profileInfo: IProfileInfo,
  setProfileInfo: (state: IProfileInfo) => void
  setIsLightTheme: (state: boolean) => void
  setIsLoggedIn: (state: boolean) => void
  setIsChatDrawerOpen: (state: boolean) => void
  setAccessToken: (state: string) => void
  setChatId: (state: string | null) => void
}

type ThemeContextProviderType = {
  children: JSX.Element
}

const defaultProfileInfo: IProfileInfo = {
  lowResImageLink: '',
  username: '',
  highResImageLink: '',
  profileBackgroundImagelink: '',
  userPosts: [],
  userRequests: []
}

export function ThemeContextProvider({ children }: ThemeContextProviderType): JSX.Element {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string>('')
  const [chatId, setChatId] = useState<string | null>(null)
  const [userRequests, setUserRequests] = useState()
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>(defaultProfileInfo)

  const value: ThemeContextType = {
    isLightTheme,
    isLoggedIn,
    isChatDrawerOpen,
    accessToken,
    chatId,
    profileInfo,
    setProfileInfo,
    setIsLightTheme,
    setIsLoggedIn,
    setIsChatDrawerOpen,
    setAccessToken,
    setChatId
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
