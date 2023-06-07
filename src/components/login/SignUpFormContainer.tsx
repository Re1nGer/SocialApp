import PolaroidMenu from './PolaroidMenu'
import { RevealText } from './RevealText'
import SignUpForm from './SignUpForm'

function SignUpFormContainer(): JSX.Element {
  return (
    <div className='flex min-h-[2000px]'>
      <div className='grow-[.5] bg-black flex justify-center'>
        <PolaroidMenu />
      </div>
      <div className='flex bg-white grow-[.5] min-h-[2000px] items-center flex-col'>
        <SignUpForm />
        <RevealText />
      </div>
    </div>
  )
}

export default SignUpFormContainer
