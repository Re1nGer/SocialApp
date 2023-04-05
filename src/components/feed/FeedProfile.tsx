import { Link } from 'react-router-dom'
import ProfileImageCap from '../../assets/profileHeaderImage.jpg'
import ProfileImage from '../../assets/profileImage.jpg'

export function FeedProfile(): JSX.Element {
  return (
    <div className='feed__profile'>
      <div className='feed__profile-cap'>
        <img className='feed__profile-cap_img' src={ProfileImageCap} alt='cap' />
      </div>
      <div className='feed__profile-info'>
        <div className='feed__profile-circle'>
          <img className='feed__profile-circle_img' src={ProfileImage} alt='avatar' />
        </div>
        <div className='feed__profile-name'>Megan</div>
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
