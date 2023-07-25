import ProfileBackgroundImage from '../profile/ProfileImage'
import Posts from '../profile/Posts'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import BackgroundProfileImageLoader from '../profile/BackgroundProfileImageLoader'
import MyProfileInfo from "../profile/MyProfileInfo";

const MyProfilePage = (): JSX.Element => {

  const { profileInfo, isLoading } = useContext(ThemeContext)

  return (
    <>
    { isLoading ? <BackgroundProfileImageLoader /> : 
      <ProfileBackgroundImage profileBackgroundImagelink={profileInfo.profileBackgroundImagelink} />
     }
      { isLoading ? null : ( <MyProfileInfo /> ) }
      { isLoading ? null  : <Posts />}
    </>
  )
}

export default MyProfilePage