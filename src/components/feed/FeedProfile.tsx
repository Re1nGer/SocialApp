import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

const defaultUserImg: string =
  'https://thumbs.dreamstime.com/b/blank-black-white-image-placeholder-icon-design-178700126.jpg'

const defaultBackgroundImageLink: string  = "https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg"

export function FeedProfile(): JSX.Element {

  const { profileInfo: { lowResImageLink, profileBackgroundImagelink, username } } = useContext(ThemeContext)

  return (
    <div className='feed__profile '>
      <div className=' max-h-[200px]'>
        <img className='object-cover rounded-xl w-full max-h-[200px]'
             src={profileBackgroundImagelink ?? defaultBackgroundImageLink} alt='cap' />
      </div>
      <div className='feed__profile-info'>
        <div className='feed__profile-circle'>
          <img className='feed__profile-circle_img' src={lowResImageLink ?? defaultUserImg} alt='avatar' />
        </div>
        <div className='feed__profile-name'>{username}</div>
        <div className='feed__profile-stats'>
          <div className='feed__profile-following'>
            6684
            <br />
            Following
          </div>
          <div className='feed__profile-divider' />
          <div className='feed__profile-followers'>
            9991
            <br />
            Followers
          </div>
        </div>
        <div className='text-white hover:text-neutral my-1 text-center'>
          <Link to='/mypage' className={'text-[#6c757d] hover:text-[#b4d9f4] transition-colors'}>My Profile</Link>
        </div>
      </div>
    </div>
  )
}
