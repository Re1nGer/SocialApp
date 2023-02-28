import './App.css'
import { ThemeContextProvider } from './components/contexts/ThemeContext'
import Footer from './components/Footer/Footer'
import Header from './components/header/Header'
import Posts from './components/profile/Posts'
import ProfileImage from './components/profile/ProfileImage'
import ProfileInfo from './components/profile/ProfileInfo'

const App = () => {

  return (
    <>
      <ThemeContextProvider>
        <Header />
        <ProfileImage />
        <ProfileInfo />
        <Posts />
        <Footer />
      </ThemeContextProvider>
    </>
  )
}

export default App
