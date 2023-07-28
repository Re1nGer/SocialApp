import { FormProvider, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import TextInputField from "../inputField/TextInputField";
import { axios } from "../../axios";
import { ThemeContext } from "../../contexts/ThemeContext";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";

const AccountPage = () => {

  const form = useForm();

  const { handleSubmit } = form;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setProfileInfo, profileInfo: { username, intro } } = useContext(ThemeContext);
  const onSubmit = async (data: any) => {
    const { username, intro  } = data;
    try {
      setIsLoading(true);
      const { data } = await axios.put("/api/v1/user", { username, intro });
      setProfileInfo(prevState => ({...prevState, username: data.username, intro: data.intro }))
      toast("Successfully Updated Account", { position: "bottom-right" })
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={'h-screen'}>
          <form onSubmit={handleSubmit(onSubmit)} className={'max-w-[800px] max-h-[600px] mx-auto h-full flex items-center flex-col justify-center gap-3'}>
            <div>
              <h1 className={'text-white text-3xl my-5'}>Account Settings</h1>
            </div>
            <div className='flex-col flex w-full items-center justify-center gap-2'>
              <TextInputField name={'username'} required label={'Username'} labelClassName={'text-white'} placeholder={'Username'} disabled={isLoading} defaultValue={username} />
              <TextInputField maxLength={150} name={'intro'} label={'Intro'} labelClassName={'text-white'} placeholder={'Intro'} disabled={isLoading} defaultValue={intro} />
            </div>
            <div className='flex justify-center my-4'>
              <button
                className={`rounded-lg p-3 text-white shadow bg-black border min-w-[200px] hover:bg-slate-800 ease-in-out duration-200 ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </FormProvider>
      <Toaster />
    </>
  )
}

export default AccountPage