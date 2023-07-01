import './Feed.scss'
import IPost from "../../types/IPost";
import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import CommentSection from "../post/CommentSection";
import { axios } from "../../axios";
import AnimatedCommentForm from "../profile/AnimatedCommentForm";
import { SubmitHandler } from "react-hook-form";
import { CommentFormDefaultValuesType } from "../comment/CommentForm";
import { AnimatePresence } from "framer-motion";

export type FeedPostPropType = {
  post: IPost
}

const FeedPost = ({ post }: FeedPostPropType, ref: any): JSX.Element => {

  const { profileInfo: { id } } = useContext(ThemeContext)

  const [localPost, setLocalPost] = useState<IPost>(post);

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)
  const putLike = async () => {
    try {
      await axios.put(`/api/v1/like/${post.id}`)
      setLocalPost(prevState => ({...prevState, likeCount: prevState.likeCount + 1, hasUserLike: true}))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLike = async () => {
    try {
      await axios.delete(`/api/v1/like/${post.id}`)
      setLocalPost(prevState => ({...prevState, likeCount: prevState.likeCount - 1, hasUserLike: false}))
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormShow = () => {
    setIsCommentFormShown(!isCommentFormShown)
  }

  //TODO: probably props assignment is not appropriate
  const handleCommentFormSubmit: SubmitHandler<CommentFormDefaultValuesType>
    = async ( data: CommentFormDefaultValuesType, _ ): Promise<void> => {
    try {
      const body = { postId: post.id, message: data.message }
      await axios.post('/api/v1/comment', body)
      setLocalPost(prevState => ({...prevState, commentCount: prevState.commentCount + 1}))
      setIsCommentFormShown(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLocalPost(post)
  }, [post.id])

  return (
    <div className='flex flex-col gap-[1rem]' ref={ref}>
      <span className={'flex gap-1 items-center'}>
        <Link to={id === localPost.userId ? '/mypage' : `/user/${localPost.userId}`}>
          <img src={localPost?.userImageLink} alt={'profile'} className={'w-[40px] h-[40px] rounded-full'} />
        </Link>
        <span className={'text-white'}>{localPost.username}</span>
      </span>
      <img src={post.mediaUrl} alt={'post'} className={'max-h-[400px] object-contain'} />
      <div className={'flex gap-1 text-white'}>
        <div className='flex gap-2 items-center'>
          {localPost.likeCount}
          <Icon fontSize={20}
            icon={localPost.hasUserLike ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'}
            className={'cursor-pointer'}
            onClick={localPost.hasUserLike ? deleteLike : putLike}
          />
        </div>
        <div className='flex gap-2 items-center'>
          {localPost.commentCount}
          <Icon fontSize={20}
                onClick={handleFormShow}
                icon='uil:comment'
                className={'cursor-pointer'} />
        </div>
      </div>
      <div className={'text-white'}>
        {localPost.message}
      </div>
      <AnimatePresence>
      { isCommentFormShown ? (
          <AnimatedCommentForm
            onSubmit={handleCommentFormSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
      ) : null}
      </AnimatePresence>
      <CommentSection postId={post.id}  />
    </div>
  )
}

export default React.forwardRef(FeedPost)
