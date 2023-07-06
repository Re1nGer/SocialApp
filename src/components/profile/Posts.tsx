import './Profile.scss'
import ProfilePostOptions from "./ProfilePostOptions";


const Posts = (): JSX.Element => {

  return (
    <div className='mx-auto max-w-[1150px] w-full h-full relative'>
      <ProfilePostOptions />
    </div>
  )
}

export default Posts