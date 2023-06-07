import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import './Profile.scss'
import { axios } from '../../axios'
import CircleLoader from '../loader/CircleLoader'
import { ProfilePosts } from './ProfilePosts'
import IPost from '../../types/IPost'

type PostsPropsType = {
  posts: IPost[]
}

function Posts({ posts = [] }: PostsPropsType): JSX.Element {

  return (
    <div className='posts__container'>
      <div className='posts__divider' />
      <div className='posts__tags'>
        <div className='posts__posts'>
          <Icon fontSize={16} icon='ic:baseline-chat' />
          Posts
        </div>
        <div className='posts__images'>
          <Icon fontSize={16} icon='uil:apps' />
          Images
        </div>
        <div className='posts__saved'>
          <Icon fontSize={16} icon='material-symbols:bookmark-outline' />
          Saved
        </div>
      </div>
      {/*       extract into component */}
      <div className='posts__wrapper'>
        <ProfilePosts posts={posts} />
      </div>
      {posts.length > 10 ? <div className='posts__load-more'>Load More</div> : null}
    </div>
  )
}

export default Posts