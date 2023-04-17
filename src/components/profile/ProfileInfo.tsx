import './Profile.scss'
import { Icon } from '@iconify/react'
import { ChangeEvent, useState, useEffect } from 'react'
import { axios } from '../../axios'
import CircleLoader from '../loader/CircleLoader'
import UpdateProfileForm from './UpdateProfileForm'

interface IProfileInfo {
  username: string
  userImageSrc: string | undefined
  lowResUserImageSrc: string
}

function ProfileInfo() {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo | null>(null)

  const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null)

  const [profileImage, setProfileImage] = useState<Blob | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

  const handleProfileModal = (): void => {
    setIsProfileModalOpen((prevstate) => !prevstate)
  }

  const handleProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setProfileImageSrc(URL.createObjectURL(event.target.files[0]))
    setProfileImage(event.target.files[0])
  }

  const handleCancelUpload = () => {
    setProfileImage(null)
    setProfileImageSrc('')
  }

  const updateProfileImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', profileImage!)
      await axios.put('/api/v1/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setProfileImage(null)
      fetchUserData()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/v1/user')
      setProfileInfo(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfileInfo = async () => {}

  useEffect(() => {
    fetchUserData()
  }, [])

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
                <img
                  className='profile-info__image'
                  src={profileImageSrc || profileInfo?.userImageSrc}
                  alt='profile'
                />
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
                    <input
                      style={{ display: 'none' }}
                      aria-labelledby='file-id'
                      id='file'
                      accept='image/*'
                      type='file'
                      onChange={handleProfileImageUpload}
                    />
                    <label htmlFor='postfile' id='postfilelabel'>
                      <span className='profile-info__file-input_btn'>Upload from computer</span>
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

export default ProfileInfo
