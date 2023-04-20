import { SubmitHandler, useForm } from 'react-hook-form'
import './Profile.scss'

export type ProfileFormType = {
  username: string
  bio: string
}

const defaultValues: ProfileFormType = { username: '', bio: '' }

type LoginFormPropType = {
  onSubmit: SubmitHandler<ProfileFormType>
  setIsModalOpen: (isModalOpen: boolean) => void
}
const UpdateProfileForm = ({ onSubmit, setIsModalOpen }: LoginFormPropType) => {
  const { register, handleSubmit } = useForm<ProfileFormType>({ defaultValues })

  const handleModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='profile__form-overlay' onClick={handleModal}></div>
      <form className='profile__form' onSubmit={handleSubmit(onSubmit)}>
        <h4 className='profile__form-title'>Update Profile</h4>
        <div className='profile__form-username_wrapper'>
          <label className='profile__form_username-label' htmlFor='username'>
            Username
          </label>
          <input id='username' className='profile__form-username' {...register('username')} />
        </div>
        <div className='profile__form-bio_wrapper'>
          <label className='profile__form_bio-label' htmlFor='bio'>
            Bio
          </label>
          <input id='bio' className='profile__form-bio' {...register('bio')} />
        </div>
        <button className='profile__form-submit' type='submit'>
          Update
        </button>
      </form>
    </>
  )
}

export default UpdateProfileForm
