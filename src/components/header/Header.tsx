import './Header.scss'
import './ProfileMenu.scss'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { HeaderHamburgerMenu } from './HeaderHamburgerMenu'
import { HeaderLogoIcon } from '../svg/HeaderLogoIcon'
import { HeaderProfileMenu } from './HeaderProfileMenu'
import { ThemeContext } from '../contexts/ThemeContext'
import ChatDrawer from '../drawer/ChatDrawer'
import Searchbar from './Searchbar'
import HeaderNotificationMenu from './HeaderNotificationMenu'

function Header(): JSX.Element {
  const { isLightTheme, isLoggedIn, setIsChatDrawerOpen, headerProfileImageLink } = useContext(ThemeContext)

  const navigate = useNavigate()

  const handleIconClick = () => {
    navigate('/feed')
  }

  const handleDrawerOpen = () => {
    setIsChatDrawerOpen(true)
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  }

  return (
    <>
      <ChatDrawer />
      <header className={`header ${isLightTheme ? 'header--light' : ''}`}>
        <div className='header__left'>
          <HeaderHamburgerMenu isLightTheme={isLightTheme} />
          <HeaderLogoIcon onClick={handleIconClick} />
        </div>
        {isLoggedIn ? <Searchbar /> : null}
        <div className='header__right'>
          {isLoggedIn ? (
            <>
              <HeaderNotificationMenu />
              <HeaderProfileMenu imgSrc={headerProfileImageLink} />
            </>
          ) : null}
          {isLoggedIn ? (
            <div className='header__right-chat_icon'>
              <Icon icon='ph:paper-plane-tilt-bold' fontSize='25px' onClick={handleDrawerOpen} />
            </div>
          ) : null}
        </div>
      </header>
    </>
  )
}

export default Header
