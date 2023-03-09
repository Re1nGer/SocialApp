import "./Profile.css";
import ProfileHeaderImage from '../../assets/profileHeaderImage.jpg';

const ProfileImage = ({ imgSrc }) => {

    return (
        <>
            <div className="profile-image__wrapper">
                <div className="profile-image__clear">
                    <img className="profile-image__cut" src={ProfileHeaderImage} alt="profile header" />
                </div>
                <div className="profile-image__overlay"></div>
                <img className="profile-image__blur" src={ProfileHeaderImage} alt="profile header" />
            </div>
        </>
     );
}

export default ProfileImage;