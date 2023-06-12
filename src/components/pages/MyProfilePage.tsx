import ProfileBackgroundImage from '../profile/ProfileImage'
import Posts from '../profile/Posts'
import { useContext, useEffect, useState } from 'react'
import IProfileInfo from '../../types/IProfileInfo'
import { axios } from '../../axios'
import { ThemeContext } from '../contexts/ThemeContext'
import BackgroundProfileImageLoader from '../profile/BackgroundProfileImageLoader'
import MyProfileInfo from "../profile/MyProfileInfo";

function MyProfilePage() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setProfileInfo, accessToken } = useContext(ThemeContext)

  const fetchUserData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IProfileInfo>('/api/v1/user')
      setProfileInfo(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  },[accessToken])

  //ugliest part
  return (
    <>
    { isLoading ? <BackgroundProfileImageLoader /> : 
      <ProfileBackgroundImage />
     }
      { isLoading ? null : ( <MyProfileInfo /> ) }
      { isLoading ? null  : <Posts />}
    </>
  )
}

export default MyProfilePage

