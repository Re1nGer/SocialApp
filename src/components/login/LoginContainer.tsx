import "./Login.css";
import GirlImage from '../../assets/girlFront.jpg';
import LoginForm, { LoginFormType } from "./LoginForm";
import { RevealText } from "./RevealText";
import { useNavigate } from "react-router-dom";
import {  SubmitHandler } from "react-hook-form";
import { useContext, useState } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import { axios as call } from "../../axios";
import { useAnimation } from "framer-motion";
import LoginImage from "./LoginImage";

export type ApiErrorType = {
    message: string
};


const LoginContainer = (): JSX.Element => {

    const navigate = useNavigate();

    const { setIsLoggedIn, setAccessToken, } = useContext(ThemeContext);

    const control = useAnimation()

    const [apiErrors, setApiErrors] = useState<ApiErrorType>({ message: "" });

    const onSubmit: SubmitHandler<LoginFormType>
     = async ({ email, password }, _): Promise<void> => {

        try {
            control.start({ filter: 'blur(10px)' });

            const body = { email, password };

            const { data } = await call.post('/api/v1/account/signin', body);

            setAccessToken(data.token);

            call.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setIsLoggedIn(true);

            sessionStorage.setItem('isAuthenticated', 'true');

            navigate('/mypage', { replace: true });

        } catch (error : any) {
            console.log(error);

            setApiErrors(error.response.data.error);
        } finally {
            control.start({ filter: 'none' });
        }
    }

    return (
        <div className="login__container">
            <LoginImage />
            <div className="login__right">
                <LoginForm onSubmit={onSubmit} apiErrors={apiErrors} />
                <RevealText />
            </div>
        </div>
     );
}


export default LoginContainer;