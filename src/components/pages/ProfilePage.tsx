import CircleLoader from '../loader/CircleLoader'
import { useEffect, useState } from 'react'
import { IProfileInfo } from '../profile/MyProfileContainer'
import { useParams } from 'react-router-dom'
import { AnimatedPostInView } from '../profile/AnimatedPostInView'
import Post from '../profile/PostCard'
import { axios as call } from '../../axios'

interface IPostType {
  id: number
  imgSrc: string
  likeCount: number
  commentCount: number
}

function ProfilePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [profileInfo, setProfileInfo] = useState<IProfileInfo>()

  const [posts, setPosts] = useState<IPostType[]>([])

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

  const fetchUserPosts = async () => {
    try {
      //setIsLoading(true)
      const { data } = await call.get<IPostType[]>(`/api/v1/post/${userId}/list`)
      setPosts(data)
    } catch (error) {
      console.log(error)
    } finally {
      //setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserInfo()
    fetchUserPosts()
  }, [])

  return (
    <>
      <div className='profile-info__container'>
        <div className='profile-info__inner'>
          <div className='profile-info_user-container'>
            <div className='profile-info__image-container'>
              {isLoading ? (
                <CircleLoader />
              ) : (
                <img
                  className='profile-info__image'
                  src={profileInfo?.userImageSrc}
                  alt='profile'
                />
              )}
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
        </div>
      </div>
      <div className='posts__wrapper'>
        {isLoading ? <CircleLoader /> : null}
        {posts.map((post) => (
          <AnimatedPostInView key={post.id}>
            <Post {...post} />
          </AnimatedPostInView>
        ))}
      </div>
    </>
  )
}

export default ProfilePage
