import { useNavigate, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { ThemeContext } from '../../contexts/ThemeContext'
import { axios as call } from '../../axios'
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import WarframeLoader from "../loader/WarframeLoader";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import TextInputField from "../InputField/TextInputField";
import IAPIError from "../../types/IAPIError";
import IError from "../../types/IError";

type SignUpFormType = {
  email: string
  password: string
}

const defaultValues: SignUpFormType = { email: '', password: '' };

const SignUpForm = (): JSX.Element => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsLoggedIn, setAccessToken, setStreamToken } = useContext(ThemeContext);

  const form = useForm<SignUpFormType>({ defaultValues });

  const { handleSubmit} = form;

  const [apiErrors, setApiErrors] = useState<IAPIError>({ message: '', type: '' });
  const formatErrors = (error: IError) => {
    if (error.message === "INVALID_PASSWORD")
      setApiErrors({ message: "Invalid Password", type: "password" })
    else if (error.message === "EMAIL_NOT_FOUND")
      setApiErrors({ message: "Email Not Found", type: "email" })
    else setApiErrors({ message: "Something Went Wrong", type: "unknown" })
  };
  const signUp: SubmitHandler<SignUpFormType> = async (body, _): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await call.post('/api/v1/account/signup', body);
      setIsLoggedIn(true);
      setAccessToken(data.token);
      setStreamToken(data.streamToken);
      call.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/mypage', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        formatErrors(error?.response?.data.error);
      }
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <div className='flex justify-center items-center h-[50%]'>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col gap-3'
          onSubmit={handleSubmit(signUp)}
        >
          <h1 className='text-lg text-center font-semibold'>Sign Up</h1>
          <TextInputField
            required
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

          { isLoading && <WarframeLoader /> }
          <button className={`bg-black text-white p-3 rounded-lg ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading} type='submit'>
            Sign Up
          </button>
          <div className='text-sm'>
            Already have an account ?  <Link className={'text-black'} to='/login'>Log In</Link>
          </div>
          <section className='text-center my-2'>OR</section>
          <section className='flex justify-center my-3'>
            <button className='bg-white p-2 text-black flex items-center gap-2 border rounded-lg'>
              <Icon icon="uit:google" />
              Sign Up With Google
            </button>
          </section>
        </motion.form>
      </div>

    </FormProvider>
  )
}

export default SignUpForm
