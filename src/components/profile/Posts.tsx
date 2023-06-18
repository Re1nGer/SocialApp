import './Profile.scss'
import { ProfilePosts } from './ProfilePosts'
import ProfilePostOptions from "./ProfilePostOptions";


function Posts(): JSX.Element {

  return (
    <div className='mx-auto max-w-[1150px] w-full h-full relative'>
      <ProfilePostOptions />
      {/*       extract into component */}
      <div className='flex flex-wrap gap-[1rem] justify-center'>
        <ProfilePosts />
      </div>
      {/*
      {posts.length > 10 ? <div className='posts__load-more'>Load More</div> : null}
*/}
    </div>
  )
}

export default Posts