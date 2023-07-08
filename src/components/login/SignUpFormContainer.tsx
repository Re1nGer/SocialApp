import PolaroidMenu from './PolaroidMenu'
import RevealText from './RevealText'
import SignUpForm from './SignUpForm'

const SignUpFormContainer = (): JSX.Element => {
  return (
    <div className='flex'>
      <div className='grow-[.5] hidden bg-black sm:flex justify-center min-h-[1500px]'>
        <PolaroidMenu />
      </div>
      <div className='flex bg-white sm:grow-[.5] grow-[1] min-h-[1500px] items-center flex-col'>
        <SignUpForm />
        <RevealText />
      </div>
    </div>
  )
}

export default SignUpFormContainer
