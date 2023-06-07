import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { SubmitHandler } from 'react-hook-form'
import { axios } from '../../axios'
import './Post.scss'
import CircleLoader from '../loader/CircleLoader'
import { motion } from 'framer-motion'
import CommentForm, { CommentFormDefaultValuesType } from '../comment/CommentForm'
import IPost from '../../types/IPost'
import { CommentSection } from './CommentSection'

function Post() {
  
  const { id } = useParams()

  const [like, setLike] = useState<boolean>(false)

  const [post, setPost] = useState<IPost>()

  const [isError, setIsError] = useState<boolean>(false)

  const [likeCount, setLikeCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isCommentShown, setIsCommentShown] = useState<boolean>(false)

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)

  const handleShowCommentForm = () => {
    setIsCommentFormShown(true)
  }

  const handleShowCommentSection = () => {
    setIsCommentShown((prevState) => !prevState)
  }

  const fetchPostData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/api/v1/post/${id}`)
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
      setLike(data)
    } catch (error) {
      console.log(error)
    }
  }

  const putLikeToPost = async () => {
    try {
      await axios.put(`/api/v1/like/${id}`)
      setLikeCount((prevState) => prevState + 1)
      setLike(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLike = async () => {
    try {
      await axios.delete(`/api/v1/like/${id}`)
      setLike(false)
      setLikeCount((prevState) => prevState - 1)
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
         <PostComponent lowResMediaUrl={post?.lowResMediaUrl ?? ""}
            id={post?.id ?? ""}
            mediaUrl={post?.mediaUrl ?? ""}
            likeCount={post?.likeCount ?? 0} commentCount={post?.commentCount ?? 0} />
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
        {isCommentShown ? <CommentSection postId={Number(id)} /> : null}
      </div>
    </div>
  )
}

const AnimatedCommentForm = motion(CommentForm)

const PostComponent = ({
    id,
    commentCount,
    lowResMediaUrl,
    likeCount,
    mediaUrl,
  } : IPost):JSX.Element => {

  return <>
        <div className='post__location'>
          <Icon fontSize={20} icon='material-symbols:location-on' />
          San Francisko
        </div>
        <div className='post__img-container'>
          <img className='post__img' src={mediaUrl} alt='post' loading='lazy' />
        </div>
        <div className='post__info'>
          <div className='post__likes'>
{/*             {like ? (
              <Icon
                icon='mdi:cards-heart'
                className='post__likes-icon'
                fontSize={20}
                onClick={deleteLike}
              />
            ) : (
              <Icon
                className='post__likes-icon'
                fontSize={20}
                icon='mdi:cards-heart-outline'
                onClick={putLikeToPost}
              />
            )} */}
            {likeCount}
          </div>
          <div className='post__comments'>
            <Icon
              className='post__comments-icon'
              fontSize={20}
              icon='uil:comment'
              //onClick={handleShowCommentForm}
            />
            {commentCount}
          </div>
          <div className='post__share'>
            <Icon className='post__share-icon' icon='ph:share-fat-thin' fontSize={20} />
          </div>
        </div>
{/*         <div className='post__description'>{postContent}</div> */}
  </>
}

export default Post
