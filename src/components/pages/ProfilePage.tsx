import CircleLoader from '../loader/CircleLoader'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatedPostInView } from '../profile/AnimatedPostInView'
import Post from '../profile/PostCard'
import { axios as call } from '../../axios'
import ProfileImage from '../profile/ProfileImage'
import { ProfileInfo } from './ProfileInfo'
import IProfileInfo from '../../types/IProfileInfo'
import { ThemeContext } from '../contexts/ThemeContext'
import BackgroundProfileImageLoader from '../profile/BackgroundProfileImageLoader'

export const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

function ProfilePage(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  const [isFollowRequestSent, setIsFollowRequestSent] = useState<boolean>(false)

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>()

  const { setIsChatDrawerOpen } = useContext(ThemeContext)

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

  const handleFollow = async () => {
    try {
      const body = { targetUserId: userId };
      await call.post("/api/v1/follow", body);
      setIsFollowRequestSent(true)
    } catch (error) {
      console.log(error);
      setIsFollowRequestSent(false)
    }
  }

/*   const fetchIsBlocked = async () => {
    try {
      const { data } = await call.get(`/api/v1/user/isblocked/${userId}`);
      setIsBlocked(data)
    } catch (error) {
      console.log(error)
    }
  } */

  const handleStartConversation = async () => {
    setIsChatDrawerOpen(true)
    try { 
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <>
      { isLoading ? (
        <BackgroundProfileImageLoader />
      ) : (
        <ProfileImage />
      ) } 
      { isLoading ? (
        <CircleLoader />
      ) :(
        <ProfileInfo
          isLoading={isLoading}
          profileInfo={profileInfo}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
          handleStartConversation={handleStartConversation}
          isFollowRequestSent={isFollowRequestSent}
          isBlocked={isBlocked}
        />
      ) }
      <div className='max-w-[1150px] mx-auto'>
        <div className='flex flex-wrap gap-[1rem]'>
          {profileInfo?.userPosts.length === 0 ? <h1 className='text-white'>No Posts</h1> : null}
          {profileInfo?.userPosts.map((post) => (
            <AnimatedPostInView key={post.id}>
              <Post {...post} />
            </AnimatedPostInView>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfilePage