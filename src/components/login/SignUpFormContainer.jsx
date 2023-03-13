import "./Login.css";
import "./Login.css";
import GirlImage from '../../assets/girlFront.jpg';
import { RevealText } from "./RevealText";
import SignUpForm from './SignUpForm';

const SignUpFormContainer = () => {
    return (
        <div className="login__container">
            <div className="login__left">
                <img className="login__left_img" src={GirlImage} alt='girl' />
            </div>
            <div className="login__right">
                <SignUpForm />
                <RevealText />
            </div>
        </div>
    );
}


export default SignUpFormContainer;