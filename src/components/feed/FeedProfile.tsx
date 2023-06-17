import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export function FeedProfile(): JSX.Element {

  const { profileInfo: { lowResImageLink, profileBackgroundImagelink, username } } = useContext(ThemeContext)

  return (
    <div className='feed__profile'>
      <div className=' max-h-[200px]'>
        <img className='object-cover rounded-xl w-full max-h-[200px]'
             src={profileBackgroundImagelink} alt='cap' />
      </div>
      <div className='feed__profile-info'>
        <div className='feed__profile-circle'>
          <img className='feed__profile-circle_img' src={lowResImageLink} alt='avatar' />
        </div>
        <div className='feed__profile-name'>{username}</div>
        <div className='feed__profile-username'>@megan_cli</div>
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
        <div className='feed__profile-link'>
          <Link to='/mypage'>My Profile</Link>
        </div>
      </div>
    </div>
  )
}
