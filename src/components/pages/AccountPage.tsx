import { useForm } from "react-hook-form";
import { useState } from "react";

const AccountPage = () => {

  const { register, handleSubmit } = useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: any) => {

  }


  return (
    <div className={'h-screen'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-col flex w-full items-center'>
          <label className='my-2 text-white' htmlFor='input-email'>
            Bio
          </label>
          <input
            id='input-email'
            className={`transition-opacity duration-200 p-3 rounded-lg border ${isLoading ? 'opacity-50' : ''}`}
            placeholder='Bio'
            {...register('bio')}
          />
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
  )
}

export default AccountPage