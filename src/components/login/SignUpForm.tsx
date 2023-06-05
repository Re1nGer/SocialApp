import { useNavigate, Link } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios as call } from '../../axios'

function SignUpForm(): JSX.Element {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState<AxiosError | null>(null)

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const signUp = async (): Promise<void> => {
    try {
      const body = { email, password }

      const { data } = await call.post('/api/v1/account/signup', body)

      setIsLoggedIn(true)

      setAccessToken(data.token)

      call.defaults.headers.common.Authorization = `Bearer ${data.token}`

      sessionStorage.setItem('isAuthenticated', 'true')

      navigate('/mypage', { replace: true })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error)
      }
      console.log(error)
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signUp()
  }

  return (
    <div className='flex justify-center h-[50%]'>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <h1 className='text-lg text-center'>Sign Up</h1>
        {error ? <h1 className='text-red-500'>Error !!!</h1> : null}
        <input
          className='p-3 rounded-lg'
          name='email'
          placeholder='email'
          onChange={handleEmailChange}
        />
        <input
          className='p-3 rounded-lg'
          name='password'
          type='password'
          onChange={handlePasswordChange}
          placeholder='password'
        />
        <button className='bg-black text-white p-3 rounded-lg' type='submit'>
          Sign Up
        </button>
        <div className='form__signup-link'>
          Already have an account ?
          <Link color='#fff' to='/login'>
            Log In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
