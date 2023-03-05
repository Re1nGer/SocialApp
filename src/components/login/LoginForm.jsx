import './animations.css';
import "./Login.css";

const LoginForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="form__login">
            <form className="form__wrapper" onSubmit={onSubmit}>
                <h1 className="form__title">L<span id='offset'>o</span>gin</h1>
                <input className="form__email" placeholder="email" />
                <input className="form__password" type={'password'} placeholder="password"  />
                <button className="form__btn" type={'submit'}>Login</button>
            </form>
        </div>
     );
}

export default LoginForm;