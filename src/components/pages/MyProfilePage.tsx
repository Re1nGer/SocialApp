import ProfileImage from '../profile/ProfileImage'
import Posts from '../profile/Posts'
import MyProfilePageContainer from '../profile/MyProfileContainer'
import { useEffect, useState } from 'react'
import IProfileInfo from '../../types/IProfileInfo'
import { axios } from '../../axios'
import CircleLoader from '../loader/CircleLoader'

function MyProfilePage() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [profileInfo, setProfileInfo] = useState<IProfileInfo | null>(null)

  const fetchUserData = async (): Promise<void> => {
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

  useEffect(() => {
    fetchUserData()
  },[])


  if (isLoading) {
    return <>
      <CircleLoader />
    </>
  }

  return (
    <>
      <ProfileImage link={profileInfo?.profileBackgroundImageLink || ""} />
      <MyProfilePageContainer profileInfo={profileInfo} />
      <Posts />
    </>
  )
}

export default MyProfilePage

