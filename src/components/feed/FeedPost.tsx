import './Feed.scss'
import { CommentSection } from '../post/CommentSection'
import IPost from "../../types/IPost";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

export type FeedPostPropType = {
  post: IPost
}

function FeedPost({ post }: FeedPostPropType, ref: any): JSX.Element {

  const { profileInfo: { id } } = useContext(ThemeContext)

  return (
    <div className='flex flex-col gap-[1rem]' ref={ref}>
      <span className={'flex gap-1 items-center'}>
        <Link to={id === post.userId ? '/mypage' : `/user/${post.userId}`}>
          <img src={post?.user?.lowResImageLink} alt={'profile'} className={'w-[40px] h-[40px] rounded-full'} />
        </Link>
        <span className={'text-white'}>{post?.user?.username}</span>
      </span>
      <img src={post.mediaUrl} alt={'post'} className={'max-h-[400px] object-contain'} />
      <div className={'flex gap-1 text-white'}>
        <div className='flex gap-2 items-center'>
          {post.likes?.length}
          <Icon fontSize={20}
          icon={post?.likes?.some(item => item.userId === id) ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'}
          />
        </div>
        <div className='flex gap-2 items-center'>
          {post.comments?.length}
          <Icon fontSize={20} icon='uil:comment' />
        </div>
      </div>
      <div className={'text-white'}>
        {post.message}
      </div>
      <CommentSection postId={post.id}  />
    </div>
  )
}

export default React.forwardRef(FeedPost)
