import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ApiErrorType } from './LoginContainer'

export type LoginFormType = {
  email: string
  password: string
}

const defaultValues: LoginFormType = { email: '', password: '' }

type LoginFormPropType = {
  onSubmit: SubmitHandler<LoginFormType>
  apiErrors: ApiErrorType
}

function LoginForm({ onSubmit, apiErrors }: LoginFormPropType): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormType>({ defaultValues })

  return (
    <div className='flex justify-center items-center h-[60%]'>
      <form className='flex flex-column justify-center' onSubmit={handleSubmit(onSubmit)}>
        <section className='flex flex-col'>
          {apiErrors.message ? <span className='text-red-500'>{apiErrors.message}</span> : ''}
          <section className='flex flex-col justify-center'>
            <h2 className='text-lg my-3'>In Order To Continue You Have To Login</h2>
          </section>
          <div className='flex-col flex'>
            <label className='my-2' htmlFor='input-email'>
              Username
            </label>
            <input
              id='input-email'
              className='p-3 rounded-lg'
              placeholder='Email'
              {...register('email', { required: 'Email Is Required' })}
            />
            {errors.email ? (
              <span className='text-red-500'>{errors.email.message}</span>
            ) : null}
          </div>
          <div className='flex flex-col'>
            <label className='my-2' htmlFor='input-password'>
              Password
            </label>
            <input
              id='input-password'
              className='p-3 rounded-lg focus:border-0'
              type='password'
              placeholder='Password'
              {...register('password', { required: 'Password Is Required' })}
            />
            {errors.password ? (
              <span className='text-red-500'>{errors.password.message}</span>
            ) : null}
          </div>
          <div className='text-sm'>
            Don`&apos;t have an account yet ? <Link to='/signup'>Sign Up</Link>
          </div>
          <div className='flex justify-center my-4'>
            <button className='rounded-lg p-3 grow text-white bg-black w-75 hover:bg-slate-800 ease-in-out duration-200' type='submit'>
              Login
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}

export default LoginForm
