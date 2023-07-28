import LoginForm from './LoginForm'
import RevealText from './RevealText'
import PolaroidMenu from './PolaroidMenu'

const LoginContainer = (): JSX.Element => {
  return (
    <div className='flex min-h-[800px] sm:min-h-[1150px]'>
      <div className='grow-[.5] sm:flex justify-center h-full hidden'>
        <PolaroidMenu />
      </div>
      <div className='sm:grow-[.5] grow-[1] bg-white flex flex-col min-h-[600px] sm:min-h-[1150px] items-center'>
        <RevealText />
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginContainer

