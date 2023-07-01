import './Header.scss'
import './ProfileMenu.scss'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Icon } from '@iconify/react'
import HeaderProfileMenu from './HeaderProfileMenu'
import Searchbar from './Searchbar'
import HeaderNotificationMenu from './HeaderNotificationMenu'
import HeaderLogoIcon from '../svg/HeaderLogoIcon'
import HeaderHamburgerMenu from "./HeaderHamburgerMenu";

const Header = (): JSX.Element => {

  const { isLightTheme, isLoggedIn, } = useContext(ThemeContext)

  return (
    <>
      <header className={`header ${isLightTheme ? 'header--light' : ''}`}>
        <div className='header__left'>
          <HeaderHamburgerMenu />
          <HeaderLogoIcon />
        </div>
        {isLoggedIn ? <Searchbar /> : null}
        <div className='header__right'>
          {isLoggedIn ? (
            <>
              <HeaderNotificationMenu />
              <HeaderProfileMenu />
            </>
          ) : null}
          {isLoggedIn ? (
            <div className='header__right-chat_icon'>
              <Icon icon='ph:paper-plane-tilt-bold' fontSize='25px' /> {/* onClick={handleDrawerOpen} /> */}
            </div>
          ) : null}
        </div>
      </header>
    </>
  )
}

export default Header
