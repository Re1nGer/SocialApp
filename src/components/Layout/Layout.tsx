import { Outlet, useLocation } from "react-router-dom";
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useContext, useEffect } from "react";
import { axios } from "../../axios";
import { ThemeContext } from '../contexts/ThemeContext'

function Layout(): JSX.Element {
  const { isLightTheme, accessToken, setAccessToken } = useContext(ThemeContext)

  const location = useLocation()

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/account/refresh")
      setAccessToken(data.token)
    }
    catch (error) {
      console.log(error)
    }
  }

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
      </div>
    </>
  )
}

export default Layout
