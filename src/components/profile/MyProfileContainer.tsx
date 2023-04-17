import { ChangeEvent, useEffect, useState } from 'react'
import { axios } from '../../axios'
import MyProfileInfo from './MyProfileInfo'

export interface IProfileInfo {
  username: string
  userImageSrc: string | undefined
  lowResUserImageSrc: string
}

function MyProfilePageContainer() {
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
    <MyProfileInfo
      profileInfo={profileInfo}
      profileImageSrc={profileImageSrc}
      profileImage={profileImage}
      isLoading={isLoading}
      isProfileModalOpen={isProfileModalOpen}
      updateProfileImage={updateProfileImage}
      handleCancelUpload={handleCancelUpload}
      handleProfileModal={handleProfileModal}
      handleProfileImageUpload={handleProfileImageUpload}
      updateProfileInfo={updateProfileInfo}
    />
  )
}

export default MyProfilePageContainer
