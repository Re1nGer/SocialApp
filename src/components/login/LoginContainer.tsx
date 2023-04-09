import './Login.css'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useAnimation } from 'framer-motion'
import LoginForm, { LoginFormType } from './LoginForm'
import { RevealText } from './RevealText'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios as call } from '../../axios'
import Polaroid from '../polaroid/Polaroid'
import Girl from '../../assets/girl1.jpg'
import Girl1 from '../../assets/girl2.jpg'
import Girl2 from '../../assets/girl3.jpg'
import Girl3 from '../../assets/girlFront.jpg'

export type ApiErrorType = {
  message: string
}

function LoginContainer(): JSX.Element {
  const navigate = useNavigate()

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const control = useAnimation()

  const [apiErrors, setApiErrors] = useState<ApiErrorType>({ message: '' })

  const onSubmit: SubmitHandler<LoginFormType> = async ({ email, password }, _): Promise<void> => {
    try {
      control.start({ filter: 'blur(10px)' })

      const body = { email, password }

      const { data } = await call.post('/api/v1/account/signin', body)

      setAccessToken(data.token)

      call.defaults.headers.common.Authorization = `Bearer ${data.token}`

      setIsLoggedIn(true)

      sessionStorage.setItem('isAuthenticated', 'true')

      navigate('/mypage', { replace: true })
    } catch (error: any) {
      console.log(error)

      setApiErrors(error.response.data.error)
    } finally {
      control.start({ filter: 'none' })
    }
  }

  return (
    <div className='login__container'>
      <div className='login__left'>
        <Polaroid imgSrc={Girl} alt='front' rotate='-15deg' />
        <Polaroid imgSrc={Girl1} alt='some' rotate='5deg' />
        <Polaroid imgSrc={Girl2} alt='some' rotate='-15deg' />
        <Polaroid imgSrc={Girl3} alt='some' rotate='5deg' />
      </div>
      <div className='login__right'>
        <LoginForm onSubmit={onSubmit} apiErrors={apiErrors} />
        <RevealText />
      </div>
    </div>
  )
}

export default LoginContainer
