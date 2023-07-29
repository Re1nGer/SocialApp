import { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../contexts/ThemeContext'
import { axios } from '../../axios'
import { motion } from "framer-motion";

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

  const handleNavigate = (navigateTo: string) => {
    setOpen(false);
    navigate(navigateTo);
  }

  return (
    <>
      {open ? <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{opacity: 1}}
            exit={{ opacity:0 }}
            className='profile_menu__overlay z-10'
            onClick={handleDropdownOverlayClose} />
        </>
        : null}
      <div className='profile_menu__container'>
        <div className='profile_menu' onClick={handleDropdownMenuOpen}>
          <div className='profile_menu__picture_container'>
            <motion.img
              transition={{ ease: 'easeIn', duration: 1.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='profile_menu__picture'
              src={lowResImageLink || defaultUserImg}
              alt='profile'
            />
          </div>
        </div>
        <motion.div className={`z-10 profile_menu__dropdown ${open ? 'profile_menu__dropdown--open' : ''}`}>
          <div className='profile_menu__dropdown-item' onClick={() => handleNavigate("/account")}>
            <Icon fontSize={16} icon='mdi:user' />
            Account
          </div>
          <div className='profile_menu__dropdown-item opacity-50' >
            <Icon fontSize={16} icon='mdi:weather-sunset-down' />
            Light Mode
          </div>
          <div className='profile_menu__dropdown-item' onClick={handleLogout}>
            <Icon fontSize={16} icon='mdi:arrow-right-thick' />
            Logout
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default HeaderProfileMenu