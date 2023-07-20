import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { StreamChat } from "stream-chat";

const useChat = () => {

  const { streamToken, profileInfo, setStreamChat, streamChat } = useContext(ThemeContext);

  useEffect(() => {
    if (!streamToken) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_KEY);
    let isInterrupted= false;
    chat.on((event) => {
      if (event.total_unread_count !== undefined) {
        console.log(event.total_unread_count);
      }

      if (event.unread_channels !== undefined) {
        console.log(event.unread_channels);
      }
    });
    const connect = chat.connectUser(profileInfo, streamToken).then(() => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });
    return () => {
      isInterrupted = true;
      setStreamChat(undefined);
      connect.then(() => {
        chat.disconnectUser();
      })
    }
  }, [streamToken, profileInfo.id])

  return { streamChat, profileInfo };

}

export default useChat;