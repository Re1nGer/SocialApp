import React, { LegacyRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import IPost from '../../types/IPost'

export type Ref = LegacyRef<HTMLDivElement> | undefined

const Post = ({ id, lowResMediaUrl, likeCount, commentCount }: IPost, ref: Ref) => {
  const navigate = useNavigate()

  // for now imgSrc can be transferred from state prop
  const handleNavigateClick = () => {
    navigate(`/post/${id}`)
  }

  return (
    <div className='post__card' onClick={handleNavigateClick} ref={ref}>
      <img className='post__card-image' src={lowResMediaUrl} alt='post' loading='lazy' />
      <div className='post__card-overlay'>
        <div className='post__card-likes'>
          <div className='post__card-like'>
            {likeCount}
            <Icon fontSize={20} icon='mdi:cards-heart-outline' />
          </div>
          <div className='post__card-comment'>
            {commentCount}
            <Icon fontSize={20} icon='uil:comment' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.forwardRef(Post)
