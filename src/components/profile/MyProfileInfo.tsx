import { Icon } from '@iconify/react'
import CircleLoader from '../loader/CircleLoader'
import UpdateProfileForm from './UpdateProfileForm'
import { IProfileInfo } from './MyProfileContainer'
import { ChangeEvent, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ProfileInfoPropType = {
  updateProfileInfo: () => void
  updateProfileImage: () => void
  handleProfileImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  handleProfileModal: () => void
  handleCancelUpload: () => void
  setIsProfileModalOpen: (isModalOpen: boolean) => void
  profileInfo: IProfileInfo | null
  profileImageSrc: string | null
  profileImage: Blob | null
  isLoading: boolean
  isProfileModalOpen: boolean
}

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const MyProfileInfo = ({
  updateProfileInfo,
  updateProfileImage,
  handleProfileImageUpload,
  handleProfileModal,
  handleCancelUpload,
  setIsProfileModalOpen,
  profileInfo,
  profileImageSrc,
  profileImage,
  isLoading,
  isProfileModalOpen,
}: ProfileInfoPropType) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {isProfileModalOpen ? (
        <UpdateProfileForm onSubmit={updateProfileInfo} setIsModalOpen={setIsProfileModalOpen} />
      ) : null}
      <div className='max-w-[1150px] w-full mx-auto'>
        <div className='flex justify-start my-2'>
          <div className='flex gap-3 grow-[.5]'>
            <div className='flex flex-col'>
              {isLoading ? (
                <CircleLoader />
              ) : (
                <AnimatePresence>
                  <motion.img
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                    height={'300px'}
                    width={'300px'}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='object-contain'
                    src={profileImageSrc || profileInfo?.lowResImageLink || defaultUserImg}
                    alt='profile'
                  />
                </AnimatePresence>
              )}

              {profileImage ? (
                <div className='flex g-2'>
                  <button onClick={updateProfileImage} className='bg-white'>Upload</button>
                  <button onClick={handleCancelUpload} className='bg-white'>Cancel</button>
                </div>
              ) : (
                <>
                  <input
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    aria-labelledby='file-id'
                    id='file'
                    accept='image/*'
                    type='file'
                    onChange={handleProfileImageUpload}
                  />
                  <button className='border border-white bg-black text-white p-2 my-2' onClick={() => fileInputRef.current!.click()}>
                    Upload from computer
                  </button>
                </>
              )}
            </div>

            <div className='flex flex-col'>
              <h1 className='text-white text-3xl'>{profileInfo?.username}</h1>
              <p className='profile-info__bio'>
                Welcome to my profile ♡
                <br />
                Follow me plz
                <br />
                <a className='profile-info__link' href='#'>
                  @Otheruser
                </a>
              </p>
            </div>
          </div>
          <div className='cursor-pointer'>
            <Icon
              icon='material-symbols:edit'
              fontSize='25px'
              color='#fff'
              onClick={handleProfileModal}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfileInfo
