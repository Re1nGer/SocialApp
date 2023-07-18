import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeContextProvider } from './contexts/ThemeContext'
import Layout from './components/Layout/Layout'
import ProfilePage from './components/pages/ProfilePage'
import LoginPage from './components/pages/LoginPage'
import PostPage from './components/pages/PostPage'
import FeedPage from './components/pages/FeedPage'
import SignUpPage from './components/pages/SignUp'
import PrivateRoute from './components/route/PrivateRoute'
import MyProfilePage from './components/pages/MyProfilePage'
import SearchPage from "./components/pages/SearchPage";
import AccountPage from "./components/pages/AccountPage";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' index element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/user/:userId' element={<ProfilePage />} />
              <Route path='/mypage' element={<MyProfilePage />} />
              <Route path='/post/:id' element={<PostPage />} />
              <Route path='/feed' element={<FeedPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/account' element={<AccountPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  )
}

export default App
