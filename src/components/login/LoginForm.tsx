import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Icon } from '@iconify/react'
import { ApiErrorType } from './LoginContainer'
import WarframeLoader from "../loader/WarframeLoader";
import { motion } from 'framer-motion'

export type LoginFormType = {
  email: string
  password: string
}

const defaultValues: LoginFormType = { email: '', password: '' }

type LoginFormPropType = {
  onSubmit: SubmitHandler<LoginFormType>
  apiErrors: ApiErrorType
  isLoading: boolean
}

const LoginForm = ({ onSubmit, apiErrors, isLoading }: LoginFormPropType): JSX.Element => {

  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormType>({ defaultValues })

  return (
    <div className='flex justify-center items-center h-[50%]'>
      <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-column justify-center'
          onSubmit={handleSubmit(onSubmit)}
      >
        <section className='flex flex-col'>
          <section className='flex flex-col justify-center'>
            <h2 className='text-lg my-3 text-center font-semibold'>Log In</h2>
          </section>
          <div className='flex-col flex'>
            <label className='my-2' htmlFor='input-email'>
              Username
            </label>
            <input
              id='input-email'
              className={`transition-opacity duration-200 p-3 rounded-lg border ${isLoading ? 'opacity-50' : ''}`}
              placeholder='Email'
              type={'email'}
              {...register('email', { required: 'Email Is Required' })}
            />
            {errors?.email && ( <small className='text-red-500'>{errors.email.message}</small>) }
            {apiErrors.message === "EMAIL_NOT_FOUND" && <span className='text-red-500'>{apiErrors.message}</span>}
          </div>
          <div className='flex flex-col'>
            <label className='my-2' htmlFor='input-password'>
              Password
            </label>
            <input
              id='input-password'
              className={`transition-opacity duration-200 p-3 rounded-lg focus:outline-0 border ${isLoading ? 'opacity-50' : ''}`}
              type={'password'}
              placeholder='Password'
              {...register('password', { required: 'Password Is Required' })}
            />
            {errors?.password && ( <small className='text-red-500'>{errors.password.message}</small>) }
            {apiErrors.message === "INVALID_PASSWORD" && <span className='text-red-500'>{apiErrors.message}</span>}
          </div>
          <div className='flex justify-center my-4'>
            <button
              className={`rounded-lg p-3 grow text-white bg-black w-75 hover:bg-slate-800 ease-in-out duration-200 ${isLoading ? 'opacity-50' : ''}`}
              disabled={isLoading}
              type='submit'
            >
              Login
            </button>
          </div>
          {isLoading ? <WarframeLoader /> : null}
          <div className='text-sm'>
            Don`&apos;t have an account yet? {''} <Link to='/signup'>Sign Up</Link>
          </div>
          <section className='text-center my-2'>OR</section>
          <section className='flex justify-center my-3'>
            <button className='bg-white p-2 text-black flex items-center gap-2 border rounded-lg'>
              <Icon icon="uit:google" />
              Sign In With Google
            </button>
          </section>
        </section>
      </motion.form>
    </div>
  )
}

export default LoginForm
