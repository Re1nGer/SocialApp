import CircleLoader from '../loader/CircleLoader'
import { ReactNode, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { AnimatedPostInView } from '../profile/AnimatedPostInView'
import Post from '../profile/PostCard'
import { axios as call } from '../../axios'
import ProfileImage from '../profile/ProfileImage'
import ProfileInfo from './ProfileInfo'
import BackgroundProfileImageLoader from '../profile/BackgroundProfileImageLoader'
import IProfileInfo from "../../types/IProfile";
import { ThemeContext } from "../../contexts/ThemeContext";

export const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const defaultProfile : IProfileInfo= {
  id: "",
  username: "",
  lowResImageLink: "",
  highResImageLink: "",
  profileBackgroundImagelink: "",
  userPosts: [],
  userRequests: [],
  postBookmarks: [],
  isFollowing: false
}

type ProfilePostsProp = {
  children: ReactNode
}

const ProfilePosts = ({ children }: ProfilePostsProp) => {
  return (
    <div className="max-w-[1150px] mx-auto">
      <div className="flex flex-wrap gap-[1rem]">
        { children }
      </div>
    </div>
  );
}

const ProfilePage = (): JSX.Element => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>(defaultProfile)

  const { accessToken } = useContext(ThemeContext);

  const { userId } = useParams()

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true)
      const { data } = await call.get<IProfileInfo>(`/api/v1/user/${userId}`)
      setProfileInfo(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [userId, accessToken])

  return (
    <>
      {isLoading ? (
        <BackgroundProfileImageLoader />
      ) : (
        <ProfileImage
          profileBackgroundImagelink={profileInfo.profileBackgroundImagelink}
        />
      )}
      {isLoading ? (
        <CircleLoader />
      ) : (
        <ProfileInfo isLoading={isLoading} profileInfo={profileInfo} />
      )}
      <ProfilePosts>
        { profileInfo.userPosts.map( item =>(
          <AnimatedPostInView key={item.id}>
            <Post {...item} />
          </AnimatedPostInView>
        ))}
      </ProfilePosts>
    </>
  )
}

export default ProfilePage