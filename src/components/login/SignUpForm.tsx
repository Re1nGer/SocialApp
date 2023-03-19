import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { axios as call } from '../../axios';
import axios from "axios";
import { AxiosError } from 'axios';
 

const SignUpForm = (): JSX.Element => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<AxiosError | null>(null);

    const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const signUp = async (): Promise<void> => {
        try {

            const body = { email, password };

            const { data } = await call.post('/api/v1/account/signup', body);

            setIsLoggedIn(true);

            setAccessToken(data.token);

            call.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            sessionStorage.setItem('isAuthenticated', 'true');

            navigate('/mypage', { replace: true });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error);
            }
            console.log(error);
        }
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await signUp();
    }

    return (
        <div className="form__login">
            <form className="form__wrapper" onSubmit={onSubmit}>
                <h1 className="form__title">Sign Up</h1>
                { error ? <h1 className="form__title">Error !!!</h1> : null }
                <input
                    className="form__email"
                    name="email"
                    placeholder="email"
                    onChange={handleEmailChange}
                />
                <input
                    className="form__password"
                    name="password"
                    type={'password'}
                    onChange={handlePasswordChange}
                    placeholder="password"
                />
                <button className="form__btn" type={'submit'}>Sign Up</button>
                <div className='form__signup-link'>
                    Already have an account ? 
                    <Link color="#fff" to={'/login'}>Log In</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;