import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useContext, useState } from 'react'
import LoginForm, { LoginFormType } from './LoginForm'
import { RevealText } from './RevealText'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios } from '../../axios'
import PolaroidMenu from './PolaroidMenu'

export type ApiErrorType = {
  message: string
}

const LoginContainer = (): JSX.Element => {

  const navigate = useNavigate()

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const [apiErrors, setApiErrors] = useState<ApiErrorType>({ message: '' })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LoginFormType> = async ({ email, password }, _): Promise<void> => {
    try {
      setIsLoading(true)

      const body = { email, password }

      const { data } = await axios.post('/api/v1/account/signin', body)

      setAccessToken(data.token)

      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`

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
    <div className='flex min-h-[2000px]'>
      <div className='grow-[.5] flex justify-center h-full'>
        <PolaroidMenu />
      </div>
      <div className='grow-[.5] bg-white flex flex-col min-h-[2000px] p-2 items-center'>
        <LoginForm onSubmit={onSubmit} apiErrors={apiErrors} isLoading={isLoading} />
        <RevealText />
      </div>
    </div>
  )
}

export default LoginContainer

