import './Profile.scss'
import { Icon } from '@iconify/react'
import CircleLoader from '../loader/CircleLoader'
import UpdateProfileForm from './UpdateProfileForm'
import { IProfileInfo } from './MyProfileContainer'
import { ChangeEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ProfileInfoPropType = {
  updateProfileInfo: () => void
  updateProfileImage: () => void
  handleProfileImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  handleProfileModal: () => void
  handleCancelUpload: () => void
  profileInfo: IProfileInfo | null
  profileImageSrc: string | null
  profileImage: Blob | null
  isLoading: boolean
  isProfileModalOpen: boolean
}

function MyProfileInfo({
  updateProfileInfo,
  updateProfileImage,
  handleProfileImageUpload,
  handleProfileModal,
  handleCancelUpload,
  profileInfo,
  profileImageSrc,
  profileImage,
  isLoading,
  isProfileModalOpen,
}: ProfileInfoPropType) {
  return (
    <>
      {isProfileModalOpen ? <UpdateProfileForm onSubmit={updateProfileInfo} /> : null}
      <div className='profile-info__container'>
        <div className='profile-info__inner'>
          <div className='profile-info_user-container'>
            <div className='profile-info__image-container'>
              {isLoading ? (
                <CircleLoader />
              ) : (
                <AnimatePresence>
                  <motion.img
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className='profile-info__image'
                    src={profileImageSrc || profileInfo?.userImageSrc}
                    alt='profile'
                  />
                </AnimatePresence>
              )}

              <label
                className='profile-info__file-input_label'
                aria-label='file'
                htmlFor='file'
                id='file-id'
              >
                {profileImage ? (
                  <div>
                    <button onClick={updateProfileImage}>Upload</button>
                    <button onClick={handleCancelUpload}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <label htmlFor='postfile' id='postfilelabel'>
                      <button className='profile-info__file-input_btn'>
                        <input
                          style={{ display: 'none' }}
                          aria-labelledby='file-id'
                          id='file'
                          accept='image/*'
                          type='file'
                          onChange={handleProfileImageUpload}
                        />
                        Upload from computer
                      </button>
                    </label>
                  </>
                )}
              </label>
            </div>

            <div className='profile-info__details'>
              <h1 className='profile-info__username'>{profileInfo?.username}</h1>
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
          <div className='profile-info_user-edit'>
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
