import { createContext, Dispatch, SetStateAction, useState } from "react";
import MyProfileInfoType from "../types/MyProfileInfoType";
import { StreamChat } from "stream-chat";

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLoading: boolean,
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  accessToken: string
  streamToken: string
  chatId: string | null
  streamChat: StreamChat | undefined,
  profileInfo: MyProfileInfoType
  setProfileInfo: Dispatch<SetStateAction<MyProfileInfoType>>,
  setIsLightTheme: (state: boolean) => void
  setIsLoggedIn: (state: boolean) => void
  setIsChatDrawerOpen: (state: boolean) => void
  setAccessToken: (state: string) => void
  setChatId: (state: string | null) => void
  setStreamChat: (state: StreamChat | undefined) => void
  setStreamToken: (state: string) => void
  setIsLoading: (state: boolean) => void
}

type ThemeContextProviderType = {
  children: JSX.Element
}

const defaultProfileInfo: MyProfileInfoType = {
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
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState<MyProfileInfoType>(defaultProfileInfo);
  const [streamToken, setStreamToken] = useState<string>('');
  const [streamChat, setStreamChat] = useState<StreamChat | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value: ThemeContextType = {
    isLoading,
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
    setStreamToken,
    setIsLoading
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
