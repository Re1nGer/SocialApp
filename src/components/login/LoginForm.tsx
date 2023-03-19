import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { FormEncType, Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import  { AxiosError } from 'axios';
import { axios as call } from '../../axios';
import axios from 'axios';
import './animations.css';
import "./Login.css";

const LoginForm = (): JSX.Element => {

    const navigate = useNavigate();

    const { setIsLoggedIn, setAccessToken, } = useContext(ThemeContext);

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<AxiosError | null>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const signIn = async (): Promise<void> => {

        try {

            const body = { email, password };

            const { data } = await call.post('/api/v1/account/signin', body);

            setAccessToken(data.token);

            call.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setIsLoggedIn(true);

            sessionStorage.setItem('isAuthenticated', 'true');

            navigate('/mypage', { replace: true });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error);
            }
            console.log(error);
            //setError(error);
        }
    }

    const onSubmit = async (e: FormEvent) => {
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