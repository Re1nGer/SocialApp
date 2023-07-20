import { useContext } from 'react'
import { Icon } from '@iconify/react'
import { ThemeContext } from '../../contexts/ThemeContext'
import './animations.css'
import './Drawer.scss'
import useChat from "../../hooks/useChat";
import {
  Channel,
  ChannelHeaderProps,
  ChannelList, ChannelListMessengerProps,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList, useChannelStateContext, useChatContext,
  Window
} from "stream-chat-react";

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
        className={`drawer py-5 ${isChatDrawerOpen ? 'drawer--open' : ''} `}
      >
        <div className='drawer__title'>
          <div className='drawer__tile-text'>DM</div>
          <div className='drawer__close'>
            <Icon onClick={handleDrawerClose} icon='ic:round-close' color='#fff' fontSize='20px' />
          </div>
        </div>
        <Chat client={streamChat} >
            <ChannelList filters={{ members: { $in: [profileInfo.id] }} } List={ChannelListCustom}  sendChannelsToList={true} />
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
const CustomChannelHeader = (props: ChannelHeaderProps) => {

  const { title } = props;

  const { channel } = useChannelStateContext();

  const { setActiveChannel } = useChatContext();

  const { name, member_count } = channel.data || {};

  return <div className={'bg-white flex justify-center gap-3 w-full flex-col items-center'}>
    <span className={'flex gap-3'}>
      <button onClick={() => setActiveChannel(undefined)}>Go Back</button>
      Group Name: { title || name }</span>
    <span>Members: { member_count }</span>
  </div>;
};

const ChannelListCustom = ({ loadedChannels }: ChannelListMessengerProps) => {
  const { setActiveChannel, channel : activeChannel } = useChatContext();
  console.log(loadedChannels);

  if (activeChannel)
    return <div></div>

  return <div className={'flex flex-col gap-3 h-full w-full min-w-[350px]'}>
    { loadedChannels?.map(item => <div className={'transition-colors duration-150  m-2 w-full p-3 flex gap-3 cursor-pointer rounded-2xl bg-white hover:bg-black hover:text-white'} key={item.id} onClick={() => setActiveChannel(item)}>
      { item.data?.image && (
        <img src={item.data?.image} alt={'group'} />

      ) }
      { item.data?.name  || item.id}
    </div>) }
  </div>
};

export default ChatDrawer

