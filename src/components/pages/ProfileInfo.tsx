import IProfileInfo from '../../types/IProfileInfo';
import CircleLoader from '../loader/CircleLoader';
import { defaultUserImg } from './ProfilePage';

export type ProfileInfoPropsType = {
  isLoading: boolean,
  profileInfo: IProfileInfo | undefined,
  isFollowing: boolean,
  handleFollow: () => Promise<void>,
  handleStartConversation: () => Promise<void>,
  isFollowRequestSent: boolean,
  isBlocked: boolean
}

export const ProfileInfo = ({
  isLoading, profileInfo, isFollowing, handleFollow, isFollowRequestSent, isBlocked
}: ProfileInfoPropsType): JSX.Element => {

  return <div className='profile-info__container'>
    <div className='profile-info__inner'>
      <div className='profile-info_user-container'>
        <div className='profile-info__image-container'>
          {isLoading ? (
            <CircleLoader />
          ) : (
            <img
              className='profile-info__image'
              src={profileInfo?.userImageSrc || defaultUserImg}
              alt='profile' />
          )}
        </div>

        <div className='profile-info__details'>
          <h1 className='profile-info__username'>{profileInfo?.username}</h1>
          <p className='profile-info__bio'>
            Welcome to my profile ♡
            <br />
            Follow me plz
            <br />
            <a className='profile-info__link' href='#'>
              @Otheruser
            </a>
          </p>
          {isFollowing ? (
            <p>You follow this user</p>
          ) : (
            <button className='profile-info__follow-btn' onClick={handleFollow}>
              {isFollowRequestSent ? "Request has been sent" : "Follow"}
            </button>
          )}
          <br />
          {isBlocked ? (
            <p>You blocked this user</p>
          ) : <button className='profile-info__follow-btn'>Block this user</button>}
          <br />
          {!isBlocked ? (
            <button className='profile-info__follow-btn'>Start Conversation</button>
          ) : null}
        </div>
      </div>
    </div>
  </div>;
};
