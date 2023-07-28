import { useContext, useEffect, useState } from "react";
import { ThemeContext } from '../../contexts/ThemeContext'
import './Drawer.scss'
import useChat from "../../hooks/useChat";
import {
  Channel,
  ChannelList,
  ChannelListMessengerProps,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  useChatContext,
  Window
} from "stream-chat-react";
import { axios } from '../../axios';

const ChatDrawer = (): JSX.Element => {

  const { isChatDrawerOpen, setIsChatDrawerOpen } = useContext(ThemeContext)

  const { streamChat , profileInfo } = useChat();

  const handleDrawerClose = () => {
    setIsChatDrawerOpen(false)
    document.body.style.overflow = 'unset'
    document.body.style.height = 'unset'
  }

  if (streamChat == null) return <LoadingIndicator />

  return (
    <>
      {isChatDrawerOpen ? <div className='drawer__overlay' onClick={handleDrawerClose} /> : null}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`drawer py-5 ${isChatDrawerOpen ? 'drawer--open' : ''}`}
      >
        <Chat client={streamChat} >
            <ChannelList
              filters={{ members: { $in: [profileInfo.id] }}}
              List={ChannelListCustom}
              sendChannelsToList={true} />
            <Channel>
              <Window>
                <CustomChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
        </Chat>
      </div>
    </>
  );
}
const CustomChannelHeader = () => {

  const { setActiveChannel } = useChatContext();

  return <div className={'bg-white flex justify-center gap-3 w-full flex-col items-center'}>
    <span className={'flex gap-3'}>
      <button onClick={() => setActiveChannel(undefined)}>Go Back</button>
    </span>
  </div>;
};


interface Chat {
  id: string,
  channelId: string,
  name: string
}

const ChannelListCustom = ({ loadedChannels }: ChannelListMessengerProps) => {

  const { setActiveChannel, channel : activeChannel } = useChatContext();

  const { setIsChatDrawerOpen } = useContext(ThemeContext);

  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    try {
      const { data} = await axios.get<Chat[]>("/api/v1/chat/list");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  if (activeChannel)
    return <div></div>

  return (
      <div className={'flex flex-col gap-3 h-full w-screen'}>
      <button onClick={() => setIsChatDrawerOpen(false)}
              className={'transition-colors duration-150 rounded-3xl p-3 outline-0 border bg-white text-black'}>Close</button>
      { loadedChannels?.map(item => <div
            className={'transition-colors duration-150 m-2 w-full p-3 flex gap-3 cursor-pointer rounded-2xl bg-white hover:bg-black hover:text-white'}
            key={item.id}
            onClick={() => setActiveChannel(item)}>
            { item.data?.image && (
              <img src={item.data?.image} alt={'group'} />
            ) }
        {chats.find(chat =>  chat.channelId === item.id)?.name || item.id}
      </div> )}
  </div>);
};

export default ChatDrawer