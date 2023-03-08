import "./Profile.css";
import ProfilePhoto from '../../assets/profileImage.jpg';
import { useState } from "react";

const ProfileInfo = () => {

    const [profileImage, setProfileImage] = useState(null);

    const handleProfileImageUpload = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <div className="profile-info__container">
            <div className="profile-info__inner">
                <div className="profile-info__image-container">
                    <img className="profile-info__image" src={profileImage || ProfilePhoto} alt="profile" />
                    <label className="profile-info__file-input_label" aria-label="file" htmlFor="file" id="file-id">
                        <button type="button" className="profile-info__file-input_btn">
                            Upload Profile Picture
                        </button>
                        <input hidden aria-labelledby="file-id" id="file" accept="*" type='file' />
                    </label>
                </div>
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