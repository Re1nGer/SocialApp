import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { axios } from '../../axios';
import './animations.css';
import "./Login.css";

const LoginForm = () => {

    const navigate = useNavigate();

    const { setIsLoggedIn, setAccessToken, } = useContext(ThemeContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const signIn = async () => {

        try {

            const body = { email, password };

            const { data } = await axios.post('/api/v1/account/signin', body);

            setAccessToken(data.token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setIsLoggedIn(true);

            sessionStorage.setItem('isAuthenticated', 'true');

            navigate('/mypage', { replace: true });

        } catch (error) {
            console.log(error);
            setError(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await signIn();
    }

    return (
        <div className="form__login">
            <form className="form__wrapper" onSubmit={onSubmit}>
                <h1 className="form__title">Login</h1>
                { error ? <h4 className='form__title'>Error !!!</h4> : null }
                <input
                    className="form__email"
                    placeholder="email"
                    onChange={handleEmailChange}
                />
                <input
                    className="form__password"
                    type={'password'}
                    placeholder="password"
                    onChange={handlePasswordChange}
                />
                <button className="form__btn" type={'submit'}>Login</button>
                <div className='form__signup-link'>
                    Don't have an account yet ? 
                    <Link to={'/signup'}>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;