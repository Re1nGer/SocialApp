import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { axios } from '../../axios'
import './Post.scss'
import CircleLoader from '../loader/CircleLoader'
import { CommentFormDefaultValuesType } from '../comment/CommentForm'
import IPost from '../../types/IPost'
import { CommentSection } from './CommentSection'
import PostComponent from "../profile/PostComponent";
import AnimatedCommentForm from "../profile/AnimatedCommentForm";

type PostPropsType = {
  id: string
}
function Post({ id }: PostPropsType) {

  const defaultPost: IPost = {
    id: "",
    userId: "",
    lowResMediaUrl: "",
    mediaUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    likeCount: 0,
    commentCount: 0,
    message: ""
  }

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [post, setPost] = useState<IPost>(defaultPost)

  const [isError, setIsError] = useState<boolean>(false)

  const [likeCount, setLikeCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isCommentShown, setIsCommentShown] = useState<boolean>(false)

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)

  const handleShowComment = () => {
    setIsCommentFormShown(true)
  }

  const handleShowCommentSection = () => {
    setIsCommentShown((prevState) => !prevState)
  }

  const fetchPostData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<IPost>(`/api/v1/post/${id}`)
      setPost(data)
      setLikeCount(data.likeCount)
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const hasLike = async () => {
    try {
      const { data } = await axios.get(`/api/v1/like/${id}`)
      setIsLiked(data)
    } catch (error) {
      console.log(error)
    }
  }

  const putLike = async () => {
    try {
      await axios.put(`/api/v1/like/${id}`)
      setPost(prevState => ({...prevState, likeCount: likeCount + 1}))
      setIsLiked(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLike = async () => {
    try {
      await axios.delete(`/api/v1/like/${id}`)
      setIsLiked(false)
      setPost(prevState => ({...prevState, likeCount: likeCount - 1}))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentFormSubmit: SubmitHandler<CommentFormDefaultValuesType> = async (
    data: CommentFormDefaultValuesType,
    _,
  ): Promise<void> => {
    try {
      const body = { postId: id, message: data.message }
      await axios.post('/api/v1/comment', body)
      setIsCommentFormShown(false)
      setIsCommentShown(true)
      setPost((prevState) => ({ ...prevState, commentCount: prevState.commentCount + 1 }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPostData()
      hasLike()
    }
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
             handleShowComment={handleShowComment}
             isLiked={isLiked}
         />
        {isCommentFormShown ? (
          <AnimatedCommentForm
            onSubmit={handleCommentFormSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : null}
        <div className='post__comments-preview' onClick={handleShowCommentSection}>
          {isCommentShown ? 'Close Comments' : 'View Comments'}
        </div>
        {isCommentShown ? <CommentSection postId={id ?? ""} /> : null}
      </div>
    </div>
  )
}


export default Post
