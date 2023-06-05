import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useContext,  useState   } from 'react'
import LoginForm, { LoginFormType } from './LoginForm'
import { RevealText } from './RevealText'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios as call } from '../../axios'
import WarframeLoader from '../loader/WarframeLoader'
import PolaroidMenu from './PolaroidMenu'

export type ApiErrorType = {
  message: string
}

function LoginContainer(): JSX.Element {
  const navigate = useNavigate()

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const [apiErrors, setApiErrors] = useState<ApiErrorType>({ message: '' })

  const [isLoading, setIsLoading] = useState<boolean>(false)


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




  return (
    <div className='login__container'>
      <div className='login__left'>
        <PolaroidMenu />
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

