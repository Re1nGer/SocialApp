import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import './animations.css';
import "./Login.css";

const LoginForm = () => {

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
                <h1 className="form__title">Login</h1>
                <input className="form__email" placeholder="email" />
                <input className="form__password" type={'password'} placeholder="password"  />
                <button className="form__btn" type={'submit'}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;