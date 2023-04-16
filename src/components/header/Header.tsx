import './Header.css'
import './ProfileMenu.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { HeaderHamburgerMenu } from './HeaderHamburgerMenu'
import { HeaderLogoIcon } from '../svg/HeaderLogoIcon'
import { HeaderProfileMenu } from './HeaderProfileMenu'
import { ThemeContext } from '../contexts/ThemeContext'
import ChatDrawer from '../drawer/ChatDrawer'
import Searchbar from './Searchbar'

function Header(): JSX.Element {
  const { isLightTheme, isLoggedIn, setIsChatDrawerOpen } = useContext(ThemeContext)

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
          {isLoggedIn ? <HeaderProfileMenu imgSrc='' /> : null}
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
