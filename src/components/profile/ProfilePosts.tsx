import Post from './PostCard'
import { AnimatedPostInView } from './AnimatedPostInView'
import { IPostType } from './Posts'

type ProfilePostsPropType = {
  posts: IPostType[]
}
export const ProfilePosts = ({ posts }: ProfilePostsPropType): JSX.Element => {
  if (posts.length === 0) return <h2>No Posts</h2>

  return (
    <>
      {posts.map((post) => (
        <AnimatedPostInView key={post.id}>
          <Post {...post} />
        </AnimatedPostInView>
      ))}
    </>
  )
}
