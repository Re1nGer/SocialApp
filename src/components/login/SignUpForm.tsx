import { useNavigate, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { ThemeContext } from '../contexts/ThemeContext'
import { axios as call } from '../../axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import WarframeLoader from "../loader/WarframeLoader";
import { motion } from "framer-motion";

type SignUpFormType = {
  email: string
  password: string
}

const SignUpForm = (): JSX.Element => {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [error, setError] = useState<AxiosError | null>(null)

  const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext)

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormType>()

  const signUp: SubmitHandler<SignUpFormType> = async (body, _): Promise<void> => {
    try {

      setIsLoading(true)

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
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-[50%]'>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col gap-3'
        onSubmit={handleSubmit(signUp)}
      >
        <h1 className='text-lg text-center font-semibold'>Sign Up</h1>
        {error ? <h1 className='text-red-500'>Error !!!</h1> : null}
        <div className='flex flex-col'>
          <label className='my-2' htmlFor='email'>
            Username
          </label>
          <input
            id='email'
            type={'email'}
            className={`transition-opacity duration-200 p-3 rounded-lg border ${isLoading ? 'opacity-50' : ''}`}
            placeholder='Email'
            { ...register('email', { required: "Email is required" }) }
          />
          { errors?.email && (<small className='text-red-500'>{errors.email.message}</small>) }
        </div>
        <div className='flex flex-col'>
          <label className='my-2' htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            className={`transition-opacity duration-200 p-3 rounded-lg border ${isLoading ? 'opacity-50' : ''}`}
            type='password'
            placeholder='Password'
            {...register('password', { required: "Password cannot be empty" })}
          />
          { errors?.password && (<small className='text-red-500'>{errors.password.message}</small>) }
        </div>
        { isLoading && <WarframeLoader /> }
        <button className={`bg-black text-white p-3 rounded-lg ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading} type='submit'>
          Sign Up
        </button>
        <div className='form__signup-link'>
          Already have an account ?  <Link className={'text-black'} to='/login'>Log In</Link>
        </div>
      </motion.form>
    </div>
  )
}

export default SignUpForm
