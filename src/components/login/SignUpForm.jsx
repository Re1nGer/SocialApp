import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { axios } from '../../axios';


const SignUpForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const { setIsLoggedIn, setAccessToken } = useContext(ThemeContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const signUp = async () => {
        try {

            const body = { email, password };

            const { data } = await axios.post('/api/v1/account/signup', body);

            setIsLoggedIn(true);

            setAccessToken(data.token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            sessionStorage.setItem('isAuthenticated', 'true');

            navigate('/mypage');

        } catch (error) {
            console.log(error);
            setError(error.response.error);
        }
    }

    const onSubmit = async (e) => {
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
