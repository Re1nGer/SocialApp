import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Icon } from '@iconify/react'
import IAPIError from "../../types/IAPIError";
import WarframeLoader from "../loader/WarframeLoader";
import { motion } from 'framer-motion'
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { axios as call } from '../../axios';
import axios from 'axios';
import IError from "../../types/IError";
import TextInputField from "../inputField/TextInputField";
import { signInWithGoogle } from "../../utils/firebase";

export type LoginFormType = {
  email: string
  password: string
}

const defaultValues: LoginFormType = { email: '', password: '' };

const LoginForm = (): JSX.Element => {

  const form = useForm<LoginFormType>({ defaultValues });

  const { handleSubmit } = form;

  const navigate = useNavigate()

  const { setIsLoggedIn, setAccessToken, setStreamToken } = useContext(ThemeContext)

  const [apiErrors, setApiErrors] = useState<IAPIError>({ message: '', type: '' });

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formatErrors = (error: IError) => {
    if (error?.message === "INVALID_PASSWORD")
      setApiErrors({ message: "Invalid Password", type: "password" })
    else if (error?.message === "EMAIL_NOT_FOUND")
      setApiErrors({ message: "Email Not Found", type: "email" })
    else setApiErrors({ message: "Something Went Wrong", type: "unknown" })
  };

  const onSubmit: SubmitHandler<LoginFormType> = async ({ email, password }, _): Promise<void> => {
    try {
      setIsLoading(true);
      const body = { email, password };
      const { data } = await call.post('/api/v1/account/signin', body);
      setAccessToken(data.token);
      setStreamToken(data.streamToken);
      call.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      setIsLoggedIn(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/feed', { replace: true });

    } catch (error) {
      if (axios.isAxiosError(error))
        formatErrors(error?.response?.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await signInWithGoogle();

      const token = await response?.user.getIdToken();

      const { data } =  await call.get(`/api/v1/google/signin/${token}`);

      setAccessToken(data.token);
      setStreamToken(data.streamToken);
      call.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      setIsLoggedIn(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/feed', { replace: true });


    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <div className='flex justify-center items-end sm:items-center h-[65%] sm:h-[50%]'>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-column justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className='flex flex-col'>
            <h2 className='text-lg my-3 text-center font-semibold'>Log In</h2>
            <div className={'flex flex-col gap-2'}>
              <TextInputField
                required
                type={'email'}
                name={'email'}
                placeholder={'Email'}
                disabled={isLoading}
                id={'input-email'}
                label={'Email'}
                apiError={apiErrors}
              />

              <TextInputField
                required
                name={'password'}
                placeholder={'Password'}
                disabled={isLoading}
                type={'password'}
                id={'input-password'}
                label={'Password'}
                apiError={apiErrors}
              />
            </div>

            <div className='flex justify-center my-4'>
              <button
                className={`rounded-lg p-3 grow text-white bg-black w-75 hover:bg-slate-800 ease-in-out duration-200 ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}
                type='submit'
              >
                Login
              </button>
            </div>
            {isLoading ? <WarframeLoader /> : null}
            <div className='text-sm'>
              Don`&apos;t have an account yet? {''} <Link to='/signup'>Sign Up</Link>
            </div>
            <section className='text-center my-2'>OR</section>
            <section className='flex justify-center my-3'>
              <button type={'button'} className='bg-white p-2 text-black flex items-center gap-2 border rounded-lg' onClick={handleGoogleSignIn}>
                <Icon icon="uit:google" />
                Log In With Google
              </button>
            </section>
            {apiErrors.type === "unknown" && <small className='text-red-500'>{apiErrors.message}</small>}
          </section>
        </motion.form>
      </div>
    </FormProvider>
  )
}

export default LoginForm
