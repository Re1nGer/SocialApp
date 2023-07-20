import { createContext, useState } from 'react'
import IProfileInfo from "../types/IProfileInfo";
import { StreamChat } from "stream-chat";

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  accessToken: string
  streamToken: string
  chatId: string | null
  streamChat: StreamChat | undefined,
  profileInfo: IProfileInfo
  setProfileInfo: (state: IProfileInfo) => void
  setIsLightTheme: (state: boolean) => void
  setIsLoggedIn: (state: boolean) => void
  setIsChatDrawerOpen: (state: boolean) => void
  setAccessToken: (state: string) => void
  setChatId: (state: string | null) => void
  setStreamChat: (state: StreamChat | undefined) => void
  setStreamToken: (state: string) => void
}

type ThemeContextProviderType = {
  children: JSX.Element
}

const defaultProfileInfo: IProfileInfo = {
  id: '',
  lowResImageLink: '',
  username: '',
  highResImageLink: '',
  profileBackgroundImagelink: '',
  userPosts: [],
  userRequests: [],
  postBookmarks: []
}

export function ThemeContextProvider({ children }: ThemeContextProviderType): JSX.Element {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string>('')
  const [chatId, setChatId] = useState<string | null>(null)
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>(defaultProfileInfo)
  const [streamToken, setStreamToken] = useState<string>('')
  const [streamChat, setStreamChat] = useState<StreamChat | undefined>(undefined)

  const value: ThemeContextType = {
    isLightTheme,
    isLoggedIn,
    isChatDrawerOpen,
    accessToken,
    chatId,
    profileInfo,
    streamToken,
    streamChat,
    setProfileInfo,
    setIsLightTheme,
    setIsLoggedIn,
    setIsChatDrawerOpen,
    setAccessToken,
    setChatId,
    setStreamChat,
    setStreamToken
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
