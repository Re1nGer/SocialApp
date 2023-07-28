import { Outlet, useLocation } from "react-router-dom";
import Header from '../header/Header'
import { useContext, useEffect } from "react";
import { axios } from "../../axios";
import { ThemeContext } from '../../contexts/ThemeContext'
import MobileBottomNavigation from "./BottomNavigation";
import MyProfileInfoType from "../../types/MyProfileInfoType";

const Layout = (): JSX.Element => {
  const { isLightTheme,
        accessToken,
        setAccessToken,
        setIsLoggedIn,
        setStreamToken,
        setProfileInfo
      } = useContext(ThemeContext)

  const location = useLocation();

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/account/refresh")
      setAccessToken(data.token)
      setStreamToken(data.streamToken);
      setIsLoggedIn(true)
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    }
    catch (error) {
      console.log(error)
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
    <footer className={'flex w-full h-full bottom-0 my-5 items-end justify-center text-white text-center font-bold min-h-[62px]'}>
      <h1 className={'my-5 hidden sm:block'}>
        All Rights Reserved
      </h1>
    </footer>
  )
}



export default Layout