import './Header.scss'
import './ProfileMenu.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Icon } from '@iconify/react'
import HeaderProfileMenu from './HeaderProfileMenu'
import Searchbar from './Searchbar'
import HeaderNotificationMenu from './HeaderNotificationMenu'
import HeaderLogoIcon from '../svg/HeaderLogoIcon'
import ChatDrawer from "../drawer/ChatDrawer";
import { Chat } from "stream-chat-react";
import useChat from "../../hooks/useChat";

const Header = (): JSX.Element => {

  const { isLightTheme, isLoggedIn, setIsChatDrawerOpen, newChatMessagesCount } = useContext(ThemeContext)
  const handleDrawerOpen = () => {
    setIsChatDrawerOpen(true);
  };

  return (
    <>
      <StreamChatDrawer />
      <header className={`header ${isLightTheme ? 'header--light' : ''}`}>
        <div className='header__left'>
          <HeaderLogoIcon />
        </div>
        {isLoggedIn ? <Searchbar /> : null}
        <div className='header__right'>
          {isLoggedIn ? (
            <>
              <HeaderNotificationMenu />
              <div className='header__right-chat_icon'>
                <div className='h-full relative'>
                  <button className="notification__badge">{newChatMessagesCount}</button>
                </div>
                <Icon icon='ph:paper-plane-tilt-bold' onClick={handleDrawerOpen} fontSize='25px' />
              </div>
              <HeaderProfileMenu />
            </>
          ) : null}
        </div>
      </header>
    </>
  )
}

const StreamChatDrawer = () => {

  const { streamChat } = useChat();

  if (streamChat == null) {
    return <div></div>;
  }

  return (
    <Chat client={streamChat!}>
      <ChatDrawer />
    </Chat>
  );
}

export default Header
