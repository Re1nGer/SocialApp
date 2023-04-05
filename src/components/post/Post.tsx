import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { SubmitHandler } from 'react-hook-form'
import Comment from '../comment/Comment'
import { axios } from '../../axios'
import './Post.css'
import CircleLoader from '../loader/CircleLoader'
import { AnimatePresence, motion } from 'framer-motion'
import CommentForm, { CommentFormDefaultValuesType } from '../comment/CommentForm'
import { BlurredImage } from './BlurredImage'

type FeedType = {
  id: number
  imgSrc: string
  likeCount: number
  commentCount: number
  htmlContent: string
}

function Post() {
  const { id } = useParams()

  const [like, setLike] = useState<boolean>(false)

  const [post, setPost] = useState<FeedType | null>(null)

  const [isError, setIsError] = useState<boolean>(false)

  const [likeCount, setLikeCount] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [lowResImage, setLowResImage] = useState<string | undefined>('')

  const [highResImage, setHighResImage] = useState<string | undefined>('')

  const [isCommentShown, setIsCommentShown] = useState<boolean>(false)

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)

  const [isHighQualityImageLoading, setIsHighQualityImageLoading] = useState<boolean>(false)

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

  const fetchLowResImage = async () => {
    try {
      const { data } = await axios.get(`/api/v1/post/lowres/${id}`)
      setLowResImage(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchHighResImage = async () => {
    try {
      setIsHighQualityImageLoading(true)
      const { data } = await axios.get(`/api/v1/post/highres/${id}`)
      setHighResImage(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsHighQualityImageLoading(false)
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
      fetchLowResImage()
      fetchPostData()
      hasLike()
      fetchHighResImage()
    }
  }, [id])

  if (isError) {
    return <h1>Error Fetching Post Data</h1>
  }

  if (isLoading) {
    return <CircleLoader />
  }

  return (
    <div className='post'>
      <div className='post__inner'>
        <div className='post__location'>
          <Icon fontSize={20} icon='material-symbols:location-on' />
          San Francisko
        </div>
        <div className='post__img-container'>
          {isHighQualityImageLoading ? (
            <BlurredImage src={lowResImage} alt='blurred' />
          ) : (
            <img className='post__img' src={highResImage} alt='post' loading='lazy' />
          )}
        </div>
        <div className='post__info'>
          <div className='post__likes'>
            {like ? (
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
            )}
            {likeCount}
          </div>
          <div className='post__comments'>
            <Icon
              className='post__comments-icon'
              fontSize={20}
              icon='uil:comment'
              onClick={handleShowCommentForm}
            />
            {post?.commentCount}
          </div>
          <div className='post__share'>
            <Icon className='post__share-icon' icon='ph:share-fat-thin' fontSize={20} />
          </div>
        </div>
        <div className='post__description'>{post?.htmlContent}</div>
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

type CommentSectionPropType = {
  postId: number
}

type CommentType = {
  id: number
  username: string
  dateCreated: string
  message: string
  postId: number
  userId: number
}

function CommentSection({ postId }: CommentSectionPropType): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isError, setIsError] = useState<boolean>(false)

  const [comments, setComments] = useState<CommentType[]>([])

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<CommentType[]>(`/api/v1/comment/${postId}`)
      setComments(data)
    } catch (error) {
      setIsError(true)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  if (isError) {
    return <h1 style={{ color: '#fff' }}>Error fetching comments</h1>
  }

  if (isLoading) {
    return <CircleLoader />
  }

  if (comments.length === 0) {
    return <h5 style={{ color: '#fff' }}>No Comments Yet</h5>
  }

  return (
    <>
      {comments.map((item) => (
        <AnimatePresence key={item.id}>
          <AnimatedComment
            {...item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
      ))}
    </>
  )
}

const AnimatedComment = motion(Comment)

export default Post
