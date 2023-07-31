import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from '../header/Header'
import { useContext, useEffect } from "react";
import { axios } from "../../axios";
import { ThemeContext } from '../../contexts/ThemeContext'
import MobileBottomNavigation from "./BottomNavigation";
import MyProfileInfoType from "../../types/MyProfileInfoType";
import { Icon } from "@iconify/react";

const Layout = (): JSX.Element => {
  const {
        isLightTheme,
        accessToken,
        setAccessToken,
        setIsLoggedIn,
        setStreamToken,
        setProfileInfo
      } = useContext(ThemeContext)

  const location = useLocation();

  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/account/refresh")
      setAccessToken(data.token)
      setStreamToken(data.streamToken);
      setIsLoggedIn(true)
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    }
    catch (error) {
      setIsLoggedIn(false)
      navigate('/', { replace: true });
    }
  }

  const fetchUserData = async (): Promise<void> => {
    try {
      const { data } = await axios.get<MyProfileInfoType>('/api/v1/user')
      setProfileInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (accessToken) fetchUserData();
  },[accessToken])


  useEffect(() => {
    if (!accessToken && location.pathname !== "/")
      refreshAccessToken()
  },[accessToken])


  return (
    <>
      <div className={isLightTheme ? 'bg-white' : 'bg-black'}>
        <Header />
        <Outlet />
        <Footer />
        <MobileBottomNavigation />
      </div>
    </>
  )
}


const Footer = () => {

  return (
    <footer className={'flex w-full flex-col justify-end text-white gap-1 text-center font-bold min-h-[200px]'}>
      <h1 className={'my-1 hidden sm:block'}>
        All Rights Reserved
      </h1>
      <span className={'flex items-center justify-center gap-2'}>
        <h1 className={'text-white'}>Keep In Touch</h1>
        <Icon icon="mdi:github" fontSize={20} />
        <Icon icon="simple-icons:linkedin" fontSize={20} />
      </span>
    </footer>
  )
}



export default Layout