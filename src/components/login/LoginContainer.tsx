import LoginForm from './LoginForm'
import RevealText from './RevealText'
import PolaroidMenu from './PolaroidMenu'

export type ApiErrorType = {
  message: string
}

const LoginContainer = (): JSX.Element => {
  return (
    <div className='flex min-h-[1500px]'>
      <div className='grow-[.5] flex justify-center h-full'>
        <PolaroidMenu />
      </div>
      <div className='grow-[.5] bg-white flex flex-col min-h-[1500px] items-center'>
        <LoginForm />
        <RevealText />
      </div>
    </div>
  )
}

export default LoginContainer

