import { useContext, useEffect, useState } from "react";
import { axios } from '../../axios'
import './Post.scss'
import CircleLoader from '../loader/CircleLoader'
import IPost from '../../types/IPost'
import PostComponent from "../profile/PostComponent";
import { ThemeContext } from "../contexts/ThemeContext";
import CommentSection from "./CommentSection";

type PostPropsType = {
  postId: string
}

const defaultPost: IPost = {
  id: "",
  userId: "",
  lowResMediaUrl: "",
  mediaUrl: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  likeCount: 0,
  likes: [],
  comments: [],
  commentCount: 0,
  hasUserLike: false,
  message: "",
}

const Post = ({ postId }: PostPropsType) => {

  const [post, setPost] = useState<IPost>(defaultPost)

  const [isError, setIsError] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { profileInfo: { id } } = useContext(ThemeContext)
  const fetchPostData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IPost>(`/api/v1/post/${postId}`)
      setPost(data)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const putLike = async () => {
    try {
      await axios.put(`/api/v1/like/${postId}`)
      setPost(prevState => ({...prevState, likeCount: prevState.likeCount + 1, hasUserLike: true}))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLike = async () => {
    try {
      await axios.delete(`/api/v1/like/${postId}`)
      setPost(prevState => ({...prevState, likeCount: prevState.likeCount - 1, hasUserLike: false}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) fetchPostData()
  }, [id])

  if (isError) {
    return <h1>Error Fetching Post Data</h1>
  }

  if (isLoading) {
    return <CircleLoader />
  }

  //Extract out into separate component 
  return (
    <div className='post'>
      <div className='post__inner'>
        <PostComponent
          post={post}
          putLike={putLike}
          deleteLike={deleteLike}
        />
        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}

export default Post
