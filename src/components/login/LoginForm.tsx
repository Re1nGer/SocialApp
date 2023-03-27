import { Link } from 'react-router-dom';
import './animations.css';
import "./Login.css";
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApiErrorType } from './LoginContainer';

export type LoginFormType = {
    email: string,
    password: string
};

const defaultValues: LoginFormType = { email: '', password: '' };

type LoginFormPropType = {
    onSubmit: SubmitHandler<LoginFormType>,
    apiErrors: ApiErrorType
}

const LoginForm = ({ onSubmit, apiErrors }: LoginFormPropType): JSX.Element => {

    const { register, formState: { errors }, handleSubmit } = useForm<LoginFormType>({ defaultValues });

    return (
        <div className="form__login">
            <form className="form__wrapper" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form__title">Account Login</h1>
                { apiErrors.message ?
                 <span className='form__error'>{apiErrors.message}</span> : "" }
                <span></span>
                <section className='form__container'>
                    <div className='form__email-container'>
                        <label
                            className='form__email-label'
                            htmlFor='input-email'>Username</label>
                        <input
                            id='input-email'
                            className="form__email"
                            placeholder="Email"
                            {...register('email', { required: "Email Is Required" })}
                        />
                        { errors['email'] ? (
                            <span className='form__error'>{errors['email'].message}</span>
                        ) : null }
                    </div>
                    <div className='form__password-container'>
                        <label
                            className='form__password-label'
                            htmlFor='input-password'>Password</label>
                        <input
                            id='input-password'
                            className="form__password"
                            type={'password'}
                            placeholder="Password"
                            {...register('password', { required: "Password Is Required" })}
                        />
                        { errors['password'] ? (
                            <span className='form__error'>{errors['password'].message}</span>
                        ) : null }
                    </div>
                    <div className='form__signup-link'>
                        Don't have an account yet ? {" "}
                        <Link to={'/signup'}>Sign Up</Link>
                    </div>
                    <button className="form__btn" type={'submit'}>Login</button>
                </section>
            </form>
        </div>
    );
}

export default LoginForm;