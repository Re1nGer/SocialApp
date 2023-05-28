import { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios } from '../../axios'

type HeaderProfileMenuType = {
  imgSrc: string
}

export function HeaderProfileMenu({ imgSrc }: HeaderProfileMenuType): JSX.Element {
  const { setIsLightTheme, setIsLoggedIn } = useContext(ThemeContext)

  const navigate = useNavigate()

  const [open, setOpen] = useState<boolean>(false)

  const handleDropdownOverlayClose = () => {
    setOpen(false)
  }

  const handleDropdownMenuOpen = () => {
    setOpen((prevState) => !prevState)
  }

  const revokeToken = async () => {
    try {
      await axios.post('/api/v1/account/revoke')
    } catch (error) {
      console.log(error)
    } finally {
      axios.defaults.headers.common.Authorization = ''
      sessionStorage.clear()
    }
  }

  const handleLogout = async () => {
    // await revokeToken();
    axios.defaults.headers.common.Authorization = ''
    sessionStorage.clear()
    setIsLoggedIn(false)
    navigate('/', { replace: false })
  }

  return (
    <>
      {open ? <div className='profile_menu__overlay' onClick={handleDropdownOverlayClose} /> : null}
      <div className='profile_menu__container'>
        <div className='profile_menu' onClick={handleDropdownMenuOpen}>
          <div className='profile_menu__picture_container'>
            <img className='profile_menu__picture' src={imgSrc} alt='profile' />
          </div>
        </div>
        <div className={`profile_menu__dropdown ${open ? 'profile_menu__dropdown--open' : ''}`}>
          <div className='profile_menu__dropdown-item'>
            <Icon fontSize={16} icon='mdi:user' />
            Username
          </div>
          <div
            className='profile_menu__dropdown-item'
            onClick={() => setIsLightTheme((prevState) => !prevState)}
          >
            <Icon fontSize={16} icon='mdi:weather-sunset-down' />
            Light Mode
          </div>
          <div className='profile_menu__dropdown-item' onClick={handleLogout}>
            <Icon fontSize={16} icon='mdi:arrow-right-thick' />
            Logout
          </div>
        </div>
      </div>
    </>
  )
}
