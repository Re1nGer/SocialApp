import './Login.css'

import { RevealText } from './RevealText'
import SignUpForm from './SignUpForm'

function SignUpFormContainer(): JSX.Element {
  return (
    <div className='login__container'>
      <div className='login__left'>
        {/*         <img className='login__left_img' src={GirlImage} alt='girl' /> */}
      </div>
      <div className='login__right'>
        <SignUpForm />
        <RevealText />
      </div>
    </div>
  )
}

export default SignUpFormContainer
