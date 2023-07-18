import { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { axios } from '../../axios'

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const HeaderProfileMenu = (): JSX.Element => {

  const {  setIsLoggedIn, profileInfo: { lowResImageLink } } = useContext(ThemeContext)

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
      {open ? <div className='profile_menu__overlay z-20' onClick={handleDropdownOverlayClose} /> : null}
      <div className='profile_menu__container'>
        <div className='profile_menu' onClick={handleDropdownMenuOpen}>
          <div className='profile_menu__picture_container'>
            <img className='profile_menu__picture' src={lowResImageLink || defaultUserImg} alt='profile' />
          </div>
        </div>
        <div className={`z-10 profile_menu__dropdown ${open ? 'profile_menu__dropdown--open' : ''}`}>
          <div className='profile_menu__dropdown-item'>
            <Icon fontSize={16} icon='mdi:user' />
            Username
          </div>
          <div
            className='profile_menu__dropdown-item'
            //onClick={() => setIsLightTheme((prevState) => !prevState)}
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

export default HeaderProfileMenu