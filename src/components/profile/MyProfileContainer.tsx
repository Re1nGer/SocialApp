import { ChangeEvent, useEffect, useState } from 'react'
import { axios } from '../../axios'
import MyProfileInfo from './MyProfileInfo'
import IProfileInfo from '../../types/IProfileInfo'


type MyProfilePageContainerPropsType = {
  profileInfo: IProfileInfo | null
}

function MyProfilePageContainer({ profileInfo }: MyProfilePageContainerPropsType) {

  const [profileImageSrc, setProfileImageSrc] = useState<string | undefined>("")

  const [profileImage, setProfileImage] = useState<Blob | null>(null)

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    setProfileImageSrc(profileInfo?.highResImageLink)
  }

  const prepareFormData = () => {
    const formData = new FormData() 
    formData.append("image", profileImage!)
    return formData
  }

  const updateProfileImage = async () => {
    try {
      setIsLoading(true)
      const formData = prepareFormData()
      await axios.put('/api/v1/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setProfileImage(null)
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }


  const updateProfileInfo = async () => {}

  return (
    <MyProfileInfo
      isLoading={isLoading}
      profileInfo={profileInfo}
      profileImageSrc={profileImageSrc}
      profileImage={profileImage}
      isProfileModalOpen={isProfileModalOpen}
      setIsProfileModalOpen={setIsProfileModalOpen}
      updateProfileImage={updateProfileImage}
      handleCancelUpload={handleCancelUpload}
      handleProfileModal={handleProfileModal}
      handleProfileImageUpload={handleProfileImageUpload}
      updateProfileInfo={updateProfileInfo}
    />
  )
}

export default MyProfilePageContainer
