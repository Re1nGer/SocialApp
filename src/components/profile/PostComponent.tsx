import IPost from "../../types/IPost";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import AnimatedCommentForm from "./AnimatedCommentForm";
import { SubmitHandler } from "react-hook-form";
import { CommentFormDefaultValuesType } from "../comment/CommentForm";
import { axios } from "../../axios";
import dayjs from 'dayjs'
import { motion } from "framer-motion";

type PostComponentPropsType = {
  post: IPost,
  deleteLike: () => Promise<void>,
  putLike: () => Promise<void>,
}

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const PostComponent = ({
                         post,
                         deleteLike,
                         putLike,
                       } : PostComponentPropsType):JSX.Element => {

  const [isCommentFormShown, setIsCommentFormShown] = useState<boolean>(false)

  const handleShowComment = () => {
    setIsCommentFormShown(!isCommentFormShown);
  }

  const handleCommentFormSubmit: SubmitHandler<CommentFormDefaultValuesType>
    = async ( data: CommentFormDefaultValuesType, _ ): Promise<void> => {
    try {
      const body = { postId: post.id, message: data.message }
      await axios.post('/api/v1/comment', body)
      setIsCommentFormShown(false)
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <div className={'flex gap-2 my-2 items-center'}>
      <motion.img
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        src={post.userImageLink ?? defaultUserImg}
        className={'rounded-full h-[50px] w-[50px]'}
        alt={'user'}
      />
      <span className={'text-white'}>{post.username}</span>
    </div>
    <div className='post__img-container'>
      { post.hasVideo ? (
        <video controls id="video-tag" muted className={'h-full'}>
          <source id="video-source" src={post.mediaUrl} className={'h-full'} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img className='post__img' src={post.mediaUrl} alt='post' loading='lazy' />
      ) }
    </div>
    <div className='post__info'>
      <div className='post__likes'>
        <Icon
          icon={post.hasUserLike ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'}
          className='post__likes-icon'
          fontSize={20}
          onClick={post.hasUserLike ? deleteLike : putLike}
        />
        {post.likeCount}
      </div>
      <div className='post__comments'>
        <Icon
          className='post__comments-icon'
          fontSize={20}
          icon='uil:comment'
          onClick={handleShowComment}
        />
        {post.commentCount}
      </div>
      <div className='post__share'>
        <Icon className='post__share-icon' icon='ph:share-fat-thin' fontSize={20} />
      </div>
    </div>
    { isCommentFormShown ? (
      <AnimatedCommentForm
        layout
        onSubmit={handleCommentFormSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    ) : null}
    <div className='post__description'>{post.message}</div>
    <div className={'text-[#6c757d] text-sm mt-1'}>{dayjs(post.dateCreated).format('YYYY.MM.DD : hh:mm')}</div>
  </>
}

export default PostComponent
