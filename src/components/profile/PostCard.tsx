import React, { LegacyRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import IPost from '../../types/IPost'

export type Ref = LegacyRef<HTMLDivElement> | undefined

const Post = ({ id, lowResMediaUrl, likeCount, commentCount, hasVideo, mediaUrl }: IPost, ref: Ref) => {
  const navigate = useNavigate()

  // for now imgSrc can be transferred from state prop
  const handleNavigateClick = () => {
    navigate(`/post/${id}`)
  }

  return (
    <div className='post__card' onClick={handleNavigateClick} ref={ref}>
      { hasVideo ? (
        <video controls id="video-tag" muted className={'h-full'}>
          <source id="video-source" src={mediaUrl} className={'h-full'} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
         className='post__card-image'
         src={lowResMediaUrl} alt='post'
         loading='lazy'
        />
      ) }
        <div className='post__card-overlay'>
          { hasVideo ? (
            <div className={'relative transition-opacity h-full w-full text-white left-0 p-1'}>
              <Icon icon="mdi:movie" className={'absolute transition-opacity text-white text-3xl right-0 p-1'} />
            </div>
          ) : null }
          { !hasVideo ? (
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
          ) : null }
        </div>
    </div>
  )
}

export default React.forwardRef(Post)
