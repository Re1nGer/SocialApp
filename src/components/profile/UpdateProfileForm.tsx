import { SubmitHandler, useForm } from 'react-hook-form'
import './Profile.scss'
import { useRef } from 'react'

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

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleModal = (event: React.MouseEvent<HTMLDialogElement>): void => {
    //setIsModalOpen(false)
    dialogRef.current?.showModal();
  }
  //Need to figure out how to encapsulate this 

  return (
    <dialog data-modal onClick={handleModal} ref={dialogRef}>
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
    </dialog>
  )
}

export default UpdateProfileForm
