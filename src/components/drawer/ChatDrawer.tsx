import { useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext'
import './Drawer.scss'
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  useChatContext,
  Window
} from "stream-chat-react";
import { Icon } from "@iconify/react";

const ChatDrawer = (): JSX.Element => {

  const { isChatDrawerOpen, setIsChatDrawerOpen, profileInfo } = useContext(ThemeContext)

  const { channel } = useChatContext();


  const handleDrawerClose = () => {
    setIsChatDrawerOpen(false)
    document.body.style.overflow = 'unset'
    document.body.style.height = 'unset'
  }

  return (
    <>
      {isChatDrawerOpen ? <div className='drawer__overlay' onClick={handleDrawerClose} /> : null}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`drawer py-5 ${isChatDrawerOpen ? 'drawer--open' : ''}`}
      >
        <button className={'px-3 text-white'} onClick={handleDrawerClose}>
          <Icon icon="mdi:close" fontSize={30} />
        </button>
        { !channel && (
          <ChannelList
            filters={{ members: { $in: [profileInfo.id] }}}
            sendChannelsToList={true}
            setActiveChannelOnMount={false}
          />
        ) }
        { channel && (
          <Channel>
            <Window>
              <CustomChannelHeader />
              <MessageList />
              <MessageInput  />
            </Window>
          </Channel>
        ) }
      </div>
    </>
  );
}
const CustomChannelHeader = () => {

  const { setActiveChannel } = useChatContext();

  return <div className={'bg-white flex justify-start gap-3 w-full items-center'}>
      <button className={'px-3 py-2'} onClick={() => setActiveChannel(undefined)}>
        <Icon icon="fa6-solid:arrow-left" fontSize={30} />
      </button>
  </div>;
};

export default ChatDrawer