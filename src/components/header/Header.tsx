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
import { axios as call } from '../../axios'
import HeaderNotificationMenu from './HeaderNotificationMenu'

interface IUserImage {
  lowResUserImageSrc: string
}

function Header(): JSX.Element {
  const { isLightTheme, isLoggedIn, setIsChatDrawerOpen } = useContext(ThemeContext)

  const [imageSrc, setImageSrc] = useState<string>('')

  const navigate = useNavigate()

  const handleIconClick = () => {
    navigate('/feed')
  }

  const handleDrawerOpen = () => {
    setIsChatDrawerOpen(true)
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  }

  const fetchProfileImage = async (): Promise<void> => {
    try {
      const { data } = await call.get<IUserImage>(`/api/v1/user/profileimage`)
      setImageSrc(data.lowResUserImageSrc)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileImage()
    } 
  }, [isLoggedIn])

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
              <HeaderProfileMenu imgSrc={imageSrc} />
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
