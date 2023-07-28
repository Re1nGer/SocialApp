import CircleLoader from '../loader/CircleLoader';
import { defaultUserImg } from './ProfilePage';
import IProfileInfo from "../../types/IProfile";
import { axios as call } from "../../axios";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

type ProfileInfoPropsType = {
  isLoading: boolean,
  profileInfo: IProfileInfo,
}

const ProfileInfo = ({ isLoading, profileInfo }: ProfileInfoPropsType): JSX.Element => {
  const { userId } = useParams();

  const { setIsChatDrawerOpen } = useContext(ThemeContext)

  const [isFollowRequestSent, setIsFollowRequestSent] = useState<boolean>(false)

  const handleFollow = async () => {
    try {
      const body = { targetUserId: userId };
      await call.post("/api/v1/follow", body);
      setIsFollowRequestSent(true)
    } catch (error) {
      console.log(error);
      setIsFollowRequestSent(false)
    }
  }
  const handleStartConversation = async () => {
    setIsChatDrawerOpen(true)
    try {
      await call.post("/api/v1/chat", { userId: userId });
    } catch (error) {
      console.log(error)
    }
  }


  return <div className='profile-info__container'>
      <div className='profile-info_user-container'>
        {isLoading ? (
          <CircleLoader />
        ) : (
          <img
            className='sm:max-w-[300px] sm:max-h-[300px] rounded-full mt-[-5rem] relative z-10 h-[150px] w-[150px]'
            src={profileInfo?.lowResImageLink || defaultUserImg}
            width={'300px'}
            height={'300px'}
            alt='profile' />

        )}

        <div className='profile-info__details'>
          <h1 className='profile-info__username'>{profileInfo?.username}</h1>
          <p className='profile-info__bio'>
            { profileInfo.intro }
          </p>
          {profileInfo.isFollowing ? (
              <button className='profile-info__follow-btn'>
                You follow this user
              </button>
          ) : (
            <button className='profile-info__follow-btn' onClick={isFollowRequestSent ? undefined : handleFollow}>
              { isFollowRequestSent ? "Request has been sent" : "Follow" }
            </button>
          )}
          <br />
          <button className='profile-info__follow-btn' onClick={handleStartConversation}>Start Conversation</button>
        </div>
      </div>
  </div>;
};

export default ProfileInfo;
