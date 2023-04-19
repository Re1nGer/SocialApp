import { Link } from 'react-router-dom'
import './animations.css'
import './form.scss'
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
    <div className='form-login'>
      <form className='form-login__wrapper' onSubmit={handleSubmit(onSubmit)}>
        {apiErrors.message ? <span className='form-login__error'>{apiErrors.message}</span> : ''}
        <span />
        <section className='form-login__container'>
          <div className='form-login__email-container'>
            <label className='form-login__email-label' htmlFor='input-email'>
              Username
            </label>
            <input
              id='input-email'
              className='form-login__email'
              placeholder='Email'
              {...register('email', { required: 'Email Is Required' })}
            />
            {errors.email ? (
              <span className='form-login__error'>{errors.email.message}</span>
            ) : null}
          </div>
          <div className='form-login__password-container'>
            <label className='form-login__password-label' htmlFor='input-password'>
              Password
            </label>
            <input
              id='input-password'
              className='form-login__password'
              type='password'
              placeholder='Password'
              {...register('password', { required: 'Password Is Required' })}
            />
            {errors.password ? (
              <span className='form-login__error'>{errors.password.message}</span>
            ) : null}
          </div>
          <div className='form-login__signup-link'>
            Don`&apos;t have an account yet ? <Link to='/signup'>Sign Up</Link>
          </div>
          <div className='form-login__btn-container'>
            <button className='form-login__submit' type='submit'>
              Login
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}

export default LoginForm
