import { createContext, Dispatch, SetStateAction, useState } from "react";
import MyProfileInfoType from "../types/MyProfileInfoType";
import { Channel, StreamChat } from "stream-chat";

export const ThemeContext = createContext<ThemeContextType>(null!)

export type ThemeContextType = {
  isLoading: boolean,
  isLightTheme: boolean
  isLoggedIn: boolean
  isChatDrawerOpen: boolean
  isInputFocused: boolean //this variable is needed for mobile; if any input is focused than bottom navigation should stay down
  accessToken: string
  streamToken: string
  chatId: string | null
  newChatMessagesCount: number
  streamChat: StreamChat | undefined
  channels: Channel[]
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
  setIsInputFocused: Dispatch<SetStateAction<boolean>>
  setNewChatMessagesCount: Dispatch<SetStateAction<number>>
  setChannels: Dispatch<SetStateAction<Channel[]>>
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
  postBookmarks: [],
  intro: ''
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
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [newChatMessagesCount, setNewChatMessagesCount] = useState<number>(0);
  const [channels, setChannels] = useState<Channel[]>([]);


  const value: ThemeContextType = {
    isLoading,
    isLightTheme,
    isLoggedIn,
    isChatDrawerOpen,
    isInputFocused,
    accessToken,
    chatId,
    profileInfo,
    streamToken,
    streamChat,
    newChatMessagesCount,
    channels,
    setProfileInfo,
    setIsLightTheme,
    setIsLoggedIn,
    setIsChatDrawerOpen,
    setAccessToken,
    setChatId,
    setStreamChat,
    setStreamToken,
    setIsLoading,
    setIsInputFocused,
    setNewChatMessagesCount,
    setChannels
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
