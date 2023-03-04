import './App.css'
import { ThemeContextProvider } from './components/contexts/ThemeContext'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Posts from './components/profile/Posts'
import ProfileImage from './components/profile/ProfileImage'
import ProfileInfo from './components/profile/ProfileInfo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProfilePage from './components/pages/ProfilePage'
import LoginPage from './components/pages/LoginPage'

const App = () => {

  return (
    <>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' index element={<LoginPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/mypage' element={<ProfilePage />}/>
            </Route>
          </Routes>
        </Router>
      </ThemeContextProvider>
    </>
  )
}

export default App
