import "./Login.css";
import GirlImage from '../../assets/girlFront.jpg';
import LoginForm, { LoginFormType } from "./LoginForm";
import { RevealText } from "./RevealText";
import { useNavigate } from "react-router-dom";
import {  SubmitHandler } from "react-hook-form";
import { useState, useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import { axios as call } from "../../axios";
import { AnimatePresence, motion, useAnimation } from "framer-motion";


const LoginContainer = (): JSX.Element => {


    const navigate = useNavigate();

    const { setIsLoggedIn, setAccessToken, } = useContext(ThemeContext);

    const control = useAnimation()

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

        } catch (error) {
            console.log(error);
        } finally {
            control.start({ filter: 'none' });
        }
    }

    return (
        <div className="login__container">
            <div className="login__left">
                <motion.img
                    className={`login__left_img`}
                    initial={{filter: 'none'}}
                    animate={control}
                    exit={{filter: 'blur(10px)' }}
                    src={GirlImage} alt='girl'
                />
            </div>
            <div className="login__right">
                <LoginForm onSubmit={onSubmit} />
                <RevealText />
            </div>
        </div>
     );
}


export default LoginContainer;