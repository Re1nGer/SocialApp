import PolaroidMenu from './PolaroidMenu'
import RevealText from './RevealText'
import SignUpForm from './SignUpForm'

const SignUpFormContainer = (): JSX.Element => {
  return (
    <div className='flex min-h-[800px] sm:min-h-[1150px]'>
      <div className='grow-[.5] hidden bg-black sm:flex justify-center'>
        <PolaroidMenu />
      </div>
      <div className='flex bg-white sm:grow-[.5] grow-[1] min-h-[600px] sm:min-h-1150px items-center flex-col'>
        <RevealText />
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpFormContainer
