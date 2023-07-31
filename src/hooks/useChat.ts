import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { StreamChat } from "stream-chat";

const useChat = () => {

  const {
          streamToken,
          profileInfo,
          setStreamChat,
          streamChat,
          accessToken,
          setNewChatMessagesCount,
        } = useContext(ThemeContext);

  useEffect(() => {
    if (!streamToken) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_KEY);
    chat.on((event) => {
      if (event.total_unread_count !== undefined) {
        console.log(event.total_unread_count);
        setNewChatMessagesCount(event.total_unread_count);
      }
      if (event.me?.total_unread_count)
        setNewChatMessagesCount(event.me.total_unread_count);
    });
    const connect = chat.connectUser(profileInfo, streamToken).then(() => {
      setStreamChat(chat);
    });
    return () => {
      setStreamChat(undefined);
      connect.then(() => {
        chat.disconnectUser();
      })
    }
  }, [streamToken, profileInfo.id, accessToken])

  return { streamChat, profileInfo };

}

export default useChat;