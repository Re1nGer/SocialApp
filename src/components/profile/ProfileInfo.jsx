import "./Profile.css";
import ProfilePhoto from '../../assets/profileImage.jpg';

const ProfileInfo = () => {
    return (
        <div className="profile-info__container">
            <div className="profile-info__inner">
                <img className="profile-info__image" src={ProfilePhoto} alt="profile" />
                <div className="profile-info__details">
                    <h1 className="profile-info__username">Username</h1>
                    <p className="profile-info__bio">
                        Welcome to my profile ♡
                        <br />
                        Follow me plz
                        <br />
                        <a className="profile-info__link" href="#">@Otheruser</a>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default ProfileInfo;