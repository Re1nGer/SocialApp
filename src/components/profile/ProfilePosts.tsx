import Post from './PostCard'
import { AnimatedPostInView } from './AnimatedPostInView'
import IPost from '../../types/IPost'
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { axios } from "../../axios";
import profileInfo from "../pages/ProfileInfo";
import CircleLoader from "../loader/CircleLoader";

export const ProfilePosts = (): JSX.Element => {

  const { profileInfo: { userPosts, id }, accessToken } = useContext(ThemeContext)

  const [posts, setPosts] = useState<IPost[]>([])

  const [isError, setIsError] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchPostData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IPost[]>(`/api/v1/post/${id}/list`);
      setPosts(data)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken && id) fetchPostData();
  }, [accessToken, id]);

  if (isLoading) {
    return <CircleLoader />
  }


  if (posts.length === 0) return <h2 className={'text-white font-bold'}>No Posts</h2>


  return (
    <>
      {posts.map((post: IPost) => (
        <AnimatedPostInView key={post.id}>
          <Post {...post} />
        </AnimatedPostInView>
      ))}
      { userPosts.length === 0 && <span className={'text-white font-bold'}>No Posts</span> }
    </>
  )
}
