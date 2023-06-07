import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { isHtmlElement } from 'react-router-dom/dist/dom'

function Layout(): JSX.Element {
  const { isLightTheme } = useContext(ThemeContext)
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
