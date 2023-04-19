import './Login.css'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useContext, useLayoutEffect, useState, useRef, useEffect } from 'react'
import LoginForm, { LoginFormType } from './LoginForm'
import { RevealText } from './RevealText'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios as call } from '../../axios'
import { gsap, Power3 } from 'gsap'
import WarframeLoader from '../loader/WarframeLoader'
import Polaroid from '../polaroid/Polaroid'
import Girl from '../../assets/girl1.jpg'
import Girl1 from '../../assets/girl2.jpg'
import Girl2 from '../../assets/girl3.jpg'
import Girl3 from '../../assets/girl4.jpg'

export type ApiErrorType = {
  message: string
}

function LoginContainer(): JSX.Element {
  const navigate = useNavigate()

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const [apiErrors, setApiErrors] = useState<ApiErrorType>({ message: '' })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [anchor, setAnchor] = useState<number>(300)

  const imageRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const image3Ref = useRef(null)

  const onSubmit: SubmitHandler<LoginFormType> = async ({ email, password }, _): Promise<void> => {
    try {
      setIsLoading(true)

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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 600) setAnchor(175)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        rotate: '-15deg',
        ease: Power3.easeInOut,
        duration: 1,
        opacity: 1,
      })
      gsap.to(image1Ref.current, {
        rotate: '5deg',
        ease: Power3.easeInOut,
        y: anchor,
        duration: 1,
        opacity: 1,
      })
      gsap.to(image2Ref.current, {
        rotate: '-15deg',
        ease: Power3.easeInOut,
        y: 2 * anchor,
        duration: 1,
        opacity: 1,
      })
      gsap.to(image3Ref.current, {
        rotate: '5deg',
        ease: Power3.easeInOut,
        y: 3 * anchor,
        duration: 1,
        opacity: 1,
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className='login__container'>
      <div className='login__left'>
        <Polaroid ref={imageRef} imgSrc={Girl} alt='front' />
        <Polaroid ref={image1Ref} imgSrc={Girl1} alt='some' />
        <Polaroid ref={image2Ref} imgSrc={Girl2} alt='some' />
        <Polaroid ref={image3Ref} imgSrc={Girl3} alt='some' caption='destiny' />
      </div>
      <div className='login__right'>
        <LoginForm onSubmit={onSubmit} apiErrors={apiErrors} />
        {isLoading ? <WarframeLoader /> : null}
        <RevealText />
      </div>
    </div>
  )
}

export default LoginContainer
