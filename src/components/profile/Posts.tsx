import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import './Profile.scss'
import { axios } from '../../axios'
import CircleLoader from '../loader/CircleLoader'
import { ProfilePosts } from './ProfilePosts'
export interface IPostType {
  id: number
  imgSrc: string
  likeCount: number
  commentCount: number
}

function Posts(): JSX.Element {
  const [posts, setPosts] = useState<IPostType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchProfilePosts = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IPostType[]>('/api/v1/post/list')
      setPosts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfilePosts()
  }, [])

  return (
    <div className='posts__container'>
      <div className='posts__divider' />
      <div className='posts__tags'>
        <div className='posts__posts'>
          <Icon fontSize={16} icon='ic:baseline-chat' />
          Posts
        </div>
        <div className='posts__images'>
          <Icon fontSize={16} icon='uil:apps' />
          Images
        </div>
        <div className='posts__saved'>
          <Icon fontSize={16} icon='material-symbols:bookmark-outline' />
          Saved
        </div>
      </div>
      {/*       extract into component */}
      <div className='posts__wrapper'>
        {isLoading ? <CircleLoader /> : <ProfilePosts posts={posts} />}
      </div>
      {posts.length > 10 ? <div className='posts__load-more'>Load More</div> : null}
    </div>
  )
}

const ProfilePostsContainer = (): JSX.Element => {
  const [posts, setPosts] = useState<IPostType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchProfilePosts = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IPostType[]>('/api/v1/post/list')
      setPosts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfilePosts()
  }, [])

  if (isLoading) return <CircleLoader />

  return <ProfilePosts posts={posts} />
}

export default Posts
