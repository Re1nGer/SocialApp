import "./Login.css";
import GirlImage from '../../assets/girlFront.jpg';
import LoginForm from "./LoginForm";

const LoginContainer = () => {
    return (
        <div className="login__container">
            <div className="login__left">
                <img className="login__left_img" src={GirlImage} alt='girl' />
            </div>
            <div className="login__right">
                <LoginForm />
            </div>
        </div>
     );
}

export default LoginContainer;