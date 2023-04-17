import './Profile.scss'
import ProfileHeaderImage from '../../assets/profileHeaderImage.jpg'

export function ProfileImage(): JSX.Element {
  return (
    <div className='profile-image__wrapper'>
      <div className='profile-image__clear'>
        <img className='profile-image__cut' src={ProfileHeaderImage} alt='profile header' />
      </div>
      <div className='profile-image__overlay' />
      <img className='profile-image__blur' src={ProfileHeaderImage} alt='profile header' />
    </div>
  )
}

export default ProfileImage
