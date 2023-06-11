import { Icon } from '@iconify/react'
import './Profile.scss'
import { ProfilePosts } from './ProfilePosts'
import IPost from '../../types/IPost'

function Posts(): JSX.Element {

  return (
    <div className='mx-auto max-w-[1150px] w-full h-full relative'>
      <div className='py-[2rem]' />
      <div className='flex justify-center gap-[4rem] mb-[2rem]'>
        <div className='flex flex-wrap gap-[1rem]'>
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
      <div className='flex flex-wrap gap-[1rem]'>
        <ProfilePosts  />
      </div>
{/*
      {posts.length > 10 ? <div className='posts__load-more'>Load More</div> : null}
*/}
    </div>
  )
}

export default Posts