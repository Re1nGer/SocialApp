import "./Login.css";
import GirlImage from '../../assets/girlFront.jpg';
import LoginForm from "./LoginForm";
import { useEffect, useRef } from "react";

const LoginContainer = () => {

    return (
        <div className="login__container">
            <div className="login__left">
                <img className="login__left_img" src={GirlImage} alt='girl' />
            </div>
            <div className="login__right">
                <LoginForm />
                <RevealText />
            </div>
        </div>
     );
}


const RevealText = () => {

    const revealTextRef = useRef(null);

    useEffect(() => {
        const revealTextElement = revealTextRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealTextElement.classList.add('text-focus-in');
                } else revealTextElement.classList.remove('text-focus-in')
            })
        }, { threshold: 1, rootMargin: '10px' });

        observer.observe(revealTextElement);

        return () => observer.unobserve(revealTextElement);

    },[])

    return <div className="login__right_reveal">
        <h1 className="login__right_reveal-text" ref={revealTextRef}>Destiny Arrives All The Same</h1>
    </div>
}

export default LoginContainer;