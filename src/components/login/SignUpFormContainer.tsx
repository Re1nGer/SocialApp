import PolaroidMenu from './PolaroidMenu'
import { RevealText } from './RevealText'
import SignUpForm from './SignUpForm'

function SignUpFormContainer(): JSX.Element {
  return (
    <div className='flex'>
      <div className='grow-[.5] bg-black min-h-[2000px] flex justify-center'>
        <PolaroidMenu />
      </div>
      <div className='flex justify-center bg-white grow-[.5] flex-col items-center'>
        <SignUpForm />
        <RevealText />
      </div>
    </div>
  )
}

export default SignUpFormContainer
