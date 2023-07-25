import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import TextInputField from "../inputField/TextInputField";

const AccountPage = () => {

  const form = useForm();

  const { handleSubmit } = form;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: any) => {};

  return (
    <FormProvider {...form}>
      <div className={'h-screen'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'max-w-[1150px] mx-auto'}>
          <div className='flex-col flex w-full items-center gap-2'>
            <TextInputField name={'username'} placeholder={'Username'} disabled={isLoading} />
            <TextInputField name={'bio'} placeholder={'Bio'} disabled={isLoading} />
          </div>
          <div className='flex justify-center my-4'>
            <button
              className={`rounded-lg p-3 text-white shadow bg-black border min-w-[250px] hover:bg-slate-800 ease-in-out duration-200 ${isLoading ? 'opacity-50' : ''}`}
              disabled={isLoading}
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>

    </FormProvider>
  )
}

export default AccountPage