import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";


const SignUpForm = () => {
    const navigate = useNavigate();

    const { setIsLoggedIn } = useContext(ThemeContext);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/mypage');
    }

    return (
        <div className="form__login">
            <form className="form__wrapper" onSubmit={onSubmit}>
                <h1 className="form__title">Sign Up</h1>
                <input className="form__email" placeholder="email" />
                <input className="form__password" type={'password'} placeholder="password"  />
                <button className="form__btn" type={'submit'}>Sign Up</button>
                <div className='form__signup-link'>
                    Already have an account ? 
                    <Link color="white" to={'/login'}>Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
