import Post from './PostCard'
import { AnimatedPostInView } from './AnimatedPostInView'
import IPost from '../../types/IPost'
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ProfilePosts = (): JSX.Element => {

  const { profileInfo: { userPosts } } = useContext(ThemeContext)

  if (userPosts.length === 0) return <h2>No Posts</h2>

  return (
    <>
      {userPosts.map((post: IPost) => (
        <AnimatedPostInView key={post.id}>
          <Post {...post} />
        </AnimatedPostInView>
      ))}
    </>
  )
}
